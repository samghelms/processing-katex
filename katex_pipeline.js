/*
Author: Samuel Helms
The main interface for the parsing pipeline.
*/
const assert = require('assert');
const fs = require('fs');
var skale = require('skale')
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
      const str = arr[1]
      return katex.__parse(str, {throwOnError: false})
    }
    catch(err) {
      return "error"
    }
  }
  return "error"
}

const processStream = (filename) => {

  sc.require({katex: './lib/katex/katex.min.js'}).textFile(filename)
    .map(prepLine)
    .map(parse)
    .save("testOut/", {stream: true}).then(()=>sc.end());
}

const partitionStream = (stream) => {

  var partitioned = sc.lineStream(stream).getPartitions()

  return partitioned

}

const main = (argv) => {
  assert(argv.length === 3)
  var stream
  try {
    stream = fs.createReadStream(argv[2], 'ascii');
  } catch(err) {
    console.log("invalid filename")
  }
  // var partd = partitionStream(argv[2])
  // console.log(partd)
  processStream(argv[2])
}

main(process.argv)

