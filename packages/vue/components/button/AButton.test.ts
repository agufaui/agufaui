import { render, fireEvent } from "@testing-library/vue";
import AButton from "./AButton.vue";

describe.concurrent("AButton Test", async () => {
  // The render method returns a collection of utilities to query your component
  const { getByTestId } = render(AButton, {
    props: {
      "data-testid": "custom-element",
      text: "component test",
      ifHover: "hover:bg-pink-400",
      ifFocus: "focus:bg-red-600",
    },
  });
  const button = getByTestId("custom-element");

  it("Props ifHover validation", async () => {
    const validator = AButton.props.ifHover.validator;
    expect(validator("hover:bg-pink-400")).toBe(true);
    expect(validator("bg-pink-400")).toBe(false);
    expect(validator("focus:bg-pink-400")).toBe(false);
  });

  it("Props ifFocus validation", async () => {
    const validator = AButton.props.ifFocus.validator;
    expect(validator("focus:bg-pink-400")).toBe(true);
    expect(validator("bg-pink-400")).toBe(false);
    expect(validator("hover:bg-pink-400")).toBe(false);
  });

  it("Props iconPositon validation", async () => {
    const validator = AButton.props.iconPositon.validator;
    expect(validator("left")).toBe(true);
    expect(validator("right")).toBe(true);
    expect(validator("middle")).toBe(false);
  });

  it("Component test", async () => {
    await fireEvent.mouseMove(button);
    expect(button.classList.value.includes("hover:bg-pink-400")).toBe(true);
    expect(button.classList.value.includes(" bg-pink-400")).toBe(false);

    await fireEvent.click(button);
    expect(button.classList.value.includes("focus:bg-red-600")).toBe(true);
    expect(button.classList.value.includes(" bg-red-600")).toBe(false);
  });
});
