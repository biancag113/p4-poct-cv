import { listProducts } from './../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Amplify from 'aws-amplify';
import awsconfig from './../../aws-exports';

Amplify.configure(awsconfig);

function YourTests() {

    useEffect(() => {
        fetchProducts();
    }, []);

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const productData = await API.graphql(graphqlOperation(listProducts));
            const productList = productData.data.listProducts.items;
            console.log('product list', productList);
            setProducts(productList);
        } catch (error) {
            console.log('error on fetching products', error);
        }
    };

    return(
        <div className="productList">
        {products.map((product) => {
        return (
                <div>
                    <div className="productTitle">{product.name}</div>
                    <div className="productOwner">{product.image}</div>
                    <div className="productDescription">{product.description}</div>
                </div>
                );
            })
        }
    </div>
    )
}

export default withAuthenticator(YourTests);