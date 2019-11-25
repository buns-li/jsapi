/**
 * 柯里化的对象类型判断
 *
 * @export
 * @param {string} type 指定的对象类型
 * @returns {Function}
 */
export function isType(type: string): Function {
	return (obj: object): boolean => Object.prototype.toString.call(obj) === "[object " + type + "]";
}

/**
 *  是否是Function类型
 */
export const isFunction = isType("Function");

/**
 * 是否是String类型
 */
export const isString = isType("String");

/**
 *  获取当前浏览器的基础信息: 内核、版本、操作系统
 */
export const ua = navigator.userAgent.toLowerCase();

/**
 * 是否是iphone客户端
 */
export const isIPhone = ~ua.indexOf("iphone");

/**
 * 是否是Android客户端
 */
export const isAndroid = ~ua.indexOf("android");

/**
 * 是否是IOS7以上的版本
 *
 * @export
 * @returns {boolean}
 */
export function canUseIOSWK(): boolean {
	if (!isIPhone) return false;

	const matchArr = ua.match(/os [\d._]+/gi);

	let version = matchArr && matchArr.length ? matchArr[0] : null;

	version = (version + "").replace(/[^0-9|_.]/gi, "");

	if (~version.indexOf("_")) {
		return parseInt(version.split("_")[0], 10) > 7;
	}

	return false;
}

/**
 * converting a string to a `camel-case`
 *
 * @param {string} input a string input value
 * @param {string} [seperator="."] string seperator char
 * @returns a `camel-case` string
 */
export function toCamelCase(input: string, seperator = "."): string {
	return input ? input.replace(new RegExp(`\\${seperator}(\\w)`, "g"), ($0, $1) => $1.toUpperCase()) : "";
}

/**
 * 判断数组里面是否包含指定值
 *
 * @export
 * @template T
 * @param {T[]} arr 原数组
 * @param {T} item 指定值
 * @returns {boolean}
 */
export function includes<T>(arr: T[], item: T): boolean {
	for (let l = arr.length; l--; ) {
		if (arr[l] === item) return true;
	}
	return false;
}
