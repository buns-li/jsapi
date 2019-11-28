"use strict";

import JSApi, { HostInvokePayload } from "../../lib/index";

describe("JSApi", () => {
	let payloadData: HostInvokePayload;
	beforeAll(() => {
		JSApi.callHost = (payload: HostInvokePayload): void => {
			payloadData = payload;
		};
	});

	it(" 'config' ", done => {
		JSApi.config({
			jsApiList: "*",
			debug: false,
			appId: "appId",
			timeStamp: "timeStamp",
			nonceStr: "nonceStr",
			signature: "signature"
		});

		expect(payloadData.action).toBe("config");

		JSApi.ready(() => {
			done();
		});

		JSApi.invokeH5("ready");
	});
});
