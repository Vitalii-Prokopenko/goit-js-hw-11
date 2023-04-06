// Function to fetch images from pixabay API

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { markupImageCard } from './create-image-cards';
import { btnLoadMore } from '../index';

export const renderImages = (numberOfPages, array) => {
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
      btnLoadMore.style.display = 'flex';
  }
};
