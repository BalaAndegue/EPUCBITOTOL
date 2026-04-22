import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Mise à jour des images de couverture pour les départements...');

  // Chorale
  await prisma.department.updateMany({
    where: { name: { contains: 'Chorale' } },
    data: { coverImage: '/church-3.webp' },
  });

  // Jeunes
  await prisma.department.updateMany({
    where: { name: { contains: 'Jeunesse' } },
    data: { coverImage: '/church-1.webp' },
  });

  // Femmes
  await prisma.department.updateMany({
    where: { name: { contains: 'Femmes' } },
    data: { coverImage: '/church-cover.webp' },
  });

  // Hommes
  await prisma.department.updateMany({
    where: { name: { contains: 'Hommes' } },
    data: { coverImage: '/church-2.webp' },
  });

  // Enfants (École du dimanche)
  await prisma.department.updateMany({
    where: { name: { contains: 'Dimanche' } },
    data: { coverImage: '/church-interior.jpg' },
  });

  // Action sociale
  await prisma.department.updateMany({
    where: { name: { contains: 'Sociale' } },
    data: { coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1200&auto=format&fit=crop' }, // Image de prière/social de secours
  });

  console.log('✅ Toutes les images ont été assignées avec succès !');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
