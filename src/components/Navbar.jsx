//assets 
import logomark from '../assets/logomark.svg'
//rrd
import {Form, NavLink} from 'react-router-dom'
// library
import { TrashIcon } from '@heroicons/react/24/solid'
 const Navbar = ({userName}) => {
  return (
    <nav>
        <NavLink
            to='/react_budgetingApp'
            aria-label='Go to home'
        >
            <img src={logomark} alt="" height={30} />
            <span>HomeBudget</span>
        </NavLink>
        {
            userName && (
                <Form 
                method='post'
                action='./logout'
                onSubmit={(event) => {
                    if(!confirm('Delete user  and all data?')) {
                        event.preventDefault()
                   }}
                }
                >
                  <button type='submit' className='btn btn--warning'>
                    <span>Delete User</span>
                    <TrashIcon width={20} />
                    </button>    
                </Form>
            )
        }
    </nav>
  )
}
export default Navbar;