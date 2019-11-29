import { wrap, registerAction } from "../api";

enum EDebug {
	error = "error",
	debug = "debug"
}

export function initDebug(): void {
	wrap(EDebug.error, (fn: FeedbackCallback): void => {
		registerAction(EDebug.error, fn);
	});
}

export interface FeedbackMsgInfo {
	/**
	 * 反馈代码
	 *
	 * @type {(number | string)}
	 * @memberof FeedbackMsgInfo
	 */
	code: number | string;
	/**
	 * 反馈信息
	 *
	 * @type {string}
	 * @memberof FeedbackMsgInfo
	 */
	msg: string;
	/**
	 * 扩展信息
	 *
	 * @type {*}
	 * @memberof FeedbackMsgInfo
	 */
	extra?: any;
}

export type FeedbackCallback = (err: FeedbackMsgInfo) => void;

export type FuncDebug = (action: string, data?: any, err?: Error) => void;

export type FuncError = (fn: FeedbackCallback) => void;

export interface DebugApi {
	/**
	 * 监听交互时发生的错误
	 *
	 * @param {FeedbackCallback} fn
	 * @memberof JSApi
	 */
	readonly error: FuncError;
	/**
	 * 宿主调用H5action时候的调试
	 *
	 * @param {string} action 操作名`称
	 * @param {T} [data] 携带的数据
	 * @param {Error} [err] 携带的异常信息
	 */
	debug: FuncDebug;
}
