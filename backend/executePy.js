// Th exec module is used to execute shell commands through our own scripts.
const {exec} = require('child_process');
const fs = require('fs');
const path = require('path');

// The following function is responsible for executing the cpp code using the exec command and storing the output in the 'outputs' folder and also returning it back to the client.
const executePy = (filepath) => {
    return new Promise((resolve, reject) => {
        exec(`python ${filepath}`,
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
    executePy
}
