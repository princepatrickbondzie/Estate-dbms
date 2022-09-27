import React, { useState } from 'react'
import { useGlobalModalContext } from '../../container/context/GlobalModal';
import { Modal, Form, Input, Select, message } from "antd";
import instance from '../../container/services/provider';

const { Option } = Select;
export default function UserModal() {
    const { hideModal, store } = useGlobalModalContext();
    const { modalProps } = store || {};
    const { title, confirmBtn, action } = modalProps || {};
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)

    const handleModalToggle = () => {
        hideModal();
    };

    const handleOk = () => {
        setLoading(true)
        form.validateFields().then(async (values) => {
            if (values.role === 'admin') {
                delete values.role
                values.isAdmin = true
            }
            if (values.role === 'frontDesk') {
                delete values.role
            }
            if (values.role === 'superAdmin') {
                delete values.role
                values.isSuperAdmin = true
            }
            try {
                const { data } = await instance.post('/auth/signup', values).then((response) => Promise.resolve(response))
                if (data) {
                    setLoading(false)
                    hideModal();
                    action()
                    message.success({
                        content: 'User created successfully',
                    });
                }
            } catch (error) {
                if (error) {
                    message.error(error ? (error.response.data && error.response.data.message ? error.response.data.message : error.message) : '')
                }
                setLoading(false)
            }
        }).catch((errorInfo) => {
            console.log(errorInfo)
            setLoading(false)
        });
    }

    return (
        <div>
            <Modal title={title || "User"} visible={true} onOk={handleOk} onCancel={handleModalToggle} okText={
                <div className="flex items-center">
                    {loading && <svg className="h-4 w-4 animate-spin" viewBox="3 3 18 18">
                        <path
                            className="fill-blue-800"
                            d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"></path>
                        <path
                            className="fill-blue-100"
                            d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
                    </svg>}
                    <span>{confirmBtn || "Save"}</span>
                </div>
            }>
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="fullname"
                        rules={[
                            { required: true, message: "user name is required!" }
                        ]}
                    >
                        <Input placeholder='Full name' />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: "user email is required!" }
                        ]}
                    >
                        <Input type="email" placeholder='Email' />
                    </Form.Item>
                    <Form.Item name="role" rules={[
                        { required: true, message: "user role is required!" }
                    ]}>
                        <Select showSearch
                            placeholder="Select role"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.includes(input)}
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }>
                            <Option value="frontDesk">Front Desk</Option>
                            <Option value="admin">Admin</Option>
                            <Option value="superAdmin">Super Admin</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="password" rules={[
                        { required: true, message: "user password is required!" }
                    ]}>
                        <Input type="password" placeholder='Password' />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
