document.addEventListener('DOMContentLoaded', function () {
	const cardArray = [
		{ name: 'img1', src: 'assets/Img/333.jpg' },
		{ name: 'img2', src: 'assets/Img/uga.jpg' },
		{ name: 'img3', src: 'assets/Img/slava.jpg' },
		{ name: 'img4', src: 'assets/Img/ram.jpg' },
		{ name: 'img4', src: 'assets/Img/sid.jpg' },
		{ name: 'img3', src: 'assets/Img/uff.jpeg' },
		{ name: 'img1', src: 'assets/Img/666.jpg' },
		{ name: 'img2', src: 'assets/Img/agaa.jpeg' },
	]

	const column1 = document.getElementById('column1')
	const column2 = document.getElementById('column2')
	const canvas = document.getElementById('canvas')
	const ctx = canvas.getContext('2d')

	let selected = []
	let connections = []
	const totalPairs = cardArray.length / 2

	function createCard(card) {
		const cardElement = document.createElement('div')
		cardElement.classList.add('card1')
		cardElement.dataset.name = card.name
		cardElement.dataset.src = card.src

		const img = document.createElement('img')
		img.src = card.src
		cardElement.appendChild(img)

		cardElement.addEventListener('click', () => selectCard(cardElement))

		return cardElement
	}

	function setupGame() {
		const column1Cards = cardArray.slice(0, 4)
		const column2Cards = cardArray.slice(4)

		column1Cards.forEach(card => column1.appendChild(createCard(card)))
		column2Cards.forEach(card => column2.appendChild(createCard(card)))

		resizeCanvas()
	}

	function selectCard(card) {
		if (selected.length === 2) return

		if (selected.length === 0) {
			selected.push(card)
			card.classList.add('selected')
		} else if (selected.length === 1) {
			selected.push(card)
			card.classList.add('selected')
			checkMatch()
		}
	}

	function checkMatch() {
		const [card1, card2] = selected

		if (card1.dataset.name === card2.dataset.name) {
			createConnection(card1, card2)
			connections.push([card1, card2])
			card1.classList.add('matched')
			card2.classList.add('matched')
			if (connections.length === totalPairs) {
				setTimeout(() => {
					window.location.href = 'net5.html' // Замените на нужный URL
				}, 1000)
			}
		} else {
			setTimeout(() => {
				card1.classList.remove('selected')
				card2.classList.remove('selected')
			}, 1000)
		}

		selected = []
	}

	function createConnection(card1, card2) {
		const rect1 = card1.getBoundingClientRect()
		const rect2 = card2.getBoundingClientRect()
		const offset = canvas.getBoundingClientRect()

		const startX = rect1.left + rect1.width / 2 - offset.left
		const startY = rect1.top + rect1.height / 2 - offset.top
		const endX = rect2.left + rect2.width / 2 - offset.left
		const endY = rect2.top + rect2.height / 2 - offset.top

		ctx.strokeStyle = 'red'
		ctx.lineWidth = 2
		ctx.beginPath()
		ctx.moveTo(startX, startY)
		ctx.lineTo(endX, endY)
		ctx.stroke()
	}

	function resizeCanvas() {
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
	}

	window.addEventListener('resize', resizeCanvas)
	setupGame()
})
