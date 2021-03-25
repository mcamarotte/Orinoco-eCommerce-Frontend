const serverError = document.getElementById('serverError');
const basketButton = document.getElementById('basket-button');
const prodName = document.getElementById('prod-title');
const prodImg = document.getElementById('product-img');
const prodPrice = document.getElementById('prod-price');
const prodDesc = document.getElementById('prod-desc');
const prodLens = document.getElementById('prod-lens');
const prodId = document.getElementById('prod-id');
const prodBody = document.getElementById('prod-body');
const error = document.getElementById('error');
const items = Object.entries(localStorage);
const numberOfItems = items.length;

if(numberOfItems != 0) {
	basketButton.textContent = "(" + numberOfItems + ") Basket";
}

//take query parameter id from url address bar to help display product
function queryString(obj) {  
    const result = [];
    let match;
    const re = new RegExp('(?:\\?|&)' + obj + '=(.*?)(?=&|$)', 'gi');
    while ((match = re.exec(document.location.search)) !== null) {
        result.push(match[1]);
    }
    return result;
}

//display price correctly by dividing by 100 displaying it with two decimal points 
function financial(y) {
	let price= y/100;
	return parseFloat(price).toFixed(2);	
}

const x = queryString("id")[0];
const URL = 'http://localhost:3000/api/cameras/' + x;

if (x === "") {
	prodName.textContent = 'You have not chosen a product';
	prodImg.remove();
	prodBody.remove();
} else {

  let apiRequest = new XMLHttpRequest();
	
	  apiRequest.open('GET', URL);
	  apiRequest.send();

	apiRequest.onreadystatechange = () => {
	  if(apiRequest.readyState === 4) {
		if(apiRequest.status === 200 || apiRequest.status === 201) {			
		
			if (typeof x === 'string') {
				const response = JSON.parse(apiRequest.response);			
				serverError.innerHTML = "There is a problem with the server's response";
				prodName.textContent = response.name; 
				prodPrice.textContent = "Price: $" + financial(response.price);
				prodDesc.textContent = response.description;

        for(let i = 0; i < response.lenses.length; i++) {
						const lens = document.createElement("option");
						lens.textContent = response.lenses[i];					
							prodLens.appendChild(lens);
					lens.value = response.lenses[i];
				}
				prodId.href = 'product.html?id=' + response._id;	
				prodImg.src = response.imageUrl;	
			} else {
				serverError.innerHTML = "There is a problem with the server's response";
				prodName.textContent = 'Name Not Found!';
				prodImg.src = 'images/vcam_1.jpg';	  
				prodPrice.textContent = 'Price Not Found!';
				prodDesc.textContent = 'Description Not Found!';
				prodLens.textContent = 'Lenses Not Found!';
				
			}		
		} else {
			serverError.innerHTML = "There is a problem with the server's response";
			prodName.textContent = 'Name Not Found!';
			prodImg.src = 'images/vcam_1.jpg';	  
			prodPrice.textContent = 'Price Not Found!';
			prodDesc.textContent = 'Description Not Found!';
			prodLens.textContent = 'Lenses Not Found!';
		
		}		
		}
	};
}
prodId.addEventListener('click', ($event) => {
	if(x in localStorage){

    $event.preventDefault();
		error.innerHTML = "* This Item Is Already In Your Basket *";
	}else {
		localStorage.setItem(x, prodLens.value);
	}
});
