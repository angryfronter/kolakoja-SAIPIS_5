let tempData = JSON.parse(localStorage['tableValues']);

printTable('tableD', tempData);

function printTable(tableID,data)
{
    console.log(data);

    data.forEach(element => {
        var tableRef = document.getElementById(tableID);
        var newRow = tableRef.insertRow(-1);

        var newCell = newRow.insertCell(0);
        var newText = document.createTextNode(element.name);
        newCell.appendChild(newText);

        newCell = newRow.insertCell(1);
        newText = document.createTextNode(element.birthDate);
        newCell.appendChild(newText);

        newCell = newRow.insertCell(2);
        var resultTroubles="";
        if (element.troubles.length==0)
        {
            resultTroubles="Отсутствуют";
        }
        else
        {
            for(var i=0;i<element.troubles.length;i++)
            {
                if(i==0){
                    resultTroubles=resultTroubles + " " + element.troubles[i];
                }
                else{
                resultTroubles=resultTroubles + "; " + element.troubles[i];
                }
            }
        }
        newText = document.createTextNode(resultTroubles);
        newCell.appendChild(newText);

        newCell = newRow.insertCell(3);
        newText = document.createTextNode(element.studyForm);
        newCell.appendChild(newText);

        newCell = newRow.insertCell(4);
        newText = document.createTextNode(element.faculty);
        newCell.appendChild(newText);

        newCell = newRow.insertCell(5);
        newText = document.createTextNode(element.course);
        newCell.appendChild(newText);

        newCell = newRow.insertCell(6);
        newText = document.createTextNode(element.email);
        newCell.appendChild(newText);

        
    });
}


var sel = document.getElementById("nam");

let storedData = JSON.parse(localStorage['tableValues']);
tempData.forEach(element => {
    var opt = document.createElement("OPTION");
    opt.setAttribute("value", element.name);
    document.getElementById("nam").appendChild(opt);
});

function resetClick(){
    var users=[]; 
    localStorage.setItem('tableValues',JSON.stringify(users));
    location.reload();
}