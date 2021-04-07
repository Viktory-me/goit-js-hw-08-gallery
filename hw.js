import gallery from './gallery-items.js';

const refs={
galleryList: document.querySelector('.js-gallery'),
modalImg: document.querySelector('.lightbox__image'),
modal: document.querySelector('.lightbox'),
btnRef: document.querySelector('.lightbox__button')};

 const markup = gallery.map(
     ({ preview, original, description },index)=> 
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
      data-index="${index}"
    />
  </a>
</li>`)
.join("");

refs.galleryList.insertAdjacentHTML('beforeend', markup);

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

const onModalOpenClick= evt => {
evt.preventDefault(); //прерывание перехода по ссылке!!!

if (evt.target.localName === 'img'){
  

  refs.modalImg.src=evt.target.dataset.source;
  refs.modalImg.alt=evt.target.alt;
  refs.modalImg.dataset.index=evt.target.dataset.index;

  refs.modal.classList.add('is-open')}
};

const onModalCloseClick = evt=> {
  if (evt.target.localName !== 'img') {
    
    refs.modalImg.src='';
    refs.modalImg.alt='';

    refs.modal.classList.remove('is-open')}
};

refs.modalImg.addEventListener('click', onModalOpenClick);
window.addEventListener('click', onModalCloseClick);


// function newSrc(index, step = 0) {
//   refs.modalImg.dataset.index = `${index + step}`;
//   refs.modalImg.src = gallery[index + step].original;
// };
