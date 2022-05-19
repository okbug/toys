最简React项目模板
可以支持JSX写法
没有过多的配置

```shell
# 创建新目录
mkdir my-react

# 进入目录
cd ./my-react

# 初始化仓库
npm init -y

# babel 与 React相关的
npm install babel-loader @babel/preset-env @babel/preset-react @babel/core @babel/cli -D

# Webpack插件
npm install html-webpack-plugin clean-webpack-plugin -D

# Webpack 
npm install webpack webpack-cli webpack-dev-server -D 

# React的包
npm install react react-dom  

# 设置启动项目命令
npm set-script dev "webpack serve"
npm set-script build "webpack"

# 开启项目
npm run dev
```