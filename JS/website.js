let fishingAllowed = true;
let _playerName = "john";
let stringBroken = false;

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
    /*---------------------
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
    });----------------*/
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
            console.log("Fishing on cooldown");
            return;
        }
        if(stringBroken){
            console.log("String is Broken!");
            return;
        }
        console.log(stringBroken);
        let chance = Math.floor(Math.random() * 10);
        console.log(chance);
        if (chance <= 2) {
            console.log("Sait kalan lol")
            runFunction('catchFish', [_playerName, fishingLocation]).then(function(result){
                let caughtFish = result["name"];
                displayWinBox(caughtFish);
            })
        }
        else {
            displayLoseBox();
        }
        fishingAllowed = false;
        setTimeout(() => {
            fishingAllowed = true;
            console.log("You can fish again!");}, 5000);
    });
}

function displayWinBox(caughtFish) {
    const catchBox = document.querySelector('.caughtBox')
    catchBox.style.display = 'block';
    const fishText = document.getElementById('caughtBoxText')
    fishText.textContent = "Caught species: " + caughtFish;
    runFunction('getPlayerString', [_playerName]).then(function(result) {
        if (Math.random() < result["breakPercent"]){
            stringBroken = true;
            runFunction('breakString', [_playerName]).then(function(result) {
                const breakText = document.getElementById('caughtBoxText')
                breakText.textContent += "\n" + "Your String Broke!" + "\n" + "Buy a new one at the store";
            });
        }
    });
}
function closeWinBox() {
    const catchBox = document.getElementById('catchBox');
    catchBox.style.display = 'none';
}

function displayLoseBox(caughtFish) {
    const catchBox = document.querySelector('.noCaughtBox')
    catchBox.style.display = 'block';
    const text = document.querySelector('.noCaughtBoxText')
    text.textContent = "You didn't catch a fish!";
    runFunction('getPlayerString', [_playerName]).then(function(result) {
        if (Math.random() < result["breakPercent"]){
            stringBroken = true;
            runFunction('breakString', [_playerName]).then(function(result) {
                const brokenText = document.querySelector('.noCaughtBoxText')
                brokenText.textContent += "\n" + "Your String Broke!" + "\n" + "Buy a new one at the store";
            });
        }
    });
}
function closeLoseBox() {
    const catchBox = document.getElementById('noCatchBox');
    catchBox.style.display = 'none';
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

// Code is messy and objectively unclean due to nested function.then, done to not overlap async functions
// Could have been done better with planning and making a non async version of the function but it is a bit too late for that

let shopFocus = "";
document.addEventListener('DOMContentLoaded', () => {
    // Run login function
    runFunction('login', [_playerName]).then(function(result2){
        // Get if string was  broken in past plays
        runFunction('isBroken', [_playerName]).then(function(result){
        stringBroken = result["isBroken"]
            // Run getCaughtTable function
            runFunction('getCaughtTable', [_playerName]).then(function(result3){
                let out;
                out = result3;
                // Run getPlayerLocation function
                runFunction("getPlayerLocation", [_playerName]).then(function(result4){

                    // Display fish data and set background image
                    displayFishData(out).then(function(r){
                        for (let i = 0; i < 6; i++) {
                            const shopButton = document.getElementById('itemBox' + i.toString());

                            // Add event listener to each shop button
                            if (shopButton) {
                                shopButton.addEventListener('mousedown', (function(){
                                    if (shopFocus !== shopButton.value){
                                        shopFocus = shopButton.value;
                                        console.log(shopButton.value);
                                        runFunction('getItemInfo', [shopFocus]).then(function(desc){
                                            document.getElementById("itemDescName").innerHTML = desc["name"];
                                            document.getElementById("itemPrice").innerHTML = "Price: " + desc["price"];
                                            document.getElementById("itemDescText").innerHTML = desc["description"];
                                        });
                                    }
                                    else{
                                        runFunction('shopBuy', [_playerName, shopFocus]).then(function(buyResult) {

                                            stringBroken = !(buyResult["line"] || buyResult["bait"]);
                                            updateMoney();
                                        });
                                    }
                                }));
                            }
                        }

                        // Set background image based on player location
                        setBgImage(result4["imageLink"]);
                    });
                });
            });
        });
    });
});

/*----End of map button function----*/