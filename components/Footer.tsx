const linkCols = [
  [
    { label: "Academic Calendar", href: "https://www.iitkgp.ac.in/academic-calendar-ug" },
    { label: "Administrative Calendar", href: "https://www.iitkgp.ac.in/assets/pdf/AdministrativeCalendar.pdf" },
    { label: "Announcements", href: "https://www.iitkgp.ac.in/iitkgp-announcements" },
    { label: "Anti-Ragging Measures", href: "https://www.iitkgp.ac.in/anti-ragging-measures" },
    { label: "Apna IIT KGP", href: "http://apna.iitkgp.ac.in" },
    { label: "Career Development Centre", href: "https://cdc.iitkgp.ac.in/" },
    { label: "Central Library", href: "https://www.iitkgp.ac.in/academics-library" },
    { label: "Communication Directory", href: "https://www.iitkgp.ac.in/assets/pdf/comdir.pdf" },
  ],
  [
    { label: "Contact Academic Section", href: "https://www.iitkgp.ac.in/academic-units" },
    { label: "Degree Verification / Transcripts", href: "https://erp.iitkgp.ac.in/DupCertReqPortal/auth/welcome.htm" },
    { label: "ERP", href: "https://erp.iitkgp.ac.in" },
    { label: "Fee Payment (passed-out)", href: "https://erp.iitkgp.ac.in/SupplierFacilities/feePaymentPageView.htm" },
    { label: "For Parents / Guardians", href: "https://erp.iitkgp.ac.in/StudentPerformanceV2/auth/login.htm" },
    { label: "Holidays", href: "https://www.iitkgp.ac.in/holidays" },
    { label: "Internal Complaints Committee", href: "https://www.iitkgp.ac.in/internal-complaints-committee" },
    { label: "KGP Directory", href: "https://www.iitkgp.ac.in/assets/pdf/IITKGPDirectory.pdf" },
  ],
  [
    { label: "IT Infrastructure Policy", href: "https://cic.iitkgp.ac.in/?q=Policies" },
    { label: "PMRF", href: "https://www.pmrf.in/" },
    { label: "Right to Information", href: "https://www.iitkgp.ac.in/right-to-information" },
    { label: "SETU", href: "https://setuatcc.iitkgp.ac.in" },
    { label: "Sustainability @ IIT KGP", href: "https://www.iitkgp.ac.in/navpage/sdsi" },
    { label: "Tenders", href: "https://www.iitkgp.ac.in/tenders" },
    { label: "Gmail for Students", href: "https://mail.google.com/" },
    { label: "Zimbra Mail", href: "https://iitkgpmail.iitkgp.ac.in/" },
  ],
];

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/IITKgp", icon: "fa-facebook-f" },
  { label: "Twitter", href: "https://twitter.com/IITKgp", icon: "fa-x-twitter" },
  { label: "LinkedIn", href: "https://www.linkedin.com/school/indian-institute-of-technology-kharagpur", icon: "fa-linkedin-in" },
  { label: "Instagram", href: "https://www.instagram.com/iit.kgp", icon: "fa-instagram" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCQCLWAILNrEVemERg4ybAYQ", icon: "fa-youtube" },
];

const bottomLinks = [
  { label: "Legal Disclaimer", href: "https://www.iitkgp.ac.in/legal-disclaimer" },
  { label: "Webmaster", href: "mailto:contact.iic@iitkgp.ac.in" },
  { label: "Sitemap", href: "https://www.iitkgp.ac.in/sitemap" },
  { label: "Google Map", href: "https://www.iitkgp.ac.in/campus-map" },
  { label: "Screen Reader Access", href: "https://www.iitkgp.ac.in/screen-reader-access" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Link columns */}
          {linkCols.map((col, i) => (
            <ul key={i} className="space-y-2.5 text-sm font-inter">
              {col.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-[#FF7F00] transition-colors no-underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          ))}

          {/* Contact column */}
          <div className="space-y-5">
            <img
              src="https://www.iitkgp.ac.in/assets/pages/images/footer-logo.png"
              alt="Indian Institute of Technology Kharagpur"
              className="h-16 w-auto brightness-0 invert opacity-90"
            />
            <div className="text-sm font-inter text-slate-400 leading-relaxed">
              <p className="m-0 font-semibold text-slate-200 font-lexend">Indian Institute of Technology Kharagpur</p>
              <p className="m-0">Kharagpur, West Bengal, India – 721302</p>
              <p className="m-0 mt-3">
                Phone: <a href="tel:913222255221" className="text-slate-300 hover:text-[#FF7F00] no-underline">+91-3222-255221</a>
              </p>
              <p className="m-0">
                Fax: <a href="tel:913222255303" className="text-slate-300 hover:text-[#FF7F00] no-underline">+91-3222-255303</a>
              </p>
            </div>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#FF7F00] hover:text-white text-slate-300 transition-colors no-underline"
                >
                  <i className={`fab ${s.icon} text-sm`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-inter">
            {bottomLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#FF7F00] transition-colors no-underline"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <p className="m-0 text-xs text-slate-500 font-inter text-center md:text-right">
            © 2026 Indian Institute of Technology Kharagpur
          </p>
        </div>
      </div>
    </footer>
  );
}
