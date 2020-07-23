'use sctrict';

const apiKey = '4ZYSH54VCHe0UoUzO5DVxbs89yCa174xH0eGhVhC'
const url = 'https://developer.nps.gov/api/v1/parks'

//format the parameters for the HTTP request Query
function formatQueryParams(params){
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
  console.log(queryItems)
}

//Fetch info from the NPS API
function findParks(query, limit =10) {
  const params = {
    stateCode: query,
    limit,
    api_Key: apiKey,
  };
  const queryString = formatQueryParams(params)
  const completeUrl = url + '?' + queryString;
  console.log(completeUrl)

fetch(completeUrl)
   .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      console.log(err);
      alert("Something went wrong, try again!");
    });
}

//display results to the DOM
function displayResults(responseJson) {
  $('.result-list').empty();
  for (let i =0; i < responseJson.data.length; i++) {
    $('.result-list').append(
      `<li>
      <h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p><a href=${responseJson.data[i].url}</a> Park Website</p>
      </li>`
    )}
    $('.results').removeClass('hidden');
}

//get info from the forms
function formSubmit(){
$('#input').submit(event => {
  event.preventDefault()
  const maxResults = $('.numOfResults').val()
  const stateAbv = $('.stateAbv').val()
  findParks(maxResults, stateAbv)
})
}

$(function() {
  console.log('App loaded, waiting for input')
  formSubmit()
});