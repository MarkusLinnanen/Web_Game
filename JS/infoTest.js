'use strict';

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

function mapClick(countryName){
    const res = runFunction("updateLocation", [countryName])
    console.log(res)
}