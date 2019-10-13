var fingerprint = document.getElementsByClassName('fingerprint')[0];
var safe = document.getElementsByClassName('safe')[0];
var pin = '-';

var timeout = null

function initButtons() {
	var buttons = document.getElementsByClassName('button');
	for (var counter = 0; counter < buttons.length; counter++) {
		buttons[counter].addEventListener('click', buttonClicked);
	}
}

function buttonClicked(event) {
	new Audio('click.mp3').play();
	var item = event.target.innerHTML;
	if (pin === '-') {
		pin = item;
	} else if (pin.length < 4) {
		pin += item;
	}
	if (pin.length === 4) {
		if (pin === '3456') {
			alert('Kijk in de kofferbak van de UP! Mail mij welke letter u gevonden heeft! En deel met collega\'s!');
		} else {
			pin = '-';
		}
	}
	updatePin();
}

function updatePin() {
	document.getElementsByClassName('pin-display')[0].innerHTML = pin;
}

function rotateCats(on) {
	var cats = document.getElementsByClassName('drmouse');
	for (var counter = 0; counter < cats.length; counter++) {
		on ? cats[counter].classList.add('spin') : cats[counter].classList.remove('spin');
	}
}

function fingerIn(e) {
	timeout = setTimeout(function() {
		scanCompleted();
	}, 10 * 1000);
	fingerprint.classList.add('zoom');
	rotateCats(true);
	e.preventDefault();
	e.stopPropagation();
}

function fingerOut() {
	if (timeout) clearTimeout(timeout);
	fingerprint.classList.remove('zoom');
	rotateCats(false);
}

function scanCompleted() {
	if (timeout) clearTimeout(timeout);
	fingerprint.classList.remove('zoom');
	rotateCats(false);
	safe.classList.add('safe-down');
}

fingerprint.addEventListener('touchstart', fingerIn);
fingerprint.addEventListener('touchend', fingerOut);
initButtons();