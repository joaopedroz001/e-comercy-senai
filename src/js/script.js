let data = JSON.parse(localStorage.getItem('data')) || []
let count = 1
let isValid;
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
const printList = (array = data) => {
	array.length > 0 ? table.classList.add('showTable') : table.classList.remove('showTable')
	tableBody.innerHTML = ''

	for (let i = 0; i < array.length; i++) {
		const row = document.createElement('tr')

		const nameCell = document.createElement('td')
		nameCell.innerHTML = array[i].text
		nameCell.classList.add('nameCell')
		row.appendChild(nameCell)

		const priceCell = document.createElement('td')
		priceCell.classList.add('priceCell')
		priceCell.innerHTML = moneyFormat.format(array[i].price)
		row.appendChild(priceCell)

		const descriptionCell = document.createElement('td')
		descriptionCell.classList.add('descriptionCell')
		descriptionCell.innerHTML = array[i].description
		row.appendChild(descriptionCell)

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


const displayError = (mensage, e) => {
	isValid = false
	alert(mensage)
	e.preventDefault()
}

// ADD NEW ITEM
document.querySelector('.addProduct').addEventListener('click', (event) => {
	isValid = true
	const text = document.querySelector('.text')
	const price = document.querySelector('.price')
	const description = document.querySelector('.description')

	if (text.value === '') {
		displayError('Preencha o campo "Nome do Produto".', event)
	}

	if (price.value === '') {
		displayError('Preencha o campo "Preço do Produto".', event)
	}

	if (isNaN(price.value)) {
		displayError('Preencha o campo "Preço do Produto" corretamente.', event)
	}

	if (description.value === '') {
		displayError('Preencha o campo "Descrição do Produto".', event)
	}

	if (isValid === true) {
		data.push({
			id: data.length ? data.length + 1 : 1,
			text: text.value,
			description: description.value,
			price: parseFloat(price.value.replace(',', '.'))
		})

		localStorage.setItem('data', JSON.stringify(data))

		text.innerHTML = ''
		description.innerHTML = ''
		price.innerHTML = ''

		window.location.reload()		
	}
})


// FILTER BY NAME
const filterByName = () => {
	printList(data.filter(produto => {
		return produto.text.toLowerCase().includes(filterName.value.toLowerCase())
	}))
}


// ORDER LIST 
document.querySelector('.filter').addEventListener('click', () => {
	if (data.length >= 2) {
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