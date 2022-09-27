import React, { useState, useEffect } from 'react'
import { useGlobalModalContext } from '../../container/context/GlobalModal';
import { Modal, Form, Input, Row, DatePicker, message, Select } from "antd";
import instance from '../../container/services/provider';
import { useUserState } from '../../container/state/store';
const { Option } = Select;
const { RangePicker } = DatePicker;

export default function FMPaymentModal() {
  const { hideModal, store } = useGlobalModalContext();
  const { modalProps } = store || {};
  const { title, confirmBtn, action } = modalProps || {};
  const [form] = Form.useForm();
  const user = useUserState((state) => state.user)
  const [loading, setLoading] = useState(false)
  const [dta, setDta] = useState()
  const [appartments, setAppartments] = useState(null)
  const [paidBy, setPaidBy] = useState(null)

  const fetchData = async (params = {}) => {
    try {
      const { data } = await instance.get('/appartment/all')
      console.log(data)
      if (data) {
        setAppartments(data.appartments);
      }
    } catch (error) {
      if (error) {
        message.error(error ? (error.response.data && error.response.data.message ? error.response.data.message : error.message) : '')
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleModalToggle = () => {
    hideModal();
  };

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setDta(dateString)
  };

  const onChange = (value) => {
    const filter = appartments.filter((el) => el.houseNumber === value)
    console.log(filter[0].ownerName)
    setPaidBy(filter[0].ownerName)
    console.log(`selected: ${value}`);
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };



  const handleOk = () => {
    // setLoading(true)
    form.validateFields().then(async (values) => {
      values.recordedBy = user.fullname;
      values.monthDue = dta
      values.paidBy = paidBy
      console.log(values);
      try {
        const { data } = await instance.post('/record-payment/create', values).then((response) => Promise.resolve(response))
        console.log(data)
        if (data) {
          setLoading(false)
          hideModal();
          action()
          message.success({
            content: 'Payment recorded successfully',
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
    <Modal title={title || "Add Payment"} visible={true} onOk={handleOk} onCancel={handleModalToggle} okText={
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
        <Row className='flex justify-between'>
          <Form.Item name="appartment" rules={[
            { required: true, message: "appartment name is required" }]}>
            <Select
              showSearch
              placeholder="Select an appartment"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
              {appartments ? (
                <>
                  {appartments.map((appartment, idx) => (
                    <Option value={appartment.houseNumber} key={appartment.houseNumber}>{appartment.houseNumber}</Option>
                  ))}
                </>
              ) : (
                <Option value="">No Data</Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item
            name="amount"
            rules={[
              { required: true, message: "Please input the amount!" }
            ]}
          >
            <Input type='number' placeholder='Amount paid' />
          </Form.Item>
        </Row>
        <Row className='flex justify-between'>
          <Form.Item name="paymentMode">
            <Input type="text" placeholder='Mode of payment' />
          </Form.Item>

          <Form.Item name="accountNumber">
            <Input placeholder='Account number' />
          </Form.Item>
        </Row>
        <Row className='flex justify-between'>
          <Form.Item name="monthDue" label='Month of settlement'>
            <RangePicker picker="month" onChange={onDateChange} />
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  )
}
