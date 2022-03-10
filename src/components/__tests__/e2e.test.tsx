jest.setTimeout(20000);
describe("e2e home page test", () => {
  // beforeAll(async () => {
  // });
  it('should be titled "React app"', async () => {
    await page.goto("http://localhost:8080/");
    await expect(page.title()).resolves.toMatch("React App");
  });
  it("should type in search field and get proper result", async () => {
    await page.goto("http://localhost:8080/");
    await page.waitForTimeout(3000);
    await page.click(".elements-elementStyles__game-search");
    await page.type(".elements-elementStyles__game-search", "Overwatch");
    await page.waitForTimeout(1000);
    const name = await page.$eval(".elements-elementStyles__game-card__title", (elem) => elem.firstChild.nodeValue);
    expect(name).toBe("OverWatch");
  });
  it("should show all games", async () => {
    await page.goto("http://localhost:8080/products");
    // await page.waitForSelector(".elements-elementStyles__game-card", { hidden: true });
    await page.waitForTimeout(1000);
    const games = await page.$$eval(".elements-elementStyles__game-card", (gamesElements) => gamesElements);
    console.log(games);
  });
});
