# Pokemon GO 移动工具

这个项目是通过 Xcode Debug 的 [Simulating a Location at Runtime](https://developer.apple.com/library/ios/recipes/xcode_help-debugger/articles/simulating_locations.html) 来实现给 **非越狱** 的 iOS 设备模拟出虚拟的 GPS 定位地址。

由于目前 Pokemon GO 在中国还未开放，所以你需要模拟出到其他国家。

## 主要功能

- 一个空白的 iOS 项目，用于 Debug 模式链接 `Simulate Location`;
- 一个 Sinatra 写的 Web 界面，用于移动，HTML, JS 代码来自于 [PokemonGoControllerSuite](https://github.com/adin283/PokemonGoControllerSuite/tree/master/PokemonGoController);
- 一个 AppleScript 用于自动点击 Xcode 的菜单，以便能不断的将修改过的坐标发送到设备上。

## 系统需求

- Xcode 以及 iOS 开发者账户
- 任意 iOS 设备，安装好 Pokemon GO

## 使用教程

### 打开 foo.xcodeproj

编译运行到 iOS 设备里面。

### 启动 Web 服务

```bash
sudo gem install sinatra -s http://gems.ruby-china.org
```

进入项目目录

```
./start-web
```

看到控制台输出，这样的信息表示成功了，然后浏览器打开 http://127.0.0.1:3001

```
== Sinatra (v1.4.7) has taken the stage on 3001 for development with backup from Puma
Puma starting in single mode...
* Version 3.4.0 (ruby 2.3.1-p112), codename: Owl Bowl Brawl
* Min threads: 0, max threads: 16
* Environment: development
* Listening on tcp://localhost:3001
Use Ctrl-C to stop
```

<img width="456" alt="2016-07-13 11 22 11" src="https://cloud.githubusercontent.com/assets/5518/16790893/18843eb2-48ec-11e6-919e-40d9cfb3ca74.png">

然后在浏览器里面点击上下左右来移动，内部会自动调用 AppleScript 将事件传输给 Xcode，把 GPS 坐标更新到手机上，达到移动的目的。

### 截图

<img width="1096" alt="2016-07-13 11 22 56" src="https://cloud.githubusercontent.com/assets/5518/16790900/2f3dc9f2-48ec-11e6-85eb-c2efa52699a7.png">

<img width="1072" alt="2016-07-13 11 24 07" src="https://cloud.githubusercontent.com/assets/5518/16790916/54f0d2e8-48ec-11e6-9efc-c8d9f495a76d.png">


### 参考:

- https://ruby-china.org/topics/30510