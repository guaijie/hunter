import React from 'react'
import './Logo.less';
import logo from '@/logo.svg'

export default function Logo(){
    return (
        <div className="Logo-logo">
            <img width="100%" height="100%" src={logo} alt="logo" />
        </div>
    )     
    
}


