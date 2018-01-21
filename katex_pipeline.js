/*
Author: Samuel Helms
The main interface for the parsing pipeline.
*/
const assert = require('assert');
const fs = require('fs');
var sc = require('skale').context();

const prepLine = (line) => {
  const slashRegex = /\\\\/gi;
  const cleanLine = line.replace(slashRegex, '\\')
                        .replace("\\begin{equation}", "")
                        .replace("\\end{equation}", "");
  return cleanLine.split("\t")
}

const parse = (arr) => {
  if(arr.length === 2) {
    try {
      return katex.__parse(str, {throwOnError: false})
    }
    catch(err) {
      return "error"
    }
  }
  return "error"
}

const processStream = (stream) => {
  sc.require({katex: './lib/katex/katex.min.js'}).lineStream(stream)
    .map(prepLine)
    .map(parse)
    .save("testOut/", {gzip: true, stream: true}).then(()=>sc.end());
}

const main = (argv) => {
  assert(argv.length === 3)
  var stream
  try {
    stream = fs.createReadStream(argv[2], 'ascii');
  } catch(err) {
    console.log("invalid filename")
  }
  processStream(stream)
}

main(process.argv)

