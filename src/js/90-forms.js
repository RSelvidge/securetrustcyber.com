/* 90-forms.js: validates contact forms, then posts them to the endpoint in
   data-endpoint (Web3Forms), which emails the submission to the sales inbox. */
(function (STC) {
  'use strict';

  function init() {
    STC.util.$$('form[data-validate]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validate(form)) send(form);
      });
    });
  }

  function validate(form) {
    var valid = true;
    STC.util.$$('.field', form).forEach(function (field) {
      var input = STC.util.$('input,select,textarea', field);
      if (!input) return;
      var error = STC.util.$('.field__error', field);
      var msg = '';
      if (input.hasAttribute('required') && !input.value.trim()) {
        msg = 'This field is required.';
      } else if (input.type === 'email' && input.value.trim() &&
                 !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        msg = 'Enter a valid email address.';
      }
      field.classList.toggle('field--invalid', !!msg);
      if (error) error.hidden = !msg;
      if (error && msg) error.textContent = msg;
      if (msg) valid = false;
    });
    return valid;
  }

  function send(form) {
    var button = form.querySelector('[type="submit"]');
    var label = button ? button.textContent : '';
    var key = form.elements.access_key && form.elements.access_key.value;
    if (!key) {
      notice(form, 'error', 'Our form is being set up. Please email us directly and we will get back to you within one business day.');
      return;
    }
    if (button) { button.disabled = true; button.textContent = 'Sending…'; }

    fetch(form.getAttribute('data-endpoint'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return r.ok && d.success !== false; }); })
      .catch(function () { return false; })
      .then(function (ok) {
        if (button) { button.disabled = false; button.textContent = label; }
        if (ok) {
          form.reset();
          notice(form, 'success', 'Thanks, your request is in. A member of our team will be in touch within one business day.');
        } else {
          notice(form, 'error', 'Sorry, your request could not be sent. Please try again, or email us directly.');
        }
      });
  }

  function notice(form, kind, text) {
    var box = form.querySelector('[data-form-notice]') || document.createElement('div');
    box.setAttribute('data-form-notice', '');
    box.setAttribute('role', kind === 'error' ? 'alert' : 'status');
    box.className = kind === 'error' ? 'form__error' : 'form__success';
    box.textContent = text;
    var email = form.getAttribute('data-email');
    if (kind === 'error' && email) {
      var a = document.createElement('a');
      a.href = 'mailto:' + email;
      a.textContent = ' ' + email;
      box.appendChild(a);
    }
    if (!box.parentNode) form.insertBefore(box, form.firstElementChild);
    box.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  STC.forms = { init: init };
})(window.STC = window.STC || {});