'use strict';
async function setPlayerInfo(input){

}

async function getPlayerInfo(){

}
async function playerLogin(){
    var ret = 0;
    try {
        //const ipResponse = await fetch("https://api.ipify.org?format=json");    // starting data download, fetch returns a promise which contains an object of type 'response'
        //if (!ipResponse.ok) throw new Error('IP not Got!');
        //const jsonData = await ipResponse.json();
        const data  = {
            body: JSON.stringify({name: 5}),
            method: 'POST',
            headers:{
                'Access-Control-Allow-Origin' : '*'
            },
        }
        try{
            const dataResponse = await fetch('http://127.0.0.1:3000/login', data);
            if (!dataResponse.ok) throw new Error('Player not posted!');
            const json = await dataResponse.json();
            console.log('result', json);
        }
        catch (err){
            console.log("error", err)
        }
    }
    catch(e){
        console.log("error", e)
    }
    return ret;
}
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

    const result = await response.json();
    console.log(result);
    return result;
}

const playerID = runFunction("login", ["david"]);

//    // ... prevent the default action.
//     evt.preventDefault();
//     // create an object 'data' to which user input from the form is added and the http method is set to POST
//     const data = {
//         body: JSON.stringify({
//             fname: document.querySelector('input[name=fName]').value,
//             lname: document.querySelector('input[name=lName]').value
//         }),
//         method: 'POST',
//         headers: {
//               'Content-type': 'application/json',
//         },
//     }
//     // send the data
//    try {
//       const response = await fetch('/someAddressWhereDataIsSent', data);  // Send data to server and receive a server response
//       if (!response.ok) throw new Error('Invalid input!');         // If an error occurs, an error message is thrown
//       const json = await response.json();                                 // convert the loaded text JSON to a JavaScript object / array
//       console.log('result', json);                                        // print the result to the console
//    } catch (e) {
//       console.log('error', e);
//    }
//