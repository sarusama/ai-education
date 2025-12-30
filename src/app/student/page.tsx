/**
 * 学生端
 */

'use client';

import { Button, Card, Flex, Form, Input, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useUserInfoContext } from '@/contexts/userinfo';

// declare const name: string;

const { Item } = Form;
const { Title, Paragraph, Text } = Typography;

const StudentPage = () => {
  const router = useRouter();
  const userinfo = useUserInfoContext();

  const handleFinish = (values: { classId?: string; studentId?: string }) => {
    userinfo.setClassId(values.classId || '');
    userinfo.setStudentId(values.studentId || '');
    router.push('/student/test');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-pink-100">
      <Flex
        justify="center"
        align="center"
        className="min-h-screen px-4 py-10"
      >
        <Card
          className="w-full max-w-md shadow-xl rounded-2xl"
          styles={{
            body: { padding: '28px' },
          }}
        >
          <div className="flex flex-col items-center gap-2 pb-4">
            <Title level={3} style={{ marginBottom: 4 }}>
              欢迎来到快乐课堂
            </Title>
            <Text type="secondary">请先填好你的班级和学号</Text>
          </div>

          <Form
            layout="vertical"
            onFinish={handleFinish}
            requiredMark={false}
          >
            <div className="mb-4 text-center text-base font-medium text-sky-600">
              {/* {name} */}
              富春三小期末非纸质测评系统（模拟）
            </div>

            <Item
              label="班级"
              name="classId"
              rules={[{ required: true, message: '请填写你的班级哦~' }]}
            >
              <Input
                size="large"
                placeholder="如：102"
              />
            </Item>

            <Item
              label="学号"
              name="studentId"
              rules={[{ required: true, message: '别忘了填学号！' }]}
            >
              <Input
                size="large"
                placeholder="输入学号"
              />
            </Item>

            <Item label={null} style={{ marginBottom: 0 }}>
              <Button
                className="w-full"
                type="primary"
                size="large"
                htmlType="submit"
              >
                进行测评
              </Button>
            </Item>
          </Form>

          <div className="mt-5 rounded-xl bg-sky-50 px-3 py-2 text-center text-sm text-sky-700">
            <Paragraph style={{ marginBottom: 0 }}>
              小提示：提交后和老师一起开始有趣的学习吧！
            </Paragraph>
          </div>
        </Card>
      </Flex>
    </div>
  );
};

export default StudentPage;
