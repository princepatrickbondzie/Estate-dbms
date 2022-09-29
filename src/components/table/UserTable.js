import React, { useState, useRef, useEffect } from 'react';
import { Button, Space, Table, Input, message, Tooltip, Popconfirm } from 'antd';
import { SearchOutlined, ExportOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useGlobalModalContext, MODAL_TYPES } from "../../container/context/GlobalModal";
import instance from '../../container/services/provider';
import { useUserState } from '../../container/state/store';

export default function UserTable() {
    const [datax, setDatax] = useState();
    const [tableLoader, setTableLoader] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const setUsers = useUserState((state) => state.setUsers)

    const fetchData = async (params = {}) => {
        setTableLoader(true)
        try {
            const { data } = await instance.get('/user/all')
            // console.log(data)
            setDatax(data.data);
            setPagination({
                ...params.pagination,
                total: data.users ? data.users.lenght : 0,
            });
            setUsers(data.data);
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
                        backgroundColor: '#0e297c',
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
            title: 'Name',
            dataIndex: 'fullname',
            key: 'fullname',
            ...getColumnSearchProps('fullname'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            ...getColumnSearchProps('role'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle" className='flex'>
                    <Tooltip title="Edit" color="blue">
                        <EyeOutlined style={{ fontSize: '17px' }} className=" hover:text-blue-600 cursor-pointer" />
                    </Tooltip>
                    <Tooltip title="Export" color="purple">
                        <ExportOutlined style={{ fontSize: '17px' }} className=" hover:text-blue-600 cursor-pointer mx-2" />
                    </Tooltip>
                    <Popconfirm title="Are you sure you want to delete this expense?"
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
            await instance.delete(`/user/${id}`)
            message.success('User deleted successfully');
            fetchData({
                pagination,
            });
            // window.location.reload(false);
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

    const openUserModal = () => {
        showModal(MODAL_TYPES.USER_MODAL, {
            title: "Add new user",
            confirmBtn: "Save",
            action: () => fetchData({
                pagination,
            }),
        });
        console.log('open user modal');
    };
    return (
        <div className='py-4'>
            <div className='py-4'>
                <Space wrap>
                    <Button onClick={openUserModal}>Add User</Button>
                </Space>
            </div>
            <Table
                columns={columns}
                loading={tableLoader}
                onChange={handleTableChange}
                dataSource={datax}
                pagination={pagination}
                bordered />
        </div>
    )
}
