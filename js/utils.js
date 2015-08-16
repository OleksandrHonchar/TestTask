function getJSON(dataFile, callback) {
    var httpRequest = new XMLHttpRequest();
    try {
        // Opera 8.0+, Firefox, Chrome, Safari
        httpRequest = new XMLHttpRequest();
    } catch (e) {
        // Internet Explorer Browsers
        try {
            httpRequest = new ActiveXObject('Msxml2.XMLHTTP');
        } catch (e) {
            try {
                httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
            } catch (e) {
                // Something went wrong
                alert('Your browser broke!');
                return false;
            }
        }
    }
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            callback(httpRequest.responseText);
        }
    };
    httpRequest.open('GET', dataFile, true);
    httpRequest.send();
}
