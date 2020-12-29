import Amplify from 'aws-amplify';

Storage.put('test.txt', 'Hello')
        .then (result => console.log(result))
        .catch(err => console.log(err));