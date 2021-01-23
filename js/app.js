const name_btn = document.querySelector("#name_btn");
const reviews_btn = document.querySelector("#reviews_btn");
const new_contact = document.querySelector(".new_contact");

reviews_btn.addEventListener('click', () => {
    new_contact.classList.add("reviews-mode");
});

name_btn.addEventListener('click', () => {
    new_contact.classList.remove("reviews-mode");
});