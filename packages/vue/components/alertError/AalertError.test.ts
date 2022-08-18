import { render } from "@testing-library/vue";
import AalertError from "./AalertError.vue";

describe.concurrent("AAlertError Test", async () => {
	it("Show test", async () => {
		const { getByText, getByTestId } = render(AalertError, {
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
		const { queryByText, queryByTestId } = render(AalertError, {
			props: {
				show: false,
				"data-testid": "custom-element",
				v: "component test",
			},
		});

		expect(queryByTestId("custom-element")).toBeDefined();

		expect(queryByText("component test")).toBeDefined();
	});
});
