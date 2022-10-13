const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
});

function checkInputs() {
    const nameValue = username.value;
    const emailValue = email.value;
    const passValue = password.value;
    const passConfirmValue = passwordConfirmation.value;

    if (nameValue === "") {
        setErrorFor(username, "É obrigatório informar seu nome");
    } else {
        setSuccessFor(username);
    }

    if (emailValue === "") {
        setErrorFor(email, "É obrigatório informar seu email");
    } else if (!checkEmail(emailValue)) {
        setErrorFor(email, "Insira um email válido");
    } else {
        setSuccessFor(email);
    }

    if (passValue === "") {
        setErrorFor(password, "É obrigatório definir uma senha");
    } else if (passValue.length < 6) {
        setErrorFor(password, "A senha precisa ter no mínimo 6 caracteres");
    } else {
        setSuccessFor(password);
    }

    if (passConfirmValue === "") {
        setErrorFor(passwordConfirmation, "A confirmação de senha é obrigatória");
    } else if (passConfirmValue !== passValue) {
        setErrorFor(passwordConfirmation, "As senhas são diferentes");
    } else {
        setSuccessFor(passwordConfirmation);
    }

    const formControls = form.querySelectorAll(".form-control");

    const formIsValid = [...formControls].every((formControl) => {
        return formControl.className === "form-control success";
    });

    if (formIsValid) {
        saveUser(nameValue, emailValue, passValue);
    }
}

function setErrorFor(input, errorMessage) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    // adiciona mensagem de erro:
    small.innerText = errorMessage;

    // adiciona a classe de erro
    formControl.className = "form-control error";
}

function setSuccessFor(input) {
    const formControl = input.parentElement;

    // adiciona classe de sucesso:
    formControl.className = "form-control success";
}

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
}

function saveUser(name, email, password) {
    localStorage.setItem(email, 
        JSON.stringify({
            id: generateId(),
            name,
            email,
            password
        })
    );
}

function generateId() {
    return localStorage.length + 1;
}