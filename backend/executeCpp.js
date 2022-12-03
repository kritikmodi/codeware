const {exec} = require('child_process');
const fs = require('fs');

const outputPath = path.join(__dirname, "outputs");

if(fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive : true});
}

const executeCpp = (filepath) => {

}

module.exports = {
    executeCpp
}