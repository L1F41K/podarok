document.addEventListener('DOMContentLoaded', function () {
	const startButton = document.getElementById('start-button')
	const audio = document.getElementById('audio')
	const content = document.getElementById('content')
	const secondContent = document.getElementById('second-content')
	const initialScreen = document.getElementById('initial-screen')
	const correctCode = 'ернэл охикм жуф мкпёжт гхяпр'
	const secondCorrectCode = 'ёсоюм пцйлн зфх нлржзу дцарс'
	const inputField = document.getElementById('secret-input')
	const errorMessage = document.getElementById('error-message')
	const checkButton = document.getElementById('check-button')
	const secondInputField = document.getElementById('second-input')
	const secondErrorMessage = document.getElementById('second-error-message')
	const secondCheckButton = document.getElementById('second-check-button')

	let timer // Переменная для хранения таймера
	let isSecondAttempt = false // Флаг для проверки второго блока

	// Обработка клика по кнопке "Начать"
	startButton.addEventListener('click', function () {
		audio.play().catch(function (error) {
			console.log('Ошибка при воспроизведении аудио:', error)
		})

		if (isSecondAttempt) {
			secondContent.style.display = 'block'
		} else {
			content.style.display = 'block'
		}

		initialScreen.style.display = 'none'

		// Запуск таймера на 3 минуты и 12 секунд
		timer = setTimeout(function () {
			initialScreen.style.display = 'block'
			content.style.display = 'none'
			secondContent.style.display = 'none'
			audio.pause()
			audio.currentTime = 0
			isSecondAttempt = true // Установить флаг для второго блока
		}, 3 * 60 * 1000 + 12 * 1000) // 3 минуты 12 секунд в миллисекундах
	})

	// Обработка клика по кнопке проверки первого блока
	checkButton.addEventListener('click', function () {
		if (inputField.value.trim() === correctCode) {
			window.location.href = 'yes6.html' // замените на нужный URL
		} else {
			errorMessage.style.display = 'block'
		}
	})

	// Обработка клика по кнопке проверки второго блока
	secondCheckButton.addEventListener('click', function () {
		if (secondInputField.value.trim() === secondCorrectCode) {
			window.location.href = 'yes6.html' // замените на нужный URL
		} else {
			secondErrorMessage.style.display = 'block'
		}
	})
})
