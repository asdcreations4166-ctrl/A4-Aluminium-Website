// Ultra script: handle form submission and misc UX for ultra page
document.addEventListener('DOMContentLoaded', function () {
    const luxuryForm = document.getElementById('luxuryContactForm');
    if (luxuryForm) {
        luxuryForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const resultDiv = document.getElementById('luxuryResult');
            const submitBtn = luxuryForm.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;
            if (resultDiv) {
                resultDiv.className = 'alert d-none';
                resultDiv.innerText = '';
                resultDiv.setAttribute('aria-hidden', 'true');
            }

            const formData = new FormData(luxuryForm);
            if (resultDiv) {
                resultDiv.className = 'alert alert-info';
                resultDiv.innerText = 'Sending inquiry…';
                resultDiv.classList.remove('d-none');
                resultDiv.setAttribute('aria-hidden', 'false');
            }

            try {
                const response = await fetch(luxuryForm.action, {
                    method: 'POST',
                    body: formData,
                    mode: 'cors',
                    headers: { 'Accept': 'application/json' }
                });
                let data = null;
                try { data = await response.json(); } catch (err) { /* ignore */ }

                const dataHasSuccess = data && (Object.prototype.hasOwnProperty.call(data, 'success') || Object.prototype.hasOwnProperty.call(data, 'status'));
                const successFlag = response.ok && (!dataHasSuccess || data.success === true || data.success === 'true' || data.status === 'success' || data.result === 'success');

                if (successFlag) {
                    if (resultDiv) {
                        resultDiv.className = 'alert alert-success';
                        if (data && typeof data.message === 'string' && data.message.trim().length > 0) {
                            resultDiv.innerText = data.message;
                        } else {
                            resultDiv.innerText = 'Thanks! Your inquiry has been submitted.';
                        }
                        resultDiv.classList.remove('d-none');
                    } else {
                        alert('Thanks! Your inquiry has been submitted.');
                    }
                    luxuryForm.reset();
                    const redirectInput = luxuryForm.querySelector('input[name="redirect"]');
                    if (redirectInput && redirectInput.value) setTimeout(() => { window.location.href = redirectInput.value; }, 1200);
                } else {
                    const errMsg = (data && data.message) ? data.message : 'An error occurred while sending your inquiry. Please try again.';
                    if (resultDiv) {
                        resultDiv.className = 'alert alert-danger';
                        resultDiv.innerText = errMsg;
                        resultDiv.classList.remove('d-none');
                    } else {
                        alert(errMsg);
                    }
                }
            } catch (err) {
                console.error('Luxury contact submit error', err);
                if (resultDiv) {
                    resultDiv.className = 'alert alert-danger';
                    resultDiv.innerText = 'Connection error. Please try again later.';
                    resultDiv.classList.remove('d-none');
                } else {
                    alert('Connection error. Please try again later.');
                }
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }
});