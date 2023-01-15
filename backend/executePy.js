// Th exec module is used to execute shell commands through our own scripts.
const {exec} = require('child_process');
const fs = require('fs');
const path = require('path');

// The following function is responsible for executing the cpp code using the exec command and storing the output in the 'outputs' folder and also returning it back to the client.
const executeCpp = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);
    return new Promise((resolve, reject) => {
        exec(`g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`,
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
    executeCpp
}
