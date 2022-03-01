// load phone data from api

const loadPhoneApi = (inputValue) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
        .then(res => res.json())
        .then(data => displayPhoneData(data));
};

//display phone data
const displayPhoneData = (phoneData) => {

    if (phoneData.status === false) {
        displayHideShow('notFound', 'flex');
    } else {
        displayHideShow('notFound', 'none');
    }
};

// display hide and show style 
const displayHideShow = (divId, Style) => {
    document.getElementById(divId).style.display = Style;
};

// search button js 
const searchButton = document.getElementById('search-btn');
searchButton.addEventListener('click', () => {
    const searchInput = document.getElementById('search-input');
    const searchInputValue = searchInput.value;
    loadPhoneApi(searchInputValue.toLowerCase());

    searchInput.value = '';


});