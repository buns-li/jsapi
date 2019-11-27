"use strict";

import { toCamelCase, includes, canUseIOSWK, isIPhone, isAndroid } from "../lib/utils";

describe("@jsapi/core", () => {
	it(" `toCamelCase` ", () => {
		let result = toCamelCase("view.goto");
		expect(result).toBe("viewGoto");

		result = toCamelCase("view-goto", "-");
		expect(result).toBe("viewGoto");

		result = toCamelCase("view-goto");
		expect(result).toBe("view-goto");
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

	it(" `canUseIOSWK` ", () => {
		// 修改userAgent,可详见根目录下的jest.config.js->"testEnvironmentOptions"

		expect(isIPhone).not.toBe(0);
		expect(isAndroid).toBe(0);

		const result = canUseIOSWK();
		expect(result).toBe(true);
	});
});
