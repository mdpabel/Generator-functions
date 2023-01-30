// index.js
import throttle from 'lodash.throttle';
import './style.css';

let start = 0;
// let isLoading = false;

async function* getDataFromAPI() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=5`
  );
  const json = await response.json();
  start += 5;
  yield json;
}

const contentDiv = document.getElementById('app');

async function loadData() {
  console.log('Loading...');
  // isLoading = true;
  const dataGenerator = getDataFromAPI();
  const { value: data, done } = await dataGenerator.next();

  data.forEach((item) => {
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = item.id;
    itemDiv.classList.add('item');
    contentDiv.appendChild(itemDiv);
  });
  // isLoading = false;
}

const throttledLoadData = throttle(loadData, 2000);

window.addEventListener('scroll', async () => {
  if (
    window.innerHeight + window.scrollY >=
    contentDiv.offsetHeight + contentDiv.offsetTop
  ) {
    await throttledLoadData();
  }
});

window.addEventListener('load', async () => {
  await loadData();
});
