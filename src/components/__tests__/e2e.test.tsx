jest.setTimeout(20000);
describe("e2e home page test", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:8080/", { waitUntil: "domcontentloaded" });
  });
  it('should be titled "React app"', async () => {
    await expect(page.title()).resolves.toMatch("React App");
  });
  it("should type in search field and get proper result", async () => {
    await page.click(".elements-elementStyles__game-search");
    await page.type(".elements-elementStyles__game-search", "Overwatch");
    await page.waitForTimeout(100);
    const name = await page.$eval(".elements-elementStyles__game-card__title", (elem) => elem.firstChild.nodeValue);
    expect(name).toBe("OverWatch");
  });
});

describe("e2e products page test", () => {
  beforeEach(async () => {
    await page.goto("http://localhost:8080/products", { waitUntil: "domcontentloaded" });
  });
  it("should show filter", async () => {
    await page.waitForSelector(".components-products-products__sort-field__title");
    const title = await page.$eval(
      ".components-products-products__sort-field__title",
      (element) => element.firstChild.nodeValue
    );
    expect(title).toBe("All games");
  });
  it("should show all games", async () => {
    await page.waitForTimeout(100);
    const length = await page.$$eval(".elements-elementStyles__game-card", (games) => games.length);
    expect(length).toBe(7);
  });
  it("should filter games", async () => {
    await page.waitForTimeout(100);
    await page.click("label[for='shooter'].components-products-products__sort-field__option");
    await page.waitForTimeout(100);
    const length = await page.$$eval(".elements-elementStyles__game-card", (games) => games.length);
    expect(length).toBe(3);
  });
});

