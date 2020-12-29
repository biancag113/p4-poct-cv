import { AmplifyS3Image, withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from './../../aws-exports';
import  { listProducts } from './../../graphql/queries'
import { useEffect, useState } from 'react';
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify';
import React from 'react';

import { Paper, IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ReactPlayer from 'react-player';

Amplify.configure(awsconfig);

function YourTests() {
  const [products, setProducts] = useState([]);
  const [productOn, setProductOn] = useState('')
  const [productURL, setProductURL] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const toggleProduct = async idx => {
        if (productOn === idx) {
            setProductOn('')
            return;
        }

        //get file path from products array
        const productFilePath = products[idx].filePath;
        try {
            const fileAccessURL = await Storage.get(productFilePath, { expires: 60 });
            console.log('access url', fileAccessURL);
            setProductOn(idx);
            setProductURL(fileAccessURL)
            return
        } catch (error) {
            console.log('error accessing the file from s3', error);
            setProductURL('');
            setProductOn('')
        }
  };

  

  const fetchProducts = async () => {
    try {
        const productData = await API.graphql(graphqlOperation(listProducts))
        const productList = productData.data.listProducts.items;
        console.log('product list', productList);
        setProducts(productList);
    } catch (error) {
        console.log('error on fetching products', error)
    }
  }

  return (

      <div className='productList'>
        { products.map((product, idx) => {
            return(
              <>
             <div className='productCard'>
              <div id='productframe'>
                  <p>Name:  {product.name}</p>
                  <p>Date/Time: {product.createdAt}</p>
                  <p>Result: {product.result} </p>
                  <p><AmplifyS3Image path={product.filePath} /></p>
              </div>
              </div>
              </>
            );
        })}

      </div>

  );
}


export default YourTests
