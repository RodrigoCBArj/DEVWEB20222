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
    const emailValue = email.value;
    const passValue = password.value;

    if (emailValue === "") {
        setErrorFor(email, "É obrigatório informar seu email");
    } else if (!checkEmail(emailValue)) {
        setErrorFor(email, "Insira um email válido");
    } else {
        setOkFor(email);
    }

    if (passValue === "") {
        setErrorFor(password, "É obrigatório definir uma senha");
    } else if (passValue.length < 6) {
        setErrorFor(password, "Senha inválida");
    } else {
        setOkFor(password);
    }

    const formControls = form.querySelectorAll(".form-control");

    const formIsValid = [...formControls].every((formControl) => {
        return formControl.className === "form-control ok";
    });

    if (formIsValid) {
        checkUser = verifyAndSignInIfUserExist(emailValue, passValue);

        if (checkUser) {
            window.location.href = "../Core/index.html";
        } else {
            setErrorFor(password, "Email e/ou senha inválidos");
        }
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

function setOkFor(input) {
    const formControl = input.parentElement;

    // adiciona classe de sucesso:
    formControl.className = "form-control ok";
}

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
}

function verifyAndSignInIfUserExist(email, password) {
    userObject = JSON.parse(localStorage.getItem(email));
    
console.log(userObject)
console.log(userObject.password)

    if (userObject === null) {
        return false;
    } else if (userObject.password !== password){
        return false;
    } else {
        sessionStorage.setItem("loggedUser", JSON.stringify(userObject));
        return true;
    }
}