const container = document.getElementById("array-container");
const generateBtn = document.getElementById("generate");
const sizeInput = document.getElementById("size");
const sortBtn = document.getElementById("sort");
const algorithmSelect = document.getElementById("algorithm");
const speedInput = document.getElementById("speed");

let array = [];

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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


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

function getSpeed() {
  return 1000 - parseInt(speedInput.value);
}

async function mergeSort(start, end) {
  if (end - start <= 1) return;

  const mid = Math.floor((start + end) / 2);

  await mergeSort(start, mid);
  await mergeSort(mid, end);
  await merge(start, mid, end);
}

async function merge(start, mid, end) {
  let temp = [];
  let i = start;
  let j = mid;

  while (i < mid && j < end) {
    highlight(i, j);
    await sleep(speed);

    if (array[i] < array[j]) {
      temp.push(array[i++]);
    } else {
      temp.push(array[j++]);
    }
  }

  while (i < mid) temp.push(array[i++]);
  while (j < end) temp.push(array[j++]);

  for (let k = 0; k < temp.length; k++) {
    array[start + k] = temp[k];
    updateBar(start + k);
    await sleep(speed);
  }
}

function updateBar(index) {
  const bars = document.getElementsByClassName("bar");
  bars[index].style.height = `${array[index]}px`;
}

function highlight(i, j) {
  const bars = document.getElementsByClassName("bar");
  bars[i].style.background = "red";
  bars[j].style.background = "red";

  setTimeout(() => {
    bars[i].style.background = "";
    bars[j].style.background = "";
  }, speed);
}

async function quickSort(low, high) {
  if (low < high) {
    const pi = await partition(low, high);
    await quickSort(low, pi - 1);
    await quickSort(pi + 1, high);
  }
}

async function swap(i, j) {
  const bars = document.getElementsByClassName("bar");

  bars[i].style.backgroundColor = "red";
  bars[j].style.backgroundColor = "red";
  await sleep(getSpeed());

  [array[i], array[j]] = [array[j], array[i]];
  bars[i].style.height = `${array[i]}px`;
  bars[j].style.height = `${array[j]}px`;

  await sleep(getSpeed());
  bars[i].style.backgroundColor = "steelblue";
  bars[j].style.backgroundColor = "steelblue";
}

async function partition(low, high) {
  const bars = document.getElementsByClassName("bar");
  let pivot = array[high];
  bars[high].style.backgroundColor = "yellow";

  let i = low - 1;

  for (let j = low; j < high; j++) {
    bars[j].style.backgroundColor = "red";
    await sleep(getSpeed());

    if (array[j] < pivot) {
      i++;
      await swap(i, j);
    }

    bars[j].style.backgroundColor = "steelblue";
  }

  await swap(i + 1, high);
  bars[i + 1].style.backgroundColor = "green"; // pivot確定
  return i + 1;
}

generateBtn.addEventListener("click", generateArray);

//when sort completed, all bar will be green
function markAllGreen() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "green";
  }
}

sortBtn.addEventListener("click", async () => {
  const algo = algorithmSelect.value;
  switch(algo){
    case "bubble":
      await bubbleSort();
      break;
    case "selection":
      await selectionSort();
      break;
    case "insertion":
      await insertionSort();
      break;
    case "merge":
      await mergeSort(0, array.length);
      break;
    case "quick":
      await quickSort(0, array.length - 1);
      break;
  }
  //after finished sort it all green
  markAllGreen();
});


generateArray();
