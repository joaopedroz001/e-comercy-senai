let data = JSON.parse(localStorage.getItem('data')) || []
let count = 1
const table = document.querySelector('.productsList')
const tableBody = document.querySelector('.tableBody')
const arrowUp = document.querySelector('.growing-arrow')
const arrowDown = document.querySelector('.descending-arrow')
const filterName = document.querySelector('.nameFilterText')
const moneyFormat = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL'
})


// RESPONSIVE NAV BAR
document.querySelector('.burger').addEventListener('click', () => {
	document.querySelector('nav').classList.toggle('active')
})


// PRINT LIST
function printList(array = data) {
	array.length > 0 ? table.classList.add('showTable') : table.classList.remove('showTable')
	tableBody.innerHTML = ''

	for (let i = 0; i < array.length; i++) {
		const row = document.createElement('tr')

		const nameCell = document.createElement('td')
		nameCell.innerHTML = array[i].text
		nameCell.classList.add('nameCell')
		row.appendChild(nameCell)

		const descriptionCell = document.createElement('td')
		descriptionCell.classList.add('descriptionCell')
		descriptionCell.innerHTML = array[i].description
		row.appendChild(descriptionCell)

		const priceCell = document.createElement('td')
		priceCell.classList.add('priceCell')
		priceCell.innerHTML = moneyFormat.format(array[i].price)
		row.appendChild(priceCell)

		const buttonCell = document.createElement('td')
		buttonCell.classList.add('buttonCell')

		const deleteButton = document.createElement('i')
		deleteButton.className = 'fa-solid fa-trash deleteButton'
		deleteButton.onclick = () => {
			array.splice(i, 1)
			localStorage.setItem('data', JSON.stringify(array))
			window.location.reload()
		}

		buttonCell.appendChild(deleteButton)
		row.appendChild(buttonCell)
		tableBody.appendChild(row) 
	}
}


// ADD NEW ITEM
document.querySelector('.addProduct').addEventListener('click', () => {
	const text = document.querySelector('.text')
	const description = document.querySelector('.description')
	const price = document.querySelector('.price')

	if (text.value === '' || price.value === '' || description.value === '') {
		alert('Insira todas as informações.')
	} else if (isNaN(price.value)) {		
		alert('Insira o campo PREÇO corretamente.')
	} else {

		const product = { 
			id: data.length ? data.length + 1 : 1,
			text: text.value,
			description: description.value,
			price: parseFloat(price.value.replace(',', '.'))
		}

		data.push(product)
		localStorage.setItem('data', JSON.stringify(data))

		text.innerHTML = ''
		description.innerHTML = ''
		price.innerHTML = ''

		window.location.reload()		
	}
})


// FILTER BY NAME
function filterByName() {

	printList(data.filter(produto => {
		return produto.text.toLowerCase().includes(filterName.value.toLowerCase())
	}))
}


// ORDER LIST 
document.querySelector('.filter').addEventListener('click', () => {
	if (data.length >= 2) {
		let filterSort = new Array
		
		if (count % 2 === 0) {
			arrowUp.classList.add('showArrow')
			arrowDown.classList.remove('showArrow')
			
			data.sort((a, b) => { return a.price - b.price })
		} else {	
			arrowDown.classList.add('showArrow')
			arrowUp.classList.remove('showArrow')
			
			data.sort((a, b) => { return b.price - a.price })
		}
		
		count++
		console.log(data)
		filterName.value !== '' ? filterByName() : printList()
	}
})

printList()