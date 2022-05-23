import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import './index.scss';
import menuConfig from '@/config/menuConfig';
import { useNavigate } from 'react-router-dom';
import { GetUrlRelativePath } from '@/utils/common';

const Nav = (props: any) => {
  const navigate = useNavigate();
  const path = GetUrlRelativePath();
  // 菜单渲染
  const renderMenu = (data: any) => {
    return data.map((item: any) => {
      if (item.children) {
        {
          renderMenu(item.children);
        }
      }
      return (
        <div
          key={item.key}
          onClick={() => {
            onChangeNav(item.key);
          }}
          className={path.includes(item.key) ? "menu_item_active menu_item" : "menu_item"}
        >
          <item.icon />
          <span className="item">{item.title}</span>
        </div>
      );
    });
  };

  const onChangeNav = (key: string) => {
    goChangeNav(key);
  };

  const goChangeNav = (key: string) => {
    goRoute(key);
  };

  const goRoute = (key: string) => {
    navigate(key);
  };

  return <div className="nav_wrap">{renderMenu(menuConfig)}</div>;
};

export default observer(Nav);
