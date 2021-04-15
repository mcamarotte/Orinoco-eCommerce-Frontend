const confName = document.getElementById('conf-title');
const confImg = document.getElementById('conf-img');
const confPrice = document.getElementById('conf-price');
const confTitle = document.getElementById('confirmation');
const confCard = document.getElementById('conf-card');

//take query parameter id to help display product
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

const orderNumber = queryString("id")[0];
const total = queryString("total")[0];

//if order number is not displayed then display error page
if (orderNumber === "") {

	//if id is not detected then display error page that no item is detected 
	confTitle.textContent = 'You have not Purchased an item';
	confCard.remove();
} else {

	//once order is completed local storage clear all its items
	localStorage.clear();

	//if request is successful then display confirmation of purchased items	
	confName.textContent = "Your order number is: " + orderNumber; 
	confPrice.textContent = "Price: $" + financial(total);
}
