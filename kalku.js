alert('Anda sedang menggunakan fitur kalkulator sederhana saya');

const kalkulator = {
    displayNumber : '0',
    operator : null,
    firstNumber : null,
    waitingForSecondNumber : false
};

function clearKalkulator(){
    kalkulator.displayNumber = '0';
    kalkulator.operator = null;
    kalkulator.firstNumber = null;
    kalkulator.waitingForSecondNumber = false;
}

function updateDisplay(){
    document.querySelector("#tampilkanNomor").innerText = kalkulator.displayNumber;
}

function inversNumber(){
    if(kalkulator.displayNumber === '0'){
        return;
    }
    kalkulator.displayNumber = kalkulator.displayNumber * -1;
}

function decimal(){
    if(kalkulator.displayNumber === '0'){
        return;
    }
    kalkulator.displayNumber = parseFloat(kalkulator.displayNumber) / 10;
}

function handleOperator(operator){
    if(!kalkulator.waitingForSecondNumber){
        kalkulator.operator = operator;
        kalkulator.waitingForSecondNumber = true;
        kalkulator.firstNumber = kalkulator.displayNumber;
    } else{
        alert('Operator nya udah dipilih tadi');
    }
}

function inputDigit(digit){
    if(kalkulator.waitingForSecondNumber && kalkulator.firstNumber === kalkulator.displayNumber){
        kalkulator.displayNumber = digit;
    } else{
        if(kalkulator.displayNumber === '0'){
            kalkulator.displayNumber = digit;
        }
        else{
            kalkulator.displayNumber += digit;
        }
    }
}

function performCalculation(){
    if(kalkulator.firstNumber == null || kalkulator.operator == null){
        alert('Anda belum menetapkan operator yang akan digunakan');
        return;
    }
    
    let result = 0;
    if(kalkulator.operator === "%"){
        result = parseFloat(kalkulator.firstNumber) % parseFloat(kalkulator.displayNumber);
    } 
    
    if(kalkulator.operator === ":"){
       result = parseFloat(kalkulator.firstNumber) / parseFloat(kalkulator.displayNumber);
    } 
    
    if(kalkulator.operator === "X"){
        result = parseFloat(kalkulator.firstNumber) * parseFloat(kalkulator.displayNumber);
    } 
    
    if(kalkulator.operator === "-"){
        result = parseFloat(kalkulator.firstNumber) - parseFloat(kalkulator.displayNumber);
    } 
    
    if(kalkulator.operator === "+"){
        result = parseFloat(kalkulator.firstNumber) + parseFloat(kalkulator.displayNumber);
    }

    kalkulator.displayNumber = result;
}

const buttons = document.querySelectorAll('.button');

for(let button of buttons){
    button.addEventListener('click', function(e){
        const pilihan = e.target;

        if(pilihan.classList.contains('bersihkan')){
            clearKalkulator();
            updateDisplay();
            return;
        }

        if(pilihan.classList.contains('negatip')){
            inversNumber();
            updateDisplay();
            return;
        }

        if(pilihan.classList.contains('koma')){
            decimal();
            updateDisplay();
            return;
        }

        if(pilihan.classList.contains('samadengan')){
            performCalculation();
            updateDisplay();
            return;
        }

        if(pilihan.classList.contains('operator')){
            handleOperator(pilihan.innerText);
            updateDisplay();
            return;
        }

        inputDigit(pilihan.innerText);
        updateDisplay();
    });
}
