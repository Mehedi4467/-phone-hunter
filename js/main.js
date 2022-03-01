// load phone data from api

const loadPhoneApi = (inputValue) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
        .then(res => res.json())
        .then(data => displayPhoneData(data));
};

//display phone data
const displayPhoneData = (phoneData) => {
    const displayPhone = document.getElementById('display-phone');
    displayPhone.textContent = '';

    if (phoneData.status === false) {
        displayHideShow('notFound', 'flex');
    } else {
        displayHideShow('notFound', 'none');
        phoneData.data.forEach(phones => {
            console.log(phones);
            const div = document.createElement('div');
            div.classList.add('col-12', 'col-md-4');
            div.innerHTML = `
            <div class="shadow-lg rounded-3 p-4">
            <div class="d-flex justify-content-center align-items-center">
                <img src="${phones.image}" alt="${phones.phone_name} image">
            </div>
            <div class="text-center mt-3">
                <h3 class="text-primary">${phones.phone_name}</h3>
                <h5>Brand : <span>${phones.brand}</span></h5>
                <button class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#${phones.slug}">Details</button>
            </div>
        </div>
            `;

            displayPhone.appendChild(div);
        });

    }
    displayHideShow('spinner', 'none');
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
    displayHideShow('spinner', 'flex');
    loadPhoneApi(searchInputValue.toLowerCase());

    searchInput.value = '';


});