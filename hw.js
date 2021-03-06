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

refs.btnRef.addEventListener('click', onModalCloseClick);
refs.galleryList.addEventListener('click', onModalOpenClick);
window.addEventListener('click', onModalCloseClick);

const onKeyClick= evt=>{
  if (evt.key==="Escape") {
    refs.modal.classList.remove('is-open')
  }
};

window.addEventListener('keyup',onKeyClick);

// пролистывание влево-врпаво по стрелкам клавы

function newSrc(index, step = 0) {
  refs.modalImg.dataset.index = `${index + step}`;
  refs.modalImg.src = gallery[index + step].original;
};

function onArrowLeft() {
  let index = +refs.modalImg.dataset.index;
  if (index === 0) {
    newSrc(gallery.length - 1);
    return;
  }
  newSrc(index, -1);
};

function onArrowRight() {
  let index = +refs.modalImg.dataset.index;
  if (index === gallery.length - 1) {
    newSrc(0);
    return;
  }
  newSrc(index, 1);
};

window.addEventListener('keydown', evt=> {
  if (evt.code === 'ArrowLeft') {
    onArrowLeft();
  }
  if (evt.code === 'ArrowRight') {
    onArrowRight();
  }
});