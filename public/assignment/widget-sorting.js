(function () {

    $(init);

    function init() {
        var widgets = $("#djg-widget-ul");

        var startIndex = -1;

        widgets.sortable({
            start: function (event, ui) {
                startIndex = $(ui.item).index();
            },
            
            stop: function (event, ui) {
                console.log(event);
                //$http.put("/api/widget?startIndex="+startIndex+"&stopIndex="+$(ui.item).index())
            }
        });
    }
})();