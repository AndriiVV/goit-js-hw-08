import throttle from 'lodash.throttle';
const refs = {
  form: document.querySelector('.feedback-form'),
};

const STORAGE_KEY = 'feedback-form-state';

const populateForm = () => {
  try {
    const storedForm = JSON.parse(localStorage.getItem(STORAGE_KEY));
    refs.form.email.value = storedForm.email;
    refs.form.message.value = storedForm.message;
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
};

populateForm();

const handleInput = event => {
  const {
    elements: { email, message },
  } = refs.form;

  localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: email.value, message: message.value }));
};

refs.form.addEventListener('input', throttle(handleInput, 500));

const handleSubmit = event => {
  event.preventDefault();

  const {
    elements: { email, message },
  } = event.currentTarget;

  if (email.value === '' || message.value === '') return alert('Please fill all required fields');

  const data = new FormData(event.currentTarget);
  console.log(Object.fromEntries(data.entries()));

  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
};

refs.form.addEventListener('submit', handleSubmit);
