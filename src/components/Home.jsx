import React, { useCallback, useContext } from 'react'
import ProductGrid from './ProductGrid';
import Button from '@mui/material/Button';
import {CommerceContext} from '../context/Context'

const Home = () => {
    const {products, setLimit}=useContext(CommerceContext)

    const loadDetails=useCallback((id)=>{
        
    },[])
    return (
        <>
            <img className='w-[100%] h-[70vh] object-cover' src='/src/assets/carosle2.jpg' />
            <ProductGrid products={products} />
            {!!products.products && !!Object.values(products.products).length > 0 &&
                <Button variant='contained' sx={{ mb: 2 }} onClick={() => {
                    setLimit(prev => prev + 10)
                }}>
                    Load More
                </Button>}
        </>
    )
}

export default Home