//ReactJS
import React, { useEffect, useState } from 'react';

//AWS 
import { AmplifyS3Image, withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from './../../aws-exports';
import  { listProducts } from './../../graphql/queries';
import { updateProduct, createProduct } from './../../graphql/mutations';
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify';

//uuid library to provide unique id to jpeg
import { v4 as uuid } from 'uuid';

//material-ui
import { IconButton, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PublishIcon from '@material-ui/icons/Publish';


Amplify.configure(awsconfig);

const AddProduct = ({onUpload}) => {

    const [productData, setProductData] = useState({});
    const [imgData, setImgData] = useState()
    
    const uploadProduct = async () => {
        //Upload the product
        console.log('productData', productData)
        const { name, result } = productData
        const { key } = await Storage.put(`${uuid()}.jpg`, imgData, { contentType: 'image/jpg/png' });
        const createProductInput = {
            id: uuid(),
            name,
            result,
            filePath: key
        }
        await API.graphql(graphqlOperation(createProduct, {input: createProductInput}))
        onUpload();
    }

    return (
        <div className='newProduct'>
            <TextField 
                label='name'
                value={productData.name}
                onChange={e => setProductData({...productData, name: e.target.value})}
            />
            <TextField 
                label='result'
                value={productData.result}
                onChange={e => setProductData({...productData, result: e.target.value})}
            />
            <input type='file' accept='image/jpg/png' onChange={e => setImgData(e.target.files[0])}></input>
            <IconButton onClick={uploadProduct}>
                <PublishIcon />
            </IconButton>
        </div>
    )
}

function YourTests() {
    const [products, setProducts] = useState([]);
    const [productOn, setProductOn] = useState('')
    const [productURL, setProductURL] = useState('')
    const [ showAddProduct, setShowAddNewProduct] = useState(false)
  
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
                    <p><AmplifyS3Image  path={product.filePath} /></p>
                </div>
                </div>
                </>
              );
          })}
        <div id='addButton'>
          {
              showAddProduct ? 
                  <AddProduct 
                      onUpload={() => {
                          setShowAddNewProduct(false);
                      }}/> : 
                  <IconButton onClick={() => setShowAddNewProduct(true)}> 
                      <AddIcon /> 
                  </IconButton>
          }
          </div>
  
        </div>
  
    );
  }
  
  export default YourTests;