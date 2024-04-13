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