"use strict";

import JSApi, { HostInvokePayload, VideoPlayFeedback } from "../../lib/index";

describe("JSApi", () => {
	let payloadData: HostInvokePayload;
	beforeAll(() => {
		JSApi.callHost = (payload: HostInvokePayload): void => {
			payloadData = payload;
		};
	});

	it(" 'video.play' ", done => {
		const videoParams = {
			url: "http://xxx/xxx.video"
		};

		JSApi.video.play(videoParams.url);
		expect(payloadData.action).toBe("video.play");
		expect(payloadData.data).toBe(JSON.stringify(videoParams));

		JSApi.video.play(videoParams, (feedback: VideoPlayFeedback) => {
			expect(feedback.state).toBe(1);
			expect(feedback.progress).toBe(0.55);
			done();
		});

		JSApi.invokeH5(payloadData.callbackid, JSON.stringify({ state: 1, progress: 0.55 }));
	});
});
