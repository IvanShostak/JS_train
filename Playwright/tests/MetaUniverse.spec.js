const infoFile = require("fs");

const hero = {
  name: "Ivan",
  age: "13",
  gender: "male",
};

// @ts-check
const { test, expect } = require('@playwright/test');

test('create hero', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(await page.locator('.welcome')).toBeVisible();

  await page.getByPlaceholder("name").fill(hero.name);
  await page.getByLabel("Age").fill(hero.age);
  await page.locator("#HeroGender").selectOption(hero.gender);
  await page.getByRole('button', { name: "Create"}).click();

  verifyHeroSaved(hero)
})

function verifyHeroSaved(expectedHero) {
  const reader = infoFile.readFileSync("..\\MyAppForLoadTest\\infoFile.txt");
  const actualHero = JSON.parse(reader.toString());
  expect(expectedHero).toEqual(actualHero);  
}