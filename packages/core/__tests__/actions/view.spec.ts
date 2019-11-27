"use strict";

import JSApi, { HostInvokePayload, ShareScopeItem } from "../../lib/index";

describe("JSApi", () => {
	let payloadData: HostInvokePayload;
	beforeAll(() => {
		JSApi.callHost = (payload: HostInvokePayload): void => {
			payloadData = payload;
		};
	});

	it(" 'view.back' ", () => {
		JSApi.view.back();
		expect(payloadData.action).toBe("view.back");
	});

	it(" 'view.close' ", () => {
		JSApi.view.close();
		expect(payloadData.action).toBe("view.close");
	});

	it(" 'view.forward' ", () => {
		JSApi.view.forward();
		expect(payloadData.action).toBe("view.forward");
	});

	it(" 'view.setShareScope' ", () => {
		JSApi.view.setShareScope([ShareScopeItem.wx, ShareScopeItem.wxMoment]);
		expect(payloadData.action).toBe("view.setShareScope");
		expect(payloadData.data).toBe(JSON.stringify({ scopes: [ShareScopeItem.wx, ShareScopeItem.wxMoment] }));
	});

	it(" `view.changeTitle` ", () => {
		const title = "新的标题";
		JSApi.view.changeTitle(title);
		expect(payloadData.action).toBe("view.changeTitle");
		expect(payloadData.data).toBe(JSON.stringify({ title }));
	});

	it(" `view.fullscreen` ", done => {
		JSApi.view.fullscreen(0, () => {
			expect(payloadData.action).toBe("view.fullscreen");
			expect(payloadData.data).toBe(JSON.stringify({ flag: 0 }));
			done();
		});

		JSApi.invokeH5(payloadData.callbackid);
	});

	it(" `view.gotoNative` ", () => {
		const kv = { url: "native://base/activity/", title: "demo", query: { a: 1 } };

		JSApi.view.gotoNative(kv.url, kv.title, kv.query);

		expect(payloadData.action).toBe("view.gotoNative");
		expect(payloadData.data).toBe(JSON.stringify(kv));
	});
});
