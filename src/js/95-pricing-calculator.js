/* 95-pricing-calculator.js — client-side device bundle estimate. */
(function (STC) {
  'use strict';

  function init() {
    STC.util.$$('[data-pricing-calculator]').forEach(function (calculator) {
      var devices = STC.util.$('[data-device-count]', calculator);
      var bundle = STC.util.$('[data-bundle-choice]', calculator);
      var retention = STC.util.$('[data-retention-choice]', calculator);
      var retentionField = STC.util.$('[data-retention-field]', calculator);
      var output = STC.util.$('[data-price-output]', calculator);
      var detail = STC.util.$('[data-price-detail]', calculator);
      var ready = calculator.getAttribute('data-retention-ready') === 'true';
      var money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

      function update() {
        var count = Number(devices.value);
        var option = bundle.options[bundle.selectedIndex];
        var isComplete = bundle.value === 'complete';
        var perDevice = Number(option.getAttribute('data-rate'));
        var retentionRate = retention && retention.value !== '' ? Number(retention.value) : null;

        retentionField.hidden = !isComplete;
        if (!Number.isInteger(count) || count < 1) {
          output.textContent = '$0';
          detail.textContent = 'Enter at least one device to calculate an estimate.';
          return;
        }

        if (isComplete && ready && retentionRate === null) {
          output.textContent = 'Choose retention';
          detail.textContent = 'Select a log-retention option to calculate your Complete estimate.';
          return;
        }

        var monthly = count * (perDevice + (isComplete && retentionRate !== null ? retentionRate : 0));
        output.textContent = money.format(monthly) + (isComplete && !ready ? '+' : '');
        if (isComplete && ready) {
          detail.textContent = count + ' devices × $' + (perDevice + retentionRate) + ' per device/month, including log retention';
        } else if (isComplete) {
          detail.textContent = count + ' devices × $' + perDevice + ' per device/month starting price; final price depends on log retention';
        } else {
          detail.textContent = count + ' devices × $' + perDevice + ' per device/month';
        }
      }

      devices.addEventListener('input', update);
      bundle.addEventListener('change', update);
      if (retention) retention.addEventListener('change', update);
      update();
    });
  }

  STC.pricingCalculator = { init: init };
})(window.STC = window.STC || {});
