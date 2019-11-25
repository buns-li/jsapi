import { wrap, registerAction } from "../api";

enum EDebug {
	error = "error"
}

export function initDebug(): void {
	wrap(EDebug.error, (fn: Function): void => {
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

export interface DebugApi {
	/**
	 * 监听交互时发生的错误
	 *
	 * @param {FeedbackCallback} fn
	 * @memberof JSApi
	 */
	error(fn: FeedbackCallback): void;
}
