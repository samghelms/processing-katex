/*
Author: Samuel Helms
The main interface for the parsing pipeline.
*/
var sc = require('skale').context();

// const parser = katex.__parse

// function test(el) {
//   return el + sc.env.katex
// }


// sc.require({katex: 'katex/katex.min.js'}).textFile('./testData/test.txt')
//   .flatMap(katex.__parse)
//   .collect()
//   .then(console.log)


// function reducer(a, b) {a.push(b); return a;}
// function combiner(a, b) {return a.concat(b);}

// function dup(a) {return [a, a];}
// function parse(a) {
//   return katex.__parse(a)
// }

sc.require({katex: 'katex/katex.min.js'}).textFile('./testData/test.txt')
  .flatMap(a => katex.__parse(a))
  .collect()
  .then(console.log)
  // .aggregate(reducer, combiner, [], function(err, res) {
  //   console.log(res);
  //   res.sort();
  //   // console.assert(JSON.stringify(res) === JSON.stringify([1, 1, 2, 2, 3, 3, 4, 4])); 
  //   sc.end();
  // });

  // .then(sc.end());
  // .map(word => [word, 1])
  // .reduceByKey((a, b) => a + b, 0)
  // .count(function (err, result) {
  //   console.log(result);
  //   sc.end();
  // });

  // .map(a => add3)
  // .collect()
  // .then(console.log);