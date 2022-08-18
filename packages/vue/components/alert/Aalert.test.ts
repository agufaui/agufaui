import { render } from "@testing-library/vue";
import Aalert from "./Aalert.vue";

describe.concurrent("AAlert Test", async () => {
	it("Show test", async () => {
		const { getByText, getByTestId } = render(Aalert, {
			props: {
				show: true,
				"data-testid": "custom-element",
				v: "component test",
			},
		});

		expect(getByTestId("custom-element")).toBeDefined();

		expect(getByText("component test")).toBeDefined();
	});

	it("Not show test", async () => {
		const { queryByText, queryByTestId } = render(Aalert, {
			props: {
				"data-testid": "custom-element",
				v: "component test",
			},
		});

		expect(queryByTestId("custom-element")).toBeNull();

		expect(queryByText("component test")).toBeNull();
	});
});
