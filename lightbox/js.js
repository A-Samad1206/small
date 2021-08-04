const lightbox = document.createElement('div'),
  images = document.querySelectorAll('img');

lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

images.forEach((img) => {
  img.addEventListener('click', (e) => {
    const imgTag = document.createElement('img');
    imgTag.src = img.src;
    // while(lightbox.)
    lightbox.appendChild(imgTag);
    lightbox.classList.add('active');
  });
});

lightbox.addEventListener('click', (e) => {
  console.log({ target: e.target, crtTarget: e.currentTarget });
  if (e.target !== e.currentTarget) return;
  lightbox.classList.remove('active');
  lightbox.innerHTML = '';
});
