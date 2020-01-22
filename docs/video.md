# 视频类

## video.play

> 通知宿主开启视频播放功能

* H5端调用功能

```js
// 默认调用
JSApi.video.play("http://xxx.mp4");

// 个性化定制调用
JSApi.video.play({
	url:"http://xxx.mp4",
	extra:{}
});

// 带回调的调用
JSApi.video.play("http://xxx.mp4",function(feedback){
	/**
	 * do something
	 */ 
})
```

* App端处理逻辑

	* 接受到`action`=`video.play`的操作指令
	* 判断是否接收到H5传递的callbackid,并缓存下来
	* 执行原生代码的处理
	* 如果存在callbackid,则执行`JSApi.invokeH5(callbackid,feedback对应的json字符串)`

* App端接收到的对象数据结构如下

```js
{
	/**
	 * video链接
	 */
	url: string;
	/**
	 * 播放倍速
	 */
	speed?: number;
	/**
	 * 直接定位的
	 */
	progress?: number;
	/**
	 * 播放尺寸比例
	 *
	 *  例如: 16*9
	 */
	size?: string;
	/**
	 * 扩展参数
	 *
	 * @type {*}
	 */
	extra?: any;
}
```

* App端传递至H5的`feedback`对象数据结构如下

```js
{
	/**
	 * 视频播放状态
	 *
	 * 0: 已暂停 ，1: 播放中
	 */
	state: 0 | 1;
	/**
	 * 播放进度
	 */
	progress?: number;
}
```