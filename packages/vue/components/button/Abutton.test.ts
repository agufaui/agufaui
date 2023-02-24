import { render, fireEvent } from "@testing-library/vue";
import Abutton from "./Abutton.vue";

describe.concurrent("AButton Test", async () => {
	// The render method returns a collection of utilities to query your component
	const { getByTestId } = render(Abutton, {
		props: {
			"data-testid": "custom-element",
			v: "component test",
			c: "hover:bg-pink-4 focus:bg-red-6",
		},
	});
	const button = getByTestId("custom-element");

	it("Component test", async () => {
		await fireEvent.mouseMove(button);
		expect(button.classList.value.includes("hover:bg-pink-4")).toBe(true);
		expect(button.classList.value.includes(" bg-pink-4")).toBe(false);

		await fireEvent.click(button);
		expect(button.classList.value.includes("focus:bg-red-6")).toBe(true);
		expect(button.classList.value.includes(" bg-red-6")).toBe(false);
	});
});
