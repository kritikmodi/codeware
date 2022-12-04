const {exec} = require('child_process');
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, "outputs");

if(fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive : true});
}

const executeCpp = (filepath) => {
    return new Promise((resolve, reject) => {
        const jobId = path.basename(filepath).split(".")[0];
        const outPath = path.join(outputPath, `${jobId}.out`);
        exec(`g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`,
              (error, stdout, stderr) => {

              });
    });
}

module.exports = {
    executeCpp
}