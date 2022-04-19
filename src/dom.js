export function onReady(callback) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading'){
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}

export function query(selector) {
  return document.querySelector(selector);
}

export function queryAll(selector) {
  return document.querySelectorAll(selector);
}

export function setFavicon(data) {
  const head = query('head');
  const faviconLink = document.createElement('link');
  faviconLink.rel = 'shortcut icon';
  faviconLink.href = data;
  head.appendChild(faviconLink);
}

export function createImage(src) {
  const image = document.createElement('img');
  image.src = src;
  return image;
}

export function setText(selector, text) {
  query(selector).innerText = text
}

export function appendTo(selector, element) {
  query(selector).appendChild(element);
}

export function flashText(element, text, timeout = 1500) {
  const previousHTML = element.innerHTML;
  element.innerText = text;
  element.disabled = true;

  setTimeout(() => {
    element.innerHTML = previousHTML;
    element.disabled = false;
  }, timeout);
}
