import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './js/fetchimages';
import { markupImageCard } from './js/create-image-cards';

const form = document.querySelector('.search-form');
const btnSubmit = document.querySelector('.btn');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

btnLoadMore.setAttribute('hidden', '');

export { gallery, btnLoadMore };

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30578820-1c894d3db344c99ef40fa5cf7';

const searchParams = new URLSearchParams({
  key: API_KEY,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 40,
});

let searchUrl = '';
let currentPage = 1;
let numberOfPages = 0;
let arrayOfImages = {};

export { searchParams };
export { currentPage };

// Function expression to handle submit user query

const handleSubmit = event => {
  event.preventDefault();

  const {
    elements: { searchQuery },
  } = event.currentTarget;

  btnLoadMore.setAttribute('hidden', '');
  gallery.innerHTML = '';

  currentPage = 1;
  searchParams.set('q', searchQuery.value);
  searchParams.set('page', currentPage);

  searchUrl = `${BASE_URL}?${searchParams}`;
  console.log(searchUrl);

  const getFirstPageOfImages = () => axios.get(searchUrl);

  getFirstPageOfImages()
    .then(({ data }) => {
      console.log(data);
      const numberOfImages = data.totalHits;
      numberOfPages = Math.ceil(numberOfImages / 40);
      console.log(numberOfImages);
      console.log(numberOfPages);
      arrayOfImages = data.hits;
      fetchImages(numberOfPages, arrayOfImages);
    })
    .catch(console.warn);
};

// Function expression to handle click on load more button

const handleLoadMore = () => {
  currentPage += 1;
  searchParams.set('page', currentPage);

  searchUrl = `${BASE_URL}?${searchParams}`;
  console.log(searchUrl);

  const getNextPageOfImages = () => axios.get(searchUrl);
  getNextPageOfImages()
    .then(({ data }) => {
      console.log(data);

      arrayOfImages = data.hits;
      fetchImages(numberOfPages, arrayOfImages);
    })
    .catch(console.warn);
};

form.addEventListener('submit', handleSubmit);

console.log(currentPage);
btnLoadMore.addEventListener('click', handleLoadMore);
