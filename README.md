# BilibiliCleaner / Bilibili 清洁者
chrome扩展，主要功能：屏蔽up主，屏蔽评论。屏蔽列表自动同步云端，可多设备共享。

## 技术相关
这个我没有怎么按照chrome官方的例子套路来，上了``webpack+vue+sass``，当然，在此只是杀鸡用牛刀，不过我就是喜欢hhh。里面的color什么的，太少啦，我也就不抽出来了。

核心代码``main.js``是我初学前端时候写的了，所以挺难看的233。那时候苦于没有信用卡，注册不了开发者账号，也就搁浅了，今天想了起来，就顺手填了填坑。

## 界面/效果预览
<img src="https://github.com/hanFengSan/BilibiliCleaner/blob/master/image/preview-1.png"/>
<img src="https://github.com/hanFengSan/BilibiliCleaner/blob/master/image/preview-2.jpg"/>

**以上UP主名单仅是测试，毫无恶性:)**

## 用户使用说明
[chrome webstore 下载地址](https://chrome.google.com/webstore/detail/bilibili-%E6%B8%85%E6%B4%81%E8%80%85/ihadnfkejmlnpohmlccdmgeikafohamb/related)

直接在输入框中输入用户名称然后点击添加或回车即可，屏蔽列表会自动同步到云端，不用担心丢失。添加是立即见效的，而删除需要重新刷新页面。

## 使用
```
npm install
```
先解决依赖
```
webpack
```
如上，即可完成编译，然后在chrome://extensions中勾选``开发者模式``，再选择``已解压的扩展程序``，选择此根目录，即加载成功。




# License

    Copyright (C) 2016 hanFengSan

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
