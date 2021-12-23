const _ = require('lodash');
const refs = {
  form: document.querySelector('.feedback-form'),
};

const populateForm = () => {
  const storedForm = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (storedForm) {
    refs.form.email.value = storedForm.email;
    refs.form.message.value = storedForm.message;
  }
};

populateForm();

const handleInput = event => {
  const {
    elements: { email, message },
  } = refs.form;

  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({ email: email.value, message: message.value }),
  );
};

refs.form.addEventListener('input', _.throttle(handleInput, 500));

const handleSubmit = event => {
  event.preventDefault();

  const {
    elements: { email, message },
  } = event.currentTarget;

  if (email.value === '' || message.value === '') return alert('Please fill all required fields');

  const data = new FormData(event.currentTarget);
  console.log(Object.fromEntries(data.entries()));

  localStorage.removeItem('feedback-form-state');
  event.currentTarget.reset();
};

refs.form.addEventListener('submit', handleSubmit);
