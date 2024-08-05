function openModal(modalId) {
	const modal = document.getElementById(modalId)
	modal.style.display = 'flex'
}

function closeModal(modalId) {
	const modal = document.getElementById(modalId)
	modal.style.display = 'none'
}

// Get all modal buttons
const customModalButtons = document.querySelectorAll('.custom-modal-button')

// Attach event listeners to each button
customModalButtons.forEach(button => {
	button.addEventListener('click', function () {
		const modalId = this.getAttribute('data-custom-modal')
		const modal = document.getElementById(modalId)
		modal.style.display = 'block'
	})
})

// Get all close buttons
const customCloseButtons = document.querySelectorAll('.custom-close')

// Attach event listeners to each close button
customCloseButtons.forEach(button => {
	button.addEventListener('click', function () {
		const modalId = this.getAttribute('data-custom-modal')
		const modal = document.getElementById(modalId)
		modal.style.display = 'none'
	})
})

// Close the modal when clicking outside of it
window.onclick = function (event) {
	const modals = document.querySelectorAll('.custom-modal')
	modals.forEach(modal => {
		if (event.target == modal) {
			modal.style.display = 'none'
		}
	})
}

document.getElementById('submitButton').addEventListener('click', function () {
	const input = document.getElementById('birthdayInput').value
	const errorMessage = document.getElementById('error-message')

	// Hide the error message initially
	errorMessage.classList.add('hidden')

	if (input === 'HAPPY BIRTHDAY!') {
		window.location.href = 'end.html' // Укажите URL страницы для перенаправления
	} else {
		errorMessage.classList.remove('hidden')
	}
})

//assets/Img/our.jpg

//

// script.js
