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

        var newCell = newRow.insertCell(1);
        var newText = document.createTextNode(element.lastname);
        newCell.appendChild(newText);

        newCell = newRow.insertCell(2);
        var resultModel="";
        if (element.model.length==0)
        {
            resultModel="Отсутствуют";
        }
        else
        {
            for(var i=0;i<element.model.length;i++)
            {
                if(i==0){
                    resultModel=resultModel + " " + element.model[i];
                }
                else{
                resultModel=resultModel + "; " + element.model[i];
                }
            }
        }
        newText = document.createTextNode(resultModel);
        newCell.appendChild(newText);

        newCell = newRow.insertCell(3);
        newText = document.createTextNode(element.operative);
        newCell.appendChild(newText);

        newCell = newRow.insertCell(4);
        newText = document.createTextNode(element.quality);
        newCell.appendChild(newText);

        newCell = newRow.insertCell(5);
        newText = document.createTextNode(element.email);
        newCell.appendChild(newText);

        newCell = newRow.insertCell(6);
        newText = document.createTextNode(element.comment);
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