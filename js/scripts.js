// IMC DATA
const imcData = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesityDegree: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesityDegree: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Pré-Obeso",
      obesityDegree: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesityDegree: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesityDegree: "III",
    },
  ];

// Select elements

const imcTable = document.querySelector("#imc-table");
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");
const backBtn = document.querySelector("#back-btn");

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");

const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

// Functions
function createTable(data){
    data.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("table-data");
        
        let text = `${item.info}`;
        const divId = text.replace(/[^a-zA-Z0-9-]/g, "");
        div.setAttribute("id", divId);

        const classification = document.createElement("p");
        classification.innerText = item.classification;

        const info = document.createElement("p");
        info.innerText = item.info;
        
        const obesityDegree = document.createElement("p");
        obesityDegree.innerText = item.obesityDegree;

        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesityDegree);

        imcTable.appendChild(div);
    });
}

function clearInputs() {
    heightInput.value = "";
    weightInput.value = "";
    imcNumber.classList = "";
    imcInfo.classList = "";
}

function inputValidator(text) {
    return text.replace(/[^0-9,]/g, "");
}

function imcCalc(weight, height) {
    const imc = (weight / (height * height)).toFixed(1);
    return imc;
}

function showOrHideResults(){
  calcContainer.classList.toggle("hide");
  resultContainer.classList.toggle("hide");
}

function clearState(){
  const selectedLines = document.getElementsByClassName("table-data-result-line");
  
  while (selectedLines.length) {
    selectedLines[0].classList.remove("table-data-result-line");
  }
}

function formatVisualInfo(info) {

  let text = `${info}`;
  const divId = text.replace(/[^a-zA-Z0-9-]/g, "");

  const lineToColor = document.querySelector(`#${divId}`);
  lineToColor.classList.add("table-data-result-line");

  switch(info){
    case "Magreza":{
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
    }
    case "Pré-Obeso":{
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    }
    case "Normal":{
      imcNumber.classList.add("good");
      imcInfo.classList.add("good");
      break;
    }   
    case "Obesidade":{
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;
    }
    case "Obesidade grave":{
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;
    }
    
  }
}


// Inicialization
createTable(imcData);

// Events
calcBtn.addEventListener("click", (e) => {
    e.preventDefault(); //to avoid form submit
  
    //convert text to number and replace , to .
    const weight = +weightInput.value.replace(",", ".");
    const height = +heightInput.value.replace(",", ".");

    if(!weight || !height) return;

    const imc = imcCalc(weight, height);

    let info;

    imcData.forEach((item) => {
      if(imc >= item.min && imc <= item.max){
        info = item.info;
        
      }
    });
    
    //users entered crazy values !!!
    if(!info) return;
    
    imcNumber.innerText = imc;
    imcInfo.innerText = info;

    formatVisualInfo(info);

    showOrHideResults();
});


clearBtn.addEventListener("click", (e) => {
    e.preventDefault(); //to avoid form submit
    clearInputs();
});

backBtn.addEventListener("click", () => {
  clearInputs();
  showOrHideResults();
  clearState();
});

//addEventListener to more than one element
[heightInput, weightInput].forEach((elem) => {
    elem.addEventListener("blur", (e) => { 
        const validatorResult =  inputValidator(e.target.value);
        e.target.value = validatorResult;
     }); 
});
    



