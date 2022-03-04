/**
 * @jest-environment jsdom
 */
import ReactDOM from "react-dom";
import App from "../../App";

describe("Home component tests", () => {
  let container: HTMLDivElement;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(<App />, container);
  });
  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });
  it("Renders correctly initial document", () => {
    const platforms = document.querySelector(".components-home-home__home__platforms");
    expect(platforms).toBeTruthy();
  });
});
