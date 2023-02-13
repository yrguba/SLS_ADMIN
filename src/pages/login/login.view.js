import React, {useEffect, useState} from "react";
import { Form, Button, Input, Typography } from "antd";
import "./login.less";
import { _setClient } from "../../service";

const { Title } = Typography;

function LoginView (props) {
    const [loginError, setLoginError] = useState('');
    useEffect(() => {
        if (props.isLogged) {
            props.history.push('/');
        }
    }, [props.isLogged]);
    useEffect(() => {
        if (props.error) {
            setLoginError("Email или пароль не корректны. Проверьте введенные данные");
        }
    }, [props.error]);
    /* Вызывается при отправке формы авторизации */
    const onFinish = (values) => {
        props.getTokens({
            "username": values.username,
            "password": values.password,
        });

        _setClient(values.username);
    };

    /* Функция для проверки ввода символов отличных от ASCII */
    const checkSymbols = (event) => {
        const currentValue = event.target.value;
        if (currentValue.length === 0) setLoginError('');
        const hasUnicodeSymbols = currentValue.split('').some((valueSymbol, index) => {
            return currentValue.charCodeAt(index) > 127;
        });

        setLoginError(hasUnicodeSymbols ? 'Проверьте раскладку' : '');
    };
    return(
        <>
            <div className="content">
                <div className="logo">
                    <img
                        className="large"
                        src="/assets/images/logo.svg"/>
                </div>
                <Form
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Title level={4} style={{ marginTop: '40px' }}>
                    Вход в систему
                    </Title>
                    <div className="form-items-wrapper">
                        <Form.Item
                            name="username"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Поле обязательно для ввода'
                                },
                                {
                                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Недопустимый формат электронной почты'
                                }
                            ]}
                        >
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Пароль:"
                            rules={[{ required: true, message: 'Поле обязательно для ввода' }]}
                        >
                            <Input.Password size="large" onInput={checkSymbols} />
                        </Form.Item>
                        {loginError && <p className="error">{loginError}</p>}
                    </div>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                    >
                        Войти
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default LoginView;
