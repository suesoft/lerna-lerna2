"use strict";

const path = require("path");
const fs = require("fs-extra");
const execa = require("execa");
class InitCommand {
  constructor(options) {
    this.options = options;
    this.rootPath = path.resolve();
  }

  async execute() {
    console.info("Initializing Git repository");
    await execa("git", ["init"], { stdio: "pipe" }); // 初始化git仓库
    await this.ensurePackageJSON(); // 生成package.json
    await this.ensureLernaConfig(); // 生成lerna配置
    await this.ensurePackagesDir(); // 生成package文件夹
    console.info("Initialized Lerna files");
  }

  async ensurePackagesDir() {
    console.log("创建packages");
    await fs.mkdirp(path.join(this.rootPath, "packages"));
  }

  async ensurePackageJSON() {
    console.info("创建package.json");
    await fs.writeJSON(
      path.join(this.rootPath, "package.json"),
      {
        name: "root",
        private: true,
        devDependencies: {
          lerna: "^4.0.0",
        },
      },
      { spaces: 2 }
    );
  }

  async ensureLernaConfig() {
    console.info("创建lerna.json");
    await fs.writeJson(
      path.join(this.rootPath, "lerna.json"),
      {
        packages: ["packages/*"],
        version: "0.0.0",
      },
      { spaces: 2 }
    );
  }
}

function factory(argv) {
  new InitCommand(argv).execute();
}

module.exports = factory;
