import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import { HomePage } from './common/components/HomePage'
import { PersonalPage } from './common/components/PersonalPage'
import { PersonalNavbar } from './common/components/PersonalNavbar'
import { SignUpForm } from './modules/Authorization/components/SignUpForm'
import { SignInForm } from './modules/Authorization/components/SignInForm'
import { AdminPage } from './common/components/AdminPage'

import { MainRoleProjectPage } from './modules/RoleProject/components/MainRoleProjectPage'
import { EditRoleProjectPage } from './modules/RoleProject/components/EditRoleProjectPage'
import { AdminNavbar } from './common/components/AdminNavbar'

export const App = () => {
  return (
    <Router>
      <div className="App">            
        <Switch>

          <Route exact path= "/" render={()=>{return( <HomePage /> )}} />
          <Route exact path="/signup"  render={()=>{return( <SignUpForm /> )}} />
          <Route exact path="/signin" render={()=>{return( <SignInForm /> )}} />
          
          <Route exact path= "/account/:username" render={(routeProps)=>{return(<React.Fragment> <PersonalNavbar {...routeProps}/> <PersonalPage {...routeProps}/> </React.Fragment>)}} />

          <Route exact path="/admin" render={(routeProps)=>{return(<React.Fragment> <AdminNavbar {...routeProps}/> <AdminPage {...routeProps}/> </React.Fragment>)}} ></Route>
          <Route exact path="/admin/roleprojects" render={(routeProps)=>{return(<React.Fragment> <AdminNavbar {...routeProps}/><MainRoleProjectPage {...routeProps}/> </React.Fragment>)}} ></Route>
          <Route exact path="/admin/roleprojects/edit/:roleProjectId" render={(routeProps)=>{return(<React.Fragment> <AdminNavbar {...routeProps}/><EditRoleProjectPage {...routeProps}/></React.Fragment>)}}/>

          <Redirect to= "/" />

        </Switch>
      </div>
    </Router>
  );
}

