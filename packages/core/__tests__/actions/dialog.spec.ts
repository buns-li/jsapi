"use strict";

import JSApi, {
	HostInvokePayload,
	ToastParams,
	ConfirmParams,
	DialogBtnParams,
	ActionSheetItem,
	DialogParams
} from "../../lib/index";

describe("JSApi", () => {
	let payloadData: HostInvokePayload;
	beforeAll(() => {
		JSApi.callHost = (payload: HostInvokePayload): void => {
			payloadData = payload;
		};
	});

	it(" `dialog.showLoading`", () => {
		JSApi.dialog.showLoading();
		expect(payloadData.action).toBe("dialog.showLoading");

		JSApi.dialog.showLoading("loading");
		expect(payloadData.data).toBe(JSON.stringify({ text: "loading" }));
	});

	it(" `dialog.hideLoading`", () => {
		JSApi.dialog.hideLoading();
		expect(payloadData.action).toBe("dialog.hideLoading");
	});

	it(" `dialog.alert` ", done => {
		JSApi.dialog.alert("hello");
		expect(payloadData.action).toBe("dialog.alert");
		expect(payloadData.data).toBe(JSON.stringify({ content: "hello", title: "提示", okText: "确定" }));

		const alertParams = {
			content: "hello",
			text: "tips",
			okText: "ok"
		};
		JSApi.dialog.alert(alertParams);
		expect(payloadData.data).toBe(JSON.stringify(alertParams));

		// with callback

		JSApi.dialog.alert(alertParams, () => {
			done();
		});

		JSApi.invokeH5(payloadData.callbackid);
	});

	it(" `dialog.toast` ", done => {
		const toastParams = {
			content: "tips",
			iconUrl: "xxx/ok.jpg",
			isBreak: true,
			duration: 1000
		} as ToastParams;

		JSApi.dialog.toast(toastParams.content);
		expect(payloadData.action).toBe("dialog.toast");
		expect(payloadData.data).toBe(JSON.stringify({ content: toastParams.content, isBreak: false }));

		JSApi.dialog.toast(toastParams);
		expect(payloadData.data).toBe(JSON.stringify(toastParams));

		JSApi.dialog.toast(toastParams.content, () => {
			done();
		});
		JSApi.invokeH5(payloadData.callbackid);
	});

	it(" `dialog.confirm` ", done => {
		const confirmParams = {
			content: "tips"
		} as ConfirmParams;

		JSApi.dialog.confirm(confirmParams.content, (btn: DialogBtnParams) => {
			expect(btn.cmd).toBe("ok");
			expect(btn.text).toBe("确定");
			done();
		});
		expect(payloadData.action).toBe("dialog.confirm");
		JSApi.invokeH5(payloadData.callbackid, { cmd: "ok", text: "确定" });

		JSApi.dialog.confirm(confirmParams, (btn: DialogBtnParams) => {
			expect(btn.cmd).toBe("cancel");
			expect(btn.text).toBe("取消");
			done();
		});
		expect(payloadData.action).toBe("dialog.confirm");
		JSApi.invokeH5(payloadData.callbackid, { cmd: "cancel", text: "取消" });
	});

	it(" `dialog.actionSheet` ", done => {
		const actionSheetParams = {
			title: "actionSheet",
			cancelText: "取消",
			needCancel: true,
			actions: [
				{ cmd: "sheet1", text: "Sheet1" },
				{ cmd: "sheet2", text: "Sheet2" },
				{ cmd: "sheet3", text: "Sheet3" }
			]
		};

		JSApi.dialog.actionSheet(actionSheetParams, (result?: ActionSheetItem) => {
			expect(result).not.toBeNull();
			expect(result).toHaveProperty("cmd", "sheet1");
			expect(result).toHaveProperty("text", "Sheet1");
			done();
		});
		expect(payloadData.action).toBe("dialog.actionSheet");

		JSApi.invokeH5(payloadData.callbackid, { cmd: "sheet1", text: "Sheet1" });
	});

	it(" `dialog.actionSheet` ", done => {
		const actionSheetParams = {
			title: "actionSheet",
			actions: [
				{ cmd: "sheet1", text: "Sheet1" },
				{ cmd: "sheet2", text: "Sheet2" },
				{ cmd: "sheet3", text: "Sheet3" }
			]
		};

		JSApi.dialog.actionSheet(actionSheetParams, (result?: ActionSheetItem) => {
			expect(result).not.toBeNull();
			expect(result).toHaveProperty("cmd", "sheet1");
			expect(result).toHaveProperty("text", "Sheet1");
			done();
		});

		expect(payloadData.data).not.toBeNull();
		const data = JSON.parse(payloadData.data);
		expect(data).toHaveProperty("cancelText", "取消");
		expect(data).toHaveProperty("needCancel", false);

		JSApi.invokeH5(payloadData.callbackid, { cmd: "sheet1", text: "Sheet1" });
	});

	it(" `dialog.show` ", done => {
		JSApi.dialog.show("text", (btn: DialogBtnParams) => {
			expect(btn.cmd).toBe("cancel");
			expect(btn.text).toBe("取消");

			done();
		});
		expect(payloadData.action).toBe("dialog.show");
		expect(payloadData.data).not.toBeNull();

		const data = JSON.parse(payloadData.data);
		expect(data).toHaveProperty("title", "");
		expect(data).toHaveProperty("content", "text");
		expect(data.btns).toHaveLength(2);
		expect(data.btns[0]).toHaveProperty("cmd", "cancel");

		JSApi.invokeH5(payloadData.callbackid, data.btns[0]);
	});

	it(" `dialog.show` with object `content` params ", done => {
		const opts = {
			content: "text",
			title: "提示",
			btns: [
				{
					cmd: "cancel",
					text: "取消",
					type: "default"
				},
				{
					cmd: "ok",
					text: "确定",
					type: "primary"
				}
			]
		} as DialogParams;

		JSApi.dialog.show(opts, (btn: DialogBtnParams) => {
			expect(btn.cmd).toBe("ok");
			expect(btn.text).toBe("确定");
			done();
		});
		expect(payloadData.action).toBe("dialog.show");
		expect(payloadData.data).toBe(JSON.stringify(opts));

		JSApi.invokeH5(payloadData.callbackid, opts.btns[1]);
	});
});
