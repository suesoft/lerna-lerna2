利用lerna实现lerna(命名为lerna2)，并实现指令: create/cli/init

```shell
mkdir lerna2-test
cd lerna2-test
# 初始化
lerna2 init
# 创建包demo
lerna2 create demo
```

- lerna2:需要link到全局
`npm link`
`npm root -g`


- init要干啥?
  - 创建文件和目录:
  - package.json
  - lerna.json
  - packages

- create?
  - 创建文件夹lib
  - 创建文件夹__tests__
  - 创建package.json文件