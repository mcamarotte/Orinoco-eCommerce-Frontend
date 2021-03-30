const basketButton = document.getElementById('basket-button');
const reportName = document.getElementsByClassName('card-title');
const reportPrice = document.getElementsByClassName('prod-price');
const reportLink = document.getElementsByClassName('card-link');
const reportImg = document.getElementsByClassName('card-image');
const URL = 'http://localhost:3000/api/cameras';
const items = Object.entries(localStorage);
const numberOfItems = items.length;

if(numberOfItems != 0) {
	basketButton.textContent = "(" + numberOfItems + ") Basket";
}

let apiRequest = new XMLHttpRequest();

  apiRequest.open('GET', URL);
  apiRequest.send();

apiRequest.onreadystatechange = () => {
  if(apiRequest.readyState === 4) {    
	if(apiRequest.status === 200 || apiRequest.status === 201) {  		
		const response = JSON.parse(apiRequest.response);			
		for (var i = 0; i < response.length; i++) {			
			reportName[i].textContent = response[i].name;		
			reportPrice[i].textContent = response[i].description;
			reportLink[i].href = "product.html?id=" + response[i]._id;
			reportImg[i].src = response[i].imageUrl;
		}
	} else {	
		serverError.innerHTML = "There is a problem with the server's response";
		reportName.textContent = 'Name Not Found!';
		reportPrice.textContent = 'Description Not Found!';
		reportLink.href = 'product.html';
		reportImg.src = 'images/vcam_1.jpg';
	}	
  }
};
