"use strict";

import JSApi, { HostInvokePayload, PhoneInfoParams, NetworkType, LocationResult, QRCodeOption } from "../../lib/index";

describe("JSApi", () => {
	let payloadData: HostInvokePayload;
	beforeAll(() => {
		JSApi.callHost = (payload: HostInvokePayload): void => {
			payloadData = payload;
		};
	});

	it(" `device.getPhoneInfo` ", done => {
		JSApi.device.getPhoneInfo((res: PhoneInfoParams) => {
			expect(res.screenWidth).toBe(375);
			expect(res.screenHeight).toBe(667);
			done();
		});
		expect(payloadData.action).toBe("device.getPhoneInfo");
		JSApi.invokeH5(payloadData.callbackid, JSON.stringify({ screenWidth: 375, screenHeight: 667 }));
	});

	it(" `device.getNetworkType` ", done => {
		JSApi.device.getNetworkType((type: NetworkType) => {
			expect(type).toBe("wifi");
			done();
		});
		expect(payloadData.action).toBe("device.getNetworkType");
		JSApi.invokeH5(payloadData.callbackid, "wifi");
	});

	it(" `device.getUUID` ", done => {
		JSApi.device.getUUID((uuid: string) => {
			expect(uuid).toBe(1234);
			done();
		});
		expect(payloadData.action).toBe("device.getUUID");
		JSApi.invokeH5(payloadData.callbackid, "1234");
	});

	it(" `device.getLocation` ", done => {
		const params = {
			coordinate: 1
		};

		JSApi.device.getLocation(params, (res: LocationResult) => {
			expect(res.province).toBe("江西省");
			done();
		});
		expect(payloadData.action).toBe("device.getLocation");
		expect(payloadData.data).toBe(JSON.stringify(params));
		JSApi.invokeH5(payloadData.callbackid, { province: "江西省" });
	});

	it(" `device.scanQRCode` ", done => {
		const reqParams = { scanType: ["qrCode", "barCode"], needResult: 1 } as QRCodeOption;

		JSApi.device.scanQRCode(reqParams, (result: string) => {
			expect(result).toBe("http://www.baidu.com");
			done();
		});
		expect(payloadData.action).toBe("device.scanQRCode");
		expect(payloadData.data).toBe(JSON.stringify(reqParams));
		JSApi.invokeH5(payloadData.callbackid, "http://www.baidu.com");
	});
});
