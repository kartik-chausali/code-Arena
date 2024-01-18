const path = require('path');
const fs = require('fs');
const { spawn, exec } = require('child_process');
const { stderr, stdout } = require('process');
const { error } = require('console');
const outFolder = path.join(__dirname, "output");
if(!fs.existsSync(outFolder)){
    fs.mkdirSync(outFolder, {recursive:true});
}
 const executeCpp = (filePath)=>{
    
    const jobid = path.basename(filePath).split(".")[0];
    const outPath = path.join(outFolder, `${jobid}.out  `);

   return new Promise((resolve, reject)=>{
     exec(`g++ ${filePath} -o ${outPath} && cd ${outFolder} && ./${jobid}.out`, 
        (error, stdout, stderr)=>{
            if(error){
                reject({error, stderr});
            }
            if(stderr){
                reject(stderr);
            }
            resolve(stdout);
        })   
   })

 }

 module.exports = {
    executeCpp,
 }