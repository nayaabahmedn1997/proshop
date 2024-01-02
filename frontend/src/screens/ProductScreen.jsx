import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';
const ProductScreen = () => {

    const [product, setProduct] = useState({});
    const {id:productId} = useParams();

    const fetchedProduct = async ()=>{
        const {data} = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(data);
    }
    useEffect(()=>{
        fetchedProduct();
    },[]);
   

  return (
    <>
        <Link className='btn btn-light my-3' to="/" >
        Go Back
        </Link>
        <Row>
            <Col md={5}>
                <Image  src={product.image}  alt={product.name} fluid />
            </Col>
            <Col md={4}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                     <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <p> <strong>Description: </strong>  {product.description}</p>
                    </ListGroup.Item>
                 
                          
                          
                   
                </ListGroup>
            </Col>
            <Col md={3} className='border'>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Price:
                            </Col>
                            <Col>
                            <strong>${product.price}</strong>
                            </Col>
                          
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Status:
                            </Col> 
                            <Col>
                            <strong>{product.countInStock > 0 ? "Instock" : "Out of stock"}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Button
                        className='btn-block'
                        type='button'
                        disabled={product.countInStock === 0}
                        >
                                Add to Cart
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    </>
  )
}

export default ProductScreen