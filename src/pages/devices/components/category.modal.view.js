import React, { useEffect } from "react";
import { Button, Modal } from "antd";
import CategoryFormView from "./category.form.view";
import {updateCategory} from "../duck/actions";

function CategoryModalView(props) {
    const {
        form,
        categoryData,
        createCategoryModalVisible,
        hideCreateCategoryModal,
        createCategory,
        updateCategory,
        categoryFields,
        edit
    } = props;

    useEffect(() => {
        if (categoryData) {
            form.setFieldsValue(categoryData);
        } else {
            form.resetFields();
        }
    }, [categoryData]);

    return(
        <Modal
            className="modal"
            title={edit ? 'Редактирование категории' : 'Создание категории'}
            visible={createCategoryModalVisible}
            onCancel={hideCreateCategoryModal}
            footer={[
                <Button key="submit" type="primary" onClick={edit ? updateCategory : createCategory}>
                    {edit ? 'Сохранить': 'Создать'}
                </Button>,
            ]}
        >
            <CategoryFormView
                fields={categoryFields}
                form={form}
            />
        </Modal>
    );
}

export default CategoryModalView;
