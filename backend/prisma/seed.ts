import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const accounts = [
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
  ];

  for (const acc of accounts) {
    const passwordHash = await bcrypt.hash(acc.password, 10);
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
    } else {
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
      category: "Academic",
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
  ];

  const noticeCount = await prisma.notice.count();
  if (noticeCount === 0) {
    for (const notice of initialNotices) {
      await prisma.notice.create({ data: notice });
    }
    console.log('Seeded initial notices.');
  } else {
    console.log(`Database already contains ${noticeCount} notices.`);
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
