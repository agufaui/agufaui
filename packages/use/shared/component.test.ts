import { useComponent } from "./component";

describe.concurrent("Component Test", async () => {
  it("Props ifHover validation", async () => {
    const { getColorCSS } = useComponent();
    expect(getColorCSS("blue")).toBe(
      "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
    );
    expect(getColorCSS("pink")).toBe(
      "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
    );
  });
});
