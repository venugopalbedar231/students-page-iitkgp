import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsSidebar from "@/components/NewsSidebar";
import ResourceCategory from "@/components/ResourceCategory";
import UGGuidelines from "@/components/UGGuidelines";
import Scholarships from "@/components/Scholarships";
import EmergencyContacts from "@/components/EmergencyContacts";
import ExtraCurricular from "@/components/ExtraCurricular";
import CampusMap from "@/components/CampusMap";

import HeroVideo from "@/components/HeroVideo";

const ugLinks = [
  { title: "Curriculum", icon: "fas fa-book", url: "https://www.iitkgp.ac.in/curricula-ug", desc: "View semester-wise course structures" },
  { title: "Academic Calendar", icon: "fas fa-calendar-days", url: "https://www.iitkgp.ac.in/academic-calendar-ug", desc: "Important dates and deadlines" },
  { title: "UG Manual & Regulations", icon: "fas fa-file-contract", url: "https://www.iitkgp.ac.in/assets/pdf/UG_Manual.pdf", desc: "Official student guide & policies" },
  { title: "ERP Portal", icon: "fas fa-laptop-code", url: "https://erp.iitkgp.ac.in", desc: "View the new ERP Portal" },
  { title: "Course Registration", icon: "fas fa-pen-to-square", url: "https://erp.iitkgp.ac.in", desc: "View semester-registration" },
  { title: "Examinations & Results", icon: "fas fa-clipboard-check", url: "https://erp.iitkgp.ac.in", desc: "View examinations & results" },
];

const pgLinks = [
  { title: "M.Tech Curriculum", icon: "fas fa-graduation-cap", url: "https://www.iitkgp.ac.in/curricula-pg", desc: "View M.Tech & MS curriculum" },
  { title: "Thesis Guidelines", icon: "fas fa-scroll", url: "#", desc: "Submission norms and formats" },
  { title: "Research Facilities", icon: "fas fa-microscope", url: "https://www.iitkgp.ac.in/navpage/research", desc: "Labs and central facilities" },
  { title: "Funding Opportunities", icon: "fas fa-hand-holding-dollar", url: "https://www.iitkgp.ac.in/scholarships", desc: "Scholarships and assistantships" },
  { title: "Ph.D. Admission", icon: "fas fa-user-graduate", url: "https://www.iitkgp.ac.in/phd-admission", desc: "Admission calendar for Ph.D." },
  { title: "PG Academic Calendar", icon: "fas fa-calendar-days", url: "#", desc: "Important dates and deadlines" },
];

const phdLinks = [
  { title: "Doctoral Research Manual", icon: "fas fa-book", url: "#", desc: "View doctoral research manual" },
  { title: "Guide Allocation", icon: "fas fa-chalkboard-user", url: "#", desc: "Supervisor allocation process" },
  { title: "Progress Monitoring", icon: "fas fa-chart-line", url: "#", desc: "Track research progress" },
  { title: "Conference Support", icon: "fas fa-plane-departure", url: "#", desc: "Travel grants and support" },
  { title: "Fellowship Information", icon: "fas fa-award", url: "https://www.iitkgp.ac.in/scholarships", desc: "Fellowship information" },
  { title: "Important Forms", icon: "fas fa-file-lines", url: "#", desc: "Downloadable forms" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[490px] sm:h-[560px] md:h-[680px] w-full overflow-hidden bg-slate-900">
          <HeroVideo />
          {/* Gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/25"></div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-end pb-10 sm:pb-14 md:pb-20">
            <div className="mx-auto max-w-7xl px-4 w-full">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#FF7F00] mb-3 font-inter drop-shadow">
                IIT Kharagpur · Student Portal
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-lexend drop-shadow-lg tracking-tight mb-3 md:mb-4">
                Empowering <span className="text-[#FF7F00]">Excellence</span>
              </h1>
              <p className="text-sm sm:text-base md:text-xl text-gray-200 max-w-2xl font-inter drop-shadow-md leading-relaxed">
                Your central hub for academic resources, latest announcements, and campus life.
              </p>
              <div className="w-20 h-1.5 bg-[#FF7F00] mt-5 md:mt-6 rounded-full shadow-[0_0_15px_rgba(255,127,0,0.5)]"></div>
            </div>
          </div>
        </section>

        {/* Mobile Ticker */}
        <div className="md:hidden">
          <NewsSidebar />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
            
            {/* Left Content Area (Resources + Map) */}
            <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
              <ResourceCategory title="Undergraduate (UG)" links={ugLinks} defaultOpen={true} />
              <ResourceCategory title="Postgraduate (PG)" links={pgLinks} defaultOpen={false} />
              <ResourceCategory title="Research Scholars" links={phdLinks} defaultOpen={false} />

              <UGGuidelines />

              <Scholarships />

              <ExtraCurricular />

              <EmergencyContacts />

              <CampusMap />
            </div>

            {/* Right Sidebar Area (News) */}
            <div className="hidden md:block w-full md:w-1/3 lg:w-1/4">
              <div className="h-full">
                <NewsSidebar />
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
