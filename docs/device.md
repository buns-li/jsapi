# 设备类

## device.getNetworkType

> 获取设备的网络连接信息

* H5端调用如下:

```js
JSApi.device.getNetworkType((type)=>{
	//type: "2g" | "3g" | "4g" | "5g" | "wifi" | "NOTREACHABLE" | "UNKNOWN";

	/**
	 * UNKNOWN: 未知网络
	 * NOTREACHABLE: 未连接网络
	 */
})

```

* App端处理逻辑如下:

	* 接受到`action`=`device.getNetworkType`的操作指令
	* 同时会接收到该操作携带的回调id,例如: `cb_device.getNetworkType_15021223123`
	* 调用JSApi提供的invokeH5方法来告知H5执行对应的回调:

```js
window.JSApi.invokeH5("cb_device.getNetworkType_15021223123","4g");
```

### 使用场景:

- H5需要执行远程请求之前的动作
- H5需要跳转至新页面之前的动作

## device.getLocation

> 获取当前用户所处的坐标系数据

* H5端调用如下:

```js
JSApi.device.getLocation((res)=>{
	/**
	 * do something
	 */
})

```

* App端处理逻辑如下:
	
	* 接受到`action`=`device.getLocation`的操作指令
	* 同时会接收到该操作携带的回调id,例如: `cb_device.getLocation_15021223123`
	* 调用JSApi提供的invokeH5方法来告知H5执行对应的回调:

```js
window.JSApi.invokeH5("cb_device.getLocation_15021223123",'{"longitude":"10.111","latitude":"10.344"}');
```

### 使用场景:

- H5有针对定位需求的情况下

### 注意

针对此操作涉及到的数据结构的定义如下:

```js
{
	/**
	 * 经度
	 */
	longitude: string;
	/**
	 * 纬度
	 */
	latitude: string;
	/**
	 *省份名
	 */
	province?: string;
	/**
	 *城市名
	 */
	city?: string;
	/**
	 *城市编码
	 */
	cityCode?: string;
	/**
	 *区域编码
	 */
	adCode?: string;
	/**
	 * 扩展字段
	 */
	extra?: any;
}
```