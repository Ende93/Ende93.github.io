# Puppeteer
> [`Puppeteer`](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md) 是一个 `Node` 库，其通过对 [`DevTools`](https://chromedevtools.github.io/devtools-protocol/) 协议的封装提供了诸多高级 API 来控制 `headless Chrome` 或 `Chromium`。它也可以修改配置来使用完整（non-headless）Chrome 或 Chromium。
##### Puppeteer 能做什么

你可以在浏览器中手动完成的大部分事情都可以使用 `Puppeteer` 完成！比如下面这些事情：

* 自动生成页面的截图和 PDF。
* 能够抓取 SPA 页面并生成预渲染的内容（即“SSR”）。
* 实现自动表单提交，UI测试，键盘输入等。
* 可以搭建一个最新的自动化测试环境。使用最新的 JavaScript 和浏览器功能，并直接在最新版本的 Chrome 中进行测试。
* 自动抓取站点的 [timeline trace](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference)，以检测发现网站的性能问题。

线上跑一跑：https://try-puppeteer.appspot.com/

## 非同步性
[`puppeteer`](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md) 是通过 [`DevTools Protocol`](https://chromedevtools.github.io/devtools-protocol/) 来实现与 `Chromium` 的通信和操作的，因此并不会与浏览器的操作完全同步，且可能获取 `dom` 的时候已经好几个 `tick` 以后了。
比如：
```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let count = 1;

  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});
  page.on('load', () => {
    // send two request about `https://example.com/api`
    // the request will write response data to .result element
    page.$('#btn').click();
    page.$('#btn').click();
  });
  page.on('response', async req => {
    if (req.url() === 'https://exmaple.com/api') {
      let result = await page.$eval('#result', node => node.textContent)
      // the result will be the second response, not the first
    }
  });
  await browser.close();
})();
```
## Page
`Page` 是由 `broswer.newPage()` 创建出的用以控制浏览器页面的对象/实例。
### Page.evaluate(pageFunction, ...args)
此方法的传入的 `pageFunction` 是在浏览器 `context` 中执行的，需要用到 `Page.evaluate` 外相关参数的话需要用 `args` 传入：
```js
// jquery page
const id = '#btn'
const id2 = '...'
Page.evaluate((id, id2) => {
  $(id).doSomething();
}, id, id2)
```
错误的例子：
```js
const id = '#btn'
Page.evaluate(() => {
  // throw id not defined
  $(id).doSomething();
})
```
参见 https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pageevaluatepagefunction-args

## Puppeteer.launch(option)
此方法会创建一个浏览器实例，默认的窗口大小是 `800x600`。`option` 使用见 https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions
### 设置窗口大小
```js
puppeteer.launch({
  headless: false,
  // use args to set window size
  args: ['--window-size=1920,1080']
})
```