document.addEventListener('DOMContentLoaded', function () {
	let coinCount = 0
	const coinCounter = document.getElementById('coin-count')
	const hamster = document.getElementById('hamster')
	const doubleClickButton = document.getElementById('double-click')
	const tripleClickButton = document.getElementById('triple-click')
	let doubleClickActive = false

	function updateCoinCount(amount) {
		coinCount += amount
		coinCounter.textContent = coinCount
		if (coinCount >= 500) {
			window.location.href = 'yes5.html' // замените на нужный URL
		}
	}

	hamster.addEventListener('click', function () {
		updateCoinCount(doubleClickActive ? 2 : 1)
	})

	doubleClickButton.addEventListener('click', function () {
		if (coinCount >= 100) {
			doubleClickActive = true
			coinCount -= 100
			coinCounter.textContent = coinCount
			doubleClickButton.style.display = 'none'
			tripleClickButton.style.display = 'block' // Показываем кнопку "тройной клик"
			hamster.src = 'assets/Img/hamster2.gif' // Замените на нужный URL нового изображения
		} else {
			alert('Недостаточно монеток для покупки "двойного клика".')
		}
	})

	tripleClickButton.addEventListener('click', function () {
		if (coinCount >= 200) {
			coinCount -= 200
			coinCounter.textContent = coinCount
			hamster.src = 'assets/Img/hamster3.jpg'
			tripleClickButton.style.display = 'none'
		} else {
			alert('Недостаточно монеток для покупки "тройного клика".')
		}
	})
})
