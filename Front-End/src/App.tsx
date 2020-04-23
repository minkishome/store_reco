import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Main from './Main';
import KakaoSignUp from '../src/components/Accounts/KaKaoSignUp';
import './App.css';
import './Page.css';
interface State {
  isLogin: boolean;
  actions: {
    onLogin: () => void;
    // onLogout: (string:string) => void,
  };
}
// export const contextStorage = React.createContext({});
class App extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLogin: this.isLogin(),
      actions: {
        onLogin: this.onLogin
        // onLogout: this.onLogout,
      }
    };
  }
  setStateAsync(state: object) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }
  isLogin = (): boolean => {
    const _id = window.sessionStorage.getItem('id');
    const _jwt = window.sessionStorage.getItem('jwt');
    if (_id && _jwt) {
      return true;
    }
    sessionStorage.clear();
    return false;
  };

  onLogin = async () => {
    sessionStorage.setItem('mode', 'home');
    await this.setStateAsync({
      isLogin: this.isLogin(),
    });
  };

  render() {
    return (
      <div className="app">
          <Route exact path="/" component={Main} />
          <Route path="/loginPage" component={KakaoSignUp} />
      </div>
    );
  }
}
export default withRouter(App);
