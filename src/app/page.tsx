'use client';

import { Form, Input, Button } from 'antd';

declare const name: string;

const { Item } = Form;

const Home = () => {
  const handleFinish = () => {
    console.log('finish');
  };

  return (
    <Form
      onFinish={handleFinish}
    >
      <div>{name}</div>
      <Item label="班级">
        <Input placeholder='请输入班级' />
      </Item>
      <Item label="学号">
        <Input placeholder="输入学号" />
      </Item>
      <Item label={null}>
        <Button htmlType="submit">进入</Button>
      </Item>
    </Form>
  );
}

export default Home;
