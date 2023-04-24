"use strict";

const path = require("path");
const fs = require("fs-extra");
const initPackageJson = require("pify")(require("init-package-json"));
class CreateCommand {
  constructor(options) {
    this.options = options;
    this.rootPath = path.resolve();
  }

  async execute() {
    // name=xxx  registry=私服的地址
    const { name, registry } = this.options;
    this.targetDir = path.join(this.rootPath, `packages/${name}`);
    this.libDir = path.join(targetDir, `lib`);
    this.testDir = path.join(targetDir, `__tests__`);
    await fs.mkdirp(this.libDir); // 创建一个lib目录
    await fs.mkdirp(this.testDir); // 创建一个test目录
    // init-package-json 可以弹出选项让我们填写package.json信息
    // pify 可以把一个回调方式改为promise方式
    await initPackageJson(this.targetDir, ""); // 创建package.json
  }

  async initPackageJson() {}
}

function factory(argv) {
  new CreateCommand(argv).execute();
}

module.exports = factory;
