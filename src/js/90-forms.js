/* 90-forms.js — front-end validation for demo/contact forms. Does not submit
   (data-endpoint="TODO" marks where to wire a real backend). */
(function (STC) {
  'use strict';

  function init() {
    STC.util.$$('form[data-validate]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validate(form)) showSuccess(form);
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

  function showSuccess(form) {
    var success = form.querySelector('[data-success]') || document.createElement('div');
    success.setAttribute('data-success', '');
    success.className = 'form__success';
    success.textContent = 'Thanks, your request has been recorded. A solutions engineer will be in touch shortly.';
    form.reset();
    var first = form.firstElementChild;
    if (first) form.insertBefore(success, first);
    else form.appendChild(success);
  }

  STC.forms = { init: init };
})(window.STC = window.STC || {});
