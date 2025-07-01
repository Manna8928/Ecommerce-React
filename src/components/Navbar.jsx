import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import Logo from "../assets/shoppingLogo.svg";
import { NavLink } from 'react-router';
import { CommerceContext } from '../context/CommerceContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { googleLogout } from '@react-oauth/google';
import { Tooltip } from '@mui/material';

const Navbar = () => {

    const { modal, setModal, token, setToken, decodedToken } = useContext(CommerceContext)

    return (
        <div className='flex h-[15%] w-[100vw] justify-between items-center m-6 p-3'>
            <div className='flex gap-10 mr-2 h-[10%] items-center justify-center'>
                <NavLink to="/">
                    <img src={Logo} style={{ width: "4rem", marginInlineStart: "10px" }} />
                </NavLink>
                <div>
                    <NavLink to="/">
                        <Button variant="text" sx={{ color: "yellow" }}> Home</Button>
                    </NavLink>
                    <Button variant="text" sx={{ color: "yellow" }}>Shop</Button>
                    <Button variant="text" sx={{ color: "yellow" }}>About</Button>
                    <Button variant="text" sx={{ color: "yellow" }}>Contact</Button>
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

                        <div className='shoppingCart'>
                            <ShoppingCartIcon sx={{ color: "white" }} fontSize='medium' />
                            <span className='counter'>2</span>
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
                        setModal(true)}>Login</Button>


                }
            </div>
        </div>




    )
}

export default Navbar