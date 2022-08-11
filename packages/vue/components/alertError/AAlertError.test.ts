import { render } from "@testing-library/vue";
import AAlertError from "./AAlertError.vue";

describe.concurrent("AAlertError Test", async () => {
	it("Show test", async () => {
		const { getByText, getByTestId } = render(AAlertError, {
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
		const { queryByText, queryByTestId } = render(AAlertError, {
			props: {
				show: false,
				"data-testid": "custom-element",
				msg: "component test",
			},
		});

		expect(queryByTestId("custom-element")).toBeDefined();

		expect(queryByText("component test")).toBeDefined();
	});
});
