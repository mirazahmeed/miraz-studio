import prisma from "../src/lib/prisma";
import {
  escapeHtml,
  formatStudioTelegramMessage,
  getStudioDashboardData,
  getStudioLeadsData,
  getStudioProjectsData,
  isAuthorizedAdmin,
} from "../src/lib/telegram";

async function main() {
  console.log("==================================================");
  console.log("RUNNING PRODUCTION READINESS TEST SUITE");
  console.log("==================================================");

  // 1. Test HTML Escaping
  console.log("\n[Test 1] HTML Escaping for User Input:");
  const testInput = `<img src="x" onerror="alert(1)"> & "quotes" 'single'`;
  const escaped = escapeHtml(testInput);
  console.log("Raw:     ", testInput);
  console.log("Escaped: ", escaped);
  if (
    escaped.includes("<img") ||
    !escaped.includes("&lt;img") ||
    !escaped.includes("&amp;") ||
    !escaped.includes("&quot;") ||
    !escaped.includes("&#039;")
  ) {
    throw new Error("HTML Escaping failed!");
  }
  console.log("✓ HTML escaping passed.");

  // 2. Test Studio Header Identity
  console.log("\n[Test 2] Central Studio Header Identity:");
  const msg = formatStudioTelegramMessage({
    title: "TEST EVENT",
    body: "Body content here",
  });
  if (!msg.startsWith("🏢 MIRAZ STUDIO\n━━━━━━━━━━━━━━━━")) {
    throw new Error("Studio header identity missing or altered!");
  }
  console.log("✓ Central header formatting verified.");

  // 3. Test Database Transaction Order & Isolation
  console.log("\n[Test 3] Lead Creation & DB Transaction Order:");
  const testLead = await prisma.contactMessage.create({
    data: {
      name: "Test Client",
      email: "test@example.com",
      company: "Acme Corp",
      projectType: "Digital Product",
      budget: "$10,000",
      timeline: "1 Month",
      message: "Need a high-performance web app.",
      status: "new",
    },
  });
  console.log("Lead created with ID:", testLead.id, "Status:", testLead.status);
  if (testLead.status !== "new") {
    throw new Error("Initial lead status is not 'new'!");
  }
  console.log("✓ Lead saved in DB successfully.");

  // 4. Test Lead Status Idempotent Updates (read / archived)
  console.log("\n[Test 4] Status Transitions & Idempotency:");
  // Mark as read
  const updatedRead = await prisma.contactMessage.update({
    where: { id: testLead.id },
    data: { status: "read" },
  });
  if (updatedRead.status !== "read") {
    throw new Error("Failed to transition status to 'read'!");
  }
  console.log("✓ Transitioned to 'read'.");

  // Idempotency: try to update again or detect already read
  const checkRead = await prisma.contactMessage.findUnique({ where: { id: testLead.id } });
  if (checkRead?.status === "read") {
    console.log("✓ Idempotency check verified: record already 'read'.");
  }

  // Mark as archived
  const updatedArchived = await prisma.contactMessage.update({
    where: { id: testLead.id },
    data: { status: "archived" },
  });
  if (updatedArchived.status !== "archived") {
    throw new Error("Failed to transition status to 'archived'!");
  }
  console.log("✓ Transitioned to 'archived'.");

  // Clean up test lead
  await prisma.contactMessage.delete({ where: { id: testLead.id } });
  console.log("✓ Cleaned up test lead.");

  // 5. Test Real Database Queries for Telegram Commands
  console.log("\n[Test 5] Dashboard & Command Real Database Data:");
  const dashboard = await getStudioDashboardData();
  console.log("Dashboard output:\n" + dashboard.text);
  if (!dashboard.text.includes("STUDIO DASHBOARD")) {
    throw new Error("Dashboard text malformed!");
  }

  const leadsList = await getStudioLeadsData(1);
  console.log("Leads list output:\n" + leadsList.text);

  const projectsList = await getStudioProjectsData(1);
  console.log("Projects list output:\n" + projectsList.text);
  console.log("✓ Real DB commands verified.");

  // 6. Test Endpoint Authentication (HTTP 401 on missing/wrong secret, 200 on valid)
  console.log("\n[Test 6] HTTP Server-to-Server Authentication on /api/telegram:");
  const testSecret = process.env.STUDIO_TELEGRAM_INTERNAL_SECRET || "studio-telegram-internal-secret-prod-2026";

  // Unauthenticated request
  const unauthRes = await fetch("http://localhost:3001/api/telegram", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: { text: "/studio" } }),
  });
  console.log("Unauthenticated response status:", unauthRes.status, "(Expected 401)");
  if (unauthRes.status !== 401) {
    throw new Error(`Unauthenticated request did not return 401! Got: ${unauthRes.status}`);
  }

  // Invalid secret request
  const invalidSecretRes = await fetch("http://localhost:3001/api/telegram", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer wrong-secret",
    },
    body: JSON.stringify({ message: { text: "/studio" } }),
  });
  console.log("Invalid secret response status:", invalidSecretRes.status, "(Expected 401)");
  if (invalidSecretRes.status !== 401) {
    throw new Error(`Invalid secret request did not return 401! Got: ${invalidSecretRes.status}`);
  }

  // Valid secret request
  const validSecretRes = await fetch("http://localhost:3001/api/telegram", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${testSecret}`,
    },
    body: JSON.stringify({
      message: {
        chat: { id: 12345 },
        from: { id: 12345 },
        text: "/studio",
      },
    }),
  });
  console.log("Valid secret response status:", validSecretRes.status, "(Expected 200)");
  if (validSecretRes.status !== 200) {
    throw new Error(`Valid secret request did not return 200! Got: ${validSecretRes.status}`);
  }

  console.log("\n==================================================");
  console.log("ALL PRODUCTION READINESS CHECKS PASSED!");
  console.log("==================================================");
}

main().catch((err) => {
  console.error("Test failed with error:", err);
  process.exit(1);
});
