import React, { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import {
    Input,
    Menu,
    Pagination,
    Button,
    Modal,
    message,
    Form,
} from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { cutRegCode } from "../../helpers";
const { Search } = Input;

function WatchesView(props) {
    const { hash } = props.history.location;
    const [sendMessageForm] = Form.useForm();
    const [bindWatchForm] = Form.useForm();
    const [createWatchForm] = Form.useForm();
    const [createChildForm] = Form.useForm();
    const [selectedSection, setSelectedSection] = useState('#users');
    const [currentUser, setCurrentUser] = useState(null);
    const [currentChild, setCurrentChild] = useState(null);
    const [currentWatch, setCurrentWatch] = useState(null);
    const [resetPasswordModalVisible, setResetPasswordModalVisible] = useState(false);
    const [bindWatchModalVisible, setBindWatchModalVisible] = useState(false);
    const [unbindWatchModalVisible, setUnbindWatchModalVisible] = useState(false);
    const [removeWatchModalVisible, setRemoveWatchModalVisible] = useState(false);
    const [sendMessageModalVisible, setSendMessageModalVisible] = useState(false);
    const [createWatchModalVisible, setCreateWatchModalVisible] = useState(false);
    const [createChildModalVisible, setCreateChildModalVisible] = useState(false);
    const [removeChildModalVisible, setRemoveChildModalVisible] = useState(false);
    const [removeUserModalVisible, setRemoveUserModalVisible] = useState(false);
    const [paginationState, setPaginationState] = useState({
        page: 1,
        size: 20,
        like: '',
    });
    const [paginationWatchState, setPaginationWatchState] = useState({
        page: 1,
        size: 20,
        like: '',
    });

    useEffect(() => {
        if (hash) {
            setSelectedSection(hash);
        }
    }, []);

    useEffect(() => {
        if (props.reset_status) {
            props.reset_status === 'success' ?
                message.success('???????????? ?????????????? ??????????????') :
                message.error('?????????????????? ????????????');
            props.clearState();
        }
    }, [props.reset_status]);

    useEffect(() => {
        if (props.bind_status) {
            props.bind_status === 'success' ?
                message.success('???????? ?????????????? ??????????????????') :
                message.error('?????????????????? ????????????');
            props.getUsers(paginationState.page, paginationState.size, currentUser.email);
            props.clearState();
        }
    }, [props.bind_status]);

    useEffect(() => {
        if (props.unbind_status) {
            props.unbind_status === 'success' ?
                message.success('???????? ?????????????? ????????????????') :
                message.error('?????????????????? ????????????');
            props.clearState();
            props.getUsers(paginationState.page, paginationState.size, currentUser.email);
        }
    }, [props.unbind_status]);

    useEffect(() => {
        if (props.remove_status) {
            props.remove_status === 'success' ?
                message.success('???????? ?????????????? ??????????????') :
                message.error('?????????????????? ????????????');
            props.clearState();
            props.getWatches(paginationWatchState.page, paginationWatchState.size, currentWatch.reg_code);
        }
    }, [props.remove_status]);

    useEffect(() => {
        if (props.delete_child_status) {
            props.delete_child_status === 'success' ?
                message.success('???????? ?????????????? ??????????????') :
                message.error('?????????????????? ????????????');
            props.clearState();
            props.getUsers(paginationState.page, paginationState.size, paginationState.like);
        }
    }, [props.delete_child_status]);

    useEffect(() => {
        if (props.delete_user_status) {
            props.delete_user_status === 'success' ?
                message.success('?????????????? ?????????????? ????????????') :
                message.error('?????????????????? ????????????');
            props.clearState();
            props.getUsers(paginationState.page, paginationState.size, paginationState.like);
        }
    }, [props.delete_user_status]);

    useEffect(() => {
        if (props.send_status) {
            props.send_status === 'success' ?
                message.success('???????????? ?????????????? ????????????????????') :
                message.error('?????????????????? ????????????');
            props.clearState();
        }
    }, [props.send_status]);

    useEffect(() => {
        if (props.watches_created) {
            message.success('???????? ?????????????? ??????????????');
            props.clearState();
        }
        props.getWatches(paginationWatchState.page, paginationWatchState.size);
    }, [props.watches_created]);

    useEffect(() => {
        if (props.child_created) {
            message.success('?????????????? ?????????????? ????????????');
            props.clearState();
        }
        props.getUsers(paginationState.page, paginationState.size, paginationState.like);
    }, [props.child_created]);


    useEffect(() => {
        props.getUsers(paginationState.page, paginationState.size, paginationState.like);
    }, [paginationState]);

    useEffect(() => {
        props.getWatches(paginationWatchState.page, paginationWatchState.size, paginationWatchState.like);
        props.getWatchesOnline();
    }, [paginationWatchState]);

    const getUserName = (user) => {
        //return `${user.first_name || ''} ${user.middle_name || ''} ${user.last_name || ''}`
        return user.first_name;
    };

    const onPageChange = (page) => {
        setPaginationState({...paginationState, page: page});
    };

    const onWatchPageChange = (page) => {
        setPaginationWatchState({...paginationWatchState, page: page});
    };

    const handleChangeSection = (tab) => {
        setSelectedSection(tab.key);
        props.history.push(tab.key);
    };

    const searchUser = (event) => {
        setPaginationState({...paginationState, like: event.target.value})
    };

    const searchWatch = (value) => {
        setPaginationWatchState({...paginationWatchState, like: value})
    };

    const refreshWatchList = () => {
        props.getWatches(paginationWatchState.page, paginationWatchState.size, paginationState.like);
        props.getWatchesOnline();
    };

    const resetPassword = () => {
        if (currentUser) {
            props.resetPassword(currentUser.email);
            setResetPasswordModalVisible(false);
        }
    };

    const sendMessage = () => {
        const mailData = sendMessageForm.getFieldsValue();
        mailData.email = currentUser.email;
        props.sendMailToUser(currentUser.email, mailData.subject, mailData.message);
        setSendMessageModalVisible(false);
    };

    const bindWatch = () => {
        const regCode = bindWatchForm.getFieldValue('reg_code');
        const timezone = bindWatchForm.getFieldValue('timezone');
        props.bindWatch(cutRegCode(regCode), currentChild.id, timezone);
        setBindWatchModalVisible(false);
    };

    const unbindWatch = () => {
        props.unbindWatch(currentWatch.reg_code, currentChild.id);
        setUnbindWatchModalVisible(false);
    };

    const removeWatch = () => {
        props.removeWatch(currentWatch.reg_code);
        setRemoveWatchModalVisible(false);
    };

    const removeChild = () => {
        props.deleteChild(currentChild.id, currentChild?.watch?.reg_code);
        setRemoveChildModalVisible(false);
    };

    const removeUser = () => {
        props.deleteUser(currentUser.id);
        setRemoveUserModalVisible(false);
    };

    const createWatch = () => {
        const watchData = createWatchForm.getFieldsValue();
        props.createWatch(watchData);
        setCreateWatchModalVisible(false);
    };

    const createChild = () => {
        const childData = createChildForm.getFieldsValue();
        props.createChild(currentUser.id, childData);
        setCreateChildModalVisible(false);
    };

    return(
        <Wrapper {...props} tabActive="watches">
            <Menu
                onClick={handleChangeSection}
                selectedKeys={[selectedSection]}
                mode="horizontal"
                style={{ marginBottom: '16px' }}
            >
                <Menu.Item
                    key="#users"
                >
                    ????????????????????????
                </Menu.Item>
                <Menu.Item
                    key="#watches"
                >
                    ????????
                </Menu.Item>
            </Menu>

            {
                selectedSection === '#users' &&
                    <>
                        <Input
                            style={{
                                width: '350px'
                            }}
                            size="large"
                            placeholder="?????????? ?????????????????????????? ???? email"
                            onInput={searchUser}
                        />
                        {
                            props.watches?.meta?.totalItems &&
                            <h2
                                style={{ margin: '20px 0' }}
                            >
                                ?????????? ???????????????????????????????? ?????????????????????????? - <b>{props.watches?.meta?.totalItems}</b>
                            </h2>
                        }
                        <ul className="users-list">
                            {
                                props.watch_users && props.watch_users.items &&
                                props.watch_users.items.map(user =>
                                    <li className="users-list__card watch-user">
                                        <div>
                                            <h2>??????????????</h2>
                                            <p>??????: <b>{getUserName(user)}</b></p>
                                            <p>Email: <b>{user.email}</b></p>
                                        </div>

                                        <div className="watch-user-actions">
                                            <Button
                                                type="primary"
                                                onClick={() => {
                                                    setCurrentUser(user);
                                                    setResetPasswordModalVisible(true);
                                                }}
                                            >
                                                ???????????????? ????????????
                                            </Button>
                                            <Button
                                                type="primary"
                                                onClick={() => {
                                                    setCurrentUser(user);
                                                    setSendMessageModalVisible(true);
                                                }}
                                            >
                                                ?????????????????? ???????????? ???? email
                                            </Button>
                                            <Button
                                                type="primary"
                                                onClick={() => {
                                                    setCreateChildModalVisible(true);
                                                    setCurrentUser(user);
                                                }}
                                            >
                                                ???????????????? ??????????????
                                            </Button>
                                        </div>

                                        {user.children && user.children.length > 0 &&
                                            <div
                                                style={{
                                                    position: 'relative'
                                                }}
                                            >
                                                <h2>????????</h2>
                                                <ul className="children-list">
                                                    {user.children.map(child =>
                                                        <li style={{ position: 'relative'}}>
                                                            <p>?????? ??????????????: <b>{child.name}</b></p>
                                                            {child.watch &&
                                                                <>
                                                                    <p> ????????: <b>{child.watch.name || 'noName'}</b></p>
                                                                    <p> ??????: <b>{child.watch.reg_code}</b></p>

                                                                    <div>
                                                                        <Button
                                                                            type="primary"
                                                                            onClick={() => {
                                                                                setCurrentUser(user);
                                                                                setCurrentWatch(child.watch);
                                                                                setCurrentChild(child);
                                                                                setUnbindWatchModalVisible(true);
                                                                            }}
                                                                        >
                                                                            ???????????????? ????????
                                                                        </Button>
                                                                    </div>
                                                                </>
                                                            }
                                                            {!child.watch &&
                                                                <>
                                                                    <p>???????? ???? ??????????????????</p>
                                                                    <Button
                                                                        type="primary"
                                                                        onClick={() => {
                                                                            setCurrentUser(user);
                                                                            setCurrentChild(child);
                                                                            setBindWatchModalVisible(true);
                                                                        }}
                                                                        >
                                                                        ?????????????????? ????????
                                                                    </Button>
                                                                </>
                                                            }
                                                            <DeleteOutlined
                                                                className="delete-btn"
                                                                onClick={() => {
                                                                    setCurrentChild(child);
                                                                    setRemoveChildModalVisible(true);
                                                                }}
                                                            />
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        }
                                        <DeleteOutlined
                                            className="delete-btn"
                                            onClick={() => {
                                                setCurrentUser(user);
                                                setRemoveUserModalVisible(true);
                                            }}
                                        />
                                    </li>
                                )
                            }
                        </ul>
                        <Pagination
                            defaultCurrent={1}
                            defaultPageSize={20}
                            total={props.watch_users?.meta?.totalItems}
                            onChange={onPageChange}
                        />
                    </>
            }
            {
                selectedSection === '#watches' &&
                    <>
                        <Search
                            onSearch={searchWatch}
                            style={{
                                width: '350px'
                            }}
                            size="large"
                            placeholder="?????????? ?????????? ???? ????????"
                            allowClear
                        />
                        {
                            props.watches_online &&
                            <h2
                                style={{ margin: '20px 0' }}
                            >
                                ?????????? ???????????? - <b>{props.watches_online?.length}</b>
                            </h2>
                        }
                        <Button onClick={refreshWatchList}>???????????????? ???????????? ?? ??????????</Button>
                        <Button
                            type="primary"
                            onClick={() => {
                                setCreateWatchModalVisible(true);
                            }}
                            style={{ marginLeft: '10px' }}
                        >
                            ?????????????? ????????
                        </Button>
                        <ul className="watches-list">
                            {
                                props.watches && props.watches.items &&
                                props.watches.items.map(watch =>
                                    <li className="users-list__card watch-user">
                                        <p>??????: <b>{watch.name || 'NoName'}</b></p>
                                        <p>??????: <b>{watch.reg_code}</b></p>
                                        <p
                                            className={`watch-state ${watch.is_online ? 'online' : 'offline'}`}
                                        >
                                            {watch.is_online ? 'online' : 'offline'}
                                        </p>
                                        <DeleteOutlined
                                            className="watch-delete-btn"
                                            onClick={() => {
                                                setCurrentWatch(watch);
                                                setRemoveWatchModalVisible(true);
                                            }}
                                        />
                                    </li>
                                )
                            }
                        </ul>
                        <Pagination
                            defaultCurrent={1}
                            defaultPageSize={20}
                            total={props.watches?.meta?.totalItems}
                            onChange={onWatchPageChange}
                        />
                    </>
            }

            <Modal
                className="modal"
                title={`?????????? ???????????? ?????? ${currentUser?.email}`}
                visible={resetPasswordModalVisible}
                onCancel={() => {
                    setResetPasswordModalVisible(false);
                }}
                footer={[
                    <Button
                        type="primary"
                        key="submit"
                        onClick={resetPassword}
                        danger
                    >
                        ????????????????
                    </Button>,
                    <Button key="back" onClick={() => {
                        setResetPasswordModalVisible(false);
                    }}>
                        ????????????????
                    </Button>,
                ]}
            >
                <p>?????????????????????? ?????????? ????????????</p>
            </Modal>
            <Modal
                className="modal"
                title={`???????????????? ?????????????????? ?????? ${currentUser?.email}`}
                visible={sendMessageModalVisible}
                onCancel={() => {
                    setSendMessageModalVisible(false);
                }}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        onClick={sendMessage}
                    >
                        ??????????????????
                    </Button>,
                    <Button
                        key="back"
                        onClick={() => {
                        setSendMessageModalVisible(false);
                    }}>
                        ????????????????
                    </Button>,
                ]}
            >
                <Form
                    form={sendMessageForm}
                >
                    <Form.Item name="subject" label="???????? ????????????" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="message" label="?????????? ????????????" rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                className="modal"
                title={`???????????????? ??????????`}
                visible={bindWatchModalVisible}
                onCancel={() => {
                    setBindWatchModalVisible(false);
                }}
                footer={[
                    <Button
                        type="primary"
                        key="submit"
                        onClick={bindWatch}
                    >
                        ??????????????????
                    </Button>,
                    <Button key="back" onClick={() => {
                        setBindWatchModalVisible(false);
                    }}>
                        ????????????????
                    </Button>,
                ]}
            >
                <Form
                    form={bindWatchForm}
                >
                    <Form.Item name="reg_code" label="?????? ??????(????????????)" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="timezone"
                        label="?????????????? ???????? UTC (+3 ???????????? ???? ??????????????????)"
                        rules={[{ required: true }]}
                        defaultValue={3}
                    >
                        <Input
                            defaultValue={3}
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                className="modal"
                title={`?????????????? ??????????`}
                visible={unbindWatchModalVisible}
                onCancel={() => {
                    setUnbindWatchModalVisible(false);
                }}
                footer={[
                    <Button
                        type="primary"
                        key="submit"
                        onClick={unbindWatch}
                    >
                        ????????????????
                    </Button>,
                    <Button key="back" onClick={() => {
                        setUnbindWatchModalVisible(false);
                    }}>
                        ????????????????
                    </Button>,
                ]}
            >
                <p>?????????????????????? ?????????????? ??????????</p>
            </Modal>
            <Modal
                className="modal"
                title={`???????????????? ??????????`}
                visible={removeWatchModalVisible}
                onCancel={() => {
                    setRemoveWatchModalVisible(false);
                }}
                footer={[
                    <Button
                        danger
                        type="primary"
                        key="submit"
                        onClick={removeWatch}
                    >
                        ??????????????
                    </Button>,
                    <Button key="back" onClick={() => {
                        setRemoveWatchModalVisible(false);
                    }}>
                        ????????????????
                    </Button>,
                ]}
            >
                <p>?????????????????????? ???????????????? ??????????</p>
            </Modal>
            <Modal
                className="modal"
                title={`???????????????? ??????????`}
                visible={createWatchModalVisible}
                onCancel={() => {
                    setCreateWatchModalVisible(false);
                }}
                footer={[
                    <Button
                        type="primary"
                        key="submit"
                        onClick={createWatch}
                    >
                        ??????????????
                    </Button>,
                    <Button key="back" onClick={() => {
                        setCreateWatchModalVisible(false);
                    }}>
                        ????????????????
                    </Button>,
                ]}
            >
                <Form
                    form={createWatchForm}
                >
                    <Form.Item name="reg_code" label="?????? ??????(????????????)" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="name" label="???????????????? ??????????" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                className="modal"
                title={`???????????????? ??????????????`}
                visible={createChildModalVisible}
                onCancel={() => {
                    setCreateChildModalVisible(false);
                }}
                footer={[
                    <Button
                        type="primary"
                        key="submit"
                        onClick={createChild}
                    >
                        ??????????????
                    </Button>,
                    <Button key="back" onClick={() => {
                        setCreateChildModalVisible(false);
                    }}>
                        ????????????????
                    </Button>,
                ]}
            >
                <Form
                    form={createChildForm}
                >
                    <Form.Item name="name" label="?????? ??????????????" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="age" label="?????????????? ????????????" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                className="modal"
                title={`???????????????? ??????????????`}
                visible={removeChildModalVisible}
                onCancel={() => {
                    setRemoveChildModalVisible(false);
                }}
                footer={[
                    <Button
                        danger
                        type="primary"
                        key="submit"
                        onClick={removeChild}
                    >
                        ??????????????
                    </Button>,
                    <Button key="back" onClick={() => {
                        setRemoveChildModalVisible(false);
                    }}>
                        ????????????????
                    </Button>,
                ]}
            >
                <p>?????????????????????? ???????????????? ??????????????</p>
            </Modal>
            <Modal
                className="modal"
                title={`???????????????? ????????????????`}
                visible={removeUserModalVisible}
                onCancel={() => {
                    setRemoveUserModalVisible(false);
                }}
                footer={[
                    <Button
                        danger
                        type="primary"
                        key="submit"
                        onClick={removeUser}
                    >
                        ??????????????
                    </Button>,
                    <Button key="back" onClick={() => {
                        setRemoveUserModalVisible(false);
                    }}>
                        ????????????????
                    </Button>,
                ]}
            >
                <p>?????????????????????? ???????????????? ????????????????</p>
            </Modal>
        </Wrapper>
    );
}

export default WatchesView;
