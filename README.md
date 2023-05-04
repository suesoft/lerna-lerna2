# 安装lerna
```shell
# 1. 全局安装lerna
npm install -g lerna

# 查看下全局的包的安装路径
npm root -g
```
# 利用lerna实现lerna
(命名为lerna2)，并实现指令: create/cli/init
- 创建包
```shell
mkdir lerna-lerna2 && cd lerna-lerna2

# 初始化 独立模式：lerna init --independent
# 若之前已经创建，想要独立模式，可将lerna.json里面的version改为independent
lerna init

# 假设创建新的包项目lerna2、@lerna2/cli、@lerna2/init、@lerna2/create
# 此处http://localhost:4873/ 是本地建的 npm 私服地址
lerna create lerna2 --registry http://localhost:4873/
lerna create @lerna2/cli --registry http://localhost:4873/
lerna create @lerna2/init --registry http://localhost:4873/
lerna create @lerna2/create --registry http://localhost:4873/
```
- 发布到私服
```shell
lerna diff   # 查看哪些文件变更了
lerna publish
```

- 相互依赖
场景：packages/lerna2 依赖于 paclages/cli、packages/init、packages/create

在 packages/lerna2/packages.json 里添加：
```json
"dependencies": {
    "@lerna2/cli": "^0.0.0",
    "@lerna2/init": "^0.0.0",
    "@lerna2/create": "^0.0.0"
  }
```
- 建立连接
```shell
# yarn link 和 npm link都会链接到全局
# lerna link 只在当前项目链接，不会链接到全局
lerna link

npm root -g
```
- 源码书写
  - init要干啥?
    - 创建文件和目录:
    - package.json
    - lerna.json
    - packages

  - create?
    - 创建文件夹lib
    - 创建文件夹__tests__
    - 创建package.json文件

- 测试lerna2 以及其指令 lerna2 init/lerna2 create

```shell
mkdir lerna2-test
cd lerna2-test
# 初始化
lerna2 init
# 创建包demo
lerna2 create demo
```

# 创建 npm 私服
verdaccio是一个简单，零配置的本地私有化npm 仓库
https://verdaccio.org/

```shell
# 全局安装verdaccio
npm install verdaccio -g

# 完成后，浏览器访问http://localhost:4873/
verdaccio

# 添加用户
npm adduser --registry http://localhost:4873/
abc   # 账号
123456   # 密码

# 发布
npm publish --registry http://localhost:4873/
```