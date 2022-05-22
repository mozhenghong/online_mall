// src/routes/index.tsx
import React, { FC, useEffect } from 'react';
import routes from './routesConfig';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from "@/layouts/header";
import Nav from "@/layouts/nav";

// 路由装饰器
const RouteDecorator = (props: { route: any }) => {
  const { route } = props;
  const { pathname } = route;

  useEffect(() => {
    // 自定义路由守卫
    route.beforeCreate && route.beforeCreate(route);
    return () => route.beforeDestroy && route.beforeDestroy(route);
  }, [route]);
  return <>
    {(pathname !== 'login' && pathname !== 'register') && <Header />}
    {(pathname !== 'login' && pathname !== 'register') && <Nav />}
    <route.component />
  </>
};

const RouterComponent: FC = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="*" element={<div />} />
    {routes.map(route => (
      <Route
        key={route.pathname}
        path={route.pathname}
        element={<RouteDecorator route={route} />}
      />
    ))}
  </Routes>
);

export default RouterComponent;
