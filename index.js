const fs = require('fs');
const path = require('path');

const url = process.argv[2];
const pre = process.argv[3];
const curr = process.argv[4];
const branch = process.argv[5];
const repo = process.argv[6];
// const repoBranchDir = `${repo}_${branch}`;
const repoBranchDir = url.replace('/','_');

const repoConfig = path.resolve(process.cwd(), '.scratchrc');

let config = {
  scratchFiles: path.resolve(__dirname, path.join('repo/', repoBranchDir)),
  scratchFile: 'scratch.md'
};

config = fs.existsSync(repoConfig) ? {...config, ...JSON.parse(fs.readFileSync(repoConfig))} : config;
config.scratchFile = path.resolve(config.scratchFiles, config.scratchFile);

const ext = path.extname(config.scratchFile);

if(!fs.existsSync(path.resolve(__dirname, 'repo'))){
  fs.mkdirSync(path.resolve(__dirname, 'repo'));
}
if(!fs.existsSync(config.scratchFiles)){
  fs.mkdirSync(config.scratchFiles);
}

if(fs.existsSync(config.scratchFile)){
  fs.writeFileSync(path.resolve(config.scratchFiles, pre + ext), fs.readFileSync(config.scratchFile));
}

fs.writeFileSync(
  config.scratchFile,
  fs.existsSync(path.resolve(config.scratchFiles, curr + ext)) ?
    fs.readFileSync(path.resolve(config.scratchFiles, curr + ext)) :
    ''
);

console.log(`Switched scratch pad`);

// could add option to use symlink instead but changes aren't updated in IDE
// if(!fs.existsSync(path.resolve(config.scratchFiles, curr + ext))){
//   fs.writeFileSync(path.resolve(config.scratchFiles, curr + ext), '');
// }
//
// // link new one
// exec(`ln -sfn ${path.resolve(config.scratchFiles, curr + ext)} ${config.scratchFile}`, (err, stdout, stderr) => {
//   if (err) {
//     console.error(`Scratch error: ${err}`);
//     return;
//   }else{
//     console.log(`Switched scratch pad '${curr}'`);
//   }
// });
