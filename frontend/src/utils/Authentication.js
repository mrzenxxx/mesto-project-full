class Authentication {
    constructor({address, headers}) {
        this._address = address;
        this._headers = headers;
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();//разбирает ответ как JSON;
        }
        return Promise.reject(`Error ${res.status}`);
    }

    addNewUser(item) {
        return fetch(`${this._address}/signup`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(item),
        }).then(this._getResponse);
    }

    loginUser(item) {
        return fetch(`${this._address}/signin`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(item),
        }).then(this._getResponse);
    }

    checkToken(token) {
        return fetch(`${this._address}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(this._getResponse);
    }
}

const authentication = new Authentication({
    address: 'https://api.domainname.kmariasha.nomoredomains.sbs',
    headers: {
        "Content-Type":
            "application/json",
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBiMjJhM2IyYmZlODU1ODE3NjNmYTEiLCJpYXQiOjE2NjE2NzYwNTQsImV4cCI6NjY2NjY5OTk5OX0.oVM0YOHw7dTM54Mt4yPctmggonwM6jXpGRT6xfaX9Wo",
    }
});

export default authentication;
