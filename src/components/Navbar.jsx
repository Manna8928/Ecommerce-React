import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import Logo from "../assets/shoppingLogo.svg";
import { NavLink } from 'react-router';
import { CommerceContext } from '../context/CommerceContext'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Tooltip from '@mui/material/Tooltip';

const Navbar = () => {

    const { modal, setModal, token, setToken, decodedToken, cart, setDrawerOpen, totalCartItems } = useContext(CommerceContext)
   
    return (
        <div className='flex gap-4 h-[15%] w-[100vw] justify-between items-center m-3'>

            <NavLink to="/">
                <img src={Logo} style={{ width: "4rem", marginInlineStart: "10px" }} />
            </NavLink>
            <div className='flex gap-10 mr-2 h-[10%] items-center justify-center'>
                <div>
                    <NavLink to="/">
                        <Button variant="text">Home</Button>
                    </NavLink>
                    <Button variant="text">Shop</Button>
                    <Button variant="text">About</Button>
                    <Button variant="text">Contact</Button>
                </div>
            </div>
            <div className='logInSection'>
                {token ?
                    <div className='loggedIn'>
                        {decodedToken &&
                            <>
                                <div className='avatar'>{decodedToken.name.substring(0, 1)}</div>
                                <Tooltip title={decodedToken.name}>
                                    <div className='truncatedName'>{decodedToken.name}</div>
                                </Tooltip>
                            </>}

                        <div className='shoppingCart' onClick={()=>setDrawerOpen(prev=>!prev)}>
                            <ShoppingCartIcon sx={{ color: "white" }} fontSize='medium' />
                            <span className='counter'>{totalCartItems}</span>
                        </div>
                        <PowerSettingsNewIcon sx={{ color: "red", cursor: 'pointer' }} onClick={() => {
                            console.log("logging out")
                            googleLogout()
                            setToken("")
                        }
                        } />
                    </div>
                    :
                    <Button variant="contained" sx={{ bgcolor: "red",ml:"150px" }} onClick={() =>
                        {
                            if(!token)
                                setModal(true)
                            else console.log("no token found")
                        }
                    }>Login</Button>


                }
            </div>
        </div>
    )
}

export default Navbar