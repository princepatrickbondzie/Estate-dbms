import React, { useState } from 'react';
import { useGlobalModalContext } from '../../container/context/GlobalModal';
import { Modal, Form, Input, Row, message } from "antd";
import instance from '../../container/services/provider';

export default function AppartmentModal() {
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
            try {
                const { data } = await instance.post('/appartment/create', values).then((response) => Promise.resolve(response))
                console.log(data)
                if (data) {
                    setLoading(false)
                    hideModal();
                    action()
                    message.success({
                        content: 'Appartment created successfully',
                        // onClose: () => action(),
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
            <Modal title={title || "Appartment"} visible={true} onOk={handleOk} onCancel={handleModalToggle} okText={
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
                </div>}>
                {/* {error && <Message variant="warning" children={error.message} />} */}
                <Form form={form} layout="vertical" >
                    <Row wrap className='flex justify-between'>
                        <Form.Item label='House number'
                            name="houseNumber"
                            rules={[
                                { required: true, message: "House number is required!" }
                            ]}
                        >
                            <Input placeholder='House no.' />
                        </Form.Item>
                        <Form.Item name="type" label='Appartment type'>
                            <Input type="text" placeholder='Appt. type' />
                        </Form.Item>
                    </Row>

                    <Row wrap className='flex justify-between'>
                        <Form.Item name="block" label='Block'
                            rules={[
                                { required: true, message: "block is required" }
                            ]}
                        >
                            <Input placeholder='Block' />
                        </Form.Item>
                        <Form.Item label='Owner name'
                            name="ownerName"
                            rules={[
                                { required: true, message: "Owner is required!" }
                            ]}
                        >
                            <Input placeholder='Full name' />
                        </Form.Item>
                    </Row>
                    <Row wrap className='flex justify-between'>
                        <Form.Item label='Email address'
                            name="ownerEmail"
                            rules={[
                                { required: true, message: "Owner email is required!" }
                            ]}
                        >
                            <Input placeholder='Email' />
                        </Form.Item>
                        <Form.Item label='Phone Number'
                            name="ownerNumber"
                            rules={[
                                { required: true, message: "Owner contact is required!" }
                            ]}
                        >
                            <Input placeholder='030 556 7980' />
                        </Form.Item>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}
