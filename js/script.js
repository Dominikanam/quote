var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getQuote() {
	toggleLoader(true);
    fetch(quoteUrl, { cache: "no-store" })
        .then(function(resp) {
            return resp.json();
        })
		.then(createTweet)
		.catch(function() {
			toggleLoader(false);
		});
}

function createTweet(input) {
	toggleLoader(false);
    var data = input[0];

    var dataElement = document.createElement('div');
    dataElement.innerHTML = data.content;
    var quoteText = dataElement.innerText.trim();
    var quoteAuthor = data.title;

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
	}

	var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

	if (tweetText.length > 140) {
		getQuote();
	} else {
		var tweet = tweetLink + encodeURIComponent(tweetText);
		document.querySelector('.quote').innerText = quoteText;
		document.querySelector('.author').innerText = "Author: " + quoteAuthor;
		document.querySelector('.tweet').setAttribute('href', tweet);
	}
	document.querySelector('.tweet').setAttribute('href', tweet);
}

function toggleLoader(show) {
	var loader = document.getElementById('loader');
	loader.classList.toggle('hide', !show);
}

document.addEventListener('DOMContentLoaded', function() {
    getQuote();
    document.querySelector('.trigger').addEventListener('click', function() {
        getQuote();
    });
});