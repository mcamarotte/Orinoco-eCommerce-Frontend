const basketButton = document.getElementById('basket-button');
const reportName = document.getElementsByClassName('card-title');
const reportPrice = document.getElementsByClassName('prod-price');
const reportLink = document.getElementsByClassName('card-link');
const reportImg = document.getElementsByClassName('card-image');
const URL = 'http://localhost:3000/api/cameras';
const items = Object.entries(localStorage);
const numberOfItems = items.length;
// If there are more items than 0 display the number of items placed inside the basket
if(numberOfItems != 0) {
	basketButton.textContent = "(" + numberOfItems + ") Basket";
}

//display price correctly by dividing by 100 displaying it with two decimal points 
function financial(y) {
	let price= y/100;
	return parseFloat(price).toFixed(2);	
}
// Prepare the API request
let apiRequest = new XMLHttpRequest();
/* 
 * Capture and handle form submit event
 * Prevent default behaviour, prepare and send API request
*/
  apiRequest.open('GET', URL);
  apiRequest.send();

apiRequest.onreadystatechange = () => {
  if(apiRequest.readyState === 4) {    
	if(apiRequest.status === 200 || apiRequest.status === 201) { 

		//if request is successful then proceed to loop through all the products in the object displaying the name and description in to its own div element
		const response = JSON.parse(apiRequest.response);
		for (var i = 0; i < response.length; i++) {			
			reportName[i].textContent = response[i].name;		
			reportPrice[i].textContent = "Price: $" + (response[i].price);
			reportLink[i].href = "product.html?id=" + response[i]._id;
			reportImg[i].src = response[i].imageUrl;
		}
	} else {	
		//if request unsuccessful than display default text and images and error header
		serverError.innerHTML = "There is a problem with the server's response";
		reportName.textContent = 'Name Not Found!';
		prodPrice.textContent = 'Description Not Found!';
		reportLink.href = 'product.html';
		reportImg.src = 'images/vcam_1.jpg';
	}	
  }
};
