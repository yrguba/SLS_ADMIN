import React, {useEffect} from 'react';
import './wrapper.less';
import { Link } from 'react-router-dom';
import {
    TeamOutlined,
    LineChartOutlined,
    RocketOutlined,
    LogoutOutlined,
    ClockCircleOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import { _getClient, logOut } from "../../service";

const regularTabs = [
    {
        href: '/',
        title: 'Пользователи',
        icon: <TeamOutlined size="large"/>
    },
    {
        href: '/statistic',
        title: 'Статистика',
        icon: <LineChartOutlined />
    },
    {
        href: '/devices',
        title: 'Управление',
        icon: <RocketOutlined />,
    },
    {
        href: '/watches',
        title: 'RunGo',
        icon: <ClockCircleOutlined />
    },
    {
        href: '/search',
        title: 'Поиск устройств',
        icon: <SearchOutlined />,
    },
];

const rungoTabs = [
    {
        href: '/watches',
        title: 'RunGo',
        icon: <ClockCircleOutlined />
    }
];

const regularSlsTabs = [
    {
        href: '/',
        title: 'Пользователи',
        icon: <TeamOutlined size="large"/>
    },
    {
        href: '/statistic',
        title: 'Статистика',
        icon: <LineChartOutlined />
    },
    {
        href: '/devices',
        title: 'Управление',
        icon: <RocketOutlined />,
    },
    {
        href: '/search',
        title: 'Поиск устройств',
        icon: <SearchOutlined />,
    },
]

const rungoUsers = [
    "stukanov.p@ascrem.com",
    "miroshnik.m@ascrem.com",
    "fedorov.m@ascrem.com",
    "utkachere000@gmail.com"
]

let currentTabs = rungoUsers.includes(_getClient()) ? regularTabs : regularSlsTabs;

function Wrapper(props) {
    // useEffect(() => {
    //     if (_getClient() === 'apps@defacto-group.ru') {
    //         currentTabs = rungoTabs;
    //         props.history.push('/watches')
    //     } else {
    //         if (_getClient() === 'antipov@tfnopt.ru') {
    //             currentTabs = regularSlsTabs;
    //         } else {
    //             currentTabs = regularTabs;
    //         }
    //     }
    // }, []);

    return (
        <div>
            <div className="sider">
                <div className="logo">
                    <img src="/assets/images/logo.svg"/>
                </div>
                <div className="sider-tabs">
                    <ul className="nav">
                        {
                            currentTabs.map(tab =>
                                <li
                                    className={props.match?.url === tab.href ? 'active' : ''}
                                >
                                    <Link
                                        to={tab.href}
                                        style={{ marginLeft: '5px'}}
                                    >
                                        {tab.icon}
                                        <p>{tab.title}</p>
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                    <ul className="nav">
                        <li>
                            <a
                                onClick={logOut}
                                className="logout"
                            >
                                <LogoutOutlined />
                                <span>Выйти</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="layout">
                <div
                    style={{
                        padding: 24,
                        minHeight: '100vh',
                        background: '#F1F4F9'
                    }}
                >
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Wrapper;
