"use strict";

import JSApi, { HostInvokePayload } from "../lib/index";

describe("JSApi.callHost", () => {
	let payloadData: HostInvokePayload;
	beforeAll(() => {
		window["JSBridge"] = {
			invoke(action: string, data: string, callbackid: string): void {
				payloadData = {
					action,
					data,
					callbackid
				};
			}
		};
	});

	it(" `test JSBridge` ", () => {
		JSApi.view.back();
		expect(payloadData.action).toBe("view.back");
	});
});
