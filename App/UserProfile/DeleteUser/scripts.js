const form = document.getElementById("form");
const divHeader = document.getElementById("divHeader");
const inputPassword = document.getElementById("password");

const user = JSON.parse(sessionStorage.getItem("loggedUser"));
const password = user.password;
const userName = user.name;
const email = user.email;

showName(userName);

function showName(name) {
    const formControl = divHeader.parentElement;
    const h1 = formControl.querySelector("h1");
    // Substitui nome do usuario:
    h1.innerText = name;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
});

function checkInputs() {
    const passValue = inputPassword.value;

    if (passValue === "") {
        setErrorFor(inputPassword, "É obrigatório informar sua senha");
    } else if (passValue.length < 6) {
        setErrorFor(inputPassword, "Senha inválida");
    } else if (passValue !== password) {
        setErrorFor(inputPassword, "Senha incorreta");
    } else {
        setSuccessFor(inputPassword);
    }

    const formControls = form.querySelectorAll(".form-control");

    const formIsValid = [...formControls].every((formControl) => {
        return formControl.className === "form-control success";
    });

    if (formIsValid) {
        deleteUser(email);
        window.location.href = "../../../index.html";
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

function deleteUser(key) {
    // delete:
    localStorage.removeItem(key);
    sessionStorage.removeItem("loggedUser");
}