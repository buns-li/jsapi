"use strict";

import JSApi, { HostInvokePayload, ImageChooseParams, ImagePreviewParams } from "../../lib/index";

describe("JSApi", () => {
	let payloadData: HostInvokePayload;
	beforeAll(() => {
		JSApi.callHost = (payload: HostInvokePayload): void => {
			payloadData = payload;
		};
	});

	it(" 'image.choose' ", done => {
		const opt = {
			count: 9,
			sizeType: ["original"],
			sourceType: ["album", "camera"]
		} as ImageChooseParams;

		JSApi.image.choose(opt, (urls: string[]) => {
			expect(urls).toHaveLength(2);
			expect(urls[0]).toBe("abc");
			done();
		});

		expect(payloadData.action).toBe("image.choose");
		expect(payloadData.data).toBe(JSON.stringify(opt));

		JSApi.invokeH5(payloadData.callbackid, ["abc", "abcd"]);
	});

	it(" 'image.preview' ", () => {
		const opt = {
			current: "xxx.jpg",
			currentIndex: 0,
			urls: ["1.jpg", "2.jpg"]
		} as ImagePreviewParams;

		JSApi.image.preview(opt);

		expect(payloadData.action).toBe("image.preview");
		expect(payloadData.data).toBe(JSON.stringify(opt));
		expect(payloadData.callbackid).toBe("");
	});

	it(" 'image.save' ", done => {
		const opt = "data/base64:imgxxxx";

		JSApi.image.save(opt);
		expect(payloadData.action).toBe("image.save");
		expect(payloadData.data).toBe(JSON.stringify({ imgUrlOrBase64: opt }));

		JSApi.image.save(opt, (isok: boolean) => {
			expect(isok).toBe(true);
			done();
		});
		JSApi.invokeH5(payloadData.callbackid, "true");
	});
});
