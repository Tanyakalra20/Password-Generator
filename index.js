const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
let passwordLength = 10;
let checkCount = 0;
function fisherYatesShuffle(arr){
    for(let i=arr.length-1;i>0;i--)
    {
        let j = Math.floor(Math.random()*(i+1));
       [ arr[i],arr[j]] = [arr[j],arr[i]];
    }
    let str = "";
    arr.forEach((el) => (str += el));
    return str;
}
function handleSlider() 
{
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
};
handleSlider();
// strength indicator
const indicator = document.querySelector("[data-indicator]");
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0, 0px ,12px ,1px, ${color};`
}
setIndicator();
function getRndInteger(min,max){
       return Math.floor(Math.random()*(max-min))+min;
}
function generateNumber(){
    return getRndInteger(1,9); //we used the getRndInteger 
}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}
function generatLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}
//creating a string that contains symbols
const symbols = '!@#$%^&*()_-+=}{|\;:"/><`~.,';
function generateSymbol(){
    const randNum = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}
//to calculate the strength of passwordLength
const checkUppercase = document.querySelector('#uppercase');
const checkLowercase = document.querySelector('#lowercase');
const checkNumbers = document.querySelector('#numbers');
const checkSymbols = document.querySelector('#symbols');
function calculateStrength(){
let hasUpper = false;
let hasLower = false;
let hasNum = false;
let hasSymb = false;
if(checkUppercase.checked) hasUpper = true;
if(checkLowercase.checked) hasLower = true;
if(checkNumbers.checked) hasNum = true;
if(checkSymbols.checked) hasSymb = true;
if(hasUpper && hasLower && (hasNum || hasSymb) && passwordLength >= 10){
    setIndicator("#0f0");
}
else if((hasLower || hasUpper) && hasNum && hasSymb && passwordLength >=8){
    setIndicator("#ff0");
}
else{
    setIndicator("#f00");
}
}
//copyText to clipboard
const passwordDisplay = document.querySelector("[data-passwordDisplay]") ;
const copyMsg = document.querySelector("[data-copyMsg]");
const copyBtn = document.querySelector("[data-copy]");
async function copyToClipboard(){
    try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
    }
    catch(err){
        copyMsg.innerText = "failed";
    }
    //add css class to make span visible and to remove that
    // To make copy span visible
    copyMsg.classList.add("active");

    // To remove capied message afetr 2 second
    setTimeout(() => {
        copyMsg.classList.remove("active")
    }, 2000);
}
//adding listener to inputSlider
inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();// called the function
});
//adding listener to copyBtn
copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyToClipboard();
});
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
function handleCheckBox(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) => 
    {
        if(checkbox.checked)
            checkCount++;
    });

}
allCheckBox.forEach((checkbox) => {
checkbox.addEventListener('change', handleCheckBox);
});
//generate button function
let password = "";
const genButton = document.querySelector('.generateButton');
genButton.addEventListener('click', () =>
{
    //none of checkbox is slected
    if(checkCount = 0) return;
    // if only 1 or 2 checkboxes are checked
   if(passwordLength <= checkCount)
     {
     passwordLength =  checkCount;
     handleSlider();
     }
     //now find new password
     //remove the old one 
     password = "";
     let funcArr = [];
     if(checkUppercase.checked){
        funcArr.push(generateUpperCase);
     }
     if(checkLowercase.checked){
        funcArr.push(generatLowerCase);
     }
     if(checkNumbers.checked){
        funcArr.push(generateNumber);
     }
     if(checkSymbols.checked){
        funcArr.push(generateSymbol);
     }
     //compulsory addition
     for(let i=0; i<funcArr.length;i++){
        password += funcArr[i]();
     }
     //remaining one
     for(let i=0; i<passwordLength-funcArr.length;i++){
        let randIndex = getRndInteger(0,funcArr.length);
        password += funcArr[randIndex]();
     }
     //shuffling the password
     password = fisherYatesShuffle(Array.from(password));
     passwordDisplay.value = password;
        calculateStrength();
});
