import React, { FC, useEffect } from "react";
import { Button } from "antd";
import "./index.scss";
import { useLocation } from 'react-router-dom'

const Login: FC<{}> = () => {
  const location = useLocation()
  useEffect(() => {
    console.log(location, 'props')
  }, [])
  return <div className="login">
         <Button type="primary" onClick={()=>{}}>登录</Button>
    </div>;
};

export default Login;
