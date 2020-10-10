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
closeModalBtn.addEventListener("click", onCloseModal);

function onCloseModal() {
  lightBox.classList.remove("is-open");
  bigPhoto.removeAttribute('src');
  bigPhoto.removeAttribute("alt");
}



