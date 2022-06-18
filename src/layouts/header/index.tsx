import React, { FC, useState, useEffect } from "react";
import { useStores } from "@/store";
import { observer } from "mobx-react";
import { Input, Popover, Tooltip } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { getUserInfo, UserInfo } from '@/api/user';
import { UserOutlined, VideoCameraOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import AddCourse from '@/pages/courseManagement/components/addCourse';

export const menuList = [
  {
    title: '视频管理',
    key: '/videoManagement',
    role: 'teacher, admin',
    icon: VideoCameraOutlined
  },
  {
    title: '用户管理',
    key: '/userManagement',
    role: 'admin',
    icon: UserOutlined
  },
];

interface Iprops {
  path: string;
}

const Header: FC<Iprops>= (props) => {
  const navigate = useNavigate();
  const {path} = props
  const {
    userStore: { logout, roles, setRoles },
    courseStore: { setSearch }
  } = useStores();

  const [userName, setUserName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [addCoursevisible, setAddCourseVisible] = useState(false);

  const onChangeNav = (key: string) => {
    setCourseName('')
    navigate(key);
  };

  const handleSearch = () => {
    setSearch(courseName)
    navigate('/');
  }

  useEffect(() => {
    getUserInfo().then(({ data }: { data: UserInfo }) => {
      setRoles(data.roles);
      setUserName(data.username);
    })
  }, [])

  const content = (
    <ul className="menu_wrap">
      <li
        className="menu"
        onClick={async () => {
          setCourseName('')
          navigate("/orderManagement");
        }}
      >
        <span>订单</span>
      </li>
      <li
        className="menu"
        onClick={async () => {
          logout().then(() => {
            navigate("/login");
          });
        }}
      >
        <span>退出登录</span>
      </li>
    </ul>
  );

  return (
    <div className="header_wrap">
      <div className={(path==="/"||path==="/detail"||path==="/videoPlay")?"header header-course":"header"}>
        <div className="left_box">
          <span className="title" onClick={() => navigate('/')}>课程</span>
        </div>
        <div className="right_box">

          <Input placeholder="请输入课程名称搜索" style={{ width: 300, marginRight: 24 }} value={courseName} onChange={(e) => setCourseName(e.target.value)} suffix={<SearchOutlined style={{ cursor: 'pointer' }} onClick={handleSearch} />} />
          {roles.filter((role) => (role.name ==='teacher' ||role.name ==='admin')).length?<Tooltip title="新建课程">
            <AppstoreAddOutlined onClick={() => setAddCourseVisible(true)} />
          </Tooltip>:null}
          <div className="nav">
            {menuList.map((item) => (
              <>
                {roles.filter((role) => item.role.includes(role.name)).length ? <div
                  key={item.key}
                  onClick={() => {
                    onChangeNav(item.key);
                  }}
                  className={path.includes(item.key) ? "menu_item_active menu_item" : "menu_item"}
                >
                  <Tooltip title={item.title}>
                    <item.icon />
                  </Tooltip>
                  {/* <span className="item">{item.title}</span> */}
                </div> : null}
              </>

            ))}
          </div>
          <Popover
            placement="bottomRight"
            content={content}
            title={`账号：${userName}`}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
          >
            <span className="avatar">
              {userName &&
                (userName.length > 3
                  ? userName.substring(userName.length - 4)
                  : userName)}
            </span>
          </Popover>
        </div>
        <AddCourse
          visible={addCoursevisible}
          onSuccess={(id) => {
            navigate(`detail?id=${id}`)
          }}
          onChangeVisible={(visible: boolean) => {
            setAddCourseVisible(visible);
          }} />
      </div>
    </div>
  );
};

export default observer(Header);
