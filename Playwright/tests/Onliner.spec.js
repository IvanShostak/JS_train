// @ts-check
const { test, expect } = require('@playwright/test');

test('onliner', async ({ page }) => {
  await page.goto('https://www.onliner.by/');

  await expect((await page.locator('.b-col div').all()).length).toBeGreaterThan(1)

  // screenshot 30 run time(--repeat-each 30) and wait for currency and weather - not working
  await page.waitForLoadState();
  expect (await page.locator('.b-top-menu').screenshot({mask: [page.locator('.b-top-navigation-informers helpers_hide_desktop')] })).toMatchSnapshot('screenshots/screenshot.png')
});

// to do: learn: bearer, basic auth. request for basic auth in httpbin
test('http bin', async ({ request }) => {
  const response = await request.post(`https://httpbin.org/post`);
  expect(response.status()).toBe(200);
});

test('auth', async ({ request }) => {
  const username = 'Ivan'
  const password = 'Ivan2023'
  const response = await request.get(`https://httpbin.org/basic-auth/${username}/${password}`, {
    headers: {
      'Authorization': `Basic ${btoa(`${username}:${password}`)}`
    }
  });
  expect(response.status()).toBe(200);
});

// to do: к след пятнице: 
//1. написать свой веб-сайт(
//  a. css + хтмл
//  б. форма хтмл, которая делает пост реквест 
//  в. поднять сервер с двумя эндпоинтами(get - main URL, post - save) - использовать express js
//  г. пост принимает форм дата и сохраняет всё в файл
//  д. фронт отправляет на бэк запрос

//  2. создать лоад тест на К6, открывает гет эндпоинт и делает пост запрос в течении 5 минут с рейтом 1 запрос в секунду.