import { wrap, notifyHost } from "../api";

export type KeyValue = { [key: string]: any };

enum EView {
	close = "view.close",
	back = "view.back",
	forward = "view.forward",
	goto = "view.goto",
	gotoNative = "view.gotoNative",
	fullscreen = "view.fullscreen",
	setNavbarButton = "view.setNavbarButton",
	changeTitle = "view.changeTitle",
	setShareScope = "view.setShareScope",
	rotateScreen = "view.rotateScreen"
}

export function initView(): void {
	wrap(EView.close, () => notifyHost(EView.close, {}));
	wrap(EView.back, () => notifyHost(EView.back, {}));
	wrap(EView.forward, () => notifyHost(EView.forward, {}));
	wrap(EView.goto, (url: string, title: string, query?: KeyValue) => notifyHost(EView.goto, { url, title, query }));
	wrap(EView.fullscreen, (flag: ViewFullscreenFlag, cb?: Function) => notifyHost(EView.fullscreen, { flag }, cb));
	wrap(EView.setNavbarButton, (opt: ViewNavbarButtonConfig, cb?: Function) =>
		notifyHost(EView.setNavbarButton, opt, cb)
	);
	wrap(EView.changeTitle, (title: string, cb?: Function) => notifyHost(EView.changeTitle, { title }, cb));
	wrap(EView.setShareScope, (scopes: ShareScopeItem[], cb?: Function) =>
		notifyHost(EView.setShareScope, { scopes }, cb)
	);
	wrap(EView.gotoNative, (url: string, title?: string, query?: KeyValue) => {
		notifyHost(EView.gotoNative, { url, title, query });
	});

	wrap(EView.rotateScreen, (cb?: RotateScreenCallback) => {
		notifyHost(EView.rotateScreen, {}, cb);
	});
}

export type RotateScreenCallback = (isLandscape: boolean) => void;

/**
 * 全屏标记
 *
 *  0 : 非全屏带导航栏
 *
 *  1 : 全屏不带状态栏
 *
 *  2 : 全屏带状态栏
 */
export type ViewFullscreenFlag = 0 | 1 | 2;

export type ViewNavbarButtonPosition = "left" | "right";

export interface ViewNavbarButtonConfig {
	/**
	 * 待设置按钮的位置
	 *
	 * @type {ViewNavbarButtonPosition}
	 */
	position: ViewNavbarButtonPosition;
	/**
	 * 设置按钮的索引
	 *
	 * @type {number}
	 */
	index: number;
	/**
	 * 按钮对应的图标链接
	 *
	 * @type {string}
	 */
	iconUrl?: string;
	/**
	 * 按钮对应的图标文件的base64串
	 *
	 * @type {string}
	 */
	iconBase64Str?: string;
	/**
	 * 按钮对应的文本
	 *
	 * @type {string}
	 */
	text?: string;
	/**
	 * 按钮对应的操作命令
	 *
	 * @type {string}
	 */
	cmd?: string;
	/**
	 * 扩展参数
	 *
	 * @type {*}
	 */
	extra?: any;
}

export interface ViewApi {
	/**
	 * 关闭当前页面
	 *
	 */
	close(): void;
	/**
	 * 页面回退
	 *
	 */
	back(): void;
	/**
	 * 通知页面向前进
	 *
	 */
	forward(): void;
	/**
	 * 全屏的设置
	 *
	 * @param {ViewFullscreenFlag} flag 设置的标记位
	 * @param {Function} [cb] 回调
	 */
	fullscreen(flag: ViewFullscreenFlag, cb?: Function): void;
	/**
	 * 通知app跳转页面
	 *
	 * @param {string} url 跳转页面的地址
	 * @param {string} title 跳转页面的title
	 * @param {KeyValue} [query] 跳转页面所需要传递的参数
	 */
	goto(url: string, title: string, query?: KeyValue): void;
	/**
	 * 通知App跳转原生界面
	 *
	 * @param {string} url 原生界面路由
	 * @param {string} [title] 原生界面对应的标题
	 * @param {KeyValue} [query] 携带的参数
	 */
	gotoNative(url: string, title?: string, query?: KeyValue): void;
	/**
	 * 设置App导航栏
	 *
	 * @param {ViewNavbarButtonConfig} opt 配置参数
	 * @param {Function} [cb] 配置后的回调
	 */
	setNavbarButton(opt: ViewNavbarButtonConfig, cb?: Function): void;
	/**
	 * 改变当前导航栏的标题
	 *
	 * @param {string} title 新的标题
	 * @param {Function} [cb] 设置成功后的回调
	 */
	changeTitle(title: string, cb?: Function): void;
	/**
	 * 显示当前页面可分享的范围
	 *
	 * @param {ShareScopeItem[]} scopes
	 */
	setShareScope(scopes: ShareScopeItem[]): void;
	/**
	 * 通知宿主去主动旋转屏幕
	 *
	 * @param {RotateScreenCallback} [cb]
	 * @memberof ViewApi
	 */
	rotateScreen(cb?: RotateScreenCallback): void;
}

export enum ShareScopeItem {
	/**
	 * 微信好友
	 */
	wx = "wx",
	/**
	 * 微信朋友圈
	 */
	wxMoment = "wxMoment",
	/**
	 * 钉钉
	 */
	dingtalk = "dingtalk",
	/**
	 * qq
	 */
	qq = "qq",
	/**
	 * qq空间
	 */
	qZone = "qZone",
	/**
	 * 微博
	 */
	weibo = "weibo",
	/**
	 * App内置好友模块
	 */
	selfChat = "selfChat",
	/**
	 *  App内置朋友圈
	 */
	selfMoment = "selfMoment",
	/**
	 * 复制链接
	 */
	copyLink = "copyLink"
}
