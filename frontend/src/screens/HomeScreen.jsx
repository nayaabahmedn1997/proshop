import React, { useEffect, useState } from 'react'
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';
const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    const fetchedProducts = async ()=>{
        const {data} = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
    }

    useEffect(()=>{
        fetchedProducts();
    },[]);

  return (
    <>
        <h1>Latest Products</h1>
        <Row>
            {
                products.map((product)=>
                    (<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product key={product._id} product={product}/>
                    </Col>)
                )
            }
        </Row>
    </>
  )
}

export default HomeScreen