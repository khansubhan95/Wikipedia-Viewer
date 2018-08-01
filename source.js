function createResultMarkup(id, title) {
    return '<a href="https://en.wikipedia.org/?curid=' + id + '" target="_blank"><button" class="btn btn-primary btn-block"><b>' + title + '</b></button></a><br>';
}

function showResults(results) {
    $("#wiki-results").empty(); // remove previous results
    for (var key in results) {
        if (results.hasOwnProperty(key)) {
            $("#wiki-results").append(createResultMarkup(results[key].pageid, results[key].title));
        }
    }
}

function getList(query) {
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=" + query,
        success: function(json) {
            console.log('success');
            console.log(json.continue.gsroffset);
            showResults(json.query.pages);
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
