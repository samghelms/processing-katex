/*
Author: Samuel Helms
The main interface for the parsing pipeline.
*/
var sc = require('skale').context();

sc.require({katex: './lib/katex/katex.min.js'}).textFile('./testData/test.txt')
  .flatMap(a => katex.__parse(a))
  .collect()
  .then(console.log)