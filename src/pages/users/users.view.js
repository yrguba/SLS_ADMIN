import React, { useEffect, useState } from 'react';
import Wrapper from '../../components/wrapper';
import Table from "../../components/table";
import {
    Typography,
    Input,
    Pagination,
    Button,
    Modal,
    message,
    Form,
    Checkbox,
} from 'antd';
import Avatar from 'react-avatar';
import {
    SearchOutlined,
} from '@ant-design/icons';
import './users.less';
import moment from "moment";
import { UserDevicesColumns as columns } from "./columns";

const { Title } = Typography;

const permissionsOptions = ['admin-scope-mngt', 'admin-category-mngt'];

function UsersView(props) {
    const [usersList, setUsersList] = useState([]);
    const [userDevices, setUserDevices] = useState([]);
    const [paginationState, setPaginationState] = useState({
        page: 0,
        size: 100
    });
    const [totalCount, setTotalCount] = useState(null);
    const [queryEmailString, setQueryEmailString] = useState(null);
    const [userDevicesModalVisible, setUserDevicesModalVisible] = useState(false);
    const [userDeviceUnlinkModalVisible, setUserDeviceUnlinkModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentDeviceId, setCurrentDeviceId] = useState(null);
    const [permissionsModalVisible, setPermissionsModalVisible] = useState(false);
    const [checkedPermissionsOptions, setCheckedPermissionsOptions] = useState(permissionsOptions);

    const usersColumns =
        [
            {
                title: 'Имя',
                dataIndex: 'name',
                key: 'name',
                width: 15,
                render: (value) => {
                    return(
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <Avatar
                                size={40}
                                name={value.name}
                                round={true}
                            />
                            <span
                                style={{
                                    marginLeft: '10px'
                                }}
                            >
                                {value.name}
                            </span>
                        </div>
                    );
                }
            },
            {
                title: 'Электронная почта',
                dataIndex: 'email',
                key: 'email',
                width: 15,
            },
            {
                title: 'Дата регистрации',
                dataIndex: 'created_at',
                key: 'created_at',
                width: 10,
                color: '#9BA3B1',
                size: '12',
                render: (value) => {
                    return moment(value.created_at * 1000).format('LLL')
                },
                sorted: true,
            },
            {
                title: 'Устройства',
                dataIndex: 'devices_count',
                key: 'devices_count',
                width: 7,
                sorted: true
            },
            {
                title: 'Дома',
                dataIndex: 'homes',
                key: 'homes',
                width: 7,
                sorted: true
            },
            {
                title: 'Права',
                dataIndex: 'permissions',
                key: 'permissions',
                width: 10,
                render: (value) => {
                    return <Button
                        style={{ width: '80%' }}
                        onClick={(event) => {
                            setCurrentUser(value);
                            event.preventDefault();
                            event.stopPropagation();
                            showPermissionsModal();
                            props.getUserPermissions(value.id);
                        }}
                    >
                        Права
                    </Button>
                }
            },
            {
                title: <Button>сообщение ВСЕМ</Button>,
                dataIndex: 'send_message',
                key: 'send_message',
                width: 15,
                render: (value) => {
                    return <Button>Отправить сообщение</Button>
                }
            },
        ];

    useEffect(() => {
        props.getUsers(paginationState);
        props.getPermissions();
    }, []);

    useEffect(() => {
        if (props.pagination) {
            setTotalCount(props.pagination.total_count);
        }
    }, [props.pagination]);

    useEffect(() => {
        if (props.device_unlink) {
            props.getDevicesByUser(currentUser.id);
            message.success('Устройство успешно отвязано');
        }
    }, [props.device_unlink]);

    const getDevicesCount = (user) => {
        let count = 0;
        user.home_device_counts.map(home => {
            count += home.device_count;
        });

        return count;
    };

    const unlinkDeviceFromUser = (tId) => {
        setCurrentDeviceId(tId);
        showUserUnlinkDeviceModal();
        //if (tId) props.unlinkDeviceFromUser(tId);
    }

    useEffect(() => {
        if (props.users) {
            const usersTemp = [];
            let count = 0;
            props.users.forEach(user => {
                user['key'] = user.id;
                user['devices_count'] = getDevicesCount(user);
                user['homes'] = user?.home_device_counts.length;
                usersTemp.push(user);
                if (user.home_device_counts.length > 0) {
                    count++;
                }
            });
            setUsersList(usersTemp);
        }
    }, [props.users]);

    useEffect(() => {
        if (props.users_devices) {
            setUserDevices(props.users_devices);
        }
    }, [props.users_devices]);

    useEffect(() => {
        props.getUsers({...paginationState, queryEmailString});
    }, [paginationState, queryEmailString]);

    const searchUser = (event) => {
        setQueryEmailString(event.target.value);
    }

    const onChangePage = (page, size) => {
        setPaginationState({
            ...paginationState,
            page,
            size
        })
    };

    const getUserDevices = (id) => {
        props.getDevicesByUser(id);
        showUsersDeviceModal();
    };

    const showUsersDeviceModal = () => {
        setUserDevicesModalVisible(true);
    };

    const hideUsersDeviceModal = () => {
        setUserDevicesModalVisible(false);
        setUserDevices(null);
    };

    const showUserUnlinkDeviceModal = () => {
        setUserDeviceUnlinkModalVisible(true);
    };

    const hideUserUnlinkDeviceModal = () => {
        setUserDeviceUnlinkModalVisible(false);
    };

    const showPermissionsModal = () => {
        setPermissionsModalVisible(true);
    };

    const hidePermissionsModal = () => {
        setPermissionsModalVisible(false);
    };

    const handlePermissionsChange = (checkedValues) => {
        setCheckedPermissionsOptions(checkedValues);
    };

    useEffect(() => {
        if (props.user_permissions) {
            const result = [];
            props.user_permissions.map(p => result.push(p.scope));
            setCheckedPermissionsOptions(result)
        }
    }, [props.user_permissions]);

    return (
        <Wrapper {...props} tabActive="users">
            <div className="action-header">
                <Title level={2}>Пользователи</Title>
            </div>
            {usersList &&
                <div className="users-top">
                    <div
                        className="search-input"
                    >
                        <SearchOutlined />
                        <Input
                            style={{
                                width: '350px'
                            }}
                            size="large"
                            placeholder="Поиск пользователей"
                            onInput={searchUser}
                        />
                    </div>

                    <div>
                        <span>Всего пользователей</span>
                        <span
                            style={{
                                border: '2px solid #4286F4',
                                borderRadius: '10px',
                                padding: '6px 12px',
                                marginLeft: '10px',
                            }}
                        >
                        {totalCount}
                    </span>
                    </div>
                </div>
            }
            <Table
                className="users-table"
                columns={usersColumns}
                dataSource={usersList}
                rowSelection={(user) => {
                    getUserDevices(user.id);
                    setCurrentUser(user);
                }}
                emptyText="Пользователи не найдены"
            />
            {totalCount > 0 &&
                <Pagination
                    defaultPageSize={paginationState.size}
                    current={paginationState.page}
                    onChange={onChangePage}
                    total={totalCount}
                />
            }
            <Modal
                style={{
                    top: 20,
                }}
                width={900}
                title="Устройства пользователя"
                visible={userDevicesModalVisible}
                onCancel={hideUsersDeviceModal}
                footer={[]}
                className="modal"
            >
                {
                    currentUser &&
                    <div className="user-info">
                        <div>
                            <Avatar
                                name={currentUser.name}
                                round={true}
                                size={40}
                            />
                            <span
                                style={{
                                    marginLeft: '10px'
                                }}
                            >
                                {currentUser.name}
                            </span>
                        </div>
                    </div>
                }
                {
                    userDevices &&
                    <Table
                        className="devices-table"
                        columns={columns(unlinkDeviceFromUser)}
                        dataSource={userDevices}
                        emptyText="Устройства не найдены"
                    />
                }
            </Modal>
            <Modal
                style={{
                    top: 20,
                }}
                width={300}
                title="Отвязка устройства от пользователя"
                visible={userDeviceUnlinkModalVisible}
                onCancel={hideUserUnlinkDeviceModal}
                footer={[
                    <Button
                        onClick={() => {
                            props.unlinkDeviceFromUser(currentDeviceId);
                            hideUserUnlinkDeviceModal();
                        }}
                    >
                         Отвязать
                    </Button>
                ]}
                className="modal"
            >
                Вы действительно хотите отвязать устройство от пользователя
            </Modal>
            <Modal
                style={{
                    top: 20,
                }}
                width={700}
                title="Настройка прав доступа"
                visible={permissionsModalVisible}
                onCancel={hidePermissionsModal}
                footer={[
                    <Button
                        onClick={() => {
                            props.changePermissions(currentUser.id, checkedPermissionsOptions);
                            hidePermissionsModal();
                        }}
                    >
                        Применить
                    </Button>
                ]}
                className="modal"
            >
                {/*<Checkbox.Group options={permissionsOptions} defaultValue={permissionsOptions} onChange={handlePermissionsChange}/>*/}
                <Checkbox.Group
                    onChange={handlePermissionsChange}
                    defaultValue={checkedPermissionsOptions}
                    value={checkedPermissionsOptions}
                >
                    {
                        props?.permissions?.map(p =>
                            <Checkbox
                                style={{ width: "50%", margin: 0 }}
                                value={p.scope}>{p.description}
                            </Checkbox>
                        )
                    }
                </Checkbox.Group>
            </Modal>
        </Wrapper>
    );
}

export default UsersView;
