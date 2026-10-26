'use strict';

// Front-end demo only. Real OTPs must be generated, delivered, and verified by a server.
const DEMO_CODE = '1524';
const RESEND_COOLDOWN_SECONDS = 25;

const inputs = [...document.querySelectorAll('.otp-input')];
const form = document.getElementById('otp-form');
const verifyWrapper = document.getElementById('verify-wrapper');
const resendButton = document.getElementById('resend-button');
const feedback = document.getElementById('feedback');
const inputGroup = document.querySelector('.otp-inputs');
let cooldownInterval = null;

function setFeedback(message = '', type = 'info') {
  feedback.textContent = message;
  feedback.className = 'feedback' + (message ? ` ${type}` : '');
}

function updateBoxes() {
  for (const input of inputs) {
    input.classList.toggle('filled', input.value !== '');
  }
  const isComplete = inputs.every(input => /^\d$/.test(input.value));
  verifyWrapper.classList.toggle('visible', isComplete);
  return isComplete;
}

function putDigits(start, value) {
  const digits = String(value).replace(/\D/g, '').slice(0, inputs.length - start);
  if (!digits) return;
  for (let offset = 0; offset < digits.length; offset += 1) {
    inputs[start + offset].value = digits[offset];
  }
  updateBoxes();
  const target = Math.min(start + digits.length, inputs.length - 1);
  inputs[target].focus();
}

inputs.forEach((input, index) => {
  input.addEventListener('input', (event) => {
    setFeedback('');
    const entered = event.target.value.replace(/\D/g, '');
    if (!entered) {
      input.value = '';
      updateBoxes();
      return;
    }
    input.value = '';
    putDigits(index, entered);
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
      event.preventDefault();
      if (input.value) input.value = '';
      else if (index > 0) {
        inputs[index - 1].value = '';
        inputs[index - 1].focus();
      }
      updateBoxes();
      setFeedback('');
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault(); inputs[index - 1].focus();
    } else if (event.key === 'ArrowRight' && index < inputs.length - 1) {
      event.preventDefault(); inputs[index + 1].focus();
    }
  });

  input.addEventListener('paste', (event) => {
    event.preventDefault();
    const text = event.clipboardData?.getData('text') || '';
    setFeedback('');
    putDigits(index, text);
  });

  input.addEventListener('focus', () => input.select());
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!updateBoxes()) {
    setFeedback('Please enter all four digits.', 'error');
    inputs.find(input => !input.value)?.focus();
    return;
  }
  const code = inputs.map(input => input.value).join('');
  if (code === DEMO_CODE) {
    setFeedback('Demo verification successful! No server was contacted.', 'success');
  } else {
    setFeedback('Incorrect demo code. Try 1524.', 'error');
    inputGroup.classList.remove('shake');
    void inputGroup.offsetWidth; // Restart a brief error animation.
    inputGroup.classList.add('shake');
  }
});

resendButton.addEventListener('click', () => {
  if (cooldownInterval !== null) return;
  inputs.forEach(input => { input.value = ''; });
  updateBoxes();
  inputs[0].focus();
  setFeedback('Demo code reset to 1524. No SMS was sent.', 'info');
  let secondsLeft = RESEND_COOLDOWN_SECONDS;
  resendButton.disabled = true;
  resendButton.textContent = `Resend in ${secondsLeft}s`;
  cooldownInterval = window.setInterval(() => {
    secondsLeft -= 1;
    if (secondsLeft <= 0) {
      window.clearInterval(cooldownInterval);
      cooldownInterval = null;
      resendButton.disabled = false;
      resendButton.textContent = 'Resend OTP';
    } else {
      resendButton.textContent = `Resend in ${secondsLeft}s`;
    }
  }, 1000);
});

// Add ?demo=1 to the URL to prefill "15" as shown in the reference screenshot.
if (new URLSearchParams(window.location.search).get('demo') === '1') {
  inputs[0].value = '1';
  inputs[1].value = '5';
  updateBoxes();
  inputs[2].focus();
}
