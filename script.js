const email = document.getElementById('email');
const emailError = document.querySelector('#email + span.error');

const ZIP = document.getElementById('zip');
const ZIPError = document.querySelector('#zip + span.error');

const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const password = document.getElementById('password');
const passwordError = document.querySelector('#password + span.error');

const passwordConfirmation = document.getElementById('password-confirmation');
const passwordConfirmationError = document.querySelector('#password-confirmation + span.error');

const ZIPconstraints = {
    it: {
        placeholder: "00144",
        regex: "^\\d{5}$",
        message: "Italy ZIP code must have exactly 5 digits.",
    },
    gr: {
        placeholder: "151 24",
        regex: "^\\d{3}\\s{0,1}\\d{2}$",
        message: "Greece ZIP code must have exactly 5 digits with space between 3rd and 4th digit."

    },
    be: {
        placeholder: "5310",
        regex: "^\\d{4}$",
        message: "Belgium ZIP code must have exactly 4 digits."
    },
    at: {
        placeholder: "1999",
        regex: "^\\d{4}$",
        message: "Austria ZIP code must have exactly 4 digits."
    },
}

let country = document.getElementById('country')
let countryCode = country.value;

function validateEmail() {
    const isValid = emailRegExp.test(email.value);
    let errorMessage;

    if (email.value.length === 0) {
        errorMessage = "Email field cannot be empty.";
    } else if (!emailRegExp.test(email.value)) {
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

    const isValid = ZIP.value.length === 0 || regex.test(ZIP.value)
    if (!isValid) {
        ZIP.classList.add('invalid')
        

        ZIPError.textContent = ZIPconstraints[countryCode]['message'];
        ZIPError.classList.add('active');
    } else {
        ZIP.classList.remove('invalid');

        ZIPError.classList.remove('active');
        ZIPError.textContent = '';
    }
}

function validatePasswords() {
    if (passwordConfirmation.value !== password.value) {
        passwordConfirmation.classList.add('invalid');
        passwordConfirmationError.textContent = 'Passwords do not match.';
        passwordConfirmationError.classList.add('active');

        password.classList.add('invalid');
        passwordError.textContent = 'Passwords do not match.';
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

email.oninput = validateEmail
email.onfocus = validateEmail

country.onchange = updateZIPPlaceholder;

ZIP.oninput = validateZIP;

passwordConfirmation.onchange = validatePasswords;
password.onchange = validatePasswords;

updateZIPPlaceholder() // run at least once