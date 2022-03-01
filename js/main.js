// load phone data from api

const loadPhoneApi = (inputValue) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
        .then(res => res.json())
        .then(data => displayPhoneData(data.data.slice(0, 20), data));
};


//display phone data
const displayPhoneData = (phoneData, dataStatus) => {
    const displayPhone = document.getElementById('display-phone');
    // console.log(isTrue);
    const data = phoneData;
    console.log(phoneData);
    if (dataStatus.status === false) {
        displayHideShow('notFound', 'flex');
    } else {
        displayHideShow('notFound', 'none');
        data.forEach((phones, index) => {
            // console.log(phones);
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
                <button  class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#phone-${index+phones.brand}">Details</button>
            </div>
        </div>
            `;

            displayPhone.appendChild(div);
            singlePhoneDisplay(phones.slug, index);

        });

    }
    displayHideShow('spinner', 'none');
};


// phone details for modal

const singlePhoneDisplay = async(phoneId, index) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    const res = await fetch(url);
    const phone = await res.json();
    console.log(phone.data.others);
    const mainModal = document.getElementById('myModal');

    const div = document.createElement('div');
    div.innerHTML = `
    <div class="modal fade" id="phone-${index+phone.data.brand}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="label-${index+phone.data.brand}" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-primary" id="label-${index+phone.data.brand}">${phone.data.name} (Brand : ${phone.data.brand})</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="d-flex justify-content-center align-items-center"><img class="img-fluid" src="${phone.data.image}" alt=""></div>
                <div class="text-center my-3">
                    <h3 class="text-primary">${phone.data.name}</h3>
                   
                    <h5><span class="text-info">${phone.data.releaseDate ? phone.data.releaseDate : 'Release Date not found'}</span></h5>
                </div>
                    <hr>
                    <div class="p-4">
                        <h5 class="text-primary text-center mb-2">Sensors</h5>
                        <div id ="sensor-${index+phone.data.brand}">
                            
                        </div>
                </div>
                <div class="p-4 mt-4">
                    <h5 class="text-primary text-center mb-3">Other Features</h5>
                    <p>GPS : <span class="text-info">${phone.data.others?.GPS ? phone.data.others?.GPS : 'none'}</span> </p>
                    <p>WLAN : <span class="text-info"> ${phone.data.others?.WLAN ? phone.data.others?.WLAN : 'none'} </span> </p>
                    <p>USB: <span class="text-info"> ${phone.data.others?.USB ? phone.data.others?.USB : 'none'} </span> </p>
                    <p>Bluetooth: <span class="text-info"> ${phone.data.others?.Bluetooth ? phone.data.others?.Bluetooth : 'none'} </span> </p>
                    <p>NFC: <span class="text-info"> ${phone.data.others?.NFC ? phone.data.others?.NFC: 'none'} </span> </p>
                    <p>Radio: <span class="text-info"> ${phone.data.others?.Radio ? phone.data.others?.Radio : 'none'} </span> </p>
                </div>
              
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Buy Now</button>
            </div>
        </div>
    </div>
</div>

    `;
    mainModal.appendChild(div);
    sensorData(index + phone.data.brand, phoneId);
};

// sensor data display 
const sensorData = async(sensorId, slug) => {
    const sensorMainDiv = document.getElementById('sensor-' + sensorId);
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    const res = await fetch(url);
    const phone = await res.json();
    const phoneSensor = phone.data.mainFeatures.sensors;
    for (const sensor of phoneSensor) {
        const li = document.createElement('li');
        li.innerText = sensor;
        sensorMainDiv.appendChild(li);
    }
    // console.log(sensorMainDiv);

};


// display hide and show style 
const displayHideShow = (divId, Style) => {
    document.getElementById(divId).style.display = Style;
};

// search button js 
const searchButton = document.getElementById('search-btn');
searchButton.addEventListener('click', () => {
    // const errorMassage = document.getElementById('error');
    const searchInput = document.getElementById('search-input');
    const searchInputValue = searchInput.value;
    const displayPhoneDiv = document.getElementById('display-phone');

    if (isNaN(searchInputValue) && searchInputValue !== '') {
        displayPhoneDiv.textContent = '';
        displayHideShow('spinner', 'flex');
        loadPhoneApi(searchInputValue.toLowerCase());
        searchInput.value = '';
        displayHideShow('error', 'none');
        displayHideShow('all-data', 'flex');


        // display all  phone data 
        const allPhoneDataBtn = document.getElementById('all-phone');
        allPhoneDataBtn.addEventListener('click', () => {

            fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInputValue.toLowerCase()}`)
                .then(res => res.json())
                .then(data => displayPhoneData(data.data.slice(20), data));

            displayHideShow('all-data', 'none');

        });

    } else {
        displayHideShow('error', 'block');
    }

});