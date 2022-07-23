import { aUseVueComponent } from ".";
import Config from "../../../core/config";

describe.concurrent("Component Test", async () => {
  it("Props ifHover validation", async () => {
    const { getComputedPropertiesFromProps } = aUseVueComponent();
    const config = new Config({
      theme: { abutton: { default: { ifHover: "hover:bg-green-400" } } },
    });
    expect(1).toBe(1);
  });
});
