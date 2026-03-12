const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // --- 1. Departments ---
    const deptJape = await prisma.department.create({
        data: {
            name: "JAPE (Jeunesse d'Action Protestante et Évangélique)",
            description: "Le mouvement des jeunes dynamiques de l'église de Bitotol.",
            leader: "Frère Ndébi",
        },
    });

    const deptFemmes = await prisma.department.create({
        data: {
            name: "Union des Femmes Chrétiennes (UFC)",
            description: "Les mamans de l'église, intercesseuses et bâtisseuses.",
            leader: "Maman Ngo Minka",
        },
    });

    // --- 2. Events ---
    await prisma.event.create({
        data: {
            title: "Culte Dominical",
            description: "Venez adorer le Seigneur avec la chorale La Voix des Anges. Thème: La restauration au Cameroun.",
            date: new Date('2024-03-10T09:00:00Z'),
            time: "09h00",
            location: "Paroisse de Bitotol",
        },
    });

    await prisma.event.create({
        data: {
            title: "Étude Biblique JAPE",
            description: "Réunion des jeunes de la JAPE. Comment vivre sa foi à l'université et au travail.",
            date: new Date('2024-03-16T15:00:00Z'),
            time: "15h00",
            location: "Salle Polyvalente de la Paroisse",
        },
    });

    await prisma.event.create({
        data: {
            title: "Réunion des Femmes (UFC)",
            description: "Prière et partage de la parole. Thème: La femme vertueuse face aux défis actuels.",
            date: new Date('2024-03-13T16:00:00Z'),
            time: "16h00",
            location: "Paroisse de Bitotol",
        },
    });

    // --- 3. Announcements ---
    await prisma.announcement.create({
        data: {
            title: "Cotisation pour la Toiture",
            content: "Rappel à tous les fidèles concernant l'effort de construction pour la nouvelle toiture de l'église. Que le Seigneur bénisse chaque donneur.",
            isUrgent: true,
        },
    });

    await prisma.announcement.create({
        data: {
            title: "Répétitions des Chorales",
            content: "Les répétitions de la chorale principale ont lieu désormais les mercredis et vendredis à 17h.",
            isUrgent: false,
        },
    });

    // --- 4. Testimonials ---
    await prisma.testimonial.create({
        data: {
            name: "Ancien Zinga",
            role: "Ancien de l'Église",
            content: "La paroisse EPUC de Bitotol a été ma maison spirituelle depuis des années. J'y ai vu des miracles et une fraternité authentique comme on la vit chez nous au Cameroun.",
            rating: 5,
            isApproved: true,
        },
    });

    await prisma.testimonial.create({
        data: {
            name: "Sœur Mballa Josiane",
            role: "Membre de la JAPE",
            content: "Les enseignements pastoraux transforment des vies. Je remercie le Seigneur pour cette merveilleuse communauté de Bitotol.",
            rating: 5,
            isApproved: true,
        },
    });

    await prisma.testimonial.create({
        data: {
            name: "Maman Etoa",
            role: "Membre UFC",
            content: "Grâce aux prières des mamans de l'UFC, mon foyer a retrouvé la paix de Dieu. Amen !",
            rating: 4,
            isApproved: true,
        },
    });

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
