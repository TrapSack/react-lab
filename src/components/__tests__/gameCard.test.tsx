describe("React app", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:8080/");
    page.waitForTimeout(3000);
  });

  it('should be titled "React App"', async () => {
    await expect(page.title()).resolves.toMatch("React App");
  });
  // it("should show top products", async () => {
  //   // const items = await page.$eval(".elements-elementStyles__games-container--home", (elem) => elem.childNodes);
  //   // await expect(items.length).toBe(3);
  //   await page.waitForTimeout(4000);
  //   const item = await page.$eval(".elements-elementStyles__games-container--home", (itemd) => itemd);
  //   console.log(item);
  // });
  it("should type", async () => {
    const selector = `input[name="search-game"]`;
    await page.click(selector);
    await page.evaluate((sel) => document.querySelector(sel).click(), selector);
    page.type(selector, "Overwatch");
  });
});
