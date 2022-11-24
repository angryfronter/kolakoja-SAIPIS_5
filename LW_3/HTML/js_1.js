document.getElementById("stud").addEventListener("submit", function (event) {
    sendClick(event)
})

var storedData=null;

function sendClick(e)
{

    e.preventDefault();
    
    var name=document.getElementById("intx").value;
    var birthDate=document.getElementById("inwe").value;
    
    var troubles=Array();
    var troublesCheckBoxes=document.body.getElementsByClassName("req");
    for(var i=0;i<troublesCheckBoxes.length;i++)
    {
        if (troublesCheckBoxes[i].checked)
        {
            troubles.push(troublesCheckBoxes[i].value);
        }
    }

    var studyForm=document.getElementById("inse").value;
    
    
    var faculties=document.body.getElementsByClassName("rad_");
    var faculty="";
    for(var i=0;i<faculties.length;i++)
    {
        if (faculties[i].checked)
        {
            faculty=faculties[i].value;
            break;
        }
    }

    var course=document.getElementById("innum").value;
    var email=document.getElementById("inem").value;

    const obj=
    {
        name: name,
        birthDate: birthDate,
        troubles: troubles,
        studyForm: studyForm,
        faculty: faculty,
        course: course,
        email: email
    };

     if (!localStorage.getItem("tableValues"))
     {
        var users=[]; 
        localStorage.setItem('tableValues',JSON.stringify(users));
     }
    var data=[];
     var data=JSON.parse(localStorage.getItem("tableValues"));
     if (data==null)
     {
        data=[];
     }
     data.push(obj);
     localStorage.setItem('tableValues',JSON.stringify(data));
     storedData=JSON.parse(localStorage['tableValues']);
     var modal=document.getElementById("myModal");
     
     modal.style.display="block";
     printTable('tableM',JSON.parse(localStorage['tableValues']));
}

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

var cross = document.body.getElementsByClassName("close")[0];

cross.onclick = function (){
    var modal=document.getElementById("myModal");
    modal.style.display="none";
}

window.onclick = function (event) {
    var modal=document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var btn = document.getElementById("myBtn");

// Когда пользователь нажимает на кнопку, откройте модальный
btn.onclick = function() {
    var modal=document.getElementById("myModal");
  modal.style.display = "block";
}