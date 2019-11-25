import { wrap, notifyHost } from "../api";
import { isString } from "../utils";

enum EVideo {
	play = "video.play"
}

export function initVideo(): void {
	wrap(EVideo.play, (url: string | VideoParams, cb?: VideoPlayCallback) =>
		notifyHost(EVideo.play, (isString(url) ? { url } : url) as VideoParams, cb)
	);
}

export interface VideoParams {
	/**
	 * video链接
	 *
	 * @type {string}
	 */
	url: string;
	/**
	 * 播放倍速
	 *
	 * @type {number}
	 * @memberof VideoParams
	 */
	speed?: number;
	/**
	 * 直接定位的
	 *
	 * @type {number}
	 * @memberof VideoParams
	 */
	progress?: number;
	/**
	 * 播放尺寸比例
	 *
	 *  例如: 16*9
	 *
	 * @type {string}
	 * @memberof VideoParams
	 */
	size?: string;
	/**
	 * 扩展参数
	 *
	 * @type {*}
	 * @memberof VideoParams
	 */
	extra?: any;
}

/**
 * 0: 已暂停 ，1: 播放中
 */
export type VideoPlayState = 0 | 1;

export interface VideoPlayFeedback {
	/**
	 * 视频播放状态
	 *
	 * 0: 已暂停 ，1: 播放中
	 *
	 * @type {VideoPlayState}
	 * @memberof VideoPlayFeedback
	 */
	state: VideoPlayState;
	/**
	 * 播放进度
	 *
	 * @type {number}
	 * @memberof VideoPlayFeedback
	 */
	progress?: number;
}

export type VideoPlayCallback = (feedback: VideoPlayFeedback) => void;

export interface VideoApi {
	/**
	 * 通知App利用原生视频播放H5的视频
	 *
	 * @param {string} url 视频链接地址
	 * @param {VideoPlayCallback} [cb] 视频播放后的回调
	 */
	play(url: string | VideoParams, cb?: VideoPlayCallback): void;
}
