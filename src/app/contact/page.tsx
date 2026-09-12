import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/contact/ContactForm";
import { getSiteSettings } from "@/lib/queries";
import { ArrowUpRight } from "lucide-react";

export const revalidate = 60;

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const email = settings["contact_email"] || "hello@miraz.studio";
  const location = settings["contact_location"] || "DHAKA / AVAILABLE GLOBALLY";
  const availability =
    settings["contact_availability"] || "ACCEPTING SELECT PROJECTS FOR Q2/Q3 2026";

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col">
      <Header studioName={settings["studio_name"] || "MIRAZ STUDIO™"} />

      <main className="flex-1 pt-32 pb-24">
        <div className="studio-container">
          {/* Header */}
          <div className="pb-10 mb-16 border-b border-[#E6E6E4]">
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#71717A] block mb-3">
              INITIATE CONTACT
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h1 className="text-[36px] sm:text-[54px] lg:text-[64px] font-normal leading-[1.08] tracking-[-0.03em] uppercase text-[#111111] max-w-3xl">
                HAVE A PROJECT IN MIND? LET&apos;S BUILD.
              </h1>
              <p className="text-[14px] text-[#555555] font-light max-w-md">
                We partner with select founders, brands, and product teams. Fill out the brief or reach out directly.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left Column: Direct Coordinates (Span 5) */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#71717A] block">
                  [ DIRECT TRANSMISSION ]
                </span>
                <a
                  href={`mailto:${email}`}
                  className="text-[24px] sm:text-[30px] font-normal tracking-tight text-[#111111] hover:text-[#71717A] transition-colors underline underline-offset-8 flex items-center gap-2"
                >
                  <span>{email}</span>
                  <ArrowUpRight className="w-5 h-5" />
                </a>
                <p className="text-[13px] text-[#555555] font-light leading-relaxed">
                  For formal RFPs, architectural inquiries, or technical consultation.
                </p>
              </div>

              <div className="space-y-3 pt-8 border-t border-[#E6E6E4]">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#71717A] block">
                  [ STUDIO AVAILABILITY ]
                </span>
                <p className="text-[14px] font-medium uppercase text-[#111111]">
                  {availability}
                </p>
                <p className="text-[13px] text-[#71717A] font-light">
                  Location: {location}
                </p>
              </div>

              <div className="space-y-3 pt-8 border-t border-[#E6E6E4]">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#71717A] block">
                  [ DIGITAL PRESENCE ]
                </span>
                <div className="flex flex-col space-y-2 text-[13px]">
                  <a
                    href="https://github.com/mirazahmed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#111111] hover:text-[#71717A] transition-colors"
                  >
                    <span>GITHUB / SOURCE CODE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/mirazahmed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#111111] hover:text-[#71717A] transition-colors"
                  >
                    <span>LINKEDIN / PROFESSIONAL NETWORK</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://x.com/mirazahmed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#111111] hover:text-[#71717A] transition-colors"
                  >
                    <span>X (TWITTER) / DISPATCHES</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form (Span 7) */}
            <div className="lg:col-span-7 bg-[#FAFAF9] p-8 sm:p-12 border border-[#E6E6E4]">
              <div className="pb-6 mb-8 border-b border-[#E6E6E4]">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#71717A] block mb-1">
                  PROJECT SPECIFICATION BRIEF
                </span>
                <h2 className="text-[20px] font-normal uppercase tracking-tight text-[#111111]">
                  SUBMIT PROJECT DETAILS
                </h2>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer
        studioName={settings["studio_name"]}
        tagline={settings["studio_tagline"]}
        email={settings["contact_email"]}
        location={settings["contact_location"]}
      />
    </div>
  );
}
