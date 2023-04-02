// Function to fetch images from pixabay API
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { markupImageCard } from './create-image-cards';
import { btnLoadMore } from '../index';
import { searchParams } from '../index';
import { currentPage } from '../index';

// let currentPage = 1;

export const fetchImages = (numberOfPages, array) => {
  switch (numberOfPages) {
    case 0:
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      break;
    case 1:
      markupImageCard(array);
      break;
    default:
      markupImageCard(array);
      //   console.log(currentPage);
      btnLoadMore.removeAttribute('hidden');
  }
};
