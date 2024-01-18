const path = require('path');
const dirCodes = path.join(__dirname, "codes");
const fs = require('fs');
const {v4: uuid} = require('uuid');

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, {recursive:true});
}

const generateFile = async (format , code)=>{
    const jobid = uuid();
    let fileName = `${jobid}.${format}`;
    const filePath = path.join(dirCodes, fileName);
    await fs.writeFileSync(filePath, code);
    return filePath;
}

module.exports = {
    generateFile,
}