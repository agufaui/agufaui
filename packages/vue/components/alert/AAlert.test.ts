import { render } from "@testing-library/vue";
import AAlert from "./AAlert.vue";

describe.concurrent("AAlert Test", async () => {
	it("Show test", async () => {
		const { getByText, getByTestId } = render(AAlert, {
			props: {
				show: true,
				"data-testid": "custom-element",
				msg: "component test",
			},
		});

		expect(getByTestId("custom-element")).toBeDefined();

		expect(getByText("component test")).toBeDefined();
	});

	it("Not show test", async () => {
		const { queryByText, queryByTestId } = render(AAlert, {
			props: {
				"data-testid": "custom-element",
				msg: "component test",
			},
		});

		expect(queryByTestId("custom-element")).toBeNull();

		expect(queryByText("component test")).toBeNull();
	});
});
