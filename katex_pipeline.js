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

const processStream = (stream) => {
  sc.require({katex: './lib/katex/katex.min.js'}).lineStream(stream)
    .map(prepLine)
    .map(arr=> arr.length === 2 ? katex.__parse(arr[1], {throwOnError: false}): "Error" )
    .save("testOut/").then(()=>sc.end());
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

