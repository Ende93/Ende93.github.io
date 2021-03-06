# linux connect tool
Putty
# Install Chrome
```
# Install Google Chrome
# https://askubuntu.com/questions/79280/how-to-install-chrome-browser-properly-via-command-line
sudo apt-get install libxss1 libappindicator1 libindicator7
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome*.deb  # Might show "errors", fixed by next line
sudo apt-get install -f

# Install Node Stable (v10)
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs

# Run Chrome as background process
# https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
# --disable-gpu currently required, see link above
google-chrome --headless --hide-scrollbars --remote-debugging-port=9222 --disable-gpu &

# Install script dependencies
npm install chrome-remote-interface minimist

# Take the screenshot
nodejs index.js --url="http://www.eff.org"
```
# Using headless Chrome.
## use puppeteer
[puppeteer](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md)
## use chrome-remote-interface
```
const CDP = require('chrome-remote-interface');
const argv = require('minimist')(process.argv.slice(2));
const file = require('fs');

// CLI Args
const url = argv.url || 'https://www.google.com';
const format = argv.format === 'jpeg' ? 'jpeg' : 'png';
const viewportWidth = argv.viewportWidth || 1440;
const viewportHeight = argv.viewportHeight || 900;
const delay = argv.delay || 0;
const userAgent = argv.userAgent;
const fullPage = argv.full;

// Start the Chrome Debugging Protocol
CDP(async function(client) {
  // Extract used DevTools domains.
  const {DOM, Emulation, Network, Page, Runtime} = client;

  // Enable events on domains we are interested in.
  await Page.enable();
  await DOM.enable();
  await Network.enable();

  // If user agent override was specified, pass to Network domain
  if (userAgent) {
    await Network.setUserAgentOverride({userAgent});
  }

  // Set up viewport resolution, etc.
  const deviceMetrics = {
    width: viewportWidth,
    height: viewportHeight,
    deviceScaleFactor: 0,
    mobile: false,
    fitWindow: false,
  };
  await Emulation.setDeviceMetricsOverride(deviceMetrics);
  await Emulation.setVisibleSize({width: viewportWidth, height: viewportHeight});

  // Navigate to target page
  await Page.navigate({url});

  // Wait for page load event to take screenshot
  Page.loadEventFired(async () => {
    // If the `full` CLI option was passed, we need to measure the height of
    // the rendered page and use Emulation.setVisibleSize
    if (fullPage) {
      const {root: {nodeId: documentNodeId}} = await DOM.getDocument();
      const {nodeId: bodyNodeId} = await DOM.querySelector({
        selector: 'body',
        nodeId: documentNodeId,
      });
      const {model: {height}} = await DOM.getBoxModel({nodeId: bodyNodeId});

      await Emulation.setVisibleSize({width: viewportWidth, height: height});
      // This forceViewport call ensures that content outside the viewport is
      // rendered, otherwise it shows up as grey. Possibly a bug?
      await Emulation.forceViewport({x: 0, y: 0, scale: 1});
    }

    setTimeout(async function() {
      const screenshot = await Page.captureScreenshot({format});
      const buffer = new Buffer(screenshot.data, 'base64');
      file.writeFile('output.png', buffer, 'base64', function(err) {
        if (err) {
          console.error(err);
        } else {
          console.log('Screenshot saved');
        }
        client.close();
      });
    }, delay);
  });
}).on('error', err => {
  console.error('Cannot connect to browser:', err);
});
```
# echo to save
echo "text" >> save.txt

# shadowsocks
```shell
cd /usr/local/

wget –no-check-certificate -O shadowsocks-all.sh https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks-all.sh

chmod +x shadowsocks-all.sh

./shadowsocks-all.sh 2>&1 | tee shadowsocks-all.log
/etc/init.d/shadowsocks-python start | stop | restart | status
```
## shadowsocks config for multi user
```shell
cd /etc/shadowsocks-python
vi config.json
# add port_password config
# 端口号，密码
```json
{
  "server": "0.0.0.0",
  "port_password": {
  	 "8381": "foobar1", 
     "8384": "foobar4"
	},
}
 ```
### config fail(配置无效)
> only origin port which singe user config use valid after change port 仅原有端口有效

Because the firewall of the os block the port, You need to open it.See [detail](https://github.com/shadowsocks/shadowsocks-go/issues/135) or examples below.
### use putty through shadowsocks
putty -> connection -> proxy -> Proxy type: SOCK 5 -> input your localhost ss port, 
eg: Proxy hostname —— localhost, Port: 1080 -> Choose Print proxy diagnostics(optional) -> Open -> Done

#### centos6
```shell
iptables -I INPUT -m state --state NEW -m tcp -p tcp --dport 8989 -j ACCEPT
iptables -I INPUT -m state --state NEW -m udp -p udp --dport 8989 -j ACCEPT
/etc/init.d/iptables save
/etc/init.d/iptables restart
```
#### centos7
```shell
firewall-cmd --permanent --zone=public --add-port=8989/tcp
firewall-cmd --permanent --zone=public --add-port=8989/udp
firewall-cmd --reload
``` 
# shadowsocks manager for windows
https://github.com/shadowsocks/shadowsocks-windows/releases
