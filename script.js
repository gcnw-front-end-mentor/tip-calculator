let outputTip = document.getElementById('outputTip');
let outputTotal = document.getElementById('outputTotal');
let billBorder = document.getElementById('billTotal');
let peopleBorder = document.getElementById('peopleTotal');
const validInput = /\d{1,9}\.{0,1}\d{0,2}/;
const validationMessage = document.getElementById('validationMessage');
const resetButton = document.getElementById('resetButton');
const customButton = document.getElementById('customNumber');

let lastSelection = null;
let buttonArray = ['percent05','percent10','percent15','percent25','percent50','customNumber','resetButton'];
let buttonNodes = [];
buttonArray.forEach(element => buttonNodes.push(document.getElementById(element)));

function appResponse(selection){
    // RESET ELEMENTS BEFORE REDRAWING CURRENT STATE
    console.log(selection);
    billBorder.style.border='';
    peopleBorder.style.border='';
    validationMessage.style.display = '';
    validationMessage.innerHTML = '';
    buttonNodes.forEach(element => element.style.backgroundColor='');
    buttonNodes.forEach(element => element.style.color='');
    let tipPercent = (selection.currentTarget == customButton)
        ? customButton.value
        : parseInt(selection.target.id.substring(7));
    let billAmount = parseInt(document.getElementById('billAmount').value);
    let numPeople = parseInt(document.getElementById('numPeople').value);
    console.log(billAmount + " | " + validInput.test(billAmount));
    if(lastSelection == null){
        lastSelection == selection.currentTarget;
    }
    else {
        lastSelection.style.backgroundColor = '';
        lastSelection.currentTarget.style.color = '';
    }
    //VALIDATE INPUT
    if(selection.currentTarget == resetButton){
        Array.from(document.getElementsByClassName('textField')).forEach(element => element.value = '0');
        customButton.value='Custom';
        outputTip.innerHTML = '$0.00';
        outputTotal.innerHTML = '$0.00';
        billBorder.style.border='';
        peopleBorder.style.border='';
    }
    else if(selection.currentTarget == customButton && (!customButton.value)){

    }
    else {
        peopleBorder.style.border='2px solid #26C2AE';
        billBorder.style.border='2px solid #26C2AE';
        if(!billAmount){
            billBorder.style.border='2px solid #E17457'; 
            validationMessage.style.display = 'block';
            validationMessage.innerHTML = 'Can\'t be zero';
        } 
        if(!numPeople){
            peopleBorder.style.border='2px solid #E17457'; 
            validationMessage.style.display = 'block';
            validationMessage.innerHTML = 'Can\'t be zero';
        }
        if(!validInput.test(billAmount)){
            validationMessage.innerHTML = 'Numeric Input Only!';
            billBorder.style.border='2px solid #E17457'; 
            validationMessage.style.display = 'block';
         }
        
        if(!validInput.test(numPeople)) {
            validationMessage.innerHTML = 'Numeric Input Only!';
            peopleBorder.style.border='2px solid #E17457'; 
            validationMessage.style.display = 'block';
        }
        if(validInput.test(billAmount) && validInput.test(numPeople)
            && numPeople != 0 && billAmount != 0) {
            let tipTotal = tipPercent*billAmount/100;
            selection.currentTarget.style.backgroundColor = '#26C2AE';
            selection.currentTarget.style.color = '#00474B';
            outputTip.innerHTML = '$' + (tipTotal/numPeople).toFixed(2);
            outputTotal.innerHTML = '$' + ((billAmount + tipTotal)/numPeople).toFixed(2);
        }
    }
}


customButton.addEventListener("keypress",(event)=>{
    if(event.key === 'Enter'){
        event.preventDefault();
        customButton.click();
    }});

console.log(buttonArray);
buttonNodes.forEach(element => element.addEventListener('click', appResponse));
