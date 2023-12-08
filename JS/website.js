/*----Start of progress tab fish data----*/
async function fetchFishData() {
    try {
        const response = await fetch('JSON/kalat.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching fish data:', error);
    }
}
async function displayFishData() {
    const fishData = await fetchFishData();
    const progressContent = document.querySelector('#proBox .secondaryBoxContent');
    fishData.forEach(fish => {
        const fishElement = document.createElement('div');
        fishElement.classList.add('fishItem');
        fishElement.style.width = '5rem';
        const fishName = document.createElement('h3');
        fishName.textContent = fish.name;
        const fishLink = document.createElement('a');
        fishLink.href = fish.url;
        fishLink.textContent = "Learn more";
        const fishImage = document.createElement('img');
        fishImage.src = fish.img_src_set['1.5x'];
        fishElement.appendChild(fishName);
        fishElement.appendChild(fishImage);
        fishElement.appendChild(fishLink);
        progressContent.appendChild(fishElement);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    displayFishData();
});
/*----End of progress tab fish data----*/



/*----Start of button event listener----*/
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
/*----End of button event listener----*/