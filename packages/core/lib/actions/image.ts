import { wrap, notifyHost } from "../api";

enum EImage {
	choose = "image.choose",
	preview = "image.preview",
	save = "image.save"
}

export function initImage(): void {
	wrap(EImage.choose, (opt: ImageChooseParams, cb: ImageChooseCallback) => notifyHost(EImage.choose, opt, cb));
	wrap(EImage.preview, (opt: ImagePreviewParams) => notifyHost(EImage.preview, opt));
	wrap(EImage.save, (imgUrlOrBase64: string, cb?: ImageSaveCallback) =>
		notifyHost(EImage.save, { imgUrlOrBase64 }, cb)
	);
}

export type ImageSourceType = "album" | "camera";

export type ImageSizeType = "original" | "compressed";

export type ImageChooseCallback = (urls: string[]) => void;

export type ImageSaveCallback = (isok: boolean) => void;

export interface ImageChooseParams {
	/**
	 * 选择图片的数量,默认1，最大9
	 *
	 * @type {number}
	 */
	count: number;
	/**
	 * 指定是原图还是压缩图，默认二者都有
	 *
	 * @type {ImageSizeType[]}
	 */
	sizeType: ImageSizeType[];
	/**
	 * 指定来源是相册还是相机，默认二者都有
	 *
	 * @type {ImageSourceType[]}
	 */
	sourceType: ImageSourceType[];
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}

export interface ImagePreviewParams {
	/**
	 * 当前展示的图片地址
	 */
	current: string;
	/**
	 * 当前图片对应的索引
	 */
	currentIndex: number;
	/**
	 * 需要预览的图片链接列表
	 */
	urls: string[];
	/**
	 * 图标预览的标题
	 */
	titles?: string[];
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}

export interface ImageApi {
	/**
	 * 拍照或从手机相册中选图
	 *
	 * @param {ImageChooseParams} opt 配置接口信息
	 * @param {ImageChooseCallback} cb 选择完成后的回调操作
	 */
	choose(opt: ImageChooseParams, cb: ImageChooseCallback): void;

	/**
	 * 通知App去实现图片预览功能
	 *
	 * @param {ImagePreviewParams} opt 预览参数配置信息
	 */
	preview(opt: ImagePreviewParams): void;
	/**
	 *
	 * 保存图片至本地
	 *
	 * @param {string} imgUrlOrBase64 图片地址或图片对应的base64字符串
	 * @param {ImageSaveCallback} [cb] 回调操作
	 */
	save(imgUrlOrBase64: string, cb?: ImageSaveCallback): void;
}
