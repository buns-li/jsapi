import { wrap, notifyHost } from "../api";

enum EFile {
	choose = "file.choose",
	preview = "file.preview",
	download = "file.download"
}

export type FileType = "ppt" | "pptx" | "doc" | "docx" | "xls" | "xlsx" | "xlsm" | "txt" | "pdf" | "zip" | "7z" | "rar";

export interface FileChooseParams {
	/**
	 * 选择文件的数量,默认1
	 */
	count: number;
	/**
	 * 允许选择的文件类型,默认"*"
	 */
	allowTypes: string | FileType[];
	/**
	 * 是否需要自动上传, 默认true
	 */
	shouldUpload: boolean;
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}

export interface FileInfo {
	/**
	 * 文件名称
	 */
	name: string;
	/**
	 * 文件大小,单位:KB
	 */
	size: number;
	/**
	 * 文件路径
	 */
	filePath: string;
	/**
	 * 文件类别标签
	 */
	tag?: string;
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}

export type FileChooseCallback = (files: FileInfo[]) => void;

export interface FilePreviewParams {
	/**
	 * 文件路径
	 */
	path: string;
	/**
	 * 文件名称
	 */
	name: string;
	/**
	 * 文件后缀
	 */
	ext?: string;
	/**
	 * 文件大小,单位:KB
	 */
	size?: number;
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}

/**
 * @params {number|string} progress 阅读进度
 */
export type FilePreviewCallback = (progress?: number | string) => void;

export interface FileDownloadedInfo {
	/**
	 * 待下载的文件名称
	 *
	 */
	name: string;
	/**
	 * 待下载的文件大小，单位:KB
	 *
	 */
	size?: number;
	/**
	 * 待下载文件的后缀
	 *
	 */
	ext?: string;
	/**
	 * 专门用来做项目自定义扩展使用
	 *
	 */
	extra?: any;
	/**
	 * 当前下载的进度
	 *
	 * @type {number}
	 * @memberof FileDownloadedInfo
	 */
	progress?: number;
}

export interface FileDownloadParams extends FileDownloadedInfo {
	/**
	 * 文件url地址
	 *
	 * @type {string}
	 */
	url: string;
}

export type FileDownloadCallback = (downloadedFile: FileDownloadedInfo) => void;

export interface FileApi {
	/**
	 * 文件选择
	 *
	 * @param {FileChooseParams} opt 选择的文件设置信息
	 * @param {FileChooseCallback} cb 选择成功后的回调
	 */
	choose(opt: FileChooseParams, cb: FileChooseCallback): void;
	/**
	 * 预览文件
	 *
	 * @param {FilePreviewParams} fileInfo 待预览的文件信息
	 * @param {FilePreviewCallback} [cb] 预览成功并且阅读后的回调
	 */
	preview(fileInfo: FilePreviewParams, cb?: FilePreviewCallback): void;
	/**
	 * 文件下载
	 *
	 * @param {FileDownloadParams} fileInfo 待下载的文件信息
	 * @param {FileDownloadCallback} [cb] 文件下载完成的回调
	 */
	download(fileInfo: FileDownloadParams, cb?: FileDownloadCallback): void;
}

export function initFile(): void {
	wrap(EFile.choose, (opt: FileChooseParams, cb: FileChooseCallback) =>
		notifyHost(EFile.choose, { allowTypes: "*", count: 1, shouldUpload: true, ...opt }, cb)
	);

	wrap(EFile.preview, (fileInfo: FilePreviewParams, cb?: FilePreviewCallback) => {
		if (!fileInfo.ext && ~fileInfo.name.indexOf(".")) {
			fileInfo.ext = fileInfo.name.split(".").pop();
		}
		notifyHost(EFile.preview, fileInfo, cb);
	});

	wrap(EFile.download, (fileInfo: FileDownloadCallback, cb?: FileDownloadCallback) => {
		notifyHost(EFile.download, fileInfo, cb);
	});
}
