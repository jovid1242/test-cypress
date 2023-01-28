const path = require("path");
const fs = require("fs").promises;
const axios = require("axios");
const AdmZip = require("adm-zip");

async function DownLoadFile(file) {
  const pathZip = path.resolve(__dirname, "files");
  const pathFile = path.resolve(pathZip, "file.zip");
  await fs.writeFile(pathFile, file)
  console.log('start...');
  const zipFile = new AdmZip(file);
  zipFile.extractAllTo(pathZip, true);
  
  console.log('end...');
}

module.exports = DownLoadFile;
