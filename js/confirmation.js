const confName = document.getElementById('conf-title');
const confImg = document.getElementById('conf-img');
const confPrice = document.getElementById('conf-price');
const confTitle = document.getElementById('confirmation');
const confCard = document.getElementById('conf-card');

function queryString(obj) {  
    const result = [];
    let match;
    const re = new RegExp('(?:\\?|&)' + obj + '=(.*?)(?=&|$)', 'gi');
    while ((match = re.exec(document.location.search)) !== null) {
        result.push(match[1]);
    }
    return result;
}
function financial(y) {
	let price= y/100;
	return parseFloat(price).toFixed(2);	
}

const orderNumber = queryString("id")[0];
const total = queryString("total")[0];

if (orderNumber === "") {

	confTitle.textContent = 'You have not Purchased an item';
	confCard.remove();
} else {

	localStorage.clear();

	confName.textContent = "Your order number is: " + orderNumber; 
	confPrice.textContent = "Price: $" + financial(total);
}
