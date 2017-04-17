function App() {
    var self = this;

    var tokenKey = 'accessToken';

    self.errors = [];

    function showError(jqXHR) {

        $('#result').val(jqXHR.status + ': ' + jqXHR.statusText);

        var response = jqXHR.responseJSON;
        if (response) {
            if (response.Message) self.errors.push(response.Message);
            if (response.ModelState) {
                var modelState = response.ModelState;
                for (var prop in modelState) {
                    if (modelState.hasOwnProperty(prop)) {
                        var msgArr = modelState[prop]; // expect array here
                        if (msgArr.length) {
                            for (var i = 0; i < msgArr.length; ++i) self.errors.push(msgArr[i]);
                        }
                    }
                }
            }
            if (response.error) self.errors.push(response.error);
            if (response.error_description) self.errors.push(response.error_description);

            $(self.errors, function (index, error) {
                $('#errors').append('<p>' + error + '</p>');
            });
        }
    }

    self.callApi = function () {
        $('#result').val('');
        self.errors = [];
        $('#errors').html('');

        var token = sessionStorage.getItem(tokenKey);
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        $.ajax({
            type: 'GET',
            url: '/api/User/GenerateToken',
            headers: headers
        }).done(function (data) {
            $('#result').val(data);
        }).fail(showError);
    }

    self.register = function () {
        $('#result').val('');
        self.errors = [];
        $('#errors').html('');

        var data = {
            Tenant: $('#registerTenant').val(),
            Email: $('#registerEmail').val(),
            Password: $('#registerPassword').val(),
            ConfirmPassword: $('#registerPassword2').val()
        };

        $.ajax({
            type: 'POST',
            url: '/api/Account/Register',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function (data) {
            $('#result').val("Done!");
        }).fail(showError);
    }

    self.login = function () {
        $('#result').val('');
        self.errors = [];
        $('#errors').html('');

        var loginData = {
            grant_type: 'password',
            tenant: $('#loginTenant').val(),
            username: $('#loginEmail').val(),
            password: $('#loginPassword').val()
        };

        $.ajax({
            type: 'POST',
            url: '/Token',
            data: loginData
        }).done(function (data) {
            $('#user').val(data.userName);
            // Cache the access token in session storage.
            sessionStorage.setItem(tokenKey, data.access_token);
        }).fail(showError);
    }

    self.logout = function () {
        // Log out from the cookie based logon.
        var token = sessionStorage.getItem(tokenKey);
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        $.ajax({
            type: 'POST',
            url: '/api/Account/Logout',
            headers: headers
        }).done(function (data) {
            // Successfully logged out. Delete the token.
            $('#user').val('');
            sessionStorage.removeItem(tokenKey);
        }).fail(showError);
    }
}