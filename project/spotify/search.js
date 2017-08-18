(function (app) {

    app.get("/artist", function (query) {
        $http.get(baseUrl + '/artists/' + encodeURIComponent(query), {
            headers: {
                'Authorization': 'Bearer ' + Auth.getAccessToken()
            }
        });
    });

    app.get("/artistId", function (query) {
        $http.get(baseUrl + '/artists/' + encodeURIComponent(query), {
            headers: {
                'Authorization': 'Bearer ' + Auth.getAccessToken()
            }
        })
    })

})();
