// Th exec module is used to execute shell commands through our own scripts.
const {exec} = require('child_process');
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, "outputs");

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive : true});
}

// The following function is responsible for executing the Java code using the exec command.
const executeJava = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    return new Promise((resolve, reject) => {
        exec(`javac ${filepath} && cd ${outputPath} && java ${jobId}`,
                (error, stdout, stderr) => {
                error && reject({error, stderr});
                stderr && reject(stderr);
                resolve(stdout);
            }
        );
    });
};

// The above function is exported using the following function.
module.exports = {
    executeJava
}
