// 用来解析命令行参数的
const yargs = require("yargs/yargs");
console.log(process.argv);
// 命令行执行 node lerna2.js create demo， 得到如下
// [
//   'C:\\Program Files\\nodejs\\node.exe',
//   'E:\\mine\\github\\lerna-lerna2\\doc\\lerna2.js',
//   'create',
//   'demo'
// ]

// 获取命令行参数
const argv = process.argv.slice(2); // ['create', 'demo']

const cli = yargs();
// 所有命令的全局选项
// lerna --help 可以查看源码的全局选项，这里就写一个logLevel
const globalOptions = {
  logLevel: {
    type: "string",
    describe: "日志的级别",
    defaultDescription: "info",
    alias: "L",
  },
};

const globalKeys = Object.keys(globalOptions).concat(["help", "version"]);
cli
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
  )
  .command({
    command: "create <name>", // 命令的格式
    describe: "创建一个lerna管理的包",
    builder: (yargs) => {
      yargs
        .positional("name", {
          type: "string",
          describe: "包名",
        })
        .options({
          registry: {
            group: "Command Groups:",
            type: "string",
            describe: "配置包的发布的仓库地址",
          },
        });
    },
    handler: (argv) => {
      console.log("执行init命令", argv);
    },
  })
  .parse(argv);
