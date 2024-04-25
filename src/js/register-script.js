const createDB = () => {
	if (window.indexedDB) {
		const request = window.indexedDB.open('productsDataBase', 1)

		request.onerror = (event) => {
			console.log('Request Error: ', event)
		}

		request.onsuccess = (event) => {
			db = request.result
			console.log('Request has succed!', event)
		}

		request.onupgradeneeded = (event) => {
			let db = event.target.result

			// like tables in sql
			const objectStore = db.createObjectStore('products', {
				keyPath: 'id',
				autoIncrement: true
			})
		}
	}
}


const displayError = (mensage, e) => {
	isValid = false
	alert(mensage)
	e.preventDefault()
}


const addData = (event) => {
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

	const transactionAdd = db.transaction(['products'], 'readwrite')
	const objectStore = transactionAdd.objectStore('products')

	const newProduct = {
		name: text.value,
		description: description.value,
		price: parseFloat(price.value.replace(',', '.'))
	}

	const request = objectStore.add(newProduct)

	transactionAdd.oncomplete = (event) => {
		text.innerHTML = ''
		description.innerHTML = ''
		price.innerHTML = ''
		console.log('Data has added!')
	}

	transactionAdd.onerror = (event) => {
		console.log('Transaction Error: ', event)
	}
}

document.addEventListener('DOMContentLoaded', () => {
	isValid = true
	text = document.querySelector('.text')
	price = document.querySelector('.price')
	description = document.querySelector('.description')
	
	createDB()
})

// ADD PRODUCT BUTTON
// document.querySelector('.addProduct').addEventListener('click', (event) => {
// 	if (text.value === '') {
// 		displayError('Preencha o campo "Nome do Produto".', event)
// 	}

// 	if (price.value === '') {
// 		displayError('Preencha o campo "Preço do Produto".', event)
// 	}

// 	if (isNaN(price.value)) {
// 		displayError('Preencha o campo "Preço do Produto" corretamente.', event)
// 	}

// 	if (description.value === '') {
// 		displayError('Preencha o campo "Descrição do Produto".', event)
// 	}

// 	if (isValid === true) {
// 		data.push({
// 			id: data.length ? data.length + 1 : 1,
// 			text: text.value,
// 			description: description.value,
// 			price: parseFloat(price.value.replace(',', '.'))
// 		})

// 		localStorage.setItem('data', JSON.stringify(data))

// 		text.innerHTML = ''
// 		description.innerHTML = ''
// 		price.innerHTML = ''

// 		window.location.reload()		
// 	}
// })