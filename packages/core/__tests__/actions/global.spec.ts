"use strict";

import JSApi, { HostInvokePayload, ShareParams, ShareScopeItem, SharedResult } from "../../lib/index";

describe("JSApi", () => {
	let payloadData: HostInvokePayload;
	beforeAll(() => {
		JSApi.callHost = (payload: HostInvokePayload): void => {
			payloadData = payload;
		};
	});

	it(" 'share' ", done => {
		const shareParams = {
			scopes: [ShareScopeItem.wx, ShareScopeItem.wxMoment]
		} as ShareParams;

		JSApi.share(shareParams);
		expect(payloadData.action).toBe("share");
		expect(payloadData.data).toBe(JSON.stringify(shareParams));
		JSApi.share(shareParams, (res: SharedResult) => {
			expect(res.status).toBe(true);
			expect(res.scope).toBe(ShareScopeItem.wx);
			done();
		});
		JSApi.invokeH5(payloadData.callbackid, { status: true, scope: ShareScopeItem.wx });
	});

	it(" 'softInputOpen' ", done => {
		JSApi.softInputOpen(() => {
			done();
		});
		expect(payloadData.action).toBe("softInputOpen");
		JSApi.invokeH5(payloadData.callbackid);
	});

	it(" 'softInputOpen' with response ", done => {
		JSApi.softInputOpen((result: string) => {
			expect(result).toBe("ok");
			done();
		});
		expect(payloadData.action).toBe("softInputOpen");
		JSApi.invokeH5(payloadData.callbackid, "ok");
	});

	it(" `sharePrepare` ", () => {
		const shareParams = {
			scopes: [ShareScopeItem.wx, ShareScopeItem.wxMoment]
		} as ShareParams;
		JSApi.sharePrepare(shareParams);
		expect(payloadData.action).toBe("sharePrepare");
		expect(payloadData.data).toBe(JSON.stringify(shareParams));
	});
});
