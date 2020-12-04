"use strict"

//Выход из личного кабинета
const newLogoutButton = new LogoutButton();

newLogoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    });
}
//Получение информации о пользователе
ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const newRatesBoard = new RatesBoard();

//Получение текущих курсов валюты
function getCourse() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            newRatesBoard.clearTable();
            newRatesBoard.fillTable(response.data);
        }
    });
}

setInterval(getCourse, 60000);

//Операции с деньгами
const newMoneyManager = new MoneyManager();

newMoneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            newMoneyManager.setMessage(response.success, "Счет пополнен.");
        } else {
            newMoneyManager.setMessage(response.success, response.error);
        }
    });
}

newMoneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            newMoneyManager.setMessage(response.success, "Валюта конвертирована.");
        } else {
            newMoneyManager.setMessage(response.success, response.error);
        }
    });
}

newMoneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            newMoneyManager.setMessage(response.success, "Денежные средства отправлены.");
        } else {
            newMoneyManager.setMessage(response.success, response.error);
        }
    });
}

//Работа с избранным
const newFavoritesWidget = new FavoritesWidget();

const getFavorites = () => {
    ApiConnector.getFavorites(response => {
        if (response.success) {
            newFavoritesWidget.clearTable();
            newFavoritesWidget.fillTable(response.data);
            newMoneyManager.updateUsersList(response.data);
        }
    });
}
getFavorites();

newFavoritesWidget.addUserCallback  = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            getFavorites();
            newMoneyManager.setMessage(response.success, "Пользователь добавлен в список избранного");
        } else {
            newMoneyManager.setMessage(response.success, response.error);
        }
    });
}

newFavoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            getFavorites();
            newMoneyManager.setMessage(response.success, "Пользователь удален из списка избранного");
        } else {
            newMoneyManager.setMessage(response.success, response.error);
        }
    });
}
