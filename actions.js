function changeRowsNum() {
    var table = document.getElementById('table-id').getElementsByTagName('tbody')[0];

    var currRowsNum = table.rows.length;
    var newRowsNum = document.getElementById('points-number-id').value;
    var rowsCount = newRowsNum - currRowsNum + 1;

    if (newRowsNum <= 0 || isNaN(newRowsNum))  {
        alert("Incorrect number of points!");
        return;
    }

    if(rowsCount >= 0) {
        for (var i = 0; i < rowsCount; i++) {
            var newTableRow = document.createElement('tr');

            for (var j = 0; j < 2; j++) {
                var tableData = document.createElement('td');
                var inputData = document.createElement('input');

                inputData.setAttribute('type', 'text');
                inputData.setAttribute('style', 'width: 25px; height: 25px; border: none;');

                tableData.appendChild(inputData);
                newTableRow.appendChild(tableData);
            }

            table.appendChild(newTableRow);
        }
    }
    else
    {
        var rowsCount = Math.abs(rowsCount);

        for (var i = 0; i < rowsCount; i++) {
            table.deleteRow(rowsCount - i);
        }
    }
}

function getCoordinatesValues() {
    var tableWithCoords = document.getElementById('table-id');

    var data = [];

    var currX;
    var currY;

    for (var i = 1; i < tableWithCoords.rows.length; i++) {
        currX = tableWithCoords.rows[i].cells[0].children[0].value;
        currY = tableWithCoords.rows[i].cells[1].children[0].value;

        if (isNaN(currY) ||
            isNaN(currX) ||
            (currX === "" || currY === "")) {
                throw new Error('Wrong values');
        }

        data.push(currX, currY);
    }

    return data;
}

function drawCurve() {
    try {
        pointsData = getCoordinatesValues();
    }
    catch(error) {
        alert(error.stack);
        return;
    }

    var x = [];
    var y = [];

    var pointsNum = pointsData.length;

    for (var i = 0; i < pointsNum; i++) {
        x[i] = pointsData.shift();
        y[i] = pointsData.shift();
    }

    var line = [{
        x: x,
        y: y,
        marker: {
            symbol: 'diamond',
            color: 'red'
        },
        line: {
            color: 'blue'
        },
        type: 'scatter'
    }];

    Plotly.newPlot('line-div-id', line);
    console.log(x, y);
}

function clearCanvas() {
    document.getElementById('line-div-id').innerHTML = "";
    Plotly.deleteTraces('line-div-id', 0);
}