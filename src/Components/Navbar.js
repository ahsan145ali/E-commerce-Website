import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography , Button } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import './Navbar.css';

const Navbar = ({totalItems , fetchByCategory ,fetchProducts , categories}) =>
{
    const location = useLocation();
    const showC = ()=>
    {
        
    }
    return(
        <>
            <AppBar className='appBar' position='fixed' color='inherit'>
                <Toolbar>
                    <Typography variant='h6' className='title' color='inherit' component={Link} to="/">
                        <img src='https://cdn.iconscout.com/icon/free/png-64/shop-338-454916.png' 
                                className='image' alt='Wad - Ecommerce' height="25px"/>
                            WAD - Commerce
                    </Typography>
                    
                    <div className='cat_b'>
                     <Button onClick={fetchProducts} > ALL </Button>
                        {categories.map((cat)=>
                            <Button  key={cat.id} onClick={()=>fetchByCategory(cat.slug)}>{cat.slug}</Button>
                        )}
                    </div>
                    
                    {location.pathname == '/' ? (
                    <div className='button'>
                        <IconButton aria-label="Show cart items" color="inherit" component = {Link} to="/cart">
                            <Badge badgeContent = {totalItems} color="secondary">
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>  
                    </div>): null}
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;