// Function to fetch images from pixabay API
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { markupImageCard } from './create-image-cards';
import { btnLoadMore } from '../index';
import { searchParams } from '../index';
import { currentPage } from '../index';

// let currentPage = 1;

export const fetchImages = searchUrl => {
  const getImages = () => axios.get(searchUrl);

  getImages()
    .then(({ data }) => {
      console.log(data);

      const numberOfImages = data.totalHits;
      const numberOfPages = Math.ceil(numberOfImages / 40);
      console.log(numberOfImages);
      console.log(numberOfPages);
      const imageArray = data.hits;

      switch (numberOfPages) {
        case 0:
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          break;
        case 1:
          markupImageCard(imageArray);
          break;
        default:
          markupImageCard(imageArray);
          console.log(currentPage);
          currentPage = 2;
          console.log(currentPage);
          searchParams.set('page', currentPage);
          console.log(searchParams.page);
          btnLoadMore.removeAttribute('hidden');
      }
    })
    .catch(console.warn);
};
