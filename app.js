const cardholder_input = document.getElementById("name-input");
const cardnumber_input = document.getElementById("card-number-input");
const month_input = document.getElementById("date-month-input");
const year_input = document.getElementById("date-year-input");
const CVC_input = document.getElementById("CVC-input");

const CVC_output = document.getElementById("CVC");
const cardholder_output = document.getElementById("cardholder-name");
const cardnumber_output = document.getElementById("card-number");
const EXP_output = document.getElementById("exp-date");

cardholder_input.addEventListener("input", () => {
    let value = cardholder_input.value.trim();
    if(value !== ""){
        cardholder_output.textContent = value.toUpperCase();
    }else{
        cardholder_output.textContent = "JANE APPLESEED";
        cardholder_input.value = "";
    }
});

function cardNumFormat(str){
    let temp = str.padEnd(16, '0');
    let result = "";
    for(let i = 1; i <= temp.length; i++){
        result += temp[i - 1];
        if(i % 4 === 0 && i !== temp.length)
            result += ' ';
    }
    return result;
}
cardnumber_input.addEventListener("input", () => {
    let value = cardnumber_input.value.trim();
    let valueInStr = '';
    let formattedValue = '';
    for(let i = 0; i < value.length; i++){
        if(value[i] === " ")
            continue;
        valueInStr += value[i];
    }

    for(let i = 0; i < valueInStr.length; i++){
        if(i > 0 && i % 4 === 0){
            formattedValue += ' ';
        }
        formattedValue += valueInStr[i];
    }

    cardnumber_input.value = formattedValue;
    cardnumber_output.textContent = cardNumFormat(valueInStr);
});

const numbers = '0123456789';
month_input.addEventListener("input", () => {
    let value = month_input.value;
    let date = EXP_output.textContent.slice(2, 5);
    if(value !== "" && !numbers.includes(value[value.length - 1])){
        month_input.value = value.slice(0, -1);
    }else if(value !== ""){
        EXP_output.textContent = (value.length == 1 ? `0${value}` : value) + date;
    }else{
        EXP_output.textContent = "00" + date;
    }
});

year_input.addEventListener("input", () => {
    let value = year_input.value;
    let date = EXP_output.textContent.slice(0, 3);
    if(value !== "" && !numbers.includes(value[value.length - 1])){
        year_input.value = value.slice(0, -1);
    }else if(value !== ""){
        EXP_output.textContent = date + (value.length == 1 ? `0${value}` : value);
    }else{
        EXP_output.textContent = date + "00";
    }
});

CVC_input.addEventListener("input", () => {
    let value = CVC_input.value;
    if(value !== "" && !numbers.includes(value[value.length - 1])){
        CVC_input.value = value.slice(0, -1);
    }else if(value !== ""){
        CVC_output.textContent = (value.length == 1 ? `00${value}` : (value.length == 2 ? `0${value}` : value));
    }else{
        CVC_output.textContent = "000";
    }
});


const cardholder_error = document.getElementById("cardholder-error");
const cardnumber_error = document.getElementById("cardnumber-error");
const date_error = document.getElementById("date-error");
const CVC_error = document.getElementById("CVC-error");

function Confirm(){
    let proceed = true;

    if(cardholder_input.value.trim().length < 5){
        cardholder_error.textContent = "Too short";
        cardholder_input.style.border = "1px solid #FF5050";
        proceed = false;
    }
    if(cardholder_input.value.trim() === ""){
        cardholder_error.textContent = "Can't be blank";
        cardholder_input.style.border = "1px solid #FF5050";
        proceed = false;
    }
    for(let i = 0; i < numbers.length; i++){
        if(cardholder_input.value.includes(numbers[i])){
            cardholder_error.textContent = "Numbers aren't allowed";
            cardholder_input.style.border = "1px solid #FF5050";
            proceed = false;
            break;
        }
    }

    let card_value = cardnumber_input.value.split(' ').join('');
    if(card_value == ""){
        cardnumber_error.textContent = "Can't be blank";
        cardnumber_input.style.border = "1px solid #FF5050";
        proceed = false;
    }else if(card_value.length < 16){
        cardnumber_error.textContent = "Please fill number";
        cardnumber_input.style.border = "1px solid #FF5050";
        proceed = false;
    }else if(isNaN(Number(card_value))){
        cardnumber_error.textContent = "Wrong format, numbers only";
        cardnumber_input.style.border = "1px solid #FF5050";
        proceed = false;
    }

    if(month_input.value == "" || year_input.value == ""){
        date_error.textContent = "Can't be blank";
        if(month_input.value == ""){
            month_input.style.border = "1px solid #FF5050";
        }
        if(year_input.value == ""){
            year_input.style.border = "1px solid #FF5050";
        }
        proceed = false;
    }else if(Number(month_input.value) == 0 || Number(month_input.value) > 12){
        month_input.style.border = "1px solid #FF5050";
        date_error.textContent = "Invalid month entered";
        proceed = false;
    }else{
        let month = Number(month_input.value);
        let year = Number("20" + (year_input.value.length == 1 ? '0' : '') + year_input.value);
        let exp_date = new Date(year, month);
        let dateNow = new Date();
        if(exp_date < dateNow){
            month_input.style.border = "1px solid #FF5050";
            year_input.style.border = "1px solid #FF5050";
            date_error.textContent = "Card is expired";
            proceed = false;
        }
    }

    if(CVC_input.value == ""){
        CVC_input.style.border = "1px solid #FF5050";
        CVC_error.textContent = "Can't be blank";
        proceed = false;
    }else if(CVC_input.value.length < 3){
        CVC_input.style.border = "1px solid #FF5050";
        CVC_error.textContent = "Please fill CVC";
        proceed = false;
    }

    if(proceed){
        document.querySelector(".cards-inputs-div").style.display = "none";
        document.querySelector(".complete").style.display = "flex";
    }
}

function change1(){
    cardholder_input.style.border = "1px solid #DFDEE0";
    cardholder_error.textContent = "";
}
function change2(){
    cardnumber_input.style.border = "1px solid #DFDEE0";
    cardnumber_error.textContent = "";
}
function change3(){
    month_input.style.border = "1px solid #DFDEE0";
    date_error.textContent = "";
}
function change4(){
    year_input.style.border = "1px solid #DFDEE0";
    date_error.textContent = "";
}
function change5(){
    CVC_input.style.border = "1px solid #DFDEE0";
    CVC_error.textContent = "";
}