var fs=require("fs");

var readstream=fs.createReadStream('input.txt');
var writestream=fs.createWriteStream('output.txt');

readstream.pipe(writestream);
//true
console.log(exports==module.exports)