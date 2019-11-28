"use strict";

import JSApi, { HostInvokePayload } from "../../lib/index";

describe("JSApi", () => {
	let payloadData: HostInvokePayload;
	beforeAll(() => {
		JSApi.callHost = (payload: HostInvokePayload): void => {
			payloadData = payload;
		};
	});

	it(" 'ui.yearpicker' ", done => {
		JSApi.ui.yearpicker(
			{
				format: "yyyy",
				value: "2019-11-12"
			},
			(value: string) => {
				expect(value + "").toBe("2019");
				done();
			}
		);
		expect(payloadData.action).toBe("ui.yearpicker");

		JSApi.invokeH5(payloadData.callbackid, "2019");
	});

	it(" 'ui.monthpicker' ", done => {
		JSApi.ui.monthpicker(
			{
				format: "MM",
				value: "2019-11-12"
			},
			(value: string) => {
				expect(value + "").toBe("11");
				done();
			}
		);
		expect(payloadData.action).toBe("ui.monthpicker");

		JSApi.invokeH5(payloadData.callbackid, "11");
	});

	it(" 'ui.datepicker' ", done => {
		JSApi.ui.datepicker(
			{
				format: "yyyy-MM-dd",
				value: "2019-11-12"
			},
			(value: string) => {
				expect(value + "").toBe("2019-11-12");
				done();
			}
		);
		expect(payloadData.action).toBe("ui.datepicker");
		JSApi.invokeH5(payloadData.callbackid, "2019-11-12");
	});

	it(" 'ui.timepicker' ", done => {
		JSApi.ui.timepicker(
			{
				format: "HH:mm",
				value: "2019-11-12 10:00"
			},
			(value: string) => {
				expect(value + "").toBe("10:00");
				done();
			}
		);
		expect(payloadData.action).toBe("ui.timepicker");

		JSApi.invokeH5(payloadData.callbackid, "10:00");
	});

	it(" 'ui.datetimepicker' ", done => {
		JSApi.ui.datetimepicker(
			{
				format: "yyyy/MM/dd HH:mm:ss",
				value: "2019-11-12 10:00:00"
			},
			(value: string) => {
				expect(value + "").toBe("2019/11/12 10:00:00");
				done();
			}
		);
		expect(payloadData.action).toBe("ui.datetimepicker");

		JSApi.invokeH5(payloadData.callbackid, "2019/11/12 10:00:00");
	});
});
