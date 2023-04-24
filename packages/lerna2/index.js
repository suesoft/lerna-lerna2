"use strict";
const cli = require("@lerna2/cli");
const initCmd = require("@lerna2/init/command");
const createCmd = require("@lerna2/create/command");

function main(argv) {
  // cli返回的是yargs的实例 => 配置init命令 => 解析执行
  return cli().command(initCmd).command(createCmd).parse(argv);
}

module.exports = main;
