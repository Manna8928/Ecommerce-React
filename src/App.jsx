import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Box from '@mui/material/Box';
import Home from './components/Home';
import { CommerceContext } from './Context'
import { Route, Routes } from 'react-router';
import { Details } from '@mui/icons-material';

const App = () => {

  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(10);

  const url = useMemo(() => {
    return "https://dummyjson.com/products?limit=" + limit
    // +"&skip=5"
  }, [limit])
  
  useEffect(() => {

    fetch(url)
      .then(data => data.json())
      .then(result => setProducts(result))
  }, [url])

  console.log(products)

  return (
    <CommerceContext.Provider value={{ products }}>
      <Box className='app' sx={{ pt: "5px" }} >
        <Navbar />
        <Routes>
          <Route path='/' element = {<Home/>}/>
          <Route path='/details/:id' element={<Details/>} />
          
        </Routes>
        
      </Box>
    </CommerceContext.Provider>
  )

}

export default App