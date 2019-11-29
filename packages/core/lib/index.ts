import { includes } from "./utils";
import { api, bindListener, wrap, invokeH5, notifyHost, _ } from "./api";
import {
	init,
	JSApi,
	HostInvokePayload,
	JSApiFuncCallHost,
	JSApiFuncOn,
	JSApiFuncInvokeH5,
	JSApiFuncWrap,
	JSApiFuncWrapHandler,
	JSApiFuncNotifyHost
} from "./actions/index";

const ForbiddenActions = ["on", "wrap", "invokeH5", "error", "debug"];

/**
 * 提供给外部重载
 */
wrap<JSApiFuncCallHost>("callHost", (payload: HostInvokePayload): void => {
	window.JSBridge
		? window.JSBridge.invoke && window.JSBridge.invoke(payload.action, payload.data, payload.callbackid)
		: window.webkit &&
		  window.webkit.messageHandlers &&
		  window.webkit.messageHandlers.JSBridge &&
		  window.webkit.messageHandlers.JSBridge.postMessage &&
		  window.webkit.messageHandlers.JSBridge.postMessage(payload);
});

wrap<JSApiFuncOn>(
	"on",
	(action: string): JSApi => {
		if (action !== "config" && action !== "ready" && action !== "error") {
			bindListener(`on.${action}`);
		} else {
			invokeH5("error", {
				code: 403,
				msg: `Error: Forbidden "${action}" by "on"`
			});
		}
		return JSApi;
	}
);

wrap<JSApiFuncInvokeH5>("invokeH5", invokeH5);

wrap<JSApiFuncWrap>(
	"wrap",
	(action: string, handler: JSApiFuncWrapHandler): JSApi => {
		if (includes(ForbiddenActions, action)) {
			invokeH5("error", {
				code: 403,
				msg: `Error: Forbidden wrap "${action}"`
			});
		} else {
			const fn = handler(notifyHost as JSApiFuncNotifyHost);
			fn && wrap(action, fn);
		}
		return JSApi;
	}
);

const JSApi = api as JSApi;

JSApi._ = _;

init();

export default JSApi;

export * from "./actions/index";

export * from "./utils";
