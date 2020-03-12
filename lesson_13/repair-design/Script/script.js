'use strict';
// lesson08

// Получить кнопку "Рассчитать" через id
const start = document.querySelector('#start'),
  cancel = document.querySelector('#cancel'),
  btnPlus = document.querySelectorAll('button'),
  btnIncomePlus = btnPlus [0],
  btnExpensesPlus = btnPlus [1],
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  depositCheck = document.getElementById('#deposit-check'),
  budgetDayValue = document.querySelector('.budget_day-value'),
  budgetMonthValue = document.querySelector('.budget_month-value'),
  expensesMonthValue = document.querySelector('.expenses_month-value'),
  accumulateMonthValue = document.querySelector('.accumulate_month-value'),
  additionalIncomeValue = document.querySelector('.additional_income-value'),
  additionalExpensesValue = document.querySelector('.additional_expenses-value'),
  targetMonthValue = document.querySelector('.target_month-value'),
  incomePeriodValue = document.querySelector('.income_period-value'),
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  additionalExpenses = document.querySelector('.additional_expenses'),
  periodSelect = document.querySelector('.period-select'),
  income = document.querySelectorAll('.income'),
  depositPercent = document.querySelector('.deposit-percent'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositBank = document.querySelector('.deposit-bank'),
  additionalExpensesIem = document.querySelector('.additional_expenses-iem'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'), //получ на практике
  inputAll = document.querySelectorAll('input'),

  periodAmount = document.querySelector('.period-amount');
  let expensesItems = document.querySelectorAll('.expenses-items'),
      incomeItems =  document.querySelectorAll('.income-items');

// Функция определения числа
const isNum = function(n){
  return (!isNaN(parseFloat(n)) && isFinite(n));
}

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  // period: 12, замена на элемент верстки period-select
  

  start: function(){

    //debugger;
    appData.budget = +salaryAmount.value;
    appData.getIncome();
    appData.getExpenses();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.getTargetMonth();

    appData.showResult();

    appData.blockInput(); 

    appData.turnStartCancel();
  },

  turnStartCancel(){
    start.style.display = 'none';
    cancel.style.display = "block";
  },

  blockInput(){
    let divData = document.querySelector('.data');
    divData.querySelectorAll('input[type=text]').forEach(function(item){
      item.disabled = true;
    });
  },
  showResult(){
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth(); 

    periodSelect.addEventListener('change',function(){
      appData.getPeriod();
    });
    incomePeriodValue.value = appData.calcPeriod();
    
  },
  // добавление блока расходов
  addExpensesBlock(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    //Задание
    //1) Реализовать так, чтобы инпуты добавлялись пустые без value при добавлении новых полей в обязательных расходах и дополнительных доходах 
    cloneExpensesItem.querySelectorAll('*').forEach((item) => {
      console.log('item: ', item);
      item.value = '';
    });
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem,btnExpensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      btnExpensesPlus.style.display = 'none';
    }
  },
  
  //получить все расходы и записать их в объект
  //будем перебирать с помощью forEach все элементы с классом expenses-item
  getExpenses(){
    expensesItems.forEach (function(item){
      let itemExpenses = item.querySelector('.expenses-title').value,
          cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  
  addIncomeBlock(){    
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    console.log('cloneIncomeItem: ', cloneIncomeItem);
    //Задание
    //1) Реализовать так, чтобы инпуты добавлялись пустые без value при добавлении новых полей в обязательных расходах и дополнительных доходах 
    cloneIncomeItem.querySelectorAll('*').forEach((item) => {
      console.log('item: ', item);
      item.value = '';
    });

    incomeItems[0].parentNode.insertBefore(cloneIncomeItem,btnIncomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      btnIncomePlus.style.display = 'none';
    }
  },
  
  getIncome(){
    incomeItems.forEach (function(item){

      let itemIncome = item.querySelector('.income-title').value,
          cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome.value !== '' && cashIncome !== ''){
        appData.income[itemIncome] = cashIncome;
      }

    });
    for (let key in appData.income){
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses(){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if(item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },
  //Названия возможных источников дохода
  getAddIncome(){
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if(item !== ''){
        appData.addIncome.push(itemValue);
      }
    });
  },

  getPeriod(){
    appData.period = document.querySelector('.period-select').value;
    periodAmount.textContent = appData.period;
  },

  getExpensesMonth(){
    for (const key in appData.expenses){
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getBudget(){
    appData.budgetMonth = appData.budget + +appData.incomeMonth - appData.expensesMonth;
    //3) ЗАДАНИЕ Округлить вывод дневного бюджета
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth(){
    return Math.ceil(targetAmount.value / appData.budgetMonth);
  },
  getStatusIncome(){
    if (appData.budgetDay <= 0){
        return ('Что-то пошло не так');
    } else if (appData.budgetDay <= 300){
        return ('Низкий уровень дохода');
    } else if (appData.budgetDay <= 800){
        return ('Средний уровень дохода');
    } else {
        return ('Высокий уровень дохода');
    }
  },

  calcPeriod: function(){
    return appData.budgetMonth * periodSelect.value;
  }

};

salaryAmount.addEventListener('change',function(){
  start.addEventListener('click',appData.start);
});
btnIncomePlus.addEventListener('click', appData.addIncomeBlock);
btnExpensesPlus.addEventListener('click', appData.addExpensesBlock);

periodSelect.addEventListener('change', function(){
  appData.getPeriod();

  incomePeriodValue.value = appData.calcPeriod();
});
//Задание
// 2) Поля с placeholder="Наименование" разрешить ввод только русских букв пробелов и знаков препинания
// 3) Поля с placeholder="Сумма" разрешить ввод только цифр
inputAll.forEach((item) => {
  item.addEventListener('input', () => {
    if (item.placeholder === 'Наименование') {
      let string = item.value;
      item.value = string.replace(/[^а-яё.!?()\s,:;-]/gi, '');
    } else if (item.placeholder === 'Сумма') {
        let number = item.value;
        item.value = number.replace(/\D/g, '');
    }
  });
});

