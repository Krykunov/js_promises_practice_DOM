'use strict';

const successEl = (message) =>
  `<div data-qa="notification" class="success">${message}</div>`;
const errorEl = (message) =>
  `<div data-qa="notification" class="error">${message}</div>`;

const promiseHandler = (message) => {
  const body = document.querySelector('body');

  body.insertAdjacentHTML('beforeend', message);
};

const promise1 = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(errorEl('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timeoutId);
    resolve(successEl('First promise was resolved'));
  });
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve(successEl('Second promise was resolved'));
  });

  document.addEventListener('contextmenu', () => {
    resolve(successEl('Second promise was resolved'));
  });
});

let leftClick = false;
let rightClick = false;

const promise3 = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      leftClick = true;
    } else if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve(successEl('Third promise was resolved'));
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleClick);
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

promise1.then(promiseHandler).catch(promiseHandler);
promise2.then(promiseHandler);
promise3.then(promiseHandler);
