// Th exec module is used to execute shell commands through our own scripts.
const {exec} = require('child_process');

// The following function is responsible for executing the python code using the exec command.
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
