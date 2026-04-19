import { NextResponse } from 'next/server';

/* Liste de versets populaires — rotation basée sur le jour de l'année */
const VERSES = [
  { ref: 'Jean 3:16', text: 'Car Dieu a tant aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu\'il ait la vie éternelle.' },
  { ref: 'Psaume 23:1', text: 'L\'Éternel est mon berger : je ne manquerai de rien.' },
  { ref: 'Romains 8:28', text: 'Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.' },
  { ref: 'Philippiens 4:13', text: 'Je puis tout par celui qui me fortifie.' },
  { ref: 'Josué 1:9', text: 'Aie du courage et de la fermeté ! Ne sois pas effrayé et ne t\'épouvante pas, car l\'Éternel, ton Dieu, est avec toi dans tout ce que tu feras.' },
  { ref: 'Ésaïe 40:31', text: 'Mais ceux qui se confient en l\'Éternel renouvellent leur force. Ils prennent le vol comme les aigles ; ils courent, et ne se lassent point ; ils marchent, et ne se fatiguent point.' },
  { ref: 'Matthieu 6:33', text: 'Cherchez premièrement le royaume et la justice de Dieu ; et toutes ces choses vous seront données par-dessus.' },
  { ref: 'Proverbes 3:5-6', text: 'Confie-toi en l\'Éternel de tout ton cœur, et ne t\'appuie pas sur ta sagesse ; reconnais-le dans toutes tes voies, et il aplanira tes sentiers.' },
  { ref: 'Jérémie 29:11', text: 'Car je connais les projets que j\'ai formés sur vous, dit l\'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l\'espérance.' },
  { ref: '2 Corinthiens 5:7', text: 'Nous cheminons par la foi et non par la vue.' },
  { ref: 'Galates 6:9', text: 'Ne nous lassons pas de faire le bien, car nous moissonnerons au temps convenable, si nous ne nous relâchons pas.' },
  { ref: 'Psaume 46:2', text: 'Dieu est pour nous un refuge et un appui, un secours qui ne manque jamais dans la détresse.' },
  { ref: 'Romains 10:9', text: 'Si tu confesses de ta bouche le Seigneur Jésus, et si tu crois dans ton cœur que Dieu l\'a ressuscité des morts, tu seras sauvé.' },
  { ref: '1 Jean 1:9', text: 'Si nous confessons nos péchés, il est fidèle et juste pour nous les pardonner, et pour nous purifier de toute iniquité.' },
  { ref: 'Actes 1:8', text: 'Vous recevrez une puissance, le Saint-Esprit survenant sur vous, et vous serez mes témoins à Jérusalem, dans toute la Judée, dans la Samarie, et jusqu\'aux extrémités de la terre.' },
  { ref: 'Matthieu 5:8', text: 'Heureux ceux qui ont le cœur pur, car ils verront Dieu !' },
  { ref: '1 Pierre 5:7', text: 'Déchargez-vous sur lui de tous vos soucis, car lui-même prend soin de vous.' },
  { ref: 'Romains 12:2', text: 'Ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de l\'intelligence, afin que vous discerniez quelle est la volonté de Dieu, ce qui est bon, agréable et parfait.' },
  { ref: 'Ésaïe 41:10', text: 'Ne crains rien, car je suis avec toi ; ne promène pas des regards inquiets, car je suis ton Dieu ; je te fortifie, je viens à ton secours, je te soutiens de ma droite triomphante.' },
  { ref: 'Psaume 119:105', text: 'Ta parole est une lampe à mes pieds, et une lumière sur mon sentier.' },
  { ref: 'Jean 14:6', text: 'Jésus lui dit : Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.' },
  { ref: 'Hébreux 11:1', text: 'Or la foi, c\'est la substance des choses qu\'on espère, la démonstration de celles qu\'on ne voit pas.' },
  { ref: 'Matthieu 28:19-20', text: 'Allez, faites de toutes les nations des disciples... et voici, je suis avec vous tous les jours, jusqu\'à la fin du monde.' },
  { ref: 'Luc 1:37', text: 'Rien n\'est impossible à Dieu.' },
  { ref: 'Révélation 3:20', text: 'Voici, je me tiens à la porte, et je frappe. Si quelqu\'un entend ma voix et ouvre la porte, j\'entrerai chez lui, je souperai avec lui, et lui avec moi.' },
  { ref: 'Psaume 34:9', text: 'Sentez et voyez combien l\'Éternel est bon ! Heureux l\'homme qui cherche en lui son refuge !' },
  { ref: 'Ézéchiel 36:26', text: 'Je vous donnerai un cœur nouveau, et je mettrai en vous un esprit nouveau ; j\'ôterai de votre chair le cœur de pierre, et je vous donnerai un cœur de chair.' },
  { ref: 'Apocalypse 21:4', text: 'Il essuiera toute larme de leurs yeux, et la mort ne sera plus, et il n\'y aura plus ni deuil, ni cri, ni douleur, car les premières choses ont disparu.' },
  { ref: 'Philippiens 4:6-7', text: 'Ne vous inquiétez de rien ; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces. Et la paix de Dieu, qui surpasse toute intelligence, gardera vos cœurs et vos pensées en Jésus-Christ.' },
  { ref: 'Colossiens 3:16', text: 'Que la parole de Christ habite parmi vous abondamment ; instruisez-vous et exhortez-vous les uns les autres en toute sagesse, par des psaumes, des hymnes et des cantiques spirituels.' },
  { ref: '2 Timothée 3:16', text: 'Toute Écriture est inspirée de Dieu, et utile pour enseigner, pour convaincre, pour corriger, pour instruire dans la justice.' },
];

export async function GET() {
  try {
    /* Rotation : index basé sur le numéro du jour dans l'année */
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const verse = VERSES[dayOfYear % VERSES.length];

    return NextResponse.json({
      text: verse.text,
      ref: verse.ref,
      date: now.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      }
    });
  } catch {
    return NextResponse.json({ error: 'Service indisponible' }, { status: 500 });
  }
}
