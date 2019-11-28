"use strict";

import JSApi, { HostInvokePayload } from "../../lib/index";

describe("JSApi", () => {
	let payloadData: HostInvokePayload;
	beforeAll(() => {
		JSApi.callHost = (payload: HostInvokePayload): void => {
			payloadData = payload;
		};
	});

	it(" 'audio.startRecord' ", done => {
		JSApi.audio.startRecord();
		expect(payloadData.action).toBe("audio.startRecord");

		JSApi.onAudioRecordEnd({
			success(data: any) {
				expect(data).toBe("ok");
				done();
			}
		});

		JSApi.invokeH5("audio.record.end", "ok");
	});

	it(" `audio.playVoice` ", done => {
		let text = "";

		JSApi.audio.playVoice(text);
		expect(payloadData.action).toBe("audio.playVoice");

		text = "hello,world";
		JSApi.audio.playVoice(text);
		expect(payloadData.data).toBe(JSON.stringify({ text }));

		JSApi.audio.playVoice(text, () => {
			done();
		});

		JSApi.invokeH5(payloadData.callbackid);
	});
});
