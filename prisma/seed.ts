import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding base de données ÉPUC Nkoabang...');

  /* ── ANNONCES ── */
  await prisma.announcement.deleteMany();
  await prisma.announcement.createMany({
    data: [
      {
        title: 'Culte de Pentecôte — Grande Célébration',
        content: 'Nous vous invitons à notre grand culte de Pentecôte le dimanche 18 mai à 9h. Venez nombreux et amenez vos familles ! Des chorales invitées de Yaoundé seront présentes. Tenue correcte exigée.',
        isUrgent: true,
      },
      {
        title: 'Collecte Spéciale pour les Orphelins de Nkoabang',
        content: 'Notre département social organise une collecte au profit des enfants orphelins du quartier. Apportez vêtements, fournitures scolaires et vivres lors du prochain culte du dimanche.',
        isUrgent: false,
      },
      {
        title: 'Séminaire J-FIRE — Jeunesse en Feu',
        content: 'Le mouvement de jeunesse J-FIRE organise un séminaire de 3 jours sur "Vivre pour Christ à l\'université". Du vendredi 23 au dimanche 25 mai. Inscription obligatoire auprès du responsable des jeunes.',
        isUrgent: false,
      },
      {
        title: 'Camp de Prière — Montagne de la Délivrance',
        content: 'Programme de prière et de jeûne de 3 jours organisé à la retraite de Mfou. Transport en bus depuis la place Nkoabang. Contribution : 5 000 FCFA par personne (logement inclus).',
        isUrgent: false,
      },
      {
        title: 'Réunion du Conseil d\'Administration',
        content: 'Le conseil d\'administration se réunit le samedi 10 mai à 15h au local de l\'église. Présence obligatoire pour tous les anciens et diacres.',
        isUrgent: true,
      },
      {
        title: 'Renouvellement des Cartes de Membres',
        content: 'Le renouvellement annuel des cartes de membres est en cours. Présentez-vous après le culte du dimanche avec une photo d\'identité. Cotisation : 1 000 FCFA.',
        isUrgent: false,
      },
    ],
  });

  /* ── ÉVÉNEMENTS ── */
  await prisma.event.deleteMany();
  const now = new Date();
  const future = (days: number) => new Date(now.getTime() + days * 86400000);
  await prisma.event.createMany({
    data: [
      {
        title: 'Culte du Dimanche — Célébration de la Sainte Cène',
        description: 'Culte solennel avec administration de la Sainte Cène. Le pasteur Mbarga Noel prêchera sur le thème "L\'Agneau de Dieu".',
        date: future(3),
        time: '09h00 – 12h00',
        location: 'Temple ÉPUC Nkoabang, Entrée École',
      },
      {
        title: 'Séminaire Biblique — Les Actes des Apôtres',
        description: 'Étude approfondie du livre des Actes animée par l\'évangéliste Tankou Jean. Apportez votre Bible et un cahier de notes.',
        date: future(7),
        time: '17h30 – 19h30',
        location: 'Salle de réunion ÉPUC, Nkoabang',
      },
      {
        title: 'Nuit de Prière et de Louange',
        description: 'Passez la nuit en présence de l\'Éternel ! Prières d\'intercession, louanges en langues et prières de guérison. La chorale Écho Céleste mènera la louange.',
        date: future(10),
        time: '21h00 – 05h00',
        location: 'Temple ÉPUC Nkoabang',
      },
      {
        title: 'Mariage Chrétien — Famille Essomba',
        description: 'Cérémonie de mariage chrétien entre frère Essomba Christian et sœur Bello Marie-Claire. Toute l\'assemblée est invitée à partager cet heureux moment.',
        date: future(14),
        time: '10h00 – 15h00',
        location: 'Temple ÉPUC Nkoabang',
      },
      {
        title: 'Évangélisation de Rue — Carrefour Biteng',
        description: 'Sortie d\'évangélisation au carrefour de Biteng. Distribution de tracts, témoignages et prières pour les passants. Équipement de protection fourni.',
        date: future(17),
        time: '16h00 – 18h00',
        location: 'Carrefour Biteng, Nkoabang',
      },
      {
        title: 'Concert de Louange — Noël Africain',
        description: 'Grand concert de louange gospel avec des artistes locaux : Chorale Écho Céleste, Groupe Shalom Yaoundé et soliste Amina Blessing. Entrée libre.',
        date: future(21),
        time: '18h30 – 22h00',
        location: 'Place publique de Nkoabang',
      },
    ],
  });

  /* ── TÉMOIGNAGES ── */
  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Mbarga Sylvie',
        role: 'Mère de famille, Nkoabang',
        content: 'J\'ai rejoint ÉPUC Nkoabang il y a deux ans après une période très difficile. Les prières et l\'amour de la communauté m\'ont aidée à surmonter le deuil de mon mari. Gloire à Dieu !',
        rating: 5,
        isApproved: true,
      },
      {
        name: 'Essomba Patrick',
        role: 'Étudiant en génie civil, Université de Yaoundé I',
        content: 'Le groupe J-FIRE m\'a appris à prier et à étudier la Bible. J\'ai réussi mes examens de licence avec mention. C\'est le fruit de la grâce divine et des intercessions de mes frères.',
        rating: 5,
        isApproved: true,
      },
      {
        name: 'Ngono Thérèse',
        role: 'Commerçante au marché de Biteng',
        content: 'Dieu a béni mon commerce depuis que j\'ai commencé à payer ma dîme fidèlement. Ce que j\'ai vécu dans cette église, aucune parole humaine ne peut suffire à l\'exprimer.',
        rating: 5,
        isApproved: true,
      },
      {
        name: 'Bello Armand',
        role: 'Infirmier, Hôpital de Biyem-Assi',
        content: 'J\'ai été guéri d\'une maladie que les médecins ne comprenaient pas. Après trois nuits de prière ici à ÉPUC, le Seigneur a opéré le miracle. Je suis son témoin.',
        rating: 5,
        isApproved: true,
      },
      {
        name: 'Ondoa Célestine',
        role: 'Enseignante à l\'école primaire de Nkoabang',
        content: 'La chorale Écho Céleste a transformé ma vie. Chanter pour Dieu n\'est plus juste une activité — c\'est ma mission. Cette église est ma famille spirituelle.',
        rating: 5,
        isApproved: true,
      },
      {
        name: 'Nkomo Jean-Baptiste',
        role: 'Artisan menuisier',
        content: 'Le pasteur Mbarga nous enseigne avec tellement d\'amour et de profondeur. Chaque prédication est un repas spirituel. Je recommande ÉPUC Nkoabang à toute personne qui cherche Dieu.',
        rating: 5,
        isApproved: true,
      },
    ],
  });

  /* ── DÉPARTEMENTS ── */
  await prisma.department.deleteMany();
  await prisma.department.createMany({
    data: [
      {
        name: 'J-FIRE — Jeunesse en Feu',
        description: 'Mouvement de jeunesse pentecôtiste pour les 15-35 ans. Études bibliques, camps spirituels, évangélisation et formation au leadership chrétien.',
        leader: 'Frère Tankou Joel',
      },
      {
        name: 'Chorale Écho Céleste',
        description: 'Groupe de louange et d\'adoration qui mène le culte chaque dimanche. Répétitions le samedi soir. Ouvert à tous les membres avec un don musical.',
        leader: 'Sœur Ndongo Laure',
      },
      {
        name: 'Département des Femmes — Mères en Sion',
        description: 'Association des femmes de l\'église dédiée à la prière, à l\'entraide familiale et aux actions sociales pour les veuves et orphelins du quartier.',
        leader: 'Sœur Mbarga Régine',
      },
      {
        name: 'Département des Hommes — Piliers du Temple',
        description: 'Groupe des hommes de l\'église consacré à la prière, au soutien financier des projets de l\'église et à la fraternité chrétienne masculine.',
        leader: 'Frère Onana Samuel',
      },
      {
        name: 'École du Dimanche — Enfants du Roi',
        description: 'Enseignement biblique pour les enfants de 5 à 14 ans. Chaque dimanche pendant le culte des adultes. Catéchisme, mémorisation des versets et activités créatives.',
        leader: 'Sœur Nkengne Angèle',
      },
      {
        name: 'Action Sociale — Lumière de Nkoabang',
        description: 'Service humanitaire et d\'évangélisation sociale. Visites des malades, aide alimentaire, soutien scolaire pour les enfants défavorisés du quartier.',
        leader: 'Frère Ateba Clément',
      },
    ],
  });

  /* ── SERMONS ── */
  await prisma.sermon.deleteMany();
  await prisma.sermon.createMany({
    data: [
      {
        title: 'La Puissance du Nom de Jésus',
        preacher: 'Pasteur Mbarga Noel',
        date: new Date('2026-04-13'),
        description: 'Une prédication puissante sur la signification et l\'autorité du nom de Jésus dans la vie du croyant.',
        verses: 'Philippiens 2:9-11 ; Actes 4:12',
        videoUrl: null,
        downloadUrl: null,
      },
      {
        title: 'Le Saint-Esprit : Votre Consolateur',
        preacher: 'Évangéliste Tankou Jean',
        date: new Date('2026-04-06'),
        description: 'Enseignement sur le rôle du Saint-Esprit dans la vie quotidienne du chrétien baptisé.',
        verses: 'Jean 14:16-17 ; Romains 8:26',
        videoUrl: null,
        downloadUrl: null,
      },
      {
        title: 'Vivre Sainement dans un Monde Souillé',
        preacher: 'Pasteur Mbarga Noel',
        date: new Date('2026-03-30'),
        description: 'Comment maintenir une vie de sainteté et de séparation dans le contexte africain contemporain.',
        verses: '1 Pierre 1:15-16 ; Romains 12:2',
        videoUrl: null,
        downloadUrl: null,
      },
      {
        title: 'La Foi qui Déplace les Montagnes',
        preacher: 'Pasteur Mekongo Pierre',
        date: new Date('2026-03-23'),
        description: 'Étude sur les fondements de la foi biblique à partir des exemples d\'Abraham et d\'Élie.',
        verses: 'Matthieu 17:20 ; Hébreux 11:1-6',
        videoUrl: null,
        downloadUrl: null,
      },
      {
        title: 'Le Baptême au Nom de Jésus — Fondement de l\'ÉPUC',
        preacher: 'Pasteur Mbarga Noel',
        date: new Date('2026-03-16'),
        description: 'Enseignement central sur la doctrine du baptême en eau au nom de Jésus-Christ, fondement théologique de l\'Église Pentecôtiste Unie.',
        verses: 'Actes 2:38 ; Actes 8:16 ; Colossiens 2:12',
        videoUrl: null,
        downloadUrl: null,
      },
    ],
  });

  console.log('✅ Base de données remplie avec succès !');
  console.log('   - 6 annonces créées');
  console.log('   - 6 événements créés');
  console.log('   - 6 témoignages créés');
  console.log('   - 6 départements créés');
  console.log('   - 5 prédications créées');
}

main()
  .catch(e => { console.error('❌ Erreur seed:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
