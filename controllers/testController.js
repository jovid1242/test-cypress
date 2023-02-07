const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const DownLoadFile = require("../utils/downloadZip");

class testController {
  async runTest(req, res, next) {
    try {
      let file = req.files.file;
      const file_id = uuid.v4();

      const pathFile = path.join(__dirname, `/../uploads/files/${file_id}.zip`);
      if (file.name.split(".")[1] !== "zip") {
        res.json({
          message:
            "Формат файла должен быть .zip и папка внутри его должна називаться docs !!!",
        });
      }
      if (DownLoadFile(file, pathFile)) {
        const dbData = JSON.parse(
          fs.readFileSync(
            path.join(__dirname + "/../db/data.json"),
            (err, data) => data
          )
        );

        fs.writeFileSync(
          path.join(__dirname + "/../db/data.json"),
          JSON.stringify([
            ...dbData,
            {
              id: file_id,
              name: `${file_id}.zip`,
              status: false,
            },
          ])
        );
        res.json({ id: file_id });
      } else {
        res.json({
          message: "Что-то пошло не так",
        });
      }
    } catch (err) {
      res.json({ message: "Что-то пошло не так: " + err });
    }
  }
  async getTest(req, res, next) {
    const dbData = JSON.parse(
      fs.readFileSync(
        path.join(__dirname + "/../db/tests.json"),
        (err, data) => data
      )
    );
    const result = dbData.filter(
      (item) => item.user_id === req.body.user_id
    );
    res.json({ user_id: req.body.user_id, result });
  }
}

module.exports = new testController();
