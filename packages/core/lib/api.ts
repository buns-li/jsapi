import { toCamelCase, isString } from "./utils";
import { DefaultActionListenerParams } from "./actions/listener";

export type KV<T> = { [key: string]: T };

export interface CbBucketValue {
	/**
	 * 类型是否是H5通知宿主
	 */
	t: boolean;
	/**
	 * 实际的回调处理
	 */
	cb: Function;
}

const cbBuckets: KV<CbBucketValue> = {};

export const api: KV<any> = {};

export const _ = void 0;

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
 * @param {KV<any>} [params] 执行操作携带的数据
 * @param {Function} [cb] 操作完成后的回调
 */
export function notifyHost(action: string, params?: KV<any>, cb?: Function): void {
	let callbackid = "";

	cb &&
		(cbBuckets[(callbackid = createCbId(action))] = {
			t: !0,
			cb
		});

	const payload = {
		action,
		data: params ? JSON.stringify(params) : "",
		callbackid
	};

	api.debug && api.debug(action, payload);

	api.callHost && api.callHost(payload);
}

/**
 * App内去调用H5的操作或者回调
 *
 * @export
 * @param {string} actionOrCbId 操作名称或者回调id
 * @param {string} dataJSON json数据串
 * @param {Error} [err] 异常信息
 * @returns
 */
export function invokeH5(actionOrCbId: string, dataJSON?: string | KV<any>, err?: Error): void {
	if (!actionOrCbId) return;

	const cbValue = cbBuckets[actionOrCbId];

	if (!cbValue) return;

	api.debug && api.debug(actionOrCbId, dataJSON, err);

	let data = dataJSON;
	if (cbValue.t && dataJSON && isString(dataJSON)) {
		try {
			data = JSON.parse(dataJSON as string);
		} catch {
			data = dataJSON;
		}
	}
	cbValue.cb(data, err);

	if (cbValue.t) {
		// 优化callbackid模式下的多余内存占用: 用完即删
		delete cbBuckets[actionOrCbId];
	}
}

/**
 * 包装交互action
 *
 * @export
 * @template T extends Function
 * @param {string} action 交互操作的名称
 * @param {T} handler 交互操作的回调
 * @returns {void}
 */
export function wrap<T extends Function>(action: string, handler: T): void {
	const names = action.split(".");

	let name: string | undefined = names.shift();

	if (!name) return;

	if (!names.length) {
		api[name] = handler;
		return;
	}

	let kv = api[name] || (api[name] = {});

	while (!!(name = names.shift())) {
		kv[name] = names.length === 0 ? handler : (kv = {});
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
	const actions = action.split(".");

	actions.shift();

	const realAction = actions.join(".");

	if (!realAction || realAction === "." || cbBuckets[realAction]) return; // 防止只传递"on"的影响 以及禁用监听覆盖

	api[toCamelCase(action)] = (args: DefaultActionListenerParams): void => {
		cbBuckets[realAction] = {
			t: false,
			cb: (dataStr?: string, err?: Error): void => {
				if (err) {
					args.error && args.error(err);
					return;
				}

				if (!dataStr) return args.success && args.success();

				let data;
				try {
					data = JSON.parse(dataStr);
				} catch {
					data = dataStr;
				}
				args.success && args.success(data);
			}
		};
	};
}

export function registerAction(action: string, cb: Function): void {
	cbBuckets[action] = { t: !0, cb };
}
