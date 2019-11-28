import { ShareApi, initGlobal } from "./global";
import { ViewApi, initView } from "./view";
import { DeviceApi, initDevice } from "./device";
import { DialogApi, initDialog } from "./dialog";
import { ImageApi, initImage } from "./image";
import { FileApi, initFile } from "./file";
import { VideoApi, initVideo } from "./video";
import { AudioApi, initAudio } from "./audio";
import { UIApi, initUI } from "./ui";
import { AuthApi, initAuth } from "./auth";
import { DebugApi, initDebug } from "./debug";

import { ActionListenerApi, initListener } from "./listener";
import { KV } from "../api";

export function init(): void {
	initGlobal();
	initDevice();
	initView();
	initDialog();
	initImage();
	initFile();
	initVideo();
	initAudio();
	initUI();
	initAuth();
	initDebug();
	initListener();
}

export * from "./global";
export * from "./view";
export * from "./device";
export * from "./dialog";
export * from "./image";
export * from "./file";
export * from "./video";
export * from "./audio";
export * from "./ui";
export * from "./auth";
export * from "./debug";

export interface HostInvokePayload {
	/**
	 * 操作Action的名称
	 */
	action: string;
	/**
	 * 数据
	 */
	data: string;
	/**
	 * 回调函数的标识串
	 */
	callbackid: string;
}

export type ArgsTransform = (...args: any[]) => KV<any>;

export interface JSApi extends ShareApi, ActionListenerApi, AuthApi, DebugApi {
	[x: string]: any;
	/**
	 * 设备信息类的操作
	 *
	 * @type {DeviceApi}
	 */
	device: DeviceApi;
	/**
	 * 视图类的操作
	 *
	 * @type {ViewApi}
	 */
	view: ViewApi;
	/**
	 * 弹出框类的操作
	 *
	 * @type {DialogApi}
	 */
	dialog: DialogApi;
	/**
	 * 图像类的操作
	 *
	 * @type {ImageApi}
	 */
	image: ImageApi;
	/**
	 * 文件类的操作
	 *
	 * @type {FileApi}
	 */
	file: FileApi;
	/**
	 * 视频类操作
	 *
	 * @type {VideoApi}
	 */
	video: VideoApi;
	/**
	 * 音频类操作
	 *
	 * @type {AudioApi}
	 */
	audio: AudioApi;
	/**
	 * UI类的操作
	 *
	 * @type {UIApi}
	 */
	ui: UIApi;
	/**
	 * 注册事件名称
	 *
	 *  例如:
	 *
	 *	```javascript
	 * 		JSApi.on("view.refresh") // equals  JSApi.onViewRefresh(...)
	 *	```
	 *
	 * @param {string} action 操作名称, 请用“.”来连接
	 */
	on(action: string): JSApi;
	/**
	 * 包装交互action
	 *
	 * ```js
	 *
	 *  JSApi.wrap("app.xxx",(a)=>{ console.log("hello "+a)});
	 *
	 * // then
	 *
	 *  JSApi.app.xxx("1") // it will output: hello 1
	 *
	 * ```
	 *
	 * @param {string} action 交互操作的名称
	 * @param {Function} [argsTransform] 交互参数的转换函数
	 * @returns
	 */
	wrap(action: string, argsTransform?: ArgsTransform): JSApi;
	/**
	 * App内去调用H5的操作或者回调
	 *
	 * @param {string} actionOrCbId 操作名称或者回调id
	 * @param {string} [dataJSON] json数据串
	 * @param {Error} [err] 异常信息
	 * @returns
	 */
	invokeH5(actionOrCbId: string, dataJSON?: string, err?: Error): void;
	/**
	 * 通知宿主调用操作时的监听绑定,可用于重载来执行自定义底层实现
	 *
	 * @param {HostInvokePayload} payload 调用时携带的数据
	 * @returns
	 */
	callHost(payload: HostInvokePayload): void;
	/**
	 * 宿主调用H5action时候的调试
	 *
	 * @param {string} action 操作名`称
	 * @param {T} [data] 携带的数据
	 * @param {Error} [err] 携带的异常信息
	 */
	debug<T>(action: string, data?: T, err?: Error): void;
}
