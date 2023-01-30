const fs = require("fs");

async function deleteFolder(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      const curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolder(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    // delete folder
    fs.rmdirSync(path);
  } else {
    console.log("Folder does not exist!");
  }
}

module.exports = deleteFolder;
