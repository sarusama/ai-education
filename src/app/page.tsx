'use client';

import { Button, Card, Flex, Typography } from 'antd';
import { useRouter } from 'next/navigation';

// declare const name: string;

const { Title, Text } = Typography;

const Home = () => {
  const router = useRouter();

  const handleStudentClick = () => {
    router.push('/student');
  };

  const handleTeacherClick = () => {
    router.push('/teacher');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-pink-100">
      <Flex
        justify="center"
        align="center"
        className="min-h-screen px-4 py-10"
      >
        <Card
          className="w-full max-w-2xl shadow-xl rounded-2xl"
          styles={{
            body: { padding: '48px 32px' },
          }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* 标题区域 */}
            <div className="flex flex-col items-center gap-3">
              <Title level={2} style={{ marginBottom: 0, textAlign: 'center' }}>
                {/* {name} */}
                富春三小期末非纸质测评系统（模拟）
              </Title>
              <Text type="secondary" className="text-base">
                请选择您的身份进入系统
              </Text>
            </div>

            {/* 按钮区域 */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* 学生端按钮 */}
              <Button
                type="primary"
                size="large"
                onClick={handleStudentClick}
                className="h-24 text-lg font-medium shadow-md hover:shadow-lg transition-shadow"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  border: 'none',
                }}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl mb-1">👨‍🎓</span>
                  <span>学生入口</span>
                  <Text className="text-xs opacity-90" style={{ color: 'white' }}>
                    开始学习测评
                  </Text>
                </div>
              </Button>

              {/* 教师端按钮 */}
              <Button
                size="large"
                onClick={handleTeacherClick}
                className="h-24 text-lg font-medium shadow-md hover:shadow-lg transition-shadow border-2 border-sky-300 hover:border-sky-400"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
                  color: '#0ea5e9',
                }}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl mb-1">👩‍🏫</span>
                  <span>教师入口</span>
                  <Text className="text-xs opacity-80" style={{ color: '#0ea5e9' }}>
                    管理教学系统
                  </Text>
                </div>
              </Button>
            </div>

            {/* 底部提示 */}
            <div className="mt-6 rounded-xl bg-sky-50 px-4 py-3 text-center text-sm text-sky-700 w-full">
              <Text>
                💡 提示：学生请选择学生端，教师请选择教师端
              </Text>
            </div>
          </div>
        </Card>
      </Flex>
    </div>
  );
};

export default Home;
