
import { Layout } from "antd";
import { useTranslation } from "react-i18next";
import { Routes } from "../../../constants/routes";
import { SendOutlined, AlignRightOutlined } from "@ant-design/icons";
import TabbedMenuLayout from "../../TabbedMenuLayout";

import { Route, Switch, Redirect } from "react-router-dom";
import { lazy } from "react";

 


const Telegram_Confing = lazy(() => import('./telegram'));

const Telegram_Confing_List = lazy(() => import('./telegram/list'));

export default function ConfigurationsLayouts() {
  const { Content } = Layout;
  const { t } = useTranslation();

  const menuItems = [
   
    {
      key: Routes.Telegram_Confing,
      content: (
        <>
          <SendOutlined />
          <span> {t("setter.layouts.configurations.nav.tgc")}</span>
        </>
      ),
    },
    {
      key: Routes.Telegram_Confing_List,
      content: (
        <>
          <AlignRightOutlined />
          <span> {t("setter.layouts.configurations.nav.tgc_L")}</span>
        </>
      ),
    } 
  ];

  return (
    <>
      <TabbedMenuLayout items={menuItems} />
      <Content>
        <Switch >
          < Route path={ Routes.Telegram_Confing } component={ Telegram_Confing } />
          < Route path={ Routes.Telegram_Confing_List } component={ Telegram_Confing_List } />
          <Redirect to={ Routes.Telegram_Confing } />
        </Switch>
      </Content>
    </>
  );
}
