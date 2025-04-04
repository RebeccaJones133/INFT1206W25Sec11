const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Array of image URLs */
const images = [
  'https://bit.ly/3HihPnf',
  'https://bit.ly/3GhypCD',
  'https://bit.ly/35FlD4i',
  'https://bit.ly/3AREqon',
  'https://bit.ly/3uhxWhd'
];

/* Loop through images using for...of */
for (const image of images) {
  const newImage = document.createElement('img');
  newImage.src = image;
  newImage.addEventListener('click', e => displayedImage.src = e.target.src);
  thumbBar.appendChild(newImage);
}

/* Darken/Lighten button functionality */
btn.addEventListener('click', () => {
  const isDark = btn.className === 'dark';
  btn.className = isDark ? 'light' : 'dark';
  btn.textContent = isDark ? 'Lighten' : 'Darken';
  overlay.style.backgroundColor = isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)';
});