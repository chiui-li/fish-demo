import React, { useEffect, useState } from 'react';
import mock from './mock.json';
import './index.less'
import { Card, Segmented, Typography, Space, } from 'antd';
import typesMock from './mock.types.json'
import { Dropdown } from 'antd';
import {
  EllipsisOutlined,
  LoadingOutlined,
  WeiboOutlined,
} from '@ant-design/icons';

/**
 * 
 * @returns {
 *  interface HotSearchProps {
 *   list: Array<{ 
 *    title: string, 
 *    url: string, 
 *    hot: string, 
 *    webURL: string,
 *    rank: number 
 *   }>;
 *    hotApp: ''
 *  }
 * }
 */
export default function HotSearch() {
  const [types, setTypes] = useState('wb');
  const [list, setList] = useState(mock.data.realtime.map(i => {
    return {
      title: i.word || i.note,
      hot: 'weibo',
      webURL: i.webURL,
      hot: i.num + '',
      rank: i.rank,
    }
  }));
  useEffect(() => {
  }, []);
  const selectType = <Segmented
    className='type-segmented'
    size='small'
    onChange={v => setTypes(v)}
    value={types} options={typesMock.types}
  />
  return (
    <div className='fish-hot-search'>
      <Card
        // bordered={false} 
        size='small' style={{ width: '100%' }}
        title={<>
          <span className='fish-hot-search-name'>热搜</span>
          {selectType}
        </>}
        extra={<Space>
          <LoadingOutlined style={{ marginLeft: 4 }} />
          <Typography.Text
            style={{ marginLeft: 8 }}
            type='secondary'
          >
            3分钟前
          </Typography.Text>
          <Dropdown menu={{
            items: [
              { key: '1', icon: <LoadingOutlined />, label: '刷新' },
            ]
          }}>
            <EllipsisOutlined />
          </Dropdown>
        </Space>}
        className='fish-hot-search-card'
      >
        <div className='fish-hot-search-list'>
          <Space style={{ width: '100%' }} direction='vertical' size={6}>
            {list.map((item, index) => {
              return <div className='fish-hot-search-item' key={index}>
                <span className='fish-hot-search-item-index' style={{ color: index < 3 ? 'red' : undefined }}>{index + 1}.</span>
                <span className='fish-hot-search-item-title'>
                  <a style={{color: 'inherit'}} href={item.webURL}>{item.title}</a>
                </span>
                <span className='fish-hot-search-item-hot'>{item.hot}</span>
              </div>
            })}
          </Space>
        </div>
      </Card>
    </div>
  )
}