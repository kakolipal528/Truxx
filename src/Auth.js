import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Button, Checkbox,notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { createStore } from 'redux'
import reducer from './redux/reducer'
import { browserHistory, Redirect } from 'react-router';
import { useHistory } from "react-router-dom";

const store = createStore(reducer);

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Demo = () => {
  let history = useHistory();
  const dispatch = useDispatch()
  
  const auth = useSelector((state) => state.auth);
  const onFinish = (values) => {


  
  //  dispatch({type : "loggedin"})

  localStorage.setItem("auth","true");


 
    // console.log( localStorage.getItem("auth")+"OK")
    
    // store.dispatch({ type: 'loggedin' })


console.log("DIS")
    notification.open({
      message: 'Logged In',
      description: 'Logged In',
      onClick: () => {
        console.log('Notification Clicked!')
      },
    })
     history.push('/users')
  
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Demo