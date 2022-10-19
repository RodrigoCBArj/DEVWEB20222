const form = document.getElementById("form");
const divHeader = document.getElementById("divHeader");
const divEmail = document.getElementById("divEmail");
const inputPassword = document.getElementById("password");
const newPassword = document.getElementById("new-password");
const passwordConfirmation = document.getElementById("password-confirmation");

const user = JSON.parse(sessionStorage.getItem("loggedUser"));
const password = user.password;
const userName = user.name;
const email = user.email;
const id = user.id;

showName(userName);
showEmail(email);

function showName(name) {
    const formControl = divHeader.parentElement;
    const h2 = formControl.querySelector("h2");
    // Substitui nome do usuario:
    h2.innerText = name;
}

function showEmail(email) {
    const formControl = divEmail.parentElement;
    const p = formControl.querySelector("p");
    // Substitui email do usuario:
    p.innerText = email;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
});

function checkInputs() {
    const passValue = inputPassword.value;
    const passNew = newPassword.value;
    const passConfirmValue = passwordConfirmation.value;

    if (passValue === "") {
        setErrorFor(inputPassword, "É obrigatório informar sua senha");
    } else if (passValue.length < 6) {
        setErrorFor(inputPassword, "Senha inválida");
    } else {
        setSuccessFor(inputPassword);
    }    

    if (passNew === "") {
        setErrorFor(newPassword, "É obrigatório informar uma nova senha");
    } else if (passNew.length < 6) {
        setErrorFor(newPassword, "Senha inválida");
    } else {
        setSuccessFor(newPassword);
    }

    if (passConfirmValue === "") {
        setErrorFor(passwordConfirmation, "A confirmação de senha é obrigatória");
    } else if (passConfirmValue !== passNew) {
        setErrorFor(passwordConfirmation, "As senhas são diferentes");
    } else {
        setSuccessFor(passwordConfirmation);
    }

    const formControls = form.querySelectorAll(".form-control");

    const formIsValid = [...formControls].every((formControl) => {
        return formControl.className === "form-control success";
    });

    if (formIsValid) {
        updateUser(email, passNew);
        window.location.href = "../Core/index.html";
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

function updateUser(key, newPassword) {
    // update:
    localStorage.setItem(key, 
        JSON.stringify({
            id,
            name: userName,
            email,
            password: newPassword
        })
    );
    sessionStorage.setItem("loggedUser", 
        JSON.stringify({
            id,
            name: userName,
            email,
            password: newPassword
        })
    );
}