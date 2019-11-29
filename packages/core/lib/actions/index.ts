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

export type JSApiFuncInvokeH5 = (actionOrCbId: string, dataJSON?: string | KV<any>, err?: Error) => void;

export type JSApiFuncCallHost = (payload: HostInvokePayload) => void;

export type JSApiFuncOn = (action: string) => JSApi;

export type JSApiFuncNotifyHost = (action: string, params?: KV<any>, cb?: Function) => void;

export type JSApiFuncWrapHandler = (notifyHost: JSApiFuncNotifyHost) => Function | void | undefined;

export type JSApiFuncWrap = (action: string, handler: JSApiFuncWrapHandler) => JSApi;

export interface ChainOutputApi {
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
	readonly on: JSApiFuncOn;
	/**
	 * 包装交互action
	 *
	 * @param {string} action 交互操作的名称
	 * @param {Function} handler 处理函数
	 * @returns
	 */
	readonly wrap: JSApiFuncWrap;
	/**
	 * App内去调用H5的操作或者回调
	 *
	 * @param {string} actionOrCbId 操作名称或者回调id
	 * @param {string|KV<any>} [dataJSON] json数据串
	 * @param {Error} [err] 异常信息
	 * @returns
	 */
	readonly invokeH5: JSApiFuncInvokeH5;
}

export interface JSApi extends ShareApi, ActionListenerApi, AuthApi, DebugApi, ChainOutputApi {
	[x: string]: any;
	/**
	 * 设备信息类的操作
	 *
	 * @type {DeviceApi}
	 */
	readonly device: DeviceApi;
	/**
	 * 视图类的操作
	 *
	 * @type {ViewApi}
	 */
	readonly view: ViewApi;
	/**
	 * 弹出框类的操作
	 *
	 * @type {DialogApi}
	 */
	readonly dialog: DialogApi;
	/**
	 * 图像类的操作
	 *
	 * @type {ImageApi}
	 */
	readonly image: ImageApi;
	/**
	 * 文件类的操作
	 *
	 * @type {FileApi}
	 */
	readonly file: FileApi;
	/**
	 * 视频类操作
	 *
	 * @type {VideoApi}
	 */
	readonly video: VideoApi;
	/**
	 * 音频类操作
	 *
	 * @type {AudioApi}
	 */
	readonly audio: AudioApi;
	/**
	 * UI类的操作
	 *
	 * @type {UIApi}
	 */
	readonly ui: UIApi;
}
