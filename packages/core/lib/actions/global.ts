import { ShareScopeItem } from "./view";

import { wrap, notifyHost } from "../api";

enum EGlobal {
	// 分享
	share = "share",
	// 通知宿主提前准备待分享的内容
	sharePrepare = "sharePrepare",
	// 唤醒软键盘
	softInputOpen = "softInputOpen"
}

export function initGlobal(): void {
	wrap(EGlobal.share, (opt: ShareParams, cb?: Function) => notifyHost(EGlobal.share, opt, cb));
	wrap(EGlobal.sharePrepare, (opt: ShareParams) => notifyHost(EGlobal.sharePrepare, opt));
	wrap(EGlobal.softInputOpen, (cb?: Function) => notifyHost(EGlobal.softInputOpen, {}, cb));
}

export interface ShareObject {
	/**
	 * 分享标题
	 *
	 * @type {string}
	 */
	title: string;
	/**
	 * 分享链接的描述
	 *
	 * @type {string}
	 */
	desc?: string;
	/**
	 * 待分享的链接地址
	 *
	 * @type {string}
	 */
	url: string;
	/**
	 * 分享的图标链接地址
	 *
	 * @type {string}
	 */
	iconUrl?: string;
	/**
	 * 分享的图标对应的base64字符串
	 *
	 * @type {string}
	 */
	iconBase64?: string;
	/**
	 * 专门用于启动微信授权回调的分享地址
	 *
	 * @type {string}
	 */
	wxUrl?: string;
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}

export interface ShareParams extends ShareObject {
	/**
	 * 可分享的范围
	 *
	 * @type {ShareScopeItem}
	 */
	scopes: ShareScopeItem[];
}

export interface SharedResult {
	/**
	 * 分享是否成功
	 *
	 * @type {boolean}
	 */
	status: boolean;
	/**
	 * 分享的目标位置
	 *
	 * @type {ShareScopeItem}
	 */
	scope: ShareScopeItem;
	/**
	 * 接收到此分享信息的接口者标识
	 *
	 * @type {string}
	 */
	reciever?: string;
}

export type ShareCallback = (res: SharedResult) => void;

export interface ShareApi {
	/**
	 * 通知App分享
	 *
	 * @param {ShareParams} opt 分享的参数设置
	 * @param {ShareCallback} [cb]
	 */
	share(opt: ShareParams, cb?: ShareCallback): void;
	/**
	 * 通知宿主提前准备好对应的分享参数
	 *
	 * @param {ShareParams} opt 分享准备前的
	 * @memberof ShareApi
	 */
	sharePrepare(opt: ShareParams): void;
	/**
	 * 呼叫宿主唤起软键盘
	 *
	 * @param {Function} [cb] 唤起后的回调
	 */
	softInputOpen(cb?: Function): void;
}
