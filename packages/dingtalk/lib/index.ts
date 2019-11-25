import JSApi, { AuthParams, HostInvokePayload, includes } from "@jsapi/core";

import * as dd from "dingtalk-jsapi";
import actionMap, { DingTalkErrorInfo } from "./adapter";

let allowJSApiList: string[] = [];

JSApi.config = function config(params: AuthParams): void {
	const extra = params.extra || {};

	dd.config({
		jsApiList: params.jsApiList,
		nonceStr: params.nonceStr,
		signature: params.signature,
		timeStamp: params.timeStamp,
		agentId: extra.agentId,
		corpId: extra.corpId,
		type: extra.type
	});
	allowJSApiList = params.jsApiList.slice();
};

JSApi.callHost = function(payload: HostInvokePayload): void {
	if (includes(allowJSApiList, payload.action)) {
		// TODO: 钉钉Action和JSApiaction的映射
		actionMap[payload.action](payload);
	} else {
		JSApi.invokeH5(
			"error",
			JSON.stringify({
				code: 403,
				msg: `'${payload.action}' not in jsApiList config`
			})
		);
	}
};

dd.ready(() => {
	JSApi.invokeH5("ready", "");
});

dd.error((err: DingTalkErrorInfo) => {
	JSApi.invokeH5(
		"error",
		JSON.stringify({
			code: err.errorCode,
			msg: err.errorMessage
		})
	);
});

export default JSApi;
