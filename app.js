const barContainer = document.querySelector(".bar-container");
let n = document.querySelector("#noofbar").value;
let time = document.querySelector("#time").value;
let array;
const randomizeArray = document.querySelector(".randomize");
const sortBtn = document.querySelector(".play");

let sortType = document.querySelector("#sorting-options").value;

function random() {
  return Math.ceil(Math.random() * 10);
}

function customizeArray() {
  array = new Array(n);
  for (let i = 0; i < n; i++) {
    array[i] = random();
  }
  generateBar(array);
}

function generateBar(array, red, green) {
  barContainer.innerHTML = "";
  array.forEach((elem, i) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    if (red === i) {
      bar.classList.add("red");
    }
    if (green === i) {
      bar.classList.add("green");
    }
    bar.style.height = `${elem * 10}%`;
    barContainer.appendChild(bar);
  });
}

customizeArray();

randomizeArray.addEventListener("click", () => {
  customizeArray();
});

async function bubbleSort(array) {
  document.querySelector("#sorting-options").disabled = true;
  document.querySelector(".randomize").disabled = true;
  document.querySelector(".play").disabled = true;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      await sleep(time);
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
      generateBar(array, j, j + 1);
    }
  }
  document.querySelector("#sorting-options").disabled = false;
  document.querySelector(".randomize").disabled = false;
  document.querySelector(".play").disabled = false;
}
async function insertionSort(array) {
  document.querySelector("#sorting-options").disabled = true;
  document.querySelector(".randomize").disabled = true;
  document.querySelector(".play").disabled = true;
  const n = array.length;
  for (let i = 1; i < n; i++) {
    const current = array[i];
    // The last element of our sorted subarray
    let j = i - 1;
    while (j >= 0 && current < array[j]) {
      array[j + 1] = array[j];
      j--;
      await sleep(time);
      generateBar(array, j, i);
    }
    array[j + 1] = current;
  }
  document.querySelector("#sorting-options").disabled = false;
  document.querySelector(".randomize").disabled = false;
  document.querySelector(".play").disabled = false;
}

function swap(arr, min, i) {
  [arr[min], arr[i]] = [arr[i], arr[min]];
}
async function selectionSort(arr) {
  document.querySelector("#sorting-options").disabled = true;
  document.querySelector(".randomize").disabled = true;
  document.querySelector(".play").disabled = true;
  let n = arr.length;
  let min;
  let i, j;
  for (i = 0; i < n - 1; ++i) {
    min = i;

    for (j = i + 1; j < n; j++) {
      await sleep(time);
      if (arr[j] < arr[min]) min = j;
      generateBar(arr, i, j);
    }
    if (min != i) {
      swap(arr, min, i);
      generateBar(arr, min, i);
    }
  }
  document.querySelector("#sorting-options").disabled = false;
  document.querySelector(".randomize").disabled = false;
  document.querySelector(".play").disabled = false;
}
async function mergeSort(array) {
  document.querySelector("#sorting-options").disabled = true;
  document.querySelector(".randomize").disabled = true;
  document.querySelector(".play").disabled = true;
  if (array.length <= 1) return;

  const mid = Math.floor(array.length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);

  await mergeSort(left);
  await mergeSort(right);

  await merge(left, right, array);
  document.querySelector("#sorting-options").disabled = false;
  document.querySelector(".randomize").disabled = false;
  document.querySelector(".play").disabled = false;
}

async function merge(left, right, array) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }

  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }

  for (let i = 0; i < result.length; i++) {
    array[i] = result[i];
    await sleep(time);
    generateBar(array, -1, -1); // Update the visualization
  }
}

async function quickSort(array, left = 0, right = array.length - 1) {
  document.querySelector("#sorting-options").disabled = true;
  document.querySelector(".randomize").disabled = true;
  document.querySelector(".play").disabled = true;
  if (left < right) {
    const pivotIndex = await partition(array, left, right);
    await quickSort(array, left, pivotIndex - 1);
    await quickSort(array, pivotIndex + 1, right);
  }
  document.querySelector("#sorting-options").disabled = false;
  document.querySelector(".randomize").disabled = false;
  document.querySelector(".play").disabled = false;
}

async function partition(array, left, right) {
  const pivotValue = array[right];
  let pivotIndex = left;

  for (let i = left; i < right; i++) {
    if (array[i] < pivotValue) {
      await sleep(time);
      generateBar(array, pivotIndex, i);
      swap(array, i, pivotIndex);
      pivotIndex++;
    }
  }

  await sleep(time);
  swap(array, pivotIndex, right);
  generateBar(array);

  return pivotIndex;
}

async function heapSort(array) {
  document.querySelector("#sorting-options").disabled = true;
  document.querySelector(".randomize").disabled = true;
  document.querySelector(".play").disabled = true;
  const n = array.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(array, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    await sleep(time);
    swap(array, 0, i);
    generateBar(array, 0, i);
    await heapify(array, i, 0);
  }
  document.querySelector("#sorting-options").disabled = false;
  document.querySelector(".randomize").disabled = false;
  document.querySelector(".play").disabled = false;
}

async function heapify(array, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && array[left] > array[largest]) {
    largest = left;
  }

  if (right < n && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== i) {
    await sleep(time);
    swap(array, i, largest);
    generateBar(array, i, largest);
    await heapify(array, n, largest);
  }
}

sortBtn.addEventListener("click", () => {
  switch (sortType) {
    case "Bubble":
      bubbleSort(array);
      document.querySelector(".complexity").innerHTML = `<h1>Bubble Sort</h1><p>Time Complexity:- O(n<sup>2</sup>)</p>`;
      break;
    case "Selection":
      selectionSort(array);
      document.querySelector(".complexity").innerHTML = `<h1>Selection Sort</h1><p>Time Complexity:- O(n<sup>2</sup>)</p>`;
      break;
    case "Insertion":
      insertionSort(array);
      document.querySelector(".complexity").innerHTML = `<h1>Insertion Sort</h1><p>Time Complexity:- O(n<sup>2</sup>)</p>`;
      break;
    case "Merge":
      mergeSort(array);
      document.querySelector(".complexity").innerHTML = `<h1>Merge Sort</h1><p>Time Complexity:- O( n*log(n))</p>`;
      break;
    case "Quick":
      quickSort(array);
      document.querySelector(".complexity").innerHTML = `<h1>Quick Sort</h1><p>Time Complexity:- O( n*log(n))</p>`;
      break;
    case "Heap":
      heapSort(array);
      document.querySelector(".complexity").innerHTML = `<h1>Heap Sort</h1><p>Time Complexity:- O( n*log(n))</p>`;
      break;
    default:
  }
  generateBar(array);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

document.querySelector("#noofbar").addEventListener("input", () => {
  n = document.querySelector("#noofbar").value;
  time = document.querySelector("#time").value;
  customizeArray();
  generateBar(array);
});
document.querySelector("#time").addEventListener("input", () => {
  time = document.querySelector("#time").value;
});
document.querySelector("#sorting-options").addEventListener("change", () => {
  sortType = document.querySelector("#sorting-options").value;
});
document.querySelector(".stop").addEventListener("click", () => {
  location.reload();
});
