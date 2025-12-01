"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/app/i18n/client";
import { I18nInstance, StateSetter } from "@/app/lib/constants";
import { UserGenerateResponse } from "@/app/api/v1/generate/user-generate/route";
import { userGenerate } from "@/app/services/v1/generate";
import { ResponsiveContextValue, useResponsiveContext } from "@/app/[lng]/components/ResponsiveContext";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
};

export default function Main() {
  const { t }: I18nInstance = useT("started", {});
  const { isTabletScreen, isMobileScreen }: ResponsiveContextValue = useResponsiveContext();
  const [messages, setMessages]: StateSetter<ChatMessage[]> = useState<ChatMessage[]>([]);
  const [input, setInput]: StateSetter<string> = useState<string>("");
  const [loading, setLoading]: StateSetter<boolean> = useState<boolean>(false);
  const listRef: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  const inputRef: React.RefObject<HTMLTextAreaElement | null> = useRef<HTMLTextAreaElement>(null);
  const containerMaxWidth: string = isMobileScreen ? "max-w-full px-4" : isTabletScreen ? "max-w-4xl px-8" : "max-w-5xl px-12";

  useEffect((): void => {
    const container: HTMLDivElement | null = listRef.current;
    if (!container) return;
    requestAnimationFrame((): void => {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    });
  }, [messages]);

  const nowIso: () => string = (): string => {
    return new Date().toISOString();
  };

  const pushMessage: (message: ChatMessage) => void = (message: ChatMessage): void => {
    setMessages((prev): ChatMessage[] => [...prev, message]);
  };

  const sendMessage: () => void = async (): Promise<void> => {
    if (!input.trim()) return;
    const userInput: string = input.trim();
    setInput("");
    pushMessage({ id: `u-${Date.now()}`, role: "user", content: userInput, time: nowIso() });
    setLoading(true);
    const response: Response = await userGenerate({
      input: userInput
    });
    try {
      if (!response.ok) {
        pushMessage({ id: `server-error-${Date.now()}`, role: "assistant", content: t("common.serverError"), time: nowIso() });
        setLoading(false);
        return;
      }
      const responseBody: UserGenerateResponse = await response.json();
      const assistantReply: string = responseBody.output;
      pushMessage({ id: `assistant-reply-${Date.now()}`, role: "assistant", content: assistantReply, time: nowIso() });
    } catch (error) {
      console.error(error);
      pushMessage({ id: `network-error-${Date.now()}`, role: "assistant", content: t("common.networkError"), time: nowIso() });
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  const handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if ((e.key === "Enter" && !e.shiftKey) || (e.key === "Enter" && (e.ctrlKey || e.metaKey))) {
      e.preventDefault();
      sendMessage();
    }
  }

  const handleCopy: (text: string) => Promise<void> = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
    } catch { }
  }

  return (
    <main className={`flex flex-col w-full h-full bg-[var(--theme-bg-base)] ${isMobileScreen ? "pt-[80px]" : "pt-[100px]"}`}>
      <div className={`mx-auto w-full ${containerMaxWidth} flex flex-col gap-4`} style={{ minHeight: isMobileScreen ? "calc(100vh - 140px)" : "calc(100vh - 160px)" }}>
        {/* header */}
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-[var(--theme-fg-base)] font-semibold text-2xl">{t("chat.title") ?? "聊天"}</h2>
            <p className="text-[var(--theme-text-muted)] mt-1 text-sm">{t("chat.subtitle") ?? "与模型进行对话"}</p>
          </div>
          <div className="text-sm text-[var(--theme-text-subtle)] select-none">{/* optional status / tips */}</div>
        </header>

        {/* message list */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto p-4 rounded-lg border border-[var(--theme-border-base)] bg-[var(--theme-bg-muted)]"
          role="log"
          aria-live="polite"
        >
          <div className="flex flex-col gap-4">
            {messages.length === 0 && (
              <div className="text-center text-[var(--theme-text-muted)] py-12">
                <div className="mb-2">{t("chat.emptyHint") ?? "开始一段对话，按 Enter 发送。"}</div>
                <div className="text-xs text-[var(--theme-text-subtle)]">{t("chat.shortcutHint") ?? "Enter 发送, Shift+Enter 换行"}</div>
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id ?? `${msg.role}-${Math.random()}`} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`relative max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  {/* bubble */}
                  <div
                    className={`px-4 py-2 rounded-xl whitespace-pre-wrap break-words ${
                      msg.role === "user"
                        ? "bg-[var(--theme-primary-light)] text-white shadow-[0_6px_18px_rgba(2,6,23,0.08)]"
                        : "bg-[var(--theme-bg-base)] text-[var(--theme-fg-base)] border border-[var(--theme-border-base)]"
                    }`}
                    style={{
                      fontFamily: msg.role === "user" ? "inherit" : "var(--font-geist-sans, inherit)",
                      lineHeight: 1.5,
                    }}
                    onDoubleClick={() => handleCopy(msg.content)}
                    title={t("chat.doubleClickCopy") ?? "双击复制消息"}
                  >
                    {/* assistant messages may contain long text; preserve pre-wrap */}
                    <div className="text-sm" dangerouslySetInnerHTML={{ __html: escapeHtmlToSimpleHtml(msg.content) }} />
                  </div>

                  {/* time / copy button */}
                  <div className={`mt-2 text-xs ${msg.role === "user" ? "text-right text-[var(--theme-text-muted)]" : "text-left text-[var(--theme-text-muted)]"} flex items-center gap-3`}>
                    <span>{formatTimeShort(msg.time)}</span>
                    <button
                      onClick={() => handleCopy(msg.content)}
                      className="select-none text-[var(--theme-text-subtle)] hover:text-[var(--theme-fg-base)] transition"
                      aria-label={t("chat.copy") ?? "复制"}
                      title={t("chat.copy") ?? "复制"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="inline-block">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.75 0.5C1.7835 0.5 1 1.2835 1 2.25V9.75C1 10.7165 1.7835 11.5 2.75 11.5H3.75V10H2.75H2.75C2.61193 10 2.5 9.88807 2.5 9.75V2.25C2.5 2.11193 2.61193 2 2.75 2H8.25C8.38807 2 8.5 2.11193 8.5 2.25V3H10V2.25C10 1.2835 9.2165 0.5 8.25 0.5H2.75ZM7.75 4.5C6.7835 4.5 6 5.2835 6 6.25V13.75C6 14.7165 6.7835 15.5 7.75 15.5H13.25C14.2165 15.5 15 14.7165 15 13.75V6.25C15 5.2835 14.2165 4.5 13.25 4.5H7.75ZM7.5 6.25C7.5 6.11193 7.61193 6 7.75 6H13.25C13.3881 6 13.5 6.11193 13.5 6.25V13.75C13.5 13.8881 13.3881 14 13.25 14H7.75C7.61193 14 7.5 13.8881 7.5 13.75V6.25Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[70%] px-4 py-2 rounded-xl bg-[var(--theme-bg-base)] border border-[var(--theme-border-base)]">
                  <TypingDots />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* input area */}
        <div className="mt-3">
          <div className="flex items-center gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("chat.inputPlaceholder") ?? "输入消息，按 Enter 发送（Shift+Enter 换行）"}
              className="flex-1 min-h-[48px] max-h-[200px] resize-none px-4 py-3 rounded-lg border border-[var(--theme-border-base)] bg-[var(--theme-bg-base)] text-[var(--theme-fg-base)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary-light)]"
            />
            <button
              onClick={() => void sendMessage()}
              disabled={loading || !input.trim()}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition ${loading || !input.trim() ? "bg-[var(--theme-border-base)] opacity-60 cursor-not-allowed" : "bg-[var(--theme-primary-light)] hover:opacity-95"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z" /></svg>
              <span>{t("chat.send") ?? "发送"}</span>
            </button>
          </div>
          <div className="mt-2 text-xs text-[var(--theme-text-muted)]">
            {t("chat.hint") ?? "支持 Enter 发送，Shift+Enter 换行。双击消息可复制。"}
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------- 小工具与子组件 ---------- */

/** 简单把换行和 HTML 特殊字符转为安全的 <br/> 与文本（用于保留换行显示） */
/** 这里不做复杂的 Markdown/HTML 解析，避免 XSS；仅转义并把换行替换成 <br/> **/
function escapeHtmlToSimpleHtml(text?: string) {
  if (!text) return "";
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
  // preserve double newlines -> paragraph-ish, single newline -> <br/>
  return escaped.replace(/\r\n/g, "\n").replace(/\n\n+/g, "</p><p>").replace(/\n/g, "<br/>");
}

/** 格式化为短时间（本地） */
function formatTimeShort(iso?: string) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

/** 三个点的打字动画 */
function TypingDots() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full animate-pulse" />
      <div className="w-2.5 h-2.5 rounded-full animate-pulse delay-150" />
      <div className="w-2.5 h-2.5 rounded-full animate-pulse delay-300" />
      <style>{`
        .animate-pulse { animation: typing-dot 1s infinite; opacity: 0.75; background: var(--theme-text-muted); }
        .delay-150 { animation-delay: 0.15s; }
        .delay-300 { animation-delay: 0.3s; }
        @keyframes typing-dot {
          0% { transform: translateY(0); opacity: 0.35; }
          50% { transform: translateY(-6px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.35; }
        }
      `}</style>
    </div>
  );
}
