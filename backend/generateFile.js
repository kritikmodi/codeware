// The fs module stands for 'file system' and is used to perform multiple file operations such as reading, writing, creating and deleting files.
const fs = require('fs');

// The path module is used for working with directories and file paths.
const path = require('path');

// The uuid module is used for generating unique ids.
// 'v4:uuid' means that 'v4' is renamed/stored as 'uuid'.
const {v4:uuid} = require('uuid');

// The __dirname variable stores the directory name of the current module.
const dirCodes = path.join(__dirname, "codes");

// If the 'dirCodes' folder doesn't exist, it is created using the 'mkdir' function.
if(!fs.existsSync(dirCodes)){
  fs.mkdirSync(dirCodes, {recursive: true});
}

// The following function generates a cpp file inside the 'dircodes' folder and writes the received code in it.
const generateFile = async (format, content) => {
    let jobId;
    if(format!="java")
    jobId = uuid();
    else
    jobId = "Main";
    const filename = `${jobId}.${format}`;
    const filepath = path.join(dirCodes, filename);
    await fs.writeFileSync(filepath, content);
    return filepath;
};

// The module.exports section contains the functions which are allowed to be 'exported' or used by external scripts or functions.
module.exports = {
  generateFile,
};