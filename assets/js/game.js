const cardArray = [
	{ name: 'img1', src: 'assets/Img/111.jpg' },
	{ name: 'img1', src: 'assets/Img/111.jpg' },
	{ name: 'img2', src: 'assets/Img/222.jpg' },
	{ name: 'img2', src: 'assets/Img/222.jpg' },
	{ name: 'img3', src: 'assets/Img/333.jpg' },
	{ name: 'img3', src: 'assets/Img/333.jpg' },
	{ name: 'img4', src: 'assets/Img/444.jpg' },
	{ name: 'img4', src: 'assets/Img/444.jpg' },
	{ name: 'img5', src: 'assets/Img/555.jpg' },
	{ name: 'img5', src: 'assets/Img/555.jpg' },
	{ name: 'img6', src: 'assets/Img/666.jpg' },
	{ name: 'img6', src: 'assets/Img/666.jpg' },
	{ name: 'img7', src: 'assets/Img/777.jpg' },
	{ name: 'img7', src: 'assets/Img/777.jpg' },
	{ name: 'img8', src: 'assets/Img/888.jpg' },
	{ name: 'img8', src: 'assets/Img/888.jpg' },
	// добавьте больше карточек по необходимости
]

const gameBoard = document.querySelector('#game-board')
let selected = []
let matched = []
let flippedCards = []
const totalPairs = cardArray.length / 2

function createCard(card) {
	const cardElement = document.createElement('div')
	cardElement.classList.add('card')
	cardElement.dataset.name = card.name

	const frontFace = document.createElement('div')
	frontFace.classList.add('front-face')

	const backFace = document.createElement('div')
	backFace.classList.add('back-face')
	const img = document.createElement('img')
	img.src = card.src
	backFace.appendChild(img)

	cardElement.appendChild(frontFace)
	cardElement.appendChild(backFace)

	cardElement.addEventListener('click', flipCard)

	return cardElement
}

function shuffleArray(array) {
	let currentIndex = array.length,
		randomIndex

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--
		;[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		]
	}

	return array
}

function setupGame() {
	const shuffledArray = shuffleArray([...cardArray])
	shuffledArray.forEach(card => {
		const cardElement = createCard(card)
		gameBoard.appendChild(cardElement)
	})
}

function flipCard() {
	if (selected.length === 2) return

	const clickedCard = this

	if (
		clickedCard.classList.contains('flipped') ||
		matched.includes(clickedCard)
	)
		return

	clickedCard.classList.add('flipped')
	selected.push(clickedCard)

	if (selected.length === 2) {
		checkMatch()
	}
}

function checkMatch() {
	const [card1, card2] = selected

	if (card1.dataset.name === card2.dataset.name) {
		matched.push(card1, card2)
		setTimeout(() => {
			card1.classList.add('matched')
			card2.classList.add('matched')
			card1.classList.remove('flipped')
			card2.classList.remove('flipped')
			if (matched.length / 2 === totalPairs) {
				setTimeout(() => {
					window.location.href = 'https://disk.yandex.ru/d/tAedUHGWScVm3Q' // Замените на нужный URL
				}, 1000)
			}
		}, 1500) // Задержка перед удалением
	} else {
		setTimeout(() => {
			card1.classList.remove('flipped')
			card2.classList.remove('flipped')
		}, 1000) // Задержка перед возвратом карточек
	}

	selected = []
}

setupGame()
