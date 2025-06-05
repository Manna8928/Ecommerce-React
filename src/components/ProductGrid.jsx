import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Product from './ProductCard';

export default function ProductGrid({ products }) {
    return (
        <Grid
            container
            spacing={3}
            direction="row"
            sx={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                m:"auto",
                p:4,
            
            }}
        >
            {products.map(product =>
                <Grid key={product.id} size={{xs:6,md:3,xl:2}} >
                    <Product key={product.id} {...product} />
                </Grid>
            )}
        </Grid>

    );
}
