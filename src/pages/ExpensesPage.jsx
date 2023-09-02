import { useLoaderData } from 'react-router-dom';
import Tables from '../components/Tables';
import { fetchdata, deleteItem } from '../helpers';
import { toast } from 'react-toastify';


export  function ExpensesPageLoader() {
    const expenses = fetchdata('expenses');
    return { expenses}
}

export  async function ExpensesAction ({ request})  {
    const data = await request.formData()
    const {_action, ...values} = Object.fromEntries(data)
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


function ExpensesPage() {
    const {expenses} = useLoaderData()
  return (
    <div className='grid-lg'>
        <h1>All Expenses</h1>{" "}
        {expenses && expenses.length > 0 ? (
          <div className='grid-md'>
                <h2>Recent Expenses <small>({expenses.length}{" "}total)</small></h2>
                <Tables expenses={expenses} />
        </div>
        ):(
            <p>No Expenses to show</p>
        )
    }
    </div>
    )
}

export default ExpensesPage