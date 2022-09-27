import React, { useState } from 'react';
import { Form, Input, message, Button } from "antd";
import { useUserState } from '../../container/state/store';
import { Select } from 'antd';
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;

const endPoint = 'https://api.mnotify.com/api/sms/quick'
const apiKey = 'quCkGOswCDJxA0LdMSwoaMAgbGlC4cnvG0PnOiTrWCYwD'

const SendSMS = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const appartments = useUserState((state) => state.appartments)

    const handleChange = (value) => {
        console.log(`${value}`);
    };

    const onFinish = async (values) => {
        setLoading(true)
        values.sender = 'OTEstate'
        // console.log(values);
        // const data = {
        //     'recepient': values.recepient,
        //     'sender': 'OTEstate',
        //     'message': values.message,
        // }
        const url = endPoint + '?key=' + apiKey
        const config = {
            headers: {
                'Accept': 'application/json'
            },
        };

        await axios.post(url, values, config).then(function (response) {
            setLoading(false)
            message.success('🟢Message sent successfully🟢')
            console.log(JSON.stringify(response.data));
        }).catch(function (error) {
            setLoading(false)
            console.log(error);
        })
    };

    return (
        <div className='bg-white shadow-sm rounded h-[60vh] p-4'>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item label='Recipients' name='recipient' rules={[
                    { required: true, message: "At least select one recipient!" }
                ]}>
                    <Select
                        mode="tags"
                        style={{
                            width: '100%',
                        }}
                        placeholder="Select recipient"
                        onChange={handleChange}
                    >
                        {appartments ? (
                            <>
                                {appartments.map((item, idx) => (
                                    <Option key={idx} value={item.ownerNumber}>
                                        <span>{item.ownerNumber}</span>
                                    </Option>
                                ))}
                            </>
                        ) : (
                            <Option>No data</Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item name="message" label='Enter message' rules={[
                    { required: true, message: "Message is required!" }
                ]}>
                    <TextArea rows={4} placeholder="Enter your message here ..." />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className='inline-flex justify-between item-center'>
                        {loading && <svg className="h-4 w-4 animate-spin" viewBox="3 3 18 18">
                            <path
                                className="fill-blue-800"
                                d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"></path>
                            <path
                                className="fill-blue-100"
                                d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
                        </svg>}
                        <span>Send Message</span>
                    </Button>
                </Form.Item>
            </Form>

        </div>
    );
}

export default SendSMS;
