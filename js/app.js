const btn = document.getElementById("btn");
const output = document.getElementById("output");
const time = (document.getElementById(
  "time"
).innerHTML = `<h1>${moment().format("MMM Do YY")}</h1>`);

btn.addEventListener("click", () => {
  const input = document.getElementById("input");

  const remove = document.createElement("a");
  remove.classList.add("remove");

  remove.textContent = "X";

  const li = document.createElement("li");
  li.textContent = input.value;
  output.appendChild(li);
  li.appendChild(remove);
  console.log(input.value);

  addToLocalStorage(input.value);
});

output.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    e.target.parentElement.remove();
  }
  removeFromLocalStorage(e.target.parentElement.textContent);
});

const addToLocalStorage = (input) => {
  let inputs = fetchFromLocalStorage();

  inputs.push(input);

  localStorage.setItem("inputs", JSON.stringify(inputs));

  console.log(inputs);
};

const fetchFromLocalStorage = () => {
  let inputs;
  const valuesLS = localStorage.getItem("inputs");
  if (valuesLS === null) {
    inputs = [];
  } else {
    inputs = JSON.parse(valuesLS);
  }
  return inputs;
};

document.addEventListener("DOMContentLoaded", () => {
  let inputs = fetchFromLocalStorage();

  inputs.forEach((input) => {
    const remove = document.createElement("a");

    remove.classList.add("remove");
    remove.textContent = "X";

    const li = document.createElement("li");
    li.textContent = input;
    li.appendChild(remove);
    output.appendChild(li);
  });
});

const removeFromLocalStorage = (input) => {
  let inputs = fetchFromLocalStorage();
  let removeX = input.substring(0, input.length - 1);

  inputs.forEach((valuesLS, index) => {
    if (removeX === valuesLS) {
      inputs.splice(index, 1);
      console.log(inputs);
    }
  });

  localStorage.setItem("inputs", JSON.stringify(inputs));
};
