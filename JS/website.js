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



/*----Start of map button function----*/
let _playerName = "dave";

async function runFunction(functionName, args) {
    const url = 'http://127.0.0.1:3000/runFunction';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
        },
        body: JSON.stringify({
            function_name: functionName,
            arguments: args,
        }),
    });
    console.log(functionName + ": Done");
    const resJSON = await response.json();
    console.log(resJSON)
    return resJSON;
}

function setBgImage(link){
    document.getElementById("bgImg").src = link;
}

function mapClick(playerName, countryName){
    let res = runFunction("updateLocation", [playerName, countryName]);
    res.then(function(result){setBgImage(result["imageLink"]);});
}

mapClick(_playerName, "Finland")
/*----End of map button function----*/