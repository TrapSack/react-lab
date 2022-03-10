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
    await page.waitForTimeout(1000);
    const name = await page.$eval(".elements-elementStyles__game-card__title", (elem) => elem.firstChild.nodeValue);
    expect(name).toBe("OverWatch");
  });
});

describe("e2e products page test", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:8080/products", { waitUntil: "domcontentloaded" });
  });
  it("should show all games", async () => {
    // await page.waitForSelector(".elements-elementStyles__game-card", { hidden: true });
    // await page.waitForTimeout(1000)
    await page.waitForSelector(".components-products-products__products");
    const games = await page.$eval(".components-products-products__products__main", (element) => element);
    expect(games).toBe(true);
  });
});
