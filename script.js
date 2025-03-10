document.addEventListener("DOMContentLoaded", ()=>{
    const searchButton = document.getElementById('search-button');
    const countryInput = document.getElementById("country-input");
    const countryDetails = document.getElementById("country-details");
    const borderList = document.getElementById("border-list");

    searchButton.addEventListener("click", async () => {
        //console.log("button works");
        const countryName = countryInput.value;
            if(!countryName){ 
                displayError("Please enter a country name.")
                return;
            }
            
            
            const countryData = await fetchCountryData(countryName);

            if(countryData){
                updateCountryInfo(countryData);
                if(countryData.borders){
                    await updateBorderCountries(countryData.borders);
                }
                else{
                    borderList.textContent = "There are no bordering countries";
                }

            }
    });



    async function fetchCountryData(countryName) {

        const response = await fetch('https://restcountries.com/v3.1/name/{country}');
        const data = await response.json();
        return data;

        
    }

    function updateCountryInfo(countryName){

        countryName.textContent = countryName.name.common;
        
        if(countryName.capital){
            countryCapital.textContent = countryDetails.capital[0];
        } 
        else{
            countryCapital.textContent = "Not Applicable";
        }

        countryPopulation.textContent = countryName.population.toLocalString();
        countryRegion.textContent = countryName.region;
        countryFlag.src = countryName.flags;
        countryFlag.alt = 'Flag:'

        //borderList.innerHTML="";
    }

    async function updateBorderCountries(borders) {

        for(const code of borders){
            const response = await fetch('https://restcountries.com/v3.1/alpha/{code}')
            const data = await response.json();
            const borderCountry = data[0];

            const image = document.createElement("img")
            image.src = borderCountry.flags;
        }
        
    }

    /* function fetchCountryData(countryName) {
        try{
            const respond = await fetch("https://restcountries.com/");
            if(!respond.ok){
                throw new Error("Country does not exist. Please check name and try again :) ");
            }
            const data = await respond.json();
            const country = data[0];

            displayCountryInfo(country);

                if(country.borders){
                    fetchBorder(country.borders);
                }
                //put error handling here
        }
       
    } */

});