import React, { useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import {useCookies} from 'react-cookie'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
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


const Login = () => {
    const [cookies,setCookie,removeCookie] = useCookies(['token']);

    const [alert,setAlert] = useState({
      show:false,
      bypass:false,
      msg:''
    })
  
    const onFinish = (values) => {
      axios.post('http://localhost:4000/login',values).then(res=>{
        if(res.data.success){
          setCookie('token',res.data.token);
        }
        else{
          setAlert({
            show:true,
            bypass:false,
            msg:res.data.msg
          })
        }
        // console.log(res);
        
      }).catch(err=>{
        console.log(err)
      })
    };

    if(cookies.token){
      return <Redirect to="/dashboard" />
    }
    
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    
      return (
        <>
       {alert.show&&
         (<div className="outContainer">
            <p>{alert.msg}</p>
         </div>)
       }
        <div className="cont">
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
            name="email"
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
    
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        </div>
        </>
      );
}

export default Login
