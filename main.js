function createDataElement(dataObjOverride) {
    var brElement = document.createElement('br');

    if (!dataObjOverride) {
        var objIndex = arrayOfData.length.toString();
        dataObjOverride = {};
        dataObjOverride['dataParam' + objIndex + '01'] = '';
        dataObjOverride['dataParam' + objIndex + '02'] = '';
        arrayOfData.push(dataObjOverride);
    }

    Object.keys(dataObjOverride).forEach(function(key) {
        var input = document.createElement('input');
        input.id = key;
        input.value = dataObjOverride[key];
        input.onchange = generateFile;
        dataWrapper.appendChild(input);
    });

    dataWrapper.appendChild(brElement);
}

function generateFile() {
    if (!arrayOfData.length) return alert('Please fill in some data!');

    arrayOfData.forEach(function(dataObj) {
        Object.keys(dataObj).forEach(function(key) {
            dataObj[key] = document.getElementById(key).value;
        })
    });

    var downloadElement = document.getElementById('downloadLink');
    downloadElement.href = "data:application/octet-stream," + encodeURIComponent(JSON.stringify(arrayOfData));
}

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'kewlFiel.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function init() {
    loadJSON(function(response) {
        window.arrayOfData = JSON.parse(response);

        if (arrayOfData.length) {
            arrayOfData.forEach(function(dataObj) {
                createDataElement(dataObj)
            });
        }
    });

    setTimeout(function() {
        window.dataWrapper = document.getElementById('dataWrapper');
    }, 500);
}

init();