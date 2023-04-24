exports.command = "create <name>";
exports.describe = "创建一个新的lerna管理的包";
exports.builder = (yargs) => {
  console.log("create builder");
  yargs
    .positional("name", {
      // lerna create xxx
      type: "string",
      describe: "包名",
    })
    .options({
      // lerna create xxx --registry=http://npm.org
      registry: {
        group: "Command Groups:",
        type: "string",
        describe: "配置包的发布的仓库地址",
      },
    });
};

// create命令真正的处理逻辑
exports.handler = (argv) => {
  console.log("执行create命令", argv);
  return require(".")(argv);
};
