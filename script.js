const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuote = [];

// Show Loading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
function newQuote() {
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];

    // Check if Author field is blank and replace it with 'Unknown'
    if(!quote.author) {
        quote.author = 'Unknown';
    }
    else {
        authorText.textContent = quote.author;
    }  

    // Check Quote length to determine styling
    if(quote.text.length > 120) {
        quoteText.classList.add("long-text");
    }
    else {
        quoteText.classList.remove("long-text");
    }
    // Set Quote, Hide loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
    
}

// Get Quotes from API
async function getQuotes() {
    showLoadingSpinner();

    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuote = await response.json();
        newQuote();
    } catch(error){
        // Catch Error here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
