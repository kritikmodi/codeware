const fs = require('fs');

const path = require('path');

const dirCodes = path.join(__dirname, "codes");

if(!fs.existsSync(dirCodes)){
  fs.mkdirSync(dirCodes, {recursive: true});
}
const generateFile = async (format, code) => {
  const jobId = uuid();
  const filename = `${jobId}.${format}`;
  const filepath = path.join(dirCodes, filename);
  await fs.writeFileSync(filepath, content);
  return filepath;
};

module.exports = {
  generateFile,
};
