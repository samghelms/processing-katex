/*
Author: Samuel Helms
The main interface for the parsing pipeline.
*/
const assert = require('assert');
const fs = require('fs');
var skale = require('skale')

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
      const str = arr[1]
      return katex.__parse(str, {throwOnError: false})
    }
    catch(err) {
      return "error"
    }
  }
  return "error"
}

const processStream = (arr) => {

  var sc = require('skale').context();

  sc.require({katex: './lib/katex/katex.min.js'}).parallelize(arr)
    .map(prepLine)
    .map(parse)
    .save("testOut/", {stream: true}).then(()=>sc.end());
}

const main = (argv) => {
  assert(argv.length === 3)
  var file
  try {
    file = fs.readFileSync(argv[2], 'ascii');
  } catch(err) {
    console.log("invalid filename")
  }
  // var partd = partitionStream(stream)
  const arr = file.split("\n")
  processStream(arr)
}

main(process.argv)

