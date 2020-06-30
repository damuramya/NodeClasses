const { createInterface } = require('readline');

const r1 = createInterface({
  input: process.stdin,
  output: process.stdout
});

const itemsText =   `1) Soap - 10 rupees/item\n
  2) Tooth Paste 20 rupees/item\n
  3) Ice cream 30 rupees/item\n
  What do you want to buy today?`;

const itemsObjectArray = [{ id: '1', name : 'Soap', quantity: 0, priceperunit: 10}, {id:'2', name: 'Tooth Paste', quantity: 0, priceperunit: 20}, { id:'3', name: 'Ice Cream', quantity: 0, priceperunit: 30}]
  
const getUserItemIdInput = () => {
	r1.question(`\nUser Input: `, (id) => {	
		const item = itemsObjectArray.find((item) => {
			return item.id == id
		})
		
		if(item) {
			getHowmanyInput(id)
		} else {
			console.log('Please enter valid item id. \n')
			getUserItemIdInput()
		}
	})
}

const appendToOrder = (itemid, quantity) => {
	itemsObjectArray.find((item) => {
				if(item.id == itemid) {
					item.quantity = item.quantity + quantity
				}
	})
	getAnythingElseInput()
}

const firstQuestion = () => {	
    console.log(`Hey there, We have the following items in our shop.\n\n`);
	console.log(itemsText)
	getUserItemIdInput()
}

const getHowmanyInput = (itemid) => {
	
	    r1.question(`\nHow many: `, (quantity) => {
			appendToOrder(itemid, quantity)
        })
}
const getAnythingElseInput = () => {
	r1.question(`Anything else? (Yes/No): `, (answer) => {
		if(answer == 'yes' || answer == 'Yes') { 
		    getUserItemIdInput()
		} else {
			summary()
		}
	})
}
const summary = () => {
	
	console.log('Calculating....')
	const total = itemsObjectArray.reduce((totalcost,item) => totalcost + (item.quantity * item.priceperunit),0)
	
	console.log(`Total price is ${total}`)
	
	r1.close()
}

module.exports = firstQuestion

