const printList = (array = data) => {
	array.length > 0 ? cards.classList.add('showCards') : cards.classList.remove('showCards')
	cards.innerHTML = ''

	for (let i = 0; i < array.length; i++) {
    const col = document.createElement('div')
    col.className = 'col-sm-6 mb-3'

    const card = document.createElement('div')
    card.className = 'card h-100'

    const cardBody = document.createElement('div')
    cardBody.className = 'card-body d-flex flex-column'

    const cardTitle = document.createElement('h5')
    cardTitle.className = 'card-title'
    cardTitle.innerHTML = `${array[i].text} - ${moneyFormat.format(array[i].price)}`

    const cardText = document.createElement('p')
    cardText.className = 'card-text'
    cardText.innerHTML = array[i].description

    const deleteButton = document.createElement('button')
    deleteButton.className = 'btn btn-danger mt-auto fa-solid fa-trash deleteButton'
    deleteButton.onclick = () => {
      array.splice(i, 1)
			localStorage.setItem('data', JSON.stringify(array))
			window.location.reload()
    }

    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardText)
    cardBody.appendChild(deleteButton)

    card.appendChild(cardBody)
    col.appendChild(card)
    cards.appendChild(col)
	}
}


const filterByName = () => {
	printList(data.filter(produto => {
		return produto.text.toLowerCase().includes(filterName.value.toLowerCase())
	}))
}

// ORDER BUTTON
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