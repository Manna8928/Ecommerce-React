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
import axios from 'axios';

const App = () => {

  const [productList, setProductList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [modal, setModal] = useState(false);
  const [token, setToken] = useState("");
  const [decodedToken, setDecodedToken] = useState("");
  const [cart, setCart] = useState({});
  ;
  useEffect(() => {
    console.log("modal val", modal)
    modal && login();
  }, [modal])

  useEffect(() => {
    setModal(false);

  }, [token])

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);

      fetch("https://www.googleapis.com/oauth2/v3/userinfo",
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${tokenResponse.access_token}`, // notice the Bearer before your token
          }

        }).then(result => result.json()).then(data => setDecodedToken(data))

      setToken(tokenResponse);

    },

    onError: error => console.log("login failed with google ", error)
  });

  console.log("token ", token, decodedToken)
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

  return (
    <CommerceContext.Provider value={{ productList, setLimit, modal, setModal, token, setToken, decodedToken, cart, setCart }}>
      <Box className='app' sx={{ pt: "5px" }} >
        {
          modal &&
          <div className='modal'></div>
        }
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/details/:id' element={<Details />} >
            <Route path="/details/:id/return" element={<Return />} />
            <Route index element={<Description />} />
            <Route path="/details/:id/additional" element={<AdditionalInfo />} />
          </Route>

        </Routes>

      </Box>
    </CommerceContext.Provider>
  )

}

export default App