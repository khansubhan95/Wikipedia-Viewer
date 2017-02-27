var opening = '<a href="';
var wikipediaId = "https://en.wikipedia.org/?curid=";
var closing = '" target="_blank"><button" class="btn btn-primary btn-block">';
var finalClosing = '</button></a><br>';

function getList(query) {
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=" + query,
        success: function(json) {
            console.log('success');
            console.log(json.continue.gsroffset);
            var results = json.query.pages;
            for (var key in results) {
                if (results.hasOwnProperty(key)) {
                    $("#wiki-results").append(opening + wikipediaId + results[key].pageid + closing + '<b>' + results[key].title + '</b>' + finalClosing);
                }
            }

        },
        error: function(errorMessage) {
            console.log('error');
        },
        dataType: "json"
    });
}

$(document).ready(function() {
    $("#random-article").on("click", function() {
        window.open('https://en.wikipedia.org/wiki/Special:Random');
    });

    $("#submit-btn").on("click", function(event) {
        event.preventDefault();
        var value = $("#search-box").val();
        if (value === '') {
            alert("enter something into searchbox");
        } else {
            getList(value);
        }
    });
});
