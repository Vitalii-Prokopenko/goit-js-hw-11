// Function to create image cards for gallery
import { gallery } from '../index';

const markupImageCard = images => {
  let markup = '';
  images.forEach(image => {
    markup += `        
        <div class="photo-card">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b> ${image.likes}
          </p>
          <p class="info-item">
            <b>Views</b> ${image.views}
          </p>
          <p class="info-item">
            <b>Comments</b> ${image.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b> ${image.downloads}
          </p>
        </div>
      </div>`;
  });
  gallery.insertAdjacentHTML('afterbegin', markup);
};

export { markupImageCard };
