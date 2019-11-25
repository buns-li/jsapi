import { wrap, notifyHost } from "../api";

enum EUI {
	yearpicker = "ui.yearpicker",
	monthpicker = "ui.monthpicker",
	datepicker = "ui.datepicker",
	timepicker = "ui.timepicker",
	dateTimePicker = "ui.datetimepicker"
}

export function initUI(): void {
	wrap(EUI.yearpicker, (params: PickerParam, cb: PickerCallback) => {
		notifyHost(EUI.yearpicker, params, cb);
	});
	wrap(EUI.monthpicker, (params: PickerParam, cb: PickerCallback) => {
		notifyHost(EUI.monthpicker, params, cb);
	});
	wrap(EUI.datepicker, (params: PickerParam, cb: PickerCallback) => {
		notifyHost(EUI.datepicker, params, cb);
	});
	wrap(EUI.timepicker, (params: PickerParam, cb: PickerCallback) => {
		notifyHost(EUI.timepicker, params, cb);
	});
	wrap(EUI.dateTimePicker, (params: PickerParam, cb: PickerCallback) => {
		notifyHost(EUI.dateTimePicker, params, cb);
	});
}

export interface PickerParam {
	format: string;
	value: string;
}

export type PickerCallback = (value: string) => void;

export interface UIApi {
	/**
	 * 显示年份的选择器
	 *
	 * @param {PickerParam} params
	 * @param {PickerCallback} cb
	 * @memberof UIApi
	 */
	yearpicker(params: PickerParam, cb: PickerCallback): void;
	/**
	 * 显示月份的选择器
	 *
	 * @param {PickerParam} params
	 * @param {PickerCallback} cb
	 * @memberof UIApi
	 */
	monthpicker(params: PickerParam, cb: PickerCallback): void;
	/**
	 * 显示如期的选择器
	 *
	 * @param {PickerParam} params
	 * @param {PickerCallback} cb
	 * @memberof UIApi
	 */
	datepicker(params: PickerParam, cb: PickerCallback): void;
	/**
	 * 显示时间的选择器
	 *
	 * @param {PickerParam} params
	 * @param {PickerCallback} cb
	 * @memberof UIApi
	 */
	timepicker(params: PickerParam, cb: PickerCallback): void;
	/**
	 * 显示日期+时间的选择器
	 *
	 * @param {PickerParam} params
	 * @param {PickerCallback} cb
	 * @memberof UIApi
	 */
	datetimepicker(params: PickerParam, cb: PickerCallback): void;
}
