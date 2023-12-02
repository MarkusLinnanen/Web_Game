const buttons = document.querySelectorAll('.navButton');
const closeButtons = document.querySelectorAll('.closeButton');
const overlay = document.getElementById('overlay');
buttons.forEach(button => {
	button.addEventListener('click', function() {
		const targetId = this.getAttribute('data-target');
		const targetBox = document.getElementById(targetId);
		overlay.style.display = 'block';
		targetBox.style.display = 'block';
	});
});
closeButtons.forEach(closeButton => {
	closeButton.addEventListener('click', function() {
		overlay.style.display = 'none';
		this.closest('.secondaryBox').style.display = 'none';
	});
});