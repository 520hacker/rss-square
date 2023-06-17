# RSS广场

RSS 广场是一个纯前端的工程，用于结合[RSS2JSON](https://github.com/520hacker/rss2json)项目展示网站管理员收集的RSS地址的最新的更新。

本广场将支持您以Docker方式部署，参数化退出地址和RSS2JSON地址，支持反向代理RSS2JSON地址。

----

## 页面元素规划

本页面是一个单页的前端web APP程序，目前仅规划用于桌面和手机端呈现。

需求比较简单，功能包含如下

- RSS 的内容卡片
  - 在手机上是单行上下滑动排列。
  - 在电脑上是瀑布流布局，根据卡片的高度和内容进行错层滚动。
  - RSS内容呈现支持Markdown
- RSS 的内容卡片区域
  - 支持下拉加载更多
- RSS 的作者列表
  - 点击之后根据作者进行筛选
  - 设置管理口令之后可以进行添加和删除
- 搜索
  - 唤起搜索界面
  - 搜索提交后更新内容卡片列表
- 设置，设置结果保存到浏览器
  - 允许设置管理口令
  - 允许设置黑暗模式、白天模式
  - 允许设置页面最大宽度
- 管理功能
  - 支持添加新的RSS
  - 支持删除旧的RSS

----

## UI元素规划

- Components
  - PageHeader
    - SettingIcon
    - DarkModeButton
    - SearchBar
    - LogoButton
  - LeftMenu
  - CardList
  - RssCard
- Views
  - HomeView
  - AuthorsView
  - AboutView
  - SettingView
- Menu
  - Setting
    - Password Setting
  - Authors
    - New Author Button
    - Author List
    - Remove Author Button
  - About
    - About Content
  - Exit Square

# rss-square

RSS square is used to display users' subscribed RSS, which is gathered on a page to present the latest content.