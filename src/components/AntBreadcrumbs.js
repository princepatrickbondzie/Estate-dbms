import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const breadcrumbNameMap = {
    '/expense': 'Expenses',
    '/appartments': 'Appartments',
    '/appartments/:id': 'Detail',
    '/users': 'Users',
    '/message': 'Message',
    '/system': 'System',
    '/facility-management': 'FacilityManagement',
};

const AntBreadcrumbs = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });

    const breadcrumbItems = [
        <Breadcrumb.Item key="dashboard">
            <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    return (
        <div className="demo">
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
            {/* <Alert
                style={{
                    margin: '16px 0',
                }}
                message="Click the navigation above to switch:"
            /> */}
        </div>
    )
}

export default AntBreadcrumbs;