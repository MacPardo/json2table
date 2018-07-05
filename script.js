const input = document.getElementById("input");
const table = document.getElementById("table");

console.log(input);
console.log(table);

const uniq = (a) => {
  var seen = {};
  return a.filter(item =>
    seen.hasOwnProperty(item) ? false : (seen[item] = true)
  );
}    

const makeTable = (table, obj) => {

  table.innerHTML = "";

  const states = Object.keys(obj);
  const terminals = uniq(states
    .map(s => Object.keys(obj[s]))
    .reduce((acc, a) => [...acc, ...a], []));
  console.log("states");
  console.log(states);
  console.log("terminals");
  console.log(terminals);

  const thead = document.createElement("tr");
  const blank = document.createElement("td");
  thead.appendChild(blank);
  terminals.forEach(t => {
    const td = document.createElement("td");
    td.innerText = t;
    thead.appendChild(td);
  });
  table.appendChild(thead);

  states.forEach(s => {
    const tr = document.createElement("tr");
    const stateTd = document.createElement("td");
    stateTd.innerText = s;
    tr.appendChild(stateTd);
    terminals.forEach(t => {
      const td = document.createElement("td");
      const v = obj[s][t] || "ERROR";
      td.classList.add(obj[s][t] ? "value" : "error");
      td.innerText = v;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
}

const readInput = (event) => {
  try {
    makeTable(table, JSON.parse(event.target.value));
  }
  catch (e) {
    console.log(e);
    console.log("%cINVALID JSON", "background:red;color:yellow;");
  }
};

input.addEventListener("keyup", readInput);