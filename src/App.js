import React from 'react'
import {BrowserRouter as Router, Switch, Route  } from 'react-router-dom'

import AuthType from './components/AuthType/AuthType.js'
import Bootstrap from './pages/Bootstrap/Bootstrap.js'
import Home from './pages/Home/Home.js'
import SignUp from './pages/SignUp/SignUp.js'
import Login from './pages/Login/Login.js'
import BossInfo from './pages/BossInfo/BossInfo.js'
import ExpertInfo from './pages/ExpertInfo/ExpertInfo.js'
import ExpertUser from './components/UserInfo/ExpertUser.js'
import BossUser from './components/UserInfo/BossUser.js'
import UserCenter from './pages/UserCenter/UserCenter.js'
const routes=[
    {path:'/',exact:true,component:Bootstrap},
    {path:'/home',component:Home},
    {path:'/login',component:Login},
    {path:'/signup',component:SignUp},
    {path:'/bossinfo',component:BossInfo},
    {path:'/expertinfo',component:ExpertInfo},
    {path:'/usercenter',component:UserCenter},
    {path:'/bossuser',component:BossUser},
];
const userRoutes=[
    {path:'/expertuser',component:ExpertUser},
    {path:'/bossuser',component:BossUser},
]


const supportsHistory = 'pushState' in window.history

export default function App(props){
    return (
        <Router  forceRefresh={!supportsHistory}>
            <div>
                <AuthType key="auth-type"></AuthType>
                <Switch>
                    {routes.map((route,i)=>(
                        <Route {...route} key={i}></Route>
                    ))}
                </Switch>
            </div>
        </Router>
    )
}
