// Th exec module is used to execute shell commands through our own scripts.
const {exec} = require('child_process');

// The following function is responsible for executing the Java code using the exec command.
const executeJava = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);
    return new Promise((resolve, reject) => {
        exec(`javac ${filepath}`,
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
