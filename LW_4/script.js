const   btn_reset=document.querySelector("#inact"),
        btn_act=document.querySelector("#act"),
        texts=document.querySelectorAll("#text"),
        btn2=document.querySelector("#btn2"),
        btn3=document.querySelector("#btn3"),
        new_input=document.createElement("input");

new_input.classList.add("margin");
Data = new Date();

let color1, color2, color3, color4,
text1,text2,text3,text4;

btn_reset.addEventListener("click", () => {
    texts.forEach(item => {
        item.disabled=true;
    })
    
})

btn_act.addEventListener("click", (event) => {
    texts.forEach(item => {
        item.disabled=false;
    })
    event.preventDefault();
    
})

function changeTextColor1() {
    color1 = document.querySelector("#color1").value;
    console.log(color1);
}


function changeTextColor2() {
    color2 = document.querySelector("#color2").value;
    console.log(color2);
}


function changeTextColor3() {
    color3=document.querySelector("#color3").value;   
    console.log(color3);
}


function changeTextColor4() {
    color4=document.querySelector("#color4").value;   
    console.log(color4);  
}

function changeColorText1() {
    color1 = color;
    document.querySelector(".text1").style.color = color;
}


btn2.addEventListener("click", (event) => {
    text1=document.querySelector(".text1");
    console.log(text1.value);
    text1.style.color=color1;

    text2=document.querySelector(".text2");
    console.log(text2.value);
    text2.style.color=color2;

    text3=document.querySelector(".text3");
    console.log(text3.value);
    text3.style.color=color3;

    text4=document.querySelector(".text4");
    console.log(text4.value);
    text4.style.color=color4;
    

    document.getElementById("textar").value=`${text1.value}, ${text2.value}, ${text3.value}`;
    



    event.preventDefault();
})


btn3.addEventListener("click", (event) => {
    texts[0].after(new_input);
    text4=document.querySelector(".text4");
    text4.style.color=color4;
    
    new_input.value=`${text4.value} ${Data}`;
    new_input.style.color=color4;
    
    

    event.preventDefault();
})

