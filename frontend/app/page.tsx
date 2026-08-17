import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsSidebar from "@/components/NewsSidebar";
import AcademicSections, {
  fallbackUgLinks,
  fallbackPgLinks,
  fallbackPhdLinks,
  LinkItem,
  ApiResource,
} from "@/components/AcademicSections";
import { getApiUrl, getServerApiUrl } from "@/lib/api";
import UGGuidelines from "@/components/UGGuidelines";
import PwdInclusivity from "@/components/PwdInclusivity";
import AlumniServices from "@/components/AlumniServices";
import Scholarships from "@/components/Scholarships";
import EmergencyContacts from "@/components/EmergencyContacts";
import ExtraCurricular from "@/components/ExtraCurricular";
import CampusMap from "@/components/CampusMap";
import HeroVideo from "@/components/HeroVideo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function normalizeCategory(raw: string): "ug" | "pg" | "phd" | null {
  const cat = raw.toLowerCase().trim();
  if (cat === "ug" || cat === "undergraduate" || cat.includes("undergrad")) return "ug";
  if (cat === "pg" || cat === "postgraduate" || cat.includes("postgrad") || cat.includes("mtech") || cat.includes("ms")) return "pg";
  if (cat === "phd" || cat === "rs" || cat === "research" || cat.includes("scholar") || cat.includes("doctoral")) return "phd";
  return null;
}

async function fetchAcademicResources(): Promise<ApiResource[]> {
  let apiUrl: string;
  try {
    apiUrl = getApiUrl();
  } catch (err) {
    console.error("[AcademicResources] Configuration Error:", err);
    return [];
  }

  try {
    const res = await fetch(`${getServerApiUrl()}/academic`, { cache: "no-store" });
    if (!res.ok) {
      console.error(`[AcademicResources] API error (status: ${res.status})`);
      return [];
    }
    const json = await res.json();
    if (Array.isArray(json)) return json;
    if (json && json.success && Array.isArray(json.data)) return json.data;
    return [];
  } catch (err) {
    console.error("[AcademicResources] Failed to fetch academic resources:", err);
    return [];
  }
}

export default async function Home() {
  const apiResources = await fetchAcademicResources();

  // Group resources by normalized category key
  const grouped: Record<"ug" | "pg" | "phd", LinkItem[]> = {
    ug: [],
    pg: [],
    phd: [],
  };

  for (const r of apiResources) {
    const cat = normalizeCategory(r.category);
    if (cat) {
      grouped[cat].push({
        id: r.id,
        title: r.title,
        icon: r.icon || "fas fa-link",
        url: r.link,
        desc: r.description,
        order: r.order ?? 0,
      });
    }
  }

  const sortByOrder = (a: LinkItem, b: LinkItem) => {
    const orderDiff = (a.order ?? 0) - (b.order ?? 0);
    if (orderDiff !== 0) return orderDiff;
    return (a.id ?? 0) - (b.id ?? 0);
  };

  const ugLinks = grouped.ug.length > 0 ? grouped.ug.sort(sortByOrder) : fallbackUgLinks;
  const pgLinks = grouped.pg.length > 0 ? grouped.pg.sort(sortByOrder) : fallbackPgLinks;
  const phdLinks = grouped.phd.length > 0 ? grouped.phd.sort(sortByOrder) : fallbackPhdLinks;

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
          <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
            
            {/* Left Content Area (Resources + Map) */}
            <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
              <AcademicSections
                initialUg={ugLinks}
                initialPg={pgLinks}
                initialPhd={phdLinks}
              />

              <PwdInclusivity />

              <UGGuidelines />

              <AlumniServices />

              <Scholarships />

              <ExtraCurricular />

              <EmergencyContacts />

              <CampusMap />
            </div>

            {/* Right Sidebar Area (News) */}
            <div className="hidden md:block w-full md:w-1/3 lg:w-1/4 sticky top-44 lg:top-[190px] h-[calc(100vh-12rem)] min-h-[450px]">
              <NewsSidebar />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
