//helper function
import { deleteItem } from "../helpers"
//rrd
import {redirect} from 'react-router-dom'

//library
import { toast } from "react-toastify";

export async function LogoutOutAction ()  {
    deleteItem({
        key : "userName",
    })
    deleteItem({
        key : "budgets",
    })
    deleteItem({
        key : "expenses"
    })
    toast.success("You’ve deleted your account!")
   return  redirect("/react_budgetingApp")
}