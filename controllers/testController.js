const cypress = require("cypress");
const fs = require("fs").promises;
const unzipper = require("unzipper");
const path = require("path");

class testController {
  async runTest(req, res, next) {
    try {
      let file = req.files.file;
      const patchfile = path.join(__dirname, "/../uploads/files/file.zip");
      try {
        file.mv(patchfile),
          (err) => {
            if (err) {
              console.log("Ошибка при загрузка файла");
            }
          };

        setTimeout(() => {
          unzipper.Open.file(patchfile).then((d) => {
            d.extract({ path: path.join(__dirname + "/../uploads/files") });
            console.log("Fff");
          });
          cypress
            .run({
              spec: "./cypress/e2e/tagName.cy.js",
            })
            .then((results) => {
              try {
                fs.unlink(path.join(__dirname, "/../uploads/files/file.zip"));
                res.json({
                  results,
                });
              } catch (error) {
                res.json({
                  message: "there was an error:",
                });
              }
            })
            .catch(() => {
              res.json({
                message: "there was an error:",
              });
              fs.unlink(path.join(__dirname, "/../uploads/files/file.zip"));
            });
        }, 700);
      } catch {
        res.json({
          data: "Ошибка при загрузка файла",
        });
      }
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = new testController();
