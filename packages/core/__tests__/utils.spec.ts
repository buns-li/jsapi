"use strict";

import { toCamelCase, includes, isFunction, isString } from "../lib/utils";

describe("@jsapi/core", () => {
	it(" `toCamelCase` ", () => {
		let result = toCamelCase("view.goto");
		expect(result).toBe("viewGoto");

		result = toCamelCase("view-goto", "-");
		expect(result).toBe("viewGoto");

		result = toCamelCase("view-goto");
		expect(result).toBe("view-goto");

		result = toCamelCase("");
		expect(result).toBe("");
	});

	it(" `includes` ", () => {
		const arr = [1, 2, "3", "4"] as any[];

		let result = includes(arr, "1");
		expect(result).toBe(false);

		result = includes(arr, 1);
		expect(result).toBe(true);

		result = includes(arr, 2);
		expect(result).toBe(true);

		result = includes(arr, "3");
		expect(result).toBe(true);

		result = includes(arr, "4");
		expect(result).toBe(true);
	});

	it(`isString`, () => {
		expect(isString("1")).toBe(true);
		expect(isString(1)).toBe(false);
		expect(isString({})).toBe(false);
		expect(isString(true)).toBe(false);
		expect(isString(1.1)).toBe(false);
		expect(isString(() => {})).toBe(false);
		expect(isString(null)).toBe(false);
		expect(isString(undefined)).toBe(false);
	});

	it(`isFunction`, () => {
		expect(isFunction("1")).toBe(false);
		expect(isFunction(1)).toBe(false);
		expect(isFunction({})).toBe(false);
		expect(isFunction(true)).toBe(false);
		expect(isFunction(1.1)).toBe(false);
		expect(isFunction(() => {})).toBe(true);
		expect(isFunction(null)).toBe(false);
		expect(isFunction(undefined)).toBe(false);
	});
});
