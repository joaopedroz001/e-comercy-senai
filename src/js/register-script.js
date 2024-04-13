const displayError = (mensage, e) => {
	isValid = false
	alert(mensage)
	e.preventDefault()
}

// ADD PRODUCT BUTTON
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