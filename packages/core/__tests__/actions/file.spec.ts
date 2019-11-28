"use strict";

import JSApi, {
	HostInvokePayload,
	FileChooseParams,
	FileInfo,
	FilePreviewParams,
	FileDownloadParams,
	FileDownloadedInfo
} from "../../lib/index";

describe("JSApi", () => {
	let payloadData: HostInvokePayload;
	beforeAll(() => {
		JSApi.callHost = (payload: HostInvokePayload): void => {
			payloadData = payload;
		};
	});

	it(" 'file.choose' ", done => {
		const opt = {
			allowTypes: "*",
			count: 1,
			shouldUpload: true
		} as FileChooseParams;

		JSApi.file.choose(opt, (files: FileInfo[]) => {
			expect(files).toHaveLength(2);
			expect(files[0]).toHaveProperty("name", "1.pdf");
			done();
		});

		expect(payloadData.action).toBe("file.choose");
		expect(payloadData.data).toBe(JSON.stringify(opt));

		JSApi.invokeH5(payloadData.callbackid, [
			{ name: "1.pdf", size: 1000, filePath: "xxx/xxxx/1.pdf" },
			{ name: "2.pdf", size: 1000, filePath: "xxx/xxxx/2.pdf" }
		]);
	});

	it(" 'file.preview' ", done => {
		const fileInfo = {
			path: "xxx/xxx/1.pdf",
			ext: "pdf",
			name: "1.pdf",
			size: 1000
		} as FilePreviewParams;

		JSApi.file.preview(fileInfo);
		expect(payloadData.action).toBe("file.preview");
		expect(payloadData.data).toBe(JSON.stringify(fileInfo));

		JSApi.file.preview(fileInfo, (progress?: string | number) => {
			expect(progress).toBe(0.44);
			done();
		});
		JSApi.invokeH5(payloadData.callbackid, "0.44");
	});

	it(" 'file.preview' without ext ", done => {
		const fileInfo = {
			path: "xxx/xxx/1.pdf",
			name: "1.pdf",
			size: 1000
		} as FilePreviewParams;

		JSApi.file.preview(fileInfo);
		expect(payloadData.action).toBe("file.preview");
		expect(payloadData.data).toBe(JSON.stringify(fileInfo));
		expect(fileInfo.ext).toBe("pdf");

		JSApi.file.preview(fileInfo, (progress?: string | number) => {
			expect(progress).toBe(0.44);
			done();
		});
		JSApi.invokeH5(payloadData.callbackid, "0.44");
	});

	it(" 'file.preview' name without ext ", () => {
		const fileInfo = {
			path: "xxx/xxx/1.pdf",
			name: "1",
			size: 1000
		} as FilePreviewParams;

		JSApi.file.preview(fileInfo);
		expect(fileInfo).not.toHaveProperty("ext");
	});

	it(" 'file.download' ", done => {
		const fileInfo = {
			url: "http://xxx/xxx/1.pdf",
			name: "1.pdf",
			size: 1000,
			filePath: "xxx/xxxx/1.pdf"
		} as FileDownloadParams;
		JSApi.file.download(fileInfo);
		expect(payloadData.action).toBe("file.download");
		expect(payloadData.data).toBe(JSON.stringify(fileInfo));

		JSApi.file.download(fileInfo, (downloadedFile: FileDownloadedInfo) => {
			expect(downloadedFile).toHaveProperty("name", "1.pdf");
			done();
		});
		JSApi.invokeH5(payloadData.callbackid, {
			name: "1.pdf",
			size: 1000,
			filePath: "xxx/xxxx/1.pdf"
		});
	});
});
