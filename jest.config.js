module.exports = {
	globals: {
		"ts-jest": {
			tsConfig: "tsconfig.json"
		}
	},
	moduleFileExtensions: ["ts", "js"],
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest"
	},
	testMatch: ["**/__tests__/**/*.(test|spec).(ts|js)"],
	testEnvironmentOptions: {
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
	}
};
