'use strict';

const quoteForm = document.getElementById('quoteForm');
const quoteStatus = document.getElementById('quoteStatus');
const submitButton = quoteForm.querySelector('button[type="submit"]');

quoteForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  if (submitButton.disabled) return;

  const fields = new URLSearchParams(new FormData(quoteForm));
  submitButton.disabled = true;
  quoteStatus.classList.remove('is-error');
  quoteStatus.textContent = 'Sending your enquiry…';

  try {
    const response = await fetch(quoteForm.action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: fields
    });
    const result = await response.json();
    const sent = response.ok && result.ok === true;
    quoteStatus.textContent = result.message;
    quoteStatus.classList.toggle('is-error', !sent);
    if (sent) quoteForm.reset();
  } catch {
    quoteStatus.classList.add('is-error');
    quoteStatus.textContent = 'We could not confirm delivery. Please email info@azagroup.co.tz or call 0624 105 850.';
  } finally {
    submitButton.disabled = false;
  }
});
