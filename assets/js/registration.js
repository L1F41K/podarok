document.getElementById('regForm').addEventListener('submit', function (event) {
	event.preventDefault()

	const password = document.getElementById('password').value
	const message = document.getElementById('message')

	if (password === 'я тебя люблю') {
		message.style.color = 'green'
		message.textContent = 'Регистрация пройдена!'
		setTimeout(() => {
			document.getElementById('registrationForm').style.display = 'none'
			document.getElementById('testContainer').style.display = 'block'
		}, 1000)
	} else {
		message.style.color = 'red'
		message.textContent = 'Неправильный пароль! Попробуйте снова.'
	}
})

function checkAnswer(formId, currentQuestionId, nextQuestionId) {
	const form = document.getElementById(formId)
	const selectedOption = form.querySelector('input[type="radio"]:checked')
	const errorMessage = document.getElementById(
		'error' + currentQuestionId.slice(-1)
	)

	if (selectedOption && selectedOption.classList.contains('correct-answer')) {
		errorMessage.textContent = ''
		document.getElementById(currentQuestionId).style.display = 'none'
		if (nextQuestionId) {
			document.getElementById(nextQuestionId).style.display = 'block'
		}
	} else {
		errorMessage.textContent = 'Неправильно. Попробуйте ещё раз'
	}
}
function redirectToPage() {
	window.location.href = 'yes3.html' // Укажите здесь URL-адрес страницы, на которую нужно перенаправить пользователя
}
