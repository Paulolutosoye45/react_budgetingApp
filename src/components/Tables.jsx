import React from 'react'
import ExpenseItems from './ExpenseItems'

function Tables({expenses, showBudget = true}) {
  return (
    <div className='table'>
        <table>
            <thead> 
                <tr>
                    {
                        ["Name", "Amount", "Date", (showBudget ? "Budget" :  " "),  " "].map((i, index) => (
                             <th key={index}>{i}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    expenses.map((expenses) => (
                        <tr key={expenses.id}>
                             <ExpenseItems expenses={expenses} showBudget={showBudget} />
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Tables