import React, { useState, useRef, useEffect } from 'react';
import { Button, Space, Table, Input, message, Popconfirm, Tooltip } from 'antd';
import { SearchOutlined, ExportOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useGlobalModalContext, MODAL_TYPES } from "../../container/context/GlobalModal";
import instance from '../../container/services/provider';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../../container/state/store';

function ApptTable() {
    const [datax, setDatax] = useState();
    const [tableLoader, setTableLoader] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const navigate = useNavigate()
    const setAppartments = useUserState((state) => state.setAppartments)

    const fetchData = async (params = {}) => {
        setTableLoader(true)
        try {
            const { data } = await instance.get('/appartment/all')
            setDatax(data.appartments);
            setPagination({
                ...params.pagination,
                total: data.appartments ? data.appartments.lenght : 0,
            });
            setAppartments(data.appartments);
            setTableLoader(false)
        } catch (error) {
            if (error) {
                message.error(error ? (error.response.data && error.response.data.message ? error.response.data.message : error.message) : '')
            }
            setTableLoader(false)
        }
    };

    useEffect(() => {
        fetchData({
            pagination,
        });
        // eslint-disable-next-line
    }, []);

    const handleTableChange = (newPagination, filters, sorter) => {
        fetchData({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination: newPagination,
            ...filters,
        });
    };

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'House number',
            dataIndex: 'houseNumber',
            key: 'houseNumber',
            ...getColumnSearchProps('houseNumber'),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Block',
            dataIndex: 'block',
            key: 'block',
            ...getColumnSearchProps('block'),
        },
        {
            title: 'Name',
            dataIndex: 'ownerName',
            key: 'ownerName',
            ...getColumnSearchProps('ownerName'),
        },
        {
            title: 'Email',
            dataIndex: 'ownerEmail',
            key: 'ownerEmail',
        },
        {
            title: 'Contact',
            dataIndex: 'ownerNumber',
            key: 'ownerNumber',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle" className='flex'>
                    <Tooltip title="Edit" color="blue">
                        <EyeOutlined onClick={() => navigate(`/appartments/${record._id}`, { state: { record } })} style={{ fontSize: '17px' }} className=" hover:text-blue-600 cursor-pointer" />
                    </Tooltip>
                    <Tooltip title="Export" color="purple">
                        <ExportOutlined style={{ fontSize: '17px' }} className=" hover:text-blue-600 cursor-pointer mx-2" />
                    </Tooltip>
                    <Popconfirm title="Are you sure you want to delete this appartment?"
                        onConfirm={() => confirm(record._id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No">
                        <DeleteOutlined style={{ fontSize: '17px', color: 'red' }} className="text-red-600 hover:text-blue-600 cursor-pointer" />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const confirm = async (id) => {
        try {
            await instance.delete(`/appartment/${id}`)
            message.success('Appartment deleted successfully');
            fetchData({
                pagination,
            });

        } catch (error) {
            if (error) {
                message.error(error ? (error.response.data && error.response.data.message ? error.response.data.message : error.message) : '')
            }
        }
    };

    const cancel = (e) => {
        console.log(e);
        message.error('Whoops becareful next time...🚫');
    };

    const { showModal } = useGlobalModalContext();

    const addAppartment = () => {
        showModal(MODAL_TYPES.APPARTMENT_MODAL, {
            title: "Add new Appartment",
            confirmBtn: "Save",
            action: () => fetchData({
                pagination,
            })
        });
        console.log('open appartment modal');
    };

    return (
        <div className='py-4'>
            <div className='py-4'>
                <Space wrap>
                    <Button onClick={addAppartment}>Add Appartment</Button>
                </Space>
            </div>
            <div className="h-8"></div>
            <Table
                pagination={pagination}
                columns={columns}
                onChange={handleTableChange}
                dataSource={datax}
                loading={tableLoader}
                bordered />
        </div>
    );
}

export default ApptTable;
