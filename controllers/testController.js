const cypress = require("cypress");
const fs = require("fs").promises;
const path = require("path");
const deleteFolder = require("../utils/deleteFolder");
const DownLoadFile = require("../utils/downloadZip");

class testController {
  async runTest(req, res, next) {
    try {
      let file = req.files.file;
      fs.mkdir(path.join(__dirname, "/../uploads/files"), (err) => {
        if (err) {
          res.json({
            message: "Что-то пошло не так" + err,
          });
          return;
        }
      });

      const pathFile = path.join(__dirname, "/../uploads/files/file.zip");
      if (file.name.split(".")[1] !== "zip") {
        res.json({
          message:
            "Формат файла должен быть .zip и папка внутри его должна називаться docs !!!", 
        });
        deleteFolder(path.join(__dirname + "/../uploads/files"));
      }
      if (DownLoadFile(file, pathFile)) {
        cypress
          .run({
            spec: "./cypress/e2e/test_File.cy.js",
          })
          .then((results) => {
            try {
              deleteFolder(path.join(__dirname + "/../uploads/files"));
              res.json({
                complete: results.totalFailed === 0 ? true : false,
                startedTestsAt: results.startedTestsAt,
                endedTestsAt: results.endedTestsAt,
                totalFailed: results.totalFailed,
                totalTests: results.totalTests,
                totalPassed: results.totalPassed,
                tests: results.runs[0].tests,
              });
            } catch (error) {
              fs.unlink(pathFile);
              res.json({
                message: "Что-то пошло не так",
              });
            }
          });
      } else {
        res.json({
          message: "Что-то пошло не так",
        });
      }
    } catch (err) {
      res.json({ message: "Что-то пошло не так: " + err });
    }
  }
}

module.exports = new testController();
