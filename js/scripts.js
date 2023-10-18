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

// Functions
function createTable(data){
    data.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("table-data");

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

// Inicialization
createTable(imcData);


// Events
