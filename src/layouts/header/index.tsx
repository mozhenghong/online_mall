import React, { FC } from "react";
import { useStores } from "@/store";
import { observer } from "mobx-react";
import { Popover } from "antd";
import "./index.scss";
import logoSrc from "@/assets/login/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";

interface IProps {
  patientInformation?: string;
}

const Header: FC<IProps> = (props) => {
  const navigate = useNavigate();
  const { patientInformation } = props;
  let store = useStores();
  const {
    userStore: { logout },
  } = store;

  const content = (
    <div className="menu_wrap">
      <div
        className="menu"
        onClick={async () => {
          logout().then(() => {
            navigate("/login");
          });
        }}
      >
        <span>退出登录</span>
      </div>
    </div>
  );
  const userName: string | null = window.localStorage.getItem("userName");
  return (
    <div className="header_wrap">
      <div className="left_box">
        <img src={logoSrc} alt="" />
        <span className="title">xxxx</span>
        {patientInformation && <span className="line"></span>}
        <span className="patient_information">{patientInformation}</span>
      </div>
      <div className="right_box">
        <Popover
          placement="bottomRight"
          content={content}
          title=""
          trigger="hover"
        >
          <span className="avatar">
            {userName &&
              (userName.length > 3
                ? userName.substring(userName.length - 4)
                : userName)}
          </span>
        </Popover>
      </div>
    </div>
  );
};

export default observer(Header);
