# 窗口类

## view.close

> 通知宿主去关闭当前视图页面

* H5调用如下:

```js
JSApi.view.close();
```

* App端处理逻辑如下:

	* 接受到`action`=`view.close`的操作指令

## view.back
> 通知宿主去返回上一层路由


* H5调用如下:

```js
JSApi.view.back();
```

* App端处理逻辑如下:

	* 接受到`action`=`view.back`的操作指令
	* 执行原生代码的处理

## view.forward
> 通知宿主去前进一层路由


* H5调用如下:

```js
JSApi.view.forward();
```

* App端处理逻辑如下:

	* 接受到`action`=`view.forward`的操作指令
	* 执行原生代码的处理


## view.goto

> 通知宿主去跳转到指定路由对应的界面

* H5调用如下:

```js
JSApi.view.goto(url:"http://www.baidu.com",title:"测试标题",query:{a:1,b:1});
```

* App端处理逻辑如下:

	* 接受到`action`=`view.goto`的操作指令
	* 执行原生代码的处理


* App端接收到的view.goto传递过来的数据结构如下

```js
{
	/**
	 * 带跳转的路由地址
	 */ 
	url, 
	/**
	 * 目标路由对应的标题
	 */
	title, 
	/**
	 * 跳转时携带的数据,默认:{}
	 */
	query 
}
```

## view.gotoNative

> 通知宿主去跳转原生界面


* H5调用如下:

```js
// Android原生路由
JSApi.view.gotoNative(url:"/base/activity/create",title:"创建组织生活",query:{a:1,b:1});

// IOS原生路由
JSApi.view.gotoNative(url:"iOSLocalNotice://vote",title:"投票",query:{a:1})

```

* App端处理逻辑如下:

	* 接受到`action`=`view.gotoNative`的操作指令
	* 执行原生代码的处理


## view.fullscreen

> 通知宿主开启全屏

* H5调用如下:

```js

JSApi.view.fullscreen(0);
JSApi.view.fullscreen(0,function(){
	/**
	 *  fullscreen is ok
	 */
});
```

* App端处理逻辑如下:

	* 接受到`action`=`view.fullscreen`的操作指令
	* 判断是否接受到了callbackid的值，来决定是否需要执行回调处理
	* 执行原生代码的处理


* App端针对此操作接受到的数据结构定义如下:

```js
{
	/**
	 * 0: 非全屏带导航栏
	 * 1: 全屏不带状态栏
	 * 2: 全屏带状态栏
	 */
	flag: 0 | 1 | 2
}
```

## view.changeTitle

> 通知宿主去修改顶部导航栏的标题

* H5调用如下:

```js
JSApi.view.changeTitle("新的标题");
JSApi.view.changeTitle("新的标题",function(){
	/**
	 * title is changed ok 
	 */
});
```

* App端处理逻辑如下:

	* 接受到`action`=`view.changeTitle`的操作指令
	* 判断是否接受到了callbackid的值，来决定是否需要执行回调处理
	* 执行原生代码的处理

## view.setNavbarButton

> 通知宿主去改变导航栏的按钮

* H5调用如下:

```js
JSApi.view.setNavbarButton({position:"left",index:0,text:"返回"});
JSApi.view.setNavbarButton({position:"left",index:0,text:"返回"},function(){
	/**
	 * 设置成功
	 */
});
```

* App端处理逻辑如下:

	* 接受到`action`=`view.setNavbarButton`的操作指令
	* 判断是否接受到了callbackid的值，来决定是否需要执行回调处理
	* 执行原生代码的处理

* App端针对此操作接受到的数据结构定义如下:

```js
{
  /**
	 * 待设置按钮的位置
	 *
	 * "left" | "right"
	 */
	position: string;
	/**
	 * 设置按钮的索引
	 */
	index: number;
	/**
	 * 按钮对应的图标链接
	 */
	iconUrl?: string;
	/**
	 * 按钮对应的图标文件的base64串
	 */
	iconBase64Str?: string;
	/**
	 * 按钮对应的文本
	 */
	text?: string;
	/**
	 * 按钮对应的操作命令
	 */
	cmd?: string;
	/**
	 * 扩展参数
	 */
	extra?: any;
}
```

## view.setShareScope

> 通知宿主去控制可分享的目标区域

* H5调用如下:

```js
JSApi.view.setShareScope(["wx","wxMoment"]);
JSApi.view.setShareScope(["wx","wxMoment"],function(){
	/**
	 * 设置成功
	 */
});
```

* App端处理逻辑如下:

	* 接受到`action`=`view.setShareScope`的操作指令
	* 判断是否接受到了callbackid的值，来决定是否需要执行回调处理
	* 执行原生代码的处理

* App端针对此操作接受到的数据结构定义如下:

```js
{
	/**
	 * scopeItem的可能出现的值如下:
	 * 
	 *  wx:微信
	 *  wxMoment: 微信朋友圈
	 *  qq: QQ,
	 *  qZone: QQ空间
	 *  weibo: 微博
	 *  dingtalk: 钉钉
	 *  djChat: 党建好友通信
	 *  djMoment: 党建红土地
	 *  copyLink: 复制链接
	 * 
	 */
	scopes: ["wx","wxMoment",....];
}
```

## view.refresh (->H5)

> 宿主通知H5的操作

* 发生场景

	* App每次加载页面的时候都会通知H5

App端调用如下:

```js
JSApi.invokeH5("view.refresh");
```

H5端监听如下:

```js
JSApi.onViewRefresh({
	success:function(){
		/**
		 * do somethine
		 */ 
	}
})
```

## view.navbar.doubleClick (->H5)

> 宿主通知H5的操作

* 发生场景

	* 双击App顶部导航栏非按钮区域时

App调用如下:

```js
JSApi.invokeH5("view.navbar.doubleClick");
```

H5端监听如下:

```js
JSApi.onViewNavbarDoubleClick({
	success:function(){
		/**
		 * do something
		 * 
		 * 一般用作双击顶部之后，H5自动回到顶部(类似微信的效果)
		 * 
		 */
	}
})
```

