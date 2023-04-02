import axios from 'axios';

const refs = {
  form: document.querySelector('.search-form'),
  btn: document.querySelector('.btn'),
};

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30578820-1c894d3db344c99ef40fa5cf7';

// Function expression to handle submit user query

const handleSubmit = event => {
  event.preventDefault();

  const {
    elements: { searchQuery },
  } = event.currentTarget;

  console.log(searchQuery.value);

  const searchParams = new URLSearchParams({
    _key: API_KEY,
    _q: searchQuery.value,
    _image_type: 'photo',
    _orientation: 'horizontal',
    _safesearch: true,
    _page: 1,
    _per_page: 40,
  });

  const searchUrl = `${BASE_URL}?${searchParams}`;
  console.log(searchUrl);

  const getImages = () => axios.get(searchUrl);

  getImages()
    .then(({ data }) => {
      console.log(data);
    })
    .catch(console.warn);

  // console.log(JSON.stringify(fetchOptions));

  // const getImages = () => axios.get(`${BASE_URL}`, fetchOptions);

  // getImages()
  //   .then(({ data }) => {
  //     console.log(data);
  //   })
  //   .catch(console.warn);

  // fetch(searchUrl)
  //   .then(({ data }) => {
  //     console.log(data);
  //   })
  //   .catch(console.warn);
};

refs.form.addEventListener('submit', handleSubmit);
