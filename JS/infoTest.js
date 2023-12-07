'use strict';
async function setPlayerInfo(input){
    return await $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3000/playerInfo",
        async: true,
        data: { mydata: input }
    });
}

async function getPlayerInfo(){
    return await $.ajax({
        type: "GET",
        url: "http://127.0.0.1:3000/playerInfo",
        async: true
    });
}
async function playerLogin(){
    const response = await fetch("https://api.ipify.org?format=json");    // starting data download, fetch returns a promise which contains an object of type 'response'
    const jsonData = await response.json();
    console.log(jsonData.ip);
    await $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3000/login",
        async: true,
        data: { mydata: jsonData.ip}
    });
    return "done";
}

$('#submitbutton').click( async function(){
    const inf = await playerLogin();
    let datatosend = await getPlayerInfo();
    console.log(datatosend)
    let result = await setPlayerInfo(datatosend);
    //console.log(result);
});
