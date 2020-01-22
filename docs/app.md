# 原生App交互约定

## userAgent

App的webview必须设置用户代理,方便H5来有效判断是否是来自党建App加载的

需要添加`JSAPI_APP`关键字,前者是兼容老App，后者是判断是否是在新App中,用于做兼容处理

## url

为了节省App和H5的二次开发工作,针对App加载H5的url地址的query参数做出如下约定:

* `fullscreen`
	
	* 0: 非全屏带导航栏
	* 1: 全屏不带状态栏
	* 2: 全屏带状态栏

... 等待继续讨论

## action

所有的个性化业务的调用action，全部以`app.xxx`的形式确定交互action的名称