//helpers functions
import { createBudget, createExpense, fetchdata, waait, deleteItem } from "../helpers"


import { toast } from "react-toastify";



import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetsItems from "../components/BudgetsItems";
import Tables from "../components/Tables";

//rrd
import {Link, useLoaderData} from 'react-router-dom'

export  function dashboardloader() {
    const userName = fetchdata('userName');
    const Budgets = fetchdata('budgets');
    const expenses = fetchdata('expenses');
    return {userName, Budgets, expenses}
}

//action
 export async function dashboardAction({ request}) {

    await waait();
    const data = await request.formData()
    // const userName = data.get('userName')
    const {_action, ...values} = Object.fromEntries(data)
     if(_action === 'newUser'){
         try {
              
             localStorage.setItem('userName', JSON.stringify(values.userName))
             return toast.success(`Welcome ${values.userName}`)
         }catch (error) {
                 throw new Error('There was a problem creating your account.', error.message)
         }
     }
     if(_action === 'createBudget'){
        try {
            createBudget({
                name : values.newBudget,
                amount : values.newBudgetAmount,
            })
            return toast.success('Budget created!')
        }catch {
            throw new Error('There was a problem creating your budget.');
        }
     }
     if(_action === 'createExpense'){
        try {
             createExpense({
              name:values.newExpense,
              amount:values.newExpenseAmount,
              budgetId:values.newExpenseBudget,
             })
            return toast.success(`Expense ${values.newExpense} created`)
        }catch {
            throw new Error('There was a problem creating your expense.');
        }
     }

     
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
     
 }
const  Dashboard = () => {
   const {userName, Budgets, expenses} = useLoaderData()
  return (
    <div>
    {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
          {Budgets  && Budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm Budgets={Budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {Budgets.map((budgets) => (
                    <BudgetsItems key={budgets.id}  budgets={budgets}/>
                  ))}
                  </div>
                  {
                      expenses && expenses.length >
                      0 && (
                        <div className="grid-md">
                          <h2>Recent Express</h2>
                          <Tables  expenses={expenses
                            .sort((a, b) => b.createdAt - a.createdAt).slice(0, 8)}/>
                            {
                              expenses.length > 8 && (
                                <Link 
                                to='expenses'
                                className="btn btn--dark">
                                  view all expenses 
                                </Link>
                              )
                            }
                        </div>
                      )
                  }
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </div>
  )
}

export default Dashboard