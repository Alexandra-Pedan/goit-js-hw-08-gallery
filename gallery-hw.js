import gallery from "./gallery-items.js";
// console.log(gallery);

const galleryEl = document.querySelector(".js-gallery");
const cardsMarkup = galleryImg(gallery);

galleryEl.insertAdjacentHTML("afterbegin", cardsMarkup);

function galleryImg(gallery) {
  return gallery
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
    <a
        class="gallery__link"
        href="${original}"
    >
    <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
    />
    </a>
    </li>`
    )
    .join("");
}

galleryEl.addEventListener("click", onOpenModal);
const lightBox = document.querySelector(".js-lightbox");
const bigPhoto = document.querySelector(".lightbox__image");

function onOpenModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  lightBox.classList.add("is-open");
  const linkBigPhoto = event.target.dataset.source;
  bigPhoto.src = linkBigPhoto;
  bigPhoto.alt = event.target.alt;
}

const closeModalBtn = document.querySelector('[data-action="close-lightbox"]')
const backdrop = document.querySelector('.lightbox__overlay')
closeModalBtn.addEventListener("click", onCloseModal);
backdrop.addEventListener('click', onBackdropClick);

function onCloseModal() {
  lightBox.classList.remove("is-open");
  bigPhoto.removeAttribute('src');
  bigPhoto.removeAttribute("alt");
  document.addEventListener("keydown", onEscKeyPress);
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

document.addEventListener("keydown", onLeftKeyPress);
document.addEventListener("keydown",  onRightKeyPress);
function onLeftKeyPress(event) {
  if (event.code === 'ArrowLeft') {
    const i = gallery.findIndex(image => image.original === bigPhoto.src) - 1;
    if (i === -1) {
      return;
    }
    bigPhoto.src = gallery[i].original;
    bigPhoto.alt = gallery[i].description;
  }
}
function onRightKeyPress(event) {
  if (event.code === 'ArrowRight') {
    const i =
      gallery.findIndex(image => image.original === bigPhoto.src) + 1;
    if (i === gallery.length - 1) {
      return;
    }
    bigPhoto.src = gallery[i].original;
    bigPhoto.alt = gallery[i].description;
  }
}