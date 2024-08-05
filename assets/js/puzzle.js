const canvas = document.getElementById('puzzle')
const context = canvas.getContext('2d')
const img = new Image()
img.src = 'assets/Img/our.jpg' // Замените на путь к вашей фотографии

let rows, cols
let pieceWidth, pieceHeight
let pieces = []
let currentPiece = null
let offsetX, offsetY

img.onload = () => {
	resizeCanvas()
	createPieces()
	shufflePieces()
	drawPuzzle()
	addEventListeners()
	window.addEventListener('resize', onResize)
}

function resizeCanvas() {
	const containerWidth = canvas.parentElement.clientWidth
	const containerHeight = canvas.parentElement.clientHeight

	const imgAspectRatio = img.width / img.height
	const containerAspectRatio = containerWidth / containerHeight

	if (imgAspectRatio > containerAspectRatio) {
		canvas.width = containerWidth
		canvas.height = containerWidth / imgAspectRatio
	} else {
		canvas.height = containerHeight
		canvas.width = containerHeight * imgAspectRatio
	}

	adjustPieceSize()
}

function adjustPieceSize() {
	if (window.innerWidth <= 700) {
		rows = cols = 6 // Мобильные устройства
	} else if (window.innerWidth < 1024) {
		rows = cols = 5 // Средний размер
	} else {
		rows = cols = 4 // Стандартный размер
	}

	pieceWidth = canvas.width / cols
	pieceHeight = canvas.height / rows
}

function createPieces() {
	pieces = []
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			pieces.push({
				sx: col * (img.width / cols),
				sy: row * (img.height / rows),
				dx: Math.random() * (canvas.width - pieceWidth),
				dy: Math.random() * (canvas.height - pieceHeight),
				correctDx: col * pieceWidth,
				correctDy: row * pieceHeight,
				isPlaced: false,
			})
		}
	}
}

function shufflePieces() {
	pieces.sort(() => Math.random() - 0.5)
}

function drawPuzzle() {
	context.clearRect(0, 0, canvas.width, canvas.height)
	pieces.forEach(piece => {
		if (!piece.isPlaced) {
			context.drawImage(
				img,
				piece.sx,
				piece.sy,
				img.width / cols,
				img.height / rows,
				piece.dx,
				piece.dy,
				pieceWidth,
				pieceHeight
			)
		} else {
			context.drawImage(
				img,
				piece.sx,
				piece.sy,
				img.width / cols,
				img.height / rows,
				piece.correctDx,
				piece.correctDy,
				pieceWidth,
				pieceHeight
			)
		}
	})
}

function addEventListeners() {
	if (window.matchMedia('(max-width: 700px)').matches) {
		canvas.addEventListener('touchstart', onTouchStart)
		canvas.addEventListener('touchmove', onTouchMove)
		canvas.addEventListener('touchend', onTouchEnd)
	} else {
		canvas.addEventListener('mousedown', onMouseDown)
		canvas.addEventListener('mousemove', onMouseMove)
		canvas.addEventListener('mouseup', onMouseUp)
	}
}

function removeEventListeners() {
	canvas.removeEventListener('mousedown', onMouseDown)
	canvas.removeEventListener('mousemove', onMouseMove)
	canvas.removeEventListener('mouseup', onMouseUp)
	canvas.removeEventListener('touchstart', onTouchStart)
	canvas.removeEventListener('touchmove', onTouchMove)
	canvas.removeEventListener('touchend', onTouchEnd)
}

function onMouseDown(e) {
	const { offsetX: x, offsetY: y } = e
	currentPiece = getPieceAt(x, y)
	if (currentPiece) {
		offsetX = x - currentPiece.dx
		offsetY = y - currentPiece.dy
	}
}

function onMouseMove(e) {
	if (currentPiece) {
		const { offsetX: x, offsetY: y } = e
		currentPiece.dx = x - offsetX
		currentPiece.dy = y - offsetY
		drawPuzzle()
	}
}

function onMouseUp() {
	if (currentPiece) {
		snapPiece()
		currentPiece = null
		if (isPuzzleComplete()) {
			window.location.href = 'yes7.html' // Замените на URL вашей страницы успеха
		}
	}
}

function onTouchStart(e) {
	e.preventDefault()
	const touch = e.touches[0]
	const rect = canvas.getBoundingClientRect()
	const x = touch.clientX - rect.left
	const y = touch.clientY - rect.top
	currentPiece = getPieceAt(x, y)
	if (currentPiece) {
		offsetX = x - currentPiece.dx
		offsetY = y - currentPiece.dy
	}
}

function onTouchMove(e) {
	e.preventDefault()
	if (currentPiece) {
		const touch = e.touches[0]
		const rect = canvas.getBoundingClientRect()
		const x = touch.clientX - rect.left
		const y = touch.clientY - rect.top
		currentPiece.dx = x - offsetX
		currentPiece.dy = y - offsetY
		drawPuzzle()
	}
}

function onTouchEnd() {
	if (currentPiece) {
		snapPiece()
		currentPiece = null
		if (isPuzzleComplete()) {
			window.location.href = 'yes7.html' // Замените на URL вашей страницы успеха
		}
	}
}

function getPieceAt(x, y) {
	return pieces.find(
		piece =>
			x > piece.dx &&
			x < piece.dx + pieceWidth &&
			y > piece.dy &&
			y < piece.dy + pieceHeight
	)
}

function snapPiece() {
	const threshold = 20 // расстояние для "приклеивания"
	if (
		Math.abs(currentPiece.dx - currentPiece.correctDx) < threshold &&
		Math.abs(currentPiece.dy - currentPiece.correctDy) < threshold
	) {
		currentPiece.dx = currentPiece.correctDx
		currentPiece.dy = currentPiece.correctDy
		currentPiece.isPlaced = true
	}
	drawPuzzle()
}

function isPuzzleComplete() {
	return pieces.every(piece => piece.isPlaced)
}

function onResize() {
	removeEventListeners()
	resizeCanvas()
	createPieces()
	drawPuzzle()
	addEventListeners()
}
