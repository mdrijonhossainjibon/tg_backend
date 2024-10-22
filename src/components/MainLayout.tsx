import React, { useEffect, useState } from "react";
import { Avatar, Button, Layout, Menu, Space, Switch, Dropdown } from "antd";
import { PoweroffOutlined, SwapOutlined, TeamOutlined, SettingOutlined, DashboardOutlined, GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { Routes } from "constants/routes";
import { MenuInfo } from "rc-menu/lib/interface";
import { useAuthContext } from "context";

import './index.css';
import { applyTheme, getTheme, isDarkMode, toggleTheme } from "utils/themeHelper";
import { useDispatch } from "react-redux";
import { changeColorTheme } from "modules";




interface Props {
  children: React.ReactNode;
}


export default function MainLayout({ children }: Props) {
  const { Footer, Header } = Layout;
  const { t, i18n } = useTranslation();  // Access i18n for language change
  const location = useLocation();
  const history = useHistory();
  const selectUsers: any = {}
  const { authorized , logout  } = useAuthContext();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');  // State for selected language
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    applyTheme()
    setDarkMode(isDarkMode());
  }, [])


  const handleToggle = (checked: boolean) => {
    // Toggle the theme and update state
    toggleTheme()
    setDarkMode(checked);
    dispatch(changeColorTheme(getTheme()) as any)
     
  };

  const menuItems = [
    { key: Routes.Dashboard, icon: <DashboardOutlined />, label: t("setter.header.tabs.dashboard") },
    { key: Routes.Users, icon: <TeamOutlined />, label: t("setter.header.tabs.users") },
    { key: Routes.Operations, icon: <SwapOutlined className="h-6" />, label: t("setter.header.tabs.operations") },
    { key: Routes.Configuration, icon: <SettingOutlined />, label: t("setter.header.tabs.configuration") },

  ];

  const menuItemOnClick = (e: MenuInfo) => {
    history.push(String(e.key));
  };

  const activeRoute = menuItems.find((item) => location.pathname.includes(item.key))?.key;

  // Language change handler
  const handleLanguageChange = (lng: string, langLabel: string) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(langLabel);  // Update the selected language state
  };

  // Language menu for dropdown
  const languageMenu = (
    <Menu >
      <Menu.Item key="en" onClick={() => handleLanguageChange("en", "English")}>
        English
      </Menu.Item>
      <Menu.Item key="es" onClick={() => handleLanguageChange("es", "Español")}>
        Español
      </Menu.Item>
      <Menu.Item key="fr" onClick={() => handleLanguageChange("fr", "Français")}>
        Français
      </Menu.Item>
      <Menu.Item key="bn" onClick={() => handleLanguageChange("bn", "বাংলা")}>
        বাংলা (Bengali)
      </Menu.Item>
      <Menu.Item key="hi" onClick={() => handleLanguageChange("hi", "हिन्दी")}>
        हिन्दी (Hindi)
      </Menu.Item>
      <Menu.Item key="zh" onClick={() => handleLanguageChange("zh", "中文")}>
        中文 (Chinese)
      </Menu.Item>
    </Menu>
  );


  return (
    <Layout className="setter-main-container">
      {authorized && (
        <Header className="setter-main-container-header   bg-white  dark:bg-[#001529]">
          <Avatar src={selectUsers?.avater || "https://api.dicebear.com/7.x/miniavs/svg?seed=8"} size="large" className="h-10 w-10 right-11" />

          <Menu
            theme={  getTheme()}
            className="setter-main-container-header-nav"
            mode='horizontal'
            onClick={menuItemOnClick}
            selectedKeys={activeRoute ? [activeRoute] : undefined}
            items={menuItems}
          />

          <Space>
            <Button
              type="primary"
              danger
              icon={<PoweroffOutlined />}
              onClick={ logout }
              className="setter-main-container-header-logout"
            >
              Logout
            </Button>
            <Dropdown overlay={languageMenu} trigger={['click']}>
              <Button icon={<GlobalOutlined />} > {selectedLanguage} </Button>
            </Dropdown>
            <Switch
              checkedChildren="🌙"
              unCheckedChildren="☀️"
              value={darkMode}
              onChange={handleToggle}
            />
          </Space>
        </Header>
      )}
      <Layout>{children}</Layout>
     { window.location.hostname === '/setter/internal/dashboard' ? <Footer className={"setter-main-footer"}>
        Powered by <a href={`${window.location}`}>Md Rijon Hossain Jibon YT</a>
      </Footer>
      :  null}
    </Layout>
  );
}
