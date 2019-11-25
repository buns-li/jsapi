import { SharedResult } from "./global";
import { bindListener } from "../api";

export interface ActionListenerParams<T> {
	/**
	 * 操作成功的回调
	 *
	 * @template T 返回的数据类型
	 * @param {T} arg 返回的数据
	 */
	success(arg?: T): void;
	/**
	 * 出现错误时的回调
	 *
	 * @param {Error} ex
	 */
	error?(ex: Error): void;
}

export interface FeedbackMsgInfo {
	code: number | string;
	msg: string;
}

export type DefaultActionListenerParams = ActionListenerParams<any>;

export interface ActionListenerApi {
	/**
	 * App分享之后的回调
	 *
	 * @param {(ActionListenerParams<SharedResult>)} params
	 */
	onShared(params: ActionListenerParams<SharedResult>): void;
	/**
	 * 监听手机摇一摇
	 *
	 * @param {DefaultActionListenerParams} params
	 * @memberof ActionListenerApi
	 */
	onDeviceShake(params: DefaultActionListenerParams): void;
	/**
	 * 当网络连接断开时的监听
	 *
	 * @param {DefaultActionListenerParams} params
	 */
	onDeviceOffline(params: DefaultActionListenerParams): void;
	/**
	 * 当网络连接时的监听
	 *
	 * @param {DefaultActionListenerParams} params
	 */
	onDeviceOnline(params: DefaultActionListenerParams): void;
	/**
	 * 监听宿主返回页面操作
	 *
	 * @param {DefaultActionListenerParams} params
	 */
	onViewBackActive(params: DefaultActionListenerParams): void;
	/**
	 * 离开当前页面时，H5的监听
	 *
	 * @param {DefaultActionListenerParams} params
	 */
	onViewHide(params: DefaultActionListenerParams): void;
	/**
	 * 恢复当前页面时，H5的监听
	 *
	 * @param {DefaultActionListenerParams} params
	 */
	onViewShow(params: DefaultActionListenerParams): void;
	/**
	 * 监听App通知H5的页面刷新事件
	 *
	 * @param {DefaultActionListenerParams} params
	 */
	onViewRefresh(params: DefaultActionListenerParams): void;
	/**
	 * 监听App双击Navbar处的事件回调
	 *
	 *   主要用于H5去控制是否自动返回顶部
	 *
	 * @param {DefaultActionListenerParams} params
	 */
	onViewNavbarDoubleClick(params: DefaultActionListenerParams): void;
	/**
	 * 监听App通知H5音频录制的结束事件
	 *
	 * @param {DefaultActionListenerParams} params
	 */
	onAudioRecordEnd(params: DefaultActionListenerParams): void;
	/**
	 * 监听语音播放结束的事件
	 *
	 * @param {DefaultActionListenerParams} params
	 */
	onVoicePlayEnd(params: DefaultActionListenerParams): void;
}

export function initListener(): void {
	bindListener("on.device.shake");
	bindListener("on.device.online");
	bindListener("on.device.offline");
	bindListener("on.view.hide");
	bindListener("on.view.show");
	bindListener("on.view.backActive");
	/**
	 * 注册监听App通知H5的页面刷新操作
	 */
	bindListener("on.view.refresh");
	/**
	 * 监听App双击Navbar处的事件回调
	 *
	 *   主要用于H5去控制是否自动返回顶部
	 */
	bindListener("on.view.navbar.doubleClick");
	/**
	 * 监听分享成功后的数据
	 */
	bindListener("on.shared");
	/**
	 * 监听音频录制结束事件
	 */
	bindListener("on.audio.record.end");
	/**
	 * 监听语音播放完毕事件
	 */
	bindListener("on.voice.play.end");
}
