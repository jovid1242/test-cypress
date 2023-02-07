const path = require("path");
const unzipper = require("unzipper");

async function DownLoadFile(file, pathFile) {
  try {
    file.mv(pathFile),
      (err) => {
        if (err) {
          res.json({ message: "Ошибка при загрузка файла" });
        }
      };

    return true;
  } catch {
    return false;
  }
}

module.exports = DownLoadFile;
