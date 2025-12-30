"use client";

/**
 * 背一背
 * 看图背诵全文
 */

import { Suspense } from "react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Button, Card, Flex, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useSpeechRecognition } from "@/utils/speech";
import { useUserInfoContext } from "@/contexts/userinfo";

const subjects = [
  {
    image: "/ai-education/recite/subjects/image.png",
    // hint: "看图背诵：锄禾日当午，汗滴禾下土。谁知盘中餐，粒粒皆辛苦。",
  },
];

const { Title, Paragraph, Text } = Typography;

const ReciteContent = () => {
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
              背一背
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
            <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-white shadow-inner">
              <Image
                src={currentSubject.image}
                alt="背诵图片"
                fill
                className="object-contain p-4"
                sizes="240px"
                priority
              />
            </div>

            <div className="flex flex-col gap-3">
              {/* <Paragraph className="text-lg font-semibold text-sky-700">
                {currentSubject.hint}
              </Paragraph> */}

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
                  {listening ? "正在录音…" : "开始背诵"}
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
                <Text type="secondary">我的背诵（实时）：</Text>
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
              小提示：看图回忆全文，按住“开始背诵”，背诵完全文松开手指，然后下一题。
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

const Recite = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-linear-to-br from-sky-100 via-white to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-sky-600 text-lg">加载中...</div>
        </div>
      </div>
    }>
      <ReciteContent />
    </Suspense>
  );
};

export default Recite;
