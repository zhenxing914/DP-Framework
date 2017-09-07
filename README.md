1.Get started

    安装node

    git clone http://10.142.78.33:8080/zhangmuren/DP-Framework.git  //从我们提供的gitlab 上 克隆git仓库到本地~~包含了脚手架

    npm install  //安装依赖

    npm run dev // 开发模式

    npm run dist //打包

2.脚手架目录结构介绍

    dist  // 打包后的文件

    src   // 开发目录,所有业务代码 放在这个里面

    |- index.js //入口文件 主要放置路由和引入css

    |- template // index.html模板  保持不变

    |- layout // 头尾+侧边栏 的整体布局  保持不变

    |- components  // 公用组件, 所有页面逻辑都在这里,每一个页面都是一个组件

    |- views // 页面组件  每一个页面都是一个组件

        |- FormSubmit
            |- FormSubmit.js // js,输出react 对象

    index.html // 保持不动,用于dev的模板

    package.json // 项目信息  项目名可以改一下

    server.js  // 开发模式下 服务设置, 可以设置请求代理和转发

    webpack.config.dev.js // 保持不动, dev下的webpack配置

    webpack.config.dist.js // 保持不动, build下的webpack配置


