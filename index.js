const url = "https://api.unsplash.com/";
import { API_KEY } from "./apiKey.js";

const contentContainer = document.getElementById("contentContainer");
const home = document.getElementById("home");
const searchBar = document.getElementById("searchBar");
const submitButton = document.getElementById("submitButton");
const main = document.getElementById("main");
const morePhotosButton = document.getElementById("morePhotosButton");
const errorMessage = document.getElementById("errorMessage");

let photos = [];
let page = 1;
let chosenImage = 0;
let searchInput = "";

const getPhotos = async () => {
  await fetch(`${url}photos/?page=${page}&client_id=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        photos = data;
        handlePhotos(photos);
      } else {
        morePhotosButton.style.display = "none";
        errorMessage.style.display = "block";
        errorMessage.innerText = "ERROR TO LOAD";
      }
    });
};

const handlePhotos = (handler) => {
  handler.forEach((photo, i) => {
    let component = document.createElement("div");
    component.className = "component";

    let img = document.createElement("img");
    img.src = photo.urls.regular;
    img.alt = photo.alt_description;

    component.append(img);

    let interactionsContainer = document.createElement("div");
    interactionsContainer.className = "interactionsContainer";

    let favoriteButton = document.createElement("button");
    favoriteButton.className = "favoriteButton";
    favoriteButton.type = "button";

    let favoriteButtonImage = document.createElement("img");
    favoriteButtonImage.src = "/icons/favorite.svg";
    favoriteButtonImage.alt =
      "Favorite button to mark a photo as your favorite";

    favoriteButton.addEventListener("click", (e) => {
      chosenImage = i;
      e.target.classList.toggle("favoriteButtonClicked");
    });

    favoriteButton.append(favoriteButtonImage);
    interactionsContainer.append(favoriteButton);

    let likeButton = document.createElement("button");
    likeButton.className = "likeButton";
    likeButton.type = "button";

    let likeButtonImage = document.createElement("img");
    likeButtonImage.src = "/icons/like.svg";
    likeButtonImage.alt = "A button to mark a photo that you like";

    likeButton.addEventListener("click", (e) => {
      chosenImage = i;
      e.target.classList.toggle("likeButtonClicked");
    });

    likeButton.append(likeButtonImage);
    interactionsContainer.append(likeButton);

    let archiveButton = document.createElement("button");
    archiveButton.className = "archiveButton";
    archiveButton.type = "button";

    let archiveButtonImage = document.createElement("img");
    archiveButtonImage.src = "/icons/archive.svg";
    archiveButtonImage.alt = "A button to archive a photo";

    archiveButton.addEventListener("click", (e) => {
      chosenImage = i;
      e.target.classList.toggle("archiveButtonClicked");
    });

    archiveButton.append(archiveButtonImage);
    interactionsContainer.append(archiveButton);

    component.appendChild(interactionsContainer);

    main.appendChild(component);
  });
};

const handleTitle = () => {
  contentContainer.scrollTo(0, 0);
  main.innerHTML = "";
  getPhotos();
  morePhotosButton.style.display = "block";
};

const handleSearchBar = (e) => {
  searchInput = e.target.value;
};

const handleSubmitButton = (e) => {
  e.preventDefault();
  photos = [];

  fetch(
    `${url}search/photos?per_page=30&query=${searchInput}&client_id=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        photos = data.results;
        main.innerHTML = "";
        handlePhotos(photos);
        contentContainer.scrollTo(0, 0);
      } else {
        morePhotosButton.style.display = "none";
        errorMessage.style.display = "block";
        errorMessage.innerText = "ERROR TO LOAD";
      }
    });
  morePhotosButton.style.display = "none";
  searchBar.value = "";
};

const morePhotosFunction = (e) => {
  e.preventDefault();
  page++;
  getPhotos();
};

home.addEventListener("click", handleTitle);
searchBar.addEventListener("change", handleSearchBar);
submitButton.addEventListener("click", handleSubmitButton);
morePhotosButton.addEventListener("click", morePhotosFunction);

window.addEventListener("DOMContentLoaded", getPhotos);
