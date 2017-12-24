#!/usr/bin/env node

let program = require('commander');
let pkg = require('./package');

let tagValue = undefined;

program
    .version(pkg.version)
    .description(pkg.description)
    .usage('9tsu-tag-fetcher <tag>')
    .arguments('<tag>')
    .action(function(tag,url){
        tagValue = tag;
    });
program.parse(process.argv);
if(typeof tagValue === 'undefined'){
    console.error(program.usage());
    process.exit(1);
}

let NineTsuTagFetcher = require('./lib/9tsu-tag-fetcher');
let ghs = new NineTsuTagFetcher();
let list = ghs.getVideoList(tagValue);
console.log(list);
