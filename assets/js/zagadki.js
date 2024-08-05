const riddles = [
	{
		question: 'Я всегда двигаюсь вперед, но никогда не бегу. Кто я?',
		answer: 'часы',
	},
	{
		question: 'Я следую за тобой повсюду, но я никогда не устаю. Кто я?',
		answer: 'тень',
	},
	{
		question: 'Я молчу, но могу рассказать множество историй. Кто я?',
		answer: 'книга',
	},
	{
		question: 'Меня можно сломать, но не поранить. Кто я?',
		answer: 'лед',
	},
	{
		question: 'Я прихожу к тебе каждую ночь, но не оставляю следов. Кто я?',
		answer: 'сон',
	},
	{
		question: 'Я показываю все, но не говорю ни слова. Кто я?',
		answer: 'зеркало',
	},
	{
		question: 'У меня есть ключ, но я никогда не открываю двери. Кто я?',
		answer: 'письмо',
	},
	{
		question: 'Я живу на небе, но не солнце и не луна. Кто я?',
		answer: 'сын мияги',
	},
	{
		question: 'Я могу тебя заставить плакать, даже если ты не огорчен. Кто я?',
		answer: 'лук',
	},
	{
		question:
			'Я стакан, ты - стопка. Мы не одна тусовка. Твой рэп - подтасовка, мой рэп - потасовка. Откуда это?',
		answer: 'я хейтер',
	},

	// Добавьте свои загадки здесь
]

let currentRiddleIndex = 0

document.addEventListener('DOMContentLoaded', () => {
	displayRiddle()

	document
		.getElementById('submit-button')
		.addEventListener('click', checkAnswer)
})

function displayRiddle() {
	if (currentRiddleIndex < riddles.length) {
		document.getElementById('riddle-text').textContent =
			riddles[currentRiddleIndex].question
	} else {
		// Редирект на другую страницу после отгадывания всех загадок
		window.location.href = 'yes8.html' // Укажите здесь ваш URL для редиректа
	}
}

function checkAnswer() {
	const userAnswer = document
		.getElementById('riddle-answer')
		.value.trim()
		.toLowerCase()
	const correctAnswer = riddles[currentRiddleIndex].answer.toLowerCase()

	if (userAnswer === correctAnswer) {
		document.getElementById('feedback-message').style.display = 'none'
		currentRiddleIndex++
		displayRiddle()
		document.getElementById('riddle-answer').value = ''
	} else {
		document.getElementById('feedback-message').textContent =
			'Неправильный ответ! Попробуйте еще раз.'
		document.getElementById('feedback-message').style.display = 'block'
	}
}
