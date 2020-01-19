import JSApi, { AuthParams, HostInvokePayload, includes } from "@jsapi/core";

import dd from "dingtalk-jsapi";
import actionMap, { DingTalkErrorInfo } from "./adapter";

let allowJSApiList: "*" | string[] = [];

JSApi.config = function config(params: AuthParams): void {
	const extra = params.extra || {};

	dd.config({
		jsApiList: params.jsApiList === "*" ? [] : params.jsApiList,
		nonceStr: params.nonceStr,
		signature: params.signature,
		timeStamp: params.timeStamp,
		agentId: extra.agentId,
		corpId: extra.corpId,
		type: extra.type
	});

	allowJSApiList = params.jsApiList === "*" ? [] : params.jsApiList.slice();
};

JSApi.wrap("callHost", () => (payload: HostInvokePayload): void => {
	if (allowJSApiList === "*" || includes(allowJSApiList, payload.action)) {
		actionMap[payload.action](payload);
	} else {
		JSApi.invokeH5("error", {
			code: 403,
			msg: `'${payload.action}' not in jsApiList config`
		});
	}
});

dd.ready(() => {
	JSApi.invokeH5("ready");
});

dd.error((err: DingTalkErrorInfo) => {
	JSApi.invokeH5("error", {
		code: err.errorCode,
		msg: err.errorMessage
	});
});

export default JSApi;
