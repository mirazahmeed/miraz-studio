import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { Sidebar } from "@/components/admin/Sidebar";
import { ToastProvider } from "@/components/admin/Toast";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#F5F5F3] flex flex-col md:flex-row text-[#111111]">
        {/* Admin Sidebar with active route highlighting */}
        <Sidebar sessionName={session.name} sessionEmail={session.email} />

        {/* Main Admin Content Viewport */}
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 p-6 sm:p-10 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
