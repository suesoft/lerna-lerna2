"use strict";

module.exports = lernaCLI;

const yargs = require("yargs/yargs");
function lernaCLI() {
  const cli = yargs();
  const globalOptions = {
    logLevel: {
      type: "string",
      describe: "日志的级别",
      defaultDescription: "info",
      alias: "L",
    },
  };

  const globalKeys = Object.keys(globalOptions).concat(["help", "version"]);
  return cli
    .options(globalOptions)
    .group(globalKeys, "Global Options:")
    .usage(`Usage: $0 <command> [options]`) // lerna create demo
    .demandCommand(1, "至少需要一个命令")
    .strict(true) // true 严格模式，输入的命令不认识，会报错ERR! lerna Unknown command "xx"
    .recommendCommands() // 如果写错了，它会帮你提建议
    .fail((msg, error) => {
      // 这里可以个性化你的错误展示
      console.error(msg);
      console.error(error);
    })
    .alias("h", "help") // 指定别名
    .alias("v", "version")
    .epilogue(
      "When a command fails, all logs are written to lerna-debug.log in the current working directory"
    );
}
