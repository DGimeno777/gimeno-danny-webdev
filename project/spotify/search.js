(function (app) {

    app.get("/artist", function (query) {
        $http.get(baseUrl + '/artists/' + encodeURIComponent(artistid), {
            headers: {
                'Authorization': 'Bearer ' + Auth.getAccessToken()
            }
        })
        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: query,
                type: 'artist'
            },
            success: function (response) {
                resultsPlaceholder.innerHTML = template(response);
            }
        })
    });

})();
