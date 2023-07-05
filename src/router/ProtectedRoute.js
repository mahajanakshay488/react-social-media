import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"
import { bindActionCreators } from 'redux';
// import userService from '../services/user.service';
import { userActions } from '../store';

const ProtectedRoute = ({children}) => {
    const dispatch = useDispatch();
    const actions = bindActionCreators(userActions, dispatch);
    const users = useSelector(state => state.users);
    let location = useLocation();

    // useEffect(()=>{
    //     actions.checkAuth()
    //     .then(res =>{
    //         console.log(res);
    //     })
    //     .catch(err => console.log('checkAuth', err));
    // },[]);
    
        // if(!users.isAuthenticated) {
        //     return <Navigate to="/login" state={{ from: location}} replace />
        // }
        // return children;

        return(
            <>
            {
                (localStorage.getItem('isAuth'))
                ?
                children
                :
                <Navigate to="/login" state={{ from: location}} replace />
            }
            </>
        )
};

export default ProtectedRoute;