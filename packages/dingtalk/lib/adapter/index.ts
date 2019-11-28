import dd from "dingtalk-jsapi";
import JSApi, {
	HostInvokePayload,
	AlertParams,
	ConfirmParams,
	ToastParams,
	ActionSheetParam,
	FileDownloadParams,
	LocationParam,
	ImagePreviewParams
} from "@jsapi/core";
import { IDeviceNotificationActionSheetResult } from "dingtalk-jsapi/api/device/notification/actionSheet";
import { IDeviceGeolocationGetResult, IDeviceGeolocationGetParams } from "dingtalk-jsapi/api/device/geolocation/get";
import { IDeviceNotificationConfirmResult } from "dingtalk-jsapi/api/device/notification/confirm";

export interface DingTalkErrorInfo {
	/**
	 * 错误码
	 *
	 * @type {string}
	 * @memberof DingTalkErrorInfo
	 */
	errorCode: string;
	/**
	 * 错误信息
	 *
	 * @type {string}
	 * @memberof DingTalkErrorInfo
	 */
	errorMessage: string;
}

const Adapter = {
	"audio.startRecord": (payload: HostInvokePayload): void => {
		dd.device.audio.startRecord({
			onSuccess() {
				payload.callbackid && JSApi.invokeH5(payload.callbackid);
			},
			onFail(err: DingTalkErrorInfo) {
				JSApi.invokeH5("error", {
					code: err.errorCode,
					msg: err.errorMessage,
					extra: {
						triggerAction: "audio.startRecord",
						deepAction: "device.audio.startRecord"
					}
				});
			}
		});
	},
	"device.getNetworkType": (payload: HostInvokePayload): void => {
		dd.device.connection.getNetworkType({
			onSuccess(data: any) {
				JSApi.invokeH5(payload.callbackid, data.result);
			},
			onFail(err: DingTalkErrorInfo) {
				JSApi.invokeH5("error", {
					code: err.errorCode,
					msg: err.errorMessage,
					extra: {
						triggerAction: "device.getNetworkType",
						deepAction: "device.connection.getNetworkType"
					}
				});
			}
		});
	},
	"device.getUUID": (payload: HostInvokePayload): void => {
		dd.device.base.getUUID({
			onSuccess(data: any) {
				JSApi.invokeH5(payload.callbackid, data.result);
			},
			onFail(err: DingTalkErrorInfo) {
				JSApi.invokeH5("error", {
					code: err.errorCode,
					msg: err.errorMessage,
					extra: {
						triggerAction: "device.getUUID",
						deepAction: "device.base.getUUID"
					}
				});
			}
		});
	},
	"device.getPhoneInfo": (payload: HostInvokePayload): void => {
		dd.device.base.getPhoneInfo({
			onSuccess(data: any) {
				JSApi.invokeH5(payload.callbackid, data);
			},
			onFail(err: DingTalkErrorInfo) {
				JSApi.invokeH5("error", {
					code: err.errorCode,
					msg: err.errorMessage,
					extra: {
						triggerAction: "device.getPhoneInfo",
						deepAction: "device.base.getPhoneInfo"
					}
				});
			}
		});
	},
	"device.getLocation": (payload: HostInvokePayload): void => {
		const dataKV = JSON.parse(payload.data) as LocationParam;
		dd.device.geolocation
			.get(dataKV as IDeviceGeolocationGetParams)
			.then((data: IDeviceGeolocationGetResult) => {
				payload.callbackid && JSApi.invokeH5(payload.callbackid, data);
			})
			.catch((err: DingTalkErrorInfo) => {
				JSApi.invokeH5("error", {
					code: err.errorCode,
					msg: err.errorMessage,
					extra: {
						triggerAction: "device.getLocation",
						deepAction: "device.geolocation.get"
					}
				});
			});
	},
	"dialog.showLoading": (payload: HostInvokePayload): void => {
		const dataKV = JSON.parse(payload.data);

		dd.device.notification.showPreloader({
			text: dataKV.text,
			showIcon: true
		});
	},
	"dialog.hideLoading": (): void => {
		dd.device.notification.hidePreloader({
			onFail(err: DingTalkErrorInfo) {
				JSApi.invokeH5("error", {
					code: err.errorCode,
					msg: err.errorMessage,
					extra: {
						triggerAction: "dialog.hideLoading",
						deepAction: "device.notification.hidePreloader"
					}
				});
			}
		});
	},
	"dialog.alert": (payload: HostInvokePayload): void => {
		const dataKV = JSON.parse(payload.data) as AlertParams;

		dd.device.notification
			.alert({
				message: dataKV.content,
				title: dataKV.title,
				buttonName: dataKV.okText
			})
			.then(() => {
				payload.callbackid && JSApi.invokeH5(payload.callbackid);
			})
			.catch((err: DingTalkErrorInfo) => {
				JSApi.invokeH5("error", {
					code: err.errorCode,
					msg: err.errorMessage,
					extra: {
						triggerAction: "dialog.hideLoading",
						deepAction: "device.notification.hidePreloader"
					}
				});
			});
	},
	"dialog.confirm": (payload: HostInvokePayload): void => {
		const dataKV = JSON.parse(payload.data) as ConfirmParams;

		const labels = [dataKV.cancelText || "cancel", dataKV.okText || "ok"];

		dd.device.notification
			.confirm({
				message: dataKV.content,
				title: dataKV.title,
				buttonLabels: labels
			})
			.then((res: IDeviceNotificationConfirmResult) => {
				payload.callbackid &&
					JSApi.invokeH5(payload.callbackid, {
						cmd: res.buttonIndex === 0 ? "cancel" : "ok",
						text: labels[res.buttonIndex]
					});
			})
			.catch((err: DingTalkErrorInfo) => {
				JSApi.invokeH5("error", {
					code: err.errorCode,
					msg: err.errorMessage,
					extra: {
						triggerAction: "dialog.hideLoading",
						deepAction: "device.notification.hidePreloader"
					}
				});
			});
	},
	"dialog.toast": (payload: HostInvokePayload): void => {
		const dataKV = JSON.parse(payload.data) as ToastParams;

		dd.device.notification
			.toast({
				icon: void 0,
				text: dataKV.content,
				duration: dataKV.duration,
				delay: dataKV.delay
			})
			.then(() => {
				payload.callbackid && JSApi.invokeH5(payload.callbackid);
			})
			.catch((err: DingTalkErrorInfo) => {
				JSApi.invokeH5("error", {
					code: err.errorCode,
					msg: err.errorMessage,
					extra: {
						triggerAction: "dialog.toast",
						deepAction: "device.notification.toast"
					}
				});
			});
	},
	"dialog.actionSheet": (payload: HostInvokePayload): void => {
		const dataKV = JSON.parse(payload.data) as ActionSheetParam;
		dd.device.notification
			.actionSheet({
				title: dataKV.title || "",
				cancelButton: dataKV.cancelText || "取消",
				otherButtons: dataKV.actions.map(act => act.text)
			})
			.then((res: IDeviceNotificationActionSheetResult) => {
				payload.callbackid &&
					JSApi.invokeH5(payload.callbackid, res.buttonIndex === -1 ? "" : dataKV.actions[res.buttonIndex]);
			})
			.catch((err: DingTalkErrorInfo) => {
				JSApi.invokeH5("error", {
					code: err.errorCode,
					msg: err.errorMessage,
					extra: {
						triggerAction: "dialog.actionSheet",
						deepAction: "device.notification.actionSheet"
					}
				});
			});
	},
	"file.download": (payload: HostInvokePayload): void => {
		const dataKV = JSON.parse(payload.data) as FileDownloadParams;

		dd.biz.util.downloadFile({
			url: dataKV.url, //要下载的文件的url
			name: dataKV.name, //定义下载文件名字
			onProgress(res: any) {
				// 文件下载进度回调
				payload.callbackid && JSApi.invokeH5(payload.callbackid, res || "");
			},
			onSuccess() {
				payload.callbackid && JSApi.invokeH5(payload.callbackid);
			},
			onFail(err: DingTalkErrorInfo) {
				JSApi.invokeH5("error", {
					code: err.errorCode,
					msg: err.errorMessage,
					extra: {
						triggerAction: "file.download",
						deepAction: "biz.util.downloadFile"
					}
				});
			}
		});
	},
	"image.preview": (payload: HostInvokePayload): void => {
		const dataKV = JSON.parse(payload.data) as ImagePreviewParams;

		dd.biz.util
			.previewImage({
				urls: dataKV.urls,
				current: dataKV.current
			})
			.catch((err: DingTalkErrorInfo) => {
				JSApi.invokeH5("error", {
					code: err.errorCode,
					msg: err.errorMessage,
					extra: {
						triggerAction: "image.preview",
						deepAction: "biz.util.previewImage"
					}
				});
			});
	},
	"view.close": (): void => {
		dd.biz.navigation.close({
			onFail(err: DingTalkErrorInfo) {
				JSApi.invokeH5("error", {
					code: err.errorCode,
					msg: err.errorMessage,
					extra: {
						triggerAction: "view.close",
						deepAction: "biz.navigation.close"
					}
				});
			}
		});
	},
	"view.back": (): void => {
		dd.biz.navigation.goBack({
			onFail(err: DingTalkErrorInfo) {
				JSApi.invokeH5("error", {
					code: err.errorCode,
					msg: err.errorMessage,
					extra: {
						triggerAction: "view.back",
						deepAction: "biz.navigation.goBack"
					}
				});
			}
		});
	},
	"view.changeTitle": (payload: HostInvokePayload): void => {
		const dataKV = JSON.parse(payload.data);

		dd.biz.navigation
			.setTitle({
				title: dataKV.title
			})
			.then(() => {
				payload.callbackid && JSApi.invokeH5(payload.callbackid);
			});
	}
} as Adapter;

export interface Adapter {
	[key: string]: (payload: HostInvokePayload) => void;
}

export default Adapter;
