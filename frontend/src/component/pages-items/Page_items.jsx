import { Dropdown, Space } from 'antd';
import './Pages_items.css'; // Import the CSS file for custom styles

const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        About Us
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        Team
      </a>
    ),
  },
];

const Page_items = () => (
  <Space direction="vertical">
    <Space wrap className="dropdown-space">
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomLeft"
        arrow
      >
        <p>Pages</p>
      </Dropdown>
    </Space>
    <Space wrap>
      {/* Other content can go here */}
    </Space>
  </Space>
);

export default Page_items;
