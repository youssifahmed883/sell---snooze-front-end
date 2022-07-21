import React from 'react'
import { Route , Navigate} from 'react-router-dom';
import Header from './Components/Header';

export default function CompanyPrivateRoute({...rest}) {
  return (
    <Route {...rest}
        render={({props,location})=>
        localStorage.getItem('auth_token') ?
        (<Header {...props}/>):
        (<Navigate to={{pathname:"login" , state:{from:location}}}/>)
    }
    />
  )
}
