import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Box from '@mui/material/Box';
import Product from './components/ProductCard';
import ProductGrid from './components/ProductGrid';


const App = () => {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await fetch('https://fakestoreapi.com/products');
      const result = await data.json()
      setProducts(result);
    })();
  }, [])
  // console.log(products)


  return (
    <Box className='app' sx={{pt:"5px"}} >
      <Navbar />
      <img className='w-[100%] h-[70vh] object-cover' src='/src/assets/carosle2.jpg' />
      <ProductGrid products={products}/>
     
    </Box>
  )
}

export default App