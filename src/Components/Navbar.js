import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import './Navbar.css';

const Navbar = ({totalItems}) =>
{
    const location = useLocation();
    return(
        <>
            <AppBar className='appBar' position='fixed' color='inherit'>
                <Toolbar>
                    <Typography variant='h6' className='title' color='inherit' component={Link} to="/">
                        <img src='https://cdn.iconscout.com/icon/free/png-64/shop-338-454916.png' 
                                className='image' alt='Wad - Ecommerce' height="25px"/>
                            WAD - Commerce
                    </Typography>
                    <div className='grow'/>

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