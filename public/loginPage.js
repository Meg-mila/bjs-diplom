"use strict"

const newUserForm = new UserForm();

newUserForm.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } else {
            newUserForm.setLoginErrorMessage(response.error);
        }
    })
}

newUserForm.registerFormCallback = data => {
    ApiConnector.register(data, response => {
       if (response.success) {
           location.reload();
       } else {
           newUserForm.setRegisterErrorMessage(response.error);
       }
    })
}
