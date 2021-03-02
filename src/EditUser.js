import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { Form, Input, InputNumber, Button,notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};



const Demo = () => {
  const auth = useSelector((state) => state.auth);
  console.log(auth)
  let history = useHistory();
  var record = JSON.parse(localStorage.getItem('record'))
  const onFinish = (e) => {

    axios({
      method: 'put',
      url: `https://reqres.in/api/users/${record.id}`,
      data : {
        "firstName": e.firstName,
        "lastName" : e.lastName,
        "email" : e.email
          }
    }).then(res => {
        if (res) {
          notification.open({
            message: 'Values Updated',
            description: 'Operation Successful',
            onClick: () => {
              console.log('Notification Clicked!')
            },
          })
          window.history.back();
          
        } else {
          notification.open({
            message: 'Error Occured',
            description: 'No Data Loaded.Try Again!',
            onClick: () => {
              console.log('Notification Clicked!')
            },
          })
        }
      })
    
  };
  console.log(auth)
  console.log(localStorage.getItem('auth'))
  if(!localStorage.getItem('auth'))
  return (
    <Redirect to = "/"></Redirect>
  )

  return (
   
    <Form {...layout} name="nest-messages" onFinish={onFinish} >
     
     
      <Form.Item name="firstName" label="First Name" initialValue ={record.first_name}>
        <Input />
      </Form.Item>
      
      <Form.Item name="lastName" label="Last Name" initialValue ={record.last_name}>
        <Input />
      </Form.Item>
      <Form.Item name= "email" label="email" initialValue ={record.email}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Demo