//GraphQL endpoint: https://4uy7rxusbnclzikom6uvz2z4du.appsync-api.us-west-2.amazonaws.com/graphql
//GraphQL API KEY: da2-hqmi3cs7rvfkjiist2tqk6nhhm

import './App.css';
import React from 'react';

import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function Signin() {
  return (
    <div className="App">
      <header className="App-header">
       <AmplifySignOut />
      </header>
    </div>
  );
}

export default withAuthenticator(Signin)
