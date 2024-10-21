
import { Layout } from "antd";
import { useTranslation } from "react-i18next";

import {
    AuditOutlined,
    PieChartOutlined,
    DownloadOutlined,
    UploadOutlined,
    FieldTimeOutlined,
    TransactionOutlined,
    ControlOutlined,
} from "@ant-design/icons";

import TabbedMenuLayout from "../../TabbedMenuLayout";

import { Routes } from "constants/routes";
import { Redirect, Route, Switch } from "react-router-dom";
import { lazy } from "react";
 

const withdrawals = lazy(() => import("./withdrawals"));

const pendingWithdrawals = lazy(() => import("./pending-withdrawals"));
 

export default function OperationsLayout() {
    const { Content } = Layout;
    const { t } = useTranslation();

    const menuItems = [
        
        {
            key: Routes.Withdrawals,
            content: (
                <>
                    <UploadOutlined />
                    <span>{t("setter.layouts.operations.nav.withdrawals")}</span>
                </>
            ),
        },
        {
            key: Routes.PendingWithdrawals,
            content: (
                <>
                    <FieldTimeOutlined />
                    <span>{t("setter.layouts.operations.nav.pendingWithdrawals")}</span>
                </>
            ),
        } 
    ];

    return (
        <>
            <TabbedMenuLayout items={menuItems} />
            <Content>
                <Switch >  
                     
                     <Route path={Routes.Withdrawals} component={withdrawals} />

                     <Route path={Routes.PendingWithdrawals} component={pendingWithdrawals} />
 

                    <Redirect to={Routes.Withdrawals} />
                </Switch>
            </Content>
        </>
    );
}
