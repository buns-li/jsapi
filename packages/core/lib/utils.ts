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
