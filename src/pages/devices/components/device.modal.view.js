import React, { useEffect } from "react";
import { Button, Modal } from "antd";
import DeviceFormView from "./device.form.view";
import {updateDevice} from "../duck/actions";

function DeviceModalView(props) {
    const {
        form,
        deviceData,
        createDeviceModalVisible,
        hideCreateDeviceModal,
        createDevice,
        updateDevice,
        deviceFields,
        edit,
        getDevicesCategories,
        categories,
    } = props;

    useEffect(() => {
        if (deviceData) {
            form.setFieldsValue(deviceData);
        } else {
            form.resetFields();
        }
    }, [deviceData]);

    return(
        <Modal
            className="modal"
            title={edit ? 'Редактирование устройства' : 'Создание устройства'}
            visible={createDeviceModalVisible}
            onCancel={hideCreateDeviceModal}
            footer={[
                <Button
                    key="submit"
                    type="primary"
                    onClick={edit ? updateDevice : createDevice}
                    size="large"
                >
                    {edit ? 'Сохранить': 'Создать'}
                </Button>,
            ]}
        >
            <DeviceFormView
                fields={deviceFields}
                form={form}
                getDevicesCategories={getDevicesCategories}
                categories={categories}
            />
        </Modal>
    );
}

export default DeviceModalView;
