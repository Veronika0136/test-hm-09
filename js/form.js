const formData = {
  email: '',
  message: '',
};

const stKey = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
};

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
  const body = localStorage.getItem(key);
  try {
    const data = JSON.parse(body);
    return data;
  } catch {
    return body;
  }
}

refs.form.addEventListener('input', e => {
  const email = e.currentTarget.elements.email.value;
  const message = e.currentTarget.elements.message.value;
  formData.email = email;
  formData.message = message;
  saveToLS(stKey, formData);
});

function initPage() {
  const data = loadFromLS(stKey);
  refs.form.elements.email.value = data?.email || '';
  refs.form.elements.message.value = data?.message || '';
  formData.email = data?.email || '';
  formData.message = data?.message || '';
}

initPage();


refs.form.addEventListener('submit', e => {
  e.preventDefault();

  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
  } else {
    console.log(formData);
    localStorage.removeItem(stKey);
    e.target.reset();
    formData.email = '';
    formData.message = '';
}
});
