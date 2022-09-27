import React from 'react'
import { Card } from 'antd'

export default function FMCard({ title, action, content }) {
    return (
        <Card size='small' className='shadow-sm' hoverable
            title={title}
            bordered
            style={{
                width: 210, height: 170,
            }}
        >
            {content}
            <p>Card content</p>
            <p>Card content</p>
        </Card>
    )
}
