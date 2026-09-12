import prisma from "@/lib/prisma";

const STUDIO_HEADER = `🏢 MIRAZ STUDIO
━━━━━━━━━━━━━━━━`;

export interface StudioMessageOptions {
  title?: string;
  body: string;
}

/**
 * Escapes characters for Telegram HTML mode to prevent markup injection.
 */
export function escapeHtml(str: string | null | undefined): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Central formatter for ALL Miraz Studio Telegram messages.
 * Guarantees that every message starts with the Studio header.
 */
export function formatStudioTelegramMessage({ title, body }: StudioMessageOptions): string {
  if (title) {
    return `${STUDIO_HEADER}\n\n<b>${title}</b>\n\n${body}`;
  }
  return `${STUDIO_HEADER}\n\n${body}`;
}

export function formatStudioErrorMessage(errorDescription: string): string {
  return `${STUDIO_HEADER}\n\n❌ ${escapeHtml(errorDescription)}`;
}

/**
 * Sends a message via the Telegram Bot API.
 * Never throws an error to user-facing callers; logs issues securely.
 */
export async function sendTelegramMessage({
  chatId,
  text,
  replyMarkup,
}: {
  chatId?: string;
  text: string;
  replyMarkup?: Record<string, any>;
}): Promise<{ success: boolean; messageId?: number; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const targetChatId = chatId || process.env.TELEGRAM_ADMIN_CHAT_ID;

  if (!token) {
    console.warn("[Telegram Service] TELEGRAM_BOT_TOKEN is not configured.");
    return { success: false, error: "TELEGRAM_BOT_TOKEN missing" };
  }

  if (!targetChatId) {
    console.warn("[Telegram Service] TELEGRAM_ADMIN_CHAT_ID is not configured.");
    return { success: false, error: "TELEGRAM_ADMIN_CHAT_ID missing" };
  }

  try {
    const payload: Record<string, any> = {
      chat_id: targetChatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    };

    if (replyMarkup) {
      payload.reply_markup = replyMarkup;
    }

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000), // 5-second timeout to prevent hung requests
    });

    const data = await res.json();
    if (!data.ok) {
      console.error("[Studio Telegram] Notification failed:", data.description);
      return { success: false, error: data.description };
    }

    console.log("[Studio Telegram] Notification sent successfully");
    return { success: true, messageId: data.result?.message_id };
  } catch (err: any) {
    console.error("[Studio Telegram] Notification failed (network/timeout):", err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Edits an existing Telegram message (e.g. upon button click).
 */
export async function editTelegramMessage({
  chatId,
  messageId,
  text,
  replyMarkup,
}: {
  chatId: string | number;
  messageId: number;
  text: string;
  replyMarkup?: Record<string, any>;
}): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return false;

  try {
    const payload: Record<string, any> = {
      chat_id: chatId,
      message_id: messageId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    };

    if (replyMarkup) {
      payload.reply_markup = replyMarkup;
    }

    const res = await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });

    const data = await res.json();
    return data.ok;
  } catch (err: any) {
    console.error("[Studio Telegram] Failed to edit message:", err.message);
    return false;
  }
}

/**
 * Answers a Telegram callback query (removes loading spinner on button).
 */
export async function answerCallbackQuery({
  callbackQueryId,
  text,
  showAlert = false,
}: {
  callbackQueryId: string;
  text?: string;
  showAlert?: boolean;
}): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return false;

  try {
    await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        callback_query_id: callbackQueryId,
        text,
        show_alert: showAlert,
      }),
      signal: AbortSignal.timeout(5000),
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Notification triggered when a new client lead/inquiry is submitted on Miraz Studio.
 * Formats data, escapes user input, and attaches Studio-specific callback actions.
 */
export async function sendStudioNewLeadNotification(lead: {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  projectType?: string | null;
  budget?: string | null;
  timeline?: string | null;
  message: string;
  status?: string;
}) {
  const body = [
    `👤 <b>Name:</b>\n${escapeHtml(lead.name)}`,
    `📧 <b>Email:</b>\n${escapeHtml(lead.email)}`,
    lead.company ? `🏢 <b>Company:</b>\n${escapeHtml(lead.company)}` : null,
    lead.projectType ? `💼 <b>Project:</b>\n${escapeHtml(lead.projectType)}` : null,
    lead.budget ? `💰 <b>Budget:</b>\n${escapeHtml(lead.budget)}` : null,
    lead.timeline ? `⏱ <b>Timeline:</b>\n${escapeHtml(lead.timeline)}` : null,
    `💬 <b>Message:</b>\n${escapeHtml(lead.message)}`,
    `\n🟡 <b>Status:</b> New`,
  ]
    .filter(Boolean)
    .join("\n\n");

  const messageText = formatStudioTelegramMessage({
    title: "🚀 NEW CLIENT INQUIRY",
    body,
  });

  const replyMarkup = {
    inline_keyboard: [
      [
        { text: "👁 View", callback_data: `studio:lead:view:${lead.id}` },
        { text: "📖 Mark Read", callback_data: `studio:lead:read:${lead.id}` },
        { text: "📦 Archive", callback_data: `studio:lead:archive:${lead.id}` },
      ],
    ],
  };

  return sendTelegramMessage({
    text: messageText,
    replyMarkup,
  });
}

/**
 * Helper to check if a Telegram user/chat is the authorized admin.
 */
export function isAuthorizedAdmin(chatId: string | number): boolean {
  const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
  if (!adminChatId) return false;
  return String(chatId) === String(adminChatId);
}

/**
 * Generates the Studio Dashboard message text & keyboard.
 */
export async function getStudioDashboardData() {
  const [newLeadsCount, activeProjectsCount, totalProjectsCount] = await Promise.all([
    prisma.contactMessage.count({ where: { status: "new" } }),
    prisma.project.count({ where: { status: "PUBLISHED" } }),
    prisma.project.count(),
  ]);

  const body = [
    `🚀 <b>New Leads:</b> ${newLeadsCount}`,
    `📁 <b>Active Projects:</b> ${activeProjectsCount}`,
    `🗄 <b>Total Case Studies:</b> ${totalProjectsCount}`,
  ].join("\n");

  const text = formatStudioTelegramMessage({
    title: "STUDIO DASHBOARD",
    body,
  });

  const replyMarkup = {
    inline_keyboard: [
      [
        { text: "🚀 Leads", callback_data: "studio:leads:1" },
        { text: "📁 Projects", callback_data: "studio:projects:1" },
      ],
      [
        { text: "🔄 Refresh", callback_data: "studio:dashboard" },
        { text: "⬅️ Back", callback_data: "personal:menu" },
      ],
    ],
  };

  return { text, replyMarkup };
}

/**
 * Generates the recent Studio leads list with pagination.
 */
export async function getStudioLeadsData(page: number = 1) {
  const pageSize = 5;
  const skip = (page - 1) * pageSize;

  const [leads, totalCount] = await Promise.all([
    prisma.contactMessage.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
    prisma.contactMessage.count(),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  let body = "";
  if (leads.length === 0) {
    body = "No leads found in registry.";
  } else {
    body = leads
      .map((lead, idx) => {
        const itemNumber = skip + idx + 1;
        let statusEmoji = "🟡 New";
        if (lead.status === "read") statusEmoji = "🟢 Read";
        if (lead.status === "archived") statusEmoji = "🔴 Archived";
        if (lead.status === "replied") statusEmoji = "🔵 Replied";

        return `${itemNumber}. <b>${escapeHtml(lead.name)}</b>\n   ${escapeHtml(
          lead.projectType || "General Inquiry"
        )}\n   ${statusEmoji}`;
      })
      .join("\n\n");
  }

  const text = formatStudioTelegramMessage({
    title: `🚀 RECENT LEADS (Page ${page}/${totalPages})`,
    body,
  });

  const navButtons = [];
  if (page > 1) {
    navButtons.push({ text: "⬅️ Prev", callback_data: `studio:leads:${page - 1}` });
  }
  if (page < totalPages) {
    navButtons.push({ text: "Next ➡️", callback_data: `studio:leads:${page + 1}` });
  }

  // Row for individual detail inspection if leads exist
  const detailButtons = leads.slice(0, 3).map((l, i) => ({
    text: `👁 #${skip + i + 1}`,
    callback_data: `studio:lead:view:${l.id}`,
  }));

  const inlineKeyboard: any[][] = [];
  if (detailButtons.length > 0) inlineKeyboard.push(detailButtons);
  if (navButtons.length > 0) inlineKeyboard.push(navButtons);
  inlineKeyboard.push([
    { text: "📊 Dashboard", callback_data: "studio:dashboard" },
  ]);

  return { text, replyMarkup: { inline_keyboard: inlineKeyboard } };
}

/**
 * Generates the projects list.
 */
export async function getStudioProjectsData(page: number = 1) {
  const pageSize = 5;
  const skip = (page - 1) * pageSize;

  const [projects, totalCount] = await Promise.all([
    prisma.project.findMany({
      skip,
      take: pageSize,
      orderBy: { sortOrder: "asc" },
      select: { id: true, title: true, type: true, status: true },
    }),
    prisma.project.count(),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  let body = "";
  if (projects.length === 0) {
    body = "No projects in registry.";
  } else {
    body = projects
      .map((p, idx) => {
        const itemNumber = skip + idx + 1;
        const statusEmoji =
          p.status === "PUBLISHED"
            ? "🟢 Active"
            : p.status === "DRAFT"
            ? "🟡 Draft"
            : "🔵 Archived";

        return `${itemNumber}. <b>${escapeHtml(p.title)}</b>\n   ${escapeHtml(
          p.type
        )}\n   ${statusEmoji}`;
      })
      .join("\n\n");
  }

  const text = formatStudioTelegramMessage({
    title: `📁 PROJECTS (Page ${page}/${totalPages})`,
    body,
  });

  const navButtons = [];
  if (page > 1) {
    navButtons.push({ text: "⬅️ Prev", callback_data: `studio:projects:${page - 1}` });
  }
  if (page < totalPages) {
    navButtons.push({ text: "Next ➡️", callback_data: `studio:projects:${page + 1}` });
  }

  const inlineKeyboard: any[][] = [];
  if (navButtons.length > 0) inlineKeyboard.push(navButtons);
  inlineKeyboard.push([
    { text: "📊 Dashboard", callback_data: "studio:dashboard" },
  ]);

  return { text, replyMarkup: { inline_keyboard: inlineKeyboard } };
}
