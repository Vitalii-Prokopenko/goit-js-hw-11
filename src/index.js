import axios from 'axios';

const refs = {
  form: document.querySelector('.search-form'),
  btn: document.querySelector('.btn'),
};

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30578820-1c894d3db344c99ef40fa5cf7';

const fetchOptions = {
  key: API_KEY,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

// Function expression to handle submit user query

const handleSubmit = event => {
  event.preventDefault();

  const {
    elements: { searchQuery },
  } = event.currentTarget;

  console.log(searchQuery.value);
  fetchOptions.q = searchQuery.value;
  console.log(fetchOptions);
  console.log(JSON.stringify(fetchOptions));

  const getImages = () => axios.get(`${BASE_URL}`, fetchOptions);

  getImages()
    .then(({ data }) => {
      console.log(data);
    })
    .catch(console.warn);

  //   fetch(`https://pixabay.com/api/${JSON.stringify(fetchOptions)}`)
  //     .then(response => response.json())
  //     .then(images => console.log(images))
  //     .catch(error => console.log(error));
};

refs.form.addEventListener('submit', handleSubmit);
