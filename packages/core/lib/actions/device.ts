import { wrap, notifyHost, _ } from "../api";

enum EDevice {
	getNetworkType = "device.getNetworkType",
	scanQRCode = "device.scanQRCode",
	getLocation = "device.getLocation",
	getUUID = "device.getUUID",
	getPhoneInfo = "device.getPhoneInfo"
}

export function initDevice(): void {
	wrap(EDevice.getNetworkType, (cb: NetworkTypeCallback) => notifyHost(EDevice.getNetworkType, _, cb));
	wrap(EDevice.scanQRCode, (opt: QRCodeOption, cb: QRCodeScanCallback) => notifyHost(EDevice.scanQRCode, opt, cb));
	wrap(EDevice.getLocation, (param: LocationParam, cb: LocationCallback) => {
		notifyHost(EDevice.getLocation, param, cb);
	});
	wrap(EDevice.getUUID, (cb: UUIDCallback) => notifyHost(EDevice.getUUID, _, cb));
	wrap(EDevice.getPhoneInfo, (cb: PhoneInfoCallback) => notifyHost(EDevice.getPhoneInfo, _, cb));
}

export interface PhoneInfoParams {
	/**
	 * 手机屏幕宽度
	 *
	 * @type {number}
	 * @memberof PhoneInfoParams
	 */
	screenWidth: number;
	/**
	 * 手机屏幕高度
	 *
	 * @type {number}
	 * @memberof PhoneInfoParams
	 */
	screenHeight: number;
	/**
	 * 手机品牌
	 *
	 * @type {string}
	 * @memberof PhoneInfoParams
	 */
	brand: string;
	/**
	 * 手机型号
	 *
	 * @type {string}
	 * @memberof PhoneInfoParams
	 */
	model: string;
	/**
	 * 版本
	 *
	 * @type {string}
	 * @memberof PhoneInfoParams
	 */
	version: string;
	/**
	 * 网络状况
	 *
	 * @type {NetworkType}
	 * @memberof PhoneInfoParams
	 */
	netInfo: NetworkType;
	/**
	 * 运营商信息
	 *
	 * @type {string}
	 * @memberof PhoneInfoParams
	 */
	operatorType: string;
}

export type PhoneInfoCallback = (params: PhoneInfoParams) => void;

export type NetworkType = "2g" | "3g" | "4g" | "5g" | "wifi" | "NOTREACHABLE" | "UNKNOWN";

export type NetworkTypeCallback = (type: NetworkType) => void;

export type QRCodeScanType = "qrCode" | "barCode";

export type QRCodeScanCallback = (result: string) => void;

export interface QRCodeOption {
	/**
	 * 是否需要返回H5扫码结果
	 * 默认为0，扫描结果由App内部自行处理，1则直接返回扫描结果
	 *
	 * @type {number}
	 */
	needResult: number;
	/**
	 * 扫一扫
	 *
	 * @type {QRCodeScanType[]}
	 */
	scanType: QRCodeScanType[];
}

/**
 * 获取经纬度 请求参数定义
 * @apiName device.geolocation.get
 */
export interface LocationParam {
	/**
	 * 期望定位精度半径（单位米），定位结果尽量满足该参数要求，但是不一定能保证小于该误差，
	 * 开发者需要读取返回结果的 accuracy 字段校验坐标精度；
	 * 建议按照业务需求设置定位精度，推荐采用200m，
	 * 可获得较好的精度和较短的响应时长
	 */
	targetAccuracy?: number;
	/** 1：获取高德坐标， 0：获取标准坐标；推荐使用高德坐标；标准坐标没有address字段 */
	coordinate?: number;
	/** 是否需要带有逆地理编码信息；该功能需要网络请求，请更具自己的业务场景使用 */
	withReGeocode?: boolean;
	/** 是否缓存地理位置信息。默认是true。如果true，客户端会对定位的地理位置信息缓存，在缓存期内（2分钟）再次定位会返回旧的定位 */
	useCache?: boolean;
	/**
	 * 个性化兼容扩展
	 *
	 * @type {any}
	 * @memberof LocationParam
	 */
	extra?: any;
}

export interface LocationResult {
	/** 经度 */
	longitude: number;
	/** 纬度 */
	latitude: number;
	/** 实际的定位精度半径（单位米） */
	accuracy: number;
	/** 格式化地址，如：北京市朝阳区南磨房镇北京国家广告产业园区 */
	address: string;
	/** 省份，如：北京市 */
	province: string;
	/** 城市，直辖市会返回空 */
	city: string;
	/** 行政区，如：朝阳区 */
	district: string;
	/** 街道，如：西大望路甲12-2号楼 */
	road: string;
	/** 当前设备网络类型，如：wifi、3g等 */
	netType: string;
	/** 当前设备使用移动运营商，如：CMCC等 */
	operatorType: string;
	/** 对错误码的描述 */
	errorMessage?: string;
	/** 错误码 */
	errorCode?: number;
	/** 仅Android支持，wifi设置是否开启，不保证已连接上 */
	isWifiEnabled?: boolean;
	/** 仅Android支持，gps设置是否开启，不保证已经连接上 */
	isGpsEnabled?: boolean;
	/** 仅Android支持，定位返回的经纬度是否是模拟的结果 */
	isFromMock?: boolean;
	/** 仅Android支持，我们使用的是混合定位，具体定位提供者有wifi/lbs/gps" 这三种 */
	provider?: "wifi" | "lbs" | "gps";
	/** 仅Android支持，移动网络是设置是否开启，不保证已经连接上 */
	isMobileEnabled: boolean;
	/**
	 * 用于扩展的字段
	 *
	 * @type {*}
	 */
	extra?: any;
}

export type LocationCallback = (result: LocationResult) => void;

export type UUIDCallback = (uuid: string) => void;

export interface DeviceApi {
	/**
	 * 获取网络状态接口
	 *
	 * @param {NetworkTypeCallback} cb 回调函数
	 */
	getNetworkType(cb: NetworkTypeCallback): void;

	/**
	 * 获取坐标位置
	 *
	 * @param {LocationCallback} cb
	 */
	getLocation(param: LocationParam, cb: LocationCallback): void;
	/**
	 * 获取设备UUID
	 *
	 * @param {UUIDCallback} cb
	 */
	getUUID(cb: UUIDCallback): void;
	/**
	 * 获取手机基础信息
	 *
	 * @param {PhoneInfoCallback} cb
	 * @memberof DeviceApi
	 */
	getPhoneInfo(cb: PhoneInfoCallback): void;
	/**
	 * 调用App扫一扫
	 *
	 * @param {QRCodeOption} opt
	 * @param {QRCodeScanCallback} cb
	 */
	scanQRCode(opt: QRCodeOption, cb: QRCodeScanCallback): void;
}
