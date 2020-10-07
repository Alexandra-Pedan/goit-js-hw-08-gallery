import gallery from "./gallery-items.js";
console.log(gallery);

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
