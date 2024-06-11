
import EmployeeComponent from './EmployeeComponent'
import ListEmployeeComponent from './ListEmployeeComponent'
import LoginComponent from './LoginComponent'
import { Redirect, Switch, Route, Router } from "react-router-dom";
import RouteGuard from "./RouteGuard"



function Routes() {
    return (
        <Router>
            <Switch>
                <RouteGuard
                    exact
                    path="/"
                    component={ListEmployeeComponent}
                />
                {/* http://localhost:3000*/}
                {/* <Route path='/' element={ <ListEmployeeComponent /> }></Route> */}
                {/* http://localhost:3000/employees*/}
                <Route path='/employees' element={ <ListEmployeeComponent /> }></Route>
                {/* http://localhost:3000/add-employee*/}
                <Route path='/add-employee' element={ <EmployeeComponent /> }></Route>
                {/* http://localhost:3000/edit-employee*/}
                <Route path='/edit-employee/:id' element={ <EmployeeComponent /> }></Route>
                {/* http://localhost:3000/edit-employee*/}
                <Route path='/login' element={ <LoginComponent /> }></Route>
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default Routes