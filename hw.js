import gallery from './gallery-items.js';

const refs={
galleryListRef: document.querySelector('.js-gallery'),
modalImgRef: document.querySelector('.lightbox__image'),
modalRef: document.querySelector('.lightbox'),
btnRef: document.querySelector('.lightbox__button')};


 const markup = gallery.map(
     ({ preview, original, description })=> 
         `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`)
.join("");

refs.galleryListRef.insertAdjacentHTML('beforeend', markup)
