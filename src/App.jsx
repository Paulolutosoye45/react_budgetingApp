import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Main, { mainloader } from './layouts/Main'
import Dashboard, { dashboardAction, dashboardloader } from './pages/Dashboard'
import Error from './pages/Error'
import {LogoutOutAction} from './actions/Logout'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ExpensesPage, { ExpensesAction, ExpensesPageLoader } from './pages/ExpensesPage'
import BudgetPage, { budgetLoader, BudgetsAction } from './pages/BudgetPage'
import { deleteBudget } from './actions/DeleteBudgets'



const  App = ()  => {
  const routes = createBrowserRouter([
    {
      path: "/react_budgetingApp",
      element: <Main />,
      loader: mainloader,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Dashboard />,
          loader: dashboardloader,
          action: dashboardAction,
          errorElement: <Error />,
        },
        {
          path: "expenses",
          element: <ExpensesPage />,
          loader: ExpensesPageLoader,
          action: ExpensesAction,
          errorElement: <Error />,
        },
        {
          path: "/react_budgetingApp/budget/:id",
          element: <BudgetPage />,
          loader: budgetLoader,
          action: BudgetsAction,
          errorElement: <Error />,
          children : [
            {
              path: "delete",
              action: deleteBudget,
            }
          ]
        },
        {
          path: 'logout',
          element: <p>hey</p>,
          action: LogoutOutAction,
        },
      ],
    },
  ]);

  return (
    <>
     <RouterProvider router={routes}/>
     <ToastContainer />
    </>
  )
}

export default App





