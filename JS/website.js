let fishingAllowed = true;
let _playerName = "john";

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

async function displayFishData(caughtArr) {
    const fishData = await fetchFishData();
    const progressContent = document.querySelector('#proBox .secondaryBoxContent .fishBox');
    let i = 0;
    fishData.forEach(fish => {
        const fishElement = document.createElement('div');
        fishElement.classList.add('fishItem');
        fishElement.style.flex = '0.1 0.1 5%';
        const fishNameLink = document.createElement('a');
        fishNameLink.href = fish.url;
        fishNameLink.textContent = fish.name;
        fishNameLink.style.textDecoration = 'none';
        const fishImage = document.createElement('img');
        fishImage.src = fish.img_src_set['1.5x'];
        let fishCaught = caughtArr[i]["caught"];
        if (fishCaught === 0) {
            console.log(fishCaught)
            fishImage.style.filter = 'brightness(30%)';
        }
        fishElement.appendChild(fishNameLink);
        fishElement.appendChild(fishImage);
        progressContent.appendChild(fishElement);
        i++;
    });
    /*---------------------JOS JÄÄ AIKAA
    const footerData = await fetchFishData();
    const footerContent = document.querySelector('.maingame .footmenu .footerBox');
    footerData.forEach(fish =>{
        runFunction('getPlayerLocation', [_playerName]).then(function(result){
            let playerLocation = result["name"];
            if (playerLocation === "Finland") {
                if (fish.id >= 1 && fish.id <= 7) {
                    const footerElement = document.createElement('div');
                    footerElement.classList.add('footerItem');
                    const footerImage = document.createElement('img');
                    footerImage.src = fish.img_src_set['1.5x'];
                }
            }
            else if (playerLocation === "Germany") {
                if (fish.id >= 8 && fish.id <= 14) {

                    footerImage.src = fish.img_src_set['1.5x'];
                }
            }
            else if (playerLocation === "Italy") {
                if (fish.id >= 15 && fish.id <= 20) {

                    footerImage.src = fish.img_src_set['1.5x'];
                }
            }
            else if (playerLocation === "Norway") {
                if (fish.id >= 21 && fish.id <= 25) {

                    footerImage.src = fish.img_src_set['1.5x'];
                }
            }
            else if (playerLocation === "Spain") {
                if (fish.id >= 26 && fish.id <= 30) {

                    footerImage.src = fish.img_src_set['1.5x'];
                }
            }

            footerElement.appendChild(footerImage);
            footerContent.appendChild(footerElement);
        });
    });AAKIA ÄÄJ SOJ----------------*/
}

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



/*----Start of fishing functionality----*/
function startFishing() {
    //saat kalaa tai et 50/50
    //käytä catchFish, ei catFish
    runFunction('getPlayerLocation', [_playerName]).then(function(result) {
        let fishingLocation = result["name"];
        if (!fishingAllowed) {
            console.log("YOU CAN'T FISH NOW FUCKO");
            return;
        }
        let chance = Math.floor(Math.random() * 10);
        console.log(chance);
        if (chance <= 2) {
            console.log("Sait kalan lol")
            runFunction('catchFish', [_playerName, fishingLocation]).then(function(result){
                let caughtFish = result["name"];
            })
        }
        fishingAllowed = false;
        setTimeout(() => {
            fishingAllowed = true;
            console.log("You can fish again!");}, 5000);
    });
}
/*----End of fishing functionality----*/

/*----Start of map button function----*/
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

function updateMoney(){
    let ret = runFunction('getPlayerMoney', [_playerName]);
    ret.then(function(result){
        document.getElementById("shopMoney").innerHTML = "Money: " + result["money"] + "€";
    });
}

function handleHover() {
    console.log('Button is being hovered!');
    // Add your custom code here
}

function updateProgress(){
    runFunction('getCaughtTable', [_playerName]).then(function(res){
        displayFishData(res);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    runFunction('login', [_playerName]).then(function(result2){
        runFunction('getCaughtTable', [_playerName]).then(function(result3){
            let out
            runFunction("getPlayerLocation", [_playerName]).then(function(result4){
                out = result3;
                displayFishData(out).then(function(r){
                    for (let i = 0; i < 9; i++) {
                        const shopButton = document.getElementById('itemBox' + i.toString());
                        if (shopButton)
                            shopButton.addEventListener('mouseover', handleHover);
                    }

                    setBgImage(result4["imageLink"]);
                });
            });
        });
    });
});

/*----End of map button function----*/