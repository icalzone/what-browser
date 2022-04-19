import {
  onReady, query, setFavicon, createImage, appendTo, setText, flashText, queryAll
} from './dom';
import { browserInfo } from './debug-info';
import favicon from './favicon';
import browserLogos from './browser-logos';
import copyToClipboard from './copy-to-clipboard';

// Set page favicon
setFavicon(favicon);

onReady(() => {
  browserInfo().then(info => {
    const logoHref = browserLogos(info.browser.name);
    if (logoHref) {
      appendTo('#browser-logo', createImage(logoHref))
    }
    setText('#browser-name', info.browser.name);
    setText('#browser-version', info.browser.shortVersion);
    setText('#debug-info-json', JSON.stringify(info, null, 2));
  })
});

onReady(() => {
  queryAll('.debug-info-to-clipboard').forEach(element => {
    element.addEventListener('click', event => {
      event.preventDefault();
      if (event.target.disabled) return;

      copyToClipboard(query('#debug-info-json').innerText);
      flashText(element, 'Copied!', 1500);
    });
  })
});
