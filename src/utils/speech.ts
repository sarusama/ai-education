"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SpeechRecognitionResultItem = { transcript: string };
type SpeechRecognitionResult = {
  isFinal: boolean;
  0: SpeechRecognitionResultItem;
};
type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: Array<SpeechRecognitionResult>;
};
type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

const getSpeechRecognition = (): SpeechRecognitionConstructor | undefined => {
  if (typeof window === "undefined") return undefined;
  const maybeWindow = window as typeof window & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return maybeWindow.SpeechRecognition || maybeWindow.webkitSpeechRecognition;
};

export interface SpeechOptions {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
}

export interface SpeechControls {
  supported: boolean;
  listening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export const useSpeechRecognition = (
  options: SpeechOptions = {}
): SpeechControls => {
  const [supported] = useState(() => !!getSpeechRecognition());
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = options.continuous ?? true;
    recognition.interimResults = options.interimResults ?? true;
    recognition.lang = options.lang ?? "zh-CN";

    recognition.onresult = (event: SpeechRecognitionEventLike) => {
      const { resultIndex, results } = event;
      const finalText = Array.from(results)
        .slice(resultIndex)
        .filter((result) => result.isFinal)
        .map((result) => result[0].transcript)
        .join("");

      const latestResult = results[resultIndex];
      const interimText =
        latestResult && !latestResult.isFinal ? latestResult[0].transcript : "";

      if (finalText) {
        setTranscript((prev) => `${prev}${finalText}`);
      }
      setInterimTranscript(interimText);
    };

    recognition.onerror = (event: { error: string }) => {
      setError(event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognitionRef.current?.stop();
      recognitionRef.current = null;
    };
  }, [options.continuous, options.interimResults, options.lang]);

  const start = useCallback(() => {
    setError(null);
    setTranscript("");
    setInterimTranscript("");
    try {
      recognitionRef.current?.start();
      setListening(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "无法启动语音识别";
      setError(message);
      setListening(false);
    }
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  const reset = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
    setError(null);
  }, []);

  return {
    supported,
    listening,
    transcript,
    interimTranscript,
    error,
    start,
    stop,
    reset,
  };
};

