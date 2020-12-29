import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
import NavBar from './components/NavBar.js';
import { AddTest } from './views/AddTest';
import { Help } from './views/Help';
import { Messages } from './views/Messages';
import { Routes } from './Routes.js';
import { Route, Switch, Redirect } from 'react-router-dom';
import  { listProducts } from './graphql/queries'
import { useEffect, useState } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';

Amplify.configure(awsconfig);

function Signin() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
  }, [])

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
    <div id="App">
      <header>
        <AmplifySignOut className='signout' />
        <NavBar className='navbar' />
      </header>
      <div className='productList'>
        { products.map(product => {
            return(
              <>
              <div id='productframe'>
              <p>Test: {product.name}</p>
              <p>Image: {product.image}</p>
              <p>Date: {product.createdAt}</p>
              </div> 
              </>
            )
        })}
      </div>

      <Switch>
        <Route exact path="/">
          <Redirect to="/" />
        </Route>
        <Route exact path="/" component={Routes} />
        <Route exact path="/AddTest" component={AddTest} />
        <Route exact path="/Help" component={Help} />
        <Route exact path="/Messages" component={Messages} />
      </Switch>

    </div>
  );
}


export default withAuthenticator(Signin)
