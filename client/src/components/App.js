import React, {Component} from 'react';
import {calling} from '../services/api';

class App extends Component {

  async componentDidMount() {
    const result = await calling('post', 'auth/login', {
      username: 'username',
      password: 'password'
    });

    console.log(result);
  }

  render() {
    return (
      <div>
        <h1>everything is ok.</h1>
      </div>
    )
  }
}

export default App;
