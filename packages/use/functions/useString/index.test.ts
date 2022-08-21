import { useString } from "./";

describe.concurrent("Component Test", async () => {
	it("Props hover validation", async () => {
		const { pascalCaseToSpace } = useString();
		expect(pascalCaseToSpace("user")).toBe("User");
		expect(pascalCaseToSpace("userLogin")).toBe("User Login");
		expect(pascalCaseToSpace("userIDLogin")).toBe("User ID Login");
	});

	it("hyphen to camelCase validation", async () => {
		const { hyphenToCamelCase } = useString();
		expect(hyphenToCamelCase("ui-id")).toBe("uiId");
	});
});
