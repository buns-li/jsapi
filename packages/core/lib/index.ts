import { canUseIOSWK, isAndroid, includes } from "./utils";
import { api, bindListener, wrap, invokeH5 } from "./api";
import { init, JSApi, HostInvokePayload } from "./actions/index";

const ForbiddenActions = ["on", "wrap", "invokeH5", "config", "ready", "error", "callHost"];

/**
 * 提供给外部重载
 */
wrap("callHost", (payload: HostInvokePayload): void => {
	if (canUseIOSWK()) {
		webkit &&
			webkit.messageHandlers &&
			webkit.messageHandlers.JSBridge &&
			webkit.messageHandlers.JSBridge.postMessage(payload);
	} else if (isAndroid) {
		JSBridge && JSBridge.invoke(payload.action, payload.data, payload.callbackid);
	}
});

const JSApi = api as JSApi;

JSApi.on = function(action: string): void {
	if (includes(ForbiddenActions, action)) {
		return;
	}
	bindListener(`on.${action}`);
};

JSApi.wrap = wrap;

JSApi.invokeH5 = invokeH5;

init();

export default JSApi;

export * from "./actions/index";

export * from "./utils";
