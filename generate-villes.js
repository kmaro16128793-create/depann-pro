const fs = require('fs');

const deptSlugs = {
  '75':'paris-75','77':'seine-et-marne-77','78':'yvelines-78',
  '91':'essonne-91','92':'hauts-de-seine-92','93':'seine-saint-denis-93',
  '94':'val-de-marne-94','95':'val-doise-95'
};
const deptNames = {
  '75':'Paris','77':'Seine-et-Marne','78':'Yvelines',
  '91':'Essonne','92':'Hauts-de-Seine','93':'Seine-Saint-Denis',
  '94':'Val-de-Marne','95':"Val-d'Oise"
};

const villes = [
  {
    slug: 'roissy-en-france', nom: 'Roissy-en-France', dep: '95', temps: '10-15', pop: 'aéroport CDG et zones logistiques',
    h1: 'Crevaison près de Roissy ?', hl: 'On arrive avant que ça empire.',
    sub: 'Zone CDG, A1, N17 — on connaît le secteur. Pneu réparé ou remplacé sur place en moins de 15 min d\'intervention. Pas de remorquage, pas d\'attente, pas de mauvaise surprise sur le prix.'
  },
  {
    slug: 'villepinte', nom: 'Villepinte', dep: '93', temps: '15-20', pop: 'parc des expositions et zones pavillonnaires',
    h1: 'Pneu à plat à Villepinte ?', hl: 'On règle ça sur place, vite.',
    sub: 'Que vous soyez près du Parc des Expositions, en zone résidentielle ou sur une artère principale — on se déplace directement à votre position. Devis gratuit par téléphone avant qu\'on parte.'
  },
  {
    slug: 'sarcelles', nom: 'Sarcelles', dep: '95', temps: '15-20', pop: 'centre-ville et quartiers résidentiels',
    h1: 'Bloqué à Sarcelles ?', hl: 'Appelez, on est là en 15-20 min.',
    sub: 'Crevaison devant chez vous, au supermarché, dans une rue — peu importe l\'endroit. On vient avec le matériel complet. Réparation sur place si possible, remplacement si nécessaire. Toujours honnête sur ce qu\'on peut faire.'
  },
  {
    slug: 'garges-les-gonesse', nom: 'Garges-lès-Gonesse', dep: '95', temps: '10-15', pop: 'quartiers résidentiels',
    h1: 'Pneu crevé à Garges ?', hl: 'On est du secteur, on arrive vite.',
    sub: 'Basé à Gonesse, à quelques minutes de Garges-lès-Gonesse. Intervention rapide dans toute la ville, 7j/7 24h/24. Un appel suffit — on vous donne le délai exact et le tarif avant de partir.'
  },
  {
    slug: 'villiers-le-bel', nom: 'Villiers-le-Bel', dep: '95', temps: '10-15', pop: 'centre-ville et zones commerciales',
    h1: 'Crevaison à Villiers-le-Bel ?', hl: 'Restez où vous êtes, on arrive.',
    sub: 'Inutile d\'appeler une dépanneuse ou de risquer de rouler à plat. On intervient directement sur place à Villiers-le-Bel — parking, domicile, bord de route. Diagnostic gratuit à l\'arrivée.'
  },
  {
    slug: 'arnouville', nom: 'Arnouville', dep: '95', temps: '10-15', pop: 'secteur résidentiel',
    h1: 'Pneu à plat à Arnouville ?', hl: '10 minutes et vous repartez.',
    sub: 'Arnouville, secteur nord du 95 — on intervient parmi les plus rapidement de toute l\'IDF dans ce secteur. Réparation ou remplacement sur place — on s\'adapte à votre situation.'
  },
  {
    slug: 'goussainville', nom: 'Goussainville', dep: '95', temps: '10-20', pop: 'zone périurbaine et industrielle',
    h1: 'Bloqué à Goussainville ?', hl: 'On prend en charge, pas de panique.',
    sub: 'Zone industrielle, résidentielle, bord de nationale — on intervient partout à Goussainville. Notre camion est équipé pour gérer tous types de pneus, véhicules légers comme utilitaires. Appelez, on gère.'
  },
  {
    slug: 'aulnay-sous-bois', nom: 'Aulnay-sous-Bois', dep: '93', temps: '20-25', pop: 'grandes artères et zones résidentielles',
    h1: 'Crevaison à Aulnay-sous-Bois ?', hl: 'On traverse pour vous en 20-25 min.',
    sub: 'Aulnay, c\'est notre zone de desserte en 93. Que ce soit sur le RN2, en zone pavillonnaire ou près des zones commerciales — on se déplace, on répare ou on remplace sur place. Pas de remorquage inutile.'
  },
  // Paris 75
  {
    slug: 'paris-13e', nom: 'Paris 13e', dep: '75', temps: '25-35', pop: 'Olympiades, Butte-aux-Cailles, gare d\'Austerlitz',
    h1: 'Pneu crevé dans le 13e ?', hl: 'On arrive dans Paris en 25-35 min.',
    sub: 'Olympiades, Butte-aux-Cailles, bords de Seine — on intervient dans tout le 13e arrondissement. Stationnement en double-file, parking, bord de voie — on s\'adapte à la réalité parisienne.'
  },
  {
    slug: 'paris-18e', nom: 'Paris 18e', dep: '75', temps: '25-35', pop: 'Montmartre, Goutte-d\'Or, Clignancourt',
    h1: 'Pneu à plat dans le 18e ?', hl: 'Montmartre, on connaît les rues.',
    sub: 'Montmartre, Goutte-d\'Or, Clignancourt — on intervient dans le 18e arrondissement 24h/24. Rues étroites, pentes, sens interdits : notre équipe connaît le terrain. On arrive, on règle, vous repartez.'
  },
  {
    slug: 'paris-20e', nom: 'Paris 20e', dep: '75', temps: '25-35', pop: 'Belleville, Ménilmontant, Père-Lachaise',
    h1: 'Crevaison dans le 20e arrondissement ?', hl: 'On intervient dans Paris 24h/24.',
    sub: 'Belleville, Ménilmontant, Nation — dépannage pneu mobile dans le 20e. Nuit, week-end, jour férié : on répond toujours. Intervention sur place sans remorquage, devis gratuit avant départ.'
  },
  {
    slug: 'vincennes', nom: 'Vincennes', dep: '94', temps: '25-30', pop: 'bords du bois de Vincennes',
    h1: 'Pneu crevé à Vincennes ?', hl: 'On est là en moins de 30 min.',
    sub: 'Vincennes, porte du bois — on intervient rapidement dans toute la ville. Domicile, parking, avenue de Paris : on vient à vous avec tout le matériel. Réparation ou remplacement, toujours honnête sur le prix.'
  },
  {
    slug: 'montreuil', nom: 'Montreuil', dep: '93', temps: '20-30', pop: 'centre-ville et zones d\'activité',
    h1: 'Pneu à plat à Montreuil ?', hl: 'On est là en 20-30 min.',
    sub: 'Montreuil, aux portes de Paris — dépannage pneu rapide 7j/7 24h/24. Que ce soit sur le boulevard ou dans les rues résidentielles, on intervient sur place. Pas besoin de bouger votre voiture.'
  },
  // Seine-et-Marne 77
  {
    slug: 'meaux', nom: 'Meaux', dep: '77', temps: '35-45', pop: 'centre historique et zones commerciales',
    h1: 'Crevaison à Meaux ?', hl: 'On couvre le 77, on arrive.',
    sub: 'Meaux, préfecture de Seine-et-Marne — intervention pneu mobile 7j/7 24h/24. Zone commerciale, rocade, centre-ville : on se déplace partout. Devis immédiat par téléphone avant qu\'on parte.'
  },
  {
    slug: 'melun', nom: 'Melun', dep: '77', temps: '40-50', pop: 'île Saint-Étienne et zones périurbaines',
    h1: 'Pneu crevé à Melun ?', hl: 'Le 77, c\'est notre zone.',
    sub: 'Melun, Dammarie-les-Lys, secteur sud — on intervient dans toute la zone 7j/7 24h/24. Voiture immobilisée sur la N6 ou dans une rue ? On arrive avec le matériel complet. Pas de surprise sur le prix.'
  },
  {
    slug: 'chelles', nom: 'Chelles', dep: '77', temps: '25-35', pop: 'zones résidentielles et pavillonnaires',
    h1: 'Pneu à plat à Chelles ?', hl: 'Intervention rapide dans le 77.',
    sub: 'Chelles, proche du 93 — on intervient rapidement. Zone pavillonnaire, bord de nationale, parking : on vient où vous êtes. Réparation ou remplacement sur place, 24h/24.'
  },
  {
    slug: 'lagny-sur-marne', nom: 'Lagny-sur-Marne', dep: '77', temps: '30-40', pop: 'bords de Marne et zones résidentielles',
    h1: 'Crevaison à Lagny-sur-Marne ?', hl: 'On se déplace dans tout le 77.',
    sub: 'Lagny-sur-Marne, Val Maubuée — dépannage pneu mobile 24h/24. Que vous soyez sur la Francilienne ou dans une rue de Lagny, on vient à vous. Devis gratuit, tarif ferme avant intervention.'
  },
  {
    slug: 'torcy', nom: 'Torcy', dep: '77', temps: '30-40', pop: 'ville nouvelle et Marne-la-Vallée',
    h1: 'Pneu crevé à Torcy ?', hl: 'Marne-la-Vallée, on arrive.',
    sub: 'Torcy, au cœur de la ville nouvelle — on intervient 7j/7 24h/24. Près de Disneyland, en zone résidentielle ou sur la N3 : on se déplace avec tout le matériel pro. Aucun frais caché.'
  },
  // Yvelines 78
  {
    slug: 'versailles', nom: 'Versailles', dep: '78', temps: '40-50', pop: 'château, centre-ville et quartiers résidentiels',
    h1: 'Pneu crevé à Versailles ?', hl: 'On traverse l\'IDF pour vous.',
    sub: 'Versailles, centre-ville ou quartiers résidentiels — dépannage pneu mobile 24h/24. Aucun endroit trop loin pour nous. Réparation sur place ou remplacement, toutes marques, devis gratuit.'
  },
  {
    slug: 'mantes-la-jolie', nom: 'Mantes-la-Jolie', dep: '78', temps: '45-55', pop: 'centre-ville et Val-de-Seine',
    h1: 'Crevaison à Mantes-la-Jolie ?', hl: 'On couvre tout le 78.',
    sub: 'Mantes-la-Jolie, secteur Seine-et-Oise — intervention pneu 7j/7 24h/24. Sur l\'A13, en ville ou dans un parking : on vient à vous avec le matériel complet. Devis immédiat, prix ferme.'
  },
  {
    slug: 'poissy', nom: 'Poissy', dep: '78', temps: '35-45', pop: 'bords de Seine et zones industrielles',
    h1: 'Pneu à plat à Poissy ?', hl: 'Intervention mobile dans les Yvelines.',
    sub: 'Poissy, bords de Seine — on intervient dans le 78 7j/7 24h/24. Zone industrielle, résidentielle ou bord de route : on arrive équipé. Réparation crevaison ou remplacement sur place.'
  },
  {
    slug: 'saint-germain-en-laye', nom: 'Saint-Germain-en-Laye', dep: '78', temps: '35-45', pop: 'forêt et centre historique',
    h1: 'Crevaison à Saint-Germain-en-Laye ?', hl: 'On arrive dans le 78.',
    sub: 'Saint-Germain-en-Laye, terrasse et forêt — dépannage pneu 24h/24 7j/7. Parking château, avenue, bord de forêt : peu importe l\'endroit, on vient vous dépanner sur place. Devis gratuit.'
  },
  {
    slug: 'rambouillet', nom: 'Rambouillet', dep: '78', temps: '50-60', pop: 'forêt de Rambouillet et centre-ville',
    h1: 'Pneu crevé à Rambouillet ?', hl: 'Jusqu\'au bout des Yvelines.',
    sub: 'Rambouillet, sud du 78 — on se déplace même loin. Pneu crevé en forêt, en ville ou sur une nationale : on arrive 24h/24 avec le matériel. Pas de remorquage, on répare sur place quand c\'est possible.'
  },
  // Essonne 91
  {
    slug: 'evry-courcouronnes', nom: 'Évry-Courcouronnes', dep: '91', temps: '35-45', pop: 'préfecture de l\'Essonne et zones commerciales',
    h1: 'Pneu crevé à Évry ?', hl: 'Intervention rapide dans le 91.',
    sub: 'Évry-Courcouronnes, préfecture de l\'Essonne — dépannage pneu 24h/24. Centre commercial, voie rapide, quartiers résidentiels : on intervient partout. Devis gratuit, tarif ferme avant départ.'
  },
  {
    slug: 'corbeil-essonnes', nom: 'Corbeil-Essonnes', dep: '91', temps: '40-50', pop: 'bords de Seine et zones industrielles',
    h1: 'Crevaison à Corbeil-Essonnes ?', hl: 'On couvre l\'Essonne entière.',
    sub: 'Corbeil-Essonnes, confluence Seine-Essonne — intervention pneu mobile 7j/7 24h/24. Zone industrielle, bord de nationale ou centre-ville : on vient à vous. Réparation ou remplacement, toutes marques.'
  },
  {
    slug: 'massy', nom: 'Massy', dep: '91', temps: '30-40', pop: 'pôle d\'affaires et zones résidentielles',
    h1: 'Pneu à plat à Massy ?', hl: 'Dépannage rapide dans le 91.',
    sub: 'Massy, pôle tertiaire du 91 — on intervient en 30-40 min 24h/24. Parking entreprise, rue résidentielle ou sortie de RER : on vient à vous équipé. Pas de stress, on gère tout sur place.'
  },
  {
    slug: 'palaiseau', nom: 'Palaiseau', dep: '91', temps: '35-45', pop: 'plateau de Saclay et zones universitaires',
    h1: 'Crevaison à Palaiseau ?', hl: 'On arrive dans l\'Essonne.',
    sub: 'Palaiseau, plateau de Saclay — dépannage pneu 24h/24. École Polytechnique, zones résidentielles, nationales : on intervient partout. Devis gratuit, montage sur place, toutes marques.'
  },
  {
    slug: 'longjumeau', nom: 'Longjumeau', dep: '91', temps: '35-45', pop: 'zones pavillonnaires et commerciales',
    h1: 'Pneu crevé à Longjumeau ?', hl: 'L\'Essonne, on la couvre.',
    sub: 'Longjumeau, sud-ouest du 91 — intervention pneu mobile 7j/7 24h/24. Zone pavillonnaire, nationale, zone commerciale : on se déplace à votre position. Réparation crevaison ou remplacement sur place.'
  },
  // Hauts-de-Seine 92
  {
    slug: 'nanterre', nom: 'Nanterre', dep: '92', temps: '25-35', pop: 'La Défense et zones résidentielles',
    h1: 'Pneu crevé à Nanterre ?', hl: 'La Défense, on intervient.',
    sub: 'Nanterre, La Défense — dépannage pneu 24h/24 dans le 92. Parking tour, voie rapide, quartier résidentiel : on arrive équipé. Intervention rapide, toutes marques, devis gratuit au téléphone.'
  },
  {
    slug: 'boulogne-billancourt', nom: 'Boulogne-Billancourt', dep: '92', temps: '30-40', pop: 'bords de Seine et quartiers d\'affaires',
    h1: 'Crevaison à Boulogne-Billancourt ?', hl: 'On traverse pour vous dans le 92.',
    sub: 'Boulogne-Billancourt — dépannage pneu mobile 24h/24. Avenue Édouard Vaillant, quais de Seine, zones résidentielles : on intervient partout. Pas de remorquage, réparation sur place si possible.'
  },
  {
    slug: 'colombes', nom: 'Colombes', dep: '92', temps: '25-35', pop: 'zones pavillonnaires et grandes artères',
    h1: 'Pneu à plat à Colombes ?', hl: 'Hauts-de-Seine, on est là.',
    sub: 'Colombes, proche Clichy et Asnières — intervention pneu 7j/7 24h/24. Grande artère, parking ou rue résidentielle : on vient à vous. Montage, réparation, équilibrage — tout sur place.'
  },
  {
    slug: 'asnieres-sur-seine', nom: 'Asnières-sur-Seine', dep: '92', temps: '25-35', pop: 'bords de Seine et centre-ville',
    h1: 'Pneu crevé à Asnières ?', hl: 'On arrive dans le 92 vite.',
    sub: 'Asnières-sur-Seine, bords de Seine — dépannage pneu 24h/24. Que vous soyez en ville ou sur une nationale, on intervient sur place. Réparation crevaison ou remplacement toutes marques, devis gratuit.'
  },
  {
    slug: 'levallois-perret', nom: 'Levallois-Perret', dep: '92', temps: '30-40', pop: 'centre d\'affaires et zones résidentielles',
    h1: 'Crevaison à Levallois-Perret ?', hl: 'On intervient dans le 92.',
    sub: 'Levallois-Perret, entre Paris et Neuilly — dépannage pneu 24h/24. Parking sous-terrain, avenue, bord de périphérique : on arrive équipé. Devis immédiat, intervention sans remorquage.'
  },
  // Seine-Saint-Denis 93
  {
    slug: 'bobigny', nom: 'Bobigny', dep: '93', temps: '20-30', pop: 'préfecture du 93 et zones d\'activité',
    h1: 'Pneu crevé à Bobigny ?', hl: 'On arrive dans le 93 sans attendre.',
    sub: 'Bobigny, préfecture du 93 — dépannage pneu 24h/24 7j/7. Rocade, centre-ville, zone industrielle : on vient à vous avec le matériel pro. Réparation ou remplacement sur place, prix ferme avant départ.'
  },
  {
    slug: 'saint-denis', nom: 'Saint-Denis', dep: '93', temps: '20-30', pop: 'Stade de France et zones urbaines',
    h1: 'Crevaison à Saint-Denis ?', hl: 'Stade de France, on connaît.',
    sub: 'Saint-Denis, aux portes de Paris — intervention pneu rapide 24h/24. Abords du Stade, rue résidentielle ou nationale : on se déplace directement à votre position. Devis gratuit, pas de surprise.'
  },
  {
    slug: 'aubervilliers', nom: 'Aubervilliers', dep: '93', temps: '20-30', pop: 'zones d\'activité et quartiers résidentiels',
    h1: 'Pneu à plat à Aubervilliers ?', hl: 'On est dans le coin en 20-30 min.',
    sub: 'Aubervilliers, proche Paris 19e — dépannage pneu 7j/7 24h/24. Zone d\'activité, bord de canal, rue résidentielle : on intervient partout. Aucun frais de déplacement caché, devis gratuit.'
  },
  // Val-de-Marne 94
  {
    slug: 'creteil', nom: 'Créteil', dep: '94', temps: '25-35', pop: 'préfecture du 94 et lac de Créteil',
    h1: 'Pneu crevé à Créteil ?', hl: 'On arrive dans le 94.',
    sub: 'Créteil, préfecture du Val-de-Marne — dépannage pneu 24h/24. Lac de Créteil, centre commercial, zone résidentielle : on intervient partout. Réparation sur place ou remplacement, toutes marques.'
  },
  {
    slug: 'vitry-sur-seine', nom: 'Vitry-sur-Seine', dep: '94', temps: '25-35', pop: 'bords de Seine et zones industrielles',
    h1: 'Crevaison à Vitry-sur-Seine ?', hl: 'Dépannage pneu 94, on arrive.',
    sub: 'Vitry-sur-Seine — intervention pneu mobile 7j/7 24h/24. Zone industrielle, nationale, quartier résidentiel : on vient à votre position avec le matériel complet. Devis gratuit, prix ferme avant départ.'
  },
  {
    slug: 'ivry-sur-seine', nom: 'Ivry-sur-Seine', dep: '94', temps: '25-35', pop: 'bords de Seine et secteur résidentiel',
    h1: 'Pneu à plat à Ivry-sur-Seine ?', hl: 'Val-de-Marne, on est là.',
    sub: 'Ivry-sur-Seine, proche Paris 13e — dépannage pneu 24h/24. Quais de Seine, avenue de Verdun, rues résidentielles : on intervient sur place. Réparation ou remplacement toutes marques, sans remorquage.'
  },
  {
    slug: 'orly', nom: 'Orly', dep: '94', temps: '30-40', pop: 'aéroport d\'Orly et zones d\'activité',
    h1: 'Crevaison près d\'Orly ?', hl: 'Aéroport Orly, on intervient.',
    sub: 'Zone aéroport d\'Orly, N7, zones d\'activité — on connaît le secteur. Dépannage pneu 24h/24, intervention rapide même en zone aéroportuaire. Réparation ou remplacement sur place, devis gratuit.'
  },
];

function page(v) {
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#07090c">
<link rel="icon" type="image/svg+xml" href="images/favicon.svg">
<title>Dépannage Pneu ${v.nom} 24h/24 ⚡ Intervention ${v.temps} min — DEPAN2PNEUS IDF</title>
<meta name="description" content="🚗 Pneu crevé à ${v.nom} ? DEPAN2PNEUS arrive en ${v.temps} min, 7j/7 24h/24. Montage, réparation, équilibrage sur place. Devis gratuit ☎ 07 61 06 96 38.">
<meta name="keywords" content="dépannage pneu ${v.nom}, pneu crevé ${v.nom}, réparation pneu ${v.nom}, montage pneu ${v.nom} domicile, dépannage pneu ${deptNames[v.dep]}, depannage pneu idf 24h">
<link rel="canonical" href="https://kmaro16128793-create.github.io/depann-pro/depannage-pneu-${v.slug}.html">
<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="DEPAN2PNEUS IDF 24H">
<meta property="og:title" content="Dépannage Pneu ${v.nom} — Intervention ${v.temps} min 24h/24 | DEPAN2PNEUS">
<meta property="og:description" content="Pneu crevé à ${v.nom} ? On arrive en ${v.temps} min, 7j/7 24h/24. Réparation ou remplacement sur place. Devis gratuit au 07 61 06 96 38.">
<meta property="og:url" content="https://kmaro16128793-create.github.io/depann-pro/depannage-pneu-${v.slug}.html">
<meta property="og:image" content="https://kmaro16128793-create.github.io/depann-pro/images/og-preview.png">
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Dépannage Pneu ${v.nom} — ${v.temps} min | DEPAN2PNEUS 24h/24">
<meta name="twitter:description" content="Pneu crevé à ${v.nom} ? On intervient en ${v.temps} min, 7j/7 24h/24. Devis gratuit.">
<meta name="twitter:image" content="https://kmaro16128793-create.github.io/depann-pro/images/og-preview.png">
<script type="application/ld+json">
[
  {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness","AutoRepair"],
    "name": "DEPAN2PNEUS IDF 24H",
    "description": "Dépannage pneu mobile à ${v.nom} — intervention en ${v.temps} min, 7j/7 24h/24. Réparation et remplacement de pneus sur place.",
    "url": "https://kmaro16128793-create.github.io/depann-pro/depannage-pneu-${v.slug}.html",
    "telephone": "+33761069638",
    "priceRange": "€€",
    "image": "https://kmaro16128793-create.github.io/depann-pro/images/og-preview.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "5bis Rue des Frères Montgolfier",
      "addressLocality": "Gonesse",
      "postalCode": "95500",
      "addressRegion": "Val-d'Oise",
      "addressCountry": "FR"
    },
    "geo": {"@type":"GeoCoordinates","latitude":"49.0000","longitude":"2.4500"},
    "areaServed": [
      {"@type":"City","name":"${v.nom}"},
      {"@type":"AdministrativeArea","name":"${deptNames[v.dep]}"},
      {"@type":"AdministrativeArea","name":"Île-de-France"}
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": ["https://kmaro16128793-create.github.io/depann-pro/"]
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type":"ListItem","position":1,"name":"Accueil","item":"https://kmaro16128793-create.github.io/depann-pro/"},
      {"@type":"ListItem","position":2,"name":"${deptNames[v.dep]}","item":"https://kmaro16128793-create.github.io/depann-pro/departement-${deptSlugs[v.dep]}.html"},
      {"@type":"ListItem","position":3,"name":"Dépannage pneu ${v.nom}","item":"https://kmaro16128793-create.github.io/depann-pro/depannage-pneu-${v.slug}.html"}
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Dépannage pneu à ${v.nom}",
    "description": "Service de dépannage pneu mobile à ${v.nom} — intervention en ${v.temps} min. Réparation crevaison, remplacement pneu, équilibrage, montage toutes marques.",
    "provider": {"@type":"LocalBusiness","name":"DEPAN2PNEUS IDF 24H"},
    "areaServed": {"@type":"City","name":"${v.nom}"},
    "availableChannel": {"@type":"ServiceChannel","servicePhone":{"@type":"ContactPoint","telephone":"+33761069638","contactType":"customer service","availableLanguage":"French"}}
  }
]
<\/script>
<style>
:root{--bg:#07090c;--cyan:#2ee9ff;--orange:#ff6b35;--txt:#e8eaf0;--txt2:rgba(232,234,240,.6);--txt3:rgba(232,234,240,.35);--border:rgba(255,255,255,.06);--f1:'Sora',sans-serif;--f2:'Inter',sans-serif}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--txt);font-family:var(--f2);line-height:1.6}
@font-face{font-family:'Inter';font-style:normal;font-weight:400;font-display:swap;src:url('fonts/inter-latin.woff2') format('woff2')}
@font-face{font-family:'Sora';font-style:normal;font-weight:300 900;font-display:swap;src:url('fonts/sora-latin.woff2') format('woff2')}
a{color:var(--cyan);text-decoration:none}

/* NAV */
nav{position:sticky;top:0;z-index:100;background:rgba(7,9,12,.92);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:.9rem clamp(1.5rem,5vw,5rem);display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}
.logo{font-family:var(--f1);font-weight:800;font-size:1.05rem;letter-spacing:-.02em}
.logo em{color:var(--cyan);font-style:normal}
.logo span{color:#fff}
.nav-btn{display:inline-flex;align-items:center;gap:.4rem;background:var(--cyan);color:#07090c;font-family:var(--f1);font-weight:700;font-size:.78rem;padding:.45rem 1.1rem;border-radius:2rem;white-space:nowrap}

/* HERO */
.hero{min-height:88vh;display:flex;align-items:center;position:relative;overflow:hidden;padding:5rem clamp(1.5rem,5vw,5rem)}
.hero::before{content:'';position:absolute;inset:0;background:url('images/hero-bg.jpg') center/cover no-repeat;opacity:.18;z-index:0}
.hero::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 30% 50%,rgba(46,233,255,.06),transparent 65%);z-index:0}
.hero-inner{position:relative;z-index:1;max-width:700px}
.badge{display:inline-flex;align-items:center;gap:.5rem;background:rgba(255,107,53,.1);border:1px solid rgba(255,107,53,.25);color:var(--orange);font-family:var(--f1);font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:.4rem 1rem;border-radius:2rem;margin-bottom:1.4rem;width:fit-content}
.dot{width:6px;height:6px;border-radius:50%;background:var(--orange);display:inline-block;animation:gpulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes gpulse{0%,100%{opacity:.45;transform:scale(1)}50%{opacity:.9;transform:scale(1.06)}}
h1{font-family:var(--f1);font-weight:900;font-size:clamp(2.2rem,5vw,4rem);letter-spacing:-.04em;line-height:1.05;margin-bottom:1.2rem}
h1 .hl{color:var(--cyan)}
.hero-sub{font-size:1.05rem;color:var(--txt2);max-width:480px;margin-bottom:2rem}
.btns{display:flex;align-items:center;gap:.9rem;flex-wrap:wrap}
.btn-call{display:inline-flex;align-items:center;gap:.5rem;background:var(--cyan);color:#07090c;font-family:var(--f1);font-weight:800;font-size:.95rem;padding:.85rem 1.9rem;border-radius:3rem;transition:transform .18s;position:relative}
.btn-call::before{content:'';position:absolute;inset:0;border-radius:inherit;box-shadow:0 0 14px rgba(46,233,255,.9),0 0 35px rgba(46,233,255,.6),0 0 65px rgba(46,233,255,.25),0 6px 22px rgba(46,233,255,.45);animation:glow-c 2.4s ease-in-out infinite;pointer-events:none}
.btn-call:hover{transform:translateY(-2px)}
@keyframes glow-c{0%,100%{opacity:.45}50%{opacity:1}}
.btn-p{display:inline-flex;align-items:center;gap:.55rem;background:linear-gradient(90deg,#4cef50,#1fd13a);color:#fff;font-family:var(--f1);font-weight:800;font-size:.95rem;padding:.8rem 1.9rem;border-radius:3rem;position:relative;transition:transform .18s}
.btn-p::before{content:'';position:absolute;inset:0;border-radius:inherit;box-shadow:0 0 14px rgba(34,197,94,.9),0 0 35px rgba(34,197,94,.6),0 0 65px rgba(34,197,94,.25),0 6px 28px rgba(31,211,58,.6);animation:glow-g 2.4s ease-in-out infinite;pointer-events:none}
.btn-p:hover{transform:translateY(-2px)}
@keyframes glow-g{0%,100%{opacity:.45}50%{opacity:1}}
.stats{display:flex;gap:2rem;margin-top:2.5rem;flex-wrap:wrap}
.stat-n{font-family:var(--f1);font-weight:900;font-size:1.8rem;color:#fff}
.stat-n span{color:var(--cyan)}
.stat-l{font-size:.78rem;color:var(--txt3);margin-top:.1rem}

/* SECTION */
.sec{padding:5rem clamp(1.5rem,5vw,5rem)}
.c{max-width:1100px;margin:0 auto}
.sec-tag{display:inline-flex;align-items:center;gap:.45rem;font-family:var(--f1);font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--cyan);margin-bottom:1rem}
.sec-h{font-family:var(--f1);font-weight:800;font-size:clamp(1.6rem,3vw,2.4rem);letter-spacing:-.04em;margin-bottom:1rem}
.sec-sub{color:var(--txt2);max-width:520px;margin-bottom:2.5rem}

/* CARDS */
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.2rem}
.card{background:rgba(255,255,255,.03);border:1px solid var(--border);border-radius:1rem;padding:1.5rem}
.card-ico{font-size:1.6rem;margin-bottom:.8rem}
.card-t{font-family:var(--f1);font-weight:700;font-size:.95rem;margin-bottom:.4rem}
.card-d{font-size:.83rem;color:var(--txt2)}

/* CTA */
.cta-sec{background:rgba(46,233,255,.03);border-top:1px solid rgba(46,233,255,.08);border-bottom:1px solid rgba(46,233,255,.08);padding:5rem clamp(1.5rem,5vw,5rem);text-align:center}
.cta-h{font-family:var(--f1);font-weight:900;font-size:clamp(1.8rem,3.5vw,3rem);letter-spacing:-.04em;margin-bottom:.8rem}
.cta-h .hl{color:var(--cyan)}
.cta-sub{color:var(--txt2);margin-bottom:2rem}
.cta-btns{display:flex;align-items:center;justify-content:center;gap:.9rem;flex-wrap:wrap}

/* FOOTER */
footer{background:var(--bg);border-top:1px solid var(--border);padding:2rem clamp(1.5rem,5vw,5rem)}
.ft{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem}
.ft-copy{font-size:.77rem;color:var(--txt3);margin-top:.3rem}
.ft-links{display:flex;gap:1.2rem;font-size:.77rem;color:var(--txt3);flex-wrap:wrap}
.ft-links a{color:var(--txt3)}
.ft-links a:hover{color:var(--txt2)}
.nav-back{padding:.8rem clamp(1.5rem,5vw,5rem);display:flex;align-items:center;gap:.65rem;flex-wrap:wrap;border-bottom:1px solid var(--border);background:linear-gradient(90deg,rgba(46,233,255,.03) 0%,transparent 60%)}
.back-btn{position:relative;display:inline-flex;align-items:center;gap:.42rem;font-family:var(--f1);font-size:.74rem;font-weight:700;padding:.44rem 1.05rem;border-radius:2rem;color:var(--txt2);transition:all .22s cubic-bezier(.4,0,.2,1);white-space:nowrap;letter-spacing:.01em;background:rgba(255,255,255,.04);isolation:isolate;overflow:hidden}
.back-btn::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1px;background:linear-gradient(135deg,rgba(255,255,255,.14) 0%,rgba(255,255,255,.03) 100%);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
.back-btn::after{content:'';position:absolute;inset:0;border-radius:inherit;background:rgba(255,255,255,0);transition:background .22s}
.back-btn:hover{color:#fff;transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.45)}
.back-btn:hover::after{background:rgba(255,255,255,.06)}
.back-home{background:rgba(46,233,255,.05);color:var(--cyan)}
.back-home::before{background:linear-gradient(135deg,rgba(46,233,255,.45) 0%,rgba(46,233,255,.08) 100%);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
.back-home:hover{background:rgba(46,233,255,.1);color:#fff;box-shadow:0 8px 28px rgba(46,233,255,.22),0 0 0 1px rgba(46,233,255,.2)}
</style>
</head>
<body>

<nav>
  <a href="index.html" class="logo"><em>DEPAN2</em><span>PNEUS</span></a>
  <a href="tel:+33761069638" class="nav-btn">
    <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l .91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    Appeler maintenant
  </a>
</nav>

<div class="nav-back">
  <a href="index.html" class="back-btn back-home">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    Accueil
  </a>
  <a href="departement-${deptSlugs[v.dep]}.html" class="back-btn">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
    ${deptNames[v.dep]}
  </a>
</div>

<section class="hero">
  <div class="hero-inner">
    <div class="badge">
      <span class="dot"></span>
      Intervention ${v.dep} · ${v.nom}
    </div>
    <h1>${v.h1}<br><span class="hl">${v.hl}</span></h1>
    <p class="hero-sub">${v.sub}</p>
    <div class="btns">
      <a href="tel:+33761069638" class="btn-call">
        <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        Appeler maintenant
      </a>
      <a href="index.html#contact" class="btn-p">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
        Écrire sur WhatsApp
      </a>
    </div>
    <div class="stats">
      <div><div class="stat-n">${v.temps}<span> min</span></div><div class="stat-l">Délai intervention</div></div>
      <div><div class="stat-n">24<span>h</span>/24</div><div class="stat-l">Disponibilité</div></div>
      <div><div class="stat-n">7<span>j</span>/7</div><div class="stat-l">Même fériés</div></div>
    </div>
  </div>
</section>

<section class="sec">
  <div class="c">
    <div class="sec-tag">Services à ${v.nom}</div>
    <h2 class="sec-h">Ce qu'on fait sur place</h2>
    <p class="sec-sub">On intervient directement dans les ${v.pop} de ${v.nom} avec notre Mercedes Sprinter équipé.</p>
    <div class="cards">
      <div class="card"><div class="card-ico">🔧</div><div class="card-t">Réparation crevaison</div><div class="card-d">Bouchage par mèche ou champignon sur le côté roulant du pneu</div></div>
      <div class="card"><div class="card-ico">🔄</div><div class="card-t">Remplacement de pneu</div><div class="card-d">Montage et équilibrage de pneus toutes marques sur place</div></div>
      <div class="card"><div class="card-ico">💨</div><div class="card-t">Valve & pression</div><div class="card-d">Remplacement de valve défaillante et gonflage précis</div></div>
      <div class="card"><div class="card-ico">🛡️</div><div class="card-t">Diagnostic gratuit</div><div class="card-d">On évalue si le pneu est réparable avant d'intervenir</div></div>
    </div>
  </div>
</section>

<section class="cta-sec">
  <div class="c">
    <h2 class="cta-h">Pneu crevé à ${v.nom} ?<br><span class="hl">On arrive en ${v.temps} min.</span></h2>
    <p class="cta-sub">On intervient directement à ${v.nom} et dans tout le secteur. 7j/7 24h/24, nuit et weekend inclus.</p>
    <div class="cta-btns">
      <a href="tel:+33761069638" class="btn-call">
        <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        Appeler maintenant
      </a>
      <a href="index.html#contact" class="btn-p">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
        Écrire sur WhatsApp
      </a>
    </div>
  </div>
</section>

<footer>
  <div class="ft">
    <div>
      <a href="index.html" class="logo"><em>DEPAN2</em><span>PNEUS</span></a>
      <div class="ft-copy">© 2026 DEPAN2PNEUS IDF 24H — Île-de-France</div>
    </div>
    <div class="ft-links">
      <a href="index.html">Accueil</a>
      <a href="index.html#services">Services</a>
      <a href="index.html#zone">Zone IDF</a>
      <a href="mentions-legales.html">Mentions légales</a>
    </div>
  </div>
</footer>

</body>
</html>`;
}

villes.forEach(v => {
  const filename = `depannage-pneu-${v.slug}.html`;
  fs.writeFileSync(`/Users/user/Desktop/depann-pro/${filename}`, page(v), 'utf8');
  console.log(`✅ ${filename}`);
});

console.log(`\n🎯 ${villes.length} pages générées.`);
