import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Box from '@mui/material/Box';
import Home from './components/Home';
import { CommerceContext } from './context/CommerceContext'
import { Route, Routes } from 'react-router';
import Details from './components/Details';
import Return from './components/Return';
import Description from './components/Description';
import AdditionalInfo from './components/AdditionalInfo';
import { useGoogleLogin } from '@react-oauth/google';
import { clsx } from 'clsx';
import Cart from './components/Cart';
import PaymentComplete from './components/PaymentComplete';

const App = () => {

  const [productList, setProductList] = useState([]);
  const [limit, setLimit] = useState(10);

  const [modal, setModal] = useState(false);
  const [token, setToken] = useState("");
  const [decodedToken, setDecodedToken] = useState("");
  const [cart, setCart] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token"))
      setToken(localStorage.getItem("token"))
    // console.log("type",typeof(localStorage.getItem("token")),localStorage.getItem("token"))
  }, [])
  // console.log("token at useeffect ",token)

  useEffect(() => {
    // console.log("modal val", modal)
    modal && login();
  }, [modal])

  useEffect(() => {
    token && localStorage.setItem("token", token)
    token && fetch("https://www.googleapis.com/oauth2/v3/userinfo",
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`, // notice the Bearer before your token
          // 'prompt':'consent'
        }

      }).then(result => result.json()).then(data => setDecodedToken(data))
    setModal(false);
    !token && localStorage.removeItem("token");
    !token && setDecodedToken("");
  }, [token])

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log(tokenResponse);
      setToken(tokenResponse.access_token);

    },

    onError: error => console.log("login failed with google ", error)
  });

  // console.log("token ", token, decodedToken)
  const url = useMemo(() => {
    return "https://dummyjson.com/products?limit=" + limit
    // +"&skip=5"
  }, [limit])

  useEffect(() => {

    fetch(url)
      .then(data => data.json())
      .then(result => setProductList(result))
  }, [url])

  // console.log(products)
  const classDrawer = useMemo(() => clsx("drawer",
    {
      "drawerOpen": drawerOpen,
      "drawerClose": !drawerOpen
    }
  ), [drawerOpen])

  const totalCartItems = useMemo(() => {
    let total = 0;
    for (let i in cart)
      total = total + cart[i].quantity
    return total
  }, [cart])

  return (
    <CommerceContext.Provider value={{ productList, setLimit, modal, setModal, token, setToken, decodedToken, cart, setCart, setDrawerOpen, totalCartItems }}>
      <Box className='app' sx={{ pt: "5px" }} >
        <Navbar />
        <div className={classDrawer}>
          <Cart />
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/details/:id' element={<Details />} >
            <Route path="/details/:id/return" element={<Return />} />
            <Route index  element={<Description />} />
            <Route path="/details/:id/additional" element={<AdditionalInfo />} />
          </Route>
          <Route path='/payment' element={<PaymentComplete />} />
        </Routes>

      </Box>
    </CommerceContext.Provider>
  )

}

export default App