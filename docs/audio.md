# 音频类

## audio.startRecord

> 通知宿主开启音频录制功能

* H5端调用如下

```js
JSApi.audio.startRecord();
```

* App端处理逻辑

	* 接受到`action`=`audio.startRecord`的操作指令

## audio.playVoice

> 通知宿主开启语音播放功能

* H5端调用如下

```js
JSApi.audio.playVoice("xxxxxxxxxx");
```

* App端处理逻辑

	* 接收到`action`=`audio.playVoice`的操作指令
	* 判断是否接收到H5传递的callbackid,并缓存下来
	* 执行原生代码的处理
	* 如果存在callbackid,则执行`JSApi.invokeH5(callbackid)`

* App端接收到的对象数据结构如下

```js
{
	/**
	 * 待播放的语音文本
	 */
	text: string
}
```

## voice.play.end (->H5)

> 宿主主动通知H5语音播放完毕

* App端调用如下

```js
JSApi.invokeH5("voice.play.end");
```

* H5端接收如下

```js
JSApi.onVoicePlayEnd({
	success:function(){

	},
	error:function(err){

	}
})
```

## audio.record.end (->H5)

> 宿主主动通知H5音频录制完毕

* App端调用如下

```js
JSApi.invokeH5("audio.record.end");
```

* H5端接收如下

```js
JSApi.onAudioRecordEnd({
	success:function(){

	},
	error:function(err){

	}
})
```
