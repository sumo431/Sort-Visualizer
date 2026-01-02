const container = document.getElementById("array-container");
const generateBtn = document.getElementById("generate");
const sizeInput = document.getElementById("size");
const sortBtn = document.getElementById("sort");
const algorithmSelect = document.getElementById("algorithm");
const speedInput = document.getElementById("speed");

let array = [];

// 配列生成
function generateArray() {
  container.innerHTML = "";
  array = [];
  const size = parseInt(sizeInput.value);
  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 250) + 20;
    array.push(value);
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value}px`;
    container.appendChild(bar);
  }
}

// Sleep関数
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort 可視化
async function bubbleSort() {
  const bars = document.getElementsByClassName("bar");
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";

      const speed = 1000 - parseInt(speedInput.value);
      await sleep(speed);

      if(array[j] > array[j+1]){
        [array[j], array[j+1]] = [array[j+1], array[j]];
        bars[j].style.height = `${array[j]}px`;
        bars[j+1].style.height = `${array[j+1]}px`;
        await sleep(speed);
      }

      bars[j].style.backgroundColor = "steelblue";
      bars[j+1].style.backgroundColor = "steelblue";
    }
    bars[n - i - 1].style.backgroundColor = "green";
  }
  if(bars[0]) bars[0].style.backgroundColor = "green";
}

// Selection Sort 可視化
async function selectionSort() {
  const bars = document.getElementsByClassName("bar");
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    bars[minIdx].style.backgroundColor = "red";

    for (let j = i + 1; j < n; j++) {
      bars[j].style.backgroundColor = "yellow";
      const speed = 1000 - parseInt(speedInput.value);
      await sleep(speed);

      if(array[j] < array[minIdx]){
        if(minIdx !== i) bars[minIdx].style.backgroundColor = "steelblue";
        minIdx = j;
        bars[minIdx].style.backgroundColor = "red";
      } else {
        bars[j].style.backgroundColor = "steelblue";
      }
    }

    if(minIdx !== i){
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[minIdx].style.height = `${array[minIdx]}px`;
    }
    bars[i].style.backgroundColor = "green";
  }
  bars[n - 1].style.backgroundColor = "green";
}


async function insertionSort() {
  const bars = document.getElementsByClassName("bar");
  const n = array.length;

  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    bars[i].style.backgroundColor = "red";
    const speed = 1000 - parseInt(speedInput.value);
    await sleep(speed);

    while(j >= 0 && array[j] > key){
      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j + 1]}px`;
      bars[j].style.backgroundColor = "red";
      await sleep(speed);
      bars[j].style.backgroundColor = "steelblue";
      j--;
    }
    array[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;
    bars[i].style.backgroundColor = "steelblue";
  }

  for(let k=0;k<n;k++){
    bars[k].style.backgroundColor = "green";
  }
}

// ボタンイベント
generateBtn.addEventListener("click", generateArray);

sortBtn.addEventListener("click", () => {
  const algo = algorithmSelect.value;
  switch(algo){
    case "bubble":
      bubbleSort();
      break;
    case "selection":
      selectionSort();
      break;
    case "insertion":
      insertionSort();
      break;
  }
});

generateArray();
