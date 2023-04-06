import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { renderImages } from './js/renderimages';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

export { gallery, btnLoadMore };

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30578820-1c894d3db344c99ef40fa5cf7';
const IMAGES_PER_PAGE = 40;

const searchParams = new URLSearchParams({
  key: API_KEY,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: IMAGES_PER_PAGE,
});

let searchUrl = '';
let currentPage = 1;
let numberOfPages = 0;
let arrayOfImages = {};

export { currentPage };

// Function expression to handle submit user query

const handleSubmit = event => {
  event.preventDefault();

  const {
    elements: { searchQuery },
  } = event.currentTarget;

  searchQueryCleared = searchQuery.value.trim();

  btnLoadMore.style.display = 'none';
  gallery.innerHTML = '';

  currentPage = 1;
  searchParams.set('q', searchQueryCleared);
  searchParams.set('page', currentPage);

  searchUrl = `${BASE_URL}?${searchParams}`;
  console.log(searchUrl);
  const getFirstPageOfImages = () => axios.get(searchUrl);

  getFirstPageOfImages()
    .then(({ data }) => {
      const numberOfImages = data.totalHits;
      numberOfPages = Math.ceil(numberOfImages / IMAGES_PER_PAGE);
      arrayOfImages = data.hits;
      renderImages(numberOfPages, arrayOfImages);
    })
    .catch(console.warn);
};

// Function expression to handle click on load more button

const handleLoadMore = () => {
  currentPage += 1;
  searchParams.set('page', currentPage);

  searchUrl = `${BASE_URL}?${searchParams}`;

  const getNextPageOfImages = () => axios.get(searchUrl);
  getNextPageOfImages()
    .then(({ data }) => {
      arrayOfImages = data.hits;
      renderImages(numberOfPages, arrayOfImages);
      if (currentPage === numberOfPages) {
        btnLoadMore.style.display = 'none';
        Notify.info(
          `We're sorry, but you've reached the end of search results.`
        );
      }
    })
    .catch(console.warn);
};

form.addEventListener('submit', handleSubmit);
btnLoadMore.addEventListener('click', handleLoadMore);
