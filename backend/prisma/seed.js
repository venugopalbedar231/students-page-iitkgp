"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();

async function main() {
    console.log('Seeding database...');
    const accounts = [
        {
            email: 'parammhta444@gmail.com',
            name: 'Param (IIT KGP Admin)',
            password: 'admin123',
        },
        {
            email: 'admin@iitkgp.ac.in',
            name: 'IIT KGP Admin',
            password: 'admin123',
        },
        {
            email: 'bedarvenugopal@gmail.com',
            name: 'Venu Gopal',
            password: 'password',
        },
        {
            email: 'nootp@gmail.com',
            name: 'No OTP',
            password: 'nootp',
        },
    ];

    for (const acc of accounts) {
        const passwordHash = await bcryptjs_1.default.hash(acc.password, 10);
        const existingAdmin = await prisma.admin.findUnique({
            where: { email: acc.email },
        });
        if (!existingAdmin) {
            await prisma.admin.create({
                data: {
                    email: acc.email,
                    name: acc.name,
                    passwordHash,
                },
            });
            console.log(`Created admin account: ${acc.email}`);
        }
        else {
            await prisma.admin.update({
                where: { email: acc.email },
                data: {
                    name: acc.name,
                    passwordHash,
                },
            });
            console.log(`Updated credentials for admin account: ${acc.email}`);
        }
    }

    // Seed Initial Notices if empty
    const initialNotices = [
        {
            title: "Nasha Mukt Bharat pledge at LBS Hall",
            date: "26 Jun 2026",
            iso: "2026-06-26",
            desc: "Students pledged to stand against substance abuse at a ceremony graced by the Dean of Student Wellbeing and the Dean of Hall Management.",
            img: "/news/nasha-mukt-bharat.jpg",
            alt: "Students and faculty holding a Nasha Mukt Bharat Abhiyaan banner at LBS Hall",
            account: "inst",
            category: "General",
        },
        {
            title: "Over 400 join the 12th International Day of Yoga",
            date: "21 Jun 2026",
            iso: "2026-06-21",
            desc: "Students, faculty, staff and residents marked #YogaForHealthyAgeing with asanas and performances by children aged 6–11, organised by TSG.",
            img: "/news/yoga-day-2026.jpg",
            alt: "Hundreds of participants seated on yoga mats across a green ground at IIT Kharagpur",
            account: "inst",
            category: "Event",
        },
        {
            title: "IIT Kharagpur secures 6th overall in NIRF 2025",
            date: "5 Sep 2025",
            iso: "2025-09-05",
            desc: "The Institute placed 5th in Engineering and Research, 4th in Innovation and 3rd in Architecture in the Ministry of Education's rankings.",
            img: "/news/nirf-2025.jpg",
            alt: "India Rankings 2025 graphic showing IIT Kharagpur's NIRF positions",
            account: "inst",
            category: "Achievement",
        },
        {
            title: "75th Foundation Day — Platinum Jubilee",
            date: "18 Aug 2025",
            iso: "2025-08-18",
            desc: "The journey that began at the Hijli Detention Camp in 1951 turned 75, marking the Platinum Jubilee of the nation's first IIT.",
            img: "/news/foundation-day-75.jpg",
            alt: "75th Foundation Day poster showing the IIT Kharagpur main building",
            account: "tsg",
            category: "Event",
        },
        {
            title: "Merit-cum-Means & Endowment Scholarships Open",
            date: "10 Aug 2025",
            iso: "2025-08-10",
            desc: "Applications are now invited for MCM, Institute Free Studentships, and various alumni-endowed scholarships for the autumn session.",
            img: "/news/nasha-mukt-bharat.jpg",
            alt: "Scholarship announcements banner",
            account: "inst",
            category: "Scholarship",
        },
        {
            title: "Inter-IIT Tech Meet Gold Medal Victory",
            date: "20 Dec 2025",
            iso: "2025-12-20",
            desc: "IIT Kharagpur students bagged the Overall Championship Trophy at the 13th Inter-IIT Tech Meet with gold medals in 4 flagship events.",
            img: "/news/nirf-2025.jpg",
            alt: "Tech Meet winners trophy celebration",
            account: "tsg",
            category: "Achievement",
        },
    ];

    const noticeCount = await prisma.notice.count();
    if (noticeCount === 0) {
        for (const notice of initialNotices) {
            await prisma.notice.create({ data: notice });
        }
        console.log('Seeded initial notices.');
    }
    else {
        console.log(`Database already contains ${noticeCount} notices.`);
    }

    // Seed Initial Academic Resources if empty
    const academicResourceCount = await prisma.academicResource.count();
    if (academicResourceCount === 0) {
        const initialResources = [
            // UG
            { category: 'ug', title: 'Curriculum', description: 'View semester-wise course structures', link: 'https://www.iitkgp.ac.in/curricula-ug', icon: 'fas fa-book', order: 1 },
            { category: 'ug', title: 'Academic Calendar', description: 'Important dates and deadlines', link: 'https://www.iitkgp.ac.in/academic-calendar-ug', icon: 'fas fa-calendar-days', order: 2 },
            { category: 'ug', title: 'UG Manual & Regulations', description: 'Official student guide & policies', link: 'https://www.iitkgp.ac.in/assets/pdf/UG_Manual.pdf', icon: 'fas fa-file-contract', order: 3 },
            { category: 'ug', title: 'ERP Portal', description: 'View the new ERP Portal', link: 'https://erp.iitkgp.ac.in', icon: 'fas fa-laptop-code', order: 4 },
            { category: 'ug', title: 'Course Registration', description: 'View semester-registration', link: 'https://erp.iitkgp.ac.in', icon: 'fas fa-pen-to-square', order: 5 },
            { category: 'ug', title: 'Examinations & Results', description: 'View examinations & results', link: 'https://erp.iitkgp.ac.in', icon: 'fas fa-clipboard-check', order: 6 },
            // PG
            { category: 'pg', title: 'M.Tech Curriculum', description: 'View M.Tech & MS curriculum', link: 'https://www.iitkgp.ac.in/curricula-pg', icon: 'fas fa-graduation-cap', order: 1 },
            { category: 'pg', title: 'Thesis Guidelines', description: 'Submission norms and formats', link: '#', icon: 'fas fa-scroll', order: 2 },
            { category: 'pg', title: 'Research Facilities', description: 'Labs and central facilities', link: 'https://www.iitkgp.ac.in/navpage/research', icon: 'fas fa-microscope', order: 3 },
            { category: 'pg', title: 'Funding Opportunities', description: 'Scholarships and assistantships', link: 'https://www.iitkgp.ac.in/scholarships', icon: 'fas fa-hand-holding-dollar', order: 4 },
            { category: 'pg', title: 'Ph.D. Admission', description: 'Admission calendar for Ph.D.', link: 'https://www.iitkgp.ac.in/phd-admission', icon: 'fas fa-user-graduate', order: 5 },
            { category: 'pg', title: 'PG Academic Calendar', description: 'Important dates and deadlines', link: '#', icon: 'fas fa-calendar-days', order: 6 },
            // PhD
            { category: 'phd', title: 'Doctoral Research Manual', description: 'View doctoral research manual', link: '#', icon: 'fas fa-book', order: 1 },
            { category: 'phd', title: 'Guide Allocation', description: 'Supervisor allocation process', link: '#', icon: 'fas fa-chalkboard-user', order: 2 },
            { category: 'phd', title: 'Progress Monitoring', description: 'Track research progress', link: '#', icon: 'fas fa-chart-line', order: 3 },
            { category: 'phd', title: 'Conference Support', description: 'Travel grants and support', link: '#', icon: 'fas fa-plane-departure', order: 4 },
            { category: 'phd', title: 'Fellowship Information', description: 'Fellowship information', link: 'https://www.iitkgp.ac.in/scholarships', icon: 'fas fa-award', order: 5 },
            { category: 'phd', title: 'Important Forms', description: 'Downloadable forms', link: '#', icon: 'fas fa-file-lines', order: 6 },
        ];
        for (const resource of initialResources) {
            await prisma.academicResource.create({ data: resource });
        }
        console.log('Seeded initial academic resources.');
    }
    else {
        console.log(`Database already contains ${academicResourceCount} academic resources.`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
