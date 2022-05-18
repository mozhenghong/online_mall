// src/routes/index.tsx
import React, { FC, useEffect } from 'react';
import routes from './routesConfig';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { IRoute } from '@/types/router';

// 路由装饰器
const RouteDecorator = (props: { route: IRoute }) => {
  const { route } = props;

  useEffect(() => {
    // 自定义路由守卫
    route.beforeCreate && route.beforeCreate(route);
    return () => route.beforeDestroy && route.beforeDestroy(route);
  }, [route]);

  return <route.component />;
};

const RouterComponent: FC = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/index" />} />
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
