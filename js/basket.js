const basketButton = document.getElementById('basket-button');
const cartSubmit = document.getElementById('cart-submit');
const cartTitle = document.getElementById('title');
const cartCard = document.getElementById('card');
const cartProductArea = document.getElementById('main-product-area');
const totalPrice = document.getElementById('totalPrice');
const cartForm = document.getElementById('form_1');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const addressInput = document.getElementById('address');
const cityInput = document.getElementById('city');
const emailInput = document.getElementById('email');
const URL = 'http://localhost:3000/api/cameras/';
let total = 0;

const items = Object.entries(localStorage);
const numberOfItems = items.length;
const orderNumber = Math.floor(100000000 + Math.random() * 900000000);

function financial(y) {
	let price= y/100;
	return parseFloat(price).toFixed(2);	
}

if (numberOfItems === 0) {
	cartTitle.textContent = 'There are no items in your basket';
	cartProductArea.remove();
	cartForm.remove();
} else {
	
	basketButton.textContent = "(" + numberOfItems + ") Basket";
	
	cartCard.remove();
	for (let k in items){

		let productId = localStorage.key(k);
		let newDiv = document.createElement("div");
		let newDivImgHolder = document.createElement("div");
		let newTextHolder = document.createElement("div");
		let newImg = document.createElement("img");
		let newH5Name = document.createElement("h5");
		let newH6Price = document.createElement("h6");
		let newLens = document.createElement("select");
		let removeButton = document.createElement("a");
		let lineBreak = document.createElement("br");

		newDiv.setAttribute('id', productId);
		newDiv.setAttribute('class', "card flex-row flex-wrap");	
		cartProductArea.appendChild( newDiv );

		newDivImgHolder.setAttribute('class', "card-header border-0");
		newDiv.appendChild(newDivImgHolder);
		newImg.setAttribute("id", "img" + productId);
		newImg.setAttribute("class", "img" + productId);
		newImg.setAttribute("height", "100");
		newDivImgHolder.appendChild(newImg);		

		newTextHolder.setAttribute('class', "card-block");
		newDiv.appendChild(newTextHolder);
		newH5Name.setAttribute('id', "name" + productId);
		newH5Name.setAttribute('class', "name" + productId);
		newTextHolder.appendChild(newH5Name);
		newH6Price.setAttribute('id', "price" + productId);
		newH6Price.setAttribute('class', "price" + productId);
		newTextHolder.appendChild(newH6Price);
		newLens.setAttribute('id', "lens" + productId);
		newLens.setAttribute('class', "lens" + productId);
		newLens.setAttribute('value', localStorage.getItem(productId));
		newTextHolder.appendChild(newLens);

		newTextHolder.appendChild(lineBreak);

		removeButton.setAttribute('id', "remove" + productId);
		removeButton.setAttribute('class',  "btn btn-outline-option");
		removeButton.href = "basket.html";
		removeButton.textContent = "Remove";		
		newTextHolder.appendChild(removeButton);
		removeButton.addEventListener('click', ($event) => {
			localStorage.removeItem(productId);
		});
		
		const cartName = document.getElementById("name" + productId);
		const cartPrice =  document.getElementById("price" + productId);
		const cartImg =  document.getElementById("img" + productId);
		const cartLens =  document.getElementById("lens" + productId);		

		if(numberOfItems === 1) {
			cartTitle.textContent = 'There is a Camera in your basket:';	
		} else {
			cartTitle.textContent = 'There are ' + numberOfItems + ' Cameras in your basket:';	
		}
			function getRequest (verb, address, data) {
				return new Promise((resolve, reject) => {

					let apiRequest = new XMLHttpRequest();

				apiRequest.open(verb, address);
				apiRequest.send();

				apiRequest.onreadystatechange = () => {
					if(apiRequest.readyState === 4) {				
						const response = JSON.parse(apiRequest.response);
						if(apiRequest.status === 200 || apiRequest.status === 201) {
							resolve(response);

							cartName.textContent = response.name;
							cartPrice.textContent = "$" + financial(response.price);
							cartImg.src = response.imageUrl;

							total += response.price;
							totalPrice.textContent = "Total: " + "$" + financial(total);

							for(let i = 0; i < response.lenses.length; i++) {
								let lens = document.createElement("option");
								if (response.lenses[i] ==  localStorage.getItem(productId)){
									lens.setAttribute('selected', "selected");
								}
								lens.textContent = response.lenses[i];					
								lens.value = response.lenses[i];
								cartLens.appendChild(lens);
							}
							
						} 	else {
							reject(response);	

							serverError.innerHTML = "There is a problem with the server's response";
							cartName.textContent = 'Name Not Found!';
							cartImg.src = 'images/vcam_1.jpg';	  
							cartPrice.textContent = 'Price Not Found!';
							cartSubmit.href = 'confirmation.html';					
						}		
					}				
				};
			});
		}
		getRequest('GET', URL + productId);		
	}
} 

const letters = /^[A-Za-z]+$/;
const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function validateForm(){

    	if (firstNameInput.value.length < 1) {
			document.getElementById('error-firstName').innerHTML = "* Please Enter Your First Name *";
			firstNameInput.focus();
		}

		if(firstNameInput.value.match(letters) == null) {
			document.getElementById('error-firstName').innerHTML = "* Please Use Alphabetic Characters *";
			firstNameInput.focus();
		}
		if (lastNameInput.value.length < 1) {
			document.getElementById('error-lastName').innerHTML = "* Please Enter Your Last Name *";
			lastNameInput.focus();
		}
		if(lastNameInput.value.match(letters)  == null) {
			document.getElementById('error-lastName').innerHTML = "* Please Use Alphabetic Characters *";
			lastNameInput.focus();
		}
		if (addressInput.value.length < 1) {
			document.getElementById('error-address').innerHTML = "* Please Enter Your Address *";
			addressInput.focus();
		}
		if (cityInput.value.length < 1) {
			document.getElementById('error-city').innerHTML = "* Please Enter Your City *";
			cityInput.focus();
		}	
		if (emailInput.value.length < 1) {
			document.getElementById('error-email').innerHTML = "* Please Enter Your Email *";
			emailInput.focus();
		}   

		if (emailInput.value.match(mailFormat)  == null) {
			document.getElementById('error-email').innerHTML = "* Please Enter A Valid Email *";
			emailInput.focus();
		}

	if(firstNameInput.value.length < 1 || 
		firstNameInput.value.match(letters) == null || 
		lastNameInput.value.length < 1 || 
		lastNameInput.value.match(letters) == null || 
		addressInput.value.length < 1 || 
		cityInput.value.length < 1 || 
		emailInput.value.length < 1 || 
		emailInput.value.match(mailFormat)  == null)
		{
		console.log(true);
       	return false;
    }
	return true;
}

const productArray = [];
for (var i = 0; i < localStorage.length; i++) {
    var key   = localStorage.key(i);
	productArray.push(key);
}

cartForm.addEventListener('submit', ($event) => {	
	if(validateForm()){
	$event.preventDefault();	

	const contact = {	
	firstName: firstNameInput.value,
	lastName: lastNameInput.value,
	address: addressInput.value,
	city: cityInput.value,
	email: emailInput.value
	}  
	const products = productArray;

	const postData = {'contact': contact,
					'products' : products};
	console.log(postData);
	makeRequest(postData);	
	} else {
		console.log(false);
		$event.preventDefault();
		return false;
	}
});

function makeRequest(data) {	
  return new Promise((resolve, reject) => {

	let apiRequest = new XMLHttpRequest();	
    apiRequest.open('POST', URL + 'order');
    apiRequest.onreadystatechange = () => {
      if (apiRequest.readyState === 4) {
        if (apiRequest.status === 200 || apiRequest.status === 201) {
			const response = JSON.parse(apiRequest.response);
			console.log(response);			
			console.log(total);
			resolve(response);

			window.location.replace('confirmation.html?id=' + response.orderId + '&total=' + total);
        } else {
			reject(JSON.parse(apiRequest.response));		  
			console.log("order cancelled");
        }
      }
    };	
    apiRequest.setRequestHeader('Content-Type', 'application/json');
    apiRequest.send(JSON.stringify(data));
  });
}
