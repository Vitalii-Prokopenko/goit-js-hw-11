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

export { searchParams };
export { currentPage };

// Function expression to handle click on load more button

const handleLoadMore = () => {
  searchUrl = `${BASE_URL}?${searchParams}`;
  console.log(searchUrl);
  fetchImages(searchUrl);
};

// Function expression to handle submit user query

const handleSubmit = event => {
  event.preventDefault();

  const {
    elements: { searchQuery },
  } = event.currentTarget;

  gallery.innerHTML = '';

  searchParams.set('q', searchQuery.value);

  searchUrl = `${BASE_URL}?${searchParams}`;
  console.log(searchUrl);
  fetchImages(searchUrl);
};

form.addEventListener('submit', handleSubmit);
btnLoadMore.addEventListener('click', handleLoadMore);

// export { currentPage };
