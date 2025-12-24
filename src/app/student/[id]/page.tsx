/**
 * 登录成功页面
 */

"use client";

import { Button, Card, Flex, Typography } from "antd";
import { useParams, useRouter } from "next/navigation";

const { Title, Paragraph, Text } = Typography;

const StudentPage = () => {
  const params = useParams();
  const studentId = params?.id as string | undefined;

  const router = useRouter();

  // 拼一拼
  const handleToSpell = () => {
    router.push(`/student/${studentId}/spell`);
  };
  // 读一读
  const handleToRead = () => {
    router.push(`/student/${studentId}/read`);
  };
  // 背一背
  const handleToRecite = () => {
    router.push(`/student/${studentId}/recite`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-100 via-white to-pink-100">
      <Flex
        justify="center"
        align="center"
        className="min-h-screen px-4 py-10"
      >
        <Card
          className="w-full max-w-xl shadow-xl rounded-2xl"
          styles={{
            body: { padding: "28px" },
          }}
        >
          <div className="flex flex-col items-center gap-2 pb-2">
            <Title type="secondary">
              {studentId ? `学号：${studentId}` : "欢迎小朋友"}
            </Title>
          </div>

          <div className="mb-6 rounded-xl bg-sky-50 px-4 py-3 text-center">
            <Paragraph style={{ marginBottom: 0 }}>
              选择想测评的项目，跟着老师一起玩中学吧～
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Button
              type="primary"
              size="large"
              className="h-16 rounded-xl bg-linear-to-r from-amber-400 to-orange-400 border-none shadow-md"
              onClick={handleToSpell}
            >
              拼一拼
            </Button>
            <Button
              type="primary"
              size="large"
              className="h-16 rounded-xl bg-linear-to-r from-sky-400 to-blue-500 border-none shadow-md"
              onClick={handleToRead}
            >
              读一读
            </Button>
            <Button
              type="primary"
              size="large"
              className="h-16 rounded-xl bg-linear-to-r from-green-400 to-emerald-500 border-none shadow-md"
              onClick={handleToRecite}
            >
              背一背
            </Button>
          </div>

          <div className="mt-6 rounded-xl bg-white px-4 py-3 text-center shadow-inner">
            <Text className="text-sky-700">
              小提示：认真练习，星星奖励等着你！
            </Text>
          </div>
        </Card>
      </Flex>
    </div>
  );
};

export default StudentPage;
