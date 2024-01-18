export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

const generateRandomColor = () => {
    const existingBudgetLength = fetchdata("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`;
  };


//local storage
export const fetchdata = (key) => {
    return  JSON.parse(localStorage.getItem(key))
};



// delete item from local storage
export const deleteItem = ({ key, id }) => {
  const existingData = fetchdata(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchdata(category) ?? [];
  return data.filter((item) => item[key] === value);
};

// create budget 
export const createBudget = ({ name, amount }) => {
    const newItem = {
      id: crypto.randomUUID(),
      name: name,
      createdAt: Date.now(),
      amount: +amount,
      color: generateRandomColor(),
    };
    const existingBudgets = fetchdata("budgets") ?? [];
    return localStorage.setItem(
      "budgets",
      JSON.stringify([...existingBudgets, newItem])
      );
    };


    // create expense
export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  const existingExpenses = fetchdata("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchdata("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    // check if expense.id === budgetId I passed in
    if (expense.budgetId !== budgetId) return acc;

    // add the current amount to my total
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

// FORMATTING
export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();

// Formating percentages
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

// Format currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};