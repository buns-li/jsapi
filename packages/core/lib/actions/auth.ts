import { wrap, notifyHost, registerAction } from "../api";

enum EAuth {
	config = "config",
	ready = "ready"
}

export function initAuth(): void {
	wrap(EAuth.config, (params: AuthParams) => {
		notifyHost(EAuth.config, params);
	});

	wrap(EAuth.ready, (fn: Function): void => {
		registerAction(EAuth.ready, fn);
	});
}

export interface AuthParams {
	/**
	 *是否开启调式模式
	 *
	 * @type {boolean}
	 * @memberof AuthParams
	 */
	debug: boolean;
	/**
	 * 应用ID
	 *
	 * @type {string}
	 * @memberof AuthParams
	 */
	appId: string;
	/**
	 * 时间戳
	 *
	 * @type {string}
	 * @memberof AuthParams
	 */
	timeStamp: string;
	/**
	 *生成签名的随机串
	 *
	 * @type {string}
	 * @memberof AuthParams
	 */
	nonceStr: string;
	/**
	 *后台接口返回的签名串
	 *
	 * @type {string}
	 * @memberof AuthParams
	 */
	signature: string;
	/**
	 *允许访问的api操作
	 *
	 * @type {string[]}
	 * @memberof AuthParams
	 */
	jsApiList: "*" | string[];
	/**
	 * 扩展参数
	 *
	 * @type {*}
	 * @memberof AuthParams
	 */
	extra?: any;
}

export interface AuthApi {
	/**
	 * JSAPI鉴权
	 *
	 * @param {AuthParams} params
	 * @memberof AuthApi
	 */
	config(params: AuthParams): void;
	/**
	 * JSApi授权通过后，App调用的回调监听
	 *
	 * @param {Function} fn
	 * @memberof JSApi
	 */
	ready(fn: Function): void;
}
