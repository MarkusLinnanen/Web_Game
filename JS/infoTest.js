function runPyScript(input){
    let jqXHR = $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3000/login",
        async: false,
        data: { mydata: input }
    });

    return jqXHR.responseText;
}

$('#submitbutton').click(function(){
    datatosend = 'this is my matrix';
    result = runPyScript(datatosend);
    console.log('Got back ' + result);
});
