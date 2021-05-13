import React, { useState } from 'react'
import 'antd/dist/antd.css';
import axios from 'axios'
import { Form, Input, Button, Checkbox } from 'antd';
import './styles.css'
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

const Register = () => {

  const [alert,setAlert] = useState({
    show:false,
    bypass:false,
    msg:''
  })
    
    const onFinish = (values) => {
      console.log('Success:', values);
      axios.post('http://localhost:4000/register',values).then(res=>{
        if(res.data.success){
          setAlert({
            show:true,
            bypass:true,
            msg:'registered succesfully , login now'
          })
        }
        else{
          setAlert({
            show:true,
            bypass:false,
            msg:res.data.msg
          })
        }
        
      }).catch(err=>{
        console.log(err)
      })
    };
    
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    
      return (
        <>
       { alert.show&&(<div style={{background:`${alert.bypass?'green':'red'}`}} className="outContainer">
            <p>{alert.msg}</p>
        </div>)}
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

export default Register
