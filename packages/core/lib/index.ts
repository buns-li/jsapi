import { includes, isFunction } from "./utils";
import { api, bindListener, wrap, invokeH5, notifyHost } from "./api";
import { init, JSApi, HostInvokePayload, ArgsTransform } from "./actions/index";

const ForbiddenActions = ["on", "wrap", "invokeH5", "config", "ready", "error", "callHost"];

/**
 * 提供给外部重载
 */
wrap("callHost", (payload: HostInvokePayload): void => {
	window.JSBridge
		? window.JSBridge.invoke(payload.action, payload.data, payload.callbackid)
		: window.webkit &&
		  window.webkit.messageHandlers &&
		  window.webkit.messageHandlers.JSBridge &&
		  window.webkit.messageHandlers.JSBridge.postMessage(payload);
});

const JSApi = api as JSApi;

JSApi.on = function(action: string): JSApi {
	if (includes(ForbiddenActions, action)) {
		JSApi.invokeH5(
			"error",
			JSON.stringify({
				code: 403,
				msg: `Error: Forbidden ${action}`
			})
		);
	} else {
		bindListener(`on.${action}`);
	}

	return JSApi;
};

JSApi.wrap = function wrapFn(action: string, argsTransform?: ArgsTransform): JSApi {
	wrap(action, (...args: any[]): void => {
		let cb;
		if (args && args.length && isFunction(args[args.length - 1])) {
			cb = args.pop() as Function;
		}
		notifyHost(action, args && args.length && argsTransform ? argsTransform(...args) : {}, cb);
	});
	return JSApi;
};

JSApi.invokeH5 = invokeH5;

init();

export default JSApi;

export * from "./actions/index";

export * from "./utils";
