import React, { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import Table from "../../components/table";
import {Typography, Button, Form, Menu, Input} from "antd";
import {devicesColumns, categoriesColumns } from "./columns";
import CategoryModalView from "./components/category.modal.view";
import DeviceModalView from "./components/device.modal.view";
import './devices.less';
import { SearchOutlined, PlusSquareOutlined } from "@ant-design/icons";


const deviceFields = [
    {
        type: 'input',
        name: 't_product_id',
        placeholder: 'PID',
        required: true,
    },
    {
        type: 'input',
        name: 'name',
        placeholder: 'Название',
    },
    {
        type: 'select',
        name: 'category_id',
        placeholder: 'Категория',
        required: true,
    },
    {
        type: 'input',
        disabled: true,
        name: 't_product_name',
        placeholder: 'Заводское название',
        required: false,
    },
];

const categoryFields = [
    {
        name: 'title',
        placeholder: 'Название категории',
    },
    {
        name: 'icon',
        placeholder: 'Путь до иконки',
    },
    {
        name: 'code',
        placeholder: 'Код категории',
    },
];

const { Title } = Typography;

function DevicesView (props) {
    const [form] = Form.useForm();
    const [createCategoryModalVisible, setCreateCategoryModalVisible] = useState(false);
    const [createDeviceModalVisible, setCreateDeviceModalVisible] = useState(false);
    const [devices, setDevices] = useState(null);
    const [deviceData, setDeviceData] = useState(null);
    const [currentDeviceId, setCurrentDeviceId] = useState(null);
    const [currentCategoryId, setCurrentCategoryId] = useState(null);
    const [categoryData, setCategoryData] = useState(null);
    const [selectedSection, setSelectedSection] = useState('devices');

    useEffect(() => {
        props.getDevices();
        props.getDevicesCategories();
    }, []);

    useEffect(() => {
        if (props.devices_categories_updated) {
            setCreateDeviceModalVisible(false);
            setCreateCategoryModalVisible(false);
            props.getDevicesCategories();
        }
    }, [props.devices_categories_updated]);

    useEffect(() => {
        console.log(props.devices_updated)
        if (props.devices_updated) {
            setCreateDeviceModalVisible(false);
            props.getDevices();
        }
    }, [props.devices_updated]);

    useEffect(() => {
        if (props.devices && props.devices.data) {
            setDevices(props.devices.data);
        }
    }, [props.devices]);

    useEffect(() => {
        if (categoryData) showCreateCategoryModal();
    }, [categoryData]);

    useEffect(() => {
        if (deviceData) {
            showCreateDeviceModal();
            setCurrentDeviceId(deviceData.id)
        }
    }, [deviceData]);

    const showCreateCategoryModal = () => {
        setCreateCategoryModalVisible(true);
    };

    const showCreateDeviceModal = () => {
        setCreateDeviceModalVisible(true);
    };

    const hideCreateCategoryModal = () => {
        setCreateCategoryModalVisible(false);
        setCategoryData(null);
    };

    const hideCreateDeviceModal = () => {
        setCreateDeviceModalVisible(false);
        setDeviceData(null);
    };

    const handleChangeDevicesSection = (event) => {
        setSelectedSection(event.key)
    };

    const filterByPID = (event) => {
        if (props.devices?.data) {
            const itemsCopy = Array.from(props.devices.data);
            const filteredItems = itemsCopy.filter(
                item =>
                    item.t_product_id.includes(event.target.value) ||
                    item.t_product_name.includes(event.target.value) ||
                    item.category.title.includes(event.target.value)
            );
            setDevices(filteredItems);
        }
    };

    const createCategory = () => {
        form.validateFields()
            .then(() => {
                props.createCategory(JSON.stringify(form.getFieldsValue()))
            })
            .catch((error) => {
                console.debug(error);
            });
    };

    const updateCategory = () => {
        form.validateFields()
            .then(() => {
                props.updateCategory(currentCategoryId, JSON.stringify(form.getFieldsValue()))
            })
            .catch((error) => {
                console.debug(error);
            });
    };

    const createDevice = () => {
        form.validateFields()
            .then(() => {
                props.createDevice(JSON.stringify(form.getFieldsValue()))
            })
            .catch((error) => {
                console.debug(error);
            });
    };

    const updateDevice = () => {
        form.validateFields()
            .then(() => {
                props.updateDevice(currentDeviceId, JSON.stringify(form.getFieldsValue()))
            })
            .catch((error) => {
                console.debug(error);
            });
    };

    return(
        <Wrapper {...props} tabActive="statistic">
            <div className="action-header">
                <Title level={2}>
                    Управление
                </Title>
                {/*<Button
                    onClick={
                        selectedSection === 'devices' ?
                         showCreateDeviceModal : showCreateCategoryModal
                    }
                >
                    {selectedSection === 'devices' ?
                        'Добавить устройство' :
                        'Добавить категорию'
                    }
                </Button>*/}
            </div>
            <ul
                className="tabs"
            >
                <li
                    className={selectedSection === 'devices' ? 'active' : ''}
                    key="devices"
                    onClick={() => setSelectedSection('devices')}
                >
                    <span>Устройства</span>
                </li>
                {
                    selectedSection === 'devices' &&
                    <PlusSquareOutlined
                        style={{
                            fontSize: '30px',
                            color: '#9BA3B1',
                        }}
                        onClick={showCreateDeviceModal}
                    />
                }
                <li
                    key="categories"
                    className={selectedSection === 'categories' ? 'active' : ''}
                    onClick={() => setSelectedSection('categories')}
                >
                    Категории устройств
                </li>
                {
                    selectedSection !== 'devices' &&
                    <PlusSquareOutlined
                        style={{
                            fontSize: '30px',
                            color: '#9BA3B1',
                        }}
                        onClick={showCreateCategoryModal}
                    />
                }
            </ul>

            {
                selectedSection === 'devices' &&
                <>
                    <div
                        className="search-input"
                        style={{
                            marginBottom: '20px'
                        }}
                    >
                        <SearchOutlined />
                        <Input
                            style={{
                                width: '350px'
                            }}
                            size="large"
                            placeholder="Поиск по PID, категории, имени"
                            onInput={filterByPID}
                        />
                    </div>


                    <Table
                        className="products-table"
                        dataSource={devices}
                        columns={devicesColumns(setDeviceData)}
                        emptyText="Устройства не найдены"
                        rowSelection={(device) => {
                            setDeviceData(device);
                        }}
                    />
                    <DeviceModalView
                        form={form}
                        deviceData={deviceData}
                        createDeviceModalVisible={createDeviceModalVisible}
                        hideCreateDeviceModal={hideCreateDeviceModal}
                        createDevice={createDevice}
                        updateDevice={updateDevice}
                        deviceFields={deviceFields}
                        getDevicesCategories={props.getDevicesCategories}
                        categories={props?.categories?.data}
                        edit={deviceData !== null}
                    />
                </>
            }
            {
                selectedSection === 'categories' &&
                <>
                    <Table
                        className="products-table"
                        dataSource={props?.categories?.data}
                        columns={categoriesColumns(setCategoryData)}
                        rowSelection={(category) => {
                            setCurrentCategoryId(category.id);
                            setCategoryData(category);
                        }}
                    />
                    <CategoryModalView
                        form={form}
                        categoryData={categoryData}
                        createCategoryModalVisible={createCategoryModalVisible}
                        hideCreateCategoryModal={hideCreateCategoryModal}
                        createCategory={createCategory}
                        updateCategory={updateCategory}
                        categoryFields={categoryFields}
                        edit={categoryData !== null}
                    />
                </>
            }
        </Wrapper>
    );
}

export default DevicesView;
