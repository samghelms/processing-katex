# setup

(You will need to have node package manager [npm] and node installed)

clone the repository and then run `npm install` 

Then, just type `node katex_pipeline.js`. You should see the output in your console. 

All of the relevent code is in katex_pipeline.js (this code shouldn't be too hard to read if you have some familiarity with spark).

# Dependencies:

## Skale

Spark for javascript.

https://github.com/skale-me/skale

## KaTeX

https://github.com/Khan/KaTeX

(specifically, the intermediary parse tree they use when rendering math for the web)

Get started reading the code on this representation here: https://github.com/Khan/KaTeX/blob/master/katex.js