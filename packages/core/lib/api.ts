import { toCamelCase, isString } from "./utils";

export type KV<T> = { [key: string]: T };

const cbBuckets: KV<Function> = {};

export const api: KV<any> = {};

/**
 * 创建回调的id
 *
 * @param {string} action 该回调绑定的操作action名称
 * @returns {string}
 */
function createCbId(action: string): string {
	return `cb_${action}_${new Date().getTime()}`;
}

/**
 * H5通知App执行交互操作
 *
 * @export
 * @param {string} action 操作名称
 * @param {KV<any>} params 执行操作携带的数据
 * @param {Function} [cb] 操作完成后的回调
 */
export function notifyHost(action: string, params: KV<any>, cb?: Function): void {
	let callbackid = "";

	cb && (cbBuckets[(callbackid = createCbId(action))] = cb);

	const data = params ? JSON.stringify(params) : "";

	const payload = {
		action,
		data,
		callbackid
	};

	api.callHost && api.callHost(payload);
}

/**
 * App内去调用H5的操作或者回调
 *
 * @export
 * @param {string} actionOrCbId 操作名称或者回调id
 * @param {string} dataJSON json数据串
 * @returns
 */
export function invokeH5(actionOrCbId: string, dataJSON: string): void {
	if (!actionOrCbId) return;

	const cb = cbBuckets[actionOrCbId];

	if (!cb) return;

	api.onH5InvokeDebug && api.onH5InvokeDebug(actionOrCbId, dataJSON);

	if (!dataJSON) return cb();

	let data;

	try {
		data = JSON.parse(dataJSON);
	} catch {
		data = isString(dataJSON) ? dataJSON : {};
	}

	cb(data);
}

/**
 * 包装交互action
 *
 * @export
 * @param {string} action 交互操作的名称
 * @param {Function} [handler] 交互操作的回调
 * @returns {void}
 */
export function wrap(action: string, handler: Function): void {
	const names = action.split(".");

	if (names.length === 1) {
		api[names[0]] = handler;
		return;
	}

	let name = names.shift() || "",
		kv;

	if (!kv) {
		kv = api[name] || (api[name] = {});
		name = names.shift() || "";
	}

	while (!!name) {
		if (!kv[name]) {
			kv[name] = names.length === 0 ? handler : (kv = {});
		} else {
			kv = kv[name];
		}
		name = names.shift() || "";
	}
}

/**
 * 监听App发出的事件
 *
 * @export
 * @param {string} action 监听事件操作名称
 * @returns {void}
 */
export function bindListener(action: string): void {
	if (!action.startsWith("on")) return;

	const actions = action.split(".");

	actions.shift();

	const realAction = actions.join(".");

	if (!realAction || cbBuckets[realAction]) return; // 防止只传递"on"的影响 以及禁用监听覆盖

	api[toCamelCase(action)] = (args: any): void => {
		cbBuckets[realAction] = (dataStr?: string, err?: Error): void => {
			if (err) {
				args.error && args.error(err);
				return;
			}

			if (!dataStr) return args.success && args.success();

			let data;
			try {
				data = JSON.parse(dataStr);
			} catch (ex) {
				args.error && args.error(ex);
				data = {};
			}

			args.success && args.success(data);
		};
	};
}

export function registerAction(action: string, fn: Function): void {
	cbBuckets[action] = fn;
}
