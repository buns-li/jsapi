# 重载底层实现

JSApi内部提供的一个默认的重载操作接口action=`onHostInvoke`


如何实现兼容各端

* 微信公众号H5

```js

JSApi.wrap("onHostInvoke",(payload)=>{

	if(isInWxH5()){

		if(payload.action === 'image.choose'){

			const data = JSON.parse(payload.data || "");

			const {count,sizeType,sourceType} = data;

			wx.chooseImage({
					count,
					sizeType,
					sourceType,
					success:function(res){
						var localIds = res.localIds;
					}
			})
		}
	}
});


// 此时上层应用还是继续使用如下调用方式:

JSApi.image.choose({count:3,sizeType:["original"],sourceType:["album"]});

```


我们通过上述的方式来保证上层接口统一的前提下，兼容H5的不同容器~~~,达到完美适配多端的目标！