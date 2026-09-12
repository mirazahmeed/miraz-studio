import prisma from "@/lib/prisma";
import { Trash2, Mail } from "lucide-react";
import { deleteMessageAction } from "@/app/actions/admin";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-[#E6E6E4]">
        <h1 className="text-[26px] font-normal uppercase tracking-tight text-[#111111]">
          INBOX INQUIRIES ({messages.length})
        </h1>
        <p className="text-[13px] text-[#71717A] font-light mt-0.5">
          Prospective client briefs and communications submitted through the contact form.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="p-12 bg-white border border-[#E6E6E4] text-center space-y-3">
          <Mail className="w-8 h-8 text-[#8E8E93] mx-auto" />
          <h3 className="text-[16px] font-medium uppercase text-[#111111]">
            INBOX IS CURRENTLY EMPTY
          </h3>
          <p className="text-[13px] text-[#71717A] font-light">
            New contact form inquiries will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="p-6 sm:p-8 bg-white border border-[#E6E6E4] space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E6E6E4]">
                <div>
                  <h3 className="text-[16px] font-medium uppercase text-[#111111]">
                    {msg.name}
                  </h3>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-[12px] text-[#71717A] hover:underline font-mono"
                  >
                    {msg.email}
                  </a>
                  {msg.company && (
                    <span className="text-[12px] text-[#71717A] font-mono ml-2">
                      • {msg.company}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[11px] font-mono text-[#8E8E93]">
                    {new Date(msg.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <form
                    action={async () => {
                      "use server";
                      await deleteMessageAction(msg.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>

              {/* Meta pills */}
              <div className="flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-wider">
                {msg.projectType && (
                  <span className="px-2.5 py-1 bg-[#FAFAF9] border border-[#E6E6E4] text-[#444444]">
                    SCOPE: {msg.projectType}
                  </span>
                )}
                {msg.budget && (
                  <span className="px-2.5 py-1 bg-[#FAFAF9] border border-[#E6E6E4] text-[#444444]">
                    BUDGET: {msg.budget}
                  </span>
                )}
                {msg.timeline && (
                  <span className="px-2.5 py-1 bg-[#FAFAF9] border border-[#E6E6E4] text-[#444444]">
                    TIMELINE: {msg.timeline}
                  </span>
                )}
              </div>

              {/* Message body */}
              <div className="pt-2">
                <p className="text-[14px] text-[#333333] font-light leading-relaxed whitespace-pre-wrap">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
