let data = JSON.parse(localStorage.getItem('data')) || []
let db, text, description, price
let count = 1
let isValid;
const cards = document.querySelector('.row')
const arrowUp = document.querySelector('.growing-arrow')
const arrowDown = document.querySelector('.descending-arrow')
const filterName = document.querySelector('.nameFilterText')
const moneyFormat = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL'
})


// BURGER NAV BAR
document.querySelector('.burger').addEventListener('click', () => {
	document.querySelector('nav').classList.toggle('active')
})