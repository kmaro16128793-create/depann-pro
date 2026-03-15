const fs = require('fs');
const path = require('path');

const VILLES = {
  // ===== 95 — Val-d'Oise =====
  "arnouville": {
    nom: "Arnouville", cp: "95400", dept: "Val-d'Oise", deptNum: "95",
    deptPage: "departement-val-doise-95.html", deptLabel: "Val-d'Oise",
    delai: "10-15",
    localParagraph: "Arnouville est une commune résidentielle du Val-d'Oise, limitrophe de Gonesse et Garges-lès-Gonesse. Nos camions circulent en permanence dans ce secteur, ce qui garantit une prise en charge ultra-rapide. Les rues pavées du centre ancien et les abords de la gare sont des zones où les crevaisons arrivent régulièrement.",
    cards: [
      "Colmatage par mèche professionnelle ou champignon — uniquement sur la bande de roulement",
      "On monte et équilibre vos pneus neufs directement à votre adresse, toutes dimensions",
      "Changement de valve usée et ajustement de la pression au bar constructeur",
      "Inspection visuelle complète du pneu pour déterminer s'il est réparable ou à remplacer"
    ],
    faq: [
      { q: "Mon pneu a crevé près de la gare d'Arnouville, vous intervenez rapidement ?", a: "Oui, Arnouville est juste à côté de notre base de Gonesse. On est généralement sur place en 10 à 15 minutes. Garez-vous en sécurité près de la gare et appelez le 07 61 06 96 38." },
      { q: "Vous intervenez aussi dans les quartiers résidentiels d'Arnouville ?", a: "On couvre toute la commune d'Arnouville — centre-ville, quartiers pavillonnaires et zones proches de la RD317. Notre camion atelier se déplace directement chez vous." },
      { q: "Est-ce que vous avez des pneus en stock pour intervenir à Arnouville ?", a: "On transporte un stock de pneus toutes dimensions dans nos camions. Si votre taille n'est pas disponible immédiatement, on peut la récupérer rapidement depuis notre dépôt de Gonesse, à quelques minutes." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Arnouville (95400), commune résidentielle du nord de l'Île-de-France située dans le Val-d'Oise. Arnouville est desservie par la gare RER D et se trouve à proximité immédiate de la RN1 et de l'A1. Zone principalement pavillonnaire, la ville est à moins de 3 km de notre base de Gonesse. Délai d'intervention : 10 à 15 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "garges-les-gonesse": {
    nom: "Garges-lès-Gonesse", cp: "95140", dept: "Val-d'Oise", deptNum: "95",
    deptPage: "departement-val-doise-95.html", deptLabel: "Val-d'Oise",
    delai: "10-15",
    localParagraph: "Garges-lès-Gonesse se situe le long de la RN1, entre Sarcelles et Gonesse. C'est une commune à forte densité où les déplacements sont nombreux. Nos techniciens passent fréquemment par la RN1 et les rues adjacentes — on est souvent déjà dans le coin quand vous appelez.",
    cards: [
      "Réparation de crevaison par mèche ou patch champignon sur la zone de roulement",
      "Pose et équilibrage de pneus neufs toutes marques, sans bouger de chez vous",
      "Remplacement de valve défectueuse et remise à niveau de la pression",
      "Diagnostic complet avant toute intervention — on vous dit franchement si le pneu est récupérable"
    ],
    faq: [
      { q: "Vous passez souvent par la RN1 à Garges-lès-Gonesse ?", a: "Oui, la RN1 est un de nos axes de circulation quotidiens. Nos camions passent régulièrement par Garges, ce qui permet une intervention rapide, souvent en moins de 15 minutes." },
      { q: "Je suis bloqué au centre commercial de Garges, vous pouvez venir ?", a: "On intervient dans tous les parkings de Garges-lès-Gonesse, y compris les zones commerciales. Donnez-nous votre emplacement exact et on arrive." },
      { q: "Intervention possible un dimanche à Garges-lès-Gonesse ?", a: "On travaille 7 jours sur 7, dimanches et jours fériés inclus. Même tarif, même rapidité. Appelez le 07 61 06 96 38." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Garges-lès-Gonesse (95140), dans le Val-d'Oise. La ville est traversée par la RN1 et se situe entre Sarcelles et Gonesse, à proximité de l'A1 et de l'A16. Zone urbaine dense avec grands ensembles et commerces, Garges est à 5 minutes de notre base. Délai d'intervention : 10 à 15 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "gonesse": {
    nom: "Gonesse", cp: "95500", dept: "Val-d'Oise", deptNum: "95",
    deptPage: "departement-val-doise-95.html", deptLabel: "Val-d'Oise",
    delai: "5-10", isBase: true,
    localParagraph: "Gonesse, c'est chez nous. Notre base est au 5bis Rue des Frères Montgolfier. Située entre l'A1 et l'A3, à proximité de l'aéroport CDG, Gonesse est notre point de départ — le délai d'intervention ici est le plus court de toute l'IDF. Les zones d'activité autour de la gare et les quartiers résidentiels sont couverts en quelques minutes.",
    cards: [
      "Bouchage de crevaison par mèche ou champignon — intervention sur la bande de roulement uniquement",
      "Montage de pneus neufs toutes marques avec équilibrage précis, directement sur place",
      "Remplacement de valve et contrôle de pression au manomètre professionnel",
      "Vérification gratuite de l'état du pneu avant toute décision — on ne remplace que si c'est nécessaire"
    ],
    faq: [
      { q: "Pourquoi le délai est-il si court à Gonesse ?", a: "Parce qu'on est basés ici, au 5bis Rue des Frères Montgolfier. Nos camions partent de Gonesse et y reviennent. On est souvent sur place en 5 à 10 minutes." },
      { q: "Vous couvrez la zone d'activité de Gonesse près de l'A1 ?", a: "Oui, on intervient dans toutes les zones de Gonesse — zone d'activité, quartiers résidentiels, abords de la gare. La proximité de l'A1 et de l'A3 fait partie de notre périmètre quotidien." },
      { q: "Je suis en panne près de l'aéroport CDG, vous pouvez venir ?", a: "On intervient autour de CDG mais pas directement sur les pistes ou zones sécurisées. Si vous êtes sur une route accessible (hôtel, parking, zone fret), on arrive rapidement depuis Gonesse. Appelez le 07 61 06 96 38." }
    ],
    resume: "DEPAN2PNEUS IDF 24H est basé à Gonesse (95500), au 5bis Rue des Frères Montgolfier. Gonesse se situe dans le Val-d'Oise, au nord de Paris, entre l'autoroute A1 et l'A3, à proximité directe de l'aéroport Paris-CDG. Zone mixte résidentielle et d'activité, la commune est notre point de départ — le délai d'intervention le plus court d'IDF. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "goussainville": {
    nom: "Goussainville", cp: "95190", dept: "Val-d'Oise", deptNum: "95",
    deptPage: "departement-val-doise-95.html", deptLabel: "Val-d'Oise",
    delai: "10-20",
    localParagraph: "Goussainville est située au nord de Gonesse, à la lisière de la zone aéroportuaire de Roissy-CDG. La commune accueille de nombreuses entreprises de logistique et de transport. Nos camions couvrent régulièrement cet axe — entre la RD47 et les zones d'entrepôts, on connaît chaque recoin du secteur.",
    cards: [
      "Colmatage de crevaison par mèche ou champignon sur le flanc roulant du pneu",
      "Remplacement complet avec montage et équilibrage sur place, toutes dimensions disponibles",
      "Valve neuve posée en quelques minutes et pression réglée selon les préconisations constructeur",
      "Examen du pneu endommagé avant intervention — on répare uniquement si c'est fiable"
    ],
    faq: [
      { q: "Vous intervenez dans les zones logistiques de Goussainville ?", a: "Oui, on couvre toutes les zones d'activité et logistiques de Goussainville. Nos camions y circulent régulièrement vu la proximité avec Roissy-CDG et Gonesse." },
      { q: "Combien de temps pour venir à Goussainville depuis votre base ?", a: "Goussainville est à 10-20 minutes de notre base de Gonesse. Mais nos techniciens sont souvent déjà en circulation dans le secteur nord, donc ça peut être plus rapide." },
      { q: "Vous dépannez les utilitaires de livraison à Goussainville ?", a: "On prend en charge tous les véhicules légers jusqu'à 3,5 tonnes — utilitaires de livraison compris. Montage, réparation, équilibrage directement sur le parking ou le quai de chargement." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Goussainville (95190), commune du Val-d'Oise située au nord de Gonesse, à proximité de l'aéroport CDG. Desservie par la RD47 et proche de l'A1, Goussainville est une zone logistique importante avec de nombreux entrepôts. Intervention en 10 à 20 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "roissy-en-france": {
    nom: "Roissy-en-France", cp: "95700", dept: "Val-d'Oise", deptNum: "95",
    deptPage: "departement-val-doise-95.html", deptLabel: "Val-d'Oise",
    delai: "10-20",
    localParagraph: "Roissy-en-France est synonyme d'aéroport CDG — hôtels, parkings longue durée, zones de fret et loueurs de véhicules. Les allers-retours aéroport génèrent énormément de crevaisons sur les routes environnantes. Nos techniciens connaissent parfaitement le réseau routier autour de CDG et interviennent sur toutes les voies accessibles.",
    cards: [
      "Réparation de crevaison par injection de mèche ou pose de champignon sur la surface de roulement",
      "Changement de pneu complet avec équilibrage professionnel, directement sur votre lieu de panne",
      "Pose d'une valve neuve et vérification précise de la pression de gonflage",
      "Diagnostic visuel et tactile du pneu — on vous conseille honnêtement sur la marche à suivre"
    ],
    faq: [
      { q: "Je suis bloqué sur un parking d'hôtel à Roissy, vous venez ?", a: "Oui, on intervient sur tous les parkings d'hôtels autour de CDG. C'est un secteur qu'on connaît par cœur. Donnez-nous le nom de l'hôtel et on arrive en 10 à 20 minutes." },
      { q: "Vous intervenez sur les routes autour de l'aéroport CDG ?", a: "On couvre toutes les voies publiques autour de CDG — RN2, RD40, accès hôtels, zone de fret. On n'intervient pas sur les pistes ou zones sécurisées de l'aéroport, mais tout le reste est couvert." },
      { q: "Mon véhicule de location a un pneu crevé à Roissy, que faire ?", a: "Appelez-nous au 07 61 06 96 38. On intervient sur tous types de véhicules légers. Pour un véhicule de location, gardez notre facture pour la remettre au loueur." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Roissy-en-France (95700), dans le Val-d'Oise. La commune abrite l'aéroport Paris-CDG et est desservie par l'A1, l'A3 et la RN2. Zone hôtelière et de fret, le trafic y est intense 24h/24. Notre base de Gonesse est à proximité immédiate. Intervention en 10 à 20 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "sarcelles": {
    nom: "Sarcelles", cp: "95200", dept: "Val-d'Oise", deptNum: "95",
    deptPage: "departement-val-doise-95.html", deptLabel: "Val-d'Oise",
    delai: "15-20",
    localParagraph: "Sarcelles est l'une des plus grandes communes du Val-d'Oise, avec la gare RER D de Garges-Sarcelles et de nombreux axes passants. Entre le grand ensemble, le centre-ville historique et les zones commerciales, la circulation est dense. Nos techniciens passent régulièrement dans le secteur et connaissent les accès rapides.",
    cards: [
      "Crevaison traitée sur place par mèche ou champignon — réparation fiable sur la bande de roulement",
      "Pneus neufs montés et équilibrés directement chez vous ou sur votre lieu de panne",
      "Valve remplacée et pression ajustée au dixième de bar près",
      "On inspecte le pneu abîmé et on vous dit clairement : réparable ou pas"
    ],
    faq: [
      { q: "Vous couvrez le quartier des Lochères à Sarcelles ?", a: "On couvre tous les quartiers de Sarcelles — Lochères, centre-ville, Chantepie, Prairies. Nos camions accèdent partout où un véhicule peut stationner." },
      { q: "J'ai crevé près de la gare Garges-Sarcelles, vous venez en combien de temps ?", a: "La gare Garges-Sarcelles est à 15-20 minutes maximum de notre position habituelle. Nos techniciens circulent souvent dans ce secteur, le délai peut être plus court. Appelez le 07 61 06 96 38." },
      { q: "Vous intervenez sur le parking du centre commercial de Sarcelles ?", a: "Oui, on intervient dans tous les parkings — centres commerciaux, résidences, parkings souterrains accessibles. On se gare à côté de votre véhicule et on travaille sur place." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Sarcelles (95200), grande commune du Val-d'Oise au nord de Paris. Desservie par le RER D (gare Garges-Sarcelles) et proche de l'A16 et de la RN1, Sarcelles combine quartiers résidentiels denses et zones commerciales. Notre base de Gonesse est à quelques minutes. Intervention en 15 à 20 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "villiers-le-bel": {
    nom: "Villiers-le-Bel", cp: "95400", dept: "Val-d'Oise", deptNum: "95",
    deptPage: "departement-val-doise-95.html", deptLabel: "Val-d'Oise",
    delai: "10-20",
    localParagraph: "Villiers-le-Bel se trouve au nord-ouest de Gonesse, entre Sarcelles et Goussainville. La commune est traversée par la RD10 et proche de l'A1. Zones pavillonnaires, ensembles résidentiels et commerces de proximité — nos camions desservent le secteur quotidiennement.",
    cards: [
      "Mèche ou champignon posé sur la zone de roulement pour colmater la crevaison",
      "On remplace votre pneu par un neuf, monté et équilibré à votre emplacement",
      "Valve changée et pression vérifiée selon la fiche technique de votre véhicule",
      "Évaluation gratuite de l'état du pneu — on ne vous vend un pneu neuf que si le vôtre est irréparable"
    ],
    faq: [
      { q: "Vous couvrez la zone commerciale de Villiers-le-Bel ?", a: "Oui, on intervient dans toute la commune, y compris les zones commerciales le long de la RD10. Nos camions circulent régulièrement entre Villiers-le-Bel et Gonesse." },
      { q: "Quelle est la distance entre votre base et Villiers-le-Bel ?", a: "Villiers-le-Bel est à environ 5 km de notre base de Gonesse. En conditions normales de circulation, on est chez vous en 10 à 20 minutes." },
      { q: "Vous pouvez changer mes 4 pneus à Villiers-le-Bel ?", a: "Oui, on fait le montage et l'équilibrage des 4 pneus sur place. Appelez au 07 61 06 96 38 avec la dimension de vos pneus pour qu'on prépare le stock." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Villiers-le-Bel (95400), dans le Val-d'Oise. Située entre Sarcelles et Goussainville, la commune est proche de l'A1 et traversée par la RD10. Zone résidentielle et commerciale, Villiers-le-Bel est à 5 km de notre base de Gonesse. Intervention en 10 à 20 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  // ===== 93 — Seine-Saint-Denis + villes 95 rattachées =====
  "villepinte": {
    nom: "Villepinte", cp: "93420", dept: "Seine-Saint-Denis", deptNum: "93",
    deptPage: "departement-seine-saint-denis-93.html", deptLabel: "Seine-Saint-Denis",
    delai: "15-25",
    localParagraph: "Villepinte accueille le Parc des Expositions de Paris-Nord, ce qui génère un trafic intense lors des salons. Entre la zone d'activité, les quartiers résidentiels et la proximité de l'A104, les crevaisons sont courantes. Nos techniciens couvrent le secteur en continu, surtout pendant les événements au parc expo.",
    cards: [
      "Réparation de crevaison par pose de mèche ou de champignon sur la surface roulante",
      "Montage de pneus neufs toutes marques avec équilibrage, où que vous soyez à Villepinte",
      "Remplacement de valve et gonflage à la pression recommandée par le constructeur",
      "Contrôle visuel du pneu endommagé — on vous confirme s'il peut être réparé de façon sûre"
    ],
    faq: [
      { q: "Mon pneu a crevé au Parc des Expositions de Villepinte, vous intervenez ?", a: "Oui, on intervient régulièrement autour du Parc des Expositions, surtout lors des salons. Parking visiteurs, parking exposants, routes d'accès — on connaît le secteur. Appelez le 07 61 06 96 38." },
      { q: "Vous couvrez la zone d'activité de Villepinte près de l'A104 ?", a: "On couvre toute la zone d'activité de Villepinte, y compris les abords de l'A104 (Francilienne). Nos techniciens passent souvent par cet axe." },
      { q: "Combien de temps pour intervenir à Villepinte un jour de salon ?", a: "Même les jours de salon, on arrive en 15 à 25 minutes. On connaît les itinéraires alternatifs pour éviter les bouchons autour du parc expo." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Villepinte (93420), en Seine-Saint-Denis. La ville abrite le Parc des Expositions de Paris-Nord Villepinte et se situe à proximité de l'A104 (Francilienne) et de l'A3. Zone mixte résidentielle et d'activité, Villepinte est à une quinzaine de minutes de notre base. Intervention en 15 à 25 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "aulnay-sous-bois": {
    nom: "Aulnay-sous-Bois", cp: "93600", dept: "Seine-Saint-Denis", deptNum: "93",
    deptPage: "departement-seine-saint-denis-93.html", deptLabel: "Seine-Saint-Denis",
    delai: "15-25",
    localParagraph: "Aulnay-sous-Bois est un carrefour stratégique du nord-est francilien, au croisement de l'A1, l'A3 et l'A104. La ville combine zones industrielles, quartiers résidentiels et la gare RER B d'Aulnay. Le trafic dense sur ces axes provoque régulièrement des crevaisons — on est bien placés pour intervenir vite.",
    cards: [
      "Crevaison réparée par mèche ou champignon directement sur la bande de roulement",
      "Pneu neuf posé et équilibré à votre position — parking, domicile ou bord de route",
      "Changement de valve et mise à niveau de la pression de chaque pneu",
      "On vérifie d'abord si le pneu peut être sauvé — pas de remplacement inutile"
    ],
    faq: [
      { q: "Vous intervenez dans la zone industrielle d'Aulnay-sous-Bois ?", a: "Oui, on couvre toute la zone industrielle nord et sud d'Aulnay, y compris les accès depuis l'A3 et l'A104. C'est un secteur qu'on dessert quotidiennement." },
      { q: "J'ai crevé près de la gare RER d'Aulnay, vous venez en combien de temps ?", a: "La gare RER B d'Aulnay est à 15-25 minutes de notre position habituelle. Garez-vous en sécurité et appelez le 07 61 06 96 38, on arrive." },
      { q: "Vous dépannez les taxis et VTC à Aulnay-sous-Bois ?", a: "On dépanne tous les VL — taxis, VTC, voitures particulières, utilitaires. Intervention rapide pour que vous repreniez la route le plus vite possible." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Aulnay-sous-Bois (93600), en Seine-Saint-Denis. Située au croisement de l'A1, l'A3 et l'A104, la ville est un nœud routier majeur du nord-est francilien. Desservie par le RER B, Aulnay combine zones industrielles et quartiers résidentiels. Intervention en 15 à 25 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "aubervilliers": {
    nom: "Aubervilliers", cp: "93300", dept: "Seine-Saint-Denis", deptNum: "93",
    deptPage: "departement-seine-saint-denis-93.html", deptLabel: "Seine-Saint-Denis",
    delai: "20-30",
    localParagraph: "Aubervilliers se trouve aux portes de Paris, entre la Porte de la Villette et Saint-Denis. Le canal Saint-Denis, les entrepôts et les zones commerciales créent un trafic permanent. Les rues étroites du centre et les abords de l'A86 sont des zones où les pneus souffrent — nids de poule, débris, bordures.",
    cards: [
      "Pose de mèche ou champignon pour réparer la crevaison sans déplacer votre véhicule",
      "On installe vos pneus neufs avec équilibrage professionnel, directement à votre emplacement",
      "Valve défaillante remplacée et pression corrigée au bar près",
      "Expertise gratuite du pneu touché — réparation seulement si la sécurité est garantie"
    ],
    faq: [
      { q: "Vous intervenez près du canal Saint-Denis à Aubervilliers ?", a: "Oui, on couvre tout Aubervilliers — bords du canal, centre-ville, zones commerciales, entrepôts. Nos techniciens connaissent bien les accès parfois compliqués du secteur." },
      { q: "Je suis bloqué près de la Porte de la Villette côté Aubervilliers, c'est possible ?", a: "On intervient sur les voies accessibles autour des portes de Paris. Sortez du périphérique et garez-vous en sécurité, on arrive en 20 à 30 minutes." },
      { q: "Vous avez des pneus pour utilitaires à Aubervilliers ?", a: "On transporte des pneus pour véhicules légers et utilitaires jusqu'à 3,5 tonnes. Fourgons, Sprinter, Trafic, Boxer — on a les dimensions courantes en stock." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Aubervilliers (93300), en Seine-Saint-Denis, aux portes de Paris. La ville est desservie par l'A86, le canal Saint-Denis et les lignes de métro 7 et 12. Zone commerciale et d'entrepôts dense, Aubervilliers est à environ 20-30 minutes de notre base. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "bobigny": {
    nom: "Bobigny", cp: "93000", dept: "Seine-Saint-Denis", deptNum: "93",
    deptPage: "departement-seine-saint-denis-93.html", deptLabel: "Seine-Saint-Denis",
    delai: "20-30",
    localParagraph: "Bobigny est la préfecture de Seine-Saint-Denis, traversée par l'A86 et desservie par le tramway T1 et le métro 5. Le tribunal, la préfecture et le centre commercial Bobigny 2 génèrent un trafic soutenu. Nos camions empruntent régulièrement l'A86 et la RN3 — on est opérationnels rapidement dans tout le secteur.",
    cards: [
      "Mèche ou champignon pour colmater la crevaison sur la partie roulante du pneu",
      "Remplacement de pneu avec montage et équilibrage sur place — toutes marques et dimensions",
      "Valve neuve installée et pression calibrée selon votre véhicule",
      "Avant de toucher quoi que ce soit, on examine le pneu pour savoir s'il est réparable"
    ],
    faq: [
      { q: "Vous intervenez près du tribunal de Bobigny ?", a: "Oui, on couvre tout le centre administratif de Bobigny — tribunal, préfecture, mairie. Garez-vous sur un emplacement accessible et on s'occupe du reste." },
      { q: "Combien de temps pour intervenir à Bobigny depuis le nord IDF ?", a: "Nos techniciens circulent sur l'A86 et la RN3 en permanence. Depuis notre base de Gonesse, on est à Bobigny en 20 à 30 minutes selon le trafic." },
      { q: "Intervention possible la nuit à Bobigny ?", a: "On intervient 24h/24, nuits comprises. Que ce soit à 3h du matin ou à midi, on se déplace avec le même matériel et la même réactivité. Appelez le 07 61 06 96 38." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Bobigny (93000), préfecture de Seine-Saint-Denis. La ville est desservie par l'A86, la RN3, le tramway T1 et le métro 5. Centre administratif et commercial, Bobigny est situé à l'est de Paris. Intervention en 20 à 30 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "montreuil": {
    nom: "Montreuil", cp: "93100", dept: "Seine-Saint-Denis", deptNum: "93",
    deptPage: "departement-seine-saint-denis-93.html", deptLabel: "Seine-Saint-Denis",
    delai: "25-35",
    localParagraph: "Montreuil est la commune la plus peuplée de Seine-Saint-Denis, collée au 20e arrondissement de Paris. Le quartier de la Croix de Chavaux, le Haut-Montreuil et les rues pavées du Bas-Montreuil concentrent beaucoup de crevaisons. Rues étroites, pavés anciens, chantiers de construction — les pneus sont mis à rude épreuve.",
    cards: [
      "Crevaison colmatée par mèche professionnelle ou champignon sur le côté roulant",
      "Pneu neuf toutes marques monté et équilibré sans que vous ayez à bouger",
      "On change la valve et on recalibre la pression à la valeur constructeur",
      "Examen préalable du pneu — on ne fait que ce qui est nécessaire, rien de plus"
    ],
    faq: [
      { q: "Les rues pavées du Bas-Montreuil abîment souvent mes pneus, vous intervenez vite ?", a: "On connaît bien le Bas-Montreuil et ses pavés. On intervient en 25 à 35 minutes dans tout Montreuil. Appelez le 07 61 06 96 38 dès que vous constatez la crevaison." },
      { q: "Vous venez aussi au Haut-Montreuil et vers Vincennes ?", a: "On couvre toute la commune — Bas-Montreuil, Haut-Montreuil, Croix de Chavaux, et les zones limitrophes de Vincennes et du 20e arrondissement." },
      { q: "Mon pneu est crevé devant chez moi à Montreuil, c'est plus cher en soirée ?", a: "Le tarif reste entre 80€ et 150€ selon le type de pneu. On applique des tarifs honnêtes, de jour comme de nuit. Appelez pour un devis gratuit." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Montreuil (93100), en Seine-Saint-Denis, limitrophe de Paris 20e et de Vincennes. Desservie par le métro 9, la ville est la plus peuplée du 93 avec des quartiers très denses. Rues pavées, chantiers et circulation intense rendent les crevaisons fréquentes. Intervention en 25 à 35 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "saint-denis": {
    nom: "Saint-Denis", cp: "93200", dept: "Seine-Saint-Denis", deptNum: "93",
    deptPage: "departement-seine-saint-denis-93.html", deptLabel: "Seine-Saint-Denis",
    delai: "15-25",
    localParagraph: "Saint-Denis, c'est le Stade de France, la Basilique, et un trafic monstre les jours de match ou de concert. L'A1, l'A86 et le RER D/B convergent ici. Nos camions passent par Saint-Denis plusieurs fois par jour en allant vers Paris — on est souvent déjà dans le coin quand vous appelez.",
    cards: [
      "Réparation par mèche ou patch champignon — intervention ciblée sur la bande de roulement",
      "Montage et équilibrage de pneus toutes dimensions directement à votre position",
      "Valve défectueuse remplacée en quelques minutes, pression réajustée au bar près",
      "On diagnostique le pneu gratuitement et on vous donne notre avis franc avant d'agir"
    ],
    faq: [
      { q: "Mon pneu a crevé près du Stade de France, vous venez même un jour de match ?", a: "Oui, on connaît les accès autour du Stade de France. Les jours de match, on utilise les itinéraires secondaires pour éviter les fermetures de route. Appelez le 07 61 06 96 38." },
      { q: "Vous couvrez le centre-ville de Saint-Denis et la zone du marché ?", a: "On couvre tout Saint-Denis — centre-ville, marché, quartier de la Basilique, zone du Stade de France, Pleyel, Franc-Moisin. Aucune restriction de quartier." },
      { q: "Je suis en VTC et j'ai crevé à Saint-Denis, intervention rapide possible ?", a: "On sait que chaque minute compte pour un VTC. Saint-Denis est à 15-25 minutes de notre base, et nos techniciens sont souvent déjà en route dans le secteur. Intervention prioritaire." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Saint-Denis (93200), en Seine-Saint-Denis. Ville du Stade de France et de la Basilique, Saint-Denis est desservie par l'A1, l'A86, le RER B et D, et le métro 13. Axe de passage quotidien pour nos camions entre Gonesse et Paris. Intervention en 15 à 25 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  // ===== 92 — Hauts-de-Seine =====
  "asnieres-sur-seine": {
    nom: "Asnières-sur-Seine", cp: "92600", dept: "Hauts-de-Seine", deptNum: "92",
    deptPage: "departement-hauts-de-seine-92.html", deptLabel: "Hauts-de-Seine",
    delai: "25-35",
    localParagraph: "Asnières-sur-Seine est une ville dense du nord des Hauts-de-Seine, coincée entre Clichy, Gennevilliers et Bois-Colombes. Les quais de Seine, le pont de Clichy et les rues commerçantes du centre génèrent un trafic permanent. Les bordures de trottoir et les travaux fréquents rendent les crevaisons courantes dans ce secteur.",
    cards: [
      "Mèche ou champignon posé pour réparer la crevaison directement à votre emplacement",
      "Pneu neuf monté et équilibré sur place — toutes marques, sans déplacement de votre part",
      "On remplace la valve et on ajuste la pression selon les specs de votre véhicule",
      "Avant toute intervention, on contrôle le pneu et on vous dit si la réparation est viable"
    ],
    faq: [
      { q: "Vous intervenez sur les quais de Seine à Asnières ?", a: "Oui, on couvre les quais et tout le reste d'Asnières — centre-ville, quartier des Grésillons, bords de Seine. On se déplace partout où votre véhicule est garé." },
      { q: "Combien de temps depuis Gonesse pour arriver à Asnières ?", a: "Asnières est à 25-35 minutes de notre base, mais nos techniciens sont souvent déjà en circulation dans le nord-ouest parisien. Le délai réel peut être plus court." },
      { q: "Vous intervenez la nuit dans les rues résidentielles d'Asnières ?", a: "On intervient 24h/24 dans toutes les rues d'Asnières. La nuit, la circulation est fluide, donc on arrive souvent plus vite. Appelez le 07 61 06 96 38." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Asnières-sur-Seine (92600), dans les Hauts-de-Seine. Située au nord-ouest de Paris, la ville est desservie par le RER C, les lignes Transilien L/J et proche de l'A86. Zone résidentielle dense avec commerces, Asnières est accessible par le pont de Clichy et les quais de Seine. Intervention en 25 à 35 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "boulogne-billancourt": {
    nom: "Boulogne-Billancourt", cp: "92100", dept: "Hauts-de-Seine", deptNum: "92",
    deptPage: "departement-hauts-de-seine-92.html", deptLabel: "Hauts-de-Seine",
    delai: "30-40",
    localParagraph: "Boulogne-Billancourt est la commune la plus peuplée des Hauts-de-Seine. Entre l'Île Seguin, le Trapèze, les abords de Roland-Garros et les rues commerçantes du centre, le stationnement est un cauchemar et les accrochages de trottoir sont quotidiens. Nos techniciens interviennent sur place pour éviter la galère du remorquage.",
    cards: [
      "Crevaison traitée par mèche ou champignon, sans bouger votre véhicule de sa place",
      "Changement de pneu complet avec équilibrage — on amène le pneu neuf directement chez vous",
      "Valve usée remplacée et pression de gonflage vérifiée sur les 4 roues",
      "Diagnostic honnête : on répare si c'est possible, on remplace uniquement si nécessaire"
    ],
    faq: [
      { q: "Vous venez dans le quartier du Trapèze à Boulogne ?", a: "Oui, on couvre le Trapèze, l'Île Seguin, le centre-ville et tous les quartiers de Boulogne-Billancourt. Même dans les rues étroites, notre camion atelier se faufile." },
      { q: "Mon pneu a touché un trottoir près de Roland-Garros, vous réparez ?", a: "On vérifie d'abord si le flanc est endommagé. Un choc de trottoir peut abîmer le flanc (non réparable) ou juste la bande de roulement (réparable). On vous dit tout sur place." },
      { q: "Vous intervenez le weekend à Boulogne-Billancourt ?", a: "7 jours sur 7, weekends et fériés inclus. On intervient à Boulogne-Billancourt en 30 à 40 minutes. Appelez le 07 61 06 96 38." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Boulogne-Billancourt (92100), dans les Hauts-de-Seine. Plus grande ville du département, limitrophe de Paris 16e, elle est desservie par le métro 9 et 10. Entre le Trapèze, l'Île Seguin et les abords de Roland-Garros, la circulation y est dense. Intervention en 30 à 40 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "colombes": {
    nom: "Colombes", cp: "92700", dept: "Hauts-de-Seine", deptNum: "92",
    deptPage: "departement-hauts-de-seine-92.html", deptLabel: "Hauts-de-Seine",
    delai: "25-35",
    localParagraph: "Colombes est une grande commune du nord des Hauts-de-Seine, proche de l'A86 et de Nanterre. Le stade Yves-du-Manoir, les bords de Seine et les zones résidentielles attirent beaucoup de circulation. Les nids de poule et les travaux d'aménagement rendent les pneus vulnérables — on connaît les points chauds du secteur.",
    cards: [
      "Réparation par injection de mèche ou champignon sur la surface de roulement du pneu",
      "On vient avec le pneu neuf et on fait le montage-équilibrage directement sur votre parking",
      "Valve remplacée en quelques minutes et gonflage au bar constructeur",
      "Inspection du pneu avant intervention — pas de travail superflu, juste ce qu'il faut"
    ],
    faq: [
      { q: "Vous intervenez près du stade Yves-du-Manoir à Colombes ?", a: "Oui, on couvre tout Colombes — stade, centre-ville, bords de Seine, quartier des Vallées. On accède à tous les secteurs de la commune." },
      { q: "Un de mes pneus est à plat depuis ce matin à Colombes, c'est trop tard pour réparer ?", a: "Rouler à plat abîme le pneu, mais on peut souvent encore le sauver si les dégâts sont limités à la bande de roulement. On vérifie sur place et on vous dit franchement." },
      { q: "Vous avez des pneus 4 saisons en stock pour Colombes ?", a: "On transporte les dimensions les plus courantes, y compris des pneus 4 saisons. Précisez votre taille au téléphone (07 61 06 96 38) et on confirme la disponibilité avant de venir." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Colombes (92700), dans les Hauts-de-Seine. La ville est desservie par le Transilien J/L, proche de l'A86 et de Nanterre. Colombes combine quartiers résidentiels, bords de Seine et le stade Yves-du-Manoir. Intervention en 25 à 35 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "levallois-perret": {
    nom: "Levallois-Perret", cp: "92300", dept: "Hauts-de-Seine", deptNum: "92",
    deptPage: "departement-hauts-de-seine-92.html", deptLabel: "Hauts-de-Seine",
    delai: "25-35",
    localParagraph: "Levallois-Perret est l'une des villes les plus denses d'Europe — peu de parking, beaucoup de circulation, et des manœuvres serrées qui mettent les pneus à rude épreuve. Entre la place Louise Michel, les rues commerçantes et les sièges sociaux d'entreprises, on intervient dans un contexte urbain tendu mais qu'on maîtrise.",
    cards: [
      "On colmate la crevaison par mèche ou champignon sans déplacer votre véhicule",
      "Montage de pneu neuf et équilibrage professionnel, toutes marques, à votre place de parking",
      "Changement de valve et ajustement de pression — on contrôle les 4 roues",
      "Diagnostic avant action — on vous dit la vérité sur l'état de votre pneu"
    ],
    faq: [
      { q: "Je suis garé en double file à Levallois avec un pneu crevé, vous pouvez intervenir vite ?", a: "On connaît la difficulté du stationnement à Levallois. On arrive en 25-35 minutes et on travaille rapidement pour ne pas bloquer la circulation. Appelez le 07 61 06 96 38." },
      { q: "Vous intervenez en parking souterrain à Levallois-Perret ?", a: "Oui, on accède aux parkings souterrains tant que la hauteur le permet pour notre camion. On a aussi du matériel portatif pour les cas où le camion ne passe pas." },
      { q: "Intervention le soir après le travail à Levallois, c'est possible ?", a: "On travaille 24h/24. Le soir, la circulation est plus fluide à Levallois, on arrive souvent plus vite que prévu. Même tarif qu'en journée." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Levallois-Perret (92300), dans les Hauts-de-Seine. Ville ultra-dense limitrophe de Paris 17e, desservie par le métro 3 (Louise Michel, Anatole France). Stationnement rare et rues étroites — les dégâts de pneu y sont fréquents. Intervention en 25 à 35 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "nanterre": {
    nom: "Nanterre", cp: "92000", dept: "Hauts-de-Seine", deptNum: "92",
    deptPage: "departement-hauts-de-seine-92.html", deptLabel: "Hauts-de-Seine",
    delai: "25-35",
    localParagraph: "Nanterre, c'est La Défense, la préfecture des Hauts-de-Seine, l'université Paris-Nanterre et un réseau routier dense entre l'A86 et l'A14. La circulation y est intense du matin au soir. Nos techniciens empruntent régulièrement ces axes et connaissent les accès aux parkings du quartier d'affaires.",
    cards: [
      "Pose de mèche ou de champignon pour stopper la crevaison — travail sur la bande de roulement",
      "Pneu neuf livré et monté à votre emplacement avec équilibrage professionnel",
      "Valve changée et pression contrôlée sur chaque roue au manomètre",
      "Inspection complète du pneu endommagé — on ne remplace que ce qui doit l'être"
    ],
    faq: [
      { q: "Vous intervenez dans le quartier de La Défense à Nanterre ?", a: "On couvre La Défense et ses parkings accessibles. Pour les parkings de tours avec restrictions d'accès, on s'adapte avec notre matériel portatif. Appelez le 07 61 06 96 38." },
      { q: "Mon pneu a crevé sur le campus de l'université Paris-Nanterre, vous venez ?", a: "Oui, on intervient sur le campus et dans tous les quartiers de Nanterre — Préfecture, centre-ville, Mont-Valérien, Petit-Nanterre." },
      { q: "C'est plus long d'intervenir à Nanterre aux heures de pointe ?", a: "Les heures de pointe sur l'A86/A14 peuvent rallonger le trajet. On adapte notre itinéraire en temps réel. Comptez 25 à 35 minutes en moyenne, parfois moins." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Nanterre (92000), préfecture des Hauts-de-Seine. La ville abrite le quartier de La Défense, l'université Paris-Nanterre et le Mont-Valérien. Desservie par l'A86, l'A14 et le RER A, c'est un nœud de circulation majeur de l'ouest parisien. Intervention en 25 à 35 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  // ===== 75 — Paris + Vincennes =====
  "paris-13e": {
    nom: "Paris 13e", cp: "75013", dept: "Paris", deptNum: "75",
    deptPage: "departement-paris-75.html", deptLabel: "Paris",
    delai: "30-40",
    localParagraph: "Le 13e arrondissement de Paris s'étend de la Bibliothèque François-Mitterrand au quartier asiatique, en passant par la Butte-aux-Cailles et les Olympiades. Le boulevard périphérique sud, les quais de Seine et les rues du quartier chinois connaissent un trafic dense. Les pavés de la Butte-aux-Cailles et les nids de poule des abords du périph' sont propices aux crevaisons.",
    cards: [
      "Colmatage de la crevaison par mèche ou champignon — sans remorquer votre véhicule",
      "Remplacement de pneu toutes marques avec montage et équilibrage sur votre lieu de panne",
      "Valve neuve posée et pression vérifiée au manomètre professionnel",
      "On examine le pneu avant d'agir — réparation uniquement si c'est sûr et durable"
    ],
    faq: [
      { q: "Mon pneu a crevé près de la BnF dans le 13e, vous intervenez ?", a: "Oui, on couvre tout le 13e arrondissement — BnF, Austerlitz, Tolbiac, quartier asiatique, Butte-aux-Cailles. Garez-vous en sécurité et appelez le 07 61 06 96 38." },
      { q: "Vous intervenez sur les quais de Seine dans le 13e arrondissement ?", a: "On intervient sur les quais et toutes les voies accessibles du 13e. Les quais rive gauche sont un endroit où on vient régulièrement." },
      { q: "C'est quoi le délai pour le 13e arrondissement depuis le nord IDF ?", a: "Nos camions rejoignent le 13e en 30 à 40 minutes via l'A1 puis le périphérique. La nuit, c'est souvent plus rapide grâce à la circulation fluide." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient dans le 13e arrondissement de Paris (75013), au sud-est de la capitale. Le 13e abrite la BnF François-Mitterrand, le quartier asiatique (avenue d'Ivry/avenue de Choisy), la Butte-aux-Cailles et les Olympiades. Desservi par les métros 5, 6, 7, 14 et le RER C, il longe le périphérique sud et les quais de Seine. Intervention en 30 à 40 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "paris-18e": {
    nom: "Paris 18e", cp: "75018", dept: "Paris", deptNum: "75",
    deptPage: "departement-paris-75.html", deptLabel: "Paris",
    delai: "25-35",
    localParagraph: "Le 18e arrondissement, c'est Montmartre, Barbès, la Goutte d'Or et la Porte de Clignancourt. Les rues pentues de la Butte Montmartre, les abords de la gare du Nord et les marchés de Barbès créent un environnement où les pneus souffrent. Pavés, pentes raides, double file — on gère tout ça au quotidien.",
    cards: [
      "Réparation par mèche ou champignon directement sur la bande de roulement, sans remorquage",
      "On apporte le pneu neuf et on le monte avec équilibrage à votre emplacement",
      "Valve remplacée et pression recalibrée au dixième près",
      "Vérification préalable du pneu — on ne fait rien d'inutile, on vous dit ce qu'il en est"
    ],
    faq: [
      { q: "Mon pneu a crevé dans une rue en pente à Montmartre, vous montez ?", a: "On accède à toutes les rues praticables du 18e, y compris les pentes de Montmartre. Si la rue est trop étroite pour le camion, on vient avec le matériel portatif." },
      { q: "Vous intervenez près de la gare du Nord côté 18e ?", a: "Oui, on couvre les abords de la gare du Nord — côté 18e comme côté 10e. C'est un secteur qu'on connaît bien. Appelez le 07 61 06 96 38." },
      { q: "Les pneus crevés à cause des pavés, c'est fréquent dans le 18e ?", a: "Les pavés et les nids de poule du 18e provoquent effectivement beaucoup de crevaisons. On intervient quotidiennement dans le quartier pour ce type de problème." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient dans le 18e arrondissement de Paris (75018), au nord de la capitale. Le 18e comprend Montmartre, Barbès, la Goutte d'Or, la Chapelle et la Porte de Clignancourt. Desservi par les métros 2, 4, 12, 13 et les gares du Nord/de l'Est toutes proches. Depuis notre base du Val-d'Oise, le 18e est le premier arrondissement sur notre route. Intervention en 25 à 35 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "paris-20e": {
    nom: "Paris 20e", cp: "75020", dept: "Paris", deptNum: "75",
    deptPage: "departement-paris-75.html", deptLabel: "Paris",
    delai: "25-35",
    localParagraph: "Le 20e arrondissement — Belleville, Ménilmontant, Gambetta, Père-Lachaise. Un arrondissement populaire avec des rues en pente, des pavés et un trafic dense autour de la Place Gambetta et du boulevard périphérique est. Les chantiers de rénovation urbaine et les rues pavées de Belleville sont des zones à risque pour les pneus.",
    cards: [
      "Mèche ou champignon pour colmater la crevaison sur place, sans déplacer le véhicule",
      "On vous livre le pneu neuf et on fait le montage-équilibrage à votre position",
      "Changement de valve défaillante et réglage de la pression de gonflage",
      "Diagnostic transparent — on vous explique l'état du pneu et les options avant d'intervenir"
    ],
    faq: [
      { q: "Vous intervenez dans le quartier de Belleville, Paris 20e ?", a: "Oui, on couvre tout le 20e — Belleville, Ménilmontant, Gambetta, Jourdain, Pelleport, Père-Lachaise. On s'adapte aux rues en pente et aux espaces restreints." },
      { q: "Mon pneu a crevé près du Père-Lachaise, vous venez en combien de temps ?", a: "Le 20e arrondissement est accessible en 25 à 35 minutes depuis notre base. Le secteur Père-Lachaise est bien desservi, on connaît les accès." },
      { q: "Intervention en soirée dans le 20e arrondissement, c'est possible ?", a: "On travaille 24h/24. Le soir, les rues du 20e sont plus dégagées et on arrive souvent en moins de 25 minutes. Appelez le 07 61 06 96 38." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient dans le 20e arrondissement de Paris (75020), à l'est de la capitale. Le 20e comprend Belleville, Ménilmontant, Gambetta et le cimetière du Père-Lachaise. Desservi par les métros 2, 3, 3bis, 9 et 11, il borde le périphérique est. Quartier en pente avec rues pavées, les crevaisons y sont fréquentes. Intervention en 25 à 35 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "vincennes": {
    nom: "Vincennes", cp: "94300", dept: "Val-de-Marne", deptNum: "94",
    deptPage: "departement-val-de-marne-94.html", deptLabel: "Val-de-Marne",
    delai: "25-35",
    localParagraph: "Vincennes se distingue par son château, le Bois de Vincennes et la proximité immédiate de Paris 12e. Les allées du bois, les abords du château et les rues commerçantes du centre-ville voient passer énormément de véhicules. Les racines d'arbres qui soulèvent la chaussée dans le bois sont une cause fréquente de crevaison.",
    cards: [
      "Crevaison réparée par mèche ou champignon à votre emplacement, sans remorquage",
      "Pneu neuf monté et équilibré directement chez vous ou sur le parking du bois",
      "On change la valve et on vérifie la pression des 4 pneus",
      "Inspection du pneu abîmé — on ne vous vend rien d'inutile, juste ce qu'il faut"
    ],
    faq: [
      { q: "Mon pneu a crevé dans le Bois de Vincennes, vous intervenez ?", a: "Oui, on intervient sur toutes les routes et parkings du Bois de Vincennes. Donnez-nous votre position précise (porte d'entrée ou route la plus proche) et on arrive." },
      { q: "Vous couvrez les rues autour du Château de Vincennes ?", a: "On couvre tout Vincennes — centre-ville, abords du château, avenue de Paris, quartier sud. Le RER A et le métro 1 (Château de Vincennes) sont des repères qu'on connaît bien." },
      { q: "Un dimanche après-midi dans le Bois, vous êtes disponibles ?", a: "On travaille 7j/7, dimanches inclus. Le Bois de Vincennes est un secteur où on intervient souvent le weekend. Appelez le 07 61 06 96 38." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Vincennes (94300), dans le Val-de-Marne, en bordure directe de Paris 12e. La ville abrite le Château de Vincennes et l'entrée du Bois de Vincennes. Desservie par le RER A et le métro 1 (terminus Château de Vincennes), elle est facilement accessible depuis Paris. Intervention en 25 à 35 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  // ===== 94 — Val-de-Marne =====
  "creteil": {
    nom: "Créteil", cp: "94000", dept: "Val-de-Marne", deptNum: "94",
    deptPage: "departement-val-de-marne-94.html", deptLabel: "Val-de-Marne",
    delai: "30-40",
    localParagraph: "Créteil est la préfecture du Val-de-Marne, connue pour le centre commercial Créteil Soleil, le lac de Créteil et le carrefour Pompadour. L'A86 traverse la commune et la circulation y est souvent dense. Les vastes parkings de Créteil Soleil et les routes autour du lac sont des zones où on intervient régulièrement.",
    cards: [
      "Réparation de crevaison par mèche ou champignon — intervention rapide sans remorquage",
      "Montage de pneus neufs toutes marques avec équilibrage, sur le parking ou chez vous",
      "Valve défectueuse changée et pression remise au niveau constructeur",
      "Diagnostic préalable gratuit — on vous dit la vérité sur l'état de votre pneu"
    ],
    faq: [
      { q: "Vous intervenez sur le parking de Créteil Soleil ?", a: "Oui, on intervient régulièrement sur le parking de Créteil Soleil. C'est un grand parking où les incidents de pneu sont fréquents. On connaît les accès." },
      { q: "Je suis en panne près du lac de Créteil, vous venez ?", a: "On couvre les abords du lac et tout Créteil — centre-ville, Pompadour, université, zones résidentielles. Appelez le 07 61 06 96 38 avec votre position." },
      { q: "Combien de temps pour venir à Créteil depuis le nord ?", a: "Créteil est au sud-est de Paris, à 30-40 minutes de notre base via le périphérique et l'A86. Les horaires creuses réduisent ce délai." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Créteil (94000), préfecture du Val-de-Marne. La ville abrite le centre commercial Créteil Soleil, le lac de Créteil et l'université UPEC. Desservie par l'A86, le métro 8 et le RER D (gare de Créteil Pompadour), elle est au sud-est de Paris. Intervention en 30 à 40 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "ivry-sur-seine": {
    nom: "Ivry-sur-Seine", cp: "94200", dept: "Val-de-Marne", deptNum: "94",
    deptPage: "departement-val-de-marne-94.html", deptLabel: "Val-de-Marne",
    delai: "25-35",
    localParagraph: "Ivry-sur-Seine est limitrophe de Paris 13e, entre les quais de Seine et les zones industrielles le long de l'A4. La ville mélange quartiers résidentiels en mutation et zones d'activité encore très présentes. Les routes usées des zones industrielles et les abords du périphérique sont des secteurs où les crevaisons arrivent souvent.",
    cards: [
      "On répare la crevaison par mèche ou champignon directement à votre position",
      "Pneu neuf livré, monté et équilibré sans que vous ayez à déplacer votre véhicule",
      "Valve changée et pression recalibrée au bar constructeur",
      "Contrôle du pneu avant toute décision — on répare si c'est possible, on remplace si c'est nécessaire"
    ],
    faq: [
      { q: "Vous couvrez la zone industrielle d'Ivry-sur-Seine ?", a: "Oui, on intervient dans les zones industrielles, les quais de Seine et les quartiers résidentiels d'Ivry. C'est un secteur qu'on dessert régulièrement via l'A4." },
      { q: "Mon pneu a éclaté en sortant du périphérique porte d'Ivry, que faire ?", a: "Sortez du périphérique et garez-vous en sécurité sur une voie accessible à Ivry. On arrive en 25 à 35 minutes. Appelez le 07 61 06 96 38." },
      { q: "Vous réparez aussi les pneus d'ambulances et VSL à Ivry ?", a: "Oui, on prend en charge les ambulances et VSL — ce sont des véhicules légers. On intervient en priorité pour les véhicules de santé." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Ivry-sur-Seine (94200), dans le Val-de-Marne, limitrophe de Paris 13e. La ville est desservie par le métro 7, l'A4 et les quais de Seine. Zone mixte résidentielle et industrielle en pleine mutation, Ivry est accessible rapidement depuis le périphérique sud. Intervention en 25 à 35 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "orly": {
    nom: "Orly", cp: "94310", dept: "Val-de-Marne", deptNum: "94",
    deptPage: "departement-val-de-marne-94.html", deptLabel: "Val-de-Marne",
    delai: "30-40",
    localParagraph: "Orly est indissociable de son aéroport — le deuxième de France. Entre la zone de fret, les parkings longue durée, les hôtels et la zone d'activité, le trafic ne s'arrête jamais. Nos techniciens interviennent sur toutes les voies publiques autour de l'aéroport et dans la ville d'Orly elle-même.",
    cards: [
      "Mèche ou champignon pour traiter la crevaison sur place, sans déplacement du véhicule",
      "Changement de pneu complet avec montage et équilibrage directement à votre emplacement",
      "Pose de valve neuve et vérification de la pression sur chaque roue",
      "On vérifie le pneu avant toute action — pas de remplacement si la réparation suffit"
    ],
    faq: [
      { q: "Je suis bloqué sur un parking d'hôtel près d'Orly, vous venez ?", a: "Oui, on couvre tous les parkings d'hôtels autour d'Orly — zone aéroportuaire, Paray-Vieille-Poste, Athis-Mons. C'est un secteur qu'on connaît. Appelez le 07 61 06 96 38." },
      { q: "Vous intervenez dans la zone de fret d'Orly ?", a: "On accède à toutes les zones accessibles au public autour d'Orly — zone de fret, parkings, voies de desserte. Pas les zones sécurisées de l'aéroport, mais tout le reste." },
      { q: "Mon véhicule est garé au parking longue durée d'Orly avec un pneu à plat, que faire ?", a: "Appelez-nous avec le numéro de votre place ou la zone exacte. On se rend sur les parkings longue durée accessibles et on intervient directement sur place." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Orly (94310), dans le Val-de-Marne. La ville abrite l'aéroport Paris-Orly, desservie par l'A6, l'A106 et l'Orlyval. Zone de fret, hôtels et parkings longue durée génèrent un trafic permanent. Intervention en 30 à 40 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "vitry-sur-seine": {
    nom: "Vitry-sur-Seine", cp: "94400", dept: "Val-de-Marne", deptNum: "94",
    deptPage: "departement-val-de-marne-94.html", deptLabel: "Val-de-Marne",
    delai: "25-35",
    localParagraph: "Vitry-sur-Seine est la ville la plus peuplée du Val-de-Marne. L'A86 la traverse, les bords de Seine et les anciennes zones industrielles en reconversion sont des secteurs où la chaussée est souvent dégradée. Les nids de poule et les débris de chantier provoquent beaucoup de crevaisons — on est habitués à intervenir dans ces conditions.",
    cards: [
      "Crevaison colmatée par mèche ou champignon, directement sur votre lieu de panne",
      "Remplacement de pneu sur place — montage, équilibrage, toutes dimensions courantes",
      "Valve remplacée et pression de gonflage ajustée au bar près",
      "Avant d'intervenir, on examine le pneu — on vous dit clairement ce qu'il en est"
    ],
    faq: [
      { q: "Vous couvrez les zones industrielles de Vitry-sur-Seine ?", a: "Oui, on intervient dans toutes les zones — industrielles, résidentielles, bords de Seine, centre-ville. Les routes dégradées des zones en reconversion génèrent beaucoup d'appels." },
      { q: "Mon pneu est crevé sur l'A86 à hauteur de Vitry, que faire ?", a: "Ne restez pas sur l'autoroute. Sortez à la prochaine sortie et garez-vous en sécurité à Vitry. On n'intervient pas directement sur l'A86, mais on arrive dès que vous êtes sur une voie accessible." },
      { q: "Intervention de nuit à Vitry-sur-Seine ?", a: "On travaille 24h/24. La nuit, Vitry est accessible rapidement depuis le périphérique. Appelez le 07 61 06 96 38, on arrive en 25 à 35 minutes." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Vitry-sur-Seine (94400), commune la plus peuplée du Val-de-Marne. Traversée par l'A86 et bordée par la Seine, la ville combine zones industrielles en reconversion et quartiers résidentiels. Desservie par le RER C et le futur métro 15, elle est au sud de Paris. Intervention en 25 à 35 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  // ===== 78 — Yvelines =====
  "mantes-la-jolie": {
    nom: "Mantes-la-Jolie", cp: "78200", dept: "Yvelines", deptNum: "78",
    deptPage: "departement-yvelines-78.html", deptLabel: "Yvelines",
    delai: "50-60",
    localParagraph: "Mantes-la-Jolie se situe à l'ouest des Yvelines, en bords de Seine. C'est l'une des villes les plus éloignées de notre base, mais nos camions couvrent régulièrement l'axe A13 qui y mène. La gare Transilien J, les quartiers du Val Fourré et le centre-ville historique sont les zones où on intervient le plus souvent.",
    cards: [
      "Pose de mèche ou de champignon pour stopper la fuite d'air sur la bande de roulement",
      "On apporte le pneu neuf et on fait le montage-équilibrage directement chez vous",
      "Changement de valve et contrôle de pression — on vérifie chaque roue",
      "Diagnostic gratuit avant intervention — réparation si c'est fiable, remplacement si nécessaire"
    ],
    faq: [
      { q: "Mantes-la-Jolie est loin de votre base, vous venez quand même ?", a: "Oui, on couvre Mantes-la-Jolie via l'A13. Le délai est plus long (50-60 min) mais on vient avec tout le matériel et le stock nécessaire." },
      { q: "Vous intervenez dans le quartier du Val Fourré à Mantes ?", a: "On couvre tous les quartiers de Mantes-la-Jolie — Val Fourré, centre-ville, bords de Seine, zone gare. Pas de restriction de secteur." },
      { q: "Intervention un jour férié à Mantes-la-Jolie ?", a: "On travaille 7j/7, jours fériés inclus. La circulation est souvent plus fluide sur l'A13 les jours fériés, donc on arrive parfois plus vite que prévu." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Mantes-la-Jolie (78200), dans les Yvelines. Située à l'ouest de l'IDF en bords de Seine, la ville est desservie par l'A13 et la gare Transilien J (ligne Paris-Saint-Lazare). Mantes est à environ 55 km de Paris, zone urbaine mixte avec quartiers résidentiels et centre historique. Intervention en 50 à 60 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "poissy": {
    nom: "Poissy", cp: "78300", dept: "Yvelines", deptNum: "78",
    deptPage: "departement-yvelines-78.html", deptLabel: "Yvelines",
    delai: "35-45",
    localParagraph: "Poissy est une ville industrielle des Yvelines, connue pour l'usine Stellantis (ex-PSA). L'A13 passe à proximité et le pont de Poissy relie les deux rives de la Seine. Entre l'usine, la gare RER A et les quartiers résidentiels, le trafic poids lourds et VL est constant. Nos camions empruntent l'A13 quotidiennement.",
    cards: [
      "Réparation par mèche ou champignon — colmatage fiable de la crevaison sur le flanc roulant",
      "Pneu neuf posé et équilibré à votre emplacement, toutes marques disponibles",
      "On remplace la valve et on contrôle la pression au manomètre calibré",
      "Inspection avant intervention — on vous dit franchement si le pneu peut être sauvé"
    ],
    faq: [
      { q: "Vous couvrez la zone industrielle de Poissy autour de Stellantis ?", a: "Oui, on intervient dans toute la zone — usine Stellantis, sous-traitants, parkings employés. C'est un secteur où les véhicules utilitaires ont souvent besoin de nos services." },
      { q: "Je suis en panne près du pont de Poissy, vous venez ?", a: "On couvre les deux rives autour du pont de Poissy. Garez-vous en sécurité côté Poissy ou côté Carrières-sous-Poissy et appelez le 07 61 06 96 38." },
      { q: "Combien de temps pour arriver à Poissy ?", a: "Poissy est à 35-45 minutes de notre base via l'A13 ou l'A15/A86. Nos techniciens circulent souvent dans le secteur ouest." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Poissy (78300), dans les Yvelines. Ville industrielle en bords de Seine, Poissy abrite l'usine Stellantis et est desservie par le RER A (branche Poissy), l'A13 et la N13. Zone mixte industrielle et résidentielle, le pont de Poissy relie les deux rives. Intervention en 35 à 45 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "rambouillet": {
    nom: "Rambouillet", cp: "78120", dept: "Yvelines", deptNum: "78",
    deptPage: "departement-yvelines-78.html", deptLabel: "Yvelines",
    delai: "50-65",
    localParagraph: "Rambouillet est une ville au cœur de sa forêt domaniale, dans le sud des Yvelines. La N10 traverse la commune et les routes forestières environnantes sont des endroits où les crevaisons sont fréquentes — branches, gravillons, nids de poule. La distance depuis Paris est compensée par notre connaissance du réseau routier.",
    cards: [
      "Colmatage de crevaison par mèche ou champignon sur la surface de roulement",
      "Remplacement de pneu avec montage et équilibrage professionnel à votre position",
      "Valve neuve posée et pression ajustée selon les recommandations constructeur",
      "Diagnostic visuel complet du pneu — on ne remplace que si la réparation est impossible"
    ],
    faq: [
      { q: "Mon pneu a crevé sur une route forestière près de Rambouillet, vous venez ?", a: "On intervient sur toutes les routes accessibles autour de Rambouillet, y compris les routes forestières praticables. Donnez-nous votre position GPS et on arrive." },
      { q: "Rambouillet est assez loin, ça coûte plus cher ?", a: "Le tarif reste entre 80€ et 150€ selon le type de pneu, indépendamment de la distance. Pas de surcoût kilométrique. Appelez le 07 61 06 96 38 pour un devis." },
      { q: "Intervention le weekend à Rambouillet ?", a: "On travaille 7j/7, weekends compris. Les weekends, la forêt de Rambouillet attire beaucoup de visiteurs — on y intervient régulièrement." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Rambouillet (78120), dans le sud des Yvelines. La ville est entourée par la forêt domaniale de Rambouillet et desservie par la N10 et la gare Transilien N. Zone résidentielle calme à environ 50 km de Paris, les routes forestières environnantes sont propices aux crevaisons. Intervention en 50 à 65 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "saint-germain-en-laye": {
    nom: "Saint-Germain-en-Laye", cp: "78100", dept: "Yvelines", deptNum: "78",
    deptPage: "departement-yvelines-78.html", deptLabel: "Yvelines",
    delai: "35-45",
    localParagraph: "Saint-Germain-en-Laye est une ville résidentielle huppée des Yvelines, avec son château, sa forêt et le terminus du RER A. Les rues pavées du centre historique, les abords de la forêt et les axes vers l'A13/A14 sont des zones où on intervient. Les pavés anciens et les gravillons forestiers sont les ennemis numéro un des pneus ici.",
    cards: [
      "Pose de mèche ou champignon pour réparer la crevaison sans déplacer votre véhicule",
      "Montage et équilibrage de pneus neufs à votre emplacement — toutes marques, toutes tailles",
      "On change la valve usée et on ajuste la pression au niveau recommandé",
      "Vérification préalable du pneu endommagé — réparation si c'est sûr, remplacement sinon"
    ],
    faq: [
      { q: "Vous intervenez dans le centre historique de Saint-Germain-en-Laye ?", a: "Oui, on accède au centre-ville et aux rues autour du château. Nos camions se faufilent dans les rues étroites. Si un endroit est vraiment inaccessible, on vient avec le matériel portatif." },
      { q: "Mon pneu a crevé en sortant de la forêt de Saint-Germain, que faire ?", a: "Les gravillons et branches de la forêt provoquent souvent des crevaisons. Garez-vous en sécurité et appelez le 07 61 06 96 38. On est là en 35 à 45 minutes." },
      { q: "Vous avez des pneus pour SUV en stock ?", a: "On transporte les dimensions courantes pour SUV (235/55 R19, 225/65 R17, etc.). Précisez votre dimension au téléphone et on confirme la disponibilité avant de se déplacer." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Saint-Germain-en-Laye (78100), dans les Yvelines. Ville résidentielle à l'ouest de Paris, elle abrite un château royal et une vaste forêt domaniale. Desservie par le RER A (terminus) et proche de l'A13/A14, Saint-Germain est à environ 20 km de Paris. Intervention en 35 à 45 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "versailles": {
    nom: "Versailles", cp: "78000", dept: "Yvelines", deptNum: "78",
    deptPage: "departement-yvelines-78.html", deptLabel: "Yvelines",
    delai: "40-50",
    localParagraph: "Versailles, c'est le château, les gares (Rive Droite, Rive Gauche, Chantiers), la préfecture des Yvelines et un trafic touristique constant. Les pavés autour du château, les avenues royales et la N12 mettent les pneus à l'épreuve. Nos techniciens couvrent le secteur via l'A13 et la N12 — on arrive dans tous les quartiers.",
    cards: [
      "Mèche ou champignon posé directement sur la bande de roulement pour colmater la fuite",
      "Pneu neuf de toutes marques monté et équilibré sur place — pas besoin de garage",
      "On remplace la valve et on recalibre la pression aux valeurs constructeur",
      "Examen gratuit du pneu touché — on vous donne notre avis professionnel avant d'agir"
    ],
    faq: [
      { q: "Mon pneu a crevé près du Château de Versailles, vous venez ?", a: "Oui, on couvre les abords du château, les parkings touristiques et tout le centre-ville de Versailles. Garez-vous en sécurité et appelez le 07 61 06 96 38." },
      { q: "Vous couvrez les trois gares de Versailles ?", a: "On intervient autour des trois gares — Versailles Rive Droite, Rive Gauche et Chantiers. Donnez-nous la gare la plus proche et on arrive en 40 à 50 minutes." },
      { q: "Versailles est dans votre zone de couverture habituelle ?", a: "Oui, Versailles fait partie de notre zone IDF. On y va via l'A13 ou la N12. Le délai est de 40 à 50 minutes depuis notre base, mais nos techniciens sont souvent déjà dans le secteur ouest." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Versailles (78000), préfecture des Yvelines. Ville du château, desservie par trois gares (Rive Droite, Rive Gauche, Chantiers), la N12 et l'A13. Zone touristique et résidentielle à environ 17 km de Paris. Axes pavés autour du château, trafic dense — les crevaisons y sont fréquentes. Intervention en 40 à 50 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  // ===== 77 — Seine-et-Marne =====
  "chelles": {
    nom: "Chelles", cp: "77500", dept: "Seine-et-Marne", deptNum: "77",
    deptPage: "departement-seine-et-marne-77.html", deptLabel: "Seine-et-Marne",
    delai: "25-35",
    localParagraph: "Chelles est l'une des villes les plus proches de Paris en Seine-et-Marne. La gare RER E (Chelles-Gournay) et la proximité de l'A104 en font un carrefour de l'est francilien. Zone résidentielle avec beaucoup de pavillons, les rues de Chelles sont parfois dégradées par les racines et les travaux de voirie.",
    cards: [
      "Réparation de crevaison par mèche ou champignon — intervention directe sur votre lieu de panne",
      "On monte et équilibre vos pneus neufs directement devant chez vous, toutes marques",
      "Changement de valve et remise à niveau de la pression de chaque roue",
      "On vérifie le pneu endommagé et on vous conseille : réparation ou remplacement"
    ],
    faq: [
      { q: "Vous intervenez près de la gare de Chelles-Gournay ?", a: "Oui, on couvre la gare et tous les quartiers de Chelles — centre-ville, zones pavillonnaires, bords de Marne. Appelez le 07 61 06 96 38." },
      { q: "Chelles est en Seine-et-Marne, vous venez du Val-d'Oise ?", a: "Oui, nos camions couvrent toute l'IDF. Chelles est accessible en 25-35 minutes via l'A104 (Francilienne) depuis le nord. On connaît les itinéraires." },
      { q: "Vous dépannez aussi le weekend dans les zones pavillonnaires ?", a: "On travaille 7j/7. Les zones résidentielles de Chelles sont faciles d'accès — on gare le camion devant chez vous et on intervient sur place." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Chelles (77500), en Seine-et-Marne. Proche de Paris, la ville est desservie par le RER E (gare Chelles-Gournay) et l'A104 (Francilienne). Zone résidentielle pavillonnaire en bordure de la Marne, Chelles est à une trentaine de minutes de notre base. Intervention en 25 à 35 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "lagny-sur-marne": {
    nom: "Lagny-sur-Marne", cp: "77400", dept: "Seine-et-Marne", deptNum: "77",
    deptPage: "departement-seine-et-marne-77.html", deptLabel: "Seine-et-Marne",
    delai: "30-40",
    localParagraph: "Lagny-sur-Marne est une ville historique de Seine-et-Marne, sur les bords de la Marne. L'A104 (Francilienne) passe à proximité et les centres commerciaux de Val d'Europe et Bay 1/2 ne sont pas loin. Les rues pavées du centre ancien et les routes d'accès aux zones commerciales sont des endroits où les pneus prennent des coups.",
    cards: [
      "Colmatage de la crevaison par mèche ou champignon sur le côté roulant du pneu",
      "Pneu neuf monté et équilibré à votre emplacement — parking, domicile ou bord de route",
      "Valve neuve posée et pression ajustée au manomètre professionnel",
      "Diagnostic du pneu avant toute décision — transparence totale sur ce qu'on peut faire"
    ],
    faq: [
      { q: "Vous intervenez aussi vers les centres commerciaux autour de Lagny ?", a: "Oui, on couvre Lagny-sur-Marne et les alentours — Torcy, Bussy, Val d'Europe. Les grands parkings commerciaux sont des endroits où on intervient souvent." },
      { q: "Mon pneu a crevé dans le centre ancien de Lagny, les rues sont étroites ?", a: "On connaît les rues étroites des centres anciens. Si le camion ne passe pas, on apporte le matériel à pied. L'important c'est qu'on arrive à votre véhicule." },
      { q: "Combien de temps pour venir à Lagny depuis le nord IDF ?", a: "Lagny est à 30-40 minutes via l'A104. La Francilienne nous permet de contourner Paris efficacement." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Lagny-sur-Marne (77400), en Seine-et-Marne. Ville historique en bords de Marne, elle est desservie par le Transilien P et proche de l'A104 (Francilienne). Situee à environ 30 km de Paris, Lagny est entourée des zones commerciales de Val d'Europe et Bay. Intervention en 30 à 40 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "meaux": {
    nom: "Meaux", cp: "77100", dept: "Seine-et-Marne", deptNum: "77",
    deptPage: "departement-seine-et-marne-77.html", deptLabel: "Seine-et-Marne",
    delai: "35-45",
    localParagraph: "Meaux est la grande ville du nord de la Seine-et-Marne, connue pour sa cathédrale et son musée de la Grande Guerre. L'A140 et la N3 relient Meaux à Paris. Zone urbaine entourée de campagne, les routes d'accès et les ronds-points de la ville sont des lieux fréquents d'incidents de pneu.",
    cards: [
      "Mèche ou champignon pour réparer la crevaison sans déplacer votre véhicule",
      "Remplacement complet du pneu avec montage et équilibrage sur place, toutes dimensions",
      "Valve changée et pression recalibrée selon les valeurs de votre carte grise",
      "On inspecte le pneu abîmé avant d'agir — pas de vente forcée, juste un diagnostic honnête"
    ],
    faq: [
      { q: "Vous allez jusqu'à Meaux depuis Gonesse ?", a: "Oui, Meaux fait partie de notre zone de couverture. La N3 et l'A140 nous permettent d'arriver en 35-45 minutes. On amène tout le matériel." },
      { q: "Vous intervenez dans la zone commerciale de Meaux ?", a: "On couvre les zones commerciales, le centre-ville, la zone de la gare et les quartiers résidentiels de Meaux. Aucune restriction de secteur." },
      { q: "Mon pneu a crevé sur la N3 vers Meaux, je fais quoi ?", a: "Sortez de la N3 au prochain rond-point et garez-vous en sécurité. On arrive en 35-45 minutes. Appelez le 07 61 06 96 38 avec votre position exacte." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Meaux (77100), dans le nord de la Seine-et-Marne. La ville est desservie par la N3, l'A140 et le Transilien P (gare de Meaux). Chef-lieu d'arrondissement avec cathédrale et musée de la Grande Guerre, Meaux est à environ 40 km de Paris. Intervention en 35 à 45 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "melun": {
    nom: "Melun", cp: "77000", dept: "Seine-et-Marne", deptNum: "77",
    deptPage: "departement-seine-et-marne-77.html", deptLabel: "Seine-et-Marne",
    delai: "45-55",
    localParagraph: "Melun est la préfecture de Seine-et-Marne, au bord de la Seine. L'A5, la N6 et le RER D desservent la ville. Zone administrative et résidentielle, Melun est plus éloignée de notre base mais reste dans notre périmètre d'intervention. Les routes d'accès depuis l'A5 et les rues du centre-ville sont nos zones d'action habituelles.",
    cards: [
      "Réparation de crevaison par mèche ou champignon directement à votre position",
      "On livre et monte votre pneu neuf avec équilibrage — sans que vous ayez à bouger",
      "Pose de valve neuve et vérification de la pression sur chaque roue",
      "Expertise gratuite du pneu — on ne change que ce qui doit être changé"
    ],
    faq: [
      { q: "Melun est assez loin, vous intervenez quand même ?", a: "Oui, Melun fait partie de notre zone IDF. Le délai est de 45-55 minutes via l'A5 ou le périphérique sud + A6/N6. On arrive avec tout le stock nécessaire." },
      { q: "Vous couvrez le centre-ville de Melun et les bords de Seine ?", a: "On couvre tout Melun — centre-ville, quartier nord, quartier de l'Almont, bords de Seine, zone de la préfecture. Appelez le 07 61 06 96 38." },
      { q: "Intervention la nuit à Melun, c'est possible ?", a: "On travaille 24h/24. La nuit, la route vers Melun est fluide et on arrive souvent en moins de 45 minutes. Même service, même matériel." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Melun (77000), préfecture de Seine-et-Marne. En bords de Seine, la ville est desservie par le RER D, l'A5 et la N6. Centre administratif à environ 45 km au sud-est de Paris, Melun est une zone urbaine entourée de communes rurales. Intervention en 45 à 55 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "torcy": {
    nom: "Torcy", cp: "77200", dept: "Seine-et-Marne", deptNum: "77",
    deptPage: "departement-seine-et-marne-77.html", deptLabel: "Seine-et-Marne",
    delai: "30-40",
    localParagraph: "Torcy est une commune de Marne-la-Vallée, connue pour le centre commercial Bay 1/2 et le terminus du RER A (branche Torcy). Proche de Disneyland Paris, le trafic est soutenu sur l'A4 et l'A104. Les immenses parkings commerciaux sont des zones où les pneus crèvent souvent — accrochages de bordure, clous, débris.",
    cards: [
      "Crevaison traitée par mèche ou champignon sans bouger votre véhicule de son emplacement",
      "On monte le pneu neuf et on l'équilibre directement sur le parking ou chez vous",
      "Valve défaillante remplacée en quelques minutes et pression ajustée",
      "On contrôle le pneu avant toute intervention — pas de remplacement inutile"
    ],
    faq: [
      { q: "Vous venez au centre commercial Bay à Torcy ?", a: "Oui, Bay 1 et Bay 2 font partie de nos zones d'intervention régulières. Les grands parkings sont des endroits où on est souvent appelés. Appelez le 07 61 06 96 38." },
      { q: "Mon pneu a crevé près de Disneyland, Torcy c'est à côté ?", a: "Torcy est à quelques minutes de Disneyland. On couvre tout le secteur Marne-la-Vallée — Torcy, Lognes, Bussy, Val d'Europe. Même intervention." },
      { q: "Vous arrivez en combien de temps à Torcy depuis le nord ?", a: "30 à 40 minutes via l'A104 ou l'A4 depuis notre base. La Francilienne est notre itinéraire le plus direct vers l'est de l'IDF." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Torcy (77200), en Seine-et-Marne, au cœur de Marne-la-Vallée. Desservie par le RER A (terminus Torcy) et proche de l'A4/A104, la ville abrite le centre commercial Bay 1/2 et se situe près de Disneyland Paris. Zone résidentielle et commerciale. Intervention en 30 à 40 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  // ===== 91 — Essonne =====
  "corbeil-essonnes": {
    nom: "Corbeil-Essonnes", cp: "91100", dept: "Essonne", deptNum: "91",
    deptPage: "departement-essonne-91.html", deptLabel: "Essonne",
    delai: "40-50",
    localParagraph: "Corbeil-Essonnes se situe au confluent de la Seine et de l'Essonne, dans le sud de l'Île-de-France. La N7 traverse la ville et le RER D la dessert. Zone mixte avec quartiers résidentiels, zones commerciales et industrielles, la circulation sur la N7 et les routes de bord de Seine provoque régulièrement des incidents de pneu.",
    cards: [
      "Mèche ou champignon posé sur la bande de roulement pour stopper la fuite",
      "Pneu neuf de toutes marques livré et monté avec équilibrage à votre position",
      "On change la valve et on contrôle le gonflage de chaque pneu",
      "Diagnostic préalable — on vous dit clairement si le pneu est réparable ou non"
    ],
    faq: [
      { q: "Vous intervenez sur la N7 à Corbeil-Essonnes ?", a: "On n'intervient pas directement sur les voies rapides, mais dès que vous êtes garé en sécurité à Corbeil, on arrive en 40 à 50 minutes. Sortez à la prochaine bretelle." },
      { q: "Vous couvrez les quartiers résidentiels de Corbeil-Essonnes ?", a: "On couvre toute la commune — Tarterêts, centre-ville, bords de Seine, zone de la gare. Pas de quartier exclu de notre zone d'intervention." },
      { q: "Intervention en soirée à Corbeil, c'est possible ?", a: "24h/24, 7j/7. Le soir, la N7 et la route vers Corbeil sont plus dégagées, on arrive souvent plus vite. Appelez le 07 61 06 96 38." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Corbeil-Essonnes (91100), en Essonne. Au confluent de la Seine et de l'Essonne, la ville est desservie par la N7, le RER D et l'A6 à proximité. Zone urbaine mixte à environ 35 km au sud de Paris. Intervention en 40 à 50 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "evry-courcouronnes": {
    nom: "Évry-Courcouronnes", cp: "91000", dept: "Essonne", deptNum: "91",
    deptPage: "departement-essonne-91.html", deptLabel: "Essonne",
    delai: "35-45",
    localParagraph: "Évry-Courcouronnes est la préfecture de l'Essonne, avec l'université d'Évry, la cathédrale de la Résurrection et le centre commercial Évry 2. L'A6 et la Francilienne (N104) encadrent la ville. Les grands parkings d'Évry 2 et les voies d'accès à l'autoroute sont des zones où les crevaisons sont fréquentes.",
    cards: [
      "Crevaison réparée par mèche ou champignon directement sur votre lieu de panne",
      "Montage de pneu neuf toutes marques avec équilibrage, chez vous ou sur un parking",
      "Changement de valve et ajustement de la pression au bar constructeur",
      "Vérification complète du pneu — on ne touche à rien avant de vous avoir donné notre avis"
    ],
    faq: [
      { q: "Vous intervenez sur le parking d'Évry 2 ?", a: "Oui, on intervient régulièrement au centre commercial Évry 2 — parking surface et parking couvert. C'est une zone à forte fréquentation où les pneus crèvent souvent." },
      { q: "Mon pneu a éclaté en sortant de l'A6 vers Évry, vous venez ?", a: "Sortez de l'A6 et garez-vous en sécurité à Évry. On arrive en 35 à 45 minutes. Appelez le 07 61 06 96 38 avec votre position." },
      { q: "Vous couvrez le campus de l'université d'Évry ?", a: "On couvre tout Évry-Courcouronnes — université, cathédrale, quartiers résidentiels, zones commerciales. Aucune restriction de zone." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Évry-Courcouronnes (91000), préfecture de l'Essonne. La ville abrite l'université d'Évry, la cathédrale de la Résurrection et le centre commercial Évry 2. Desservie par l'A6, la N104 et le RER D, elle est à environ 30 km au sud de Paris. Intervention en 35 à 45 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "longjumeau": {
    nom: "Longjumeau", cp: "91160", dept: "Essonne", deptNum: "91",
    deptPage: "departement-essonne-91.html", deptLabel: "Essonne",
    delai: "30-40",
    localParagraph: "Longjumeau est une commune de l'Essonne située au croisement de l'A6 et de la N20. L'hôpital de Longjumeau est un point de repère majeur. Zone résidentielle et commerciale, la ville voit passer beaucoup de trafic entre Paris et le sud. Les abords de l'A6 et les ronds-points de la N20 sont des points chauds pour les crevaisons.",
    cards: [
      "On colmate la crevaison par mèche ou champignon, directement à votre emplacement",
      "Pneu neuf de toute marque monté et équilibré sur place — parking, domicile, bord de route",
      "Valve neuve installée et pression vérifiée sur les 4 pneus",
      "Diagnostic gratuit — on vérifie le pneu avant de décider quoi faire"
    ],
    faq: [
      { q: "Vous intervenez près de l'hôpital de Longjumeau ?", a: "Oui, on couvre les abords de l'hôpital et toute la commune. Pour les véhicules de santé (ambulances, VSL), on intervient en priorité." },
      { q: "Je suis bloqué à la sortie de l'A6 à Longjumeau, vous venez ?", a: "Sortez de l'A6 et garez-vous en sécurité à Longjumeau. On arrive en 30 à 40 minutes. Appelez le 07 61 06 96 38." },
      { q: "Vous couvrez aussi Chilly-Mazarin et les villes autour de Longjumeau ?", a: "On couvre Longjumeau et toutes les communes voisines — Chilly-Mazarin, Morangis, Saulx-les-Chartreux. Tout le secteur A6/N20." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Longjumeau (91160), en Essonne. Située au croisement de l'A6 et de la N20, la ville abrite un centre hospitalier et des zones commerciales. Zone résidentielle à environ 20 km au sud de Paris, Longjumeau est un passage obligé sur l'axe Paris-sud. Intervention en 30 à 40 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "massy": {
    nom: "Massy", cp: "91300", dept: "Essonne", deptNum: "91",
    deptPage: "departement-essonne-91.html", deptLabel: "Essonne",
    delai: "30-40",
    localParagraph: "Massy est un nœud de transport majeur de l'Essonne — gare TGV, RER B, RER C, et croisement de l'A6 et de l'A10. Le quartier de Massy-Palaiseau concentre des entreprises tech et des centres de recherche. Entre les parkings de la gare TGV, les zones d'activité et les quartiers résidentiels, nos techniciens interviennent dans tous les contextes.",
    cards: [
      "Réparation par mèche ou champignon — crevaison traitée sur place sans remorquage",
      "On amène le pneu neuf et on fait le montage-équilibrage directement chez vous",
      "Valve remplacée et pression corrigée au niveau recommandé par le constructeur",
      "On diagnostique le pneu avant d'intervenir — honnêteté garantie sur l'état réel"
    ],
    faq: [
      { q: "Vous intervenez au parking de la gare TGV de Massy ?", a: "Oui, la gare TGV de Massy est un endroit où on intervient régulièrement. Parkings longue durée, parking relais — on connaît les accès. Appelez le 07 61 06 96 38." },
      { q: "Mon pneu a crevé dans la zone tech de Massy-Palaiseau, vous venez ?", a: "On couvre toute la zone tech de Massy-Palaiseau. Entreprises, parkings, voies d'accès — on s'adapte à votre emplacement." },
      { q: "Massy est bien desservi, pourquoi pas aller au garage directement ?", a: "Parce qu'avec un pneu crevé, rouler jusqu'au garage abîme la jante et c'est dangereux. On vient à vous, on répare sur place, vous repartez en sécurité. Zéro remorquage." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Massy (91300), en Essonne. Nœud de transport majeur avec la gare TGV Massy, le RER B et C, et le croisement A6/A10. Zone tech de Massy-Palaiseau avec entreprises et centres de recherche. Située à environ 15 km au sud de Paris. Intervention en 30 à 40 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  },
  "palaiseau": {
    nom: "Palaiseau", cp: "91120", dept: "Essonne", deptNum: "91",
    deptPage: "departement-essonne-91.html", deptLabel: "Essonne",
    delai: "35-45",
    localParagraph: "Palaiseau accueille le Plateau de Saclay, l'École Polytechnique et une concentration d'établissements de recherche et d'enseignement supérieur. Les routes du plateau et les voies d'accès depuis la N118 sont des zones où les pneus souffrent — gravillons, chaussée en travaux, routes de desserte. Nos techniciens couvrent le secteur régulièrement.",
    cards: [
      "Pose de mèche ou champignon pour stopper la crevaison sur la zone de roulement",
      "Montage et équilibrage de pneus neufs toutes marques, sur votre parking ou devant chez vous",
      "On remplace la valve usée et on ajuste la pression de chaque pneu",
      "Contrôle du pneu endommagé avant toute action — on ne remplace que si c'est justifié"
    ],
    faq: [
      { q: "Vous intervenez sur le Plateau de Saclay à Palaiseau ?", a: "Oui, on couvre le Plateau de Saclay — École Polytechnique, campus universitaires, centres de recherche. Les routes du plateau sont souvent en travaux, les crevaisons y sont courantes." },
      { q: "Mon pneu a crevé sur la N118 vers Palaiseau, que faire ?", a: "La N118 est une voie rapide — sortez à la prochaine sortie et garez-vous à Palaiseau. On arrive en 35 à 45 minutes. Appelez le 07 61 06 96 38." },
      { q: "Vous dépannez les étudiants et le personnel du campus ?", a: "On dépanne tout le monde — étudiants, personnels, visiteurs. Même service, même tarif. Les parkings de campus sont facilement accessibles pour notre camion." }
    ],
    resume: "DEPAN2PNEUS IDF 24H intervient à Palaiseau (91120), en Essonne. La ville accueille le Plateau de Saclay, l'École Polytechnique et de nombreux centres de recherche. Desservie par le RER B et la N118, Palaiseau est au cœur de la zone tech du sud francilien, à environ 20 km de Paris. Intervention en 35 à 45 minutes. Tarif : 80€ à 150€. Contact : 07 61 06 96 38."
  }
};

// ====== MAIN SCRIPT ======
const DIR = __dirname;

for (const [slug, ville] of Object.entries(VILLES)) {
  const filePath = path.join(DIR, `depannage-pneu-${slug}.html`);

  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${filePath} not found`);
    continue;
  }

  let html = fs.readFileSync(filePath, 'utf-8');

  // === A. Réécrire les 4 cartes services ===
  // Find the cards section and replace card descriptions
  const cardPatterns = [
    { old: /(<div class="card-t">Réparation crevaison<\/div><div class="card-d">)([^<]+)(<\/div>)/, newText: ville.cards[0] },
    { old: /(<div class="card-t">Remplacement de pneu<\/div><div class="card-d">)([^<]+)(<\/div>)/, newText: ville.cards[1] },
    { old: /(<div class="card-t">Valve &(?:amp;)? pression<\/div><div class="card-d">)([^<]+)(<\/div>)/, newText: ville.cards[2] },
    { old: /(<div class="card-t">Diagnostic gratuit<\/div><div class="card-d">)([^<]+)(<\/div>)/, newText: ville.cards[3] }
  ];

  for (const cp of cardPatterns) {
    html = html.replace(cp.old, `$1${cp.newText}$3`);
  }

  // === B. Réécrire les FAQ (JSON-LD + HTML) ===
  // Replace JSON-LD FAQPage
  const faqJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": ville.faq.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  });

  html = html.replace(
    /\{"@context":"https:\/\/schema\.org","@type":"FAQPage","mainEntity":\[.*?\]\}/,
    faqJsonLd
  );

  // Replace HTML FAQ section
  const faqHtml = `<section class="faq-section" style="padding:60px 20px;max-width:800px;margin:0 auto;">
  <h2 style="font-family:var(--f1);font-size:1.6rem;color:var(--cyan);margin-bottom:30px;text-align:center;">Questions fréquentes — Dépannage pneu à ${ville.nom}</h2>
  <div style="display:flex;flex-direction:column;gap:20px;">
    <details style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:12px;padding:20px;" open>
      <summary style="font-family:var(--f1);font-weight:600;color:var(--txt);cursor:pointer;font-size:1rem;">${ville.faq[0].q}</summary>
      <p style="margin-top:12px;color:var(--txt2);line-height:1.7;font-size:0.95rem;">${ville.faq[0].a}</p>
    </details>
    <details style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:12px;padding:20px;">
      <summary style="font-family:var(--f1);font-weight:600;color:var(--txt);cursor:pointer;font-size:1rem;">${ville.faq[1].q}</summary>
      <p style="margin-top:12px;color:var(--txt2);line-height:1.7;font-size:0.95rem;">${ville.faq[1].a}</p>
    </details>
    <details style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:12px;padding:20px;">
      <summary style="font-family:var(--f1);font-weight:600;color:var(--txt);cursor:pointer;font-size:1rem;">${ville.faq[2].q}</summary>
      <p style="margin-top:12px;color:var(--txt2);line-height:1.7;font-size:0.95rem;">${ville.faq[2].a}</p>
    </details>
  </div>
</section>`;

  html = html.replace(
    /<section class="faq-section"[^]*?<\/section>/,
    faqHtml
  );

  // === C. Réécrire le bloc "En résumé" ===
  html = html.replace(
    /(<strong>En résumé :<\/strong>)[^<]+/,
    `$1 ${ville.resume}`
  );

  // === D. Ajouter/remplacer le paragraphe local après la section services tag ===
  // Insert local paragraph after the sec-sub paragraph in the services section
  const localParaHtml = `<p style="font-size:.92rem;color:var(--txt2);line-height:1.7;margin-bottom:2rem;padding:.8rem 1rem;background:rgba(255,107,53,.04);border-left:3px solid var(--orange);border-radius:0 8px 8px 0;">${ville.localParagraph}</p>`;

  // Check if local paragraph already exists (from previous run)
  if (html.includes('border-left:3px solid var(--orange)')) {
    html = html.replace(
      /<p style="font-size:\.92rem;color:var\(--txt2\);line-height:1\.7;margin-bottom:2rem;padding:\.8rem 1rem;background:rgba\(255,107,53,\.04\);border-left:3px solid var\(--orange\);border-radius:0 8px 8px 0;">[^<]+<\/p>/,
      localParaHtml
    );
  } else {
    // Insert before the cards div
    html = html.replace(
      /(<div class="cards">)/,
      `${localParaHtml}\n    $1`
    );
  }

  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`OK: ${slug}`);
}

console.log('\n=== DONE ===');
