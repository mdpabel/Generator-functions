import { data } from './data';

const container = document.getElementById('app');

window.addEventListener('load', () => {
  for (let i = 0; i < data.length; i++) {
    const div = document.createElement('div');
    div.classList.add('image');
    const image = document.createElement('img');
    image.setAttribute('data-src', data[i].url);
    div.appendChild(image);
    container.appendChild(div);
  }
});

window.addEventListener('load', () => {
  const images = document.querySelectorAll('img[data-src]');

  function* imageLoader() {
    for (const image of images) {
      const src = image.getAttribute('data-src');
      image.src = src;
      yield new Promise((resolve) => {
        image.onload = resolve;
      });
    }
  }

  const imageGenerator = imageLoader();

  async function loadImage() {
    const { value, done } = imageGenerator.next();
    if (!done) {
      await value;
      loadImage();
    }
  }

  loadImage();
});
