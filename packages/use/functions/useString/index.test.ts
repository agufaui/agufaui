import { useString } from "./";

describe.concurrent("Component Test", async () => {
	it("Props hover validation", async () => {
		const { pascalCaseToSpace } = useString();
		expect(pascalCaseToSpace("user")).toBe("User");
		expect(pascalCaseToSpace("userLogin")).toBe("User Login");
		expect(pascalCaseToSpace("userIDLogin")).toBe("User ID Login");
	});
});
