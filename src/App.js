import React,{useState , useEffect} from "react";
import { commerce } from "./Components/lib/Commerce_prod";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';

/* Importing Components */
import CartScreen from './Components/Cart/CartScreen'
import Navbar from "./Components/Navbar";
import PRODUCTS from "./Components/Products/products";
import Checkout from "./Components/Checkout/Checkout";

import './App.css'

const App = () =>{
    const [products , setProducts] =  useState([]);
    const [categories , setCategories] =  useState([]);
    const [cart,setCart] = useState({});
    const [order , setOrder] = useState({});
    const [errorMessage , setErrorMessage] = useState('');
    const [loading , setloading] = useState(false);

    const fetchProducts = async () =>{
        setloading(true);
        await commerce.products.list().then(({data})=>{
            try{
                setloading(false);
                setProducts(data);
            }
            catch(err){
                alert(err);
            }
        }); 
        //const { data } = await commerce.products.list({category_slug: ['Electronics'],}); 
        const {data: categoriesData} = await commerce.categories.list();
        setCategories(categoriesData)
        
    }

    const fetchByCategory = async( cat_name) =>{
        setloading(true);
         await commerce.products.list({category_slug: [cat_name]}).then(({data})=>{
            try{
                setloading(false);
                setProducts(data);
            }catch(err){

            }
        }); 
        
    }

    const fetchCart = async () =>{
        const response  = await commerce.cart.retrieve();
        setCart(response);
    }

    const handleAddToCart = async (id , quantity) =>
    {
        const addItem  = await commerce.cart.add(id , quantity);
        setCart( addItem.cart);
    }
    
    const handleUpdateCartQTY = async (id , quantity) =>
    {
        const response = await commerce.cart.update(id,{quantity});

        setCart(response.cart);
    }

    const handleRemoveFromCart = async (id) =>
    {
        const response = await commerce.cart.remove(id);
        setCart(response.cart);
    }

    const handleEmptyCart = async() =>{
        const responce  = await commerce.cart.empty();
        setCart(responce.cart);
    }

    const refreshCart = async() =>{
        const newcart = await commerce.cart.refresh();
        setCart(newcart);
    }
    const handleCaptureCheckout = async(checkoutTokenId , newOrder) =>{

        try{
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incomingOrder);
            refreshCart();

        }catch(error){
            setErrorMessage(error.data.error.message);
        }

    }


    useEffect(()=>{
       
        fetchProducts();
        fetchCart();
       // FetchCategoreis();
    },[] )

    
    return(
        <Router>
            <div>
                {loading? 
                    <div className="overlay">   
                    <LoadingOverlay active = {true} spinner text="loading" className='spinner'></LoadingOverlay>
                    </div>
                    :
                    null
                }
                <Navbar totalItems = {cart.total_items} 
                        fetchByCategory = {fetchByCategory}
                        fetchProducts = {fetchProducts} 
                        categories = {categories}/>
                        
                <Routes>
                    <Route exact path = "/" 
                       element = {<PRODUCTS  products = {products} onAddToCart = {handleAddToCart}/>}/>
                    

                    <Route exact path ="/cart"
                       element =  {
                            <CartScreen 
                                cart = {cart}
                                handleEmptyCart  = {handleEmptyCart}
                                handleRemoveFromCart ={handleRemoveFromCart}
                                handleUpdateCartQTY = {handleUpdateCartQTY}
                            />
                    }/>
                    <Route exact path = "/checkout" 
                        element = { 
                                     <Checkout  
                                        cart = {cart}
                                        order = {order}
                                        onCaptureCheckout = {handleCaptureCheckout}
                                        error = {errorMessage}
                                        />
                                
                                }
                    />
                
                </Routes>
            </div>
        </Router>
    );
}

export default App;