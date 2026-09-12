import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  isAuthorizedAdmin,
  formatStudioTelegramMessage,
  formatStudioErrorMessage,
  sendTelegramMessage,
  editTelegramMessage,
  answerCallbackQuery,
  getStudioDashboardData,
  getStudioLeadsData,
  getStudioProjectsData,
  escapeHtml,
} from "@/lib/telegram";

export async function GET() {
  return NextResponse.json({
    service: "Miraz Studio Telegram Bridge",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: NextRequest) {
  // 1. Secure Server-to-Server Authentication
  const expectedSecret = process.env.STUDIO_TELEGRAM_INTERNAL_SECRET;
  const authHeader = req.headers.get("authorization");

  if (!expectedSecret || !authHeader || authHeader !== `Bearer ${expectedSecret}`) {
    console.warn("[Studio Telegram] Unauthorized request rejected");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const update = await req.json();

    // 2. Handle Callback Query (Button clicks)
    if (update.callback_query) {
      const callbackQuery = update.callback_query;
      const callbackData = (callbackQuery.data as string) || "";
      const fromId = callbackQuery.from?.id;
      const message = callbackQuery.message;
      const chatId = message?.chat?.id || fromId;
      const messageId = message?.message_id;

      // Only handle studio: callbacks
      if (!callbackData.startsWith("studio:")) {
        return NextResponse.json({ status: "ignored_non_studio_callback" });
      }

      // Verify Telegram user authorization
      if (!isAuthorizedAdmin(fromId)) {
        console.warn("[Studio Telegram] Unauthorized callback query attempted");
        await answerCallbackQuery({
          callbackQueryId: callbackQuery.id,
          text: "⛔️ Unauthorized",
          showAlert: true,
        });
        return NextResponse.json({ status: "unauthorized" });
      }

      // Acknowledge callback immediately to remove loading spinner
      await answerCallbackQuery({ callbackQueryId: callbackQuery.id });

      // Route Studio Callbacks:
      if (callbackData === "studio:dashboard") {
        const { text, replyMarkup } = await getStudioDashboardData();
        if (messageId) {
          await editTelegramMessage({ chatId, messageId, text, replyMarkup });
        } else {
          await sendTelegramMessage({ chatId, text, replyMarkup });
        }
        console.log("[Studio Telegram] Callback processed: dashboard");
        return NextResponse.json({ status: "dashboard_rendered" });
      }

      if (callbackData.startsWith("studio:leads:")) {
        const page = parseInt(callbackData.split(":")[2] || "1", 10) || 1;
        const { text, replyMarkup } = await getStudioLeadsData(page);
        if (messageId) {
          await editTelegramMessage({ chatId, messageId, text, replyMarkup });
        } else {
          await sendTelegramMessage({ chatId, text, replyMarkup });
        }
        console.log("[Studio Telegram] Callback processed: leads list");
        return NextResponse.json({ status: "leads_rendered" });
      }

      if (callbackData.startsWith("studio:projects:")) {
        const page = parseInt(callbackData.split(":")[2] || "1", 10) || 1;
        const { text, replyMarkup } = await getStudioProjectsData(page);
        if (messageId) {
          await editTelegramMessage({ chatId, messageId, text, replyMarkup });
        } else {
          await sendTelegramMessage({ chatId, text, replyMarkup });
        }
        console.log("[Studio Telegram] Callback processed: projects list");
        return NextResponse.json({ status: "projects_rendered" });
      }

      if (callbackData.startsWith("studio:lead:view:")) {
        const leadId = callbackData.split(":")[3];
        if (!leadId) {
          return NextResponse.json({ status: "invalid_lead_id" });
        }

        const lead = await prisma.contactMessage.findUnique({
          where: { id: leadId },
        });

        if (!lead) {
          const text = formatStudioErrorMessage("Lead not found or already deleted.");
          if (messageId) {
            await editTelegramMessage({ chatId, messageId, text });
          }
          return NextResponse.json({ status: "lead_not_found" });
        }

        let statusText = "🟡 New";
        if (lead.status === "read") statusText = "🟢 Read";
        if (lead.status === "archived") statusText = "🔴 Archived";
        if (lead.status === "replied") statusText = "🔵 Replied";

        const body = [
          `👤 <b>Name:</b>\n${escapeHtml(lead.name)}`,
          `📧 <b>Email:</b>\n${escapeHtml(lead.email)}`,
          lead.company ? `🏢 <b>Company:</b>\n${escapeHtml(lead.company)}` : null,
          lead.projectType ? `💼 <b>Project:</b>\n${escapeHtml(lead.projectType)}` : null,
          lead.budget ? `💰 <b>Budget:</b>\n${escapeHtml(lead.budget)}` : null,
          lead.timeline ? `⏱ <b>Timeline:</b>\n${escapeHtml(lead.timeline)}` : null,
          `💬 <b>Message:</b>\n${escapeHtml(lead.message)}`,
          `\n<b>Current Status:</b> ${statusText}`,
          `📅 <b>Submitted:</b> ${new Date(lead.createdAt).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}`,
        ]
          .filter(Boolean)
          .join("\n\n");

        const text = formatStudioTelegramMessage({
          title: "LEAD INSPECTION",
          body,
        });

        const replyMarkup = {
          inline_keyboard: [
            [
              { text: "📖 Mark Read", callback_data: `studio:lead:read:${lead.id}` },
              { text: "📦 Archive", callback_data: `studio:lead:archive:${lead.id}` },
            ],
            [
              { text: "⬅️ Back to Leads", callback_data: "studio:leads:1" },
              { text: "📊 Dashboard", callback_data: "studio:dashboard" },
            ],
          ],
        };

        if (messageId) {
          await editTelegramMessage({ chatId, messageId, text, replyMarkup });
        } else {
          await sendTelegramMessage({ chatId, text, replyMarkup });
        }
        console.log("[Studio Telegram] Callback processed: view lead");
        return NextResponse.json({ status: "lead_inspected" });
      }

      // Handle Mark Read (and legacy studio:lead:accept)
      if (callbackData.startsWith("studio:lead:read:") || callbackData.startsWith("studio:lead:accept:")) {
        const leadId = callbackData.split(":")[3];
        if (!leadId) {
          return NextResponse.json({ status: "invalid_lead_id" });
        }

        const lead = await prisma.contactMessage.findUnique({
          where: { id: leadId },
        });

        if (!lead) {
          await answerCallbackQuery({
            callbackQueryId: callbackQuery.id,
            text: "Lead not found.",
            showAlert: true,
          });
          return NextResponse.json({ status: "lead_not_found" });
        }

        // Idempotency check:
        if (lead.status === "read" || lead.status === "replied") {
          await answerCallbackQuery({
            callbackQueryId: callbackQuery.id,
            text: "ℹ️ This lead is already marked as read.",
            showAlert: true,
          });
          return NextResponse.json({ status: "already_read" });
        }

        // Update in database using actual DB status "read":
        await prisma.contactMessage.update({
          where: { id: leadId },
          data: { status: "read" },
        });

        await answerCallbackQuery({
          callbackQueryId: callbackQuery.id,
          text: "✅ Lead marked as Read.",
        });

        const text = formatStudioTelegramMessage({
          title: "LEAD STATUS UPDATED",
          body: `Client <b>${escapeHtml(lead.name)}</b> (${escapeHtml(
            lead.email
          )})\n\n🟢 <b>Status:</b> Read`,
        });

        const replyMarkup = {
          inline_keyboard: [
            [{ text: "👁 View Details", callback_data: `studio:lead:view:${lead.id}` }],
            [{ text: "⬅️ Back to Leads", callback_data: "studio:leads:1" }],
          ],
        };

        if (messageId) {
          await editTelegramMessage({ chatId, messageId, text, replyMarkup });
        }
        console.log("[Studio Telegram] Callback processed: mark read");
        return NextResponse.json({ status: "lead_read" });
      }

      // Handle Archive (and legacy studio:lead:reject)
      if (callbackData.startsWith("studio:lead:archive:") || callbackData.startsWith("studio:lead:reject:")) {
        const leadId = callbackData.split(":")[3];
        if (!leadId) {
          return NextResponse.json({ status: "invalid_lead_id" });
        }

        const lead = await prisma.contactMessage.findUnique({
          where: { id: leadId },
        });

        if (!lead) {
          await answerCallbackQuery({
            callbackQueryId: callbackQuery.id,
            text: "Lead not found.",
            showAlert: true,
          });
          return NextResponse.json({ status: "lead_not_found" });
        }

        // Idempotency check:
        if (lead.status === "archived") {
          await answerCallbackQuery({
            callbackQueryId: callbackQuery.id,
            text: "ℹ️ This lead is already archived.",
            showAlert: true,
          });
          return NextResponse.json({ status: "already_archived" });
        }

        // Update in database using actual DB status "archived":
        await prisma.contactMessage.update({
          where: { id: leadId },
          data: { status: "archived" },
        });

        await answerCallbackQuery({
          callbackQueryId: callbackQuery.id,
          text: "📦 Lead marked as Archived.",
        });

        const text = formatStudioTelegramMessage({
          title: "LEAD STATUS UPDATED",
          body: `Client <b>${escapeHtml(lead.name)}</b> (${escapeHtml(
            lead.email
          )})\n\n🔴 <b>Status:</b> Archived`,
        });

        const replyMarkup = {
          inline_keyboard: [
            [{ text: "👁 View Details", callback_data: `studio:lead:view:${lead.id}` }],
            [{ text: "⬅️ Back to Leads", callback_data: "studio:leads:1" }],
          ],
        };

        if (messageId) {
          await editTelegramMessage({ chatId, messageId, text, replyMarkup });
        }
        console.log("[Studio Telegram] Callback processed: archive lead");
        return NextResponse.json({ status: "lead_archived" });
      }

      console.warn("[Studio Telegram] Unrecognized callback pattern:", callbackData);
      return NextResponse.json({ status: "unrecognized_callback" });
    }

    // 3. Handle Messages / Commands
    if (update.message) {
      const msg = update.message;
      const text = (msg.text || "").trim();
      const chatId = msg.chat?.id;
      const fromId = msg.from?.id;

      // Check if it's a Studio command
      if (
        !text.startsWith("/studio") &&
        !text.startsWith("/studio_leads") &&
        !text.startsWith("/studio_projects")
      ) {
        return NextResponse.json({ status: "ignored_non_studio_command" });
      }

      // Check authorization
      if (!isAuthorizedAdmin(fromId || chatId)) {
        console.warn("[Studio Telegram] Unauthorized command attempted");
        const unauthorizedMsg = formatStudioTelegramMessage({
          title: "SECURITY NOTICE",
          body: "⛔️ Access restricted to authorized studio administrators.",
        });
        await sendTelegramMessage({ chatId, text: unauthorizedMsg });
        return NextResponse.json({ status: "unauthorized" });
      }

      if (text.startsWith("/studio_leads")) {
        const { text: leadsText, replyMarkup } = await getStudioLeadsData(1);
        await sendTelegramMessage({ chatId, text: leadsText, replyMarkup });
        console.log("[Studio Telegram] Command processed: /studio_leads");
        return NextResponse.json({ status: "studio_leads_sent" });
      }

      if (text.startsWith("/studio_projects")) {
        const { text: projectsText, replyMarkup } = await getStudioProjectsData(1);
        await sendTelegramMessage({ chatId, text: projectsText, replyMarkup });
        console.log("[Studio Telegram] Command processed: /studio_projects");
        return NextResponse.json({ status: "studio_projects_sent" });
      }

      if (text.startsWith("/studio")) {
        const { text: dashText, replyMarkup } = await getStudioDashboardData();
        await sendTelegramMessage({ chatId, text: dashText, replyMarkup });
        console.log("[Studio Telegram] Command processed: /studio");
        return NextResponse.json({ status: "studio_dashboard_sent" });
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (err: any) {
    console.error("[Studio Telegram] Error processing update:", err.message);
    return NextResponse.json(
      { error: "Internal processing error" },
      { status: 500 }
    );
  }
}
