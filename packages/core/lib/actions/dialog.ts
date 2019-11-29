import { wrap, notifyHost } from "../api";
import { isString } from "../utils";

enum EDialog {
	showLoading = "dialog.showLoading",
	hideLoading = "dialog.hideLoading",
	alert = "dialog.alert",
	toast = "dialog.toast",
	show = "dialog.show",
	confirm = "dialog.confirm",
	actionSheet = "dialog.actionSheet"
}
export function initDialog(): void {
	wrap(EDialog.showLoading, (text?: string) => notifyHost(EDialog.showLoading, { text }));
	wrap(EDialog.hideLoading, () => notifyHost(EDialog.hideLoading));
	wrap(EDialog.alert, (content: string | AlertParams, cb?: Function) =>
		notifyHost(
			EDialog.alert,
			(isString(content)
				? {
						content,
						title: "提示",
						okText: "确定"
				  }
				: content) as AlertParams,
			cb
		)
	);
	wrap(EDialog.toast, (content: string | ToastParams, cb?: Function) =>
		notifyHost(EDialog.toast, (isString(content) ? { content, isBreak: false } : content) as ToastParams, cb)
	);
	wrap(EDialog.confirm, (content: string | ConfirmParams, cb: ConfirmCallback) =>
		notifyHost(
			EDialog.confirm,
			(isString(content)
				? { content, title: "确认提示", okText: "确定", cancelText: "取消" }
				: content) as ConfirmParams,
			cb
		)
	);
	wrap(EDialog.show, (content: string | DialogParams, cb: ConfirmCallback) =>
		notifyHost(
			EDialog.show,
			(isString(content)
				? {
						content,
						title: "",
						btns: [
							{
								cmd: "cancel",
								text: "取消",
								type: "default"
							},
							{
								cmd: "ok",
								text: "确定",
								type: "primary"
							}
						]
				  }
				: content) as DialogParams,
			cb
		)
	);

	wrap(EDialog.actionSheet, (params: ActionSheetParam, cb: ActionSheetCallback) => {
		params.needCancel = params.needCancel || false;
		params.cancelText = params.cancelText || "取消";
		notifyHost(EDialog.actionSheet, params, cb);
	});
}

export interface ActionSheetItem {
	/**
	 * 显示文本
	 *
	 * @type {string}
	 * @memberof ActionSheetItem
	 */
	text: string;
	/**
	 * 该按钮的命令
	 *
	 * @type {string}
	 * @memberof ActionSheetItem
	 */
	cmd: string;
	/**
	 * 显示图标的url
	 *
	 * @type {string}
	 * @memberof ActionSheetItem
	 */
	iconUrl?: string;
	/**
	 * 显示图标的base64字符串
	 *
	 * @type {string}
	 * @memberof ActionSheetItem
	 */
	iconBase64?: string;
}

export interface ActionSheetParam {
	/**
	 * 标题
	 *
	 * @type {string}
	 * @memberof ActionSheetParam
	 */
	title?: string;
	/**
	 * 取消按钮的文本
	 *
	 * @type {string}
	 * @memberof ActionSheetParam
	 */
	cancelText?: string;
	/**
	 * 是否需要取消按钮
	 *
	 * @type {boolean}
	 * @memberof ActionSheetParam
	 */
	needCancel?: boolean;
	/**
	 * 待显示的操作按钮
	 *
	 * @type {ActionSheetItem[]}
	 * @memberof ActionSheetParam
	 */
	actions: ActionSheetItem[];
}

export type ActionSheetCallback = (result?: ActionSheetItem) => void;

export interface DialogApi {
	/**
	 * 显示loading对话框
	 *
	 * @param {string} text 加载提示的文本
	 */
	showLoading(text?: string): void;
	/**
	 * 隐藏loading对话框
	 *
	 */
	hideLoading(): void;
	/**
	 * 弹出提示框
	 *
	 * @param {(string | AlertParams)} content 内容文本或信息配置对象
	 * @param {Function} [cb] 点击确定后的回调
	 */
	alert(content: string | AlertParams, cb?: Function): void;
	/**
	 * 弹出提示信息
	 *
	 * @param {(string | ToastParams)} content
	 * @param {Function} [cb]
	 */
	toast(content: string | ToastParams, cb?: Function): void;
	/**
	 * 显示弹出框
	 *
	 * @param {(string | DialogParams)} content 弹出框的内容
	 * @param {ConfirmCallback} [cb] 回调操作
	 */
	show(content: string | DialogParams, cb?: ConfirmCallback): void;
	/**
	 * 弹出确认框
	 *
	 * @param {(string | ConfirmParams)} content 提示内容或配置信息
	 * @param {ConfirmCallback} cb 确认框的回调处理
	 */
	confirm(content: string | ConfirmParams, cb: ConfirmCallback): void;
	/**
	 * 显示ActionSheet
	 *
	 * @param {ActionSheetParam} params 传递的参数
	 * @param {ActionSheetCallback} cb 回调
	 * @memberof UIApi
	 */
	actionSheet(params: ActionSheetParam, cb: ActionSheetCallback): void;
}

export type DialogButtonType = "error" | "warn" | "primary" | "success" | "default";

export interface DialogBtnParams {
	/**
	 * 操作按钮的命令标识
	 *
	 * @type {string}
	 */
	cmd: string;
	/**
	 * 按钮显示文本
	 *
	 * @type {string}
	 */
	text: string;
	/**
	 * 按钮的类型
	 *
	 * @type {DialogButtonType}
	 */
	type?: DialogButtonType;
}

export interface DialogParams {
	/**
	 * 弹出框显示的内容
	 *
	 * @type {string}
	 */
	content: string;
	/**
	 * 弹出框显示的标题
	 *
	 * @type {string}
	 */
	title?: string;
	/**
	 * 弹出框的按钮设置
	 *
	 * @type {DialogBtnParams[]}
	 */
	btns: DialogBtnParams[];
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}

export interface AlertParams {
	/**
	 * 提示框显示的内容
	 *
	 * @type {string}
	 */
	content: string;
	/**
	 * 提示框显示的标题
	 *
	 * @type {string}
	 */
	title?: string;
	/**
	 * 提示框确定按钮的文本
	 *
	 * @type {string}
	 */
	okText?: string;
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}

export interface ToastParams {
	/**
	 * 提示框显示的内容
	 *
	 * @type {string}
	 */
	content: string;
	/**
	 * 图标url
	 *
	 * @type {string}
	 */
	iconUrl?: string;
	/**
	 * 图标对应的base64
	 *
	 * @type {string}
	 */
	iconBase64?: string;
	/**
	 * 是否折行展示
	 *
	 * @type {boolean}
	 */
	isBreak?: boolean;
	/**
	 * 显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
	 *
	 * @type {number}
	 * @memberof ToastParams
	 */
	duration?: number;
	/**
	 * 延迟显示，单位秒，默认0
	 *
	 * @type {number}
	 * @memberof ToastParams
	 */
	delay?: number;
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}

export interface ConfirmParams extends AlertParams {
	/**
	 * 确认框的取消文本
	 *
	 * @type {string}
	 */
	cancelText?: string;
}

export type ConfirmCallback = (btn: DialogBtnParams) => void;
