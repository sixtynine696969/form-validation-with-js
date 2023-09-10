const email = document.getElementById('email');
const emailError = document.querySelector('#email + span.error');

const ZIP = document.getElementById('zip');
const ZIPError = document.querySelector('#zip + span.error');

const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const password = document.getElementById('password');
const passwordError = document.querySelector('#password + span.error');

const passwordConfirmation = document.getElementById('password-confirmation');
const passwordConfirmationError = document.querySelector('#password-confirmation + span.error');

const form = document.querySelector('form');

const ZIPconstraints = {
    it: {
        placeholder: "00144",
        regex: "^\\d{5}$",
        message: "ZIP code must have exactly 5 digits.",
    },
    gr: {
        placeholder: "151 24",
        regex: "^\\d{3}\\s{0,1}\\d{2}$",
        message: "ZIP code must have exactly 5 digits with space between 3rd and 4th digit."

    },
    be: {
        placeholder: "5310",
        regex: "^\\d{4}$",
        message: "ZIP code must have exactly 4 digits."
    },
    at: {
        placeholder: "1999",
        regex: "^\\d{4}$",
        message: "ZIP code must have exactly 4 digits."
    },
}

let country = document.getElementById('country')
let countryCode = country.value;

function validateEmail() {
    const isValid = emailRegExp.test(email.value);
    let errorMessage;

    if (email.value.length === 0) {
        errorMessage = "Email field cannot be empty.";
    } else if (!isValid) {
        errorMessage = 'Invalid email address'
    }

    if (!isValid) {
        email.classList.add('invalid')

        emailError.textContent = errorMessage;
        emailError.classList.add('active');
    } else {
        email.classList.remove('invalid');

        emailError.classList.remove('active');
        emailError.textContent = '';
    }
}

function updateZIPPlaceholder() {
    {
        countryCode = document.getElementById('country').value;
    
        document.querySelector('#zip').setAttribute('placeholder', ZIPconstraints[countryCode]['placeholder']);
    }
}

function validateZIP() {
    const regex = new RegExp(ZIPconstraints[countryCode]['regex']);

    const isValid = regex.test(ZIP.value)
    if (ZIP.value.length === 0) {
        errorMessage = "ZIP code field cannot be empty.";
    } else if (!isValid) {
        errorMessage = ZIPconstraints[countryCode]['message'];
    }

    if (!isValid) {
        ZIP.classList.add('invalid')
        
        ZIPError.textContent = errorMessage;
        ZIPError.classList.add('active');
    } else {
        ZIP.classList.remove('invalid');

        ZIPError.classList.remove('active');
        ZIPError.textContent = '';
    }
}

function validatePasswords() {

    let errorMessage;

    if (password.value.length === 0) {
        errorMessage = 'Password field cannot be empty';
    } else if (passwordConfirmation.value !== password.value) {
        errorMessage = 'Passwords do not match.';
    }

    if (passwordConfirmation.value !== password.value || password.value.length === 0) {
        passwordConfirmation.classList.add('invalid');
        passwordConfirmationError.textContent = errorMessage;
        passwordConfirmationError.classList.add('active');

        password.classList.add('invalid');
        passwordError.textContent = errorMessage;
        passwordError.classList.add('active');
    } else {
        passwordConfirmation.classList.remove('invalid');
        passwordConfirmationError.textContent = '';
        passwordConfirmationError.classList.remove('active');

        password.classList.remove('invalid');
        passwordError.textContent = '';
        passwordError.classList.remove('active');
    }
}

function validateForm() {
    validateEmail();
    validateZIP();
    validatePasswords();
}

(function init() {
    email.oninput = validateEmail;
    email.onfocus = validateEmail;

    country.onchange = updateZIPPlaceholder;

    ZIP.oninput = validateZIP;
    ZIP.onfocus = validateZIP;

    password.oninput = validatePasswords;
    password.onfocus = validatePasswords;
    passwordConfirmation.oninput = validatePasswords;
    passwordConfirmation.onfocus = validatePasswords;

    updateZIPPlaceholder() // run at least once
})();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    validateForm();
})