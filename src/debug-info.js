const Bowser = require('bowser');
const BROWSER = Bowser.getParser(window.navigator.userAgent).parsedResult;

const browser = () => new Promise(resolve => resolve({
  browser: {
    ...BROWSER.browser,
    shortVersion: BROWSER.browser.version.split('.')[0],
    webdriver: navigator.webdriver,
    width: window.innerWidth,
    height: window.innerHeight
  }
}));

const device = () => new Promise(resolve => resolve({
  device: {
    hardwareConcurrency: navigator.hardwareConcurrency,
    memoryGB: navigator.deviceMemory,
    resolution: `${screen.availWidth}x${screen.availHeight}`,
    width: screen.availWidth,
    height: screen.availHeight,
    colorDepth: screen.colorDepth,
    isRetina: (window.devicePixelRatio || 0) > 1 || false,
  }
}))

const languages = () => new Promise(resolve => resolve({
  language: navigator.language,
  languages: navigator.languages,
}));

const features = () => new Promise(resolve => resolve({
  features: {
    cookieEnabled: navigator.cookieEnabled,
    javaEnabled: navigator.javaEnabled(),
    websocketsEnabled: ('WebSocket' in window || 'MozWebSocket' in window),
  }
}));

const plugins = () => new Promise(resolve => {
  const data = {};
  for (let key in navigator.plugins) {
    if (!navigator.plugins.hasOwnProperty(key)) continue;

    data[navigator.plugins[key].name] = navigator.plugins[key].description;
  }

  resolve({ plugins: data });
});

const rootData = () => new Promise(resolve => resolve({
  ...BROWSER,
  userAgent: navigator.userAgent,
  vendor: navigator.vendor,
  online: navigator.onLine,
  doNotTrack: navigator.doNotTrack,
  userAgent: navigator.userAgent
}));

const battery = () => new Promise(resolve => {
  if (!navigator.getBattery) resolve({ battery: {} });

  navigator.getBattery()
    .then(battery => resolve({
      battery: {
        charging: battery.charging,
        level: battery.level,
      }
    }));
});

const ipAddress = () => new Promise(resolve => {
  fetch('https://api.ipify.org/?format=json')
    .then(response => response.json())
    .then(json => resolve({ ip: json.ip }))
    .catch(() => resolve({ ip: null }))
});

export const browserInfo = () => new Promise(resolve => {
  const dataParts = [
    rootData(),
    browser(),
    languages(),
    device(),
    battery(),
    plugins(),
    ipAddress(),
    features()
  ];

  Promise.all(dataParts).then(values => {
    const data = values.reduce((acc, value) => Object.assign(acc, value), {});
    resolve({ ...data })
  });
});
