"use strict";

// @ts-nocheck

import JSApi, { HostInvokePayload, FeedbackMsgInfo } from "../lib/index";

describe("JSApi", () => {
	let payloadData: HostInvokePayload;
	let errInfo: FeedbackMsgInfo;
	let debugInfo: any;
	beforeAll(() => {
		window.webkit = {
			messageHandlers: {
				JSBridge: {
					postMessage(payload: HostInvokePayload): void {
						payloadData = payload;
					}
				}
			}
		};

		JSApi.error((err: FeedbackMsgInfo) => {
			errInfo = err;
		});

		JSApi.onH5InvokeDebug = (action: string, data?: string, err?: Error): void => {
			debugInfo = { action, data, err };
		};
	});

	afterEach(() => {
		debugInfo = void 0;
	});

	it("H5 notify App to do something", () => {
		const obj = { url: "http://www.baidu.com", title: "百度", query: {} };

		JSApi.view.goto(obj.url, obj.title, obj.query);

		expect(payloadData).not.toBeUndefined();
		expect(payloadData.action).toBe("view.goto");
		expect(payloadData.data).toBe(JSON.stringify(obj));
	});

	it("App notify H5 to do something", done => {
		JSApi.onViewRefresh({
			success(data) {
				expect(data).toBe("ok");
				done();
			}
		});
		JSApi.invokeH5("view.refresh", "ok");
	});

	it("notify App do something with callback", done => {
		JSApi.view.changeTitle("新的标题", (res: string) => {
			expect(res).toBe("change:ok");
			done();
		});

		const data = JSON.parse(payloadData.data);

		expect(data).toHaveProperty("title");
		expect(data.title).toBe("新的标题");

		JSApi.invokeH5(payloadData.callbackid, "change:ok");
	});

	it("notify App do something with callback : object params ", done => {
		JSApi.view.changeTitle("新的标题", (res: any) => {
			expect(res).toHaveProperty("title");
			expect(res.title).toBe("新的标题");
			done();
		});

		JSApi.invokeH5(payloadData.callbackid, payloadData.data);
	});

	it(" `JSApi.on` ", done => {
		JSApi.on("wrap");
		expect(errInfo).not.toBeUndefined();
		expect(errInfo.code).toBe(403);

		JSApi.on("unit.test");
		expect(JSApi).toHaveProperty("onUnitTest");

		JSApi.onUnitTest({
			success(data: any) {
				expect(data).toBe("ok");
				done();
			}
		});
		JSApi.invokeH5("unit.test", "ok");
	});

	it(" `JSApi.wrap` ", done => {
		JSApi.wrap("unit.test", (text: string) => ({ text }));

		JSApi.unit.test();
		expect(payloadData.action).toBe("unit.test");

		JSApi.unit.test("message");
		expect(payloadData.data).toBe(JSON.stringify({ text: "message" }));

		JSApi.unit.test("message", () => {
			done();
		});
		JSApi.invokeH5(payloadData.callbackid, "");

		JSApi.wrap("chain.unit.test", (text: string) => ({ text }));

		JSApi.chain.unit.test();
		expect(payloadData.action).toBe("chain.unit.test");

		JSApi.chain.unit.test("message");
		expect(payloadData.data).toBe(JSON.stringify({ text: "message" }));

		JSApi.chain.unit.test("message", () => {
			done();
		});
		JSApi.invokeH5(payloadData.callbackid, "");
	});

	it(" `JSApi.onH5InvokeDebug` ", () => {
		JSApi.onViewBack({});

		JSApi.invokeH5("view.back");

		expect(debugInfo).not.toBeUndefined();
		expect(debugInfo.action).toBe("view.back");
		expect(debugInfo.data).toBeUndefined();
		expect(debugInfo.err).toBeUndefined();
	});

	it(" `JSApi.invokeH5`: success with data passed ", done => {
		JSApi.onViewBack({
			success(data?: any) {
				expect(data).toBe("ok");
				done();
			}
		});

		JSApi.invokeH5("view.back", "ok");
	});

	it(" `JSApi.invokeH5`: success with no data ", done => {
		JSApi.onViewBack({
			success() {
				done();
			}
		});

		JSApi.invokeH5("view.back");
	});

	it(" `JSApi.invokeH5` with Error ", done => {
		JSApi.onViewBack({
			error(err: Error) {
				expect(err.message).toBe("error");
				done();
			}
		});

		JSApi.invokeH5("view.back", "", new Error("error"));
	});

	it(" `JSApi.invokeH5` with unknown action ", () => {
		JSApi.invokeH5("view.back.xxx");
		expect(debugInfo).toBeUndefined();

		JSApi.invokeH5("");
		expect(debugInfo).toBeUndefined();
	});
});
