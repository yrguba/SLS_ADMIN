import React, {useEffect, useState} from "react";
import Wrapper from "../../components/wrapper";
import {Button, Input, message, Modal} from "antd";
import { LinkOutlined, SearchOutlined } from "@ant-design/icons";
import Table from "../../components/table";

import './search.less';
import {deleteFromTuya, deleteFromTuyaClearState} from "./duck/actions";

function SearchView(props) {
    const [currentDeviceId, setCurrentDeviceId] = useState(null);
    const [currentTId, setCurrentTId] = useState('');
    const [userDeviceUnlinkModalVisible, setUserDeviceUnlinkModalVisible] = useState(false);
    const [deleteTuyaModalVisible, setDeleteTuyaModalVisible] = useState(false);

    useEffect(() => {
        if (props.device_unlink) {
            message.success('Устройство успешно отвязано');
        }
    }, [props.device_unlink]);

    useEffect(() => {
        if (props.deleted_from_tuya === "success") {
            message.success("Устройство успешно удалено");
        } else if (props.deleted_from_tuya === "failed") {
            message.error("Устройство не найдено")
        }
        setDeleteTuyaModalVisible(false);
        return () => {
            setCurrentTId('');
            props.deleteFromTuyaClearState();
        }
    }, [props.deleted_from_tuya]);

    const showUserUnlinkDeviceModal = () => {
        setUserDeviceUnlinkModalVisible(true);
    };

    const hideUserUnlinkDeviceModal = () => {
        setUserDeviceUnlinkModalVisible(false);
    };

    const searchDevices = (event) => {
        const { value } = event.target;
        props.searchDevices(value);
    };

    const unlinkDeviceFromUser = (tId) => {
        setCurrentDeviceId(tId);
        showUserUnlinkDeviceModal();
        //if (tId) props.unlinkDeviceFromUser(tId);
    }

    useEffect(() => {
        console.log(props.devices)
    }, [props.devices])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 5
        },
        {
            title: 'Категория',
            dataIndex: 'category',
            key: 'code',
            render: (value) => {
                return value.category.title;
            },
            width: 20
        },
        {
            title: 'Имя продукта',
            dataIndex: 'name',
            key: 'name',
            width: 20
        },
        {
            title: 'T_DEVICE_ID',
            dataIndex: 't_device_id',
            key: 't_device_id',
            width: 25
        },
        {
            title: 'Email Пользователя',
            dataIndex: 'user',
            key: 'user',
            width: 25,
            render: (value) => {
                return value?.user?.email || '';
            }
        },
        {
            title: 'Открепить',
            dataIndex: 'unlink',
            key: 'unlink',
            render: (params) => {
                return <LinkOutlined
                    onClick={() => {
                        unlinkDeviceFromUser(params?.t_device_id)
                    }}
                />;
            },
            width: 5
        }
    ];

    return(
        <Wrapper {...props} tabActive="statistic">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <div
                    className="search-input"
                >
                    <SearchOutlined />
                    <Input
                        style={{
                            width: '350px'
                        }}
                        size="large"
                        placeholder="Поиск устройств по t_device_id"
                        onChange={searchDevices}
                    />
                </div>
                <Button
                    size="large" type="primary"
                    onClick={() => setDeleteTuyaModalVisible(true)}
                >
                    Удалить устройства из TUYA
                </Button>
            </div>

            {
                props?.devices &&
                <Table
                    className="t-devices-table"
                    columns={columns}
                    dataSource={[props?.devices]}
                    emptyText="Устройства не найдены"
                />
            }
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
                width={300}
                title="Удаление устройства из TUYA"
                visible={deleteTuyaModalVisible}
                onCancel={() => setDeleteTuyaModalVisible(false)}
                footer={[
                    <Button
                        onClick={() => {
                            props.deleteFromTuya(currentTId);
                            hideUserUnlinkDeviceModal();
                        }}
                    >
                        Удалить
                    </Button>
                ]}
                className="modal"
            >
                <Input
                    size="large"
                    value={currentTId}
                    placeholder="Введите t_id"
                    onChange={(event) => setCurrentTId(event.target.value)}
                />
            </Modal>
        </Wrapper>
    );
}

export default SearchView;
