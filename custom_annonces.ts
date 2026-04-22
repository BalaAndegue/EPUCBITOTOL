import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Suppression des anciennes annonces...');
  await prisma.announcement.deleteMany();
  
  console.log('Création des nouvelles annonces...');
  await prisma.announcement.createMany({
    data: [
      {
        title: "Visite du Révérend Tony Ritter",
        content: "Ce dimanche, nous avons la chance d'accueillir notre cher missionnaire, le Révérend Tony Ritter, pour un moment de communion profonde et d'adoration puissante. 🙌 Nous vous invitons à être avec nous dès 9h30 pour venir ensemble vivre la présence de Dieu. 🌟",
        isUrgent: true,
        coverImage: "/church-2.webp"
      },
      {
        title: "Convention des Femmes à SOA",
        content: "La grande convention des femmes aura lieu à SOA cette année ! Elle commencera à partir du 27 mai environ. Toutes les sœurs de l'assemblée sont invitées à se préparer pour ce moment glorieux.",
        isUrgent: false,
        coverImage: "/church-cover.webp"
      },
      {
        title: "Notre Nouvel Autel pour la Gloire de Dieu",
        content: "Nous avons bâti un nouvel autel pour la gloire de Dieu ! L'espace a été embelli et de nouveaux instruments ont été installés pour faire monter notre louange vers l'Éternel.",
        isUrgent: false,
        coverImage: "/uploads/1776860583788-963cgu8xtlu.jpeg" // L'image uploadée avec l'autel
      }
    ]
  });
  
  console.log('✅ Nouvelles annonces ajoutées avec succès !');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
