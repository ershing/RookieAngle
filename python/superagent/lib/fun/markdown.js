const fs =require('fs');
const pug = require('pug');
const path = require('path');

function markdown(item) {
    const pugPath = path.resolve(__dirname,'../numbers.pug');
    const compile = pug.compileFile(pugPath);
    const data = compile(item).replace('\n||','');
    fs.writeFileSync('list.md',data);
    console.log('输出成功');
}

module.exports = markdown;