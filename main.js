"use strict";

const resultAllDOM = document.querySelector("#resultAll");

const incomeTextDOM = document.querySelector("#incomeText");
const incomeNumberDOM = document.querySelector("#incomeNumber");
const incomesUlDOM = document.querySelector("#incomesUl");
const incomeFormDOM = document.querySelector("#incomeForm");
const incomeSumDOM = document.querySelector("#incomeSum");

const expenseTextDOM = document.querySelector("#expenseText");
const expenseNumberDOM = document.querySelector("#expenseNumber");
const expensesUlDOM = document.querySelector("#expensesUl");
const expenseFormDOM = document.querySelector("#expenseForm");
const expenseSumDOM = document.querySelector("#expenseSum");

let incSum = 0;
let expSum = 0;
let result = incSum - expSum;
const addNewIncome = (e) => {
    e.preventDefault()

    let newId = genNextId(document.querySelectorAll('#incomesUl li'))

    var li = `<li
      data-id="${newId}"
      data-title="${incomeTextDOM.value}"
      data-amount="${incomeNumberDOM.value}">
      ${incomeTextDOM.value} - ${incomeNumberDOM.value}zł
      <button onclick="updateIncome(${newId})">Edytuj</button>
      <button onclick="deleteIncome(${newId})">Usuń</button>
    </li>`;
    incomesUlDOM.innerHTML += li;
    incSum += Number(incomeNumberDOM.value);
    let result = incSum - expSum;
    incomeSumDOM.innerHTML = incSum + "zł";
    if(result > 0) {
        resultAllDOM.innerHTML = "Możesz wydać jeszcze: " + result + "zł";
    } else {
        resultAllDOM.innerHTML = "Jesteś na " + result + "zł" + ", uważaj!";
    }
  }

  const addNewExpenses = (e) => {
    e.preventDefault()

    let newId = genNextId(document.querySelectorAll('#expensesUl li'))
    let li = `<li
      data-id="${newId}"
      data-title="${expenseTextDOM.value}"
      data-amount="${expenseNumberDOM.value}">
      ${expenseTextDOM.value} - ${expenseNumberDOM.value}zł
      <button onclick="updateExpense(${newId})">Edytuj</button>
      <button onclick="deleteExpense(${newId})">Usuń</button>
    </li>`;
    expensesUlDOM.innerHTML += li;
    expSum += Number(expenseNumberDOM.value);
    let result = incSum - expSum;
    expenseSumDOM.innerHTML = expSum + "zł";
    if(result > 0) {
        resultAllDOM.innerHTML = "Możesz wydać jeszcze: " + result + "zł";
    } else {
        resultAllDOM.innerHTML = "Jesteś na " + result + "zł" + ", uważaj!";
    }

  }
  const genNextId = (listOfNodes) => listOfNodes.length + 1;

  const updateIncome = (id) => {
    let node = document.querySelector(`#incomesUl li[data-id="${id}"]`);
    let title = node.dataset.title;
    let amount = node.dataset.amount;

    node.innerHTML = `
      <input type="text" id="newTitle-${id}" value="${title}"> - <input type="text" id="newAmount-${id}" value="${amount}">
      <button onclick="editOkIncome(${id})">ok</button>
      <button onclick="editCancelIncome(${id}, '${title}', '${amount}')">cancel</button>
    `
    incSum -= amount;
    let result = incSum - expSum;
    incomeSumDOM.innerHTML = incSum + "zł";
    if(result > 0) {
        resultAllDOM.innerHTML = "Możesz wydać jeszcze: " + result + "zł";
    } else {
        resultAllDOM.innerHTML = "Jesteś na " + result + "zł" + ", uważaj!";
    }
  }
  var editOkIncome = (nodeId) => {
    let newTitle = document.querySelector(`#newTitle-${nodeId}`)
    let newAmount = document.querySelector(`#newAmount-${nodeId}`)
    let node = document.querySelector(`#incomesUl li[data-id="${nodeId}"]`);

    node.innerHTML = `
      ${newTitle.value} - ${newAmount.value}
      <button onclick="updateIncome(${nodeId})">Edytuj</button>
      <button onclick="deleteIncome(${nodeId})">Usuń</button>
    `
    node.dataset.title = newTitle.value
    node.dataset.amount = newAmount.value

    incSum += Number(newAmount.value);
    let result = incSum - expSum;
    incomeSumDOM.innerHTML = incSum + "zł";
    if(result > 0) {
        resultAllDOM.innerHTML = "Możesz wydać jeszcze: " + result + "zł";
    } else {
        resultAllDOM.innerHTML = "Jesteś na " + result + "zł" + ", uważaj!";
    }
  }

  var editCancelIncome = (nodeId, nodeTitle, nodeAmount) => {
    document.querySelector(`#incomesUl li[data-id="${nodeId}"]`).innerHTML = `
      ${nodeTitle} - ${nodeAmount}
      <button onclick="updateIncome(${nodeId})">Edytuj</button>
      <button onclick="deleteIncome(${nodeId})">Usuń</button>
    `;

    incSum += Number(incomeNumberDOM.value);
    let result = incSum - expSum;
    incomeSumDOM.innerHTML = incSum + "zł";
    if(result > 0) {
        resultAllDOM.innerHTML = "Możesz wydać jeszcze: " + result + "zł";
    } else {
        resultAllDOM.innerHTML = "Jesteś na " + result + "zł" + ", uważaj!";
    }
  }
  const updateExpense = (id) => {
    let node = document.querySelector(`#expensesUl li[data-id="${id}"]`);
    let title = node.dataset.title;
    let amount = node.dataset.amount;

    node.innerHTML = `
      <input type="text" id="newTitle-${id}" value="${title}"> - <input type="text" id="newAmount-${id}" value="${amount}">
      <button onclick="editOkExpense(${id})">ok</button>
      <button onclick="editCancelExpense(${id}, '${title}', '${amount}')">cancel</button>
    `
    expSum -= amount;
    let result = incSum - expSum;
    expenseSumDOM.innerHTML = expSum + "zł";
    if(result > 0) {
        resultAllDOM.innerHTML = "Możesz wydać jeszcze: " + result + "zł";
    } else {
        resultAllDOM.innerHTML = "Jesteś na " + result + "zł" + ", uważaj!";
    }
  }


  var editOkExpense = (nodeId) => {
    let newTitle = document.querySelector(`#newTitle-${nodeId}`)
    let newAmount = document.querySelector(`#newAmount-${nodeId}`)
    let node = document.querySelector(`#expensesUl li[data-id="${nodeId}"]`);

    node.innerHTML = `
      ${newTitle.value} - ${newAmount.value}
      <button onclick="updateExpense(${nodeId})">Edytuj</button>
      <button onclick="deleteExpense(${nodeId})">Usuń</button>
    `
    node.dataset.title = newTitle.value;
    node.dataset.amount = newAmount.value;
    expSum += Number(newAmount.value);
    let result = incSum - expSum;
    expenseSumDOM.innerHTML = expSum + "zł";
    if(result > 0) {
        resultAllDOM.innerHTML = "Możesz wydać jeszcze: " + result + "zł";
    } else {
        resultAllDOM.innerHTML = "Jesteś na " + result + "zł" + ", uważaj!";
    }
  }

  var editCancelExpense = (nodeId, nodeTitle, nodeAmount) => {
    document.querySelector(`#expensesUl li[data-id="${nodeId}"]`).innerHTML = `
      ${nodeTitle} - ${nodeAmount}
      <button onclick="updateExpense(${nodeId})">Edytuj</button>
      <button onclick="deleteExpense(${nodeId})">Usuń</button>
    `;
    expSum += Number(expenseNumberDOM.value);
    let result = incSum - expSum;
    expenseSumDOM.innerHTML = expSum + "zł";
    if(result > 0) {
        resultAllDOM.innerHTML = "Możesz wydać jeszcze: " + result + "zł";
    } else {
        resultAllDOM.innerHTML = "Jesteś na " + result + "zł" + ", uważaj!";
    }
  }

  function deleteIncome(id) {
    let nodeDInc = document.querySelector(`#incomesUl li[data-id="${id}"]`);
    let amountDInc = nodeDInc.dataset.amount;
    incSum -= Number(amountDInc);
    let result = incSum - expSum;
    incomeSumDOM.innerHTML = incSum + "zł";
    if(result > 0) {
        resultAllDOM.innerHTML = "Możesz wydać jeszcze: " + result + "zł";
    } else {
        resultAllDOM.innerHTML = "Jesteś na " + result + "zł" + ", uważaj!";
    }
    nodeDInc.remove();
  }

  function deleteExpense(id) {
    let nodeDExp = document.querySelector(`#expensesUl li[data-id="${id}"]`);
    let amountDExp = nodeDExp.dataset.amount;
    expSum -= Number(amountDExp);
    let result = incSum - expSum;
    expenseSumDOM.innerHTML = expSum + "zł";
    if(result > 0) {
        resultAllDOM.innerHTML = "Możesz wydać jeszcze: " + result + "zł";
    } else {
        resultAllDOM.innerHTML = "Jesteś na " + result + "zł" + ", uważaj!";
    }
    nodeDExp.remove();
  }
    incomeFormDOM.addEventListener('submit', addNewIncome);
    expenseFormDOM.addEventListener('submit', addNewExpenses);
