const cypress = require("cypress");
const fs = require("fs").promises;
const path = require("path");
const DownLoadFile = require("../utils/downloadZip");

class testController {
  async runTest(req, res, next) {
    try {
      let file = req.files.file;
      const pathFile = path.join(__dirname, "/../uploads/files/file.zip");
      if (file.mimetype.split("/").splice(1, 1).join("") !== "zip") {
        res.json({
          message:
            "Формат файла должен быть .zip и папка внутри его должна називаться docs !!!",
        });
        return;
      }
      if (DownLoadFile(file, pathFile)) {
        cypress
          .run({
            spec: "./cypress/e2e/tagName.cy.js",
          })
          .then((results) => {
            try {
              fs.unlink(pathFile);
              res.json({
                results,
              });
            } catch (error) {
              fs.unlink(pathFile);
              res.json({
                message: "there was an error:",
              });
            }
          });
      } else {
        res.json({
          message: "Что-то пошло не так",
        });
      }
    } catch (err) {
      res.json({ message: err });
    }
  }
}

module.exports = new testController();
