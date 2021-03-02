import logo from './logo.svg';
import './App.scss';
import UserTable from './UserTable'
import 'antd/lib/style/index.less'
import Auth from './Auth'
import AddUser from './AddUser'
import EditUser from './EditUser'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Provider } from 'react-redux'
import reducer from './redux/reducer'
import { createStore } from 'redux'

const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
 
  return (
    
    <div style={{padding: "24px"}}>
  
  <Router>
  <Provider store = {store}>
          <Route path="/" exact>
            <Auth />
          </Route>
          <Route path="/users" exact>
            <UserTable />
          </Route>
          <Route path="/add"exact >
          <AddUser/> 
          </Route>
          <Route path="/edit"exact >
          <EditUser/> 
          </Route>
          </Provider>
        </Router>
    
  </div>
  );
}

export default App;
