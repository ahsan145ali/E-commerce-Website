import React from "react";
import {Grid} from "@material-ui/core";
import Product from "./Product/Product";
import './products.css';

/*
const p = [
    {id:1,name:'shoes',description:'running shoes' , price:'$20' , image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEr4t0YA9pj5ilqWB_Z73JBjPLMOhfSC0i5w&usqp=CAU'},
    {id:2,name:'MacBook',description:'Apple Macbook',price:'$10', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9_XTZweCcTkZ8hAEZP-G7Twl2wfv0SBttow&usqp=CAU'},
] */
const products = ({products , onAddToCart}) =>
{
    return(
        <main className="content">
            <div className="toolbar"></div>
            <Grid container justifyContent="center" spacing={4}>
                
                {products.map((prod) =>(
                    <Grid  key={prod.id} item xs={12} sm = {6} md={4} lg={3}> 
                        <Product product = {prod} 
                                onAddToCart = {onAddToCart}/>
                    </Grid>
                ))}
            </Grid>

        </main>
    );
}

export default products;