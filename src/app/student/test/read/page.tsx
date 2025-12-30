"use client";

/**
 * 读一读
 */

import { Suspense } from "react";
import { useMemo, useState } from "react";
import { Button, Card, Flex, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useSpeechRecognition } from "@/utils/speech";
import { useUserInfoContext } from "@/contexts/userinfo";

const subjects = ["啊", "波", "神", "么", "嘛", "马", "驴", "哦", "破", "去"];
const { Title, Paragraph, Text } = Typography;

const ReadContent = () => {
  const router = useRouter();
  const userinfo = useUserInfoContext();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const {
    supported,
    listening,
    transcript,
    interimTranscript,
    start,
    stop,
    reset,
  } = useSpeechRecognition({
    lang: "zh-CN",
    continuous: true,
    interimResults: true,
  });

  const currentSubject = useMemo(() => subjects[currentIndex], [currentIndex]);
  const isLast = currentIndex === subjects.length - 1;

  const handleStart = () => {
    reset();
    start();
  };

  const handleStop = () => {
    stop();
  };

  const persistAnswer = () => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: transcript || interimTranscript || "",
    }));
  };

  const handleNext = () => {
    persistAnswer();
    reset();
    if (!isLast) {
      setCurrentIndex((idx) => Math.min(idx + 1, subjects.length - 1));
    }
  };

  const handleSubmit = () => {
    persistAnswer();
    router.push(`/student/test`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-100 via-white to-pink-100">
      <Flex justify="center" align="center" className="min-h-screen px-4 py-10">
        <Card
          className="w-full max-w-3xl shadow-xl rounded-2xl"
          styles={{ body: { padding: "28px" } }}
        >
          <div className="flex flex-col items-center gap-1 pb-4">
            <Title level={3} style={{ marginBottom: 0 }}>
              读一读
            </Title>
            <Text type="secondary">
              {userinfo.studentId ? `学号：${userinfo.studentId}` : "小朋友，加油！"}
            </Text>
            <Text className="text-sky-600">{`题目 ${currentIndex + 1} / ${
              subjects.length
            }`}</Text>
          </div>

          {!supported && (
            <div className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-amber-700">
              当前浏览器不支持语音识别，请使用 Chrome/Edge/Safari。
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-[240px,1fr] items-center">
            <div className="flex h-48 w-full items-center justify-center rounded-2xl bg-white text-6xl font-bold shadow-inner text-sky-700">
              {currentSubject}
            </div>

            <div className="flex flex-col gap-3">
              <Paragraph className="text-lg font-semibold text-sky-700">
                请大声读出：{currentSubject}
              </Paragraph>

              <div className="flex flex-wrap gap-3">
                <Button
                  type="primary"
                  size="large"
                  className="px-4"
                  onMouseDown={handleStart}
                  onMouseUp={handleStop}
                  onTouchStart={handleStart}
                  onTouchEnd={handleStop}
                  disabled={!supported}
                >
                  {listening ? "正在录音…" : "开始朗读"}
                </Button>
                <Button
                  size="large"
                  onClick={handleNext}
                  disabled={listening || isLast}
                >
                  下一题
                </Button>
              </div>

              <div className="rounded-xl border border-dashed border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 shadow-inner">
                <Text type="secondary">我的朗读（实时）：</Text>
                <Paragraph style={{ marginBottom: 0 }}>
                  {interimTranscript || "等待录音…"}
                </Paragraph>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 shadow-inner">
                <Text type="secondary">已记录：</Text>
                <Paragraph style={{ marginBottom: 0 }}>
                  {transcript || answers[currentIndex] || "尚未记录"}
                </Paragraph>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
            <Text className="text-sky-700">
              小提示：先按“开始朗读”，读完松开手指，然后进入下一题。
            </Text>
            <Button
              type="primary"
              size="large"
              className="px-6"
              onClick={handleSubmit}
              disabled={listening || (!isLast && !transcript)}
            >
              提交并返回
            </Button>
          </div>
        </Card>
      </Flex>
    </div>
  );
};

const Read = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-linear-to-br from-sky-100 via-white to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-sky-600 text-lg">加载中...</div>
        </div>
      </div>
    }>
      <ReadContent />
    </Suspense>
  );
};

export default Read;
