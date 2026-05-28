import { useState, useEffect } from "react";


const MODULES = [
  { id:1, title:"La Poste Suisse", subtitle:"Terminologie spécifique", icon:"✉️", color:"#b8860b", textColor:"#1a1a1a",
    glossary:[
      {term:"NPA (Numéro Postal d'Acheminement)",def:"Code à 4 chiffres identifiant une zone de distribution postale en Suisse. Correspond au PLZ (Postleitzahl) en allemand."},
      {term:"Lettre A",def:"Courrier prioritaire livré le lendemain ouvrable, du lundi au samedi. Traité en priorité."},
      {term:"Lettre B",def:"Courrier économique livré au plus tard le 3e jour ouvrable, du lundi au vendredi. Moins cher que la lettre A."},
      {term:"Colis Priority",def:"Colis livré le lendemain ouvrable (lundi–samedi). Reconnaissable à l'étiquette jaune."},
      {term:"Colis Economy",def:"Colis livré en 2 jours ouvrables (lundi–vendredi). Plus économique que Priority."},
      {term:"Envoi recommandé",def:"Courrier avec numéro de suivi, remis uniquement contre signature. Assuré jusqu'à 500 CHF."},
      {term:"Centre de tri",def:"Installation traitant le courrier automatiquement ou manuellement avant l'acheminement vers les facteurs."},
      {term:"Avis de passage",def:"Document laissé par le facteur en cas d'absence du destinataire, indiquant où retirer l'envoi."},
      {term:"MyPost 24",def:"Automate postal disponible 24h/24 pour le dépôt et le retrait de colis."},
      {term:"EMS (Express Mail Service)",def:"Service express international de La Poste, avec délai garanti et suivi complet."},
      {term:"Scanning",def:"Lecture du code-barres à chaque étape de traitement pour garantir la traçabilité."},
      {term:"Hub postal",def:"Centre logistique où convergent de nombreux envois provenant de plusieurs régions avant redistribution."},
    ],
    questions:[
      {q:"Que signifie NPA ?",options:["Numéro Postal d'Acheminement","Numéro de Produit Agréé","Norme Postale d'Accréditation","Numéro de Passage Automatique"],answer:0},
      {q:"Quelle couleur identifie un Colis Priority ?",options:["Rouge","Bleue","Jaune","Verte"],answer:2},
      {q:"La Lettre A est livrée en combien de jours ?",options:["Le jour même","Le lendemain ouvrable","2–3 jours","4–5 jours"],answer:1},
      {q:"MyPost 24 est un :",options:["Service de recommandé","Automate postal disponible 24h/24","Centre de tri","Service de coursier"],answer:1},
      {q:"L'envoi recommandé est assuré jusqu'à :",options:["250 CHF","500 CHF","1 000 CHF","5 000 CHF"],answer:1},
    ]},
  { id:2, title:"Transport & Acheminement", subtitle:"Flux et réseaux", icon:"🚛", color:"#1B4F8A", textColor:"#ffffff",
    glossary:[
      {term:"Cross-docking",def:"Transfert direct de marchandises du quai de réception au quai d'expédition, sans stockage intermédiaire."},
      {term:"Groupage",def:"Regroupement de plusieurs petits envois de clients différents dans un même véhicule pour optimiser les coûts."},
      {term:"Dernier kilomètre",def:"Dernière étape de livraison, du dépôt local jusqu'au destinataire final. Étape la plus coûteuse et complexe."},
      {term:"Lettre de voiture (LV)",def:"Contrat de transport entre expéditeur, transporteur et destinataire. Document légal faisant foi en cas de litige."},
      {term:"Flux tendu",def:"Organisation logistique visant à minimiser les stocks par des livraisons très fréquentes et précises (Just-In-Time)."},
      {term:"Tournée",def:"Circuit de livraison planifié et optimisé permettant à un chauffeur-livreur de desservir plusieurs clients."},
      {term:"Bon de livraison (BL)",def:"Document confirmant la remise d'une marchandise au destinataire, généralement signé par ce dernier."},
    ],
    questions:[
      {q:"Qu'est-ce que le cross-docking ?",options:["Un stockage longue durée","Un transfert direct réception→expédition sans stockage","Un tri manuel des colis","Une technique de palettisation"],answer:1},
      {q:"Qu'est-ce que le 'dernier kilomètre' ?",options:["La distance max légale d'un camion","La dernière étape de livraison jusqu'au destinataire final","Le dernier tri avant livraison","La vérification finale des colis"],answer:1},
      {q:"Le 'flux tendu' consiste à :",options:["Accélérer le tri manuel","Minimiser les stocks par des livraisons fréquentes","Augmenter la capacité des entrepôts","Créer des réserves importantes"],answer:1},
      {q:"Un Bon de Livraison (BL) est :",options:["Un contrat de transport","Un document confirmant la remise d'une marchandise, signé par le destinataire","Une feuille de route","Un bordereau de douane"],answer:1},
      {q:"Le groupage consiste à :",options:["Trier les colis par poids","Regrouper des envois de différents clients dans un même véhicule","Emballer les colis ensemble","Facturer plusieurs clients en même temps"],answer:1},
    ]},
  { id:3, title:"Gestion des Stocks", subtitle:"Entrepôt & inventaire", icon:"📦", color:"#2E7D32", textColor:"#ffffff",
    glossary:[
      {term:"FIFO (First In, First Out)",def:"Premier entré, premier sorti. Les articles les plus anciens sont utilisés/sortis en premier. Essentiel pour les produits périssables."},
      {term:"LIFO (Last In, First Out)",def:"Dernier entré, premier sorti. Le dernier article rentré est le premier sorti. Utilisé en logistique de chargement."},
      {term:"Picking",def:"Opération de prélèvement des articles à des emplacements précis en entrepôt pour préparer une commande."},
      {term:"SKU (Stock Keeping Unit)",def:"Code unique identifiant précisément chaque article dans le système de gestion. Permet le suivi unitaire."},
      {term:"WMS (Warehouse Management System)",def:"Logiciel de gestion d'entrepôt pilotant les emplacements, les mouvements de stock et les expéditions."},
      {term:"Rupture de stock",def:"Situation où un article est épuisé, rendant impossible sa fourniture au client."},
      {term:"Stock de sécurité",def:"Quantité minimale de stock conservée pour pallier les imprévus (retard fournisseur, pic de commandes)."},
    ],
    questions:[
      {q:"Que signifie FIFO ?",options:["First In, First Out","Fast Item Flow Organization","Freight Import / Freight Output","Final Inventory For Operations"],answer:0},
      {q:"Qu'est-ce que le picking ?",options:["L'emballage final des commandes","Le prélèvement d'articles en entrepôt pour préparer une commande","La réception des marchandises","L'inventaire physique"],answer:1},
      {q:"Que signifie WMS ?",options:["Standard Kit Utility","Warehouse Management System","System Key Update","Weight Management Software"],answer:1},
      {q:"Une rupture de stock signifie :",options:["Un surplus de marchandises","Un article épuisé ne pouvant plus être fourni","Un stock mal rangé","Un inventaire incomplet"],answer:1},
      {q:"Le stock de sécurité sert à :",options:["Augmenter les ventes","Pallier les imprévus (retards, pics de commandes)","Réduire les coûts de stockage","Augmenter le taux de rotation"],answer:1},
    ]},
  { id:4, title:"Qualité & Sécurité", subtitle:"Normes et prévention", icon:"🛡️", color:"#C62828", textColor:"#ffffff",
    glossary:[
      {term:"EPI (Équipement de Protection Individuelle)",def:"Équipements protégeant le travailleur des risques professionnels : gants, chaussures de sécurité, casque, gilet fluorescent."},
      {term:"TMS (Troubles Musculo-Squelettiques)",def:"Pathologies touchant muscles, tendons et nerfs, dues aux gestes répétitifs et aux mauvaises postures. Première cause de maladies professionnelles."},
      {term:"Charge maximale",def:"25 kg : poids limite recommandé en Suisse pour le levage manuel sans équipement d'aide."},
      {term:"KPI (Key Performance Indicator)",def:"Indicateur clé de performance. Valeur mesurable évaluant l'efficacité d'une activité. Ex : taux de livraison à l'heure."},
      {term:"Non-conformité",def:"Écart constaté entre une situation réelle et une norme, procédure ou spécification. Doit être signalé et traité."},
      {term:"Traçabilité",def:"Capacité à reconstituer l'historique complet d'un produit à chaque étape de son parcours (production → livraison)."},
    ],
    questions:[
      {q:"Que signifie EPI ?",options:["Équipement de Protection Individuelle","Enregistrement de Prévention des Incidents","Espace de Préparation Industrielle","Évaluation des Processus Internes"],answer:0},
      {q:"Qu'est-ce qu'un TMS ?",options:["Trouble de Management Stratégique","Trouble Musculo-Squelettique","Transport de Matière Sensible","Traçage de Messages Spéciaux"],answer:1},
      {q:"La charge maximale recommandée en Suisse pour le levage manuel est :",options:["10 kg","15 kg","25 kg","40 kg"],answer:2},
      {q:"Un KPI est :",options:["Un type d'emballage","Un logiciel d'entrepôt","Un indicateur clé de performance","Un protocole de sécurité"],answer:2},
      {q:"Qu'est-ce qu'une non-conformité ?",options:["Un incident grave","Un écart par rapport à une norme ou procédure définie","Un article manquant en stock","Un colis endommagé"],answer:1},
    ]},
  { id:5, title:"Douanes & International", subtitle:"Commerce mondial", icon:"🌍", color:"#6A1B9A", textColor:"#ffffff",
    glossary:[
      {term:"CN22",def:"Formulaire douanier pour envois courrier vers l'étranger, jusqu'à 2 kg et valeur ≤ 1 000 CHF."},
      {term:"CN23",def:"Déclaration en douane pour envois de valeur > 1 000 CHF ou marchandises soumises à autorisation."},
      {term:"TVA à l'importation",def:"Taxe prélevée lors de l'entrée de marchandises en Suisse. Taux normal : 8,1% (anciennement 7,7%)."},
      {term:"Incoterms",def:"International Commercial Terms. 11 termes standardisés définissant la répartition des coûts et risques entre acheteur et vendeur."},
      {term:"DDP (Delivered Duty Paid)",def:"Incoterm : le vendeur prend en charge tous les frais et droits jusqu'à la livraison au lieu de destination."},
      {term:"EXW (Ex Works)",def:"Incoterm : l'acheteur supporte tous les frais et risques dès la sortie des locaux du vendeur."},
    ],
    questions:[
      {q:"Le formulaire CN22 est utilisé pour des envois de valeur :",options:["< 100 CHF","≤ 1 000 CHF et ≤ 2 kg","> 1 000 CHF","Sans valeur marchande uniquement"],answer:1},
      {q:"Que signifie DDP en Incoterms ?",options:["Direct Delivery Process","Delivered Duty Paid","Distribution and Dispatch Protocol","Duty Declared Package"],answer:1},
      {q:"Les Incoterms définissent :",options:["Les tarifs postaux internationaux","La répartition des coûts et risques entre acheteur et vendeur","Les délais de livraison garantis","Les normes d'emballage"],answer:1},
      {q:"EXW signifie que :",options:["Le vendeur livre jusqu'au port","L'acheteur est responsable dès la sortie des locaux du vendeur","Les droits de douane sont inclus","La livraison est garantie en 24h"],answer:1},
      {q:"La CN23 est requise pour :",options:["Tous les envois postaux internationaux","Les envois de valeur > 1 000 CHF ou soumis à autorisation","Les lettres de moins de 2 kg vers l'étranger","Les colis > 10 kg uniquement"],answer:1},
    ]},
  { id:6, title:"Logistique Générale", subtitle:"Concepts fondamentaux", icon:"⚙️", color:"#37474F", textColor:"#ffffff",
    glossary:[
      {term:"Supply Chain",def:"Chaîne logistique couvrant l'ensemble du parcours d'un produit, de la matière première jusqu'au client final."},
      {term:"JIT (Just-In-Time)",def:"Stratégie logistique visant à livrer les marchandises exactement au moment où elles sont nécessaires, minimisant les stocks."},
      {term:"EDI (Electronic Data Interchange)",def:"Échange électronique standardisé de documents commerciaux (commandes, factures) entre partenaires."},
      {term:"RFID",def:"Radio Frequency IDentification. Identification sans contact par ondes radio. Plus rapide et pratique que le code-barres (pas besoin de visée directe)."},
      {term:"Reverse Logistics",def:"Logistique inverse : gestion des retours de produits du client vers l'entreprise ou le fournisseur."},
      {term:"Lead Time",def:"Délai de livraison total : temps écoulé entre la commande du client et sa réception effective."},
    ],
    questions:[
      {q:"Que signifie 'Supply Chain' ?",options:["Chaîne de production uniquement","Chaîne logistique de la matière première jusqu'au client final","Réseau de fournisseurs","Système de transport"],answer:1},
      {q:"Le JIT vise à :",options:["Augmenter les stocks de sécurité","Livrer les marchandises exactement quand nécessaires, minimisant les stocks","Accélérer la production","Réduire le nombre de fournisseurs"],answer:1},
      {q:"La RFID diffère du code-barres car :",options:["Elle est moins précise","Elle ne nécessite pas de visée directe (lecture sans contact)","Elle est plus lente","Elle ne peut identifier qu'un seul article à la fois"],answer:1},
      {q:"La Reverse Logistics gère :",options:["Les expéditions urgentes","Les retours de produits du client vers l'entreprise","Les imports internationaux","La logistique des véhicules"],answer:1},
      {q:"Le Lead Time désigne :",options:["La vitesse de traitement en entrepôt","Le délai total entre la commande et la réception par le client","La durée de stockage maximum","Le temps de chargement d'un camion"],answer:1},
    ]},
  { id:7, title:"Outils Informatiques", subtitle:"Systèmes & technologies", icon:"🖥️", color:"#0277BD", textColor:"#ffffff",
    glossary:[
      {term:"WMS (Warehouse Management System)",def:"Logiciel de gestion d'entrepôt gérant les emplacements, les mouvements de stock, le picking et les expéditions."},
      {term:"TMS (Transport Management System)",def:"Logiciel de planification et de suivi des transports. Optimise les tournées, les véhicules et les documents."},
      {term:"ERP (SAP)",def:"Enterprise Resource Planning. Système d'information intégrant tous les processus de l'entreprise (achats, ventes, comptabilité, logistique)."},
      {term:"PDA / Terminal de scan",def:"Terminal portable (pistolet ou tablette) avec scanner intégré pour lire les codes-barres en entrepôt ou livraison."},
      {term:"Track & Trace",def:"Système de suivi en temps réel permettant de connaître l'emplacement et le statut d'un envoi à tout moment."},
      {term:"API",def:"Application Programming Interface. Interface permettant à deux logiciels de communiquer et d'échanger des données."},
    ],
    questions:[
      {q:"Que signifie WMS ?",options:["Warehouse Management System","Worldwide Mail Service","Web Monitoring Software","Warehouse Mapping Solution"],answer:0},
      {q:"SAP est principalement :",options:["Un système de scan portable","Un ERP intégrant tous les processus de l'entreprise","Un logiciel de transport uniquement","Un outil de géolocalisation"],answer:1},
      {q:"Track & Trace permet :",options:["De planifier les tournées","De connaître l'emplacement et le statut d'un envoi en temps réel","De gérer les stocks en entrepôt","D'automatiser la facturation"],answer:1},
      {q:"Un TMS est utilisé pour :",options:["La gestion des stocks en entrepôt","La planification et le suivi des transports","La comptabilité d'entreprise","La gestion des ressources humaines"],answer:1},
      {q:"Qu'est-ce qu'une API en logistique ?",options:["Un type de terminal de scan","Une interface permettant à deux logiciels de communiquer","Un protocole de transport","Un format de code-barres"],answer:1},
    ]},
];

const CH1 = {id:"c1",num:1,title:"Les systèmes de distribution",icon:"🚚",color:"#1565C0",textColor:"#fff",
 content:[
  {T:"intro",x:"La logistique de distribution a pour objectif de faire parvenir les marchandises au client, au bon endroit, au bon moment et dans les meilleures conditions. Elle partage de nombreux points communs avec la logistique d'approvisionnement."},
  {T:"section",x:"Les fonctions de l'exécution des commandes"},
  {T:"svg",h:90,code:`<svg viewBox="0 0 680 80" xmlns="http://www.w3.org/2000/svg" style="width:100%;border-radius:8px;background:#f8fafc"><polygon points="10,12 148,12 163,40 148,68 10,68 25,40" fill="#dbeafe" stroke="#1565C0" stroke-width="1.5"/><text x="86" y="36" text-anchor="middle" font-size="11" font-weight="700" fill="#1e3a5f">Stockage</text><polygon points="175,12 313,12 328,40 313,68 175,68 190,40" fill="#bfdbfe" stroke="#1565C0" stroke-width="1.5"/><text x="251" y="30" text-anchor="middle" font-size="10" font-weight="700" fill="#1e3a5f">Préparation de</text><text x="251" y="44" text-anchor="middle" font-size="10" font-weight="700" fill="#1e3a5f">commandes</text><polygon points="340,12 478,12 493,40 478,68 340,68 355,40" fill="#93c5fd" stroke="#1565C0" stroke-width="1.5"/><text x="416" y="30" text-anchor="middle" font-size="10" font-weight="700" fill="#1e3a5f">Emballage &amp;</text><text x="416" y="44" text-anchor="middle" font-size="10" font-weight="700" fill="#1e3a5f">expédition</text><polygon points="505,12 643,12 658,40 643,68 505,68 520,40" fill="#60a5fa" stroke="#1565C0" stroke-width="1.5"/><text x="581" y="30" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Transport &amp;</text><text x="581" y="44" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">remise</text></svg>`},
  {T:"section",x:"Facteurs influençant la logistique de distribution"},
  {T:"list",items:["Exigences en matière de livraison (délais, qualité, fiabilité)","Critères écologiques (réduction des émissions CO2)","Ouverture des marchés (concurrence internationale)","Nouvelles technologies de l'information (e-commerce, tracking)","Nombre croissant de prestataires (concurrence accrue)","Infrastructure de transport (routes, rail, ports, aéroports)","Évolution du marché du travail (pénurie de chauffeurs)","Les coûts logistiques (optimisation permanente)"]},
  {T:"hl",bg:"#e3f2fd",b:"#1565C0",ti:"Principe fondamental",x:"Chaque prestataire cherche à proposer les meilleurs services de livraison au prix le plus bas possible, tout en respectant les exigences du client."},
  {T:"section",x:"Les canaux de vente"},
  {T:"img",src:"/images/c2.png",alt:"Vente directe — Producteur vers consommateurs finaux"},
  {T:"text",x:"La vente directe : le fabricant vend sans intermédiaire directement au client final. Justifiée quand le nombre d'acheteurs est limité, concentrés géographiquement, avec une demande constante. Exemples : magasin à la ferme, magasin d'usine, vente en ligne du fabricant."},
  {T:"img",src:"/images/c3.png",alt:"Vente indirecte — Via grossiste vers consommateurs"},
  {T:"text",x:"La vente indirecte : les marchandises transitent par un intermédiaire (grossiste, détaillant). Justifiée quand les acheteurs sont nombreux, que les produits viennent de plusieurs fabricants, ou que l'after-sales service peut être géré par le commerçant."},
  {T:"section",x:"Les niveaux de distribution"},
  {T:"img",src:"/images/c4.png",alt:"Distribution à 2 et 3 niveaux"},
  {T:"text",x:"Distribution à 2 niveaux : Production → Entrepôt central/intermédiaire → Clients. Distribution à 3 niveaux : Production → Entrepôt central/grossiste → Dépôt de vente/détaillant → Clients."},
  {T:"img",src:"/images/c5.png",alt:"Distribution classique en Suisse"},
  {T:"img",src:"/images/c6.png",alt:"Schéma distribution classique — flux complet"},
  {T:"hl",bg:"#fff8e1",b:"#f59e0b",ti:"Cross-Docking — définition clé",x:"Transit sans stockage : les marchandises arrivent, sont déchargées, préparées et assemblées, puis rechargées immédiatement vers leur destination. Les entrepôts régionaux deviennent des plates-formes de produits frais."},
  {T:"section",x:"La distribution classique vs décentralisée"},
  {T:"img",src:"/images/c7.png",alt:"Distribution décentralisée en Suisse"},
  {T:"list",items:["Distribution CLASSIQUE : entrepôt central → entrepôts régionaux → points de vente. L'entrepôt central stocke les produits importés centralement. Les centres régionaux s'approvisionnent en produits frais locaux.","Distribution DÉCENTRALISÉE : centrales spécialisées par type (Non-food, Surgelés, Colonial, Produits frais). Les points de vente commandent directement."]},
  {T:"section",x:"La vente par correspondance / e-commerce"},
  {T:"img",src:"/images/c8.png",alt:"Boutique en ligne — 3 départements"},
  {T:"hl",bg:"#ede7f6",b:"#6A1B9A",ti:"Les 3 départements d'une boutique en ligne",x:"Service client / Administration : réception commande, vérification solvabilité, confirmation, informations client, traitement réclamations.\n\nLogistique : se procurer la marchandise, stockage, sortie du stock / préparation commande, bulletin de livraison, emballage, expédition, traitement retours.\n\nComptabilité : facturation, contrôle des débiteurs (suivi paiements), rappels, poursuites."},
  {T:"gloss",items:[
    {term:"Canal de distribution",def:"Voie par laquelle une marchandise transite du producteur jusqu'au consommateur final. Peut être direct (sans intermédiaire) ou indirect (via grossiste/détaillant)."},
    {term:"Vente directe",def:"Le fabricant vend directement au client final, sans intermédiaire. Justifiée quand : nombre limité d'acheteurs, concentration géographique, demande constante. Avantage : prix plus bas (pas de marge intermédiaire)."},
    {term:"Vente indirecte",def:"Les marchandises transitent par au moins un intermédiaire (grossiste ou détaillant). Justifiée quand les acheteurs sont nombreux, les produits proviennent de plusieurs fabricants, ou l'after-sales peut être assuré par le commerçant."},
    {term:"Grossiste",def:"Commerçant intermédiaire qui achète en grande quantité chez les fabricants et revend aux détaillants. N'a généralement pas de contact direct avec le consommateur final."},
    {term:"Détaillant",def:"Commerçant qui achète chez le grossiste et vend à l'unité au consommateur final. Dernier maillon de la chaîne de distribution."},
    {term:"Distribution à un niveau",def:"Livraison directe du fabricant au client, sans intermédiaire. Exemples : paysan au bord de la route, livraison de béton, enlèvement par le client lui-même."},
    {term:"Distribution multiniveaux",def:"Passe par au moins un entrepôt ou intermédiaire entre le fabricant et le client. À 2 niveaux : entrepôt central → client. À 3 niveaux : entrepôt central → dépôt de vente → client."},
    {term:"Cross-docking",def:"Marchandises reçues d'un côté d'une plate-forme sont immédiatement préparées et expédiées de l'autre côté, SANS stockage intermédiaire. Réduit les coûts et délais."},
    {term:"Allotissement des commandes",def:"Préparation des marchandises par lots destinés à des points de vente spécifiques. Pratiqué sur les plates-formes décentralisées (cross-docking)."},
    {term:"E-commerce",def:"Commerce électronique : vente de biens et services via internet. Gestion en 3 départements : service client, logistique, comptabilité. Les retours sont gérés par la logistique."},
    {term:"Solvabilité",def:"Capacité d'un client à payer ses dettes. Dans l'e-commerce, la vérification de la solvabilité est effectuée par le service client avant de confirmer la commande."},
    {term:"Plates-formes de produits frais",def:"Entrepôts régionaux reconvertis en centres de cross-docking spécialisés dans la distribution rapide de produits frais. Les produits viennent de producteurs locaux."},
    {term:"After-sales service",def:"Service après-vente (SAV) : assistance fournie au client après l'achat du produit. Dans la vente indirecte, il peut être pris en charge par le commerçant intermédiaire."},
    {term:"Exécution des commandes",def:"Processus en 4 étapes : Stockage → Préparation de commandes → Emballage et expédition → Transport et remise. C'est le cœur de la logistique de distribution."},
    {term:"Entrepôt central",def:"Entrepôt qui stocke centralement les marchandises achetées en grande quantité (produits importés, non alimentaires). Approvisionne les entrepôts régionaux en grandes quantités."},
  ]},
 ],
 questions:[
  {q:"Quelles sont les 4 étapes de l'exécution des commandes dans l'ordre ?",options:["Commande, paiement, livraison, retour","Stockage, préparation de commandes, emballage/expédition, transport/remise","Réception, tri, emballage, distribution","Achat, stockage, vente, facturation"],answer:1},
  {q:"La vente directe est justifiée quand (plusieurs réponses) :",options:["Le nombre d'acheteurs est limité","Les acheteurs sont concentrés géographiquement","La demande est constante","Les produits viennent de fabricants différents"],answers:[0,1,2],multi:true},
  {q:"Le Cross-Docking signifie :",options:["Un stockage longue durée en entrepôt central","Un transit sans stockage : déchargement, préparation et assemblage immédiats","Une méthode de tri postal","Un type de palette réutilisable"],answer:1},
  {q:"La distribution à un niveau correspond à :",options:["Livraison via plusieurs entrepôts intermédiaires","Livraison directe du fabricant au client final","Distribution via un réseau de franchises","Vente uniquement en ligne"],answer:1},
  {q:"Dans une boutique en ligne, quels tâches appartiennent au département Logistique ?",options:["Facturation","Sortie du stock / préparation commande","Traitement des retours","Vérification de la solvabilité","Emballage"],answers:[1,2,4],multi:true},
  {q:"La distribution classique des grands distributeurs s'organise ainsi :",options:["Points de vente livrent directement les clients","Entrepôt central → entrepôts régionaux → points de vente","Chaque magasin passe ses propres commandes aux fournisseurs","Cross-docking uniquement"],answer:1},
  {q:"Un niveau supplémentaire de distribution se justifie quand :",options:["Les coûts d'entreposage sont plus élevés que les économies de transport","Les coûts d'entreposage ne dépassent pas les économies liées au transport","Le client est proche du fabricant","Le nombre de produits est très limité"],answer:1},
  {q:"Quels exemples illustrent la vente directe ?",options:["Commerce de détail","Magasin à la ferme","Vente en ligne du fabricant","Commerce de l'automobile","Magasin d'usine"],answers:[1,2,4],multi:true},
  {q:"Dans la distribution décentralisée, les centrales sont :",options:["Toutes polyvalentes","Spécialisées par type de produit (Non-food, Surgelés, Colonial, Produits frais)","Uniquement régionales","Uniquement nationales"],answer:1},
  {q:"Dans une boutique en ligne, qui gère la 'vérification de la solvabilité' ?",options:["La logistique","La comptabilité","Le service client / administration","Le transporteur"],answer:2},
  {q:"Dans une boutique en ligne, qui gère la 'facturation' et le 'contrôle des débiteurs' ?",options:["La logistique","Le service client","La comptabilité","Le transporteur"],answer:2},
  {q:"Les entrepôts régionaux dans la distribution décentralisée deviennent :",options:["Des entrepôts de stockage longue durée","Des plates-formes de produits frais fonctionnant en cross-docking","Des centres de production","Des bureaux de vente"],answer:1},
  {q:"Quels facteurs influencent la logistique de distribution ?",options:["Exigences de livraison","Critères écologiques","Nouvelles technologies","Les coûts","Le poids des colis uniquement"],answers:[0,1,2,3],multi:true},
  {q:"Qu'est-ce que l'allotissement des commandes ?",options:["Le tri des lettres par tournée","La préparation des marchandises par lots pour des points de vente spécifiques","Le chargement des camions","La vérification de la qualité des produits"],answer:1},
  {q:"L'after-sales service dans la vente indirecte est assuré par :",options:["Le fabricant uniquement","Le transporteur","Le commerçant intermédiaire (détaillant)","La poste"],answer:2},
 ]};

const CH2 = {id:"c2",num:2,title:"Le marché des services de distribution",icon:"🏢",color:"#00695C",textColor:"#fff",
 content:[
  {T:"intro",x:"L'ouverture du marché postal a créé une concurrence entre prestataires privés et La Poste Suisse, dont les droits et devoirs sont strictement encadrés par la loi postale du 17 décembre 2010."},
  {T:"section",x:"3 catégories de services postaux"},
  {T:"img",src:"/images/c9.png",alt:"Services La Poste — Réservés, Non réservés et Concurrentiels"},
  {T:"hl",bg:"#e8f5e9",b:"#2E7D32",ti:"Services réservés / non réservés / concurrentiels",x:"Services RÉSERVÉS : monopole de La Poste. Aucune concurrence. Lettres jusqu'à 50g à l'intérieur du pays et en provenance de l'étranger. Mêmes prix sur tout le territoire.\n\nServices NON RÉSERVÉS : La Poste a un mandat de la Confédération mais la concurrence est autorisée. Ex : colis jusqu'à 20 kg, lettres > 50g, journaux en abonnement, paiements et virements.\n\nServices CONCURRENTIELS : La Poste propose librement, sans obligation d'universalité. Ex : messagerie rapide, colis > 20 kg, distribution matinale de journaux."},
  {T:"section",x:"La PostLogistics — 4 centres colis"},
  {T:"hl",bg:"#e3f2fd",b:"#1565C0",ti:"Les 4 centres colis PostLogistics en Suisse",x:"• Vétroz (Valais / VS)\n• Daillens (Vaud / VD)\n• Härkingen (Soleure / SO)\n• Frauenfeld (Thurgovie / TG)\n→ Ces 4 centres constituent l'épine dorsale du système d'acheminement des colis. La poste colis recourt au trafic combiné : collecte en camions, transport de nuit par le rail."},
  {T:"section",x:"Le réseau courrier suisse"},
  {T:"img",src:"/images/c11.png",alt:"Carte Suisse — CC, CL et CLRV"},
  {T:"hl",bg:"#ede7f6",b:"#6A1B9A",ti:"CC, CL et CRLV — Infrastructure du réseau",x:"3 Centres Courrier (CC) : Zurich-Mülligen · Härkingen · Eclépens\n\n6 Centres Logistiques (CL) : Bâle · Gossau · Ostermundigen · Kriens · Genève · Cadenazzo\n\n2 Centres de Retours et Codage Vidéo (CRLV) : Sion · Coire\n\nLe réseau traite l'ensemble du courrier suisse et assure la redistribution vers les facteurs."},
  {T:"section",x:"Le tri automatique des colis — 8 étapes"},
  {T:"img",src:"/images/c10.png",alt:"Centre de tri colis — Plan des 8 étapes de traitement"},
  {T:"hl",bg:"#fff8e1",b:"#f59e0b",ti:"Processus dans un centre de tri colis",x:"1. Réception des envois des Bases Colis et des offices de poste.\n2. Identification automatique de l'adresse par scanner (ou codage vidéo si illisible).\n3. Le colis se place sur un plateau inclinable de la machine de tri.\n4. Le plateau éjecte le colis sur la glissière de destination.\n5. Les colis sont chargés sur un chariot.\n6. Transport des chariots en fonction des adresses de destination.\n7. Expédition des colis triés vers leur région de livraison.\n8. Les colis non identifiés restent sur la machine et sont triés manuellement."},
  {T:"section",x:"Le marché DEC et Cargo Domicile"},
  {T:"text",x:"DEC = Documents, Express, Colis. La Poste est le leader du marché DEC, suivie de DPD puis DHL. Ce marché connaît une forte expansion grâce au développement du e-commerce."},
  {T:"hl",bg:"#f0fdf4",b:"#15803d",ti:"Cargo Domicile — Système '24 heures'",x:"Soir : collecte des colis par camions depuis les offices de poste.\nNuit : transport ferroviaire entre les 4 centres colis (trafic grandes distances).\nMatin : transbordement et redistribution par camions vers les facteurs.\n\nLe soir et le matin : transbordement (passage d'un mode de transport à un autre)."},
  {T:"gloss",items:[
    {term:"Loi postale (17 décembre 2010)",def:"Loi suisse réglant les droits et devoirs de La Poste Suisse. Elle définit les services réservés (monopole), non réservés et concurrentiels, et impose à la Poste de couvrir tout le territoire aux mêmes prix."},
    {term:"Service universel / de base",def:"Garantie de l'État : La Poste doit offrir un service de base à des prix identiques sur tout le territoire suisse, quelle que soit la région. Une lettre coûte le même prix partout."},
    {term:"Services réservés",def:"Monopole de La Poste. Aucune concurrence autorisée. Concerne les lettres jusqu'à 50g, aussi bien à l'intérieur du pays qu'en provenance de l'étranger. Exemples : lettres A et B standard."},
    {term:"Services non réservés",def:"La Poste a un mandat de la Confédération mais la concurrence est autorisée. Exemples : colis jusqu'à 20 kg, lettres > 50g, distribution de journaux en abonnement, paiements et virements."},
    {term:"Services concurrentiels",def:"La Poste propose librement, sans obligation légale d'universalité. Exemples : messagerie rapide, lettres et colis express, envois de groupage, colis > 20 kg, distribution matinale de journaux."},
    {term:"DEC (Documents, Express, Colis)",def:"Les 3 grandes catégories d'envois professionnels. La Poste Suisse est le leader DEC, suivie de DPD puis DHL. Ce marché est en forte expansion grâce au commerce électronique."},
    {term:"PostLogistics",def:"Entité commerciale de La Poste gérant la logistique des colis. Dispose de 4 centres colis : Vétroz (VS), Daillens (VD), Härkingen (SO), Frauenfeld (TG). Ces centres forment l'épine dorsale du réseau colis."},
    {term:"CC (Centre Courrier)",def:"Centre spécialisé dans le tri du courrier (lettres). Il en existe 3 en Suisse : Zurich-Mülligen, Härkingen, Eclépens. Ils reçoivent les envois des CL et les trient pour la distribution."},
    {term:"CL (Centre Logistique)",def:"Centre gérant le stockage temporaire du courrier et la redistribution aux facteurs. Il en existe 6 : Bâle, Gossau, Ostermundigen, Kriens, Genève, Cadenazzo."},
    {term:"CRLV (Centre de Retours et Codage Vidéo Lettres)",def:"Traite les envois que la machine de tri n'a pas pu identifier automatiquement (codage vidéo = opérateur humain lit l'adresse via caméra) et gère les retours. 2 en Suisse : Sion et Coire."},
    {term:"Cargo Domicile",def:"Système de trafic combiné rail-route de La Poste : les colis sont collectés par camions le soir, transportés par train de nuit entre les centres, puis redistribués par camions le matin. Système '24 heures'."},
    {term:"Transbordement",def:"Action de faire passer une marchandise d'un moyen de transport à un autre. Dans Cargo Domicile : passage du camion au train (soir) puis du train au camion (matin)."},
    {term:"Codage vidéo",def:"Système permettant à un opérateur humain de lire via une caméra l'adresse d'un colis que la machine de tri n'a pas pu identifier automatiquement. Évite les retours inutiles."},
    {term:"DHL, DPD, FedEx, UPS, TNT",def:"Principaux concurrents de La Poste sur les services non réservés. DHL (Deutsche Post AG), DPD (groupe GeoPost), FedEx (USA), UPS (USA), TNT Swiss Post AG (coentreprise TNT Express et Swiss Post International)."},
    {term:"Trafic combiné rail-route",def:"Utilisation successive du camion et du train pour transporter des marchandises. Avantages : économique, écologique, rapide sur longue distance. La PostLogistics l'utilise pour l'acheminement nocturne des colis."},
  ]},
 ],
 questions:[
  {q:"La loi postale suisse date du :",options:["17 décembre 2005","17 décembre 2010","1er janvier 2008","1er mars 2012"],answer:1},
  {q:"Quels sont les 4 centres colis PostLogistics ?",options:["Zurich, Berne, Genève, Bâle","Vétroz, Daillens, Härkingen, Frauenfeld","Sion, Lausanne, Berne, Zurich","Eclépens, Mülligen, Härkingen, Coire"],answer:1},
  {q:"Que signifie DEC ?",options:["Distribution Envois Courrier","Documents Express Colis","Dépôt Expédition Colis","Distribution Économique Centralisée"],answer:1},
  {q:"Les services RÉSERVÉS de La Poste concernent :",options:["Tous les colis jusqu'à 20 kg","Les lettres jusqu'à 50g à l'intérieur et en provenance de l'étranger","Les colis express uniquement","Les journaux et périodiques"],answer:1},
  {q:"Combien y a-t-il de Centres Courrier (CC) en Suisse ?",options:["2","3","6","8"],answer:1},
  {q:"Combien y a-t-il de Centres Logistiques (CL) en Suisse ?",options:["2","3","6","8"],answer:2},
  {q:"Où se trouvent les 2 CRLV de La Poste ?",options:["Zurich et Bâle","Genève et Lausanne","Sion et Coire","Berne et Lugano"],answer:2},
  {q:"Dans le système Cargo Domicile, quand les colis sont-ils transportés par train ?",options:["Le matin","La nuit","Le midi","L'après-midi"],answer:1},
  {q:"Quels prestataires sont concurrents de La Poste sur les services non réservés ?",options:["CFF","DHL","DPD","FedEx","Swisscom"],answers:[1,2,3],multi:true},
  {q:"Le codage vidéo sert à :",options:["Filmer les employés","Identifier manuellement les colis non reconnus par le scanner automatique","Contrôler la sécurité en entrepôt","Enregistrer les livraisons pour preuve"],answer:1},
  {q:"Quelle est la différence entre CC et CL dans le réseau courrier ?",options:["Aucune différence","CC trie le courrier, CL gère le stockage temporaire et redistribution aux facteurs","CL trie les colis, CC trie les lettres","CC est pour l'international, CL pour la Suisse"],answer:1},
  {q:"La Poste est-elle soumise à la concurrence pour ses services réservés ?",options:["Oui, depuis 2010","Non, c'est un monopole protégé par la loi","Oui, mais uniquement pour les lettres > 50g","Non, sauf pour les livraisons à l'étranger"],answer:1},
  {q:"Dans le centre de tri colis, que se passe-t-il avec les colis non identifiés ?",options:["Ils sont retournés immédiatement à l'expéditeur","Ils restent sur la machine et sont triés manuellement","Ils sont détruits après 7 jours","Ils sont stockés dans un entrepôt spécial"],answer:1},
  {q:"Quelles informations contient le code-barres sur chaque caissette de courrier ?",options:["La valeur du contenu","La provenance, le mode et la destination","L'heure de collecte et le nom du facteur","Le NPA et le nom du destinataire"],answer:1},
  {q:"Le marché DEC connaît une forte expansion grâce à :",options:["L'augmentation du courrier papier","Le développement du commerce électronique","La création de nouveaux offices de poste","La baisse des tarifs postaux"],answer:1},
 ]};


const CH3 = {id:"c3",num:3,title:"Les emballages",icon:"📦",color:"#E65100",textColor:"#fff",
 content:[
  {T:"intro",x:"L'emballage est un système complexe qui protège, transporte, stocke et vend les marchandises. Sa conception obéit à des normes techniques précises et doit répondre à de multiples contraintes tout au long de la chaîne logistique."},
  {T:"section",x:"Terminologie officielle (norme DIN 55405)"},
  {T:"img",src:"/images/c12.png",alt:"Terminologie officielle DIN 55405"},
  {T:"img",src:"/images/c13.png",alt:"Illustrations emballage — Matériel, Produit, Accessoires, Unité, Paquet"},
  {T:"hl",bg:"#fce4ec",b:"#C62828",ti:"Les termes fondamentaux de l'emballage",x:"Matériel d'emballage : matière brute utilisée pour fabriquer l'emballage (papier, carton, bois, métal, verre, plastique).\nMoyen d'emballage : produit fabriqué à partir du matériel, destiné à contenir la marchandise. Ex : boîtes en carton, caisses, bouteilles, tubes, palettes.\nAccessoires d'emballage : éléments complétant le moyen d'emballage. Ex : colle, ruban adhésif, ficelle, matériau de rembourrage.\nEmballage = Moyen d'emballage + Accessoires d'emballage.\nPaquet = Produit emballé (contenu) + Emballage.\nUnité d'emballage = Paquet prêt à être envoyé ou entreposé.\nEmballage jetable : à usage unique, recyclé ou jeté après utilisation.\nEmballage repris (consigné) : réutilisable, retourné après usage."},
  {T:"section",x:"Les termes non officiels"},
  {T:"list",items:["Emballage de vente : présente la marchandise au client","Emballage factice : fait croire qu'il contient plus qu'il n'en contient réellement","Suremballage : protège l'emballage de vente lors du transport","Emballage final : film étirable ou rétractable pour le transport"]},
  {T:"section",x:"Les 5 fonctions de l'emballage"},
  {T:"list",items:["Protection INTÉRIEURE : protège la marchandise de l'humidité, lumière, chaleur, chocs, corrosion, vol","Protection EXTÉRIEURE : protège l'environnement des propriétés dangereuses du produit (tranchants, liquides, produits nocifs)","Entreposage : regroupe les objets en vrac pour leur stockage","Transport : facilite le chargement/déchargement, permet l'empilage","Vente : support publicitaire efficace, attire l'attention de l'acheteur"]},
  {T:"section",x:"Les contraintes de l'emballage"},
  {T:"hl",bg:"#fce4ec",b:"#C62828",ti:"Contraintes mécaniques détaillées",x:"Chutes : hauteur standard de test = 1,2 mètre. Facteurs : hauteur, poids du colis, sol, type d'impact.\nChocs : lors du chargement de palettes, wagons (chocs de manœuvre), conteneurs.\nCompression : risque d'écrasement. Prévention : couches intermédiaires, étagères, marchandises lourdes en bas.\nSecousses/vibrations : routes irrégulières, aiguillages, moteurs, mer. Les secousses dispersent le produit dans le matériau de rembourrage → choisir un emballage absorbant et solide."},
  {T:"text",x:"Contraintes climatiques : 5 zones sur Terre (polaire, continental, tempéré, sec, tropical). Problème majeur : la condensation. Solution : absorbeur d'humidité dans l'emballage si nécessaire."},
  {T:"text",x:"Protection contre la corrosion : méthode VCI (Volatile Corrosion Inhibitor). Composé volatile se déposant en couche protectrice sur les surfaces métalliques. Disponible en poudre, chips, feutre ou solvant."},
  {T:"img",src:"/images/c14.png",alt:"Marquage IPPC — DE-BW / HT DB avec légende"},
  {T:"hl",bg:"#fff8e1",b:"#f59e0b",ti:"Marquage IPPC (emballages en bois)",x:"L'IPPC (Convention Internationale pour la Protection des Végétaux) impose un marquage sur les emballages en bois pour prévenir l'importation de nuisibles.\n\nStructure du marquage : Logo IPPC | Code pays-région (ex: DE-BW) | Numéro producteur (ex: 4931003) | Type de traitement (HT = Heat Treatment = traitement thermique) | Écorcé (DB = Debarked)\n\nExemple : DE-BW / 4931003 / HT DB"},
  {T:"hl",bg:"#e8f5e9",b:"#2E7D32",ti:"Recommandations La Poste",x:"• L'emballage doit être adapté au poids, à la taille et à la sensibilité du contenu.\n• Les colis de moins de 10 kg ne doivent PAS être ficelés manuellement : la ficelle peut bloquer les machines de tri.\n• La Poste recommande les Dispobox ou Post-Pac pour les colis < 10 kg."},
  {T:"gloss",items:[
    {term:"Matériel d'emballage",def:"Matière brute à partir de laquelle un emballage est fabriqué. Exemples : papier, carton, bois, métal, verre, plastique. C'est la matière première de l'emballage."},
    {term:"Produit emballé",def:"L'objet devant être emballé — le contenu de l'emballage. Peut être un aliment, un appareil électronique, un médicament, etc."},
    {term:"Moyen d'emballage",def:"Produit fabriqué à partir du matériel d'emballage, destiné à contenir et protéger la marchandise. Exemples : boîtes en carton, caisses en bois, bouteilles en verre, tubes en plastique, palettes."},
    {term:"Accessoires d'emballage",def:"Éléments complétant le moyen d'emballage : colle, ruban adhésif, ficelle, ruban plastique, matériau de rembourrage (polystyrène, papier bulle, papier froissé)."},
    {term:"Emballage (= moyen + accessoires)",def:"Formule fondamentale : Emballage = Moyen d'emballage + Accessoires d'emballage. C'est le contenant complet qui protège et conditionne la marchandise."},
    {term:"Paquet",def:"Formule : Paquet = Produit emballé (contenu) + Emballage. C'est l'ensemble complet contenant + contenu, prêt à être manipulé."},
    {term:"Unité d'emballage",def:"Paquet prêt à être envoyé ou entreposé. C'est l'unité logistique de base pour le transport et le stockage."},
    {term:"Emballage jetable vs repris",def:"Jetable : usage unique, recyclé ou mis aux déchets après utilisation. Repris (consigné) : réutilisable, retourné au fournisseur après usage (ex : caisses de bouteilles, fûts, palettes EPAL)."},
    {term:"Emballage factice",def:"Emballage conçu pour paraître plus grand qu'il ne l'est réellement, donnant l'illusion d'une plus grande quantité. Pratique marketing qui peut tromper le consommateur."},
    {term:"Hauteur standard de chute pour tests",def:"1,2 mètre. C'est la hauteur standardisée utilisée pour tester la résistance aux chutes d'un emballage. Les tests vérifient que le contenu n'est pas endommagé après une chute de cette hauteur."},
    {term:"VCI (Volatile Corrosion Inhibitor)",def:"Inhibiteur volatile de corrosion. Composé chimique qui se sublime (passe de l'état solide à gazeux) et se dépose en couche moléculaire protectrice sur les surfaces métalliques pour prévenir la rouille. Disponible en poudre, chips, feutre ou solvant."},
    {term:"IPPC (Convention Internationale pour la Protection des Végétaux)",def:"Convention internationale imposant des mesures phytosanitaires pour prévenir la propagation de nuisibles via les emballages en bois. Tous les emballages en bois utilisés dans le commerce international doivent porter le marquage IPPC."},
    {term:"ISPM 15 (Norme Internationale pour les Mesures Phytosanitaires)",def:"Norme de l'IPPC imposant le traitement des emballages en bois (palettes, caisses) pour éliminer les parasites. Traitement HT (thermique) : chauffage à 56°C pendant 30 min minimum."},
    {term:"HT (Heat Treatment) et DB (Debarked)",def:"HT = traitement thermique (chauffage à 56°C/30min pour éliminer les parasites). DB = écorcé (écorce retirée pour réduire le risque d'organismes nuisibles). Ces mentions figurent obligatoirement sur le marquage IPPC des emballages en bois."},
    {term:"5 zones climatiques",def:"Polaire, Continental, Tempéré, Sec, Tropical. Le type de zone traversée lors du transport influence le choix de l'emballage (protection contre humidité, chaleur, froid). La condensation est le problème le plus fréquent."},
    {term:"Protection extérieure",def:"L'emballage protège l'ENVIRONNEMENT des propriétés dangereuses du produit : éviter les blessures dues aux objets tranchants, empêcher les fuites de liquides, protéger contre les produits nocifs ou corrosifs."},
  ]},
 ],
 questions:[
  {q:"Que signifie la formule 'Emballage = ?' selon la norme DIN 55405 ?",options:["Matériel + Produit emballé","Moyen d'emballage + Accessoires d'emballage","Paquet + Unité d'emballage","Contenu + Contenant"],answer:1},
  {q:"Que signifie 'Paquet' selon la norme DIN 55405 ?",options:["Uniquement le moyen d'emballage","L'unité de transport complète","Produit emballé (contenu) + Emballage","Le matériel d'emballage brut"],answer:2},
  {q:"Quelle est la hauteur standard de chute pour les tests d'emballage ?",options:["0,8 mètre","1,0 mètre","1,2 mètre","1,5 mètre"],answer:2},
  {q:"Que signifie VCI dans le contexte de l'emballage ?",options:["Vérification des Contenus Internes","Volatile Corrosion Inhibitor (inhibiteur volatile de corrosion)","Valeur du Contenu Indiqué","Vecteur de Contrôle des Intempéries"],answer:1},
  {q:"La protection 'vers l'extérieur' d'un emballage consiste à :",options:["Protéger la marchandise des chocs extérieurs","Protéger l'environnement des propriétés dangereuses du produit emballé","Assurer la publicité du produit","Faciliter le transport"],answer:1},
  {q:"Pourquoi les colis < 10 kg ne doivent-ils pas être ficelés manuellement pour La Poste ?",options:["La ficelle est trop coûteuse","La ficelle peut bloquer ou endommager les machines de tri automatique","La ficelle n'est pas écologique","Le client ne peut pas ouvrir facilement"],answer:1},
  {q:"Quelles fonctions remplit un emballage ?",options:["Protection intérieure","Protection extérieure","Entreposage","Transport","Vente"],answers:[0,1,2,3,4],multi:true},
  {q:"Que signifient les mentions 'HT' et 'DB' sur un emballage en bois IPPC ?",options:["Hauteur totale et Distance de base","Heat Treatment (traitement thermique) et Debarked (écorcé)","Haute Température et Déclaration Barème","Homologué Transport et Durée Bornée"],answer:1},
  {q:"Quelle est la principale cause de dommages liés aux secousses pendant le transport ?",options:["L'emballage se comprime","Le produit se disperse dans le matériau de rembourrage","L'humidité pénètre dans l'emballage","Le produit fond à cause de la chaleur"],answer:1},
  {q:"La norme DIN 55405 définit :",options:["Les dimensions des emballages","La terminologie technique des emballages (matériel, moyen, accessoires, paquet...)","Les symboles de marquage des emballages","Les normes de résistance aux chocs"],answer:1},
  {q:"Quels éléments sont des accessoires d'emballage ?",options:["Boîtes en carton","Colle et ruban adhésif","Ficelle","Matériau de rembourrage","Palettes"],answers:[1,2,3],multi:true},
  {q:"Qu'est-ce qu'un emballage factice ?",options:["Un emballage protégeant l'emballage de vente","Un emballage qui paraît plus grand qu'il ne l'est (illusion de plus grande quantité)","Un emballage de transport en film rétractable","Un emballage de présentation en magasin uniquement"],answer:1},
  {q:"Quelles contraintes peut subir un emballage pendant le transport ?",options:["Chutes","Chocs","Compression","Secousses/vibrations","Nuisibles"],answers:[0,1,2,3,4],multi:true},
  {q:"Pour lutter contre la corrosion, on utilise :",options:["La méthode IPPC","La méthode VCI (Volatile Corrosion Inhibitor)","Un emballage factice","Un traitement HT"],answer:1},
  {q:"L'IPPC concerne :",options:["Tous les types d'emballages","Uniquement les emballages en bois utilisés dans le commerce international","Les emballages alimentaires uniquement","Les emballages métalliques"],answer:1},
 ]};

const CH4 = {id:"c4",num:4,title:"Les normes d'emballages",icon:"📐",color:"#4527A0",textColor:"#fff",
 content:[
  {T:"intro",x:"La standardisation des emballages permet une optimisation logistique maximale : les contenants s'emboîtent parfaitement sur les palettes EPAL et assurent une stabilité optimale lors de l'empilage."},
  {T:"section",x:"La norme ISO 3394"},
  {T:"text",x:"La longueur, la largeur et la hauteur des emballages sont standardisées selon la norme ISO 3394. Cette norme garantit que les emballages s'imbriquent parfaitement sur une palette EPAL (1200 × 800 mm). La norme de hauteur est moins stricte que celle de la longueur et de la largeur."},
  {T:"hl",bg:"#ede7f6",b:"#4527A0",ti:"Principe de dimensionnement ISO 3394",x:"La longueur du petit récipient = la largeur du récipient supérieur.\nLa largeur du petit récipient = la moitié de la longueur du récipient supérieur.\n\nEmpilage COMBINÉ (imbriqué) : beaucoup plus de stabilité car les unités s'encastrent les unes dans les autres, évitant le glissement latéral."},
  {T:"section",x:"Les récipients plastique à empiler"},
  {T:"list",items:["Paroi pleine (étanche, protection maximale)","Avec ou sans logement pour les poignées","Avec ou sans couvercle","De type harasse (robuste, pour boissons)"]},
  {T:"section",x:"Les 4 types de fonds"},
  {T:"img",src:"/images/c16.png",alt:"Fonds de récipients — Tête de taureau, Plat, Renforcé"},
  {T:"hl",bg:"#ede7f6",b:"#4527A0",ti:"Structures de fond des récipients plastique",x:"Fond PLAT : pour le transport horizontal sur tapis roulants. Glisse facilement.\n\nFond TÊTE DE TAUREAU : renforcé par des bossages (bosses). Pour marchandises lourdes. INTERDIT sur les tapis roulants (les bossages bloquent le transport).\n\nFond MUNI D'ARÊTES (nervures) : meilleure stabilité d'empilage. Les arêtes s'encastrent dans le fond du récipient inférieur, évitant le glissement.\n\nFond GRILLAGÉ (ajouré ou fermé) : pour la branche alimentaire. Facilite le nettoyage et l'aération."},
  {T:"section",x:"Restrictions d'utilisation"},
  {T:"list",items:["Fond tête de taureau : NE PEUT PAS être utilisé sur des tapis roulants","Récipients alimentaires : doivent respecter les directives EU sur les matériaux alimentaires","Produits alimentaires : NE PEUVENT PAS être stockés dans des récipients plastique FERMÉS (aération nécessaire)"]},
  {T:"section",x:"Les systèmes de box"},
  {T:"img",src:"/images/c15.png",alt:"Types de box — Dispobox (3 formes)"},
  {T:"hl",bg:"#e8f5e9",b:"#2E7D32",ti:"Dispobox et Coolbox",x:"DISPOBOX : système de POOL FERMÉ. Les Dispobox circulent entre les partenaires logistiques et reviennent à La Poste après utilisation. Évite les emballages à usage unique.\n\nCOOLBOX : utilisée dans le secteur pharmaceutique et médical. Maintient une température contrôlée pour les marchandises sensibles à la chaleur (médicaments, vaccins, produits biologiques)."},
  {T:"gloss",items:[
    {term:"ISO 3394",def:"Norme internationale standardisant les dimensions longueur/largeur/hauteur des emballages pour garantir leur compatibilité avec les palettes EPAL (1200×800 mm). Permet l'imbrication parfaite et l'optimisation de l'espace."},
    {term:"Palette EPAL (European Pallet Association)",def:"Palette standardisée de 1200×800 mm (palettes EUR), la plus répandue en Europe. Toutes les charges doivent être optimisées pour s'adapter à ces dimensions. Capacité de charge : 1 500 kg dynamique, 4 000 kg statique."},
    {term:"Empilage combiné / imbriqué",def:"Méthode d'empilage où les emballages sont orientés de façon alternée (croisés), créant une imbrication entre les niveaux. Beaucoup plus stable qu'un empilage simple car les unités se bloquent mutuellement."},
    {term:"Fond plat",def:"Type de fond de récipient plastique adapté au transport sur tapis roulants. Surface lisse permettant un glissement facile sur les convoyeurs automatisés."},
    {term:"Fond tête de taureau",def:"Type de fond de récipient avec des bossages (reliefs) pour renforcer la structure, adapté aux charges lourdes. INTERDIT sur les tapis roulants car les bossages se coincement dans les convoyeurs."},
    {term:"Fond muni d'arêtes (nervures)",def:"Type de fond avec des nervures saillantes qui s'encastrent dans les arêtes du récipient inférieur lors de l'empilage. Offre une excellente stabilité et prévient le glissement latéral des piles."},
    {term:"Fond grillagé",def:"Fond avec des ouvertures ou un treillis, utilisé dans la branche alimentaire. Permet le nettoyage facile (l'eau s'écoule) et l'aération des produits. Peut être fermé (treillis fin) ou ajouré (grandes ouvertures)."},
    {term:"Dispobox",def:"Emballage réutilisable de La Poste fonctionnant sur le principe du POOL FERMÉ. Les Dispobox circulent en circuit fermé entre les partenaires logistiques et reviennent systématiquement à La Poste après utilisation."},
    {term:"Coolbox",def:"Emballage isolant réutilisable utilisé dans le secteur pharmaceutique et médical pour transporter des marchandises sensibles à la température (médicaments, vaccins, échantillons biologiques). Maintient une température contrôlée."},
    {term:"Harasse",def:"Type de récipient plastique à empiler à parois ajourées ou en grille, très robuste, utilisé notamment pour les bouteilles de boissons. Le terme vient du provençal 'arasso' (claie, grillage)."},
    {term:"Pool fermé",def:"Système de gestion d'emballages réutilisables où les emballages circulent en circuit fermé entre des partenaires agréés et reviennent au propriétaire (ex : La Poste pour les Dispobox). Économique et écologique."},
    {term:"Norme de hauteur",def:"Dans la norme ISO 3394, la standardisation des hauteurs est moins stricte que celle des longueurs et largeurs, permettant plus de flexibilité dans la hauteur des récipients."},
  ]},
 ],
 questions:[
  {q:"Quelle norme standardise les dimensions des emballages pour les palettes EPAL ?",options:["ISO R 780","DIN 55402","ISO 3394","DIN 55405"],answer:2},
  {q:"Quelles sont les dimensions d'une palette EPAL standard ?",options:["1000 × 1200 mm","1200 × 800 mm","1200 × 1000 mm","800 × 600 mm"],answer:1},
  {q:"L'empilage combiné (imbriqué) offre :",options:["Moins de stabilité mais plus de flexibilité","Beaucoup plus de stabilité grâce à l'encastrement des unités","La même stabilité qu'un empilage normal","Moins d'espace utilisé mais plus de risques"],answer:1},
  {q:"La Dispobox fonctionne selon quel principe ?",options:["Emballage à usage unique","Système de POOL FERMÉ (circule entre partenaires, revient à La Poste)","Location mensuelle","Emballage consigné au client final"],answer:1},
  {q:"La Coolbox est utilisée principalement dans quel secteur ?",options:["Alimentaire frais","Pharmaceutique / médical (transport sensible à la température)","Électronique","Textile"],answer:1},
  {q:"Quel type de fond de récipient est INTERDIT sur les tapis roulants ?",options:["Fond plat","Fond grillagé","Fond tête de taureau (bossages qui se coincent dans les convoyeurs)","Fond muni d'arêtes"],answer:2},
  {q:"Pourquoi les produits alimentaires ne peuvent-ils pas être stockés dans des récipients plastique FERMÉS ?",options:["Le plastique transmet des arômes","Ils ont besoin d'aération (récipients grillagés ou ajourés requis)","Les réglementations EU l'interdisent pour raisons de coût","Le plastique retient trop l'humidité"],answer:1},
  {q:"Quels types de fonds existe-t-il pour les récipients plastique à empiler ?",options:["Fond plat","Fond tête de taureau","Fond muni d'arêtes","Fond grillagé","Fond magnétique"],answers:[0,1,2,3],multi:true},
  {q:"Dans la norme ISO 3394, comment est déterminée la largeur du petit récipient ?",options:["Elle est libre, non normalisée","Elle est égale à la moitié de la longueur du récipient supérieur","Elle est identique à la largeur du récipient supérieur","Elle est fixée à 40 cm"],answer:1},
  {q:"Le fond 'grillagé' est recommandé pour :",options:["Les marchandises très lourdes","La branche alimentaire (nettoyage facile et aération)","Le transport sur tapis roulant","Les récipients hermétiques"],answer:1},
  {q:"Quelles restrictions s'appliquent aux récipients à fond tête de taureau ?",options:["Interdits uniquement en transport aérien","Interdits sur les tapis roulants (bossages bloquent les convoyeurs)","Interdits pour les produits alimentaires","Interdits dans les entrepôts frigorifiques"],answer:1},
  {q:"Quel est l'avantage principal du fond muni d'arêtes ?",options:["Il permet le transport sur tapis roulant","Les arêtes s'encastrent dans le récipient inférieur, évitant le glissement lors de l'empilage","Il est plus léger que le fond plat","Il est adapté au nettoyage facile"],answer:1},
  {q:"Que signifie EPAL ?",options:["European Product Assurance Level","European Pallet Association","European Package Authorized Label","Emballage Plastique Agréé Logistique"],answer:1},
 ]};

const CH5 = {id:"c5",num:5,title:"Le marquage des emballages",icon:"🏷️",color:"#283593",textColor:"#fff",
 content:[
  {T:"intro",x:"Le marquage des emballages est un langage universel permettant à toute personne dans la chaîne logistique, quelle que soit sa langue, de comprendre les consignes de manipulation. Ces symboles sont normalisés et ont une valeur réglementaire."},
  {T:"section",x:"Les normes de marquage"},
  {T:"hl",bg:"#e3f2fd",b:"#283593",ti:"DIN 55402 et ISO R 780",x:"DIN 55402 (norme allemande) et ISO R 780 (norme internationale) définissent les symboles graphiques sur les emballages pour indiquer :\n• La sensibilité du contenu\n• Les consignes de manipulation\n• Les limitations d'utilisation"},
  {T:"section",x:"Les 13 symboles principaux (DIN 55402 / ISO R 780)"},
  {T:"img",src:"/images/c17.png",alt:"13 symboles de marquage DIN 55402 / ISO R 780"},
  {T:"list",items:["Ne pas renverser (flèches vers le haut) — sens d'empilage obligatoire","Fragile (verre brisé) — manipuler avec précaution","À protéger de l'humidité (parapluie) — protéger de la pluie","Ne pas ouvrir avec des outils pointus (couteau barré)","À protéger de la chaleur (soleil + maison) — ne pas exposer","Superposer X couches au maximum — limite d'empilage","Utilisation de crochet interdite (crochet barré)","Ne pas surcharger la marchandise (masse sur pointe)","Centre de gravité (croix dans cercle) — pour le levage","Placer les chaînes de levage ici (chaîne) — points d'élingage","Placer le diable ici / Ne pas prendre avec le diable","Saisir ici / Ne pas saisir ici (mains)","Ne pas utiliser un chariot élévateur (chariot barré)"]},
  {T:"section",x:"Terminologie multilingue des inscriptions"},
  {T:"img",src:"/images/c18.png",alt:"Terminologie emballage en 5 langues"},
  {T:"hl",bg:"#e3f2fd",b:"#283593",ti:"Termes courants en 5 langues (DE / FR / EN / ES / IT)",x:"Fragil = Fragile = Fragile = Fragil = Fragile\nNicht fallen lassen = Ne pas laisser tomber = Not to be dropped = No volcar = Non ribaltare\nHier anheben = Soulever par ici = Heave here = Levantese aqui = Sollevare qui\nVor Feuchtigkeit schützen = À préserver de l'humidité = Keep dry = Preservarla de la humedad\nNicht kippen = Ne pas renverser = Keep upright = No dar vuelta a la caja\nHier öffnen = Ouvrir ici = Open here = Abrese aqui = Aprire da questa parte"},
  {T:"section",x:"Les poids sur les emballages"},
  {T:"hl",bg:"#fff8e1",b:"#f59e0b",ti:"Poids net, brut, légal, tare",x:"Poids NET : poids de la marchandise seule, sans emballage.\nPoids BRUT : poids total = marchandise + emballage.\nPoids LÉGAL : poids officiel servant de base à la transaction commerciale.\nTARE : poids de l'emballage vide = Poids brut − Poids net.\n\nFormule à retenir : Poids brut = Poids net + Tare"},
  {T:"gloss",items:[
    {term:"DIN 55402",def:"Norme allemande du Deutsches Institut für Normung (Institut allemand de normalisation) définissant les symboles graphiques de marquage des emballages pour indiquer les consignes de manipulation et la sensibilité du contenu."},
    {term:"ISO R 780",def:"Norme internationale de l'Organisation internationale de normalisation définissant les pictogrammes de manipulation des colis. Ces symboles sont reconnus mondialement, indépendamment de la langue."},
    {term:"Ne pas renverser (↑↑)",def:"Symbole avec deux flèches verticales pointant vers le haut. Indique le sens obligatoire d'empilage de l'emballage. Le colis ne doit jamais être retourné."},
    {term:"Fragile (verre brisé)",def:"Symbole représentant un verre brisé. Indique que le contenu est fragile et doit être manipulé avec la plus grande précaution, en évitant tout choc ou vibration excessive."},
    {term:"À protéger de l'humidité (parapluie)",def:"Symbole représentant un parapluie. L'emballage et son contenu doivent être protégés de la pluie, de l'humidité et des projections d'eau."},
    {term:"Limite d'empilage (chiffre + masse)",def:"Symbole indiquant le nombre maximal de couches que l'on peut empiler sur cet emballage. Au-delà, le risque d'écrasement est trop élevé."},
    {term:"Centre de gravité (⊕)",def:"Symbole représentant une croix dans un cercle. Indique l'emplacement du centre de gravité de l'emballage, essentiel pour un levage et un arrimage corrects."},
    {term:"Points de levage (chaîne)",def:"Symbole indiquant les points d'élingage autorisés pour soulever l'emballage avec des chaînes de grue ou des élingues. Garantit un levage stable et sécurisé."},
    {term:"Diable autorisé / interdit",def:"Symboles indiquant si l'utilisation d'un diable (chariot à deux roues) est autorisée et, si oui, à quel endroit positionner les fourches du diable."},
    {term:"Poids net",def:"Poids de la marchandise seule, SANS emballage. C'est la masse effective du produit vendu."},
    {term:"Poids brut",def:"Poids TOTAL incluant la marchandise ET son emballage. Formule : Poids brut = Poids net + Tare."},
    {term:"Tare",def:"Poids de l'emballage vide. Formule : Tare = Poids brut − Poids net. La tare est déduite lors des transactions commerciales pour ne facturer que la marchandise nette."},
    {term:"Poids légal",def:"Poids officiel servant de base légale à la transaction commerciale entre vendeur et acheteur. Peut différer du poids net dans certains secteurs (ex : produits humides déduction de l'humidité)."},
  ]},
 ],
 questions:[
  {q:"Les symboles de marquage des emballages sont définis par :",options:["ISO 3394 et DIN 55405","DIN 55402 et ISO R 780","ISO 9001 et DIN 50001","La norme UE 2019/944"],answer:1},
  {q:"À quoi servent les symboles sur les emballages ?",options:["Indiquer le prix du produit","Indiquer la sensibilité du contenu et les consignes de manipulation","Identifier le fabricant","Préciser le délai de livraison"],answer:1},
  {q:"La tare est définie comme :",options:["Le poids total incluant l'emballage","Le poids de la marchandise seule","Le poids de l'emballage vide (poids brut − poids net)","Le poids légal de la transaction"],answer:2},
  {q:"Que signifie le symbole 'verre brisé' sur un emballage ?",options:["Emballage recyclable en verre","Contenu fragile, manipuler avec précaution en évitant tout choc","Emballage contenant des liquides","Interdit au transport maritime"],answer:1},
  {q:"La formule correcte est :",options:["Poids brut = Poids net − Tare","Poids brut = Poids net + Tare","Poids net = Poids brut + Tare","Tare = Poids net + Poids brut"],answer:1},
  {q:"Le symbole 'centre de gravité' (⊕) indique :",options:["L'emplacement du code-barres","L'emplacement du centre de gravité pour un levage et arrimage corrects","La limite d'empilage de l'emballage","Le point où apposer le timbre"],answer:1},
  {q:"Quels symboles sont inclus dans les 13 symboles DIN 55402 / ISO R 780 ?",options:["Fragile","Ne pas renverser","À protéger de l'humidité","Centre de gravité","Limite d'empilage"],answers:[0,1,2,3,4],multi:true},
  {q:"L'avantage principal des symboles de marquage normalisés est :",options:["Ils sont obligatoires par la loi","Ils transcendent les barrières linguistiques (compréhension universelle)","Ils indiquent le prix du transport","Ils identifient le fabricant"],answer:1},
  {q:"En allemand, 'Hier anheben' signifie en français :",options:["Ne pas soulever ici","Soulever par ici","Ouvrir ici","Ne pas ouvrir ici"],answer:1},
  {q:"En allemand, 'Nicht kippen' signifie en français :",options:["Empiler ici","Fragile, attention","Ne pas renverser (Keep upright)","Placer le diable ici"],answer:2},
  {q:"Le symbole 'limite d'empilage' avec le chiffre 8 signifie :",options:["L'emballage pèse 8 kg","On ne peut pas empiler plus de 8 couches de cet emballage","L'emballage contient 8 unités","Le code ISO de l'emballage est 8"],answer:1},
  {q:"Que signifie 'poids légal' ?",options:["Le poids maximal autorisé par la loi pour le transport","Le poids officiel servant de base à la transaction commerciale","Le poids de l'emballage selon les normes légales","Le poids net contrôlé par les autorités"],answer:1},
  {q:"Quels symboles existent en lien avec l'utilisation du diable ?",options:["'Placer le diable ici' uniquement","'Ne pas prendre avec le diable' uniquement","'Placer le diable ici' ET 'Ne pas prendre avec le diable'","Aucun symbole spécifique au diable"],answer:2},
 ]};


const CH6 = {id:"c6",num:6,title:"L'expédition",icon:"✉️",color:"#1B4F8A",textColor:"#fff",
 content:[
  {T:"intro",x:"La Poste Suisse propose une gamme complète de services d'expédition avec différents niveaux de rapidité, de traçabilité et de couverture en cas de perte ou dommage. Chaque service répond à des besoins précis."},
  {T:"section",x:"Courrier A et Courrier B"},
  {T:"hl",bg:"#e3f2fd",b:"#1B4F8A",ti:"Courrier A vs Courrier B",x:"COURRIER A : distribution le jour ouvrable suivant (lundi–samedi). Traité en priorité avec plus d'attention. Dépôt jusqu'à la fermeture du guichet.\n\nCOURRIER B : moins cher. Distribution au plus tard le 3e jour ouvrable (lundi–vendredi, pas le samedi). Idéal pour courrier non urgent.\n\nENVOIS EN NOMBRE Courrier B : ≥ 350 exemplaires, même contenu/emballage/poids. Distribution au plus tard le 6e jour ouvrable. Pas le samedi."},
  {T:"section",x:"Services spéciaux lettres"},
  {T:"list",items:["Lettre RECOMMANDÉE : numéro de suivi, signature obligatoire, assurée jusqu'à 500 CHF en cas de perte/dommage","Promo post : prospectus/pub sans destinataire nominatif. Réservé aux entreprises et associations.","Cécogramme : envoi GRATUIT pour les personnes malvoyantes ou aveugles (livres Braille, enregistrements)","DirectResponse Card : carte comprenant l'expédition ET le renvoi prépayé","BLN : remis uniquement contre signature ET paiement du montant indiqué sur l'étiquette","Express Lune : dépôt le soir → livraison le lendemain avant 9h (lundi–samedi, valable au Liechtenstein)"]},
  {T:"section",x:"Envois de colis en Suisse"},
  {T:"hl",bg:"#e8f5e9",b:"#2E7D32",ti:"PostPac Priority et Economy",x:"PostPac PRIORITY : livraison le jour ouvrable suivant (lundi–samedi).\nPostPac ECONOMY : livraison en 2 jours ouvrables (lundi–vendredi).\nPostPac PROMO : à partir de 500 exemplaires du même contenu, emballage et poids.\nENCOMBRANT : grandes dimensions ou colis non emballés. Existe en Priority et Economy."},
  {T:"section",x:"Services complémentaires colis"},
  {T:"hl",bg:"#fce4ec",b:"#C62828",ti:"Tableau des services et responsabilités",x:"Signature SI : remise contre signature. Responsabilité La Poste jusqu'à 1'500 CHF.\nRemboursement N : remise contre paiement uniquement. Max 10'000 CHF. Remis avec signature.\nRMP (Remise en Main Propre) : uniquement au destinataire nommé. Procuration INVALIDE pour RMP.\nAssurance : remise contre signature. Responsabilité La Poste jusqu'à 5'000 CHF.\nFragile FRA : traitement hors machines. Responsabilité La Poste jusqu'à 5'000 CHF.\nExpress Lune : livraison le lendemain avant 9h. Coursier Suisse : Turbo 30 min, Rapide 60 min, Standard 120 min."},
  {T:"section",x:"Envois vers l'étranger"},
  {T:"hl",bg:"#fff8e1",b:"#f59e0b",ti:"Délais internationaux (lettres et colis)",x:"LETTRES/DOCUMENTS (max 2 kg, sans valeur marchande) :\n• Document URGENT : 1 à 5 jours\n• Courrier Priority : 2 à 8 jours\n• Courrier Economy : 4 à 30 jours\n\nCOLIS INTERNATIONAUX :\n• Marchandise URGENT : 1 à 6 jours\n• PostPac International Priority : 3 à 10 jours\n• PostPac International Economy : 4 à 30 jours"},
  {T:"section",x:"Documents douaniers"},
  {T:"hl",bg:"#ede7f6",b:"#6A1B9A",ti:"CN22, CN23 et lettre de voiture",x:"CN22 (bulletin de douane vert) : courrier jusqu'à 2 kg, valeur ≤ 1'000 CHF.\n\nCN23 (déclaration en douane) : valeur > 1'000 CHF OU marchandise soumise à autorisation OU expéditeur ne souhaite pas indiquer la valeur.\n\nDéclaration d'exportation : valeur > 1'000 CHF pour envois courrier.\n\nLettre de voiture : pour tous les modes (URGENT, PRIORITY, ECONOMY). Rédigée en anglais ou dans la langue du pays destinataire."},
  {T:"gloss",items:[
    {term:"Lettre A",def:"Courrier prioritaire de La Poste Suisse. Distribué le jour ouvrable SUIVANT le dépôt, du lundi au samedi. Traité en priorité. Plus cher que la lettre B."},
    {term:"Lettre B",def:"Courrier économique de La Poste Suisse. Distribué au plus tard le 3e jour ouvrable après dépôt, du lundi au vendredi (pas le samedi). Moins cher que la lettre A."},
    {term:"Envois en nombre Courrier B",def:"Service pour expéditeurs professionnels : ≥ 350 envois du même contenu/emballage/poids. Distribution au plus tard le 6e jour ouvrable (lundi–vendredi, pas le samedi). Idéal pour catalogues, magazines, courriers publicitaires."},
    {term:"Lettre recommandée",def:"Lettre avec numéro de suivi unique. Remise UNIQUEMENT contre signature du destinataire. Assurée jusqu'à 500 CHF en cas de perte, dommage ou livraison non conforme. Track & Trace disponible."},
    {term:"Promo post",def:"Service de distribution non adressée : prospectus, flyers, journaux gratuits, publicités. Pas de destinataire nominatif. Réservé aux entreprises et associations. Permet un contact sur tout le territoire suisse ou une région."},
    {term:"Cécogramme",def:"Envoi postal GRATUIT réservé aux personnes malvoyantes ou aveugles. Peut contenir des livres en braille, des enregistrements audio, des documents en police agrandie. Franchise postale accordée par La Poste."},
    {term:"BLN (Remboursement sans titre)",def:"Envoi remis au destinataire UNIQUEMENT contre paiement comptant du montant indiqué sur l'étiquette. La Poste encaisse pour le compte de l'expéditeur. Avantage : aucune perte d'intérêt en cas de retard de paiement."},
    {term:"Express Lune",def:"Service express de La Poste : envoi déposé le soir avant fermeture → livraison le lendemain avant 9h. Valable en Suisse et au Liechtenstein, du lundi au samedi. Prestation complémentaire."},
    {term:"PostPac Priority",def:"Colis livré le jour ouvrable suivant le dépôt, du lundi au samedi. Délai le plus rapide pour les colis La Poste. Étiquette jaune distinctif."},
    {term:"PostPac Economy",def:"Colis livré en 2 jours ouvrables après le dépôt, du lundi au vendredi. Plus économique que Priority. Pas de livraison le samedi."},
    {term:"Signature SI",def:"Service complémentaire : le colis est remis uniquement contre signature du destinataire. La Poste est responsable des dommages ou perte jusqu'à 1'500 CHF."},
    {term:"Remboursement N",def:"Service complémentaire : le destinataire reçoit son colis UNIQUEMENT contre paiement. Montant maximum : 10'000 CHF. La remise s'effectue avec signature."},
    {term:"RMP (Remise en Main Propre)",def:"Le colis est remis EXCLUSIVEMENT au destinataire nommé sur l'envoi. Ni le voisin ni une procuration ne sont valables. Garantie d'identité absolue."},
    {term:"Fragile FRA",def:"Service complémentaire : l'envoi est traité manuellement, HORS des machines de tri automatique. La Poste est responsable en cas de perte ou casse jusqu'à 5'000 CHF."},
    {term:"CN22 (bulletin de douane vert)",def:"Formulaire douanier pour envois courrier vers l'étranger : valeur ≤ 1'000 CHF et poids ≤ 2 kg. Document simplifié accompagnant l'envoi pour les autorités douanières du pays destinataire."},
    {term:"CN23 (déclaration en douane)",def:"Formulaire douanier plus complet requis quand : valeur > 1'000 CHF, marchandise soumise à autorisation, ou expéditeur ne souhaite pas indiquer la valeur. Doit être complété avec soin."},
    {term:"NPA (Numéro Postal d'Acheminement)",def:"Code à 4 chiffres identifiant une zone de distribution postale en Suisse. Équivaut au PLZ (Postleitzahl) en allemand. Essentiel pour le tri automatique du courrier."},
    {term:"Affranchissement",def:"Action de payer à l'avance les frais de port d'un envoi postal (apposition d'un timbre ou paiement à la machine). Rend l'envoi 'franc de port' (libre de toute charge postale pour le destinataire)."},
  ]},
 ],
 questions:[
  {q:"La lettre A est distribuée :",options:["Dans les 3 jours ouvrables, lundi–vendredi","Le jour ouvrable suivant, du lundi au samedi","Le lendemain, uniquement en semaine","En 24h, y compris le dimanche"],answer:1},
  {q:"La lettre B est distribuée au plus tard :",options:["Le lendemain ouvrable","Le 3e jour ouvrable (lundi–vendredi)","Le 6e jour ouvrable","Le 5e jour ouvrable"],answer:1},
  {q:"Les envois en nombre courrier B nécessitent au minimum :",options:["100 envois","250 envois","350 envois","500 envois"],answer:2},
  {q:"Quels services sont proposés pour les lettres par La Poste Suisse ?",options:["Lettre recommandée","Promo post","Cécogramme","Express Lune","BLN"],answers:[0,1,2,3,4],multi:true},
  {q:"La lettre recommandée est assurée jusqu'à :",options:["250 CHF","500 CHF","1'500 CHF","5'000 CHF"],answer:1},
  {q:"Le service BLN signifie que le colis est remis :",options:["Uniquement au destinataire nommé","Contre signature ET paiement comptant du montant indiqué","Librement dans la boîte aux lettres","Après vérification d'identité uniquement"],answer:1},
  {q:"L'Express Lune garantit :",options:["Livraison le jour même avant 18h","Livraison le lendemain avant 9h","Livraison en 30 minutes par coursier","Livraison le lendemain avant midi"],answer:1},
  {q:"PostPac Priority livre :",options:["Le jour ouvrable suivant (lundi–samedi)","En 2 jours ouvrables (lundi–vendredi)","En 3 jours, y compris le samedi","Dans les 6 jours ouvrables"],answer:0},
  {q:"Quels montants de couverture sont associés aux services La Poste ?",options:["Signature SI : 1'500 CHF","Assurance : 5'000 CHF","Fragile FRA : 5'000 CHF","Remboursement N : 10'000 CHF","Recommandé : 500 CHF"],answers:[0,1,2,3,4],multi:true},
  {q:"La CN23 est requise pour :",options:["Tous les envois postaux internationaux","Valeur > 1'000 CHF OU marchandise soumise à autorisation","Les lettres < 2 kg vers l'étranger","Les colis > 10 kg uniquement"],answer:1},
  {q:"Le service Fragile FRA garantit :",options:["La livraison en 24h","Un traitement hors machines + responsabilité jusqu'à 5'000 CHF","Une assurance jusqu'à 1'500 CHF","La remise en main propre uniquement"],answer:1},
  {q:"La procuration est-elle valable pour un envoi RMP (Remise en Main Propre) ?",options:["Oui, si signée devant notaire","Non, jamais. RMP = destinataire nommé exclusivement","Oui, si présentée au guichet avec pièce d'identité","Oui, si le mandataire est de la famille directe"],answer:1},
  {q:"Qu'est-ce qu'un Cécogramme ?",options:["Un envoi recommandé pour les entreprises","Un envoi postal GRATUIT réservé aux personnes malvoyantes ou aveugles","Un service express nocturne","Un envoi publicitaire sans destinataire"],answer:1},
  {q:"Le délai d'un 'Document URGENT' vers l'étranger est de :",options:["24 heures","1 à 5 jours","2 à 8 jours","4 à 30 jours"],answer:1},
  {q:"La lettre de voiture internationale est rédigée :",options:["Obligatoirement en 4 langues officielles suisses","En anglais ou dans la langue du pays destinataire","Uniquement en allemand","En français uniquement depuis 2020"],answer:1},
 ]};

const CH7 = {id:"c7",num:7,title:"L'adressage",icon:"📍",color:"#558B2F",textColor:"#fff",
 content:[
  {T:"intro",x:"Un adressage correct et normalisé est la condition indispensable pour un traitement rationnel et automatique du courrier. Les machines OCR lisent les adresses optiquement — une adresse incorrecte ralentit ou bloque le processus."},
  {T:"section",x:"Les 6 zones d'un envoi postal"},
  {T:"img",src:"/images/c19.png",alt:"6 zones d'un envoi postal"},
  {T:"hl",bg:"#f1f8e9",b:"#558B2F",ti:"Structure d'un envoi (lettre ou colis)",x:"1. Zone d'AFFRANCHISSEMENT : en haut à droite — timbre ou affranchissement machine.\n2. Zone de l'EXPÉDITEUR : en haut à gauche — nom et adresse de l'expéditeur.\n3. Zone de PUBLICITÉ : zone centrale gauche — message commercial de l'expéditeur (Promo post).\n4. Zone de LECTURE : zone centrale — lue optiquement par les machines OCR de tri.\n5. Champ de l'ADRESSE : zone du destinataire (marges : 10mm haut, 20mm bas, 15mm droite et gauche).\n6. Zone de CODAGE : bande en bas — code barre imprimé par la machine de tri pour le facteur."},
  {T:"section",x:"Les 7 règles d'or de l'adressage"},
  {T:"hl",bg:"#f1f8e9",b:"#558B2F",ti:"Règles impératives pour un adressage correct",x:"1. Alignement à GAUCHE obligatoire.\n2. De 3 à 6 lignes maximum — pas de ligne vide entre les lignes.\n3. Raison sociale, nom et prénom en TOUTES LETTRES (pas d'abréviations).\n4. Nom de RUE COMPLET (sans abréviation).\n5. Numéro de CASE POSTALE correct.\n6. Code postal (NPA) et LOCALITÉ complète.\n7. Pas de SOULIGNEMENT et pas d'ESPACEMENT entre les lettres."},
  {T:"section",x:"Les étiquettes d'identification"},
  {T:"img",src:"/images/c20.png",alt:"Étiquettes La Poste — Lettre et PostPac Priority"},
  {T:"hl",bg:"#e3f2fd",b:"#1B4F8A",ti:"Structure des étiquettes La Poste",x:"Étiquette LETTRE avec code-barres :\n• NPA + localité en haut (ex. 8152 Opfikon)\n• PP = Port Payé (affranchissement prépayé)\n• Code-barres numérique (ex. 98.42.103178.00000301)\n\nÉtiquette PostPac PRIORITY :\n• PRI = Priority en haut\n• Code-barres vertical\n• Adresse du destinataire structurée\n\nStructure de l'adresse colis :\nMonsieur/Madame/Organisation\nNom, Prénom\nDésignation complémentaire\nRue, numéro\nCode postal, Localité"},
  {T:"section",x:"Cas particuliers"},
  {T:"list",items:["Case postale : se place AVANT le code postal, REMPLACE la rue et le numéro (ne pas mettre les deux)","Entreprises : raison sociale EN PREMIER, puis service/département, puis personne concernée","Adresses étrangères : pays en MAJUSCULES sur la DERNIÈRE ligne","Signes particuliers (accents, trémas) : généralement acceptés par les machines OCR"]},
  {T:"gloss",items:[
    {term:"NPA (Numéro Postal d'Acheminement)",def:"Code à 4 chiffres identifiant précisément une zone de distribution postale en Suisse. Correspond au PLZ (Postleitzahl) en allemand. Sans NPA correct, le tri automatique est impossible."},
    {term:"OCR (Optical Character Recognition)",def:"Reconnaissance optique de caractères. Technologie permettant aux machines de tri d'analyser et lire automatiquement les adresses imprimées ou écrites. Une adresse mal formatée (soulignement, espacement) peut ne pas être reconnue."},
    {term:"Zone d'affranchissement",def:"Zone en haut à droite de l'envoi réservée au timbre ou au cachet d'affranchissement machine. L'affranchissement indique que les frais de port ont été payés."},
    {term:"Zone de l'expéditeur",def:"Zone en haut à gauche de l'envoi indiquant le nom et l'adresse de l'expéditeur. Permet le retour de l'envoi si non distribuable."},
    {term:"Zone de codage",def:"Bande en bas de l'enveloppe où la machine de tri imprime un code fluorescent (barres UV invisibles à l'œil nu) permettant au facteur d'identifier rapidement la tournée et l'ordre de distribution."},
    {term:"Champ de l'adresse",def:"Zone du destinataire avec des marges précises : 10mm en haut, 20mm en bas, 15mm à droite et à gauche. L'adresse doit se trouver exclusivement dans cette zone pour être reconnue par les machines."},
    {term:"PP (Port Payé)",def:"Mention imprimée sur une lettre ou un colis indiquant que l'affranchissement a été payé à l'avance par l'expéditeur via un contrat avec La Poste. Utilisé pour les envois professionnels en grande quantité."},
    {term:"Alignement à gauche",def:"Règle fondamentale de l'adressage postal suisse : toutes les lignes de l'adresse doivent être alignées sur le bord gauche, sans retrait ni centrage. Indispensable pour la lecture OCR."},
    {term:"Case postale",def:"Compartiment numéroté loué dans un bureau de poste où le titulaire vient chercher son courrier. Sur l'adresse : 'Case postale [numéro]' se place sur la ligne AVANT le code postal et REMPLACE la rue."},
    {term:"Raison sociale",def:"Nom officiel sous lequel une entreprise ou organisation est enregistrée et exerce son activité. Doit figurer en PREMIER dans l'adresse d'une entreprise, avant le département et le nom de la personne."},
    {term:"Code-barres postal",def:"Série de barres verticales de différentes largeurs encodant le numéro unique d'identification d'un envoi. Permet le tri automatique et le Track & Trace. Ex : 98.42.103178.00000301 pour une lettre La Poste."},
  ]},
 ],
 questions:[
  {q:"Combien de zones distinctes y a-t-il sur un envoi postal ?",options:["3","4","6","8"],answer:2},
  {q:"Combien de lignes maximum comporte une adresse correcte ?",options:["3","4","6","8"],answer:2},
  {q:"Quel alignement est impérativement requis pour une adresse postale ?",options:["Centré","Aligné à droite","Aligné à gauche","Justifié"],answer:2},
  {q:"Quels éléments sont INTERDITS dans une adresse postale ?",options:["Écrire le nom complet","Le soulignement des mots","L'espacement artificiel entre les lettres","Mettre la raison sociale en premier","Les abréviations dans le nom de rue"],answers:[1,2,4],multi:true},
  {q:"Que signifie OCR dans le contexte du tri postal ?",options:["Organisation du Courrier Recommandé","Optical Character Recognition (reconnaissance optique de caractères)","Office Central de Réception","Organisme de Contrôle du Réseau"],answer:1},
  {q:"La case postale se place dans l'adresse :",options:["Après le code postal","Sur la même ligne que le code postal","AVANT le code postal, à la place de la rue","En bas de l'adresse après la localité"],answer:2},
  {q:"La zone de codage sur une lettre sert à :",options:["Indiquer l'affranchissement","Imprimer un code fluorescent aidant le facteur à identifier la tournée","Afficher l'adresse du destinataire","Protéger l'adresse de l'humidité"],answer:1},
  {q:"Que signifie 'PP' sur une étiquette postale ?",options:["Produit Prioritaire","Port Payé (affranchissement prépayé par l'expéditeur)","Poste Prioritaire","Paquet Priority"],answer:1},
  {q:"Pour une entreprise, quel élément vient EN PREMIER dans l'adresse ?",options:["Le nom du destinataire","La raison sociale (nom officiel de l'entreprise)","Le numéro de rue","Le code postal"],answer:1},
  {q:"Les adresses étrangères doivent indiquer le pays :",options:["En minuscules, dans la langue du destinataire","En MAJUSCULES sur la DERNIÈRE ligne","Entre parenthèses après la localité","Sur la première ligne"],answer:1},
  {q:"Quelles règles s'appliquent à une adresse postale correcte ?",options:["Alignement à gauche","Maximum 6 lignes, pas de ligne vide","NPA correct","Pas de soulignement","Nom de rue complet"],answers:[0,1,2,3,4],multi:true},
  {q:"Quelles zones constituent la structure d'un envoi postal ?",options:["Zone d'affranchissement","Zone de l'expéditeur","Zone de lecture","Champ de l'adresse","Zone de codage"],answers:[0,1,2,3,4],multi:true},
  {q:"Peut-on indiquer simultanément la rue et la case postale dans une adresse ?",options:["Oui, les deux sont nécessaires","Non : la case postale REMPLACE la rue et le numéro","Oui, mais seulement pour les colis","Non, sauf pour les envois recommandés"],answer:1},
 ]};

const CH8 = {id:"c8",num:8,title:"Track and Trace",icon:"📡",color:"#00838F",textColor:"#fff",
 content:[
  {T:"intro",x:"Track and Trace (de l'anglais : 'suivre à la trace') désigne le suivi électronique en temps réel des envois postaux sur internet. Ce système garantit la transparence totale du parcours d'un envoi, du dépôt à la livraison."},
  {T:"section",x:"Le processus de suivi — Étape par étape"},
  {T:"hl",bg:"#e0f7fa",b:"#00838F",ti:"Les 6 étapes clés du Track and Trace",x:"1. DÉPÔT au guichet → étiquette avec code-barres collée → colis identifié de manière unique.\n2. QUITTANCE remise au client : preuve légale que La Poste a pris l'envoi en charge.\n3. SCANS SUCCESSIFS à chaque étape (tri, centre logistique, livraison) = événements horodatés.\n4. SUIVI EN LIGNE : le client saisit son numéro d'envoi sur le site de La Poste.\n5. STATUT EN TEMPS RÉEL : toutes les informations sur le déroulement de l'envoi.\n6. DONNÉES DISPONIBLES pendant 1 an après l'expédition."},
  {T:"section",x:"Les 7 statuts d'un envoi"},
  {T:"list",items:["Déposé : le colis a été remis et scanné au dépôt","En transit : le colis est en cours d'acheminement entre les centres","En distribution : le colis est avec le facteur pour la livraison du jour","Livré : remis au destinataire (avec signature si service SI)","Tentative de livraison : destinataire absent, avis de passage laissé","En attente de retrait : le colis attend au bureau de poste","Retourné à l'expéditeur : envoi non livrable ou non réclamé"]},
  {T:"section",x:"La quittance — document juridique"},
  {T:"text",x:"La quittance remise au client lors du dépôt est un document légal. Elle prouve que La Poste a reçu l'envoi et en est responsable. Le numéro de code-barres sur la quittance est identique à celui sur l'envoi. Sans quittance, il est difficile d'engager la responsabilité de La Poste."},
  {T:"hl",bg:"#fff8e1",b:"#f59e0b",ti:"Envois pouvant être suivis par Track and Trace",x:"• Envois Express (Swiss Express Lune, Coursier Suisse)\n• Colis (PostPac Priority, Economy et variantes)\n• Lettres avec code-barres (recommandées, BLN, Signature SI…)\n• Envois internationaux (tous modes)"},
  {T:"gloss",items:[
    {term:"Track and Trace",def:"Système de suivi électronique en temps réel des envois postaux, accessible via internet. Permet de connaître à tout moment l'emplacement et le statut d'un envoi grâce aux scans successifs à chaque étape."},
    {term:"Code-barres postal",def:"Série de barres verticales encodant le numéro unique d'un envoi. Scanné à chaque étape logistique pour générer un événement horodaté visible dans le système Track & Trace."},
    {term:"Quittance",def:"Document remis au client lors du dépôt d'un envoi tracé. Preuve légale que La Poste a pris l'envoi en charge et en est responsable. Contient le numéro de code-barres de l'envoi."},
    {term:"Horodatage",def:"Enregistrement automatique de la date et de l'heure exactes d'un événement (ici, d'un scan logistique). Permet de reconstituer précisément l'historique complet d'un envoi."},
    {term:"Statut 'Déposé'",def:"Premier statut d'un envoi : il a été remis à La Poste et scanné au moment du dépôt. C'est à partir de ce moment que la responsabilité de La Poste commence."},
    {term:"Statut 'En distribution'",def:"L'envoi est actuellement avec le facteur lors de sa tournée quotidienne. La livraison est prévue dans la journée."},
    {term:"Statut 'Livré'",def:"L'envoi a été remis physiquement au destinataire ou déposé dans sa boîte aux lettres. Pour les services avec signature (SI, RMP), ce statut inclut la signature électronique."},
    {term:"Statut 'Tentative de livraison'",def:"Le facteur a essayé de livrer l'envoi mais le destinataire était absent. Un avis de passage a été laissé. Le destinataire peut récupérer l'envoi au bureau de poste."},
    {term:"Statut 'Retourné à l'expéditeur'",def:"L'envoi n'a pas pu être livré (destinataire introuvable, adresse incorrecte, décédé, raison sociale inexistante) et est renvoyé gratuitement à l'expéditeur."},
    {term:"Durée de conservation des données",def:"Les données de Track and Trace sont disponibles et consultables pendant 1 AN après l'expédition. Ce délai permet de gérer les litiges et réclamations qui peuvent survenir après la livraison."},
    {term:"Événement horodaté",def:"Enregistrement généré à chaque scan d'un envoi : date précise + heure + lieu + identifiant de l'opérateur. Ces événements constituent la traçabilité complète et juridiquement valable de l'envoi."},
    {term:"Envois traçables",def:"Tous les envois avec un code-barres unique peuvent être suivis : envois Express, Colis (PostPac), Lettres avec code-barres (recommandées, BLN, SI...), envois internationaux tracés."},
  ]},
 ],
 questions:[
  {q:"Que signifie Track and Trace en français ?",options:["Tri et transport express","Suivi électronique en temps réel des envois (suivre à la trace)","Traçage et transport","Tri automatique et traçage"],answer:1},
  {q:"Que reçoit le client lors du dépôt d'un envoi tracé ?",options:["Une confirmation par e-mail automatique","Une quittance imprimée avec le numéro d'envoi (preuve légale de prise en charge)","Un SMS de confirmation","Un accusé de réception postal signé"],answer:1},
  {q:"Combien de temps les données de Track and Trace sont-elles disponibles ?",options:["3 mois","6 mois","1 an","5 ans"],answer:2},
  {q:"Quels envois peuvent être suivis par Track and Trace ?",options:["Lettres ordinaires sans code-barres","Express, colis, lettres avec code-barres, envois internationaux","Uniquement les envois recommandés","Uniquement les envois postaux en Suisse"],answer:1},
  {q:"Un scan logistique génère :",options:["Uniquement un code de statut numéroté","Un événement horodaté (date + heure + lieu + opérateur)","Une notification SMS automatique","Un nouveau code-barres"],answer:1},
  {q:"Que signifie le statut 'En distribution' ?",options:["L'envoi est en transit entre deux centres","L'envoi est avec le facteur lors de sa tournée, livraison prévue dans la journée","L'envoi attend au bureau de poste","L'envoi a été livré"],answer:1},
  {q:"Que signifie le statut 'Tentative de livraison' ?",options:["L'envoi a été livré avec succès","Le facteur a essayé mais le destinataire était absent (avis de passage laissé)","L'envoi est en cours de tri","L'envoi a été retourné à l'expéditeur"],answer:1},
  {q:"Quels sont les 7 statuts possibles d'un envoi ?",options:["Déposé","En transit","En distribution","Livré","Tentative de livraison","En attente de retrait","Retourné à l'expéditeur"],answers:[0,1,2,3,4,5,6],multi:true},
  {q:"La quittance remise au client est :",options:["Un simple reçu informatif","Un document légal prouvant que La Poste a pris l'envoi en charge (responsabilité)","Un contrat de livraison","Un accusé de réception signé par le facteur"],answer:1},
  {q:"Que se passe-t-il si un colis n'est pas scanné à une étape ?",options:["Il est automatiquement retourné à l'expéditeur","Il devient invisible dans le système de suivi, risque de perte non détectée","Il est livré en priorité","Il est signalé immédiatement comme perdu"],answer:1},
  {q:"Que se passe-t-il si le destinataire est introuvable après plusieurs tentatives ?",options:["La Poste garde le colis indéfiniment","L'envoi est retourné GRATUITEMENT à l'expéditeur","L'envoi est mis aux enchères","La Poste facture des frais de garde supplémentaires"],answer:1},
  {q:"Le numéro de code-barres sur la quittance :",options:["Est différent de celui sur l'envoi","Est identique à celui collé sur le colis (même identifiant unique)","N'est valable que 7 jours","Est attribué uniquement après la livraison"],answer:1},
 ]};


const CH9 = {id:"c9",num:9,title:"La remise et la distribution",icon:"🚪",color:"#AD1457",textColor:"#fff",
 content:[
  {T:"intro",x:"La remise et la réception de marchandises sont des actes encadrés par le Code des Obligations suisse (CO). Savoir qui a le droit de recevoir un envoi, quels documents vérifier et quelles procédures suivre est essentiel dans le métier de logisticien."},
  {T:"section",x:"Le tri du courrier postal — 3 critères"},
  {T:"hl",bg:"#fce4ec",b:"#AD1457",ti:"Critères de tri et étiquettes",x:"1. Le PRODUIT : Courrier A ou Courrier B.\n2. Le FORMAT : Format Normal (FN = lettres standard) ou Grand Format (GF = grandes lettres).\n3. Le PROCESSUS DE TRAITEMENT : tri automatique ou manuel.\n\nÉTIQUETTES :\n• Courrier A : label BLANC\n• Courrier B : label BLANC à rayures BLEUES\n• Envois en nombre : label BLANC à rayures JAUNES"},
  {T:"section",x:"Le casotage"},
  {T:"text",x:"Après le tri dans les centres logistiques, le courrier est déjà trié par rue ou numéro de maison. Le tri détaillé — lettre par lettre, client par client — effectué par le facteur le matin avant sa tournée s'appelle le CASOTAGE."},
  {T:"section",x:"La distribution sur le terrain"},
  {T:"list",items:["Zones urbaines : lettres et colis distribués SÉPARÉMENT (équipes différentes)","Zones rurales : un même facteur distribue tout (lettres + colis)","Moyens de distribution : à pied, à vélo, scooter électrique, DXP (véhicule électrique La Poste), voiture, camion"]},
  {T:"section",x:"Droits à la réception — Règles légales"},
  {T:"hl",bg:"#fce4ec",b:"#AD1457",ti:"Qui peut recevoir un envoi ?",x:"DESTINATAIRE : tous les droits de réception.\nPERSONNES AU MÊME DOMICILE/SIÈGE : peuvent recevoir les envois ORDINAIRES.\nVOISIN : possible pour envois ordinaires en cas d'absence.\nENVOIS SPÉCIAUX : RMP = uniquement le destinataire nommé (procuration INVALIDE).\n\nEnvois nécessitant vérification d'identité : alcool, médicaments sur ordonnance, armes.\n\nABUS DE CONFIANCE (art. 138 CP) : si quelqu'un récupère frauduleusement un envoi → peine privative ou amende."},
  {T:"section",x:"Documents d'identité acceptés"},
  {T:"list",items:["Carte d'identité suisse ou étrangère","Passeport suisse ou étranger","Permis de conduire (Suisse uniquement)","Titre de séjour (pour les étrangers)","Carte d'identité La Poste"]},
  {T:"section",x:"La procuration"},
  {T:"hl",bg:"#e3f2fd",b:"#1565C0",ti:"Éléments d'une procuration valide",x:"Nom + adresse + SIGNATURE du MANDANT.\nNom + adresse du MANDATAIRE.\nDurée de validité.\n\nATTENTION : procuration INVALIDE pour les envois RMP. L'identification du mandant se fait toujours EN SA PRÉSENCE (devant le facteur ou au guichet)."},
  {T:"section",x:"Réexpéditions et garde du courrier"},
  {T:"list",items:["Changement d'adresse définitif : réexpédition valable 1 AN, puis retour à l'expéditeur","Garde du courrier : MINIMUM 2 semaines, MAXIMUM 24 semaines","Dépôt en boîte aux lettres = distribution valide","Retour GRATUIT si : adresse incorrecte, destinataire décédé, raison sociale inexistante"]},
  {T:"gloss",items:[
    {term:"Code des Obligations (CO)",def:"Partie du Code civil suisse réglementant les relations contractuelles entre personnes privées : contrats de vente, de transport, de dépôt (consignation). Définit les droits et devoirs lors de la remise de marchandises."},
    {term:"Casotage",def:"Tri très détaillé du courrier effectué par le facteur le matin avant sa tournée : chaque lettre est classée par rue et par numéro de maison, voire par destinataire individuel. C'est la dernière étape de tri avant la distribution."},
    {term:"Format Normal (FN) et Grand Format (GF)",def:"Classification du courrier par format. Format Normal : lettres standards (enveloppes C5, C4). Grand Format : grandes lettres dépassant les dimensions standard. Le tri et le traitement diffèrent selon le format."},
    {term:"Étiquettes de tri",def:"Indiquent le type d'envoi dans chaque caissette de courrier. Courrier A : étiquette blanche. Courrier B : étiquette blanche à rayures bleues. Envois en nombre : étiquette blanche à rayures jaunes."},
    {term:"DXP (véhicule électrique La Poste)",def:"Véhicule électrique à 3 roues utilisé par les facteurs pour la distribution en zone urbaine ou péri-urbaine. Remplace progressivement les scooters thermiques."},
    {term:"RMP (Remise en Main Propre)",def:"Service garantissant que l'envoi est remis EXCLUSIVEMENT au destinataire nommé sur l'envoi. Aucun tiers ne peut le recevoir : ni voisin, ni membre de la famille, ni mandataire (procuration invalide)."},
    {term:"Abus de confiance (art. 138 CP)",def:"Infraction pénale suisse : action de s'approprier frauduleusement un bien qui vous a été confié. En logistique : réceptionner un envoi sans en avoir le droit. Passible d'une peine privative de liberté ou d'une amende."},
    {term:"Procuration",def:"Document légal par lequel le MANDANT autorise une ou plusieurs personnes (MANDATAIRES) à agir en son nom pour réceptionner des envois postaux. Elle doit être établie EN PRÉSENCE du mandant (au guichet ou devant le facteur)."},
    {term:"Mandant",def:"Personne qui signe la procuration et donne l'autorisation à quelqu'un d'agir en son nom. Le mandant doit être présent lors de l'établissement de la procuration."},
    {term:"Mandataire",def:"Personne qui reçoit la procuration et est autorisée à agir au nom du mandant. Peut réceptionner les envois ordinaires, mais JAMAIS les envois RMP."},
    {term:"Durée de réexpédition",def:"1 AN : durée maximale d'une réexpédition suite à un changement d'adresse définitif. Après ce délai, les envois sont retournés à l'expéditeur."},
    {term:"Garde du courrier",def:"Service permettant à un abonné absent (vacances, hospitalisation) de faire conserver son courrier à l'office de poste. Durée minimum : 2 semaines. Durée maximum : 24 semaines."},
    {term:"Consignation",def:"Confier quelque chose en garde à quelqu'un contre remise d'un reçu (quittance). En logistique : une marchandise est laissée en dépôt dans une unité logistique contre reconnaissance de dette ou bon de garde."},
    {term:"Documents d'identité acceptés",def:"Pour les envois nécessitant identification : carte d'identité (CH ou étrangère), passeport, permis de conduire suisse, titre de séjour, carte d'identité La Poste. Le permis de conduire n'est accepté qu'en Suisse."},
  ]},
 ],
 questions:[
  {q:"Le 'casotage' désigne :",options:["Le chargement de colis dans des casiers automatiques","Le tri détaillé du courrier par le facteur avant sa tournée (client par client)","Le dépôt de colis dans les cases postales","Le tri des lettres par format au centre courrier"],answer:1},
  {q:"Quelles sont les couleurs des étiquettes de tri du courrier ?",options:["Courrier A = blanc","Courrier B = blanc à rayures bleues","Envois en nombre = blanc à rayures jaunes","Recommandé = rouge"],answers:[0,1,2],multi:true},
  {q:"La procuration n'est PAS valable pour :",options:["PostPac Priority","Lettres recommandées","RMP (Remise en Main Propre)","Courrier ordinaire"],answer:2},
  {q:"Durée MAXIMUM de garde du courrier à La Poste :",options:["2 semaines","12 semaines","24 semaines","52 semaines"],answer:2},
  {q:"Durée MINIMUM de garde du courrier à La Poste :",options:["1 semaine","2 semaines","4 semaines","1 mois"],answer:1},
  {q:"Durée d'une réexpédition suite à un changement d'adresse :",options:["3 mois","6 mois","1 an","2 ans"],answer:2},
  {q:"Les 3 critères de tri du courrier sont :",options:["Poids, format et destination","Produit (A/B), format (FN/GF) et processus de traitement (auto/manuel)","Date, expéditeur et destinataire","Couleur, taille et poids"],answer:1},
  {q:"En zone urbaine, comment la distribution est-elle organisée ?",options:["Un facteur distribue tout (lettres + colis)","Lettres et colis distribués SÉPARÉMENT par des équipes différentes","Distribution uniquement à pied","Distribution uniquement en véhicule"],answer:1},
  {q:"Quels documents sont acceptés pour vérifier l'identité lors d'une remise ?",options:["Carte d'identité suisse ou étrangère","Passeport","Permis de conduire (Suisse)","Titre de séjour","Carte fidélité"],answers:[0,1,2,3],multi:true},
  {q:"Qu'est-ce que l'abus de confiance (art. 138 CP) en logistique ?",options:["Retard dans la livraison","S'approprier frauduleusement un envoi sans en avoir le droit → peine ou amende","Un manquement au secret postal","Un défaut d'emballage"],answer:1},
  {q:"Une procuration VALIDE doit contenir :",options:["Nom+adresse+signature du mandant","Nom+adresse du mandataire","Durée de validité","La valeur du contenu","Le numéro de l'envoi"],answers:[0,1,2],multi:true},
  {q:"La Poste retourne GRATUITEMENT un envoi si :",options:["Le colis est trop lourd","Le destinataire est décédé ou l'adresse est incorrecte","L'affranchissement est insuffisant","Le destinataire refuse l'envoi"],answer:1},
  {q:"Les personnes au même domicile peuvent recevoir :",options:["Tous les types d'envois sans restriction","Uniquement les envois RMP","Les envois ORDINAIRES (pas les RMP, recommandés avec restriction)","Aucun envoi à la place du destinataire"],answer:2},
  {q:"Qu'est-ce que le DXP en logistique postale ?",options:["Un logiciel de planification des tournées","Un véhicule électrique à 3 roues utilisé par les facteurs","Un système de codage vidéo","Un type de code-barres"],answer:1},
 ]};

const CH10 = {id:"c10",num:10,title:"Les modes de transport",icon:"🚛",color:"#37474F",textColor:"#fff",
 content:[
  {T:"intro",x:"Par trafic de marchandises, on entend le déplacement d'un bien entre deux endroits ainsi que l'organisation et la surveillance du transport. Chaque mode a ses avantages, contraintes légales et domaine d'application."},
  {T:"section",x:"Les 6 modes de transport"},
  {T:"list",items:["Transport ROUTIER : le plus flexible, dessert tous les points","Transport FERROVIAIRE : efficace pour longues distances et grands volumes","Transport AÉRIEN : le plus rapide, le plus coûteux","Transport MARITIME : le plus économique pour les grands volumes","Transport COMBINÉ / INTERMODAL : plusieurs modes combinés","Transport par PIPELINE/GAZODUC : liquides et gaz uniquement"]},
  {T:"section",x:"Transport routier — Permis et véhicules"},
  {T:"hl",bg:"#f5f5f5",b:"#37474F",ti:"Permis requis par type de véhicule",x:"Permis A1 (dès 16 ans) : motos avec remorque (La Poste).\nPermis B : véhicules de livraison ≤ 3,5 t. PAS soumis à la RPLP.\nPermis C : poids lourds. Max 18 t seul, 34 t avec remorque. 2 à 3 essieux.\nPermis CE : tracteur + remorque > 750 kg. Tracteur seul = interdit de chargement."},
  {T:"section",x:"Dimensions légales des véhicules (tableau Word)"},
  {T:"img",src:"/images/c21.png",alt:"Tableau dimensions légales poids lourds"},
  {T:"hl",bg:"#f5f5f5",b:"#37474F",ti:"Limites réglementaires en Suisse",x:"Hauteur globale autorisée : 4,00 m\nLargeur : 2,55 m (2,60 m pour les véhicules frigorifiques)\nLongueur trains routiers (camion + remorque) : jusqu'à 18,75 m\nLongueur semi-remorques : jusqu'à 16,50 m\nSurface de chargement trains routiers : 36 Europalettes (18+18)\nSurface de chargement semi-remorques : 34 Europalettes"},
  {T:"section",x:"RPLP — Redevance sur le Trafic des Poids Lourds"},
  {T:"hl",bg:"#fff8e1",b:"#f59e0b",ti:"RPLP — Points clés",x:"Applicable dès 2005. Concerne tous les véhicules > 3,5 t.\nPlafond légal en Suisse : 40 tonnes (accord bilatéral UE-Suisse).\nFormule : Émissions du véhicule × Km parcourus × Poids (tracteur + remorque).\nEnregistrement : appareil électronique embarqué + tachygraphe + GPS de contrôle.\nObjectif : inciter à acquérir des véhicules moins polluants."},
  {T:"section",x:"Tachygraphe numérique"},
  {T:"list",items:["Vitesse instantanée et historique","Temps de conduite, de travail et de repos du chauffeur (obligations légales)","Kilomètres parcourus (kilométrage avant/après trajet)","Numéro de contrôle, date, identification du chauffeur"]},
  {T:"section",x:"Transport ferroviaire suisse"},
  {T:"hl",bg:"#e3f2fd",b:"#1565C0",ti:"Réseau ferroviaire suisse — Chiffres clés",x:"5'000 km de rails (réseau le plus dense d'Europe)\n3'000 km exploités par les CFF, le reste par des compagnies privées\n671 tunnels (dont 250 CFF) / 6'000 ponts ferroviaires\nNLFA : Nouvelles Lignes Ferroviaires à travers les Alpes (tunnels de base Gothard 57 km et Lötschberg)"},
  {T:"section",x:"Traité de Maastricht (1992) et compagnies ferroviaires"},
  {T:"hl",bg:"#e3f2fd",b:"#1565C0",ti:"Traité de Maastricht — Impact sur le rail européen",x:"Le traité de Maastricht (1992) a permis d'unifier les locomotives, wagons et personnel entre pays membres pour rouler à l'international, facilitant le transit de marchandises sans changer d'engin aux frontières."},
  {T:"list",items:["CFF Cargo : plus grand prestataire de fret ferroviaire en Suisse, ses propres locomotives et personnel.","ChemOil Logistic : filiale CFF Cargo, spécialisée transport de pétrole et produits chimiques.","BLS Cargo (créé en 2001) : transit alpin via Lötschberg, Simplon et Gothard.","RHB (Chemins de Fer Rhétiques) : voie étroite, dessert le canton des Grisons."]},
  {T:"section",x:"Types de wagons de marchandises"},
  {T:"list",items:["Wagon couvert : marchandises sensibles aux intempéries","Wagon spécial couvert : conditions de transport particulières","Wagon plat : marchandises résistantes aux intempéries","Wagon ouvert : vrac, minerais, graviers","Wagon silo : céréales, ciment, produits chimiques","Wagon plate-forme 4 essieux : charges lourdes et volumineuses"]},
  {T:"section",x:"Transport maritime"},
  {T:"text",x:"Le Rhin est la seule voie navigable internationale suisse. Il permet le transit de 10 à 12% des importations suisses et un tiers des huiles minérales. La Convention de Mannheim garantit le libre accès aux mers."},
  {T:"hl",bg:"#e3f2fd",b:"#1565C0",ti:"Conteneurs ISO et mesures maritimes",x:"1 TEU = 1 conteneur de 20 pieds (6,058 × 2,438 × 2,591 m)\n1 conteneur de 40 pieds = 2 TEU\n\nMesures de volume/capacité :\n• DWT (Deadweight Tons) : charge totale maximale que le navire peut transporter\n• TB (Tonnage Brut) : volume total du navire\n• TN (Tonnage Net) : espace commercial utilisable\n• TJB (Tonneau de Jauge Brute) : ancienne mesure du volume"},
  {T:"img",src:"/images/c22.png",alt:"Fret : Expéditeur/Affréteur → Transitaire → Destinataire"},
  {T:"section",x:"Le connaissement (Bill of Lading) — document clé maritime"},
  {T:"hl",bg:"#e8f5e9",b:"#2E7D32",ti:"Le connaissement — 4 fonctions",x:"1. Récépissé du transporteur (preuve de réception de la marchandise).\n2. Promesse de transport (l'armateur s'engage à transporter).\n3. Promesse de livraison (au destinataire nommé ou porteur).\n4. Document NÉGOCIABLE : peut être vendu pendant le transport (le propriétaire peut changer).\n\nAWB (Air Waybill = lettre de transport aérien) : NON négociable. Contrat fixe entre expéditeur et compagnie aérienne."},
  {T:"section",x:"Trafic combiné rail-route"},
  {T:"list",items:["Chaussée roulante (ferroutage ACCOMPAGNÉ) : le PL monte sur le train, le chauffeur voyage en wagon. À destination, il reprend le volant.","Ferroutage NON ACCOMPAGNÉ : la remorque seule voyage sur train (sans chauffeur)","Shuttle Net : réseau européen pour trafic combiné (conteneurs, caisses mobiles, remorques)","ACTS (Adaptable Container Transport System) : conteneurs à roulettes d'un côté + crochet de l'autre","Cargo Domino : système de glissement direct des conteneurs sur les wagons"]},
  {T:"section",x:"Les Incoterms"},
  {T:"hl",bg:"#e8f5e9",b:"#2E7D32",ti:"Incoterms — Ce qu'ils règlent et ne règlent PAS",x:"RÈGLENT : répartition des coûts, obtention des documents, paiement des droits de douane, transfert des risques.\n\nNE RÈGLENT PAS (les 4 exclusions) :\n1. Prix d'achat\n2. Conditions de paiement\n3. Transfert de la propriété\n4. Validité juridique du contrat"},
  {T:"gloss",items:[
    {term:"RPLP (Redevance sur le Trafic des Poids Lourds liée aux Prestations)",def:"Taxe kilométrique suisse applicable depuis 2005 aux véhicules > 3,5t. Formule : Émissions × km parcourus × poids. Plafond légal : 40 tonnes (accord bilatéral CH-UE). Objectif : financer l'infrastructure ferroviaire et réduire le trafic lourd."},
    {term:"Permis C et CE",def:"Permis C : poids lourds seuls (18t max seul, 34t avec remorque ≤750kg). Permis CE : tracteur + remorque >750kg (semi-remorques). Sans permis CE, le tracteur seul ne peut pas être chargé."},
    {term:"Tachygraphe numérique",def:"Appareil embarqué obligatoire dans les poids lourds enregistrant : vitesse, temps de conduite/travail/repos, kilomètres parcourus. Données non falsifiables, contrôlées par les autorités."},
    {term:"Traité de Maastricht (1992)",def:"Traité européen permettant d'unifier locomotives, wagons et personnel entre pays membres pour le transport ferroviaire international. Facilite le transit sans changer d'engin aux frontières."},
    {term:"ChemOil Logistic",def:"Filiale de CFF Cargo spécialisée dans le transport ferroviaire de pétrole et produits chimiques sur le réseau suisse."},
    {term:"Types de wagons",def:"Wagon couvert (intempéries), wagon spécial couvert, wagon plat (résistant), wagon ouvert (vrac/minerais), wagon silo (céréales/ciment), wagon plate-forme 4 essieux (charges lourdes)."},
    {term:"CFF Cargo",def:"Plus grand prestataire de transport ferroviaire de marchandises en Suisse. Gère le fret national et participe au transit alpin."},
    {term:"BLS Cargo",def:"Société créée en 2001 spécialisée dans le transit alpin via le Lötschberg, le Simplon et le Gothard. Opère des trains complets et du trafic combiné."},
    {term:"NLFA (Nouvelles Lignes Ferroviaires à travers les Alpes)",def:"Grand projet ferroviaire suisse comprenant le tunnel de base du Gothard (57 km, le plus long tunnel ferroviaire du monde) et le tunnel de base du Lötschberg. Permet le transit rapide des marchandises à travers les Alpes."},
    {term:"TEU (Twenty-foot Equivalent Unit)",def:"Unité de mesure standard des conteneurs maritimes équivalant à un conteneur de 20 pieds de long (6,058 × 2,438 × 2,591 m). Permet de comparer la capacité des navires porte-conteneurs."},
    {term:"Connaissement (Bill of Lading)",def:"Document LE PLUS IMPORTANT du transport maritime. Il est NÉGOCIABLE (peut être vendu pendant le transport). Ses 4 fonctions : récépissé du transporteur + promesse de transport + promesse de livraison + document de propriété."},
    {term:"AWB (Air Waybill / Lettre de transport aérien)",def:"Contrat de transport aérien entre expéditeur et compagnie. NON NÉGOCIABLE (ne peut pas être vendu pendant le transport). Sert aussi de : confirmation de réception, instructions à l'aéroport, justificatif d'assurance, déclaration douanière."},
    {term:"Incoterms (International Commercial Terms)",def:"11 termes standardisés publiés par la CCI définissant la répartition des coûts et risques entre vendeur et acheteur dans le commerce international. Ils réglent : les coûts, les documents, les droits de douane, le transfert des risques. ILS NE RÈGLENT PAS : le prix, les conditions de paiement, le transfert de propriété, la validité du contrat."},
    {term:"DWT (Deadweight Tons)",def:"Mesure indiquant la charge totale maximale qu'un navire peut transporter : marchandises + carburant + vivres + équipage + eau. C'est la capacité de charge commerciale nette du navire."},
    {term:"Chaussée roulante (ferroutage accompagné)",def:"Le camion complet (tracteur + remorque) est chargé sur un wagon. Le chauffeur voyage dans un wagon d'accompagnement. À destination, il repart au volant. Utilisé par exemple via le tunnel du Lötschberg."},
    {term:"ACTS (Adaptable Container Transport System)",def:"Système de conteneurs à roulettes d'un côté et à crochet de l'autre, permettant le chargement/déchargement automatique sur les camions. Le conteneur pivote sur le camion sans engin de levage."},
    {term:"Affréteur",def:"Dans le transport maritime : équivalent de l'expéditeur. Personne ou entreprise qui loue un navire (ou une partie de sa capacité) pour y transporter ses marchandises."},
    {term:"Transitaire",def:"Intermédiaire logistique spécialisé qui organise le transport international pour le compte de ses clients. Il s'occupe des documents, des douanes et du choix des transporteurs."},
  ]},
 ],
 questions:[
  {q:"La RPLP s'applique aux véhicules motorisés de plus de :",options:["1,5 tonne","3,5 tonnes","7,5 tonnes","12 tonnes"],answer:1},
  {q:"1 TEU correspond à :",options:["Un conteneur de 40 pieds","Un conteneur de 20 pieds (6,058 × 2,438 × 2,591 m)","Deux conteneurs de 10 pieds","Un demi-conteneur de 40 pieds"],answer:1},
  {q:"Le connaissement (Bill of Lading) diffère de l'AWB car :",options:["Il couvre uniquement les marchandises fragiles","Il EST NÉGOCIABLE : peut être vendu pendant le transport","Il est valable pour tous les modes","Il est rédigé uniquement en anglais"],answer:1},
  {q:"Le CFF Cargo est :",options:["Une filiale de DHL en Suisse","Le plus grand prestataire de fret ferroviaire en Suisse","La compagnie gérant les NLFA","Un opérateur de transport aérien"],answer:1},
  {q:"Les Incoterms NE règlent PAS :",options:["La répartition des coûts de transport","Le transfert des risques","Le prix d'achat et les conditions de paiement","Le paiement des droits de douane"],answer:2},
  {q:"La chaussée roulante (ferroutage accompagné) signifie :",options:["La remorque seule voyage sur le train","Le camion complet monte sur le train, le chauffeur voyage en wagon","Le transport de conteneurs sur barges fluviales","Un type de conteneur à roulettes"],answer:1},
  {q:"Quelle est la hauteur maximale autorisée pour un poids lourd en Suisse ?",options:["3,50 m","4,00 m","4,20 m","3,80 m"],answer:1},
  {q:"Combien d'Europalettes charge un train routier complet (camion + remorque) ?",options:["18","24","34","36"],answer:3},
  {q:"Le permis CE est requis pour :",options:["Les véhicules de livraison jusqu'à 3,5 t","Les poids lourds seuls","Un tracteur + remorque de plus de 750 kg","Les motos avec remorque"],answer:2},
  {q:"Quels sont les 4 fonctions du connaissement (Bill of Lading) ?",options:["Récépissé du transporteur","Promesse de transport","Promesse de livraison","Document négociable (propriété)","Déclaration douanière"],answers:[0,1,2,3],multi:true},
  {q:"Le poids maximum autorisé pour un attelage routier en Suisse est :",options:["28 tonnes","34 tonnes","40 tonnes","44 tonnes"],answer:2},
  {q:"La NLFA comprend :",options:["Le tunnel du Gothard uniquement","Le tunnel du Lötschberg uniquement","Les tunnels de base du Gothard ET du Lötschberg","Le tunnel du Simplon et du Grand Saint-Bernard"],answer:2},
  {q:"Quels modes font partie des transports combinés rail-route ?",options:["Chaussée roulante (ferroutage accompagné)","Ferroutage non accompagné","Shuttle Net","ACTS","Cargo Domino"],answers:[0,1,2,3,4],multi:true},
  {q:"Quelle est la formule de calcul de la RPLP ?",options:["Poids × distance","Émissions × km parcourus × poids (tracteur + remorque)","Nombre d'essieux × km","Charge utile × prix du carburant"],answer:1},
  {q:"Le Rhin représente quelle proportion des importations suisses ?",options:["3 à 5%","10 à 12%","25 à 30%","50%"],answer:1},
 ]};

const CH11 = {id:"c11",num:11,title:"L'arrimage des marchandises sur palettes",icon:"🔒",color:"#6D4C41",textColor:"#fff",
 content:[
  {T:"intro",x:"L'arrimage correct des marchandises est une obligation légale et une nécessité de sécurité. Un chargement mal sécurisé peut causer des accidents graves. Trois méthodes principales existent, souvent combinées."},
  {T:"section",x:"Méthode 1 — Stretching (film étirable)"},
  {T:"hl",bg:"#efebe9",b:"#6D4C41",ti:"Stretching — Règles impératives",x:"Méthode la plus simple pour les chargements HOMOGÈNES.\n\n2 règles obligatoires :\n1. Le film DOIT être étiré (stretched) PENDANT l'enroulage — sans étirement, il n'assure pas la cohésion.\n2. Les unités DOIVENT être enveloppées AVEC la palette — le film fixe les marchandises à la palette."},
  {T:"section",x:"Méthode 2 — Thermo-rétraction"},
  {T:"text",x:"Le chargement est recouvert d'une housse plastique qui est chauffée (soufflante ou flamme). En se rétractant, le film épouse parfaitement la forme du chargement."},
  {T:"hl",bg:"#e8f5e9",b:"#2E7D32",ti:"Avantages et inconvénient",x:"Avantages : excellente protection contre intempéries et vol (film opaque), s'adapte aux formes irrégulières.\nInconvénient majeur : peu écologique (énergie + plastique difficile à recycler)."},
  {T:"section",x:"Méthode 3 — Cerclage"},
  {T:"text",x:"Les chargements de grosses unités sont sécurisés par cerclage à l'aide d'un ruban en plastique ou en acier."},
  {T:"list",items:["Cerclage VERTICAL : fixe les piles dans le sens de la hauteur","Cerclage HORIZONTAL : maintient les unités ensemble latéralement","Combinaison VERTICAL + HORIZONTAL : pour les chargements les plus instables"]},
  {T:"section",x:"Choix et caractéristiques des rubans"},
  {T:"list",items:["Facteurs de choix : sollicitations de transport, conditions climatiques, prix, caractère écologique","Ruban plastique : moins cher, plus léger, mais moins résistant","Ruban acier : plus résistant, pour les charges lourdes, mais plus coûteux"]},
  {T:"hl",bg:"#fff8e1",b:"#f59e0b",ti:"Calcul de la résistance d'un ruban — Formule",x:"Résistance = Section (mm²) × Résistance spécifique (N/mm²)\nSection = Largeur (mm) × Épaisseur (mm)\n\nEXEMPLE du cours :\nLargeur 20 mm × épaisseur 0,4 mm = section 8 mm²\n8 mm² × 400 N/mm² = 3'200 N de résistance maximale\n\nAllongement à la rupture : % d'élongation maximale avant rupture. Plus élevé = meilleure absorption des chocs dynamiques."},
  {T:"section",x:"Types de fermeture des rubans"},
  {T:"list",items:["Avec BOUCLE : cerclage manuel sans machine. Fermeture par boucle métallique.","Avec CHAPE : machine qui tend le ruban. La chape maintient les deux extrémités.","Sans CHAPE (soudure / poinçonnage / encliquetage) : machine automatique. Fermeture très solide."]},
  {T:"gloss",items:[
    {term:"Stretching",def:"Méthode d'arrimage utilisant un film plastique étirable enroulé autour du chargement. Règle impérative : le film doit être ÉTIRÉ pendant l'enroulage. Les marchandises doivent être enveloppées AVEC la palette pour les fixer. Adapté aux chargements homogènes."},
    {term:"Thermo-rétraction",def:"Méthode d'arrimage utilisant une housse plastique chauffée (soufflante ou flamme) qui se rétrécit en épousant parfaitement la forme du chargement. Avantages : protection météo, anti-vol. Inconvénient : peu écologique."},
    {term:"Cerclage vertical",def:"Ruban de cerclage passant de haut en bas autour de la pile pour la fixer dans le sens de la hauteur. Empêche le renversement de la pile vers l'avant ou l'arrière."},
    {term:"Cerclage horizontal",def:"Ruban de cerclage passant à l'horizontale autour des unités pour les maintenir ensemble latéralement. Empêche l'écartement ou le glissement latéral des éléments."},
    {term:"Ruban plastique vs ruban acier",def:"Plastique : moins cher, plus léger, bon allongement à la rupture (absorbe les chocs). Acier : plus résistant, pour les charges très lourdes, mais moins d'allongement (risque de rupture sèche) et plus coûteux."},
    {term:"Résistance d'un ruban (N/mm²)",def:"La résistance d'un ruban de cerclage s'exprime en Newton par mm². Formule : Résistance totale = Section (mm²) × Résistance spécifique (N/mm²). Section = Largeur × Épaisseur. Exemple : 8 mm² × 400 N/mm² = 3'200 N."},
    {term:"Allongement à la rupture",def:"Pourcentage d'élongation maximale qu'un ruban peut subir avant de se rompre. Un allongement élevé (ex: 20%) signifie que le ruban absorbe mieux les chocs et vibrations dynamiques avant de céder."},
    {term:"Fermeture avec boucle",def:"Méthode manuelle de fermeture d'un ruban de cerclage : les deux extrémités du ruban sont assemblées avec une boucle métallique. Pas besoin de machine. Utilisée pour les cerclages manuels ponctuels."},
    {term:"Fermeture avec chape",def:"Méthode de fermeture utilisant une machine à cercler qui tend le ruban, puis une chape (pièce métallique) maintient les deux extrémités serrées. Tension plus élevée que la boucle manuelle."},
    {term:"Fermeture sans chape (soudure/poinçonnage/encliquetage)",def:"Méthode automatique : la machine tend le ruban puis soude les extrémités (plastique), les poinçonne ou les encliquète. Fermeture la plus solide. Aucune pièce métallique supplémentaire nécessaire."},
    {term:"Chargement homogène",def:"Chargement composé d'articles tous de même taille, forme et poids. Le stretching est particulièrement adapté car le film peut être appliqué uniformément. Exemples : caisses identiques empilées régulièrement."},
  ]},
 ],
 questions:[
  {q:"Le 'stretching' désigne :",options:["Le cerclage à l'aide de rubans en acier","L'enveloppement au film étirable avec le film ÉTIRÉ pendant l'enroulage","La thermo-rétraction à la flamme","Le cerclage vertical de palettes"],answer:1},
  {q:"Lors du stretching, pourquoi les marchandises doivent-elles être enveloppées AVEC la palette ?",options:["Pour économiser du film","Pour fixer les marchandises à la palette et garantir la stabilité","Pour chauffer le film","Pour faciliter le déroulage"],answer:1},
  {q:"La thermo-rétraction présente quel inconvénient majeur ?",options:["Elle ne protège pas contre le vol","Elle est peu écologique (énergie + plastique difficile à recycler)","Elle ne résiste pas à la chaleur","Elle est uniquement pour les marchandises fragiles"],answer:1},
  {q:"La résistance d'un ruban de largeur 20mm, épaisseur 0,4mm et résistance 400N/mm² est de :",options:["400 N","800 N","3'200 N","8'000 N"],answer:2},
  {q:"Quelles sont les 3 méthodes d'arrimage sur palettes ?",options:["Stretching","Thermo-rétraction","Cerclage","Sangles textiles","Film bullé"],answers:[0,1,2],multi:true},
  {q:"Le cerclage VERTICAL sert à :",options:["Maintenir les unités ensemble latéralement","Fixer les piles dans le sens de la hauteur (haut/bas)","Protéger l'emballage de l'humidité","Fermer les cartons"],answer:1},
  {q:"Le cerclage HORIZONTAL sert à :",options:["Fixer les piles dans le sens de la hauteur","Maintenir les unités ensemble latéralement","Protéger contre les chutes","Fixer le chargement à la palette"],answer:1},
  {q:"Quels facteurs influencent le choix du ruban de cerclage ?",options:["Sollicitations de transport","Conditions climatiques","Prix","Caractère écologique","La couleur du ruban"],answers:[0,1,2,3],multi:true},
  {q:"L'allongement à la rupture d'un ruban de cerclage représente :",options:["Sa largeur maximale","Le pourcentage d'élongation avant rupture — plus élevé = meilleure absorption des chocs","Sa résistance maximale en Newton","Sa durée de vie garantie"],answer:1},
  {q:"La fermeture 'sans chape' d'un ruban est réalisée par :",options:["Nouage manuel","Soudure, poinçonnage ou encliquetage (machine automatique)","Agrafage manuel","Adhésif double face"],answer:1},
  {q:"Pour quel type de chargement le stretching est-il particulièrement adapté ?",options:["Chargements hétérogènes (articles différents)","Chargements homogènes (articles identiques en taille et forme)","Chargements très lourds uniquement","Chargements de produits liquides"],answer:1},
  {q:"Quels avantages présente la thermo-rétraction ?",options:["Excellente protection contre les intempéries (pluie, poussière)","Protection anti-vol (film opaque possible)","S'adapte aux formes irrégulières","Très écologique","Pas d'énergie requise"],answers:[0,1,2],multi:true},
  {q:"La fermeture 'avec boucle' du cerclage est utilisée pour :",options:["Le cerclage automatique en machine","Le cerclage MANUEL sans machine (boucle métallique)","Le cerclage sous haute tension","Les chargements très lourds uniquement"],answer:1},
 ]};


const CH12 = {id:"c12",num:12,title:"Le chargement de marchandises",icon:"⚖️",color:"#1B5E20",textColor:"#fff",
 content:[
  {T:"intro",x:"Tout mouvement génère des forces dynamiques qui s'exercent sur les marchandises. Comprendre ces forces et les contrer par un chargement et un arrimage corrects est une obligation légale du chauffeur et une condition essentielle de sécurité routière."},
  {T:"section",x:"Les 4 forces dynamiques en transport routier"},
  {T:"hl",bg:"#e8f5e9",b:"#1B5E20",ti:"Forces et directions",x:"1. Force d'ACCÉLÉRATION : direction ARRIÈRE (la marchandise tend à rester sur place quand le véhicule avance).\n\n2. Force de FREINAGE/DÉCÉLÉRATION : direction AVANT. LA PLUS FORTE des 4 forces routières.\n\n3. Force CENTRIFUGE : dans les virages, direction vers l'EXTÉRIEUR du virage. Elle est 2× plus forte que la force d'accélération.\n\n4. Forces VERTICALES (vibrations) : routes irrégulières, ponts, etc. Elles réduisent le frottement et l'adhérence.\n\nChargements à ciel ouvert : ajouter la RÉSISTANCE À L'AIR et le VENT."},
  {T:"section",x:"Forces dans le trafic ferroviaire"},
  {T:"text",x:"Les forces sont INFÉRIEURES au trafic routier EN GÉNÉRAL. Mais lors des MANŒUVRES, les wagons subissent des chocs violents (tampons) qui doivent être pris en compte pour l'arrimage."},
  {T:"section",x:"Forces dans le trafic maritime — Les 3 mouvements d'un navire"},
  {T:"hl",bg:"#e3f2fd",b:"#1565C0",ti:"Roulis, tangage et lacet",x:"ROULIS : balancement autour de l'AXE LONGITUDINAL (avant-arrière). Le navire se penche alternativement à bâbord et à tribord.\n\nTANGAGE : balancement autour de l'AXE TRANSVERSAL (bâbord-tribord). L'avant et l'arrière montent et descendent alternativement.\n\nLACET : rotation autour de l'AXE VERTICAL. Le navire tourne horizontalement sur lui-même."},
  {T:"section",x:"Positionnement et règles de chargement"},
  {T:"list",items:["Chargement COMPACT et sans espace vide entre les unités","Espaces vides à combler (palettes vides, coussins d'air, mousses)","Marchandises FRAGILES : JAMAIS près des parois frontales (forces de choc maximales)","Marchandises fragiles au CENTRE du wagon ou du camion","Centre de gravité le plus BAS possible","Marchandises LOURDES en bas de la pile"]},
  {T:"section",x:"L'arrimage correct"},
  {T:"text",x:"Les cargaisons isolées se déplacent sous l'influence des vibrations. Elles doivent être arrimées VERS LE BAS (sanglées sur la surface de chargement)."},
  {T:"hl",bg:"#fff8e1",b:"#f59e0b",ti:"Arrimage en biais — Le plus optimal",x:"L'arrimage en BIAIS (diagonal) est le plus efficace car il empêche le glissement dans TOUTES LES DIRECTIONS simultanément."},
  {T:"section",x:"Répartition des charges — Règles précises"},
  {T:"img",src:"/images/c24.png",alt:"Répartition charges wagons — 2:1 et 3:1"},
  {T:"hl",bg:"#fce4ec",b:"#C62828",ti:"Règles de répartition des charges",x:"Sens de la LARGEUR : rapport côté lourd / côté léger ≤ 1,25\nEx : 5'000 kg / 4'200 kg = 1,19 → OK\n\nSens de la LONGUEUR — Wagons à 2 essieux : rapport de charge maximal = 2:1 (essieu le plus chargé / essieu le moins chargé).\n\nSens de la LONGUEUR — Wagons à 4 essieux (bogies) : rapport maximal = 3:1 (charge sur bogies)."},
  {T:"gloss",items:[
    {term:"Force de freinage / décélération",def:"La PLUS FORTE des forces dynamiques en transport routier. Lorsque le véhicule freine, la marchandise continue par inertie vers l'AVANT du véhicule. Un arrimage insuffisant provoque le déplacement de la charge vers la paroi frontale."},
    {term:"Force d'accélération",def:"Lorsque le véhicule accélère, la marchandise tend à rester sur place par inertie → elle est 'projetée' vers l'ARRIÈRE du véhicule. Moins intense que la force de freinage."},
    {term:"Force centrifuge",def:"Dans les virages, la marchandise est projetée vers l'EXTÉRIEUR du virage. Elle est 2× plus intense que la force d'accélération. Un centre de gravité trop haut augmente le risque de renversement du véhicule."},
    {term:"Forces verticales (vibrations)",def:"Oscillations verticales dues aux routes irrégulières, ponts, joints de dilatation, passages à niveau. Elles réduisent l'adhérence et le frottement entre la marchandise et le plancher, favorisant le déplacement de la charge."},
    {term:"Roulis",def:"Mouvement d'un navire autour de son axe longitudinal (avant-arrière). Le navire se penche alternativement à bâbord (gauche) et à tribord (droite). Génère des forces latérales sur la cargaison."},
    {term:"Tangage",def:"Mouvement d'un navire autour de son axe transversal (bâbord-tribord). L'avant (proue) et l'arrière (poupe) montent et descendent alternativement. Génère des forces longitudinales sur la cargaison."},
    {term:"Lacet",def:"Mouvement de rotation d'un navire autour de son axe vertical. Le navire pivote horizontalement sur lui-même, comme une toupie. Génère des forces de torsion sur la cargaison."},
    {term:"Arrimage vers le bas",def:"Les cargaisons isolées (non solidaires entre elles) doivent être arrimées vers le bas, c'est-à-dire fixées sur la surface de chargement par des sangles. Empêche le déplacement sous l'effet des vibrations."},
    {term:"Arrimage en biais (diagonal)",def:"Méthode d'arrimage la plus efficace : les sangles sont placées diagonalement, ce qui empêche le glissement de la marchandise dans TOUTES LES DIRECTIONS simultanément (avant/arrière ET latéral)."},
    {term:"Règle des 1,25 (sens de la largeur)",def:"La répartition latérale du chargement ne doit pas dépasser le rapport de 1,25. Formule : côté le plus lourd ÷ côté le plus léger ≤ 1,25. Une mauvaise répartition augmente le risque de renversement et allonge la distance de freinage."},
    {term:"Rapport 2:1 (wagons à 2 essieux)",def:"Pour les wagons à 2 essieux, la charge sur l'essieu le plus chargé ne doit pas dépasser 2 fois la charge de l'essieu le moins chargé. Garantit la stabilité du wagon et protège les rails."},
    {term:"Rapport 3:1 (wagons à 4 essieux / bogies)",def:"Pour les wagons à 4 essieux (sur bogies), le rapport de charge entre les deux bogies ne doit pas dépasser 3:1. Les bogies permettent plus de flexibilité grâce à leur rotation indépendante."},
    {term:"Coussins d'air",def:"Sacs gonflables de calage utilisés dans les wagons et conteneurs pour combler les espaces vides entre les marchandises. Évitent le déplacement de la charge lors des manœuvres ferroviaires."},
    {term:"Centre de gravité",def:"Point d'équilibre d'un chargement. Il doit être maintenu le plus BAS possible pour maximiser la stabilité et minimiser le risque de renversement lors des virages ou freinages. Marchandises lourdes toujours en bas."},
  ]},
 ],
 questions:[
  {q:"Quelle est la force dynamique LA PLUS FORTE en transport routier ?",options:["La force d'accélération (vers l'arrière)","La force de freinage/décélération (vers l'avant)","La force centrifuge dans les virages","Les vibrations verticales"],answer:1},
  {q:"La force centrifuge est combien de fois plus intense que la force d'accélération ?",options:["Égale","1,5 fois","2 fois","3 fois"],answer:2},
  {q:"Le 'roulis' d'un navire désigne :",options:["Le balancement autour de l'axe transversal","La rotation horizontale autour de l'axe vertical","Le balancement autour de l'axe longitudinal (bâbord/tribord)","L'oscillation verticale de la proue/poupe"],answer:2},
  {q:"Le 'tangage' d'un navire désigne :",options:["Le balancement autour de l'axe transversal (avant/arrière montent et descendent)","Le balancement autour de l'axe longitudinal","La rotation horizontale autour de l'axe vertical","L'oscillation latérale du navire"],answer:0},
  {q:"Où NE FAUT-IL PAS placer les marchandises fragiles dans un wagon ?",options:["Au centre du wagon","En bas du chargement","Près des PAROIS FRONTALES (forces de choc maximales lors des manœuvres)","Sur la partie supérieure"],answer:2},
  {q:"L'arrimage en biais est le plus optimal car :",options:["Il utilise moins de sangles","Il empêche le glissement dans TOUTES LES DIRECTIONS simultanément","Il est plus rapide à mettre en place","Il n'endommage pas l'emballage"],answer:1},
  {q:"La règle des 1,25 (sens de la largeur) signifie :",options:["La hauteur du chargement ne dépasse pas 1,25 m","Le rapport côté lourd / côté léger ne dépasse pas 1,25","Le poids total ne dépasse pas 1,25 t par essieu","La distance entre sangles ne dépasse pas 1,25 m"],answer:1},
  {q:"Pour les wagons à 2 essieux, le rapport de répartition dans le sens de la longueur ne doit pas dépasser :",options:["1,25 : 1","2 : 1 (essieu le plus chargé / le moins chargé)","3 : 1","4 : 1"],answer:1},
  {q:"Quelles forces s'exercent sur les marchandises en transport routier ?",options:["Force d'accélération (arrière)","Force de freinage (avant)","Force centrifuge (extérieur virage)","Forces verticales (vibrations)","Force magnétique"],answers:[0,1,2,3],multi:true},
  {q:"Les coussins d'air servent à :",options:["Réduire le poids du chargement","Combler les espaces vides pour éviter le déplacement de la charge","Absorber les vibrations du moteur","Isoler thermiquement les marchandises"],answer:1},
  {q:"Le centre de gravité d'un chargement doit être :",options:["Le plus haut possible pour faciliter le déchargement","Le plus bas possible pour maximiser la stabilité","Au centre exact du véhicule","Vers l'arrière pour faciliter la conduite"],answer:1},
  {q:"Quels sont les 3 mouvements d'un navire ?",options:["Roulis (axe longitudinal)","Tangage (axe transversal)","Lacet (axe vertical)","Glissement (axe diagonal)"],answers:[0,1,2],multi:true},
  {q:"Pourquoi les espaces vides dans un chargement sont-ils dangereux ?",options:["Ils augmentent le poids total","Ils permettent aux marchandises de se déplacer et d'endommager la cargaison ou le véhicule","Ils réduisent l'espace utile","Ils compliquent le déchargement"],answer:1},
  {q:"Les forces ferroviaires sont plus importantes que les forces routières :",options:["Toujours","Jamais","Uniquement lors des manœuvres (chocs des tampons)","Uniquement à grande vitesse"],answer:2},
  {q:"Pour les wagons à 4 essieux (bogies), le rapport maximal de charge est :",options:["1,25 : 1","2 : 1","3 : 1","4 : 1"],answer:2},
 ]};

const CH13 = {id:"c13",num:13,title:"La surveillance du transport",icon:"📊",color:"#4A148C",textColor:"#fff",
 content:[
  {T:"intro",x:"Dès que les marchandises prennent la route, le contrôle qualité classique s'arrête. Des indicateurs et dispositifs de surveillance permettent de monitorer les conditions de transport et d'identifier rapidement toute anomalie."},
  {T:"section",x:"Pourquoi surveiller le transport ?"},
  {T:"hl",bg:"#ede7f6",b:"#4A148C",ti:"Les 5 avantages de la surveillance",x:"1. Observation CONTRÔLABLE des consignes de manutention (de la fabrication jusqu'au client final).\n2. Détermination du MOMENT, du LIEU et des PERSONNES RESPONSABLES en cas de dégât.\n3. RÉDUCTION des dommages liés au transport (prise de conscience des acteurs).\n4. DÉCÈLEMENT RAPIDE des dommages cachés (non visibles à l'œil nu à la livraison).\n5. DIMINUTION des réclamations clients grâce à une meilleure maîtrise des risques."},
  {T:"section",x:"Les 3 types d'indicateurs"},
  {T:"list",items:["Indicateur de CHOC : révèle si la marchandise a subi un choc > seuil défini. Visible immédiatement (changement de couleur, marquage irréversible). Ne peut PAS être réinitialisé.","Indicateur de CHUTE (Tip n Tell) : détecte si l'emballage a basculé ou subi une chute dépassant une hauteur définie.","Indicateur HYGROMÉTRIQUE : mesure l'humidité relative. Révèle les expositions excessives à l'humidité (important pour produits sensibles à l'eau)."]},
  {T:"section",x:"Le protocole en 5 étapes"},
  {T:"hl",bg:"#ede7f6",b:"#4A148C",ti:"Utilisation des indicateurs — Protocole",x:"Étape 1 : L'indicateur est installé sur l'emballage AVANT l'expédition (en usine ou à l'entrepôt).\nÉtape 2 : Le TRANSPORTEUR confirme l'intégrité de l'indicateur lors de la PRISE EN CHARGE.\nÉtape 3 : Le DESTINATAIRE contrôle l'indicateur lors de la LIVRAISON. Si déclenché → signale immédiatement.\nÉtape 4 : L'ENTREPRISE DE TRANSPORT confirme la présence et l'état de l'indicateur à la livraison.\nÉtape 5 : Après contrôle approfondi → marchandise libérée OU traitement des dommages (réclamation)."},
  {T:"section",x:"L'enregistreur avec localisation GPS"},
  {T:"hl",bg:"#e0f7fa",b:"#00695C",ti:"Enregistreur GPS — Ce qu'il mesure",x:"Paramètres enregistrés :\n• Chocs (intensité et direction)\n• Température (en continu)\n• Humidité relative\n• Inclinaison (basculements)\n• Pression atmosphérique\n• Coordonnées de localisation GPS\n\nConvient particulièrement au TRANSPORT MARITIME (longue durée, conditions difficiles). Génère des rapports d'analyse."},
  {T:"section",x:"Le dispositif de suivi de position en temps réel"},
  {T:"list",items:["Combine GPS + réseau de téléphonie mobile","Envoie des courriels d'avertissement EN TEMPS RÉEL sur l'itinéraire","Mises à jour de statut automatiques","Rapports avec : date, heure, nombre d'événements depuis le dernier rapport"]},
  {T:"gloss",items:[
    {term:"Indicateur",def:"Outil d'évaluation et d'aide à la décision installé sur l'emballage avant expédition. Permet de détecter et enregistrer les incidents survenus pendant le transport (choc, chute, humidité). Irréversible une fois déclenché."},
    {term:"Indicateur de choc",def:"Dispositif révélant si la marchandise a subi un choc d'intensité supérieure au seuil prédéfini. Fonctionne par changement de couleur ou marquage irréversible, visible immédiatement sans instrument. NE PEUT PAS être réinitialisé."},
    {term:"Indicateur de chute (Tip n Tell)",def:"Dispositif détectant si l'emballage a été incliné au-delà d'un angle défini ou a subi une chute. Indique une manutention incorrecte (emballage posé dans le mauvais sens ou renversé). Irréversible."},
    {term:"Indicateur hygrométrique",def:"Dispositif mesurant et enregistrant l'humidité relative à laquelle l'emballage a été exposé. Se déclenche si le seuil d'humidité prédéfini est dépassé. Essentiel pour les produits sensibles à l'eau (électronique, alimentaire, pharma)."},
    {term:"Protocole d'utilisation des indicateurs (5 étapes)",def:"1. Installation AVANT expédition. 2. Constatation de l'état initial par le TRANSPORTEUR à la prise en charge. 3. Contrôle par le DESTINATAIRE à la livraison. 4. Confirmation par l'entreprise de transport. 5. Marchandise libérée ou traitement des dommages."},
    {term:"Enregistreur GPS",def:"Dispositif électronique embarqué mesurant et enregistrant en continu plusieurs paramètres : chocs, température, humidité, inclinaison, pression atmosphérique et position GPS. Particulièrement adapté au transport maritime (longue durée). Génère des rapports d'analyse."},
    {term:"Dispositif de suivi de position en temps réel",def:"Combine GPS et réseau mobile pour envoyer des alertes en temps réel sur l'itinéraire du véhicule. Génère des rapports automatiques (date, heure, événements). Permet de réagir rapidement en cas d'écart ou d'incident."},
    {term:"Dommages cachés",def:"Dommages subis par la marchandise pendant le transport qui ne sont pas visibles de l'extérieur à la livraison. Détectables uniquement par indicateurs ou lors du déballage. La surveillance permet de les déceler rapidement."},
    {term:"GPS (Global Positioning System)",def:"Système de positionnement par satellites (24 satellites américains en orbite). Permet de déterminer la position géographique précise d'un objet. Utilisé dans les dispositifs de surveillance pour localiser les envois en temps réel."},
    {term:"Réclamation",def:"Demande formelle de dédommagement formulée par le destinataire suite à un dommage ou une perte constatée. La présence d'indicateurs déclenchés fournit des preuves objectives facilitant le traitement de la réclamation."},
    {term:"Seuil de déclenchement",def:"Valeur limite (intensité de choc, angle d'inclinaison, % d'humidité) au-delà de laquelle un indicateur se déclenche et enregistre l'incident. Ce seuil est prédéfini lors de la fabrication de l'indicateur ou de sa configuration."},
    {term:"Transport maritime — application prioritaire",def:"L'enregistreur GPS est particulièrement adapté au transport maritime car : longues durées de traversée, conditions météo difficiles, impossibilité de contrôle visuel fréquent, nécessité d'un enregistrement continu de tous les paramètres."},
  ]},
 ],
 questions:[
  {q:"Combien d'étapes comporte le protocole d'utilisation d'un indicateur ?",options:["3","4","5","6"],answer:2},
  {q:"Quels sont les 3 types d'indicateurs disponibles ?",options:["Température, pression, GPS","Choc, chute, hygrométrique","Laser, ultrasons, magnétique","Numérique, analogique, RFID"],answer:1},
  {q:"L'indicateur de choc peut-il être réinitialisé après déclenchement ?",options:["Oui, avec un outil spécial","Non, il est irréversible (changement de couleur permanent)","Oui, par le transporteur","Oui, si déclenché par erreur"],answer:1},
  {q:"L'enregistreur GPS convient particulièrement pour :",options:["Le transport aérien à haute altitude","Le transport maritime (longues durées, conditions difficiles)","La distribution du dernier kilomètre","Le transport réfrigéré terrestre uniquement"],answer:1},
  {q:"Qui installe l'indicateur sur l'emballage ?",options:["Le transporteur au départ","L'expéditeur AVANT l'expédition (en usine ou à l'entrepôt)","Le destinataire à la livraison","La société d'assurance"],answer:1},
  {q:"Qui confirme l'intégrité de l'indicateur à la PRISE EN CHARGE ?",options:["L'expéditeur","Le TRANSPORTEUR (étape 2 du protocole)","Le destinataire","L'autorité douanière"],answer:1},
  {q:"Quelles données mesure l'enregistreur GPS ?",options:["Chocs","Température","Humidité relative","Position GPS","Inclinaison"],answers:[0,1,2,3,4],multi:true},
  {q:"Qu'est-ce qu'un 'dommage caché' en transport ?",options:["Un dommage visible à l'extérieur de l'emballage","Un dommage survenu avant le transport","Un dommage non visible de l'extérieur à la livraison, détectable seulement au déballage","Un dommage couvert par l'assurance"],answer:2},
  {q:"Quels sont les avantages de la surveillance du transport ?",options:["Observation contrôlable des consignes","Identification du responsable en cas de dégât","Réduction des dommages","Décèlement rapide des dommages cachés","Diminution des réclamations"],answers:[0,1,2,3,4],multi:true},
  {q:"Que signifie l'indicateur hygrométrique ?",options:["Mesure la résistance des emballages","Mesure l'humidité et détecte les expositions excessives à l'eau","Mesure la pression atmosphérique","Mesure les vibrations"],answer:1},
  {q:"Le dispositif de suivi de position en temps réel utilise :",options:["Uniquement le GPS sans réseau mobile","Uniquement le réseau mobile","GPS + réseau de téléphonie mobile combinés","Des antennes radio locales propriétaires"],answer:2},
  {q:"Que contient un rapport du dispositif de suivi ?",options:["Uniquement la localisation GPS","La date, l'heure et le nombre d'événements depuis le dernier rapport","Uniquement les alertes d'urgence","Le nom du transporteur et la plaque d'immatriculation"],answer:1},
 ]};

const CH14 = {id:"c14",num:14,title:"La planification des transports",icon:"🗺️",color:"#0277BD",textColor:"#fff",
 content:[
  {T:"intro",x:"Une bonne planification du transport est la clé d'une distribution efficace et économique. Elle permet d'optimiser les itinéraires, l'utilisation des véhicules et le chargement, tout en respectant les délais clients."},
  {T:"section",x:"Le principe LIFO dans le chargement"},
  {T:"hl",bg:"#e3f2fd",b:"#0277BD",ti:"LIFO — Last In, First Out",x:"Les marchandises sont chargées selon l'ORDRE INVERSÉ de la tournée.\n\nLe DERNIER CLIENT LIVRÉ est chargé EN PREMIER (au fond du véhicule).\nLe PREMIER CLIENT est chargé EN DERNIER (à l'arrière, accessible immédiatement).\n\nExemple — Tournée A → B → C → D :\n• D chargé en premier (au fond)\n• C chargé ensuite\n• B chargé ensuite\n• A chargé EN DERNIER (à l'arrière = accessible dès le départ)"},
  {T:"section",x:"Les 5 facteurs d'une planification efficace"},
  {T:"list",items:["Itinéraire PRÉCIS (limites de vitesse, gabarit, zones interdites PL, heures de livraison)","Connaissance des VÉHICULES disponibles et de leurs capacités","Priorités et HORAIRES DES CLIENTS (fenêtres de livraison)","Connaissance des MOYENS DE DÉCHARGEMENT chez le client (quai, grue, transpalette)","Affectation judicieuse des CHAUFFEURS (qualifications, secteurs, horaires)"]},
  {T:"section",x:"L'optimisation assistée par ordinateur"},
  {T:"hl",bg:"#e8f5e9",b:"#2E7D32",ti:"Les 3 objectifs de l'optimisation informatique",x:"1. ITINÉRAIRE OPTIMAL : distribution rationnelle avec minimum de temps et de km.\n\n2. UTILISATION RATIONNELLE des véhicules : maximiser le taux de chargement, minimiser les retours à vide, utiliser le bon véhicule pour chaque tournée.\n\n3. CHARGEMENT RÉGLEMENTAIRE ET OPTIMAL : respecter les limites de charge par essieu, la répartition des charges et les règles d'arrimage — tout en maximisant la capacité utile."},
  {T:"hl",bg:"#fff8e1",b:"#f59e0b",ti:"Caractéristique clé des logiciels d'optimisation",x:"Les logiciels d'optimisation du transport NE SONT PAS des outils STANDARDS. Ils doivent être adaptés à chaque entreprise spécifique (ses clients, zones géographiques, types de véhicules, contraintes particulières)."},
  {T:"section",x:"Le TMS — Transport Management System"},
  {T:"text",x:"Logiciel spécialisé intégrant : planification des tournées, gestion des véhicules/chauffeurs, suivi en temps réel, gestion des documents, facturation des prestations, analyse des performances (KPI)."},
  {T:"section",x:"Bénéfices d'une bonne planification"},
  {T:"list",items:["Réduction des km parcourus → économies de carburant","Moins d'heures de travail chauffeurs → réduction coûts de personnel","Meilleur taux de service (respect des fenêtres de livraison)","Réduction de l'impact environnemental (CO2, bruit)","Utilisation optimale de la capacité de charge","Réduction de l'usure des véhicules","Amélioration de la satisfaction client"]},
  {T:"gloss",items:[
    {term:"LIFO (Last In, First Out)",def:"Dernier entré, premier sorti. Appliqué au chargement d'un véhicule : le dernier article chargé (au fond) est le dernier livré. Le premier client de la tournée est servi depuis l'arrière du véhicule, accessible en premier."},
    {term:"FIFO (First In, First Out)",def:"Premier entré, premier sorti. Opposé du LIFO. Utilisé en gestion des stocks pour les produits périssables : le plus ancien stock est utilisé en premier pour éviter les dates de péremption dépassées."},
    {term:"Plan de tournée",def:"Circuit de livraison planifié et optimisé définissant l'ordre des arrêts, les routes à emprunter et les horaires. Établi selon les contraintes clients (fenêtres de livraison) et les contraintes véhicule (charge, dimensions)."},
    {term:"TMS (Transport Management System)",def:"Logiciel de gestion et de planification du transport. Fonctionnalités clés : planification des tournées, gestion des véhicules et chauffeurs, suivi en temps réel des livraisons, gestion des documents de transport, facturation, analyse des KPI."},
    {term:"Optimisation du transport",def:"3 objectifs : (1) itinéraire optimal (minimum km/temps), (2) utilisation rationnelle des véhicules (taux de chargement, retours à vide), (3) chargement réglementaire (limites charge, répartition, arrimage)."},
    {term:"Logiciel d'optimisation non standard",def:"Les logiciels d'optimisation de tournées NE SONT PAS des outils universels. Ils doivent être configurés et adaptés pour chaque entreprise spécifique : ses clients, sa zone géographique, ses types de véhicules, ses contraintes particulières."},
    {term:"Retour à vide",def:"Trajet effectué par un véhicule sans chargement utile après avoir livré ses marchandises. Représente un coût pur (carburant, amortissement, salaire) sans revenu correspondant. La planification vise à les éliminer ou réduire."},
    {term:"Fenêtres de livraison (créneaux horaires)",def:"Plages horaires imposées par le client pour la réception des marchandises. Ex : livraison uniquement entre 8h et 10h. Contrainte majeure de la planification des tournées."},
    {term:"Taux de chargement",def:"Rapport entre la charge effective transportée et la capacité maximale du véhicule. Un taux élevé = bonne rentabilité. Un taux faible = perte économique. L'optimisation vise à maximiser ce taux."},
    {term:"KPI (Key Performance Indicator) en transport",def:"Indicateurs clés mesurant la performance logistique. Exemples : taux de livraison à l'heure, coût par km, taux de remplissage des véhicules, nombre de réclamations, distance parcourue par livraison."},
  ]},
 ],
 questions:[
  {q:"Le principe LIFO appliqué au chargement d'un véhicule signifie :",options:["Le premier chargé est le premier livré","Le DERNIER chargé est le premier livré (premier client accessible à l'arrière du véhicule)","Les colis lourds sont chargés en premier","Les colis fragiles sont chargés en dernier"],answer:1},
  {q:"Si la tournée est A→B→C→D, dans quel ordre sont chargées les marchandises ?",options:["A, B, C, D (ordre de livraison)","D, C, B, A (ordre inversé = LIFO)","Par poids croissant","Par taille décroissante"],answer:1},
  {q:"Les logiciels d'optimisation du transport sont :",options:["Des outils standards utilisables par toutes les entreprises sans modification","Des systèmes devant être adaptés à chaque entreprise spécifique","Des applications gratuites disponibles en ligne","Des modules intégrés uniquement aux ERP"],answer:1},
  {q:"Quels sont les 3 objectifs de l'optimisation informatique du transport ?",options:["Itinéraire optimal","Utilisation rationnelle des véhicules","Chargement réglementaire et optimal","Réduction des salaires","Suppression des documents"],answers:[0,1,2],multi:true},
  {q:"Un 'retour à vide' en logistique est :",options:["Un colis retourné à l'expéditeur","Un trajet sans chargement utile (coût pur sans revenu)","Un rapport d'incident de transport","Une livraison non conforme"],answer:1},
  {q:"Quels sont les 5 facteurs d'une planification efficace des tournées ?",options:["Itinéraire précis","Connaissance des véhicules","Priorités et horaires des clients","Moyens de déchargement chez le client","Affectation judicieuse des chauffeurs"],answers:[0,1,2,3,4],multi:true},
  {q:"Qu'est-ce qu'un TMS ?",options:["Transport Monitoring Software","Transport Management System (logiciel de gestion du transport)","Terminal de Mesure et de Suivi","Système de Triage des Marchandises"],answer:1},
  {q:"FIFO (First In, First Out) est particulièrement adapté pour :",options:["Le chargement des camions de livraison","La gestion des stocks de produits périssables (les plus anciens sortent en premier)","La planification des tournées","L'organisation des centres de tri postal"],answer:1},
  {q:"Quels bénéfices apporte une bonne planification des transports ?",options:["Réduction des km parcourus","Meilleur taux de service client","Réduction de l'impact environnemental","Amélioration de la satisfaction client","Réduction de l'usure des véhicules"],answers:[0,1,2,3,4],multi:true},
  {q:"Qu'est-ce qu'une 'fenêtre de livraison' ?",options:["La vitre du camion de livraison","Un créneau horaire imposé par le client pour recevoir ses marchandises","La durée maximale de déchargement autorisée","L'heure limite de départ du chauffeur"],answer:1},
  {q:"Le taux de chargement d'un véhicule représente :",options:["Le nombre de clients par tournée","Le rapport entre la charge effective et la capacité maximale du véhicule","Le nombre de km parcourus par jour","La durée totale de la tournée"],answer:1},
  {q:"Que fait un TMS en matière de suivi des livraisons ?",options:["Il automatise uniquement la facturation","Il gère le suivi en temps réel des livraisons + gestion des documents + KPI","Il remplace le chauffeur par un GPS","Il imprime automatiquement les bons de livraison uniquement"],answer:1},
 ]};
// ─── MODULE C MERGE ───────────────────────────────────────────────────────────
const MODULE_C = [CH1,CH2,CH3,CH4,CH5,CH6,CH7,CH8,CH9,CH10,CH11,CH12,CH13,CH14];

// ═══════════════════════════════════════════════════════════
//  MODULE A — Approvisionnement & Réception des marchandises
// ═══════════════════════════════════════════════════════════

const MODULE_A_META = {id:"A",title:"Module A",subtitle:"Approvisionnement & Réception",icon:"🛒",color:"#1565C0",textColor:"#fff",
  desc:"Marché d'approvisionnement, types de marchandises, contrats, documents, réception et contrôle des quantités."};

const CHA1 = {id:"ca1",num:1,mod:"A",title:"Le marché d'approvisionnement",icon:"🏪",color:"#1565C0",textColor:"#fff",
 content:[
  {T:"intro",x:"L'approvisionnement est le processus par lequel une entreprise se procure tous les éléments nécessaires à son fonctionnement. Il concerne aussi bien les individus dans leur vie quotidienne que les grandes entreprises industrielles."},
  {T:"section",x:"Ce qu'une entreprise doit se procurer"},
  {T:"list",items:["Biens matériels (marchandises, matières premières, équipements)","Informations (données de marché, études, brevets)","Prestations de services (nettoyage, gardiennage, formation, informatique)","Capitaux (financements, crédits)","Main d'œuvre (personnel qualifié)","Licences et brevets (droits d'utilisation)"]},
  {T:"section",x:"Les 3 catégories de biens"},
  {T:"hl",bg:"#e3f2fd",b:"#1565C0",ti:"Classification des biens",x:"Biens de consommation : matériaux de production et consommables utilisés dans le processus de fabrication.\n\nBiens d'équipements : machines de fabrication, machines de bureau, halles de stockage — investissements durables.\n\nPrestations de services : nettoyage, gardiennage, formation, assistance informatique — achats immatériels."},
  {T:"section",x:"La règle des 6B — La procédure d'approvisionnement"},
  {T:"hl",bg:"#fff8e1",b:"#f59e0b",ti:"Les 6 Bons de l'approvisionnement",x:"Pour toute procédure d'approvisionnement, il faut respecter les 6B :\n\n1. Bonne MARCHANDISE (le bon article, conforme aux spécifications)\n2. Bonne QUANTITÉ (ni trop, ni trop peu)\n3. Bonne QUALITÉ (conforme aux exigences)\n4. Bon ENDROIT (livré au bon emplacement)\n5. Bon MOMENT (ni trop tôt, ni trop tard)\n6. Bon PRIX (optimal par rapport au marché)"},
  {T:"section",x:"Make or Buy — Faire ou acheter ?"},
  {T:"text",x:"La décision 'Make or Buy' (faire soi-même ou acheter) est une question stratégique fondamentale. Elle peut être influencée par le prix, la qualité du produit acheté et le temps de production nécessaire."},
  {T:"hl",bg:"#e8f5e9",b:"#2E7D32",ti:"L'outsourcing — Sous-traitance",x:"Les entreprises ont souvent recours à la SOUS-TRAITANCE ou OUTSOURCING : transférer des activités de production à des entreprises externes.\n\nAvantages :\n• Réduction des coûts fixes\n• Accès à l'expertise de spécialistes\n• Concentration sur le cœur de métier\n\nInconvénients :\n• Perte de savoir-faire interne\n• Dépendance envers des fournisseurs\n• Risques de qualité et de délais"},
  {T:"gloss",items:[
    {term:"Approvisionnement",def:"Ensemble des actions permettant à une entreprise de se procurer les biens, services et informations nécessaires à son fonctionnement. Inclut la sélection des fournisseurs, la négociation et le contrôle des livraisons."},
    {term:"Règle des 6B",def:"Principe fondamental de l'approvisionnement : Bonne marchandise, Bonne quantité, Bonne qualité, Bon endroit, Bon moment, Bon prix. Ces 6 critères doivent être satisfaits simultanément pour un approvisionnement optimal."},
    {term:"Make or Buy",def:"Décision stratégique consistant à choisir entre la fabrication interne (Make) ou l'achat externe (Buy) d'un produit ou service. Critères de décision : coût, qualité, délai, savoir-faire disponible."},
    {term:"Outsourcing (Sous-traitance)",def:"Transfert d'activités de production à des entreprises externes spécialisées. Permet de réduire les coûts et de se concentrer sur le cœur de métier, au prix d'une dépendance accrue envers les fournisseurs."},
    {term:"Biens de consommation",def:"Matériaux et consommables utilisés directement dans le processus de production ou de service. Ils sont 'consommés' lors de leur utilisation et doivent être régulièrement réapprovisionnés."},
    {term:"Biens d'équipements",def:"Investissements durables tels que machines, véhicules, infrastructures. Ils participent à la production sur une longue durée et font l'objet d'amortissements comptables."},
    {term:"Licence / Brevet",def:"Droit d'utilisation d'une invention, d'un procédé ou d'une marque appartenant à un tiers. L'entreprise paie des redevances pour utiliser légalement cette propriété intellectuelle."},
    {term:"Prestation de service",def:"Service immatériel acheté à l'extérieur : nettoyage, gardiennage, formation du personnel, maintenance informatique. Fait partie des approvisionnements immatériels de l'entreprise."},
  ]},
 ],
 questions:[
  {q:"Quels éléments une entreprise doit-elle se procurer pour fonctionner ?",options:["Uniquement des biens matériels","Biens, informations, services, capitaux, main d'œuvre, licences","Uniquement des matières premières","Uniquement du personnel et des machines"],answer:1},
  {q:"La règle des 6B comprend :",options:["Bonne marque, bon budget, bon bilan, bon bénéfice, bon bilan, bon bonus","Bonne marchandise, bonne quantité, bonne qualité, bon endroit, bon moment, bon prix","Bon marché, bonne mesure, bon matériau, bon bâtiment, bon bénéfice, bonne base","Bon fournisseur, bon client, bon délai, bon accord, bonne logistique, bon prix"],answer:1},
  {q:"L'outsourcing signifie :",options:["Fabriquer soi-même tous ses produits","Stocker les marchandises en externe","Transférer des activités de production à des entreprises externes","Acheter des brevets à l'étranger"],answer:2},
  {q:"Quelles sont les 3 catégories de biens dans l'approvisionnement ?",options:["Biens de consommation, biens d'équipements, prestations de services","Biens primaires, secondaires, tertiaires","Matières premières, produits finis, services","Biens mobiles, immobiles, virtuels"],answer:0},
  {q:"Quels sont les avantages de l'outsourcing (plusieurs réponses) ?",options:["Réduction des coûts fixes","Accès à l'expertise de spécialistes","Indépendance totale des fournisseurs","Concentration sur le cœur de métier","Garantie absolue de la qualité"],answers:[0,1,3],multi:true},
  {q:"Un bien d'équipement est :",options:["Une matière première consommée lors de la production","Un investissement durable comme une machine ou un véhicule","Un service de nettoyage acheté à l'extérieur","Un produit fini vendu au client"],answer:1},
  {q:"La décision 'Make or Buy' est influencée par (plusieurs réponses) :",options:["Le prix","La qualité du produit acheté","La couleur de l'emballage","Le temps de production nécessaire","La taille de l'entreprise"],answers:[0,1,3],multi:true},
  {q:"Une licence en logistique est :",options:["Un permis de conduire pour chariots élévateurs","Un droit d'utilisation d'une invention ou marque appartenant à un tiers","Une autorisation de stockage","Un contrat de travail temporaire"],answer:1},
 ]};

const CHA2 = {id:"ca2",num:2,mod:"A",title:"Types de marchandises",icon:"📋",color:"#0277BD",textColor:"#fff",
 content:[
  {T:"intro",x:"Toutes les marchandises possèdent des propriétés spécifiques à prendre en compte lors de leur manutention, stockage et transport. Comprendre ces propriétés est essentiel pour choisir les équipements et conditions de stockage adaptés."},
  {T:"section",x:"Les critères des marchandises"},
  {T:"list",items:["Dimensions et volumes","Densité (légère ou très lourde)","État d'agrégation (gaz, liquide, solide)","Altérabilité (sensibilité aux conditions extérieures)","Fragilité (résistance aux chocs)","Aptitude au stockage (durée de vie en stock)","Valeur (risque de vol, précautions particulières)"]},
  {T:"section",x:"Les degrés de traitement"},
  {T:"hl",bg:"#e3f2fd",b:"#0277BD",ti:"3 degrés de transformation",x:"Matières premières : marchandises brutes provenant directement de la nature.\n• Primaires : pétrole, charbon, bois, sable, eau.\n• Secondaires : matières premières RECYCLÉES à partir de déchets.\n\nProduits semi-finis : matières premières transformées. Ex : acier, planches de bois, aluminium.\n\nProduits finis : produits ne nécessitant aucun traitement supplémentaire. Ex : pain, pizzas, vêtements, appareils électroniques."},
  {T:"section",x:"L'altérabilité et ses causes"},
  {T:"hl",bg:"#fce4ec",b:"#C62828",ti:"5 facteurs d'altération des marchandises",x:"1. HUMIDITÉ : certains produits absorbent l'humidité (hygroscopiques) : sel, papier, sucre, ciment, farine → deviennent inutilisables.\n\n2. TEMPÉRATURE : les produits congelés doivent être protégés du réchauffement. Les tomates et fleurs tropicales craignent le froid.\n\n3. CHOCS, PRESSION, HEURTS, CHUTES : les détériorations les plus fréquentes. Les fruits et légumes frais sont particulièrement fragiles. Règle : marchandises LOURDES en bas, LÉGÈRES en haut.\n\n4. BACTÉRIES, SPORES, CHAMPIGNONS : micro-organismes jouant un rôle clé dans la conservation. Invisibles à l'œil nu mais peuvent détruire les denrées.\n\n5. OBSOLESCENCE (vieillissement technique) : malgré une marchandise intacte, elle est éliminée car plus personne n'en veut. Ex : iPhone 6 vs iPhone 17."},
  {T:"text",x:"Les produits HYGROSCOPIQUES absorbent l'humidité de l'air et sont dégradés par l'humidité : sel, papier, sucre, ciment, farine. À l'inverse, les produits réfrigérés craignent la chaleur et doivent être maintenus dans une chaîne du froid ininterrompue."},
  {T:"gloss",items:[
    {term:"Matières premières primaires",def:"Ressources brutes extraites directement de la nature : pétrole, charbon, bois, sable, eau, minerais. Elles constituent le point de départ de tout processus de transformation industrielle."},
    {term:"Matières premières secondaires",def:"Matières premières recyclées à partir de déchets industriels ou ménagers. Exemple : l'aluminium recyclé, le verre recyclé, le papier recyclé. Contribuent à l'économie circulaire."},
    {term:"Produits semi-finis",def:"Matières premières ayant subi une première transformation mais qui nécessitent encore des traitements supplémentaires avant d'être des produits finis. Ex : acier laminé, planches de bois, composants électroniques."},
    {term:"Produits finis",def:"Produits prêts à être utilisés ou consommés sans transformation supplémentaire. Ex : pain, vêtements, appareils électroniques, véhicules. Vendus directement au consommateur final."},
    {term:"Altérabilité",def:"Sensibilité d'une marchandise à se dégrader sous l'effet d'influences extérieures (humidité, chaleur, chocs, micro-organismes). Détermine les conditions de stockage et de transport nécessaires."},
    {term:"Hygroscopique",def:"Propriété d'un produit qui absorbe facilement l'humidité atmosphérique. Exemples : sel, sucre, farine, ciment, papier. Ces produits doivent être stockés dans des conditions de faible humidité avec un emballage hermétique."},
    {term:"Obsolescence",def:"Vieillissement technique ou commercial d'un produit : il devient inutilisable ou invendable non pas parce qu'il est détérioré, mais parce qu'il est dépassé. Ex : anciennes générations de téléphones, cassettes vidéo, disquettes."},
    {term:"Chaîne du froid",def:"Suite ininterrompue d'étapes de transport et de stockage maintenant une température basse pour les produits réfrigérés ou congelés. Toute rupture (réchauffement temporaire) peut compromettre la sécurité alimentaire."},
    {term:"État d'agrégation",def:"État physique d'une matière : solide, liquide ou gazeux. Détermine les contenants, les équipements de manutention et les conditions de stockage nécessaires (cuves pour liquides, bouteilles sous pression pour gaz)."},
    {term:"Densité",def:"Rapport entre la masse d'un objet et son volume. Une marchandise dense (très lourde pour son volume) nécessite des équipements de manutention robustes et influence les calculs de chargement des véhicules."},
  ]},
 ],
 questions:[
  {q:"Les produits 'hygroscopiques' sont :",options:["Des produits résistants à l'humidité","Des produits qui absorbent l'humidité et se dégradent","Des produits nécessitant une réfrigération","Des produits radioactifs"],answer:1},
  {q:"La règle de base lors d'un empilage est :",options:["Marchandises légères en bas, lourdes en haut","Marchandises lourdes en bas, légères en haut","Toujours empiler à la même hauteur","Les marchandises fragiles d'abord"],answer:1},
  {q:"Que sont les matières premières secondaires ?",options:["Des matières premières de qualité inférieure","Des matières premières recyclées à partir de déchets","Des produits semi-finis","Des produits importés"],answer:1},
  {q:"L'obsolescence désigne :",options:["La détérioration physique d'un produit","Le vieillissement technique rendant un produit invendable bien qu'intact","La contamination par des bactéries","Le dépassement de la date de péremption"],answer:1},
  {q:"Quels exemples de produits hygroscopiques sont corrects ?",options:["Acier, aluminium, verre","Sel, sucre, farine, ciment, papier","Fruits frais, légumes","Huile, pétrole, carburant"],answer:1},
  {q:"Les 5 facteurs d'altération des marchandises sont (plusieurs réponses) :",options:["Humidité","Température","Chocs, pression, heurts","Bactéries et champignons","Obsolescence technique","La couleur"],answers:[0,1,2,3,4],multi:true},
  {q:"Un produit semi-fini est :",options:["Un produit prêt à la vente","Une matière brute extraite de la nature","Une matière première transformée nécessitant encore un traitement","Un produit recyclé"],answer:2},
  {q:"Quels produits craignent particulièrement le froid ?",options:["Les produits congelés","Les fleurs coupées et certains fruits tropicaux","Le ciment et la farine","Les métaux et l'acier"],answer:1},
  {q:"L'état d'agrégation d'une marchandise peut être :",options:["Lourd, moyen ou léger","Solide, liquide ou gazeux","Primaire, secondaire ou tertiaire","Frais, sec ou congelé"],answer:1},
 ]};

const CHA3 = {id:"ca3",num:3,mod:"A",title:"Le contrat de vente",icon:"📝",color:"#2E7D32",textColor:"#fff",
 content:[
  {T:"intro",x:"Le contrat de vente est l'acte juridique fondamental de tout échange commercial. Il définit les droits et obligations de l'acheteur et du vendeur, et encadre l'ensemble du processus allant de la commande à la livraison et au paiement."},
  {T:"section",x:"Définition du contrat de vente"},
  {T:"text",x:"La vente est un contrat par lequel un vendeur s'oblige à livrer une chose à l'acheteur et à lui en transférer la propriété, moyennant un prix que l'acheteur s'engage à payer. Le contrat de vente n'a PAS de forme obligatoire — il peut être oral ou écrit."},
  {T:"section",x:"La commande — Éléments indispensables"},
  {T:"hl",bg:"#e8f5e9",b:"#2E7D32",ti:"Que doit contenir une commande ?",x:"• Description PRÉCISE de la marchandise (avec numéro d'article)\n• Nombre d'unités (pièces, cartons, palettes)\n• Prix (à l'unité et/ou prix total définitif)\n• Délai de livraison\n• Accords supplémentaires éventuels (conditions spéciales, emballage)"},
  {T:"section",x:"Droits et obligations — Acheteur et Vendeur"},
  {T:"hl",bg:"#e3f2fd",b:"#1565C0",ti:"Tableau des droits et obligations (CO)",x:"ACHETEUR :\nDroits : obtenir la chose vendue et en devenir propriétaire. En cas de défaut : droit à une livraison de remplacement, à une réduction du prix ou à un remboursement.\nObligations : payer le prix de vente convenu.\n\nVENDEUR :\nDroits : recevoir le juste prix de la chose vendue.\nObligations : transmettre la chose à l'acheteur et lui en céder la propriété dans l'état convenu."},
  {T:"text",x:"Le contrat de vente est régi par le Code des Obligations (CO) suisse et par les Conditions Générales de Vente (CGV) de chaque entreprise."},
  {T:"gloss",items:[
    {term:"Contrat de vente",def:"Accord juridique par lequel le vendeur s'engage à livrer une marchandise et à en transférer la propriété, contre le paiement d'un prix par l'acheteur. Régi par le Code des Obligations suisse. Pas de forme obligatoire."},
    {term:"Commande",def:"Demande formelle adressée par un client à un fournisseur pour la livraison d'un bien ou d'un service. Doit mentionner : description précise, quantité, prix, délai de livraison, accords spéciaux."},
    {term:"CO (Code des Obligations)",def:"Loi suisse régissant les contrats entre particuliers et entreprises. Définit les droits et obligations de chaque partie dans un contrat de vente, de transport, de dépôt, etc."},
    {term:"CGV (Conditions Générales de Vente)",def:"Règles prédéfinies par un vendeur, applicables à toutes ses transactions. Elles précisent les modalités de paiement, de livraison, de garantie et de retour. Encadrent le contrat de vente avec le CO."},
    {term:"Vice de livraison",def:"Non-conformité de la marchandise reçue par rapport à ce qui a été commandé : mauvaise quantité, mauvaise qualité, produit endommagé. L'acheteur a le droit à une livraison de remplacement, une réduction ou un remboursement."},
    {term:"Numéro d'article",def:"Code unique identifiant précisément un produit dans le système de gestion du vendeur ou du fabricant. Doit figurer dans toute commande pour éviter les erreurs de livraison."},
    {term:"Transfert de propriété",def:"Moment juridique où la marchandise cesse d'appartenir au vendeur pour appartenir à l'acheteur. En droit suisse, cela se produit généralement lors de la livraison et du paiement intégral."},
  ]},
 ],
 questions:[
  {q:"Le contrat de vente doit-il obligatoirement être écrit ?",options:["Oui, toujours","Non, il peut être oral ou écrit — aucune forme obligatoire","Oui, si la valeur dépasse 1000 CHF","Oui, toujours devant notaire"],answer:1},
  {q:"Quels éléments doivent figurer dans une commande ?",options:["Uniquement le prix et la quantité","Description précise, quantité, prix, délai de livraison et accords éventuels","Seulement le numéro d'article et le prix","Le nom de l'acheteur et du vendeur uniquement"],answer:1},
  {q:"En cas de vice de livraison, l'acheteur a le droit à (plusieurs réponses) :",options:["Une livraison de remplacement","Une réduction du prix","Un remboursement","Des dommages et intérêts illimités","Un cadeau compensatoire"],answers:[0,1,2],multi:true},
  {q:"Le Code des Obligations (CO) en Suisse régit :",options:["Uniquement les contrats internationaux","Les relations contractuelles entre personnes privées et entreprises","Uniquement les contrats de transport","Les normes d'emballage"],answer:1},
  {q:"L'obligation du vendeur est :",options:["Recevoir le paiement uniquement","Transmettre la marchandise à l'acheteur et lui en céder la propriété","Vérifier la solvabilité de l'acheteur","Assurer le transport jusqu'à destination"],answer:1},
  {q:"Le numéro d'article dans une commande sert à :",options:["Calculer le prix total","Identifier précisément le produit et éviter les erreurs de livraison","Indiquer la date de livraison","Identifier le transporteur"],answer:1},
  {q:"Les CGV (Conditions Générales de Vente) :",options:["Remplacent le Code des Obligations","Sont identiques pour toutes les entreprises","Sont prédéfinies par le vendeur et précisent modalités de paiement, livraison et garantie","Sont obligatoirement signées par un notaire"],answer:2},
 ]};

const CHA4 = {id:"ca4",num:4,mod:"A",title:"Documents d'accompagnement des marchandises",icon:"📄",color:"#6A1B9A",textColor:"#fff",
 content:[
  {T:"intro",x:"Dans le cadre du transport international de marchandises par voies routière, ferroviaire, aérienne ou maritime, des documents précis doivent obligatoirement accompagner les marchandises. Ces documents ont une valeur juridique et permettent le contrôle à chaque étape."},
  {T:"section",x:"Le bulletin de transport (CMR) — Transport routier"},
  {T:"img",src:"/images/modA_img1.png",alt:"Bulletin de transport routier (CMR)"},
  {T:"hl",bg:"#ede7f6",b:"#6A1B9A",ti:"Contenu du bulletin de transport routier",x:"Le bulletin de transport (CMR) accompagne les marchandises lors de leur transport par camion. Il contient :\n• L'adresse de l'expéditeur\n• L'adresse du destinataire\n• Le nombre et la description des colis ou emballages\n• Le poids total de la cargaison\n\nEn pratique (bulletin de transport Worldwide International Logistics) :\n• Transporteur, expéditeur, destinataire avec coordonnées complètes\n• Nombre d'unités, unité de livraison, description marchandise et poids\n• Engins échangeables (Euro-palettes, cadres CFF, couvercles CFF, Dispobox)\n• Date de réception et accusé de réception signé"},
  {T:"section",x:"La lettre de voiture — Transport ferroviaire"},
  {T:"img",src:"/images/modA_img2.png",alt:"Lettre de voiture CFF (Frachtbrief)"},
  {T:"hl",bg:"#ede7f6",b:"#6A1B9A",ti:"Contenu de la lettre de voiture CFF",x:"La lettre de voiture est le bulletin de transport ferroviaire. Elle renseigne sur :\n• L'expéditeur (Absender/Expediteur/Mittente)\n• Le destinataire (Empfänger/Destinataire/Destinatario)\n• Numéro de wagon, numéro du frachtkurief\n• Nombre et désignation des unités de transport\n• Le poids du chargement\n• Les engins échangeables (palettes, cadres, couvercles)"},
  {T:"section",x:"Le bulletin de livraison"},
  {T:"text",x:"Le bulletin de livraison renseigne sur les marchandises livrées et sert à contrôler la livraison. Il permet de vérifier que les marchandises correspondent bien à la commande (références, quantités, état)."},
  {T:"hl",bg:"#fff8e1",b:"#f59e0b",ti:"Conservation des bulletins de livraison",x:"Les bulletins de livraison doivent être CONSERVÉS PENDANT 10 ANS.\n\nCorrections sur un bulletin :\n• Se font EN PRÉSENCE du transporteur\n• Ne jamais effacer ou recouvrir les informations\n• Les corrections doivent être CLAIREMENT VISIBLES\n• Le transporteur ET le destinataire doivent TOUS LES DEUX SIGNER les corrections"},
  {T:"section",x:"La réception sous réserve"},
  {T:"text",x:"Les acheteurs peuvent accepter les marchandises 'SOUS RÉSERVE'. Cette réserve doit être CONSIGNÉE et JUSTIFIÉE sur le bulletin de livraison. Une réserve sans justification est INVALIDE. Exemple valide : 'Emballage extérieur endommagé, contenu non vérifié'."},
  {T:"gloss",items:[
    {term:"Bulletin de transport (CMR)",def:"Document contractuel accompagnant les marchandises lors d'un transport routier international. Contient l'identité de l'expéditeur, du destinataire, la description des marchandises et le poids. CMR = Convention relative au Contrat de transport international de Marchandises par Route."},
    {term:"Lettre de voiture (ferroviaire)",def:"Document équivalent au bulletin de transport pour le fret ferroviaire. Mentionne l'expéditeur, le destinataire, le numéro de wagon, les unités transportées et le poids. Obligatoire pour tout transport ferroviaire de marchandises."},
    {term:"Bulletin de livraison",def:"Document accompagnant une livraison de marchandises. Permet au destinataire de vérifier que ce qu'il reçoit correspond à sa commande (références, quantités, état). Doit être signé à la réception et conservé 10 ans."},
    {term:"Réception sous réserve",def:"Acceptation de marchandises avec émission d'une réserve écrite sur le bulletin de livraison, indiquant un problème constaté (emballage endommagé, quantité insuffisante). La réserve doit être JUSTIFIÉE, sinon elle est invalide."},
    {term:"Engins échangeables",def:"Supports de transport réutilisables échangés entre expéditeurs et destinataires : Euro-palettes EPAL, cadres CFF, couvercles CFF, Dispobox. Leur nombre est noté sur le bulletin de transport pour assurer leur retour."},
    {term:"Conservation 10 ans",def:"Obligation légale de conserver les bulletins de livraison pendant 10 ans. Ces documents peuvent servir de preuves en cas de litige commercial ou fiscal ultérieur."},
    {term:"Plomb douanier",def:"Scellé officiel apposé par les autorités douanières sur un wagon, conteneur ou semi-remorque. Ne doit pas être coupé ou détaché sans autorisation. Son ouverture doit être effectuée selon les procédures de l'entreprise, parfois avec un spécialiste douanier."},
  ]},
 ],
 questions:[
  {q:"Combien d'années doit-on conserver les bulletins de livraison ?",options:["3 ans","5 ans","10 ans","20 ans"],answer:2},
  {q:"Le bulletin de transport routier contient (plusieurs réponses) :",options:["L'adresse de l'expéditeur","L'adresse du destinataire","La description et le nombre de colis","Le poids total","Le numéro de compte bancaire"],answers:[0,1,2,3],multi:true},
  {q:"Qui doit signer les corrections apportées sur un bulletin de livraison ?",options:["Uniquement le transporteur","Uniquement le destinataire","Le transporteur ET le destinataire","Le gestionnaire de l'entrepôt uniquement"],answer:2},
  {q:"Une réserve sur un bulletin de livraison est valide si :",options:["Elle est émise dans les 24h après la livraison","Elle est consignée et justifiée sur le bulletin de livraison","Elle est envoyée par e-mail","Elle est signée par un notaire"],answer:1},
  {q:"Un plomb douanier sur un conteneur :",options:["Peut être coupé librement par le destinataire","Ne doit jamais être ouvert","Ne doit pas être détaché sans autorisation et selon les procédures de l'entreprise","Doit être retiré par le transporteur"],answer:2},
  {q:"La lettre de voiture ferroviaire renseigne sur :",options:["Uniquement le poids du chargement","L'expéditeur, le destinataire, le numéro de wagon, les unités et le poids","Seulement le numéro du wagon","Uniquement le nom du destinataire"],answer:1},
  {q:"Que faut-il faire lors d'une correction sur un bulletin de livraison ?",options:["Effacer proprement l'erreur avec du correcteur","Ne jamais effacer — les corrections doivent être clairement visibles, signées des deux parties","Rédiger un nouveau bulletin complet","Refuser la livraison"],answer:1},
 ]};

const CHA5 = {id:"ca5",num:5,mod:"A",title:"La réception des marchandises",icon:"🏭",color:"#AD1457",textColor:"#fff",
 content:[
  {T:"intro",x:"La réception des marchandises est un processus structuré comportant des étapes d'identification, de contrôle et de vérification. Une réception correcte protège l'acheteur contre les livraisons non conformes et permet de détecter rapidement les dommages."},
  {T:"section",x:"Les 3 contextes légaux de réception"},
  {T:"list",items:["Réception en tant qu'ACHETEUR (chose mobilière) — régie par la Convention de Vienne pour le commerce international","Réception en tant que TRANSPORTEUR — relève de la logistique de transport","Réception pour DÉPÔT (consignation) — relève de la logistique de stockage"]},
  {T:"section",x:"Achat comptant vs achat sur facture"},
  {T:"hl",bg:"#fce4ec",b:"#AD1457",ti:"Déroulement d'un achat sur facture",x:"1. Un contrat de vente est négocié (accord sur prix, quantité, délai).\n2. Le vendeur livre la marchandise à l'acheteur.\n3. L'acheteur accuse réception — la marchandise est désormais sous sa garde.\n4. Le vendeur établit une facture.\n5. L'acheteur paie selon le délai convenu (10 à 30 jours) → la marchandise devient sa propriété légale."},
  {T:"section",x:"La réception planifiée vs non planifiée"},
  {T:"hl",bg:"#e8f5e9",b:"#2E7D32",ti:"Réception planifiée — Organisation préalable",x:"Pour une réception planifiée, il faut préalablement :\n• Connaître le délai de livraison communiqué\n• Déterminer l'accès ou le lieu de déchargement\n• Préparer les documents relatifs à la réception\n• Réserver la place nécessaire dans l'entrepôt\n• Mettre les collaborateurs à disposition\n\nRéception NON planifiée : délai et quantité non convenus à l'avance — aucune organisation préparée."},
  {T:"section",x:"Les 2 paliers d'identification des marchandises"},
  {T:"hl",bg:"#e3f2fd",b:"#1565C0",ti:"Identification globale puis détaillée",x:"1er palier — IDENTIFICATION GLOBALE :\n• La marchandise nous est-elle bien destinée ?\n• Contrôle des documents d'accompagnement\n• Contrôle global de l'état extérieur\n• Vérification des cachets ou plombs douaniers\n\n2ème palier — IDENTIFICATION DÉTAILLÉE :\n• D'où provient la marchandise ?\n• Bulletin de livraison disponible ?\n• Concordance entre référence marchandise et bulletin de livraison\n• Y a-t-il un plomb douanier à ne pas ouvrir ?"},
  {T:"section",x:"Le contrôle de l'état des marchandises"},
  {T:"list",items:["Emballages déchirés → signe de manipulation brutale","Emballages tachés → possible infiltration de liquide","Emballages écrasés ou cabossés → risque de dommage du contenu","Indicateur de basculement déclenché → le colis a été renversé","Indicateur de chocs déclenché → choc violent lors du transport"]},
  {T:"section",x:"Accessoires de détection de température"},
  {T:"list",items:["Appareil de contrôle de température — pour les produits réfrigérés à la réception","Mesure sans contact — thermomètre laser infrarouge (mesure rapide et précise)","Indicateur de température — change de couleur si la température a été dépassée"]},
  {T:"section",x:"En cas de dégâts"},
  {T:"hl",bg:"#fff8e1",b:"#f59e0b",ti:"Procédure en cas de dégâts constatés",x:"• Alerter immédiatement le supérieur compétent\n• Documenter les dégâts (description précise)\n• Remplir un formulaire de déclaration de dommage\n• Prendre des PHOTOS des dégâts (preuves)\n• Envoi de la déclaration par courrier dans les 7 JOURS\n• Conserver le colis endommagé jusqu'à expertise\n\nSi wagon : informer le responsable de la région.\nSi conteneur : signaler au chauffeur ou fournisseur → interrompre le déchargement et faire expertise sur place."},
  {T:"gloss",items:[
    {term:"Convention de Vienne",def:"Convention internationale sur les contrats de vente internationale de marchandises (CVIM). Régit les droits et obligations des acheteurs et vendeurs dans le commerce international de choses mobilières."},
    {term:"Réception planifiée",def:"Processus de réception organisé à l'avance : emplacement préparé, collaborateurs disponibles, documents prêts. Permet une réception rapide, efficace et sans erreur."},
    {term:"Réception non planifiée",def:"Livraison survenant sans accord préalable sur le délai ou la quantité. Peut perturber le fonctionnement de l'entrepôt. Nécessite une flexibilité organisationnelle."},
    {term:"Identification globale",def:"Premier niveau de contrôle à la réception : vérifier que la livraison est bien destinée à notre entreprise, contrôler les documents et l'état extérieur global des colis."},
    {term:"Identification détaillée",def:"Deuxième niveau de contrôle : vérifier l'origine précise, concordance entre les références et le bulletin de livraison, présence de plombs douaniers."},
    {term:"Indicateur de basculement",def:"Dispositif irréversible qui indique si un colis a été renversé ou incliné au-delà d'un angle défini pendant le transport. Son déclenchement signale une manutention incorrecte."},
    {term:"Indicateur de chocs",def:"Dispositif irréversible qui enregistre les chocs subis par un colis dépassant un seuil d'intensité prédéfini. Utilisé pour les marchandises fragiles et de haute valeur."},
    {term:"Thermomètre laser (mesure sans contact)",def:"Instrument permettant de mesurer la température d'une marchandise ou d'une surface à distance, sans contact physique. Rapide et hygiénique, idéal pour les contrôles de réception de produits frais."},
    {term:"Accusé de réception",def:"Confirmation écrite signée par l'acheteur attestant qu'il a bien reçu la marchandise. À partir de ce moment, la marchandise est sous sa garde et sa responsabilité."},
    {term:"Déclaration de dommage",def:"Formulaire officiel documentant les dégâts constatés lors de la réception. Doit être envoyé dans les 7 jours avec photos à l'appui pour être valable juridiquement."},
  ]},
 ],
 questions:[
  {q:"Dans quel délai faut-il envoyer une déclaration de dommage par courrier ?",options:["24 heures","3 jours","7 jours","30 jours"],answer:2},
  {q:"Lors d'une réception planifiée, que faut-il préparer (plusieurs réponses) ?",options:["Le lieu de déchargement","Les documents de réception","La place en entrepôt","Les collaborateurs disponibles","Une fête d'accueil"],answers:[0,1,2,3],multi:true},
  {q:"L'identification globale permet de vérifier :",options:["La quantité exacte de chaque article","Si la livraison nous est bien destinée et l'état extérieur général","La qualité de chaque produit individuellement","Le numéro de série de chaque article"],answer:1},
  {q:"Un indicateur de basculement déclenché signifie :",options:["La marchandise a été exposée à trop d'humidité","Le colis a été renversé ou incliné au-delà d'un angle défini","La température a été dépassée","Le poids maximal a été dépassé"],answer:1},
  {q:"Dans un achat sur facture, la marchandise devient la propriété de l'acheteur :",options:["Dès la signature du contrat","Dès la livraison physique","Après le paiement de la facture","Dès que le vendeur reçoit la commande"],answer:2},
  {q:"En cas de dégâts sur un conteneur lors du déchargement :",options:["On continue le déchargement sans s'arrêter","On signale au chauffeur, on interrompt le déchargement et on fait l'expertise sur place","On retourne le conteneur immédiatement","On documente les dégâts et on continue le déchargement"],answer:1},
  {q:"Que doit faire un logisticien en cas de dégâts constatés à la réception ?",options:["Rien, c'est la responsabilité du transporteur","Alerter le supérieur, documenter, photographier, remplir le formulaire et conserver le colis","Jeter la marchandise endommagée","Accepter la livraison sans mention"],answer:1},
  {q:"La Convention de Vienne régit :",options:["Les transports ferroviaires en Suisse","La vente internationale de choses mobilières","Les normes d'emballage européennes","Les règles de stockage des produits dangereux"],answer:1},
 ]};

const CHA6 = {id:"ca6",num:6,mod:"A",title:"Le contrôle des quantités",icon:"⚖️",color:"#E65100",textColor:"#fff",
 content:[
  {T:"intro",x:"Compter, mesurer et peser sont des fonctions essentielles du contrôle qualité en logistique. La maîtrise des instruments de mesure — longueurs, volumes, poids — garantit la conformité des livraisons et prévient les litiges commerciaux."},
  {T:"section",x:"Les unités de mesure particulières"},
  {T:"img",src:"/images/modA_img12.png",alt:"Classification des moyens de transport (continu / discontinu)"},
  {T:"hl",bg:"#fff8e1",b:"#f59e0b",ti:"Unités hors système décimal",x:"• Barrel (pétrole) = 158,8 litres\n• Gallon USA (liquide) = 3,79 litres\n• Gallon GB (liquide) = 4,55 litres\n• Douzaine = 12 pièces (crayons)\n• Grosse = 12 douzaines = 144 pièces\n• Inch (pouce) = 2,54 cm (conteneurs)\n• Carat = 0,2 g (or, pierres précieuses)\n• Paire = 2 pièces (chaussures)\n• Pint (GB) = 0,568 litre\n\nHistoire : en 1791 la France a instauré le mètre comme unité unique. En 1799, le mètre étalon a été construit. La norme DIN 866 régit la précision des mètres (classes I à III)."},
  {T:"img",src:"/images/modA_img9.png",alt:"Dynamomètres : digital, ressort hélicoïdal, balance à lame pliante"},
  {T:"section",x:"Instruments de mesure des longueurs"},
  {T:"list",items:["Mètre à ruban (classe de précision DIN 866) — pour mesures courantes","Pied à coulisse ou calibre — mesure épaisseur, diamètre ou profondeur","Micromètre — précision de 0,01 mm, pour matériaux fins (papier, tôle)","Gabarit ou chablon — contrôle rapide des dimensions, utilisé à La Poste pour classer les envois"]},
  {T:"section",x:"Instruments de mesure de volume"},
  {T:"list",items:["Pompe à piston — aspire un volume fixe à chaque mouvement, compteur intégré","Débitmètre — mesure le volume à l'aide de la durée d'écoulement dans un tuyau à débit connu","Scanner de volumes — mesure les 3 dimensions d'un emballage, utilisé en préparation de commandes et à La Poste"]},
  {T:"img",src:"/images/modA_img11.png",alt:"Palette EPAL — Structure, blocs, planches et marquages ISPM 15"},
  {T:"section",x:"Les instruments de pesage"},
  {T:"hl",bg:"#e3f2fd",b:"#0277BD",ti:"Classification des balances",x:"BALANCES DE COMPARAISON DES MASSES :\n• Balance à bras égaux : fonctionne selon le principe du levier. Mise en équilibre avec des poids étalons.\n• Balance romaine : bras inégaux, contrepoids déplaçable qui peut se déplacer → plus il est éloigné, plus son effet de levier est important.\n\nDYNAMOMÈTRES (balances à ressort) :\n• Mesurent la force de traction → poids calculé par déformation du ressort\n• Doivent être calibrés sur leur lieu d'exploitation (la force d'attraction varie selon l'altitude)\n• Le ressort s'affaiblit avec le temps → étalonnage régulier requis"},
  {T:"list",items:["Balance de table — pour petites marchandises","Balance compteuse — prend le poids de 10 pièces de référence puis calcule automatiquement le nombre total","Plate-forme de pesage — pour peser les palettes (penser à soustraire le poids de la palette)","Pèse-palettes — adapté aux palettes, charges importantes","Chariot peseur mobile — système de pesée embarqué sur transpalette ou chariot élévateur","Pont bascule — pour camions ou wagons complets : pesage plein, déchargement, re-pesage à vide → différence = poids marchandise"]},
  {T:"svg",h:90,code:`<svg viewBox="0 0 680 80" xmlns="http://www.w3.org/2000/svg" style="width:100%;border-radius:8px;background:#fff8f0">
    <text x="340" y="15" text-anchor="middle" font-size="11" font-weight="800" fill="#E65100">Principe de la balance romaine — Moment = Force × Distance</text>
    <rect x="60" y="30" width="560" height="8" rx="4" fill="#94a3b8"/>
    <polygon points="330,38 340,55 350,38" fill="#E65100"/>
    <rect x="60" y="25" width="40" height="40" rx="4" fill="#bfdbfe" stroke="#1565C0"/>
    <text x="80" y="50" text-anchor="middle" font-size="9" font-weight="700" fill="#1e3a5f">F₁=200N</text>
    <rect x="580" y="25" width="40" height="40" rx="4" fill="#dcfce7" stroke="#2E7D32"/>
    <text x="600" y="50" text-anchor="middle" font-size="9" font-weight="700" fill="#166534">F₂=100N</text>
    <text x="200" y="72" text-anchor="middle" font-size="9" fill="#6b7280">a₁ = 0,4 m</text>
    <text x="490" y="72" text-anchor="middle" font-size="9" fill="#6b7280">a₂ = 0,8 m</text>
    <text x="340" y="72" text-anchor="middle" font-size="10" font-weight="700" fill="#E65100">0,4m × 200N = 0,8m × 100N = 80 Nm ✓ ÉQUILIBRE</text>
  </svg>`},
  {T:"gloss",items:[
    {term:"DIN 866",def:"Norme allemande (Deutsches Institut für Normung) définissant les classes de précision des instruments de mesure de longueur (mètres). Classes I à III, du plus au moins précis. Un mètre de qualité DIN 866 est requis pour des mesures fiables."},
    {term:"Pied à coulisse (calibre)",def:"Instrument de mesure permettant de mesurer avec précision l'épaisseur, le diamètre intérieur/extérieur ou la profondeur d'un objet. Précision typique de 0,01 à 0,1 mm. Indispensable en logistique industrielle."},
    {term:"Micromètre",def:"Instrument de précision permettant des mesures à 0,01 mm. Utilisé pour mesurer l'épaisseur de matériaux très fins : papier, feuilles métalliques, tôle. Plus précis que le pied à coulisse."},
    {term:"Gabarit / Chablon",def:"Outil de contrôle dimensionnel rapide permettant de vérifier si un objet entre dans une dimension standard. Utilisé à La Poste pour classer les envois selon leur format (lettre, grand format, colis)."},
    {term:"Débitmètre",def:"Appareil mesurant le volume d'un liquide en fonction de la durée de son écoulement dans un tuyau à débit connu. Formule : Volume = Débit × Durée. Utilisé pour les produits liquides (carburant, huile)."},
    {term:"Balance compteuse",def:"Balance qui détermine automatiquement le nombre de pièces en calculant leur poids total par rapport à un poids unitaire de référence. Ex : peser 10 boulons → calculer le nombre de boulons dans un lot."},
    {term:"Pont bascule",def:"Bascule très lourde encastrée dans la chaussée, permettant de peser des camions ou wagons complets. Méthode : pesage à plein − pesage à vide = poids de la marchandise transportée."},
    {term:"Chariot peseur mobile",def:"Système de pesée embarqué directement sur un transpalette ou chariot élévateur. Permet de peser les palettes sans les transférer sur une balance séparée, gagnant temps et effort."},
    {term:"Dynamomètre",def:"Balance mesurant la force par déformation d'un ressort. Doit être calibré sur son lieu d'utilisation car la gravité varie selon l'altitude. Le ressort s'affaiblit avec l'usage — étalonnage régulier requis."},
    {term:"Balance romaine",def:"Balance à bras inégaux dont un contrepoids déplaçable permet d'ajuster l'équilibre. Plus le contrepoids est éloigné du pivot, plus son effet de levier est important. Principe : Moment = Force × Bras de levier."},
  ]},
 ],
 questions:[
  {q:"Un barrel de pétrole correspond à :",options:["100 litres","158,8 litres","200 litres","3,79 litres"],answer:1},
  {q:"Une 'grosse' correspond à :",options:["12 pièces","24 pièces","100 pièces","144 pièces (12 douzaines)"],answer:3},
  {q:"Le micromètre permet de mesurer avec une précision de :",options:["0,1 mm","0,01 mm","1 mm","0,001 mm"],answer:1},
  {q:"La balance compteuse fonctionne en :",options:["Comptant manuellement les pièces","Prenant un poids de référence de 10 pièces puis calculant le nombre total","Pesant toutes les pièces une à une","Utilisant un scanner optique"],answer:1},
  {q:"Le pont bascule sert à peser :",options:["De petits articles de bureau","Des palettes de marchandises","Des camions ou wagons complets","Des courriers postaux"],answer:2},
  {q:"Pourquoi un dynamomètre doit-il être calibré sur son lieu d'utilisation ?",options:["À cause des variations d'humidité","Car la force d'attraction gravitationnelle varie selon l'altitude","À cause des variations de température","Car les ressorts rouillent"],answer:1},
  {q:"Le pied à coulisse permet de mesurer (plusieurs réponses) :",options:["L'épaisseur d'un objet","Le diamètre intérieur et extérieur","La profondeur d'une rainure","Le poids d'un objet","La température"],answers:[0,1,2],multi:true},
  {q:"Le scanner de volumes sert à :",options:["Peser les marchandises","Mesurer les 3 dimensions d'un emballage","Détecter les substances dangereuses","Lire les codes-barres"],answer:1},
  {q:"Le gabarit ou chablon est notamment utilisé :",options:["Pour peser les palettes","Pour mesurer la température des marchandises","À La Poste pour classer les envois selon leur format","Pour vérifier l'étanchéité des emballages"],answer:2},
 ]};

// ─── MODULE A : QCM ALÉATOIRE 40 QUESTIONS ─────────────────────────────────
const MODULE_A_RAND_POOL = [
  ...CHA1.questions.map(q=>({...q,_ch:"CHA1",_chTitle:"Marché d'approvisionnement",_chColor:CHA1.color,_chTextColor:CHA1.textColor})),
  ...CHA2.questions.map(q=>({...q,_ch:"CHA2",_chTitle:"Types de marchandises",_chColor:CHA2.color,_chTextColor:CHA2.textColor})),
  ...CHA3.questions.map(q=>({...q,_ch:"CHA3",_chTitle:"Contrat de vente",_chColor:CHA3.color,_chTextColor:CHA3.textColor})),
  ...CHA4.questions.map(q=>({...q,_ch:"CHA4",_chTitle:"Documents d'accompagnement",_chColor:CHA4.color,_chTextColor:CHA4.textColor})),
  ...CHA5.questions.map(q=>({...q,_ch:"CHA5",_chTitle:"Réception des marchandises",_chColor:CHA5.color,_chTextColor:CHA5.textColor})),
  ...CHA6.questions.map(q=>({...q,_ch:"CHA6",_chTitle:"Contrôle des quantités",_chColor:CHA6.color,_chTextColor:CHA6.textColor})),
];

const MODULE_A = [CHA1,CHA2,CHA3,CHA4,CHA5,CHA6];

// ═══════════════════════════════════════════════════════════
//  MODULE B — Stockage & Conservation des marchandises
// ═══════════════════════════════════════════════════════════

const MODULE_B_META = {id:"B",title:"Module B",subtitle:"Stockage & Conservation",icon:"🏭",color:"#2E7D32",textColor:"#fff",
  desc:"Caractéristiques des marchandises, rôle du stockage, types d'entrepôts, formes de stockage et systèmes de rayonnages."};

const CHB1 = {id:"cb1",num:1,mod:"B",title:"Caractéristiques des marchandises à stocker",icon:"📊",color:"#1B5E20",textColor:"#fff",
 content:[
  {T:"intro",x:"Le choix du lieu et des conditions de stockage dépend directement des caractéristiques des marchandises. Trois critères fondamentaux déterminent ces choix : la périssabilité, la dangerosité et les contraintes de manutention."},
  {T:"section",x:"Les 3 critères déterminants du stockage"},
  {T:"list",items:["La PÉRISSABILITÉ : sensibilité aux influences extérieures (chaleur, froid, humidité, lumière)","La DANGEROSITÉ : risque pour les personnes, les biens ou l'environnement","La MANUTENTION : facilité ou difficulté de manipulation, dimensions, poids"]},
  {T:"section",x:"L'altération par influences spontanées"},
  {T:"hl",bg:"#e8f5e9",b:"#1B5E20",ti:"Influences mécaniques et climatiques",x:"Les influences mécaniques surviennent lors de la réception, du transport ou de l'entreposage :\n• Chocs, heurts, chutes — risques liés aux chariots élévateurs\n• Pression excessive lors de l'empilage\n\nLa CHALEUR : les marchandises réfrigérées deviennent inutilisables si exposées trop longtemps à une température élevée. Les livraisons dépassant la température limite à la réception sont REFUSÉES (risque bactérien).\n\nLe FROID : les fleurs coupées et certains fruits ne supportent pas les basses températures.\n\nL'HUMIDITÉ : les produits hygroscopiques (papier, farine, sucre) s'altèrent en absorbant l'humidité.\n\nLes ESD (Décharges électrostatiques) : détruisent les composants électroniques. Les manipulateurs doivent être 'mis à terre'. Ne déballer les composants électroniques que si absolument nécessaire."},
  {T:"section",x:"L'altération par influences durables"},
  {T:"hl",bg:"#e8f5e9",b:"#1B5E20",ti:"7 facteurs d'influence durable",x:"1. PRESSION D'EMPILAGE : empiler en blocs uniquement les marchandises insensibles à la pression. Les fruits et légumes ne peuvent être empilés que dans des contenants solides, remplis jusqu'à un limite protégeant le contenu.\n\n2. TEMPÉRATURE DE STOCKAGE : en dessous de -18°C, toute multiplication bactérienne est stoppée. Dès que la température augmente, la multiplication reprend → ne jamais recongeler.\n\n3. HYGROMÉTRIE (humidité de l'air) :\n• Trop élevée → les produits hygroscopiques absorbent l'humidité → agglutination des poudres. Solution : sachets dessicateurs (gel de silice ou argile sèche).\n• Trop faible → les fruits et légumes se rident (besoin de 90% d'humidité).\n\n4. LUMIÈRE : néfaste pour les produits contenant huile et graisse → oxydation → rancissement. Les matières synthétiques et caoutchouc deviennent friables. Stocker à l'ombre.\n\n5. VIEILLISSEMENT : certains produits perdent de la valeur (obsolescence). D'autres en gagnent lors du stockage : vin, whisky (10 ans min.), fromage, tabac.\n\n6. NUISIBLES : champignons/bactéries, insectes, petits mammifères. Prévention : bonne hygiène, conditions optimales, contrôles permanents.\n\n7. INFLUENCES RÉCIPROQUES : les pommes dégagent de l'éthylène qui accélère la maturation des autres fruits → stocker séparément."},
  {T:"section",x:"La dangerosité — Symboles GHS depuis 2012"},
  {T:"img",src:"/images/modB_img7.png",alt:"Symboles de danger GHS 2012 — Attention, Inflammable, Comburant"},
  {T:"hl",bg:"#fce4ec",b:"#C62828",ti:"Symboles de danger GHS (Système Général Harmonisé)",x:"Depuis 2012, la norme GHS remplace l'ancien étiquetage européen.\n\n3 exemples de symboles principaux :\n• ⚠️ Attention/Danger : peut irriter la peau, provoquer des allergies ou eczémas, somnolence, intoxications. Ex : tablettes lave-vaisselle, nettoyants, eau de Javel.\n• 🔥 Extrêmement inflammable : peut s'enflammer par contact avec flammes, étincelles, frictions. Ex : allume-feu, lampes à huile, aérosols, solvants.\n• ⭕ Comburant : active ou favorise un incendie en libérant de l'oxygène. Ne peut être éteint qu'avec des produits spéciaux. Ex : décolorant, eau oxygénée."},
  {T:"section",x:"La manutention — Critères"},
  {T:"img",src:"/images/modB_img10.png",alt:"Critères de manutention des marchandises"},
  {T:"hl",bg:"#e3f2fd",b:"#0277BD",ti:"Tableau des critères de manutention",x:"Volume : grand / moyen / petit\nDimensions : long/court · large/étroit · encombrant/maniable\nDensité : légère / lourde / très lourde\nEmpilage : empilable / non empilable\nÉtat d'agrégation : solide / liquide / gazeux\nValeur : bon marché / cher / de grande valeur\n\nMarchandises FACILES à manutentionner : empilables, volume petit à moyen, dimensions ≤ 1,20 m, adaptées aux palettes EUR et rayonnages courants.\n\nMarchandises ENCOMBRANTES : trop grandes pour les supports standard → solutions particulières requises.\n\nMarchandises de GRANDE VALEUR : stockage en zones sécurisées (alcool, tabac, médicaments, drogues). Armoires verrouillables, rayonnages rotatifs verticaux (pater-noster)."},
  {T:"gloss",items:[
    {term:"ESD (Décharges électrostatiques)",def:"Décharges d'électricité statique pouvant détruire instantanément les composants électroniques (microprocesseurs, transistors). Les manipulateurs doivent être 'mis à terre' avec un bracelet antistatique. Ne déballer les composants que si nécessaire."},
    {term:"Hygrométrie",def:"Mesure du taux d'humidité de l'air exprimé en pourcentage (%). L'air chaud absorbe plus d'eau que l'air froid. Un taux trop élevé favorise la moisissure et l'agglutination des poudres. Un taux trop faible fait se rider les fruits et légumes."},
    {term:"Dessicateur (gel de silice)",def:"Substance absorbant l'humidité contenue dans un emballage pour protéger le contenu. Se présente en petits sachets (gel de silice ou argile sèche) glissés dans les emballages de produits hygroscopiques ou électroniques."},
    {term:"GHS (Système Général Harmonisé)",def:"Norme internationale de classification et d'étiquetage des produits chimiques, adoptée en Suisse depuis 2012. Remplace l'ancien système européen. Utilise des pictogrammes rouges standardisés (losanges rouges avec pictogramme noir)."},
    {term:"Pression d'empilage",def:"Force exercée par le poids des couches supérieures sur les couches inférieures lors de l'empilage. Peut écraser les marchandises sensibles. Règle : n'empiler en blocs que les marchandises insensibles à la pression."},
    {term:"Pater-noster (rayonnage rotatif vertical)",def:"Système de stockage rotatif vertical dans lequel les étagères tournent comme un manège pour amener les articles à portée de l'opérateur. Utilisé pour les marchandises de grande valeur ou confidentielles, dans un espace fermé et sécurisé."},
    {term:"Chaîne du froid",def:"Maintien d'une température basse et ininterrompue pendant tout le transport et le stockage des marchandises réfrigérées ou congelées. En dessous de -18°C, toute multiplication bactérienne est stoppée."},
    {term:"Éthylène",def:"Gaz naturellement produit par les pommes et autres fruits mûrs. Accélère la maturation des fruits et légumes voisins. Les pommes doivent donc être stockées séparément des autres fruits pour éviter une maturation prématurée."},
    {term:"Pater-noster",def:"Système de rayonnage rotatif vertical fonctionnant comme un convoyeur à boucle fermée. Convient pour les marchandises précieuses : l'opérateur n'accède qu'à la position exposée, le reste restant inaccessible sans autorisation."},
  ]},
 ],
 questions:[
  {q:"Quels sont les 3 critères déterminants pour le choix du lieu de stockage ?",options:["La couleur, le poids, la forme","La périssabilité, la dangerosité, la manutention","Le prix, la quantité, la qualité","La marque, le fournisseur, la destination"],answer:1},
  {q:"En dessous de quelle température toute multiplication bactérienne est-elle stoppée ?",options:["0°C","−5°C","−18°C","−30°C"],answer:2},
  {q:"Les composants électroniques peuvent être détruits par :",options:["Les vibrations mécaniques","Les décharges électrostatiques (ESD)","L'excès de lumière","La pression d'empilage"],answer:1},
  {q:"Les fruits et légumes ont besoin d'un taux d'humidité d'environ :",options:["50%","70%","90%","100%"],answer:2},
  {q:"La norme GHS s'applique depuis :",options:["2000","2008","2012","2020"],answer:2},
  {q:"Les marchandises de grande valeur doivent être stockées (plusieurs réponses) :",options:["Dans des zones sécurisées","Dans des armoires verrouillables","Dans des rayonnages rotatifs verticaux","N'importe où dans l'entrepôt","Sur des palettes en bout de rangée"],answers:[0,1,2],multi:true},
  {q:"Le symbole GHS 'comburant' indique que le produit :",options:["Est très toxique pour les humains","Active ou favorise un incendie en libérant de l'oxygène","Est corrosif pour les métaux","Présente un risque d'explosion"],answer:1},
  {q:"Pourquoi ne faut-il jamais recongeler un aliment décongelé ?",options:["Cela détruit les vitamines","La multiplication bactérienne reprend à la décongélation — recongeler ne la stoppe pas","C'est illégal en Suisse","Cela change le goût de l'aliment"],answer:1},
  {q:"Quels facteurs influencent l'altération durable des marchandises (plusieurs réponses) ?",options:["La pression d'empilage","La température","L'hygrométrie","La lumière","La couleur des étagères","Les nuisibles"],answers:[0,1,2,3,5],multi:true},
  {q:"La longueur maximale pour une marchandise 'facile à manutentionner' est :",options:["0,80 m","1,00 m","1,20 m","1,50 m"],answer:2},
 ]};

const CHB2 = {id:"cb2",num:2,mod:"B",title:"Le rôle du stockage",icon:"🏗️",color:"#2E7D32",textColor:"#fff",
 content:[
  {T:"intro",x:"L'entrepôt ne sert pas uniquement à stocker des marchandises. Il remplit plusieurs fonctions essentielles qui permettent d'équilibrer la production et la consommation, de sécuriser les approvisionnements et d'apporter une valeur ajoutée aux marchandises."},
  {T:"section",x:"Les 7 fonctions du stockage"},
  {T:"hl",bg:"#e8f5e9",b:"#2E7D32",ti:"Fonctions clés de l'entrepôt",x:"1. RÉSERVE : constituer des stocks pour les périodes de pénurie. En Suisse, réserves OBLIGATOIRES imposées par l'État : sucre, sel, eau, céréales (financées par les entreprises elles-mêmes).\n\n2. TAMPON : absorber le surplus de production, compenser les variations saisonnières, profiter des achats en grande quantité, stocker à des fins spéculatives.\n\n3. SÉCURITÉ : la plus importante. Assurer l'approvisionnement en cas de retard, surconsommation ou variation de la demande.\n\n4. TRANSFORMATION : reconditionnement, découpe (tôle, tubes), mélange (peinture, chimie), prémontage de composants.\n\n5. CONTRÔLE ET TRI : identification, contrôle quantité/état/qualité, contrôle des délais, élimination des marchandises périmées ou abîmées.\n\n6. SPÉCULATION : acheter avant une hausse de prix pour vendre plus cher. Ex : achat de fioul en été pour revente en hiver.\n\n7. AFFINAGE / MATURATION : certains produits atteignent leur pleine qualité par le stockage. Whisky : 10 ans minimum. Fromage, tabac, vin également."},
  {T:"section",x:"Les réserves obligatoires suisses"},
  {T:"text",x:"La Suisse impose légalement des réserves obligatoires pour garantir l'approvisionnement en cas de crise ou de catastrophe. Ces réserves concernent : sucre, sel, eau, céréales et huiles alimentaires. Elles sont financées par les entreprises elles-mêmes (à leurs frais) et doivent être renouvelées régulièrement pour ne pas se périmer."},
  {T:"gloss",items:[
    {term:"Réserves obligatoires",def:"Stocks de denrées alimentaires et de matières premières que l'État suisse impose aux entreprises de constituer et de maintenir. Objectif : garantir l'approvisionnement de la population en cas de crise, de catastrophe ou de rupture d'approvisionnement international."},
    {term:"Fonction tampon",def:"Rôle de l'entrepôt consistant à absorber les déséquilibres entre l'offre (production) et la demande (consommation). Permet de produire en grande série et de livrer en petites quantités, ou inversement."},
    {term:"Fonction de sécurité",def:"Fonction la plus importante du stockage : constituer un stock suffisant pour pallier les imprévus (retard fournisseur, pic de commandes, surconsommation). Garantit la continuité de l'approvisionnement."},
    {term:"Fonction de transformation",def:"L'entrepôt peut ajouter de la valeur aux marchandises : reconditionnement (changer l'emballage), découpe, mélange de produits, prémontage de composants. Transforme un simple lieu de stockage en centre de valeur ajoutée."},
    {term:"Fonction de spéculation",def:"Acheter des marchandises avant une augmentation prévisible de leur prix pour les revendre plus cher ultérieurement. Ex : acheter du fioul en été quand les prix sont bas pour le revendre en hiver à prix élevé."},
    {term:"Affinage / Maturation",def:"Processus par lequel certaines marchandises améliorent leur qualité lors du stockage. Ex : le fromage affine, le vin et le whisky (10 ans minimum) développent leurs arômes. L'entrepôt d'affinage crée de la valeur par le temps."},
    {term:"Variation saisonnière",def:"Fluctuation de la demande ou de la production selon les saisons. Ex : pics de ventes de jouets en décembre, surplus de fruits en été. L'entrepôt (fonction tampon) permet de lisser ces variations."},
  ]},
 ],
 questions:[
  {q:"Quelle est la fonction la plus importante du stockage ?",options:["La spéculation","Le tampon","La sécurité","La transformation"],answer:2},
  {q:"Les réserves obligatoires suisses concernent (plusieurs réponses) :",options:["Le sucre","Le sel","L'eau","Les céréales","Le café","Le chocolat"],answers:[0,1,2,3],multi:true},
  {q:"Qui finance les réserves obligatoires suisses ?",options:["L'État fédéral","Les cantons","Les entreprises elles-mêmes","Les banques suisses"],answer:2},
  {q:"La fonction de spéculation consiste à :",options:["Stocker pour réduire les coûts","Acheter avant une hausse de prix pour vendre plus cher","Stocker uniquement les produits de luxe","Afiner les produits alimentaires"],answer:1},
  {q:"Un whisky doit être stocké au minimum :",options:["3 ans","5 ans","10 ans","25 ans"],answer:2},
  {q:"La fonction de transformation dans un entrepôt peut inclure (plusieurs réponses) :",options:["Le reconditionnement de marchandise","La découpe de tôle ou tubes","Le mélange de peintures","Le prémontage de composants","La vente directe au client"],answers:[0,1,2,3],multi:true},
  {q:"La fonction tampon permet notamment de :",options:["Protéger les marchandises des nuisibles","Absorber le surplus de production et compenser les variations saisonnières","Gérer les réserves obligatoires","Contrôler la qualité des marchandises"],answer:1},
 ]};

const CHB3 = {id:"cb3",num:3,mod:"B",title:"Les genres de stockage",icon:"🏢",color:"#00695C",textColor:"#fff",
 content:[
  {T:"intro",x:"Il existe différents genres d'entrepôts, chacun répondant à des besoins logistiques spécifiques. Le choix du type d'entrepôt dépend de la nature des marchandises, du rôle attendu et de la durée de stockage."},
  {T:"section",x:"L'entrepôt de réserve"},
  {T:"text",x:"Ces entrepôts jouent un rôle de réservoir et de sécurisation. En cas d'achat en grandes quantités, ils assurent également un rôle tampon et de spéculation. Les RÉSERVES OBLIGATOIRES constituent un genre spécial d'entrepôt de réserve : elles contiennent des denrées alimentaires et des ressources énergétiques imposées par la loi pour assurer l'approvisionnement en cas de crise."},
  {T:"section",x:"L'entrepôt de transbordement"},
  {T:"hl",bg:"#e0f7fa",b:"#00695C",ti:"Rôle et localisations",x:"L'entrepôt de transbordement ne gère pas de stock propre. Les marchandises y passent provisoirement pour :\n• Transfert d'un moyen de transport à un autre\n• Tri d'envois\n• Mise à disposition pour le chargement\n\nLocalisations typiques : ports · gares de marchandises · aéroports · terminaux de conteneurs · centres de tri courrier/colis\n\nActivités administratives associées : formalités douanières · contrôles de sécurité · établissement de bordereaux d'expédition · facturation des frais de transport."},
  {T:"section",x:"Les sites de stockage temporaires"},
  {T:"list",items:["Case postale — stockage de courrier au bureau de poste","Consigne (casier CFF) — stockage de bagages dans les gares","MyPost 24 — automate disponible 24h/24","Entreposage de déchets radioactifs à Würenlingen (décennies, non définitif)"]},
  {T:"section",x:"L'entrepôt de production — 4 types"},
  {T:"hl",bg:"#f1f8e9",b:"#2E7D32",ti:"4 types d'entrepôts liés à la production",x:"1. ENTREPÔT AMONT : approvisionne la zone de production en matières premières et produits semi-finis.\n\n2. SITE D'EN-COURS : stockage provisoire des produits semi-finis ne pouvant pas être transformés immédiatement.\n\n3. ENTREPÔT AVAL : assure l'approvisionnement de la distribution et vente, absorbe les excès de production, équilibre l'offre et la demande.\n\n4. ENTREPÔT SELF-SERVICE : petits entrepôts de pièces consommables fréquentes (vis, boulons). Les collaborateurs se servent directement SANS enregistrer leur prélèvement."},
  {T:"section",x:"L'entrepôt de maturation"},
  {T:"text",x:"Ces entrepôts servent exclusivement à la maturation de certains produits : alcool (whisky, cognac), fromage, fruits. La qualité du produit s'améliore avec le temps de stockage."},
  {T:"section",x:"L'entrepôt de produits finis et de vente"},
  {T:"text",x:"Stockage provisoire des produits prêts à la vente mais non vendus immédiatement. Assure la jonction entre production et vente. L'espace de vente dans lequel la marchandise est proposée au client EST lui-même un entrepôt de vente."},
  {T:"gloss",items:[
    {term:"Entrepôt de transbordement",def:"Entrepôt n'ayant pas de stock propre. Les marchandises y transitent provisoirement pour changer de moyen de transport (camion → train → bateau), être triées ou préparées pour l'expédition. Présent dans les ports, aéroports et gares."},
    {term:"Entrepôt de réserve",def:"Entrepôt constitué pour faire face aux périodes de pénurie ou aux crises. Inclut les réserves obligatoires (imposées par l'État suisse) et les stocks commerciaux de sécurité des entreprises."},
    {term:"Entrepôt amont",def:"Entrepôt situé en amont de la production. Son rôle est d'approvisionner régulièrement la chaîne de production en matières premières et produits semi-finis pour éviter les arrêts de production."},
    {term:"Site d'en-cours",def:"Stockage provisoire des produits semi-finis entre deux étapes de transformation. Les produits attendent d'être pris en charge par la prochaine étape de production. Minimise les goulets d'étranglement."},
    {term:"Entrepôt aval",def:"Entrepôt situé après la production, permettant de stocker les produits finis avant leur expédition. Absorbe les excès de production et assure un approvisionnement régulier de la distribution."},
    {term:"Entrepôt self-service",def:"Petit entrepôt ouvert permettant aux collaborateurs de se servir eux-mêmes en pièces consommables courantes (vis, boulons, petites fournitures) sans enregistrement systématique des prélèvements. Gain de temps au détriment du contrôle des stocks."},
    {term:"Entrepôt de maturation",def:"Entrepôt dans lequel les marchandises restent pendant une période définie pour atteindre leur qualité optimale. Ex : caves à vin, chais pour whisky (10+ ans), caves à fromage. La durée de stockage est une valeur ajoutée."},
    {term:"Würenlingen",def:"Site suisse d'entreposage temporaire de déchets radioactifs. Les déchets nucléaires ne pouvant pas encore être stockés définitivement (pas de site de stockage final construit), ils y sont entreposés pendant des décennies."},
  ]},
 ],
 questions:[
  {q:"L'entrepôt de transbordement se distingue par :",options:["Il stocke uniquement des produits finis","Il n'a pas de stock propre — les marchandises y transitent provisoirement","Il est réservé aux réserves obligatoires","Il stocke uniquement des produits dangereux"],answer:1},
  {q:"Où trouve-t-on typiquement des entrepôts de transbordement (plusieurs réponses) ?",options:["Dans les ports","Dans les gares de marchandises","Dans les aéroports","Dans les terminaux de conteneurs","Dans les supermarchés"],answers:[0,1,2,3],multi:true},
  {q:"L'entrepôt self-service se caractérise par :",options:["Un accès réservé aux managers","Des collaborateurs se servant eux-mêmes sans enregistrer les prélèvements","Un système de stockage automatisé","Un entrepôt uniquement pour les clients"],answer:1},
  {q:"Un entrepôt de maturation est utilisé pour (plusieurs réponses) :",options:["L'alcool (whisky, cognac)","Le fromage","Les fruits","Les appareils électroniques","Le bois de construction"],answers:[0,1,2],multi:true},
  {q:"Le site de stockage temporaire de déchets radioactifs suisse se trouve à :",options:["Bâle","Zurich","Würenlingen","Berne"],answer:2},
  {q:"L'entrepôt amont sert à :",options:["Stocker les produits finis","Approvisionner la zone de production en matières premières et semi-finis","Stocker les marchandises en attente de vente","Affiner les produits alimentaires"],answer:1},
  {q:"Les activités administratives d'un entrepôt de transbordement incluent (plusieurs réponses) :",options:["Formalités douanières","Contrôles de sécurité","Établissement de bordereaux d'expédition","Facturation des frais de transport","Production de marchandises"],answers:[0,1,2,3],multi:true},
 ]};

const CHB4 = {id:"cb4",num:4,mod:"B",title:"Les formes de stockage",icon:"📦",color:"#37474F",textColor:"#fff",
 content:[
  {T:"intro",x:"Les formes de stockage varient selon la nature des marchandises, leur résistance aux intempéries et les équipements disponibles. De l'entrepôt à ciel ouvert aux rayonnages automatisés, chaque solution correspond à des besoins précis."},
  {T:"section",x:"3 types d'entrepôts selon la protection"},
  {T:"img",src:"/images/modB_img14.png",alt:"Vue d'ensemble des formes de stockage"},
  {T:"hl",bg:"#f5f5f5",b:"#37474F",ti:"Entrepôts à ciel ouvert, couverts et fermés",x:"ENTREPÔTS À CIEL OUVERT : marchandises insensibles aux intempéries et peu sujettes au vol.\nStockage : vrac (charbon, gravier, sable), bois brut, produits à base de ciment (blocs, tuyaux), palettes vides.\n\nENTREPÔTS COUVERTS (toit sans murs) : protection contre soleil et pluie, mais insensibles aux variations de T° et hygrométrie.\nStockage : véhicules et engins, produits sidérurgiques (tuyaux), planches de bois, matériaux de construction (tuiles, briques).\n\nENTREPÔTS FERMÉS (toit + murs) : protection totale, pour marchandises sensibles aux intempéries ou sujettes au vol.\nStockage : vêtements, produits alimentaires, DXP (véhicule électrique La Poste), matériel de bureau."},
  {T:"section",x:"Structures de stockage au sol"},
  {T:"hl",bg:"#f5f5f5",b:"#37474F",ti:"Stockage en bloc — Différentes variantes",x:"STOCKAGE AU SOL EN BLOC À PLAT : unités posées à même le sol, sans empilage. Couloirs entre rangées pour accès. Grande surface requise. Uniquement pour biens ne pouvant pas être empilés.\n\nSTOCKAGE EN BLOC EN PILES : unités empilées les unes sur les autres. Nécessite : résistance à la pression, chariots élévateurs. Utilisé pour grandes quantités d'un même article (palettes vides, bobines de papier).\n\nSTOCKAGE EN BLOC PALETTES EN PILE : nécessite surface horizontale, résistance à la pression, protection humidité, limitation de hauteur, contrôle permanent des piles inclinées.\n\nEMPILAGE DE SACS : couches extérieures placées en croix sur les côtés. Ouvertures des sacs vers l'intérieur. Ne pas prélever d'échantillons dans les sacs du bas."},
  {T:"hl",bg:"#e3f2fd",b:"#0277BD",ti:"Vue d'ensemble : stockage au sol et en rayonnages",x:"Stockage au sol (ch.4.3) :\n• Statique : en bloc (compact) / en rangées (accès latéral)\n\nRayonnages à palettes (ch.4.4) :\n• Statique : rayonnages à palettes simples / compartimentés / spéciaux (cantilever, sacs...)\n• Dynamique : rayonnages mobiles / rotatifs / dynamiques (gravitaires)\n\nRégle clé : Statique = le logisticien va vers la marchandise. Dynamique = la marchandise vient vers le logisticien.\n\nStockage suspendu (ch.4.5) :\n• Statique : barres fixes pour vêtements\n• Dynamique : convoyeur aérien (rail motorisé)"},
  {T:"gloss",items:[
    {term:"Stockage en bloc",def:"Forme de stockage où les unités sont placées côte à côte et/ou empilées sans couloirs d'accès entre elles. Optimise l'utilisation de la surface mais nécessite de déplacer les unités pour accéder à celles du fond (principe LIFO)."},
    {term:"Stockage en rangées",def:"Variante du stockage au sol avec des couloirs permettant l'accès individuel à chaque rangée. Moins dense que le bloc mais permet d'accéder à chaque palette sans déplacer les autres."},
    {term:"Rayonnage à palettes",def:"Structure métallique permettant de stocker des palettes sur plusieurs niveaux. Peut être statique (fixe) ou dynamique (mobile ou gravitaire). C'est le système de stockage le plus répandu en logistique."},
    {term:"Rayonnage mobile",def:"Rayonnage monté sur rails permettant de rapprocher ou d'écarter les rangées. Élimine tous les couloirs inutiles sauf un seul couloir de travail. Double la densité de stockage par rapport aux rayonnages fixes."},
    {term:"Rayonnage rotatif",def:"Système dans lequel les étagères tournent horizontalement ou verticalement, amenant l'article voulu devant l'opérateur. La marchandise vient vers l'opérateur (système dynamique). Idéal pour les petites pièces à forte rotation."},
    {term:"Rayonnage dynamique (gravitaire)",def:"Rayonnage légèrement incliné utilisant la gravité. Les palettes ou bacs glissent automatiquement vers le poste de prélèvement lorsque l'unité avant est retirée. Respect naturel du principe FIFO."},
    {term:"Rayonnage cantilever",def:"Rayonnage spécial sans montants verticaux frontaux, permettant le stockage de marchandises longues (tuyaux, barres, planches) que des rayonnages classiques ne peuvent pas accueillir."},
    {term:"Stockage suspendu",def:"Stockage de marchandises accrochées (vêtements sur cintre, pièces légères). Statique : barres fixes. Dynamique : convoyeurs aériens motorisés permettant le transport automatique des articles."},
  ]},
 ],
 questions:[
  {q:"Que stocke-t-on dans un entrepôt à ciel ouvert ?",options:["Des vêtements et produits alimentaires","Charbon, gravier, sable, bois brut, palettes vides","Appareils électroniques et médicaments","Produits réfrigérés"],answer:1},
  {q:"Un rayonnage STATIQUE signifie :",options:["La marchandise vient vers le logisticien","Le logisticien va vers la marchandise","Le rayonnage est automatisé","Le rayonnage est fixé au sol en béton"],answer:1},
  {q:"Un rayonnage DYNAMIQUE signifie :",options:["Le logisticien va vers la marchandise","La marchandise vient vers le logisticien","Le rayonnage est fixe","Le rayonnage utilise uniquement le LIFO"],answer:1},
  {q:"L'entrepôt couvert (sans murs) est adapté pour (plusieurs réponses) :",options:["Véhicules et engins","Produits sidérurgiques (tuyaux)","Planches de bois","Matériaux de construction","Médicaments et produits pharma"],answers:[0,1,2,3],multi:true},
  {q:"Lors de l'empilage de sacs, les couches extérieures doivent être :",options:["Placées dans le sens de la longueur","Placées en croix","Placées horizontalement seulement","Orientées avec les ouvertures vers l'extérieur"],answer:1},
  {q:"Le rayonnage dynamique (gravitaire) permet naturellement le principe :",options:["LIFO","FIFO","FEFO","LOFO"],answer:1},
  {q:"Le stockage au sol en bloc à plat est utilisé pour :",options:["Les petites pièces à forte valeur","Les biens qui ne peuvent pas être empilés","Les liquides en vrac","Les produits réfrigérés"],answer:1},
 ]};

const CHB5 = {id:"cb5",num:5,mod:"B",title:"Protection et conservation des marchandises",icon:"🛡️",color:"#6A1B9A",textColor:"#fff",
 content:[
  {T:"intro",x:"La conservation des marchandises a évolué des méthodes traditionnelles ancestrales vers des technologies modernes de réfrigération, de mise sous vide et de contrôle atmosphérique. Chaque méthode répond à des besoins spécifiques selon la nature du produit."},
  {T:"section",x:"Les méthodes de conservation traditionnelles"},
  {T:"list",items:["SÉCHAGE : une des plus anciennes méthodes pour viande, poisson et fruits. L'eau est éliminée pour empêcher le développement des micro-organismes.","SALAGE : la viande est frottée avec du sel ou de la saumure (eau salée). Le sel absorbe l'eau et crée un milieu hostile aux bactéries.","FUMAGE : exposition à la fumée d'un feu de bois. Les substances de la fumée et la réduction de teneur en eau conservent le produit. Donne aussi un goût fumé (lard, jambon, saucisses).","PASTEURISATION : chauffage à ~70°C en récipient fermé pour tuer la plupart des micro-organismes. Valable jusqu'à ouverture. Utilisée pour le lait, fromage, jus de fruits.","STÉRILISATION : chauffage à 120°C → toutes les bactéries sont tuées, mais aussi la plupart des vitamines."]},
  {T:"section",x:"Les nouvelles méthodes de conservation"},
  {T:"hl",bg:"#ede7f6",b:"#6A1B9A",ti:"Méthodes modernes",x:"RÉFRIGÉRATION : ralentit la multiplication des bactéries (ne les tue pas).\n\nCONGÉLATION : stoppe toute multiplication bactérienne en dessous de -18°C.\n\nMISE SOUS VIDE : évacuation de l'air d'un sac plastique → conserve charcuterie et saucisseries.\n\nATMOSPHÈRE PROTECTRICE : le produit est emballé dans du plastique mais l'air est remplacé par un gaz protecteur → prolonge la durée de conservation.\n\nATMOSPHÈRE CONTRÔLÉE (CA) : pour le stockage de fruits. Température, hygrométrie et composition de l'air maintenus constants. La part d'oxygène est réduite et celle de CO2 augmentée → ralentit la maturation.\n\nSTOCKAGE ULO (Ultra Low Oxygen) : perfectionnement du CA. Teneur en oxygène maintenue très basse → ralentit considérablement la maturation des fruits."},
  {T:"gloss",items:[
    {term:"Pasteurisation",def:"Traitement thermique consistant à chauffer un produit à environ 70°C dans un récipient fermé pour éliminer la plupart des micro-organismes pathogènes. Le produit reste stable jusqu'à son ouverture. Utilisée pour le lait, les jus de fruits, le fromage."},
    {term:"Stérilisation",def:"Traitement thermique à 120°C éliminant TOUTES les bactéries, y compris leurs spores. Les aliments en conserve utilisent ce procédé. Inconvénient : destruction également de la plupart des vitamines."},
    {term:"Atmosphère contrôlée (CA)",def:"Méthode de conservation consistant à maintenir dans un espace de stockage des niveaux précis de température, d'humidité et de composition gazeuse (CO2 élevé, O2 réduit). Utilisée pour conserver les fruits pendant de longues périodes."},
    {term:"Stockage ULO (Ultra Low Oxygen)",def:"Perfectionnement de la méthode CA : la teneur en oxygène est maintenue extrêmement basse (souvent < 1%). Ralentit considérablement la respiration et la maturation des fruits. Permet de conserver des pommes pendant 8 à 12 mois."},
    {term:"Mise sous vide",def:"Technique d'emballage consistant à extraire tout l'air d'un sac plastique avant de le sceller. Sans oxygène, les bactéries aérobies ne peuvent pas se développer. Utilisée pour charcuteries, fromages, saucisses."},
    {term:"Atmosphère protectrice (MAP)",def:"Modified Atmosphere Packaging : le produit est emballé dans un sac plastique avec un gaz protecteur (azote, CO2) remplaçant l'air. Prolonge la durée de conservation. Utilisée pour viandes fraîches, salades en sachet, plats préparés."},
    {term:"Fumage",def:"Conservation par exposition à la fumée d'un bois (hêtre, chêne, genévrier). Les composés chimiques de la fumée ont un effet bactéricide et la réduction de l'humidité inhibe la croissance microbienne. Donne aussi un goût particulier (jambon fumé, saumon fumé)."},
    {term:"Salage / Saumurage",def:"Conservation par application de sel cristallisé ou de saumure (eau fortement salée). Le sel extrait l'eau des tissus (osmose) et crée un milieu où les bactéries ne peuvent pas se développer. L'une des plus anciennes méthodes de conservation."},
  ]},
 ],
 questions:[
  {q:"La pasteurisation chauffe les aliments à environ :",options:["40°C","70°C","100°C","120°C"],answer:1},
  {q:"La stérilisation chauffe les aliments à :",options:["70°C","90°C","120°C","180°C"],answer:2},
  {q:"La méthode ULO (Ultra Low Oxygen) sert à :",options:["Congeler les fruits à très basse température","Maintenir une teneur en oxygène très basse pour ralentir la maturation","Stériliser les fruits par rayonnement UV","Emballer les fruits dans du gaz protecteur uniquement"],answer:1},
  {q:"La mise sous vide conserve particulièrement bien :",options:["Les fruits frais","Les produits laitiers pasteurisés","Les charcuteries et saucisses","Les légumes frais"],answer:2},
  {q:"Dans la méthode CA (Atmosphère Contrôlée), quel gaz est augmenté pour ralentir la maturation ?",options:["L'oxygène (O2)","Le CO2 (dioxyde de carbone)","L'azote (N2)","L'hydrogène (H2)"],answer:1},
  {q:"Le fumage permet de conserver les aliments parce que (plusieurs réponses) :",options:["Les substances de la fumée ont un effet bactéricide","La réduction de teneur en eau inhibe les bactéries","La chaleur stérilise à 120°C","La fumée remplace l'air dans l'emballage"],answers:[0,1],multi:true},
  {q:"La réfrigération (par rapport à la congélation) :",options:["Tue toutes les bactéries","Stoppe définitivement la multiplication bactérienne","Ralentit la multiplication bactérienne sans la stopper","Détruit les vitamines des aliments"],answer:2},
 ]};

const CHB6 = {id:"cb6",num:6,mod:"B",title:"Systèmes de rayonnages et adressage",icon:"🗂️",color:"#0277BD",textColor:"#fff",
 content:[
  {T:"intro",x:"Un système de rayonnage efficace doit optimiser l'espace disponible tout en permettant un accès rapide aux marchandises. L'adressage des emplacements permet de localiser précisément chaque article dans un entrepôt, réduisant le temps de recherche et les erreurs de picking."},
  {T:"section",x:"Le stockage fixe vs aléatoire"},
  {T:"img",src:"/images/modB_img30.png",alt:"Stockage fixe : chaque article a sa place"},
  {T:"hl",bg:"#e3f2fd",b:"#0277BD",ti:"Deux stratégies d'adressage",x:"STOCKAGE FIXE (emplacement attribué) :\n+ Chaque article a sa place définie → facile à trouver\n− Ne permet pas une bonne exploitation de l'espace (la place doit être prévue pour la quantité maximale, même quand le stock est faible)\n\nSTOCKAGE ALÉATOIRE (emplacement variable) :\n+ Optimise l'utilisation de l'espace (on place là où il y a de la place)\n− Nécessite un système informatique (WMS) pour savoir où se trouvent les marchandises\n\nL'exploitation du rayonnage est optimale lorsque chaque article prévu est stocké dans la QUANTITÉ MAXIMALE. La place réservée doit toujours être suffisante pour la quantité maximale."},
  {T:"section",x:"L'adressage des emplacements"},
  {T:"text",x:"Pour trouver rapidement un article dans un entrepôt, on utilise un système d'adressage à plusieurs niveaux : Allée → Colonne → Niveau. Chaque emplacement reçoit une adresse unique (ex : A-03-2 = Allée A, colonne 3, niveau 2)."},
  {T:"section",x:"La palette EPAL — Structure et marquages"},
  {T:"hl",bg:"#fff8e1",b:"#f59e0b",ti:"Composition et marquages de la palette EPAL",x:"Structure d'une palette EPAL :\n• Planches extérieures (supérieures et inférieures)\n• Planches intermédiaires\n• 9 blocs (dont bloc gauche, bloc droit, bloc central)\n• Clous normalisés\n\nMarquages EPAL (avec traitement chaleur selon ISPM 15) :\n• Logo EPAL sur les blocs\n• Indicatif pays-région (ex: DE-BW)\n• Numéro du fournisseur (ex: 4931003)\n• HT DB = Heat Treatment + Debarked\n• Année et mois de fabrication (ex: DB 057-4-06)\n\nMarquage SBB CH (sans traitement thermique) :\n• Numéro du fournisseur\n• Année et mois de fabrication"},
  {T:"section",x:"Les moyens de transport en entrepôt — Classification"},
  {T:"hl",bg:"#e3f2fd",b:"#0277BD",ti:"Classification des moyens de transport internes",x:"Selon le TYPE DE MOUVEMENT :\n• Convoyeur DISCONTINU : déplace les charges de façon intermittente (chariot élévateur)\n• Convoyeur CONTINU : flux constant (tapis roulant, convoyeur à rouleaux)\n\nSelon l'IMPLANTATION :\n• Au sol : chariots, transpalettes, convoyeurs à tapis\n• Suspendu : ponts roulants, portiques, monorails\n\nSelon la DIRECTION :\n• Horizontal (convoyeur à rouleaux)\n• Vertical (monte-charge, élévateur)\n• Horizontal + vertical (chariot élévateur)"},
  {T:"gloss",items:[
    {term:"Adressage des emplacements",def:"Système d'identification unique de chaque emplacement de stockage dans un entrepôt. Format typique : Allée-Colonne-Niveau (ex: A-03-2). Permet de localiser tout article rapidement et précisément."},
    {term:"Stockage fixe",def:"Stratégie dans laquelle chaque article a toujours le même emplacement défini. Avantage : trouver facilement sans système informatique. Inconvénient : l'espace est réservé pour la quantité maximale même quand le stock est faible → mauvaise utilisation de l'espace."},
    {term:"Stockage aléatoire (chaotique)",def:"Stratégie dans laquelle les articles sont placés à n'importe quel emplacement libre. Avantage : utilisation optimale de l'espace. Inconvénient : nécessite obligatoirement un système informatique (WMS) pour savoir où se trouve chaque article."},
    {term:"Palette EPAL",def:"Palette standardisée européenne de 1200×800 mm, composée de 3 planches supérieures, 3 planches inférieures, 5 planches intermédiaires et 9 blocs. Chaque bloc porte le logo EPAL. Réutilisable et échangeable dans tout le réseau européen."},
    {term:"Convoyeur continu",def:"Système de transport en entrepôt assurant un flux constant et ininterrompu de marchandises. Ex : tapis roulant, convoyeur à rouleaux, convoyeur à chaînes. La marchandise 'vient vers' l'opérateur."},
    {term:"Convoyeur discontinu",def:"Système de transport en entrepôt déplaçant les charges de manière intermittente. Ex : chariots élévateurs, transpalettes. L'opérateur 'va vers' la marchandise."},
    {term:"WMS (Warehouse Management System)",def:"Logiciel de gestion d'entrepôt nécessaire pour le stockage aléatoire. Il enregistre la position de chaque article à chaque mouvement et guide l'opérateur vers le bon emplacement lors des opérations de picking et rangement."},
    {term:"ISPM 15",def:"Norme phytosanitaire internationale imposant un traitement des emballages en bois (palettes) pour prévenir la propagation d'organismes nuisibles. Traitement HT (thermique) : chauffage à 56°C pendant 30 min. Marquage obligatoire visible sur les blocs de la palette."},
  ]},
 ],
 questions:[
  {q:"Le stockage fixe se caractérise par :",options:["Chaque article a toujours le même emplacement défini","Les articles sont placés n'importe où","Un système informatique est obligatoire","L'espace est toujours parfaitement optimisé"],answer:0},
  {q:"L'inconvénient du stockage fixe est :",options:["Difficile à trouver sans système informatique","L'espace est mal utilisé (réservé pour quantité max même quand stock est faible)","Les erreurs de picking sont fréquentes","Incompatible avec les palettes EPAL"],answer:1},
  {q:"Une palette EPAL possède combien de blocs ?",options:["6","9","12","15"],answer:1},
  {q:"Un convoyeur CONTINU assure :",options:["Un transport par mouvements intermittents","Un flux constant et ininterrompu de marchandises","Un stockage en hauteur","Un transport vertical uniquement"],answer:1},
  {q:"Le marquage 'HT DB' sur une palette EPAL signifie :",options:["Haute température, débarquement","Heat Treatment (traitement thermique) + Debarked (écorcé)","Homologué Transport, Double Bande","Hauteur Totale, Double Base"],answer:1},
  {q:"L'adressage typique d'un emplacement en entrepôt est :",options:["Numéro de palette-date-heure","Allée-Colonne-Niveau (ex: A-03-2)","Fournisseur-Article-Quantité","Zone-Couleur-Taille"],answer:1},
  {q:"Quel avantage principal présente le stockage aléatoire ?",options:["Facile à trouver sans système informatique","Optimisation de l'utilisation de l'espace","Moins d'erreurs de picking","Compatible uniquement avec le LIFO"],answer:1},
 ]};

const MODULE_B_RAND_POOL = [
  ...CHB1.questions.map(q=>({...q,_ch:"CHB1",_chTitle:"Caractéristiques stockage",_chColor:CHB1.color,_chTextColor:CHB1.textColor})),
  ...CHB2.questions.map(q=>({...q,_ch:"CHB2",_chTitle:"Rôle du stockage",_chColor:CHB2.color,_chTextColor:CHB2.textColor})),
  ...CHB3.questions.map(q=>({...q,_ch:"CHB3",_chTitle:"Genres de stockage",_chColor:CHB3.color,_chTextColor:CHB3.textColor})),
  ...CHB4.questions.map(q=>({...q,_ch:"CHB4",_chTitle:"Formes de stockage",_chColor:CHB4.color,_chTextColor:CHB4.textColor})),
  ...CHB5.questions.map(q=>({...q,_ch:"CHB5",_chTitle:"Conservation",_chColor:CHB5.color,_chTextColor:CHB5.textColor})),
  ...CHB6.questions.map(q=>({...q,_ch:"CHB6",_chTitle:"Rayonnages & adressage",_chColor:CHB6.color,_chTextColor:CHB6.textColor})),
];

const MODULE_B = [CHB1,CHB2,CHB3,CHB4,CHB5,CHB6];

// ═══════════════════════════════════════════════════════════
//  MODULE D — Hygiène, Sécurité & Environnement
// ═══════════════════════════════════════════════════════════

const MODULE_D_META = {id:"D",title:"Module D",subtitle:"Hygiène, Sécurité & Environnement",icon:"🛡️",color:"#C62828",textColor:"#fff",
  desc:"Hygiène, sécurité personnelle, sécurité en entreprise, prévention incendie, sécurité des données et substances dangereuses."};

const CHD1 = {id:"cd1",num:1,mod:"D",title:"L'hygiène",icon:"🧼",color:"#AD1457",textColor:"#fff",
 content:[
  {T:"intro",x:"L'hygiène vient de la déesse grecque Hygieia (santé). Elle désigne littéralement 'l'action saine'. En logistique, l'hygiène est fondamentale pour protéger les marchandises (notamment alimentaires) et les personnes travaillant dans l'entrepôt."},
  {T:"section",x:"L'hygiène personnelle"},
  {T:"list",items:["Soins corporels : hygiène buccale, corporelle et des cheveux","Entretien des vêtements : sous-vêtements changés chaque jour","Vêtements de travail adaptés : 2 fonctions — protéger l'individu de la salissure OU protéger l'objet de travail de la salissure de l'individu","Secteurs à vêtements obligatoires : médicaments, cosmétiques, denrées alimentaires, aliments animaux"]},
  {T:"section",x:"Bactéries et virus — Modes de transmission"},
  {T:"hl",bg:"#fce4ec",b:"#AD1457",ti:"3 voies de transmission des micro-organismes",x:"1. CONTAGION AÉRIENNE : la toux et les éternuements projettent des gouttelettes contenant des microbes. Se couvrir la bouche lors de la toux. Distance minimum : 1 mètre entre personnes.\n\n2. CONTACT PHYSIQUE : transmission par les mains ou contact direct. Notamment les MST. Se laver les mains régulièrement et correctement.\n\n3. CRACHATS : se collent aux chaussures et rentrent dans les bâtiments. Vecteur de contamination des sols."},
  {T:"section",x:"Mesures de prévention"},
  {T:"list",items:["Éviter de rester au sein d'un groupe lors d'épidémie","Se tenir à au moins 1 mètre des autres personnes","Ne pas tousser en direction d'autres personnes","Utiliser des mouchoirs à usage unique","Se laver les mains souvent et correctement","Utiliser des désinfectants appropriés"]},
  {T:"section",x:"L'hygiène d'exploitation en logistique"},
  {T:"hl",bg:"#fce4ec",b:"#AD1457",ti:"Mesures d'hygiène en entrepôt",x:"• Nettoyage régulier des installations et locaux\n• Exclusion des organismes nuisibles (insectes, rongeurs)\n• Séparation physique des marchandises pouvant s'influencer mutuellement\n\nL'exigence de propreté des locaux dépend de leur FONCTION : un entrepôt alimentaire aura des exigences beaucoup plus élevées qu'un entrepôt de matériaux de construction."},
  {T:"section",x:"Prévention des infestations — Lors de la mise en stock"},
  {T:"list",items:["Nettoyer les locaux avant la mise en stock","Stocker en évitant les coins sombres (milieux favorables aux nuisibles)","Entreposer les marchandises sur des palettes (pas à même le sol)","La marchandise elle-même ne doit pas être infestée lors de la mise en stock","Régler la température, l'humidité et la luminosité"]},
  {T:"section",x:"Le concept HACCP"},
  {T:"hl",bg:"#e8f5e9",b:"#2E7D32",ti:"HACCP — Sécurité alimentaire (7 principes)",x:"Hazard Analysis and Critical Control Points = Analyse des dangers et maîtrise des points critiques.\n\nDéveloppé en 1959 pour la NASA. Aujourd'hui obligatoire dans toute la filière alimentaire.\n\nLe concept comprend 7 principes visant à garantir la sécurité des denrées alimentaires et la protection des consommateurs.\n\nBase légale : LDAI (Loi sur les denrées alimentaires) du 9 octobre 1992. S'applique à tous ceux qui fabriquent, traitent, entreposent, transportent et distribuent des denrées alimentaires."},
  {T:"section",x:"Méthodes de lutte contre les nuisibles"},
  {T:"list",items:["Le GAZAGE : traitement chimique des espaces infestés par des gaz toxiques pour les insectes","L'IRRADIATION : exposition à des rayonnements ionisants détruisant les nuisibles sans résidus chimiques"]},
  {T:"gloss",items:[
    {term:"HACCP (Hazard Analysis Critical Control Points)",def:"Système de prévention garantissant la sécurité des denrées alimentaires. Développé en 1959 pour la NASA, il est aujourd'hui obligatoire dans toute la chaîne alimentaire. Il comprend 7 principes d'analyse des risques et de maîtrise des points critiques."},
    {term:"LDAI (Loi sur les Denrées Alimentaires)",def:"Loi suisse du 9 octobre 1992 protégeant les consommateurs. S'applique à tous les acteurs de la chaîne alimentaire : fabricants, transformateurs, entrepositaires, transporteurs et distributeurs."},
    {term:"Hygiène d'exploitation",def:"Ensemble des mesures de propreté et d'organisation dans un entrepôt logistique : nettoyage des locaux et installations, exclusion des nuisibles, séparation des marchandises incompatibles. Le niveau d'exigence dépend de la nature des marchandises stockées."},
    {term:"Contagion aérienne",def:"Transmission de micro-organismes pathogènes par voie aérienne via les gouttelettes projetées lors de la toux, des éternuements ou de la parole. Prévention : distance ≥ 1 mètre, masque, couvrir la bouche."},
    {term:"Gazage",def:"Méthode de lutte contre les nuisibles (insectes, acariens) consistant à traiter un espace fermé avec des gaz insecticides. Efficace mais nécessite une évacuation complète et respecter des délais de sécurité avant réintégration."},
    {term:"Irradiation",def:"Traitement des denrées alimentaires ou des locaux par des rayonnements ionisants (rayons gamma, X) détruisant les micro-organismes, insectes et larves sans laisser de résidus chimiques. Utilisé pour certaines épices et denrées en Suisse."},
    {term:"Hygrométrie (application hygiène)",def:"En hygiène, l'humidité ambiante est un facteur critique. Un taux d'humidité élevé favorise le développement de moisissures et de bactéries sur les denrées alimentaires. Le contrôle de l'hygrométrie est une mesure HACCP essentielle."},
    {term:"Vêtements de travail (hygiène)",def:"Équipements vestimentaires obligatoires dans certains secteurs (alimentaire, pharmaceutique). Remplissent deux fonctions : protéger le travailleur de la salissure OU protéger la marchandise de la contamination par le travailleur."},
  ]},
 ],
 questions:[
  {q:"Que signifie HACCP ?",options:["Haute Autorité de Contrôle et de Certification des Produits","Hazard Analysis and Critical Control Points (analyse des dangers et maîtrise des points critiques)","Hygiène Alimentaire et Contrôle des Conditions de Production","Harmonisation des Aliments et Contrôle des Conditions de Préparation"],answer:1},
  {q:"En quelle année le concept HACCP a-t-il été développé ?",options:["1945","1959","1975","1992"],answer:1},
  {q:"La LDAI (Loi sur les Denrées Alimentaires) s'applique à :",options:["Uniquement aux fabricants","Uniquement aux restaurateurs","À ceux qui fabriquent, traitent, entreposent, transportent et distribuent des denrées alimentaires","Uniquement aux distributeurs finaux"],answer:2},
  {q:"Quelle distance minimum doit-on respecter entre personnes lors d'une épidémie ?",options:["50 cm","1 mètre","2 mètres","3 mètres"],answer:1},
  {q:"Quelles mesures s'appliquent lors de la mise en stock pour prévenir les infestations (plusieurs réponses) ?",options:["Nettoyer les locaux","Stocker en évitant les coins sombres","Entreposer les marchandises sur des palettes","Laisser les portes ouvertes pour l'aération","Vérifier que la marchandise n'est pas infestée"],answers:[0,1,2,4],multi:true},
  {q:"Les deux fonctions des vêtements de travail sont :",options:["Identification et sécurité","Protéger l'individu de la salissure OU protéger l'objet de travail de la salissure de l'individu","Confort et esthétique","Isolation thermique et protection anti-UV"],answer:1},
  {q:"Les méthodes de lutte contre les nuisibles dans les denrées alimentaires incluent (plusieurs réponses) :",options:["Le gazage","L'irradiation","La stérilisation à 120°C","Le séchage","La mise sous vide"],answers:[0,1],multi:true},
  {q:"La transmission par 'contagion aérienne' peut être réduite par (plusieurs réponses) :",options:["Se couvrir la bouche lors de la toux","Respecter une distance d'au moins 1 mètre","Se laver les mains","Porter un masque","Utiliser des mouchoirs à usage unique"],answers:[0,1,2,3,4],multi:true},
 ]};

const CHD2 = {id:"cd2",num:2,mod:"D",title:"La sécurité personnelle",icon:"⛑️",color:"#E65100",textColor:"#fff",
 content:[
  {T:"intro",x:"Près de 80% des accidents du travail sont imputables à un comportement dangereux — donc de la propre responsabilité du travailleur. Comprendre les sources de danger et adopter les bons comportements est la première ligne de défense contre les accidents."},
  {T:"section",x:"Types de dangers"},
  {T:"hl",bg:"#fff8e1",b:"#f59e0b",ti:"Aigus vs Chroniques",x:"Dangers AIGUS : surviennent rapidement et ont un effet immédiat. Ex : chute, choc électrique, coupure.\n\nDangers CHRONIQUES : liés à des choses qui nuisent lentement sur la durée. Ex : bruit permanent, exposition prolongée à des produits chimiques, mauvaise posture répétée.\n\nRÈGLE : 80% des accidents → comportement dangereux (responsabilité personnelle). 20% → situations dangereuses (infrastructures, équipements)."},
  {T:"section",x:"Comportements dangereux"},
  {T:"list",items:["Non-respect des règles ou directives de sécurité","Négligence (précipitation, inattention)","Non-application des mesures de protection (ne pas porter les EPI)","Prise de risque excessive (conscience du risque mais action quand même)"]},
  {T:"section",x:"Protection des différentes parties du corps"},
  {T:"hl",bg:"#fce4ec",b:"#E65100",ti:"EPI par zone du corps en logistique",x:"PIEDS : les chaussures de sécurité (embout en acier) protègent contre les chutes de charges et les écrasements par engins.\n\nDOS : les hernies discales sont fréquentes en logistique. Adopter la bonne posture lors du reconditionnement, préparation de commandes, chargement/déchargement. Éviter de porter des charges lourdes.\n\nMAINS : gants en caoutchouc lors de la manipulation de substances dangereuses.\n\nTÊTE : casque OBLIGATOIRE dans les services de livraison à moto et dans les gares de triage.\n\nYEUX : lunettes de protection lors de travaux avec substances corrosives, risque de projections, contrôle du niveau d'acide des batteries. En cas de projection : rincer immédiatement avec une douche oculaire."},
  {T:"section",x:"L'ergonomie"},
  {T:"text",x:"L'ergonomie traite de l'adaptation des postes de travail et des équipements aux capacités humaines, afin de prévenir la fatigue et les blessures. En logistique, le réglage correct du siège du chariot élévateur est crucial."},
  {T:"hl",bg:"#e8f5e9",b:"#2E7D32",ti:"Avantages d'un siège bien réglé sur chariot élévateur",x:"• Moins de fatigue pour le conducteur\n• Contractures musculaires évitées\n• Vibrations mieux amorties\n• Meilleure vue d'ensemble sur l'environnement\n• Actions rapides possibles dans les situations critiques"},
  {T:"gloss",items:[
    {term:"Danger aigu",def:"Risque se manifestant rapidement et produisant un effet immédiat sur la santé ou la sécurité. Ex : chute d'une palette, choc électrique, coupure avec un outil. Nécessite une réaction immédiate."},
    {term:"Danger chronique",def:"Risque nuisant lentement sur la durée sans effet immédiat visible. Ex : exposition prolongée à des produits chimiques, bruit permanent, mauvaise posture répétée (hernies discales). Les effets apparaissent après des années."},
    {term:"EPI (Équipement de Protection Individuelle)",def:"Équipements portés par le travailleur pour se protéger des risques professionnels. En logistique : chaussures de sécurité, gants, casque, lunettes de protection, gilet fluorescent. Port souvent obligatoire selon le poste."},
    {term:"Hernie discale",def:"Lésion d'un disque intervertébral provoquée par des efforts répétés (port de charges lourdes, mauvaise posture). Très fréquente en logistique. Prévention : posture correcte, aide mécanique pour les lourdes charges."},
    {term:"Douche oculaire",def:"Dispositif de sécurité permettant de rincer abondamment les yeux en cas de projection de substance chimique ou corrosive. Doit être accessible rapidement dans les zones de manipulation de produits dangereux."},
    {term:"Ergonomie",def:"Science de l'adaptation du travail à l'homme. En logistique : conception des postes de picking, réglage des sièges de chariots, hauteur des plans de travail. Objectif : prévenir la fatigue et les TMS (troubles musculo-squelettiques)."},
    {term:"Comportement dangereux",def:"Action humaine augmentant le risque d'accident : non-respect des règles, négligence, omission des EPI, prise de risque délibérée. Responsable de 80% des accidents du travail selon les statistiques."},
  ]},
 ],
 questions:[
  {q:"Quel pourcentage des accidents est imputable au comportement dangereux ?",options:["20%","50%","80%","95%"],answer:2},
  {q:"Que protège une chaussure de sécurité avec embout en acier ?",options:["Contre l'humidité et le glissement uniquement","Contre les chutes de charges et les écrasements par engins sur les pieds","Contre les chocs électriques","Contre les substances corrosives"],answer:1},
  {q:"Le port du casque est obligatoire dans (plusieurs réponses) :",options:["Tous les entrepôts","Les services de livraison à moto","Les gares de triage","Les zones de préparation de commandes","Lors du déchargement de camions"],answers:[1,2],multi:true},
  {q:"En cas de projection d'une substance dans les yeux, il faut :",options:["Frotter les yeux avec un chiffon propre","Fermer les yeux et attendre que la douleur passe","Rincer immédiatement avec une douche oculaire","Appeler d'abord le médecin avant toute action"],answer:2},
  {q:"L'ergonomie vise à :",options:["Augmenter la productivité uniquement","Adapter les postes de travail et équipements aux capacités humaines pour prévenir fatigue et blessures","Réduire les coûts de production","Améliorer l'apparence des postes de travail"],answer:1},
  {q:"Un danger CHRONIQUE est :",options:["Un accident qui survient rapidement","Un risque nuisant lentement sur la durée (bruit, mauvaise posture, exposition chimique)","Une situation d'urgence immédiate","Un danger visible à l'œil nu"],answer:1},
  {q:"Quels comportements sont classés comme dangereux (plusieurs réponses) ?",options:["Non-respect des règles de sécurité","Négligence et précipitation","Port des EPI appropriés","Non-application des mesures de protection","Prise de risque excessive"],answers:[0,1,3,4],multi:true},
 ]};

const CHD3 = {id:"cd3",num:3,mod:"D",title:"La sécurité au travail en entreprise",icon:"🏗️",color:"#37474F",textColor:"#fff",
 content:[
  {T:"intro",x:"La sécurité en entrepôt passe par une organisation rigoureuse des espaces, des procédures claires pour les opérations de chargement/déchargement et une séparation stricte des zones de circulation et de stockage."},
  {T:"section",x:"Séparation des surfaces"},
  {T:"img",src:"/images/modD_img3.png",alt:"Plan d'entrepôt — Zones et points de danger numérotés"},
  {T:"hl",bg:"#f5f5f5",b:"#37474F",ti:"Règles de circulation en entrepôt",x:"• Les surfaces de stockage doivent être CLAIREMENT SÉPARÉES des surfaces de circulation.\n• Voies principales : au moins 120 cm de large\n• Voies secondaires : au moins 80 cm de large\n• Aucune marchandise ne doit empiéter sur les voies de circulation\n• Aucune marchandise ne doit être posée sur les voies de circulation"},
  {T:"section",x:"Points de danger spécifiques"},
  {T:"list",items:["Plate-forme : barrière obligatoire contre la chute","Balance intégrée : ne jamais circuler dessus avec des chariots élévateurs","Salissures : nettoyées aussi vite que possible","Portails et portes : attention à la hauteur des passages","Quais de chargement : risque de chute → ne pas entreposer de marchandises","Rails : circuler lentement à 45° avec les chariots élévateurs","Plate-forme élévatrice : assurer les véhicules avant utilisation","Grilles de regard : résistance limitée → circuler à vitesse réduite","Rampe : la charge doit toujours se trouver EN AMONT (en montée, charge devant)"]},
  {T:"section",x:"Sécurisation des véhicules avant chargement/déchargement"},
  {T:"hl",bg:"#f5f5f5",b:"#37474F",ti:"Procédure de sécurisation — Camions et semi-remorques",x:"CAMIONS : avant toute opération :\n1. Frein de stationnement tiré\n2. Cale ou fixation à la rampe\n\nSEMI-REMORQUES : points 1 et 2 + :\n3. Support déployable\n4. Pile de palettes comme support\n\nWAGONS : sécurisation par personnel qualifié uniquement :\n• Frein à main appliqué\n• Sabot de freinage (cale) mis en place"},
  {T:"section",x:"Tôles de liaison et ponts de chargement"},
  {T:"text",x:"Les tôles de liaison font le lien entre l'entrepôt et le véhicule (camion ou wagon). Elles doivent impérativement :\n• Avoir une capacité de charge suffisante et indiquée\n• Avoir une surface antidérapante\n• Être protégées contre le déplacement"},
  {T:"section",x:"Prescriptions sur les chariots élévateurs (OPA)"},
  {T:"hl",bg:"#fce4ec",b:"#C62828",ti:"Règles OPA pour les chariots élévateurs",x:"L'Ordonnance sur la Prévention des Accidents (OPA) impose :\n• La conduite de chariot est réservée aux MAJEURS, sauf dans le cadre d'une formation (les logisticiens en apprentissage peuvent conduire dès 15 ans).\n• Lors du transport de marchandises : toujours conduire dans le sens du regard.\n• Voies d'évacuation et installations d'extinction incendie : toujours dégagées.\n• Rayonnages : la marchandise doit reposer sur des rayonnages en parfait état et supporter le poids prévu.\n• Goupilles de sécurité : assurent les traverses contre le décrochage involontaire.\n• Grilles arrière : sur les rayonnages simples, une grille sur la face arrière évite la chute d'objets."},
  {T:"gloss",items:[
    {term:"OPA (Ordonnance sur la Prévention des Accidents)",def:"Ordonnance suisse informant les travailleurs sur les dangers professionnels et les mesures à adopter pour les prévenir. Régit notamment l'utilisation des chariots élévateurs (âge minimum, formation requise, règles de conduite)."},
    {term:"Voie de circulation principale",def:"Chemin de circulation en entrepôt emprunté par les chariots élévateurs et piétons. Largeur minimale requise : 120 cm. Doit être totalement dégagée de marchandises en permanence."},
    {term:"Voie de circulation secondaire",def:"Couloir d'accès aux rayonnages en entrepôt. Largeur minimale requise : 80 cm. Doit également rester dégagée de toute marchandise."},
    {term:"Tôle de liaison / Pont de chargement",def:"Dispositif mobile faisant le lien entre le quai de chargement et le plancher du camion ou wagon. Doit avoir une capacité de charge indiquée, une surface antidérapante et être protégée contre tout déplacement involontaire."},
    {term:"Sabot de freinage (cale)",def:"Cale placée sous les roues d'un wagon ou camion pour empêcher tout déplacement involontaire pendant le chargement ou déchargement. Complément obligatoire du frein à main."},
    {term:"Goupille de sécurité",def:"Pièce métallique assurant les traverses d'un rayonnage contre le décrochage involontaire lors du dépôt de palettes par chariot élévateur. Sécurité passive essentielle pour éviter l'effondrement des rayonnages."},
    {term:"Plate-forme élévatrice",def:"Dispositif hydraulique permettant de lever des charges ou des personnes. Charge maximale strictement définie et indiquée. Entretenu et réparé uniquement par des spécialistes. Les véhicules doivent être assurés avant utilisation."},
    {term:"Installation automatique",def:"Zone de l'entrepôt fonctionnant sans présence humaine (convoyeurs automatiques, transstockeurs). Interdite au personnel non formé. Pour y accéder : couper l'interrupteur général et l'assurer avec un cadenas de consignation."},
  ]},
 ],
 questions:[
  {q:"La largeur minimale d'une voie de circulation PRINCIPALE en entrepôt est :",options:["80 cm","100 cm","120 cm","150 cm"],answer:2},
  {q:"La largeur minimale d'une voie de circulation SECONDAIRE est :",options:["50 cm","80 cm","100 cm","120 cm"],answer:1},
  {q:"Sur une rampe, la charge doit toujours se trouver :",options:["En aval (derrière le chariot en montée)","En amont (devant le chariot en montée)","Sur le côté gauche","En bas de la rampe"],answer:1},
  {q:"La conduite de chariot élévateur est permise aux logisticiens en apprentissage dès :",options:["14 ans","15 ans","16 ans","18 ans"],answer:1},
  {q:"Pour sécuriser un camion avant déchargement, il faut (plusieurs réponses) :",options:["Tirer le frein de stationnement","Mettre une cale ou fixation à la rampe","Démonter les roues avant","Attacher le véhicule avec des sangles","Démarrer le moteur en permanence"],answers:[0,1],multi:true},
  {q:"Les tôles de liaison doivent impérativement (plusieurs réponses) :",options:["Avoir une capacité de charge indiquée","Avoir une surface antidérapante","Être protégées contre le déplacement","Être en plastique","Être chauffées en hiver"],answers:[0,1,2],multi:true},
  {q:"Lors du transport avec un chariot élévateur, on doit toujours :",options:["Conduire en marche arrière","Conduire dans le sens du regard","Circuler avec les fourches hautes","Circuler à vitesse maximum"],answer:1},
  {q:"Pour accéder à une installation automatique, il faut :",options:["Porter un casque et entrer rapidement","Couper l'interrupteur général et l'assurer avec un cadenas","Attendre que les machines s'arrêtent seules","Prévenir un collègue et entrer directement"],answer:1},
 ]};

const CHD4 = {id:"cd4",num:4,mod:"D",title:"La prévention contre les incendies",icon:"🔥",color:"#BF360C",textColor:"#fff",
 content:[
  {T:"intro",x:"Les entrepôts présentent un risque considérable d'incendie en raison des grandes quantités de marchandises stockées. La prévention, la détection précoce et la maîtrise des extincteurs adaptés sont des compétences essentielles pour tout logisticien."},
  {T:"section",x:"Prévention des incendies"},
  {T:"list",items:["Interdiction absolue de fumer dans l'entrepôt","Prudence lors des travaux de réparation (soudure, meulage → étincelles)","Maintien des voies d'évacuation toujours dégagées","Respect des limitations de hauteur de stockage sous les sprinklers","Ne jamais stocker sous les têtes de sprinklers"]},
  {T:"section",x:"Dispositifs de détection"},
  {T:"hl",bg:"#fff8e1",b:"#BF360C",ti:"Détecteurs automatiques",x:"Détecteur de FUMÉE : déclenche une alarme en cas de formation de fumée. Détection très précoce — avant les flammes.\n\nDétecteur de CHALEUR : déclenche une alarme dès que la température dépasse 60°C. Adapté aux zones poussiéreuses où les détecteurs de fumée risquent les fausses alarmes."},
  {T:"section",x:"Dispositifs d'extinction automatique"},
  {T:"hl",bg:"#fce4ec",b:"#BF360C",ti:"Sprinklers et installations à gaz",x:"SPRINKLER : canalisation d'eau sous pression. Une tête de sprinkler se déclenche automatiquement à la chaleur (généralement 68°C). Seules les têtes concernées par la chaleur s'ouvrent.\n\nRègles d'utilisation :\n• Ne pas stocker de marchandises sous les têtes de sprinklers\n• Respecter les limitations de hauteur de stockage\n• Ne jamais obstruer les canalisations\n\nINSTALLATION À GAZ (CO2) : éteint le feu en le privant d'oxygène. Efficace pour les feux en zone fermée (archives, locaux électriques). DANGER : le CO2 est asphyxiant pour les humains → évacuation obligatoire."},
  {T:"section",x:"Comportement en cas d'incendie"},
  {T:"hl",bg:"#fce4ec",b:"#BF360C",ti:"Procédure en 3 étapes",x:"1. ALERTER : déclencher l'alarme, appeler le 118 (pompiers) et/ou 144 (ambulance)\n2. SECOURIR : aider les personnes en danger, évacuer les blessés\n3. ÉTEINDRE : utiliser l'extincteur adapté au type de feu — uniquement si c'est sans danger personnel"},
  {T:"section",x:"Les classes de feux"},
  {T:"img",src:"/images/modD_img7.png",alt:"Classes de feux A, B, C, D, F"},
  {T:"hl",bg:"#fff8e1",b:"#BF360C",ti:"5 classes de feux et exemples",x:"Classe A : feux de matières solides formant des braises — Bois, papier, paille, textiles, caoutchouc, houille, matières plastiques.\n\nClasse B : feux de liquides et solides fondants — Essences, huiles, graisses, peintures, cire, goudron, résines.\n\nClasse C : feux de gaz — Acétylène, méthane, propane, butane, gaz naturel, hydrogène.\n\nClasse D : feux de métaux — Aluminium, magnésium, titane, sodium, potassium, calcium, lithium.\n\nClasse F : feux d'huiles et graisses comestibles — Feux de friteuses et fours, huiles et graisses animales/végétales."},
  {T:"section",x:"Les types d'extincteurs"},
  {T:"list",items:["POUDRE : convient aux feux A, B, C. Ne pas utiliser sur matériel électronique.","MOUSSE : feux A et B. Efficace sur les liquides inflammables.","CO2 : feux B et électriques. N'abîme pas le matériel électronique.","EAU traitée avec substance chimique : feux A uniquement."]},
  {T:"gloss",items:[
    {term:"Sprinkler",def:"Tête d'extinction automatique reliée à un réseau d'eau sous pression. Se déclenche automatiquement par fusion d'un élément sensible à la chaleur (ampoule de verre, alliage fusible). Seules les têtes situées au-dessus du foyer s'ouvrent."},
    {term:"Classe A (incendie)",def:"Feux de matières solides formant des braises lors de la combustion : bois, papier, paille, textiles, caoutchouc. Extincteurs adaptés : eau, poudre, mousse."},
    {term:"Classe B (incendie)",def:"Feux de liquides inflammables et de matières solides fondantes : essences, huiles, graisses, solvants, peintures. Extincteurs adaptés : poudre, mousse, CO2."},
    {term:"Classe C (incendie)",def:"Feux de gaz combustibles : propane, butane, gaz naturel, méthane, acétylène, hydrogène. Extincteurs adaptés : poudre. Priorité : couper l'alimentation en gaz."},
    {term:"Classe D (incendie)",def:"Feux de métaux réactifs : aluminium, magnésium, titane, sodium, potassium, lithium. TRÈS DANGEREUX : l'eau réagit explosément avec ces métaux. Extincteurs spéciaux (poudre D) uniquement."},
    {term:"Classe F (incendie)",def:"Feux d'huiles et graisses comestibles (animales et végétales) : feux de friteuses industrielles et fours à cuisson. Les extincteurs classiques sont insuffisants — extincteurs spéciaux classe F requis."},
    {term:"Extincteur CO2",def:"Extincteur contenant du dioxyde de carbone sous pression. Éteint le feu en chassant l'oxygène. Idéal pour les feux de classe B et les feux électriques. N'abîme pas le matériel électronique. Attention : le CO2 est asphyxiant en espace confiné."},
    {term:"Détecteur de fumée",def:"Dispositif de détection précoce des incendies qui déclenche une alarme sonore dès qu'il capte des particules de fumée. Détecte le feu avant l'apparition des flammes. Ne pas installer dans les zones poussiéreuses (risque de fausses alarmes)."},
    {term:"Alerter-Secourir-Éteindre",def:"Procédure en 3 étapes à suivre en cas d'incendie. 1. Alerter : déclencher l'alarme + appeler le 118/144. 2. Secourir : aider et évacuer les personnes en danger. 3. Éteindre : utiliser l'extincteur adapté si sans danger personnel."},
  ]},
 ],
 questions:[
  {q:"Quelles sont les 3 étapes à suivre en cas d'incendie, dans l'ordre ?",options:["Éteindre, alerter, secourir","Alerter, secourir, éteindre","Secourir, éteindre, alerter","Alerter, éteindre, secourir"],answer:1},
  {q:"Le détecteur de chaleur se déclenche à partir de :",options:["40°C","60°C","90°C","120°C"],answer:1},
  {q:"La classe de feu B correspond aux feux de :",options:["Matières solides (bois, papier)","Liquides inflammables (essences, huiles, graisses)","Gaz (propane, butane)","Métaux (aluminium, magnésium)"],answer:1},
  {q:"L'extincteur CO2 est particulièrement recommandé pour :",options:["Les feux de classe A (bois, papier)","Les feux de gaz uniquement","Les feux de classe B et les feux électriques (sans dégâts matériels)","Les feux de métaux"],answer:2},
  {q:"Les feux de classe D (métaux) sont particulièrement dangereux car :",options:["Ils produisent beaucoup de fumée","L'eau réagit explosément avec ces métaux","Ils s'éteignent difficillement avec la poudre","Ils durent très longtemps"],answer:1},
  {q:"Les règles d'utilisation des sprinklers incluent (plusieurs réponses) :",options:["Ne pas stocker sous les têtes de sprinklers","Respecter les limitations de hauteur de stockage","Peindre les têtes pour les protéger","Ne jamais obstruer les canalisations","Stocker au maximum à 50 cm des têtes"],answers:[0,1,3],multi:true},
  {q:"La classe de feu A comprend (plusieurs réponses) :",options:["Bois","Papier","Textiles","Essences","Propane"],answers:[0,1,2],multi:true},
  {q:"Quel extincteur ne doit PAS être utilisé sur du matériel électronique ?",options:["CO2","Poudre","Eau traitée","Mousse"],answer:1},
 ]};

const CHD5 = {id:"cd5",num:5,mod:"D",title:"La sécurité de l'entreprise",icon:"🔐",color:"#1B4F8A",textColor:"#fff",
 content:[
  {T:"intro",x:"La sécurité en entreprise dépasse la simple protection physique des marchandises. Elle englobe le contrôle des accès, la protection des données numériques, le respect des secrets professionnels et le comportement en cas d'agression."},
  {T:"section",x:"Les autorisations d'accès"},
  {T:"list",items:["Contrôle rigoureux des personnes accédant aux locaux de l'entrepôt","En cas de perte de clé ou de badge : avertir IMMÉDIATEMENT l'employeur","Visiteurs : accompagnés en permanence dans les zones sécurisées","Badge perdu non retrouvé : changement du système d'accès nécessaire"]},
  {T:"section",x:"Les 3 secrets à respecter"},
  {T:"hl",bg:"#e3f2fd",b:"#1B4F8A",ti:"Secret privé, postal et professionnel",x:"SECRET PRIVÉ : s'applique à ceux qui prennent connaissance du contenu de correspondances fermées qui ne leur sont pas destinées. Violation punissable d'une amende.\n\nSECRET POSTAL : protège le contenu d'un envoi, son expéditeur et son destinataire. Le logisticien chargé de la distribution ne doit pas divulguer qui reçoit du courrier, des AP (avis de passage) ou des AJ (avis de jonction).\n\nSECRET PROFESSIONNEL : tous les collaborateurs doivent garder les secrets de l'entreprise (clients, fournisseurs, procédés, informations stratégiques). Violation pouvant entraîner une dénonciation pénale par l'employeur."},
  {T:"section",x:"Protection des données"},
  {T:"hl",bg:"#e3f2fd",b:"#1B4F8A",ti:"Sécurité informatique en entreprise",x:"• Les données de l'entreprise sont primordiales — les protéger est une obligation\n• PHISHING : méfiance envers les emails et liens suspects demandant des données\n• ANTIVIRUS et PARE-FEU : obligatoires sur tous les ordinateurs de l'entreprise\n• Mots de passe robustes et régulièrement changés\n• Ne jamais ouvrir de pièces jointes suspectes\n• Ne jamais communiquer ses données d'accès"},
  {T:"section",x:"Comportement en cas d'agression"},
  {T:"list",items:["Ne pas perdre son sang-froid — agir avec discernement","Rester poli et calme","Éviter les mouvements brusques","Ne pas provoquer l'agresseur","Mémoriser les détails de l'agresseur (description physique)","Alerter les secours dès que possible"]},
  {T:"gloss",items:[
    {term:"Secret postal",def:"Obligation légale du logisticien de ne pas divulguer les informations sur les envois qu'il manipule : identité des expéditeurs, des destinataires, contenu des envois. Violation pénalement sanctionnée."},
    {term:"Secret professionnel",def:"Obligation de tout employé de ne pas divulguer les informations confidentielles de son employeur (clients, contrats, procédés de fabrication, données financières). Violation pouvant entraîner des poursuites pénales."},
    {term:"Secret privé",def:"Protection de la correspondance privée d'autrui. Prendre connaissance du contenu d'une correspondance fermée qui ne vous est pas destinée est illégal et punissable d'une amende en Suisse."},
    {term:"Phishing",def:"Technique d'arnaque informatique consistant à usurper l'identité d'un organisme (banque, administrations, fournisseur) pour inciter la victime à communiquer ses données confidentielles (mots de passe, numéros de carte bancaire)."},
    {term:"Pare-feu (Firewall)",def:"Système de sécurité informatique filtrant le trafic réseau entrant et sortant selon des règles prédéfinies. Protège le système d'information de l'entreprise contre les intrusions externes et les cyberattaques."},
    {term:"Badge d'accès",def:"Carte électronique permettant d'accéder à des zones sécurisées d'un bâtiment. En cas de perte, l'employeur doit être averti IMMÉDIATEMENT pour désactiver le badge perdu et éviter une intrusion non autorisée."},
    {term:"AP (Avis de Passage) / AJ (Avis de Jonction)",def:"Documents postaux laissés par le facteur en cas d'absence du destinataire. Le secret postal impose au logisticien de ne pas divulguer à des tiers quels clients reçoivent ce type de documents."},
  ]},
 ],
 questions:[
  {q:"En cas de perte de clé ou de badge d'accès, que doit-on faire ?",options:["Continuer à travailler et attendre de le retrouver","Avertir IMMÉDIATEMENT l'employeur","Signaler le lendemain matin","Demander un duplicata à ses collègues"],answer:1},
  {q:"Le secret postal interdit au logisticien de :",options:["Lire les journaux pendant le travail","Divulguer qui reçoit du courrier, des AP ou des AJ","Ouvrir des colis endommagés","Communiquer avec les fournisseurs"],answer:1},
  {q:"Le phishing est :",options:["Un logiciel antivirus","Une technique d'arnaque usurpant une identité pour obtenir des données confidentielles","Un système de contrôle d'accès","Un protocole de sécurité réseau"],answer:1},
  {q:"Le secret professionnel oblige les collaborateurs à :",options:["Partager les informations avec toute l'équipe","Garder les secrets de l'entreprise (clients, procédés, informations stratégiques)","Communiquer ouvertement avec la concurrence","Publier les résultats de l'entreprise"],answer:1},
  {q:"En cas d'agression, il faut (plusieurs réponses) :",options:["Rester calme et poli","Ne pas perdre son sang-froid","Éviter les mouvements brusques","Provoquer l'agresseur pour le faire fuir","Mémoriser les détails de l'agresseur"],answers:[0,1,2,4],multi:true},
  {q:"Les mesures de sécurité informatique en entreprise incluent (plusieurs réponses) :",options:["Installer un antivirus","Utiliser un pare-feu","Communiquer ses mots de passe à ses collègues","Ne pas ouvrir les pièces jointes suspectes","Changer régulièrement ses mots de passe"],answers:[0,1,3,4],multi:true},
  {q:"Le secret privé protège :",options:["Les données informatiques de l'entreprise","La correspondance fermée d'autrui que l'on ne doit pas lire","Les informations sur les fournisseurs","Les données clients"],answer:1},
 ]};

const CHD6 = {id:"cd6",num:6,mod:"D",title:"Les substances dangereuses et l'environnement",icon:"☢️",color:"#2E7D32",textColor:"#fff",
 content:[
  {T:"intro",x:"La gestion des substances dangereuses et la protection de l'environnement sont des responsabilités légales et éthiques du logisticien. La Suisse dispose d'un cadre légal complet basé sur la Constitution fédérale."},
  {T:"section",x:"La dangerosité des substances"},
  {T:"text",x:"La dangerosité d'une substance est relative : c'est LA DOSE QUI FAIT LE POISON. Une substance est définie comme dangereuse lorsqu'elle a, même en faible quantité, un impact négatif sur la faune, la flore ou l'homme."},
  {T:"section",x:"L'utilisation sûre des produits chimiques"},
  {T:"hl",bg:"#e8f5e9",b:"#2E7D32",ti:"3 étapes de gestion sécurisée",x:"À L'ACHAT :\n• Tenir compte des symboles de danger GHS\n• Lire les avertissements de sécurité\n• Vérifier l'existence de solutions alternatives moins nocives\n• N'acheter que l'essentiel (minimum nécessaire)\n\nÀ L'UTILISATION :\n• Suivre la notice d'utilisation\n• Respecter les consignes de sécurité\n• Porter les EPI adéquats\n• Ne pas laisser sans surveillance\n\nAU STOCKAGE :\n• Conserver dans un endroit sûr, hors de portée des enfants\n• Ne jamais transvaser dans des récipients alimentaires\n• Respecter les consignes d'élimination\n• Prévoir des mesures structurelles (coupe-feu, réservoirs de rétention)\n• Avoir un plan d'urgence (feu ou avarie)"},
  {T:"section",x:"En cas d'intoxication ou d'accident"},
  {T:"hl",bg:"#fce4ec",b:"#C62828",ti:"Numéros d'urgence",x:"• Appeler le 145 : Centre antipoison suisse (Tox)\n• Appeler le 144 : Ambulance"},
  {T:"section",x:"La législation environnementale suisse"},
  {T:"hl",bg:"#e8f5e9",b:"#2E7D32",ti:"Hiérarchie des lois et 5 principes de la LPE",x:"La Constitution fédérale constitue la base de toutes les lois suisses.\n\nLPE (Loi sur la Protection de l'Environnement) :\n• Protection de l'air, de l'eau, du sol\n• Gestion des déchets\n• Protection contre le bruit et les catastrophes\n\n5 principes de la LPE :\n1. CAUSALITÉ : celui qui cause des nuisances supporte les frais\n2. PRÉCAUTION : éviter qu'une charge environnementale arrive\n3. PRÉVENTION À LA SOURCE : limiter les émissions dès leur origine\n4. COOPÉRATION : autorités, économie et population coopèrent\n5. SOLUTION APPROPRIÉE : solutions guidées par la raison (ex : recyclage)"},
  {T:"section",x:"Les ordonnances d'application"},
  {T:"list",items:["OPair : Ordonnance sur la protection de l'air","ODS : Ordonnance sur les mouvements de déchets spéciaux","OPB : Ordonnance sur la protection contre le bruit","OTD : Ordonnance sur le traitement des déchets","LChim : Loi sur les produits chimiques — mouvements des produits chimiques et toxiques"]},
  {T:"section",x:"Organisations de recyclage en Suisse"},
  {T:"img",src:"/images/modD_img16.png",alt:"Organisations suisses de recyclage"},
  {T:"list",items:["Kompost Forum Schweiz — Compostage de matières végétales","IGORA — Recyclage des canettes en aluminium","PET-Recycling Schweiz — Collecte des bouteilles PET (depuis 1990)","INOBAT — Élimination des piles (coopérative)","Altpapier.ch — Recyclage du papier et carton","FERRO — Recyclage du fer blanc (boîtes de conserve, depuis 1987)","Vetrorecycling — Recyclage du verre usagé (filiale de Vetropack)","SENS — Élimination des appareils électriques","SWICO — Recyclage des appareils électroniques","SLRS — Recyclage des lampes et luminaires"]},
  {T:"gloss",items:[
    {term:"LPE (Loi sur la Protection de l'Environnement)",def:"Loi suisse visant à protéger les humains, animaux et plantes contre les nuisances environnementales. Couvre la pollution atmosphérique, le bruit, les déchets, la protection du sol. Basée sur 5 principes : causalité, précaution, prévention à la source, coopération, solution appropriée."},
    {term:"Principe de causalité",def:"Principe de la LPE selon lequel celui qui est à l'origine d'une charge environnementale doit supporter les frais de sa prévention ou de son élimination. 'Pollueur-payeur'."},
    {term:"Principe de précaution",def:"Principe de la LPE visant à éviter qu'une charge environnementale se produise, même en l'absence de certitude scientifique sur le risque. Agir avant qu'un problème survienne."},
    {term:"LChim (Loi sur les produits chimiques)",def:"Loi suisse régissant les mouvements, l'utilisation, le stockage et l'élimination des produits chimiques et toxiques. Impose des règles strictes d'étiquetage (GHS) et de traçabilité."},
    {term:"Centre antipoison (145)",def:"Service médical d'urgence suisse joignable 24h/24 au numéro 145. Fournit des conseils immédiats en cas d'intoxication par des produits chimiques, médicaments ou substances dangereuses."},
    {term:"ODS (Ordonnance sur les mouvements de déchets spéciaux)",def:"Ordonnance suisse réglementant le transport, le traitement et l'élimination des déchets spéciaux (solvants, huiles usagées, produits chimiques). Impose un suivi documenté de bout en bout."},
    {term:"SWICO / SENS",def:"Deux organisations suisses gérant le recyclage des appareils électroniques (SWICO) et électriques (SENS). Financées par les consommateurs via une avance à l'élimination perçue lors de l'achat."},
    {term:"Réservoir de rétention",def:"Bassin ou espace étanche placé sous des cuves ou réservoirs de produits chimiques liquides. En cas de fuite, le liquide est retenu et ne peut pas polluer le sol ou les eaux souterraines."},
  ]},
 ],
 questions:[
  {q:"En cas d'intoxication par une substance chimique, quel numéro appelle-t-on ?",options:["117 (police)","118 (pompiers)","144 (ambulance) ET 145 (centre antipoison)","112 (urgences européennes)"],answer:2},
  {q:"Le numéro du Centre antipoison suisse (Tox) est :",options:["118","144","145","117"],answer:2},
  {q:"Le principe de 'causalité' de la LPE signifie :",options:["L'État paie pour la dépollution","Celui qui cause des nuisances supporte les frais (pollueur-payeur)","Les entreprises coopèrent avec les autorités","La prévention est prioritaire sur la réparation"],answer:1},
  {q:"La LChim régit :",options:["Uniquement l'achat de produits chimiques","Les mouvements, utilisation, stockage et élimination des produits chimiques et toxiques","Uniquement les substances radioactives","Les normes d'emballage des produits chimiques"],answer:1},
  {q:"Les 5 principes de la LPE sont (plusieurs réponses) :",options:["Causalité","Précaution","Prévention à la source","Coopération","Solution appropriée","Économie circulaire"],answers:[0,1,2,3,4],multi:true},
  {q:"PET-Recycling Schweiz collecte les bouteilles PET depuis :",options:["1975","1985","1990","2000"],answer:2},
  {q:"Lors du stockage de produits chimiques, que faut-il ÉVITER absolument ?",options:["Porter les EPI adéquats","Transvaser dans des récipients alimentaires","Lire la notice d'utilisation","Avoir un plan d'urgence"],answer:1},
  {q:"L'organisation IGORA se charge du recyclage de :",options:["Les piles et accumulateurs","Le papier et carton","Les canettes en aluminium","Les appareils électroniques"],answer:2},
 ]};

const MODULE_D_RAND_POOL = [
  ...CHD1.questions.map(q=>({...q,_ch:"CHD1",_chTitle:"Hygiène",_chColor:CHD1.color,_chTextColor:CHD1.textColor})),
  ...CHD2.questions.map(q=>({...q,_ch:"CHD2",_chTitle:"Sécurité personnelle",_chColor:CHD2.color,_chTextColor:CHD2.textColor})),
  ...CHD3.questions.map(q=>({...q,_ch:"CHD3",_chTitle:"Sécurité en entreprise",_chColor:CHD3.color,_chTextColor:CHD3.textColor})),
  ...CHD4.questions.map(q=>({...q,_ch:"CHD4",_chTitle:"Prévention incendies",_chColor:CHD4.color,_chTextColor:CHD4.textColor})),
  ...CHD5.questions.map(q=>({...q,_ch:"CHD5",_chTitle:"Sécurité entreprise",_chColor:CHD5.color,_chTextColor:CHD5.textColor})),
  ...CHD6.questions.map(q=>({...q,_ch:"CHD6",_chTitle:"Substances dangereuses",_chColor:CHD6.color,_chTextColor:CHD6.textColor})),
];

const MODULE_D = [CHD1,CHD2,CHD3,CHD4,CHD5,CHD6];

// ═══════════════════════════════════════════════════════════
//  MODULE E — Histoire, Logistique, Qualité & Communication
// ═══════════════════════════════════════════════════════════

const MODULE_E_META = {id:"E",title:"Module E",subtitle:"Histoire, Qualité & Communication",icon:"📡",color:"#6A1B9A",textColor:"#fff",
  desc:"Histoire de la logistique, bases de la logistique, contrôles qualité, service clients, communication et marketing."};

const CHE1 = {id:"ce1",num:1,mod:"E",title:"L'histoire de la logistique",icon:"📜",color:"#4527A0",textColor:"#fff",
 content:[
  {T:"intro",x:"La logistique est aussi ancienne que l'humanité. Des premières provisions de l'âge de pierre aux conteneurs ISO modernes, elle a accompagné chaque étape du développement humain et économique."},
  {T:"section",x:"Les origines du terme logistique"},
  {T:"hl",bg:"#ede7f6",b:"#4527A0",ti:"Étymologie de 'Logistique'",x:"• Lego (grec) = penser\n• Logica (latin) = raison, raisonnement\n• Logistas (grec) = distributeur de vivres (intendant militaire)\n\nLes premiers chariots élévateurs et palettes en bois sont arrivés en Europe en 1944 lors du débarquement en Normandie."},
  {T:"section",x:"Chronologie du développement"},
  {T:"hl",bg:"#ede7f6",b:"#4527A0",ti:"Grandes étapes de l'histoire logistique",x:"Âge de pierre : premiers stocks de nourriture pour survivre aux hivers.\nAntiquité : troc du surplus entre communautés. Venise = voie commerciale européenne majeure. Route de la soie : de la Chine au Proche-Orient.\n1944 : arrivée des chariots élévateurs et palettes en Europe (débarquement Normandie).\n1980 : le concept JUSTE-À-TEMPS (livraison au moment requis) révolutionne la logistique → réduction des stocks.\n1990 : l'informatique améliore le contrôle, la coordination et l'organisation des flux.\n2001 (21e siècle) : mondialisation renforcée, téléphone portable indispensable dans la logistique."},
  {T:"section",x:"Le développement en Suisse"},
  {T:"hl",bg:"#f3e5f5",b:"#7B1FA2",ti:"Chronologie suisse",x:"1230 : ouverture du col du Gothard au trafic commercial.\n1615 : début de la Poste suisse.\n1842 : Bâle → Milan en seulement 50 heures (révolution du transport).\n1898 : les chemins de fer suisses deviennent les CFF (Chemins de Fer Fédéraux).\n1980 : inauguration du tunnel routier du Gothard.\n1998 : les PTT (Poste, Téléphone, Télégraphe) sont scindées en La Poste et Swisscom.\n2007 : NLFA — Nouvelles Lignes Ferroviaires à travers les Alpes (tunnel du Gothard et du Lötschberg)."},
  {T:"section",x:"La mondialisation"},
  {T:"text",x:"La mondialisation a profondément transformé la logistique. Les fruits et légumes sont disponibles toute l'année grâce aux importations mondiales. L'information est instantanée et la connexion mondiale."},
  {T:"hl",bg:"#ede7f6",b:"#4527A0",ti:"Impacts de la mondialisation",x:"Pour les entreprises : régie par des contrats internationaux → OMC (Organisation Mondiale du Commerce).\n\nCôté emploi : suppression de postes dans les pays industrialisés. Les entreprises se DÉLOCALISENT dans des pays à bas salaires (Make or Buy) pour réduire les coûts de fabrication.\n\nPour la logistique : des normes et systèmes internationaux sont mis en place (conteneurs ISO) pour satisfaire les exigences clients dans le monde entier."},
  {T:"gloss",items:[
    {term:"Logistas",def:"Terme grec désignant l'intendant militaire chargé de la distribution des vivres aux armées. C'est l'une des origines étymologiques du mot 'logistique'. La logistique militaire (ravitaillement des troupes) est l'ancêtre de la logistique commerciale moderne."},
    {term:"Juste-à-temps (JAT / JIT)",def:"Méthode de gestion des flux introduite dans les années 1980 (Toyota), visant à livrer les marchandises EXACTEMENT au moment où elles sont nécessaires, ni avant ni après. Objectif : minimiser les stocks et leurs coûts."},
    {term:"Mondialisation",def:"Processus d'intégration des économies mondiales par le développement des échanges commerciaux, des communications et des flux financiers à l'échelle planétaire. En logistique : développement du transport maritime, des conteneurs ISO et des chaînes d'approvisionnement mondiales."},
    {term:"OMC (Organisation Mondiale du Commerce)",def:"Organisation internationale régissant les règles du commerce international entre pays membres. Objectif : réduire les barrières commerciales et promouvoir le libre-échange. Influence directement les flux logistiques mondiaux."},
    {term:"NLFA (Nouvelles Lignes Ferroviaires à travers les Alpes)",def:"Grand projet ferroviaire suisse comprenant le tunnel de base du Gothard (57 km, inauguré 2016 — le plus long au monde) et le tunnel de base du Lötschberg. Améliore considérablement le transit ferroviaire transalpin."},
    {term:"PTT (Poste, Téléphone, Télégraphe)",def:"Ancienne entreprise publique suisse gérant simultanément les services postaux et les télécommunications. Scindée en 1998 en deux entités distinctes : La Poste SA (services postaux) et Swisscom AG (télécommunications)."},
    {term:"Route de la soie",def:"Réseau de routes commerciales reliant la Chine à l'Europe via l'Asie centrale et le Proche-Orient. Utilisée depuis l'Antiquité pour le commerce des épices, soieries et métaux précieux. Modèle historique des chaînes logistiques mondiales."},
    {term:"Délocalisation",def:"Transfert d'activités de production d'un pays à coût de main d'œuvre élevé vers un pays à coût plus bas. Phénomène lié à la mondialisation et à la logique Make or Buy. Impacte directement les flux logistiques mondiaux."},
  ]},
 ],
 questions:[
  {q:"En quelle année les premiers chariots élévateurs et palettes sont-ils arrivés en Europe ?",options:["1939","1941","1944","1950"],answer:2},
  {q:"Quel terme grec désignait le 'distributeur de vivres' dans l'Antiquité ?",options:["Lego","Logica","Logistas","Logistikos"],answer:2},
  {q:"En quelle année le tunnel routier du Gothard a-t-il été inauguré ?",options:["1972","1975","1980","1985"],answer:2},
  {q:"En quelle année les PTT suisses ont-elles été scindées en La Poste et Swisscom ?",options:["1990","1995","1998","2000"],answer:2},
  {q:"Le concept 'Juste-à-temps' (JAT) vise à :",options:["Augmenter les stocks de sécurité","Livrer les marchandises exactement au moment requis pour minimiser les stocks","Accélérer la production en continu","Réduire le nombre de fournisseurs"],answer:1},
  {q:"Les NLFA comprennent (plusieurs réponses) :",options:["Le tunnel de base du Gothard","Le tunnel de base du Lötschberg","Le tunnel du Simplon","Le tunnel du Grand Saint-Bernard"],answers:[0,1],multi:true},
  {q:"L'ouverture du col du Gothard au trafic commercial date de :",options:["1000","1230","1450","1615"],answer:1},
  {q:"La mondialisation implique en logistique (plusieurs réponses) :",options:["La normalisation des conteneurs ISO","Des chaînes d'approvisionnement mondiales","La délocalisation vers les pays à bas salaires","La suppression totale des frontières douanières","La disparition des entreprises locales"],answers:[0,1,2],multi:true},
 ]};

const CHE2 = {id:"ce2",num:2,mod:"E",title:"Les bases de la logistique",icon:"⚙️",color:"#1565C0",textColor:"#fff",
 content:[
  {T:"intro",x:"La logistique moderne va bien au-delà du simple transport. Elle planifie, organise et contrôle l'ensemble des flux de matériaux et d'informations, de l'approvisionnement à l'élimination des déchets."},
  {T:"section",x:"Définition officielle"},
  {T:"hl",bg:"#e3f2fd",b:"#1565C0",ti:"Définition de la logistique",x:"La logistique planifie, organise et contrôle le flux de matériaux, de l'approvisionnement à la distribution jusqu'à l'élimination des marchandises, avec toutes les informations afférentes."},
  {T:"section",x:"La chaîne logistique — 4 domaines"},
  {T:"list",items:["APPROVISIONNEMENT : les acheteurs recherchent les marchandises avec le meilleur rapport qualité-prix et négocient les conditions de livraison avec les fournisseurs.","PRODUCTION : transformation des matières premières et produits semi-finis en produits finis.","DISTRIBUTION : acheminement des marchandises de l'expéditeur au destinataire.","ÉLIMINATION DES DÉCHETS : tri, recyclage ou incinération des déchets générés par les activités."]},
  {T:"section",x:"Les fonctions de la chaîne logistique"},
  {T:"hl",bg:"#e3f2fd",b:"#1565C0",ti:"Transport, transbordement, stockage",x:"TRANSPORT : amener des marchandises d'un point A à un point B par route, rail, eau ou air.\n\nCritères de choix du moyen de transport :\n• Le prix\n• La sécurité\n• La rapidité\n• L'efficacité\n• Les critères écologiques (de plus en plus importants)\n\nTRANSBORDEMENT ET STOCKAGE : les marchandises sont déchargées, entreposées et rechargées pour continuer leur acheminement."},
  {T:"section",x:"Les 3 niveaux logistiques"},
  {T:"hl",bg:"#e3f2fd",b:"#1565C0",ti:"Micro, Méta et Macro logistique",x:"MICRO-LOGISTIQUE : logistique à l'intérieur d'une seule entreprise (gestion des flux internes).\n\nMÉTA-LOGISTIQUE : logistique inter-entreprises (entre fournisseurs, sous-traitants, clients).\n\nMACRO-LOGISTIQUE : logistique au niveau mondial (systèmes de transport internationaux, conteneurs ISO)."},
  {T:"section",x:"Spécialisation des entreprises logistiques"},
  {T:"text",x:"Pour garantir l'efficacité et des prix compétitifs, les entreprises de logistique se spécialisent dans un seul domaine. Cela leur permet de disposer d'équipements optimaux et de collaborateurs hautement qualifiés dans leur domaine."},
  {T:"gloss",items:[
    {term:"Chaîne logistique (Supply Chain)",def:"Ensemble des étapes et des acteurs impliqués dans la création et la livraison d'un produit : approvisionnement en matières premières → production → stockage → distribution → client final. Optimiser la chaîne logistique réduit les coûts et améliore la satisfaction client."},
    {term:"Micro-logistique",def:"Logistique gérée à l'intérieur d'une seule entreprise : mouvements internes de marchandises entre ateliers, entre l'entrepôt et la production, entre les quais de réception et d'expédition."},
    {term:"Méta-logistique",def:"Logistique organisée entre plusieurs entreprises partenaires : flux de marchandises et d'informations entre fournisseurs, sous-traitants, transporteurs et clients. Nécessite une coordination étroite et des systèmes d'information compatibles."},
    {term:"Macro-logistique",def:"Logistique à l'échelle mondiale : systèmes de transport internationaux, ports, aéroports, conteneurs ISO, réseaux ferroviaires transnationaux. Gérée par des organisations internationales (OMI, OACI, OMC)."},
    {term:"Flux de matériaux",def:"Mouvement physique des marchandises tout au long de la chaîne logistique : de la matière première jusqu'au client final. Accompagné par un flux d'informations correspondant (bons de commande, factures, documents de transport)."},
    {term:"Flux d'informations",def:"Ensemble des données accompagnant les flux de matériaux : commandes, confirmations, factures, documents de transport, traçabilité. En logistique moderne, les flux d'informations précèdent et suivent les flux physiques."},
    {term:"Critères de choix du transport",def:"Facteurs déterminant le mode de transport optimal : prix (coût total), sécurité (risque de dommage), rapidité (délai de livraison), efficacité (taux de remplissage) et critères écologiques (empreinte carbone). L'importance des critères varie selon la marchandise."},
  ]},
 ],
 questions:[
  {q:"La définition officielle de la logistique inclut (plusieurs réponses) :",options:["Planification","Organisation","Contrôle du flux de matériaux","Gestion des flux d'informations","Fabrication des produits"],answers:[0,1,2,3],multi:true},
  {q:"Quels sont les 4 domaines de la chaîne logistique ?",options:["Transport, stockage, distribution, vente","Approvisionnement, production, distribution, élimination des déchets","Achat, fabrication, emballage, livraison","Import, export, stockage, vente"],answer:1},
  {q:"La MÉTA-logistique est :",options:["La logistique interne à une entreprise","La logistique inter-entreprises (entre fournisseurs, sous-traitants, clients)","La logistique mondiale","La logistique informatisée"],answer:1},
  {q:"La MACRO-logistique opère à l'échelle :",options:["D'un atelier","D'une entreprise","De plusieurs entreprises partenaires","Mondiale (transport international, conteneurs ISO)"],answer:3},
  {q:"Les critères de choix du moyen de transport incluent (plusieurs réponses) :",options:["Le prix","La sécurité","La rapidité","L'efficacité","Les critères écologiques"],answers:[0,1,2,3,4],multi:true},
  {q:"Pourquoi les entreprises logistiques se spécialisent-elles dans un seul domaine ?",options:["Pour limiter leur responsabilité légale","Pour garantir l'efficacité, des prix compétitifs et disposer d'équipements et collaborateurs optimaux","Pour éviter la concurrence","Pour réduire le nombre de clients"],answer:1},
  {q:"La MICRO-logistique gère :",options:["Les flux entre plusieurs entreprises","La logistique au niveau mondial","Les flux internes à une seule entreprise","Les transports internationaux"],answer:2},
 ]};

const CHE3 = {id:"ce3",num:3,mod:"E",title:"Les contrôles de la qualité",icon:"✅",color:"#2E7D32",textColor:"#fff",
 content:[
  {T:"intro",x:"L'assurance qualité (AQ) garantit une qualité constante des produits. Elle est particulièrement critique dans les secteurs alimentaire, pharmaceutique et aéronautique. Les techniques de contrôle vont du contrôle complet au contrôle par sondage selon la fiabilité du fournisseur."},
  {T:"section",x:"Définition de l'assurance qualité"},
  {T:"text",x:"L'assurance qualité désigne toutes les mesures visant à garantir une qualité constante des produits ou prestations. Elle est indispensable dans l'agroalimentaire, le pharmaceutique et l'industrie aéronautique."},
  {T:"section",x:"Le prélèvement d'échantillons"},
  {T:"hl",bg:"#e8f5e9",b:"#2E7D32",ti:"Règles de l'échantillonnage",x:"Pour contrôler les propriétés des matériaux (composition chimique, dureté, couleur, épaisseur), on prélève des échantillons lors de l'arrivage.\n\nÉtiquetage 100% fiable de l'échantillon : Nom du produit, désignation, n° article, quantité, date.\n\nMaintien AQ (stock Assurance Qualité) : Les livraisons dont on prélève un échantillon ne doivent PAS être stockées ni mises à disposition avant le résultat du contrôle."},
  {T:"section",x:"Les 3 techniques de contrôle"},
  {T:"hl",bg:"#e8f5e9",b:"#2E7D32",ti:"Contrôle complet, par sondage et de fonctionnement",x:"1. CONTRÔLE COMPLET : toutes les pièces contrôlées une à une. Coûteux en temps et argent. Justifié pour : première commande chez un nouveau fournisseur, vices constatés antérieurement, marchandises très chères ou critiques pour la sécurité.\n\n2. CONTRÔLE PAR SONDAGE : si le fournisseur est fiable, on contrôle un échantillon représentatif. Peut être supprimé si le fournisseur utilise ISO.\n• Sondage simple : contrôler une fois sur deux ou ouvrir 2 cartons\n• Sondage multiple : plusieurs contrôles successifs (voir graphique)\n\n3. CONTRÔLE DE FONCTIONNEMENT : vérifier que le produit fonctionne correctement pour empêcher la vente d'articles défectueux."},
  {T:"section",x:"Le contrôle par sondage multiple — Graphique"},
  {T:"img",src:"/images/modE_img4.png",alt:"Contrôle par sondage multiple — Graphique"},
  {T:"hl",bg:"#e8f5e9",b:"#2E7D32",ti:"Exemple de contrôle par sondage multiple (niveau 0,65)",x:"Niveau de qualité 0,65 | Lot de 1000 pièces | Contrôles de 30 pièces chacun :\n\n1er contrôle : 30 pièces → 1 non-conforme → Total défauts : 1 → Continuer !\n2ème contrôle : 30 pièces → 0 non-conforme → Total défauts : 1 → Continuer !\n3ème contrôle : 30 pièces → 1 non-conforme → Total défauts : 2 → Continuer !\n4ème contrôle : 30 pièces → 1 non-conforme → Total défauts : 3 → Continuer !\n5ème contrôle : 30 pièces → 0 non-conforme → Total défauts : 3 → ACCEPTER !\n\nTotal examiné : 150 pièces | Non-conformes : 3 → LOT ACCEPTÉ\n\nLe graphique montre 3 zones : Refuser (haut) / Continuer le contrôle (milieu) / Accepter (bas)"},
  {T:"gloss",items:[
    {term:"Assurance Qualité (AQ)",def:"Ensemble des mesures organisationnelles, techniques et documentaires visant à garantir qu'un produit ou service respecte en permanence des critères de qualité définis. Distincte du contrôle qualité : l'AQ est préventive, le CQ est curatif."},
    {term:"Contrôle complet",def:"Vérification de chaque pièce d'un lot de marchandises. Garantit une qualité maximale mais est très coûteux en temps et en ressources. Justifié lors de la première commande chez un nouveau fournisseur ou pour les marchandises critiques."},
    {term:"Contrôle par sondage (simple)",def:"Contrôle d'un échantillon représentatif d'un lot. Exemples : contrôle une fois sur deux, ouverture de 2 cartons sur 10. Applicable quand le fournisseur a fait ses preuves. Moins coûteux que le contrôle complet."},
    {term:"Contrôle par sondage multiple",def:"Technique de contrôle par étapes successives avec décision à chaque étape (accepter / continuer / refuser) selon le nombre cumulé de défauts. Référence à un tableau ou graphique prédéfini selon le niveau de qualité attendu."},
    {term:"Stock Assurance Qualité (AQ)",def:"Zone de stockage réservée aux marchandises en attente de résultat de contrôle qualité. Ces marchandises ne peuvent PAS être utilisées, vendues ou expédiées tant que le contrôle n'est pas terminé et le résultat positif."},
    {term:"Contrôle de fonctionnement",def:"Vérification du bon fonctionnement d'un produit (appareil électronique, outil, mécanisme). Objectif : empêcher la vente ou l'expédition de marchandises défectueuses. Nécessaire pour les produits techniques et électroniques."},
    {term:"Niveau de qualité",def:"Taux maximal de pièces non conformes accepté dans un lot. Ex : niveau 0,65 signifie que sur 1000 pièces, au maximum 6 à 7 peuvent être non conformes. Détermine la rigueur du contrôle à appliquer."},
    {term:"Certification ISO",def:"Certification internationale attestant qu'une entreprise applique un système de management de la qualité conforme aux normes ISO (ex : ISO 9001). Un fournisseur certifié ISO peut être dispensé de contrôle à la réception chez son client."},
  ]},
 ],
 questions:[
  {q:"Le contrôle complet est justifié dans les cas suivants (plusieurs réponses) :",options:["Première commande chez un nouveau fournisseur","Vices constatés dans des envois antérieurs","Fournisseur certifié ISO","Marchandises très chères","La qualité est critique pour l'entreprise"],answers:[0,1,3,4],multi:true},
  {q:"Un stock 'Assurance Qualité' signifie que la marchandise :",options:["Est de la meilleure qualité disponible","Ne peut pas être utilisée ou vendue avant le résultat du contrôle","A déjà été contrôlée et approuvée","Est réservée aux clients premium"],answer:1},
  {q:"Un fournisseur certifié ISO peut bénéficier de :",options:["Tarifs préférentiels","Livraisons prioritaires","Suppression des contrôles à la réception","Contrats garantis sur 5 ans"],answer:2},
  {q:"L'étiquetage d'un échantillon doit contenir (plusieurs réponses) :",options:["Nom du produit","Désignation et n° article","Quantité et date de prélèvement","Le nom du contrôleur","Le prix de l'article"],answers:[0,1,2],multi:true},
  {q:"Le contrôle de fonctionnement sert à :",options:["Mesurer le poids des marchandises","Vérifier que le produit fonctionne correctement pour éviter la vente de défectueux","Contrôler la conformité des emballages","Vérifier les dates de péremption"],answer:1},
  {q:"Le contrôle par sondage multiple permet de :",options:["Contrôler toutes les pièces d'un lot","Décider à chaque étape (accepter/continuer/refuser) selon les défauts cumulés","Contrôler uniquement le premier carton reçu","Remplacer l'assurance qualité"],answer:1},
  {q:"Dans l'exemple du graphique, un lot de 1000 pièces au niveau 0,65, après 150 pièces contrôlées avec 3 défauts est :",options:["Refusé","Accepté","À contrôler encore","À renvoyer au fournisseur"],answer:1},
 ]};

const CHE4 = {id:"ce4",num:4,mod:"E",title:"Le service clients dans l'entreprise",icon:"🤝",color:"#00695C",textColor:"#fff",
 content:[
  {T:"intro",x:"Un bon service clients permet de se démarquer de la concurrence et de fidéliser les clients. En logistique, chaque collaborateur contribue à la qualité du service par ses actions quotidiennes — de la ponctualité à la présentation soignée."},
  {T:"section",x:"Les désirs et attentes des clients"},
  {T:"hl",bg:"#e0f7fa",b:"#00695C",ti:"Désirs vs Attentes",x:"DÉSIRS : souhaits parfois irréalistes ou non réalisables — le client rêve.\n\nATTENTES : plus concrètes que les désirs. On attend : un service aimable, de bons conseils, un grand choix, un rapport qualité-prix correct.\n\nCes attentes sont influencées par :\n• La publicité reçue\n• Le degré de notoriété de l'entreprise\n• L'image perçue du fournisseur"},
  {T:"section",x:"Un bon service clients vise à"},
  {T:"list",items:["Proposer au client une offre de qualité adaptée à ses besoins","S'acquitter des prestations promises (délais, qualité, prix)","Éliminer immédiatement et simplement les erreurs et défauts","Aborder les demandes des clients avec indulgence et professionnalisme"]},
  {T:"section",x:"Contribution du logisticien au service clients"},
  {T:"hl",bg:"#e0f7fa",b:"#00695C",ti:"L'esprit d'équipe — Règle de base",x:"'Une chaîne n'est solide que par son maillon le plus faible.' Chaque collaborateur contribue au succès de l'entreprise.\n\nLe logisticien contribue à un bon service clients en :\n• Représentant son entreprise de manière compétente et aimable\n• Étant attentionné et serviable envers les clients\n• Étant ponctuel et travaillant avec sérieux\n• Ayant une apparence propre et soignée\n• Étant poli et prévenant à l'égard des clients"},
  {T:"section",x:"Critères de qualité des produits et services"},
  {T:"hl",bg:"#e0f7fa",b:"#00695C",ti:"Qualité produit vs Qualité de service logistique",x:"QUALITÉ DES PRODUITS :\n• Bon fonctionnement\n• Aspect et finition\n• Fraîcheur et efficacité\n• Durée de vie\n• Impact sur l'environnement\n\nQUALITÉ DU SERVICE LOGISTIQUE :\n• Emballage impeccable\n• Stockage optimal\n• Capacité de livraison élevée\n• Transport sans dommage\n• Livraison ponctuelle et correcte\n\n'La qualité, c'est quand le client revient, et non le produit.'"},
  {T:"section",x:"L'habillement professionnel (Dresscode)"},
  {T:"list",items:["Underdressed : tenue trop décontractée pour le contexte","Overdressed : tenue trop formelle pour le contexte","Uniforme : exigé lorsque les collaborateurs sont en contact direct avec les clients","Tenues inappropriées (inscriptions racistes, sexistes, violentes) : interdites dans le monde professionnel","Les employeurs ont le droit d'exiger une tenue vestimentaire spécifique"]},
  {T:"gloss",items:[
    {term:"Service clients",def:"Ensemble des prestations et comportements visant à satisfaire les clients avant, pendant et après l'achat ou la livraison. Facteur de différenciation concurrentielle majeur. En logistique : ponctualité, emballage impeccable, livraison sans dommage."},
    {term:"Attentes vs Désirs",def:"Les désirs sont des souhaits parfois irréalistes. Les attentes sont plus concrètes et raisonnables : service aimable, bons conseils, rapport qualité-prix correct. L'entreprise doit impérativement répondre aux attentes; les désirs sont optionnels."},
    {term:"Esprit d'équipe",def:"Capacité d'un groupe à travailler efficacement ensemble vers un objectif commun. En logistique : chaque collaborateur (du préparateur de commandes au livreur) est un maillon essentiel de la chaîne de service. Le maillon le plus faible détermine la qualité globale."},
    {term:"Dresscode",def:"Code vestimentaire adapté à un contexte professionnel ou social. 'Underdressed' = trop décontracté. 'Overdressed' = trop formel. En logistique, une tenue propre et adaptée reflète le professionnalisme de l'entreprise."},
    {term:"Critères de qualité logistique",def:"Indicateurs mesurant la qualité du service logistique : emballage impeccable, stockage optimal, capacité de livraison élevée, transport sans dommage, livraison ponctuelle. Ces critères sont mesurés via des KPI."},
    {term:"Fidélisation client",def:"Stratégie visant à transformer des clients satisfaits en clients réguliers. En logistique : un service fiable, ponctuel et sans dommage fidélise naturellement les clients. 'La qualité, c'est quand le client revient, et non le produit.'"},
    {term:"Réclamation client",def:"Expression formelle d'une insatisfaction par un client. En logistique : dommage lors de la livraison, retard, erreur de commande. Bien traitée, une réclamation est une opportunité d'amélioration et de fidélisation."},
  ]},
 ],
 questions:[
  {q:"La formule 'La qualité, c'est quand _____ revient, et non ______' se complète par :",options:["le produit / le client","le client / le produit","le fournisseur / la marchandise","la commande / le livreur"],answer:1},
  {q:"La règle 'Une chaîne n'est solide que par son maillon le plus faible' signifie en logistique :",options:["Les chaînes d'arrimage doivent être vérifiées régulièrement","Chaque collaborateur contribue à la qualité du service — le moins bon définit la qualité globale","Les palettes doivent être cerclées avec des chaînes","Les camions ne doivent pas transporter plus que leur charge maximale"],answer:1},
  {q:"Les critères de qualité du service logistique incluent (plusieurs réponses) :",options:["Emballage impeccable","Transport sans dommage","Livraison ponctuelle","Capacité de livraison élevée","Couleur du véhicule de livraison"],answers:[0,1,2,3],multi:true},
  {q:"Un logisticien 'Underdressed' signifie qu'il porte :",options:["Une tenue trop formelle","Une tenue trop décontractée pour le contexte professionnel","Un uniforme d'entreprise","Une tenue de protection EPI"],answer:1},
  {q:"Quelles attentes les clients ont-ils généralement (plusieurs réponses) ?",options:["Un service aimable","De bons conseils","Un grand choix","Un rapport qualité-prix correct","Des prix toujours les plus bas du marché"],answers:[0,1,2,3],multi:true},
  {q:"Quelle est la différence entre un désir et une attente client ?",options:["Les désirs sont réalisables, les attentes sont irréalistes","Les attentes sont plus concrètes et raisonnables que les désirs","Il n'y a aucune différence","Les désirs concernent le produit, les attentes le service"],answer:1},
  {q:"Un bon service clients en logistique implique (plusieurs réponses) :",options:["Ponctualité","Apparence soignée","Compétence et amabilité","Sérieux dans le travail","Ignorance des réclamations"],answers:[0,1,2,3],multi:true},
 ]};

const CHE5 = {id:"ce5",num:5,mod:"E",title:"La communication",icon:"💬",color:"#37474F",textColor:"#fff",
 content:[
  {T:"intro",x:"La communication est le fondement de toute relation professionnelle. En logistique, savoir s'exprimer correctement avec les clients, collègues et fournisseurs — oralement et par écrit — est une compétence essentielle."},
  {T:"section",x:"Communication verbale et non verbale"},
  {T:"img",src:"/images/modE_img7.png",alt:"Signaux non verbaux positifs"},
  {T:"img",src:"/images/modE_img8.png",alt:"Signaux non verbaux négatifs"},
  {T:"hl",bg:"#f5f5f5",b:"#37474F",ti:"Les deux dimensions de la communication",x:"COMMUNICATION VERBALE : la parole et le contenu du message. Influencée par :\n• Niveau sonore (fort ou bas)\n• Tonalité (détendue, brusque, menaçante)\n• Débit (lent, rapide, précipité)\n• Intonation (monotone ou accentuée)\n→ 'La façon de s'exprimer est souvent plus importante que le contenu.'\n\nCOMMUNICATION NON VERBALE : signaux corporels accompagnant la voix :\n• Regard ouvert, expression du visage → intérêt et volonté de dialogue\n• Hochement de tête affirmatif → compréhension ou entente\n• Froncement des sourcils → incompréhension ou mécontentement\n• Croisement des bras → défense\n• Se détourner → désintérêt\n• Attitude rigide → tension\n• Se balancer d'un pied sur l'autre → impatience\n• Tête dans les mains → réflexion ou ennui"},
  {T:"section",x:"Les types de questions"},
  {T:"hl",bg:"#f5f5f5",b:"#37474F",ti:"6 types de questions",x:"Questions FERMÉES : réponse par oui ou non uniquement.\n\nQuestions OUVERTES : réponse détaillée attendue — elles commencent par 'Comment', 'Pourquoi', 'Que', 'Qui'.\n\nQuestions à CHOIX MULTIPLE : une ou plusieurs options proposées dans la question (ex : 'Thé ou café ?').\n\nQuestions SUGGESTIVES : orientent la réponse vers une opinion précise → manipulatoires.\n\nQuestions de CONTRÔLE : demande de précision pour confirmer les faits.\n\nQuestions MIROIR : répondre à une question par une question."},
  {T:"section",x:"Les obstacles de la communication"},
  {T:"list",items:["'Tout le monde peut prétendre ça' — invalide l'interlocuteur","'Qui a bien pu te raconter ça' — remet en doute la source","Ces formules signalent un désintérêt et bloquent la communication"]},
  {T:"section",x:"La réclamation — Procédure"},
  {T:"hl",bg:"#f5f5f5",b:"#37474F",ti:"Réclamation orale et par écrit",x:"RÉCLAMATION ORALE :\n• Maîtriser ses émotions\n• Décrire précisément le motif\n• Créer une ambiance de bonne conversation\n• Identifier le problème clairement\n• Ne pas formuler d'exigences excessives\n• Fixer des objectifs réalistes\n\nRÉCLAMATION PAR ÉCRIT : respecter les règles de correspondance commerciale :\n• Objet précis\n• Formule de politesse\n• Texte avec résumé de la situation\n• Exigence ou proposition de règlement\n• Délai pour la résolution\n• Salutation et signature\n• Identification claire de l'auteur"},
  {T:"gloss",items:[
    {term:"Communication verbale",def:"Échange d'informations par la parole et le contenu des mots. En communication professionnelle : le ton, le débit et l'intonation peuvent être plus importants que le contenu lui-même."},
    {term:"Communication non verbale",def:"Ensemble des signaux corporels involontaires ou volontaires accompagnant la parole : expression du visage, posture, gestes, regard. Ces signaux peuvent contredire ou renforcer le message verbal."},
    {term:"Question ouverte",def:"Question formulée de façon à obtenir une réponse détaillée de l'interlocuteur. Commence par : Comment, Pourquoi, Que, Qui, Quand, Où. Favorise la communication et permet d'approfondir un sujet."},
    {term:"Question fermée",def:"Question ne permettant qu'une réponse par oui ou non. Utile pour confirmer des points précis mais ne favorise pas le dialogue approfondi."},
    {term:"Question suggestive",def:"Question orientant la personne vers une réponse préconçue. Ex : 'Vous êtes d'accord que ce produit est excellent, n'est-ce pas ?' Technique de manipulation — à éviter en communication professionnelle éthique."},
    {term:"Question miroir",def:"Technique consistant à répondre à une question par une question, renvoyant la réflexion à l'interlocuteur. Utile pour faire préciser la pensée ou pour gagner du temps dans une négociation."},
    {term:"Écoute active",def:"Technique d'écoute consistant à signaler à l'interlocuteur qu'on le comprend et qu'on l'encourage à continuer. Inclut : hochements de tête, reformulations, questions de clarification. Favorise une communication de qualité."},
    {term:"Réclamation",def:"Expression formelle d'une insatisfaction client. Doit être traitée avec professionnalisme. Une réclamation bien traitée renforce la relation client et permet à l'entreprise de s'améliorer."},
  ]},
 ],
 questions:[
  {q:"La communication non verbale inclut (plusieurs réponses) :",options:["L'expression du visage","La posture et les gestes","Le croisement des bras","Le contenu des mots","Le hochement de tête"],answers:[0,1,2,4],multi:true},
  {q:"Une question 'ouverte' est :",options:["Une question dont la réponse est oui ou non","Une question dont la réponse est à choix multiple","Une question amenant l'interlocuteur à donner une réponse détaillée","Une question sans bonne réponse"],answer:2},
  {q:"Une question 'suggestive' :",options:["Encourage l'interlocuteur à parler librement","Oriente la réponse vers une opinion préconçue — technique manipulatoire","Demande une précision factuelle","Renvoie la question à l'interlocuteur"],answer:1},
  {q:"Une réclamation par écrit doit comporter (plusieurs réponses) :",options:["Un objet précis","Un résumé de la situation","Une exigence ou proposition de règlement","Un délai pour la résolution","La couleur préférée du client"],answers:[0,1,2,3],multi:true},
  {q:"Lors d'une réclamation orale, il faut (plusieurs réponses) :",options:["Maîtriser ses émotions","Décrire précisément le motif","Formuler des exigences excessives pour obtenir plus","Créer une ambiance de dialogue","Identifier clairement le problème"],answers:[0,1,3,4],multi:true},
  {q:"'La façon de s'exprimer est souvent plus importante que le contenu' signifie :",options:["Le contenu du message n'a aucune importance","Le ton, le débit et l'intonation influencent plus fortement la réception du message que les mots seuls","Il faut toujours parler fort pour être entendu","La communication écrite est toujours préférable à l'orale"],answer:1},
  {q:"Le hochement de tête affirmatif lors d'une conversation signifie :",options:["Défense ou résistance","Compréhension ou entente","Impatience","Désintérêt"],answer:1},
 ]};

const CHE6 = {id:"ce6",num:6,mod:"E",title:"Le marketing",icon:"📈",color:"#0277BD",textColor:"#fff",
 content:[
  {T:"intro",x:"Le marketing vise à produire ce que les clients sont prêts à acheter, en quantité vendable. Il englobe tous les secteurs de l'entreprise et utilise les 4P comme cadre stratégique fondamental."},
  {T:"section",x:"Objectifs du marketing"},
  {T:"list",items:["Garantir ou augmenter sa part de marché","Améliorer sa notoriété (être connu)","Ancrer une image positive sur le marché","Fidéliser les clients existants"]},
  {T:"section",x:"L'offre et la demande"},
  {T:"hl",bg:"#e3f2fd",b:"#0277BD",ti:"Mécanisme des prix",x:"• Le prix MONTE quand l'OFFRE est plus petite que la DEMANDE\n• Le prix BAISSE quand l'OFFRE est plus grande que la DEMANDE"},
  {T:"section",x:"Les 3 types de marchés"},
  {T:"hl",bg:"#e3f2fd",b:"#0277BD",ti:"Marché ouvert, limité et fermé",x:"MARCHÉ OUVERT : libre concurrence — tout le monde peut proposer ou acheter des biens ou services.\n\nMARCHÉ LIMITÉ : l'accès est conditionné par : licences, brevets, preuves d'aptitude, preuves de fonds.\n\nMARCHÉ FERMÉ : monopole exclusif → l'entreprise bénéficie du droit exclusif de proposer un produit ou service. Obligation de garantir l'approvisionnement de toute la population."},
  {T:"section",x:"La taille d'un marché"},
  {T:"hl",bg:"#e3f2fd",b:"#0277BD",ti:"Potentiel, volume et part de marché",x:"POTENTIEL DE MARCHÉ : tous les clients qui POURRAIENT acheter un produit ou service (marché théorique).\n\nVOLUME DE MARCHÉ : nombre de clients qui ACHÈTENT effectivement ce produit ou service.\n\nPART DE MARCHÉ : la part d'une entreprise dans le volume de marché (= chiffre d'affaires de l'entreprise / volume total du marché)."},
  {T:"section",x:"Les 4P du Marketing Mix"},
  {T:"hl",bg:"#e3f2fd",b:"#0277BD",ti:"Les 4 instruments marketing",x:"PRODUCT (Produit) : utilité, qualité, design, assortiment, emballage.\n\nPRICE (Prix) : niveau de prix, rabais, actions promotionnelles, conditions de paiement.\n\nPLACE (Distribution) : où proposer le produit, groupe cible, canaux de vente, disponibilité à la livraison.\n\nPROMOTION (Publicité) : mesures publicitaires, promotion des ventes, présentation."},
  {T:"section",x:"La publicité"},
  {T:"list",items:["Canaux : support écrit, audiovisuels, contact personnel, échantillons","Publicité INFORMATIVE : met en avant les caractéristiques du produit","Publicité SUGGESTIVE : suscite des émotions chez le spectateur","Publicité EN LIGNE : e-mail, bannières publicitaires, content AD","Une bonne publicité : originale, honnête (vante uniquement les caractéristiques réelles)"]},
  {T:"gloss",items:[
    {term:"Marketing Mix (4P)",def:"Cadre stratégique des 4P : Product (produit), Price (prix), Place (distribution), Promotion (publicité). Définit comment une entreprise positionne et commercialise ses produits sur un marché."},
    {term:"Potentiel de marché",def:"Nombre total de clients qui pourraient théoriquement acheter un produit ou service, qu'ils le fassent déjà ou non. Représente le marché théorique maximal accessible."},
    {term:"Volume de marché",def:"Nombre de clients qui achètent effectivement un produit ou service sur une période donnée. Inférieur ou égal au potentiel de marché. Mesure la demande réelle."},
    {term:"Part de marché",def:"Pourcentage du volume de marché total détenu par une entreprise spécifique. Calcul : Chiffre d'affaires de l'entreprise / Volume total du marché × 100. Indicateur clé de la position concurrentielle."},
    {term:"Marché fermé (monopole)",def:"Marché sur lequel une seule entreprise a le droit exclusif de proposer un produit ou service. En contrepartie, le monopoleur a l'obligation d'assurer l'approvisionnement de toute la population à des conditions équitables."},
    {term:"Publicité informative",def:"Type de publicité mettant objectivement en avant les caractéristiques, fonctionnalités et avantages d'un produit. Vise à informer et convaincre par la raison. Doit correspondre à la réalité du produit."},
    {term:"Publicité suggestive",def:"Type de publicité visant à susciter des émotions positives associées à un produit ou une marque. Utilise des images, de la musique, des situations inspirantes. Cible les émotions plutôt que la raison."},
    {term:"Notoriété",def:"Degré de connaissance d'une marque ou d'une entreprise par le public cible. La notoriété spontanée mesure le % de personnes citant la marque spontanément. La notoriété assistée mesure la reconnaissance quand on la nomme."},
  ]},
 ],
 questions:[
  {q:"Les 4P du marketing mix sont :",options:["Prix, Produit, Promotion, Publicité","Produit, Prix, Place, Promotion","Produit, Partenaire, Prix, Publicité","Place, Production, Prix, Plan"],answer:1},
  {q:"Le potentiel de marché représente :",options:["Le chiffre d'affaires actuel","Tous les clients qui pourraient théoriquement acheter le produit","Le nombre de clients actuels","La part de marché de l'entreprise"],answer:1},
  {q:"Le prix monte quand :",options:["L'offre est plus grande que la demande","L'offre est plus petite que la demande","Le marketing est inefficace","Les coûts de production augmentent"],answer:1},
  {q:"Un marché 'fermé' (monopole) oblige l'entreprise à :",options:["Vendre au prix le plus élevé possible","Garantir l'approvisionnement de toute la population à des conditions équitables","N'accepter que certains clients","Pratiquer des prix libres sans réglementation"],answer:1},
  {q:"La 'Place' dans les 4P concerne :",options:["La publicité en ligne","Le niveau de prix et les rabais","Les canaux de vente et la distribution du produit","La qualité et le design du produit"],answer:2},
  {q:"Une bonne publicité doit (plusieurs réponses) :",options:["Être originale","Correspondre à la réalité du produit","Promettre plus que le produit n'offre","Vanter uniquement les caractéristiques réelles","Être économiquement justifiée"],answers:[0,1,3,4],multi:true},
  {q:"Un marché 'limité' nécessite pour y accéder (plusieurs réponses) :",options:["Des licences","Des brevets","Des preuves d'aptitude","Des preuves de fonds","Simplement l'envie d'y participer"],answers:[0,1,2,3],multi:true},
 ]};

const MODULE_E_RAND_POOL = [
  ...CHE1.questions.map(q=>({...q,_ch:"CHE1",_chTitle:"Histoire logistique",_chColor:CHE1.color,_chTextColor:CHE1.textColor})),
  ...CHE2.questions.map(q=>({...q,_ch:"CHE2",_chTitle:"Bases de la logistique",_chColor:CHE2.color,_chTextColor:CHE2.textColor})),
  ...CHE3.questions.map(q=>({...q,_ch:"CHE3",_chTitle:"Contrôles qualité",_chColor:CHE3.color,_chTextColor:CHE3.textColor})),
  ...CHE4.questions.map(q=>({...q,_ch:"CHE4",_chTitle:"Service clients",_chColor:CHE4.color,_chTextColor:CHE4.textColor})),
  ...CHE5.questions.map(q=>({...q,_ch:"CHE5",_chTitle:"Communication",_chColor:CHE5.color,_chTextColor:CHE5.textColor})),
  ...CHE6.questions.map(q=>({...q,_ch:"CHE6",_chTitle:"Marketing",_chColor:CHE6.color,_chTextColor:CHE6.textColor})),
];

const MODULE_E = [CHE1,CHE2,CHE3,CHE4,CHE5,CHE6];

// ─── APP v7 — Navigation multi-modules A/B/C/D/E ────────────────────────────


// ─── UTILITY ─────────────────────────────────────────────────────────────────
const ProgressBar = ({ value, max, color }) => (
  <div style={{background:"#e5e7eb",borderRadius:"99px",height:"7px",overflow:"hidden",flex:1}}>
    <div style={{background:color,width:`${Math.min(100,Math.round((value/max)*100))}%`,height:"100%",borderRadius:"99px",transition:"width 0.4s"}}/>
  </div>
);

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

// ─── MODULE REGISTRY ─────────────────────────────────────────────────────────
const MODULE_REGISTRY = {
  A: { meta:MODULE_A_META, chapters:MODULE_A, randPool:MODULE_A_RAND_POOL, randNb:40 },
  B: { meta:MODULE_B_META, chapters:MODULE_B, randPool:MODULE_B_RAND_POOL, randNb:40 },
  C: { meta:{id:"C",title:"Module C",subtitle:"Logistique La Poste Suisse",icon:"✉️",color:"#0277BD",textColor:"#fff",desc:"Distribution, marché postal, emballages, expédition, Track & Trace, transport et planification."}, chapters:MODULE_C, randPool:MODULE_C.flatMap(ch=>ch.questions.map(q=>({...q,_ch:ch.id,_chTitle:ch.title,_chColor:ch.color,_chTextColor:ch.textColor}))), randNb:40 },
  D: { meta:MODULE_D_META, chapters:MODULE_D, randPool:MODULE_D_RAND_POOL, randNb:40 },
  E: { meta:MODULE_E_META, chapters:MODULE_E, randPool:MODULE_E_RAND_POOL, randNb:40 },
};

// ─── CONTENT BLOCK RENDERER ──────────────────────────────────────────────────
function renderBlock(block, idx) {
  switch (block.T) {
    case "intro": return <div key={idx} style={{background:"#eff6ff",borderLeft:"4px solid #1B4F8A",borderRadius:"0 8px 8px 0",padding:"14px 17px",marginBottom:"14px",fontSize:"15px",color:"#1e3a5f",lineHeight:1.75,fontWeight:"500"}}>{block.x}</div>;
    case "section": return <h3 key={idx} style={{fontSize:"16px",fontWeight:"800",color:"#111",margin:"18px 0 8px",borderBottom:"2px solid #e5e7eb",paddingBottom:"5px"}}>{block.x}</h3>;
    case "text": return <p key={idx} style={{fontSize:"15px",color:"#374151",lineHeight:1.8,marginBottom:"10px"}}>{block.x}</p>;
    case "list": return <ul key={idx} style={{margin:"0 0 11px",paddingLeft:"17px"}}>{block.items.map((item,i)=><li key={i} style={{fontSize:"14px",color:"#374151",lineHeight:1.75,marginBottom:"6px"}}>{item}</li>)}</ul>;
    case "hl": return (
      <div key={idx} style={{background:block.bg,border:`1px solid ${block.b}`,borderRadius:"9px",padding:"11px 14px",marginBottom:"11px"}}>
        <div style={{fontWeight:"800",fontSize:"13px",color:block.b,marginBottom:"6px"}}>💡 {block.ti}</div>
        <div style={{fontSize:"14px",color:"#374151",lineHeight:1.75,whiteSpace:"pre-line"}}>{block.x}</div>
      </div>);
    case "svg": return <div key={idx} style={{marginBottom:"12px",borderRadius:"9px",overflow:"hidden"}} dangerouslySetInnerHTML={{__html:block.code}}/>;
    case "gloss": return (
      <div key={idx} style={{background:"linear-gradient(135deg,#f0f9ff,#e0f2fe)",border:"1px solid #7dd3fc",borderRadius:"10px",padding:"13px 15px",marginBottom:"12px"}}>
        <div style={{fontWeight:"800",fontSize:"15px",color:"#0369a1",marginBottom:"10px",display:"flex",alignItems:"center",gap:"8px"}}>
          <span style={{fontSize:"22px"}}>📚</span> GLOSSAIRE DU CHAPITRE
        </div>
        {block.items.map((item,i)=>(
          <div key={i} style={{marginBottom:i<block.items.length-1?"9px":0,padding:"8px 11px",background:"rgba(255,255,255,0.75)",borderRadius:"7px",borderLeft:"3px solid #0ea5e9"}}>
            <div style={{fontWeight:"800",fontSize:"14px",color:"#0c4a6e"}}>{item.term}</div>
            <div style={{fontSize:"13.5px",color:"#374151",lineHeight:1.7,marginTop:"4px"}}>{item.def}</div>
          </div>))}
      </div>);
    case "img": return (
      <div key={idx} style={{marginBottom:"14px",borderRadius:"10px",overflow:"hidden",border:"1px solid #e5e7eb",background:"#f8fafc"}}>
        <img src={block.src} alt={block.alt} style={{width:"100%",display:"block",borderRadius:"10px 10px 0 0"}}/>
        <div style={{padding:"7px 11px",fontSize:"13px",color:"#6b7280",fontStyle:"italic",lineHeight:1.4}}>📷 {block.alt}</div>
      </div>);
    default: return null;
  }
}

// ─── CHAPTER VIEW (universal — works for all modules) ────────────────────────
function ChapterView({ chapter, view, onViewChange, scores, onSaveScore }) {
  const ch = chapter;
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [multiSel, setMultiSel] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [quizDone, setQuizDone] = useState(false);

  // When chapter changes, reset quiz state
  useEffect(()=>{ setCurrentQ(0); setAnswers([]); setSelected(null); setMultiSel([]); setRevealed(false); setQuizDone(false); }, [ch.id]);

  const startQuiz = () => { setCurrentQ(0); setAnswers([]); setSelected(null); setMultiSel([]); setRevealed(false); setQuizDone(false); onViewChange("quiz"); };

  const q = view === "quiz" ? ch.questions[currentQ] : null;
  const isMulti = q && q.multi === true;

  function calcScore(ans) {
    return ans.reduce((sum,a,i)=>{
      const qq=ch.questions[i];
      if(qq.multi){const c=[...qq.answers].sort().join(",");const g=Array.isArray(a)?[...a].sort().join(","):"";return sum+(c===g?1:0);}
      return sum+(a===qq.answer?1:0);
    },0);
  }

  const proceed = (newAns) => {
    if(currentQ<ch.questions.length-1){setAnswers(newAns);setCurrentQ(c=>c+1);setSelected(null);setMultiSel([]);setRevealed(false);}
    else{onSaveScore(ch.id,calcScore(newAns));setAnswers(newAns);setQuizDone(true);}
  };
  const handleSingle = (idx) => { if(revealed)return; setSelected(idx); setRevealed(true); setTimeout(()=>proceed([...answers,idx]),900); };
  const toggleMulti = (idx) => { if(revealed)return; setMultiSel(p=>p.includes(idx)?p.filter(x=>x!==idx):[...p,idx]); };
  const confirmMulti = () => { if(revealed||multiSel.length===0)return; setRevealed(true); setTimeout(()=>proceed([...answers,[...multiSel].sort()]),900); };
  const score = calcScore(answers);

  const inQuiz = view==="quiz";
  const tabStyle = (active, color) => ({padding:"9px 16px",borderRadius:"7px",border:"none",background:active?color:"#f3f4f6",color:active?"#fff":"#374151",fontWeight:"700",cursor:"pointer",fontSize:"15px"});

  function renderQuestion() {
    if(quizDone) return (
      <div>
        <div style={{background:score/ch.questions.length>=0.7?"linear-gradient(135deg,#166534,#15803d)":score/ch.questions.length>=0.5?"linear-gradient(135deg,#92400e,#b45309)":"linear-gradient(135deg,#991b1b,#b91c1c)",color:"#fff",borderRadius:"14px",padding:"22px",textAlign:"center",marginBottom:"14px"}}>
          <div style={{fontSize:"38px"}}>{score/ch.questions.length>=0.7?"🏆":score/ch.questions.length>=0.5?"📚":"💪"}</div>
          <div style={{fontSize:"32px",fontWeight:"900",lineHeight:1}}>{score}/{ch.questions.length}</div>
          <div style={{fontSize:"14px",marginTop:"5px",opacity:.9}}>{Math.round(score/ch.questions.length*100)}% · {score/ch.questions.length>=0.9?"Excellent !":score/ch.questions.length>=0.7?"Bien joué !":score/ch.questions.length>=0.5?"Continue tes révisions":"À retravailler"}</div>
        </div>
        <h3 style={{fontSize:"16px",marginBottom:"10px"}}>📋 Révision détaillée</h3>
        <div style={{display:"flex",flexDirection:"column",gap:"6px",marginBottom:"14px"}}>
          {ch.questions.map((qq,i)=>{
            const isM=qq.multi===true;const given=answers[i];
            const ok=isM?JSON.stringify([...(Array.isArray(given)?given:[given??-1])].sort())===JSON.stringify([...qq.answers].sort()):given===qq.answer;
            return(<div key={i} style={{background:ok?"#f0fdf4":"#fef2f2",border:`1px solid ${ok?"#86efac":"#fca5a5"}`,borderRadius:"8px",padding:"9px 11px"}}>
              <div style={{fontWeight:"700",fontSize:"14px",color:ok?"#166534":"#991b1b",marginBottom:ok?0:4}}>{ok?"✓":"✗"} Q{i+1}{isM?" (multi)":""} : {qq.q}</div>
              {!ok&&<div style={{fontSize:"14px",color:"#4b5563"}}>Réponse{isM?"s":""} : <span style={{color:"#22c55e",fontWeight:"700"}}>{isM?qq.answers.map(a=>qq.options[a]).join(" + "):qq.options[qq.answer]}</span></div>}
            </div>);})}
        </div>
        <button onClick={startQuiz} style={{width:"100%",padding:"10px",borderRadius:"8px",border:"none",background:ch.color,color:ch.textColor,fontWeight:"800",fontSize:"12px",cursor:"pointer"}}>🔁 Refaire le QCM</button>
      </div>);

    return (
      <div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:"14px",color:"#6b7280",marginBottom:"5px",fontWeight:"600"}}>
          <span>Q {currentQ+1} / {ch.questions.length}</span>
          <span style={{display:"flex",alignItems:"center",gap:"6px"}}>
            {isMulti&&<span style={{background:"#7c3aed",color:"#fff",borderRadius:"20px",padding:"3px 11px",fontSize:"13px",fontWeight:"700"}}>✓ Plusieurs réponses</span>}
            <span>{score} pts</span>
          </span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"10px"}}>
          <ProgressBar value={currentQ} max={ch.questions.length} color={ch.color}/>
          <span style={{fontSize:"14px",color:ch.color,fontWeight:"700",minWidth:"36px"}}>{Math.round(currentQ/ch.questions.length*100)}%</span>
        </div>
        <div style={{background:ch.color,color:ch.textColor,borderRadius:"11px",padding:"18px",marginBottom:"12px",fontSize:"16px",fontWeight:"700",lineHeight:1.6}}>
          {isMulti&&<div style={{fontSize:"13px",opacity:.85,marginBottom:"7px",fontWeight:"700"}}>⚠️ Sélectionne toutes les bonnes réponses puis valide</div>}
          {q.q}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
          {q.options.map((opt,idx)=>{
            const cArr=isMulti?q.answers:[q.answer];const isC=cArr.includes(idx);const isSel=isMulti?multiSel.includes(idx):idx===selected;
            let bg="#fff",bc="#e5e7eb",tc="#111",circ="#f3f4f6",cc="#6b7280";
            if(revealed){if(isC){bg="#f0fdf4";bc="#22c55e";tc="#166534";circ="#22c55e";cc="#fff";}else if(isSel){bg="#fef2f2";bc="#ef4444";tc="#991b1b";circ="#ef4444";cc="#fff";}}
            else if(isMulti&&isSel){bg="#ede9fe";bc="#7c3aed";tc="#4c1d95";circ="#7c3aed";cc="#fff";}
            const lbl=revealed&&isC?"✓":revealed&&isSel&&!isC?"✗":isMulti?(isSel?"☑":"□"):String.fromCharCode(65+idx);
            return <button key={idx} onClick={()=>isMulti?toggleMulti(idx):handleSingle(idx)} style={{background:bg,border:`2px solid ${bc}`,borderRadius:"9px",padding:"12px 15px",textAlign:"left",cursor:revealed?"default":"pointer",fontSize:"15px",fontWeight:"600",color:tc,display:"flex",alignItems:"center",gap:"9px"}}>
              <span style={{width:"30px",height:"30px",borderRadius:isMulti?"5px":"50%",background:circ,color:cc,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"800",fontSize:"14px",flexShrink:0}}>{lbl}</span>{opt}
            </button>;})}
        </div>
        {isMulti&&!revealed&&<button onClick={confirmMulti} disabled={multiSel.length===0} style={{width:"100%",marginTop:"10px",padding:"10px",borderRadius:"8px",border:"none",background:multiSel.length===0?"#e5e7eb":"#7c3aed",color:multiSel.length===0?"#9ca3af":"#fff",fontWeight:"800",fontSize:"13px",cursor:multiSel.length===0?"default":"pointer"}}>
          ✓ Valider ({multiSel.length} choisie{multiSel.length>1?"s":""})
        </button>}
      </div>);
  }

  return (
    <div style={{maxWidth:780,margin:"0 auto",padding:"14px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px",flexWrap:"wrap"}}>
        <div>
          <div style={{fontSize:"13px",fontFamily:"monospace",color:"#9ca3af",fontWeight:"700"}}>CHAPITRE {ch.num} / {ch.mod==="C"?14:6}</div>
          <h2 style={{margin:0,fontSize:"22px",fontWeight:"800"}}><span style={{fontSize:"28px",marginRight:"8px"}}>{ch.icon}</span>{ch.title}</h2>
        </div>
        {scores[ch.id]!==undefined&&<span style={{marginLeft:"auto",background:ch.color,color:"#fff",borderRadius:"20px",padding:"4px 12px",fontSize:"13px",fontWeight:"700"}}>Dernier : {scores[ch.id]}/{ch.questions.length}</span>}
      </div>
      {/* Tabs always visible */}
      <div style={{display:"flex",gap:"7px",marginBottom:"14px"}}>
        <button onClick={()=>onViewChange("content")} style={tabStyle(view==="content",ch.color)}>📖 Cours</button>
        <button onClick={()=>onViewChange("glossaire")} style={tabStyle(view==="glossaire","#0369a1")}>📚 Glossaire</button>
        <button onClick={inQuiz&&!quizDone?undefined:startQuiz} style={{...tabStyle(inQuiz,"#7c3aed"),cursor:inQuiz&&!quizDone?"default":"pointer"}}>
          {inQuiz&&!quizDone?`🧠 Q${currentQ+1}/${ch.questions.length}`:quizDone?"🧠 Résultat":`🧠 QCM (${ch.questions.length})`}
        </button>
      </div>

      {view==="content"&&(
        <div style={{background:"#fff",borderRadius:"12px",padding:"16px",border:"1px solid #e5e7eb"}}>
          {ch.content.filter(b=>b.T!=="gloss").map((block,i)=>renderBlock(block,i))}
          <div style={{borderTop:"1px solid #e5e7eb",marginTop:"16px",paddingTop:"14px",display:"flex",gap:"8px",flexWrap:"wrap"}}>
            <button onClick={()=>onViewChange("glossaire")} style={{flex:1,padding:"9px",borderRadius:"8px",border:"1px solid #7dd3fc",background:"#f0f9ff",color:"#0369a1",fontWeight:"700",cursor:"pointer",fontSize:"15px"}}>📚 Glossaire</button>
            <button onClick={startQuiz} style={{flex:2,padding:"9px",borderRadius:"8px",border:"none",background:ch.color,color:ch.textColor,fontWeight:"800",cursor:"pointer",fontSize:"15px"}}>Je suis prêt · QCM ({ch.questions.length} Q) →</button>
          </div>
        </div>)}

      {view==="glossaire"&&(
        <div style={{background:"#fff",borderRadius:"12px",padding:"16px",border:"1px solid #e5e7eb"}}>
          <div style={{marginBottom:"12px",padding:"9px 13px",background:"#f0f9ff",borderRadius:"8px",border:"1px solid #bae6fd"}}>
            <div style={{fontWeight:"800",fontSize:"15px",color:"#0369a1"}}>📚 Glossaire — Termes clés du chapitre</div>
            <div style={{fontSize:"13px",color:"#0c4a6e",marginTop:"3px"}}>Termes et définitions essentiels pour l'examen CFC</div>
          </div>
          {ch.content.filter(b=>b.T==="gloss").map((block,i)=>renderBlock(block,i))}
          <div style={{borderTop:"1px solid #e5e7eb",marginTop:"13px",paddingTop:"12px",display:"flex",gap:"8px"}}>
            <button onClick={()=>onViewChange("content")} style={{flex:1,padding:"9px",borderRadius:"8px",border:`2px solid ${ch.color}`,background:"#fff",color:"#111",fontWeight:"700",cursor:"pointer",fontSize:"15px"}}>📖 Cours</button>
            <button onClick={startQuiz} style={{flex:2,padding:"9px",borderRadius:"8px",border:"none",background:ch.color,color:ch.textColor,fontWeight:"800",cursor:"pointer",fontSize:"15px"}}>Je suis prêt · QCM ({ch.questions.length} Q) →</button>
          </div>
        </div>)}

      {view==="quiz"&&renderQuestion()}
    </div>);
}

// ─── QCM ALÉATOIRE (universal) ───────────────────────────────────────────────
function QCMAleatoire({ modKey, randPool, randScores, onSaveScore }) {
  const meta = MODULE_REGISTRY[modKey].meta;
  const [nbChosen, setNbChosen] = useState(null); // null = selection screen
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [multiSel, setMultiSel] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  const startWithNb = (nb) => {
    setNbChosen(nb);
    setQuestions(shuffle(randPool).slice(0,nb));
    setCurrentQ(0); setAnswers([]); setSelected(null); setMultiSel([]); setRevealed(false); setDone(false);
  };

  const q = questions[currentQ];
  const isM = q && q.multi===true;

  function calcScore(ans) {
    return ans.reduce((sum,a,i)=>{const qq=questions[i];if(qq.multi){const c=[...qq.answers].sort().join(",");const g=Array.isArray(a)?[...a].sort().join(","):"";return sum+(c===g?1:0);}return sum+(a===qq.answer?1:0);},0);
  }
  const proceed = (newAns) => {
    if(currentQ<questions.length-1){setAnswers(newAns);setCurrentQ(c=>c+1);setSelected(null);setMultiSel([]);setRevealed(false);}
    else{onSaveScore(calcScore(newAns));setAnswers(newAns);setDone(true);}
  };
  const handleSingle = (idx) => { if(revealed)return; setSelected(idx); setRevealed(true); setTimeout(()=>proceed([...answers,idx]),900); };
  const toggleM = (idx) => { if(revealed)return; setMultiSel(p=>p.includes(idx)?p.filter(x=>x!==idx):[...p,idx]); };
  const confirmM = () => { if(revealed||multiSel.length===0)return; setRevealed(true); setTimeout(()=>proceed([...answers,[...multiSel].sort()]),900); };
  const score = calcScore(answers);
  const nb = nbChosen || 20;

  // ── Selection screen ──
  if(!nbChosen) return (
    <div style={{maxWidth:680,margin:"0 auto",padding:"14px"}}>
      <div style={{background:`linear-gradient(135deg,${meta.color},${meta.color}cc)`,borderRadius:"16px",padding:"28px",textAlign:"center",marginBottom:"20px",color:"#fff"}}>
        <div style={{fontSize:"40px",marginBottom:"8px"}}>🎲</div>
        <h2 style={{margin:"0 0 6px",fontSize:"22px",fontWeight:"900"}}>QCM Aléatoire — {meta.title}</h2>
        <p style={{margin:0,opacity:.85,fontSize:"15px"}}>{randPool.length} questions disponibles dans le pool</p>
        {randScores.length>0&&<div style={{marginTop:"10px",background:"rgba(255,255,255,.15)",borderRadius:"20px",padding:"4px 14px",display:"inline-block",fontSize:"14px"}}>🏆 Meilleur : {Math.max(...randScores)}/{randScores[randScores.length-1]} dernière tentative</div>}
      </div>
      <div style={{background:"#fff",borderRadius:"12px",padding:"20px",border:"1px solid #e5e7eb"}}>
        <div style={{fontWeight:"800",fontSize:"16px",color:"#111",marginBottom:"6px",textAlign:"center"}}>Choisis le nombre de questions</div>
        <div style={{fontSize:"13px",color:"#6b7280",textAlign:"center",marginBottom:"18px"}}>Les questions sont tirées aléatoirement dans tous les chapitres du module</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"10px"}}>
          {[10,15,20,25].map(n=>(
            <button key={n} onClick={()=>startWithNb(n)} style={{padding:"18px 8px",borderRadius:"10px",border:`2px solid ${meta.color}`,background:"#fff",cursor:"pointer",fontWeight:"800",fontSize:"22px",color:meta.color,display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",transition:"all .15s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=meta.color;e.currentTarget.style.color="#fff";}}
              onMouseLeave={e=>{e.currentTarget.style.background="#fff";e.currentTarget.style.color=meta.color;}}>
              {n}
              <span style={{fontSize:"11px",fontWeight:"600",opacity:.7}}>questions</span>
            </button>))}
        </div>
      </div>
    </div>);

  // ── Result screen ──
  if(done){const pct=Math.round(score/nb*100);return(
    <div style={{maxWidth:780,margin:"0 auto",padding:"14px"}}>
      <div style={{background:pct>=70?"linear-gradient(135deg,#166534,#15803d)":"linear-gradient(135deg,#991b1b,#b91c1c)",color:"#fff",borderRadius:"16px",padding:"26px",textAlign:"center",marginBottom:"16px"}}>
        <div style={{fontSize:"50px"}}>{pct>=80?"🏆":pct>=60?"📚":"💪"}</div>
        <div style={{fontSize:"13px",opacity:.8,marginBottom:"4px"}}>QCM Aléatoire {meta.title} — {nb} questions</div>
        <div style={{fontSize:"42px",fontWeight:"900",lineHeight:1}}>{score}/{nb}</div>
        <div style={{fontSize:"16px",marginTop:"7px",opacity:.9}}>{pct}%</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"5px",marginBottom:"14px",maxHeight:"400px",overflowY:"auto"}}>
        {questions.map((qq,i)=>{const isM2=qq.multi===true;const given=answers[i];const ok=isM2?JSON.stringify([...(Array.isArray(given)?given:[given??-1])].sort())===JSON.stringify([...qq.answers].sort()):given===qq.answer;
          return(<div key={i} style={{background:ok?"#f0fdf4":"#fef2f2",border:`1px solid ${ok?"#86efac":"#fca5a5"}`,borderRadius:"8px",padding:"8px 11px"}}>
            <div style={{fontSize:"13px",fontWeight:"700",color:qq._chColor,marginBottom:"4px"}}>{qq._chTitle}</div>
            <div style={{fontWeight:"700",fontSize:"14px",color:ok?"#166534":"#991b1b",marginBottom:ok?0:4}}>{ok?"✓":"✗"} {qq.q}</div>
            {!ok&&<div style={{fontSize:"14px",color:"#4b5563"}}>Bonne{isM2?"s":""} réponse{isM2?"s":""} : <span style={{color:"#22c55e",fontWeight:"700"}}>{isM2?qq.answers.map(a=>qq.options[a]).join(" + "):qq.options[qq.answer]}</span></div>}
          </div>);})}
      </div>
      <div style={{display:"flex",gap:"8px"}}>
        <button onClick={()=>setNbChosen(null)} style={{flex:1,padding:"11px",borderRadius:"9px",border:`2px solid ${meta.color}`,background:"#fff",color:meta.color,fontWeight:"800",cursor:"pointer",fontSize:"14px"}}>↩ Choisir un format</button>
        <button onClick={()=>startWithNb(nb)} style={{flex:1,padding:"11px",borderRadius:"9px",border:"none",background:"#7c3aed",color:"#fff",fontWeight:"800",cursor:"pointer",fontSize:"14px"}}>🔀 Relancer {nb} Q</button>
      </div>
    </div>);}

  // ── Quiz screen ──
  return(
    <div style={{maxWidth:780,margin:"0 auto",padding:"14px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px",flexWrap:"wrap"}}>
        <div>
          <div style={{fontSize:"13px",fontFamily:"monospace",color:"#9ca3af",fontWeight:"700"}}>QCM ALÉATOIRE {meta.title}</div>
          <h2 style={{margin:0,fontSize:"20px",fontWeight:"900"}}>🎲 {nb} questions</h2>
        </div>
        {randScores.length>0&&<span style={{marginLeft:"auto",background:"#7c3aed",color:"#fff",borderRadius:"20px",padding:"5px 14px",fontSize:"14px",fontWeight:"700"}}>Meilleur : {Math.max(...randScores)}/{nb}</span>}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:"14px",color:"#6b7280",marginBottom:"5px",fontWeight:"600"}}><span>Q {currentQ+1} / {nb}</span><span style={{display:"flex",alignItems:"center",gap:"6px"}}>{isM&&<span style={{background:"#7c3aed",color:"#fff",borderRadius:"20px",padding:"3px 11px",fontSize:"13px",fontWeight:"700"}}>✓ Multi</span>}<span>{score} pts</span></span></div>
      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}><ProgressBar value={currentQ} max={nb} color="#7c3aed"/><span style={{fontSize:"14px",color:"#7c3aed",fontWeight:"700",minWidth:"36px"}}>{Math.round(currentQ/nb*100)}%</span></div>
      <div style={{fontSize:"13px",fontWeight:"700",color:q._chColor,marginBottom:"7px",background:`${q._chColor}18`,padding:"5px 13px",borderRadius:"20px",display:"inline-block"}}>{q._chTitle}</div>
      <div style={{background:q._chColor,color:q._chTextColor||"#fff",borderRadius:"11px",padding:"18px",margin:"6px 0 12px",fontSize:"16px",fontWeight:"700",lineHeight:1.6}}>
        {isM&&<div style={{fontSize:"13px",opacity:.85,marginBottom:"7px",fontWeight:"700"}}>⚠️ Sélectionne toutes les bonnes réponses puis valide</div>}
        {q.q}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
        {q.options.map((opt,idx)=>{
          const cArr=isM?q.answers:[q.answer];const isC=cArr.includes(idx);const isSel=isM?multiSel.includes(idx):idx===selected;
          let bg="#fff",bc="#e5e7eb",tc="#111",circ="#f3f4f6",cc="#6b7280";
          if(revealed){if(isC){bg="#f0fdf4";bc="#22c55e";tc="#166534";circ="#22c55e";cc="#fff";}else if(isSel){bg="#fef2f2";bc="#ef4444";tc="#991b1b";circ="#ef4444";cc="#fff";}}
          else if(isM&&isSel){bg="#ede9fe";bc="#7c3aed";tc="#4c1d95";circ="#7c3aed";cc="#fff";}
          const lbl=revealed&&isC?"✓":revealed&&isSel&&!isC?"✗":isM?(isSel?"☑":"□"):String.fromCharCode(65+idx);
          return (<button key={idx} onClick={()=>isM?toggleM(idx):handleSingle(idx)} style={{background:bg,border:`2px solid ${bc}`,borderRadius:"9px",padding:"12px 15px",textAlign:"left",cursor:revealed?"default":"pointer",fontSize:"15px",fontWeight:"600",color:tc,display:"flex",alignItems:"center",gap:"9px"}}>
            <span style={{width:"30px",height:"30px",borderRadius:isM?"5px":"50%",background:circ,color:cc,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"800",fontSize:"14px",flexShrink:0}}>{lbl}</span>{opt}
          </button>);})}
      </div>
      {isM&&!revealed&&<button onClick={confirmM} disabled={multiSel.length===0} style={{width:"100%",marginTop:"10px",padding:"10px",borderRadius:"8px",border:"none",background:multiSel.length===0?"#e5e7eb":"#7c3aed",color:multiSel.length===0?"#9ca3af":"#fff",fontWeight:"800",fontSize:"13px",cursor:multiSel.length===0?"default":"pointer"}}>
        ✓ Valider ({multiSel.length} choisie{multiSel.length>1?"s":""})
      </button>}
    </div>);}

// ─── QCM ALÉATOIRE (universal) ───────────────────────────────────────────────
// ─── MODULE DASHBOARD (universal) ────────────────────────────────────────────
function ModuleDashboard({ modKey, scores, randScores, onSelectChapter, onStartRandom }) {
  const reg = MODULE_REGISTRY[modKey];
  const { meta, chapters } = reg;
  const randNb = reg.randNb;
  const done = chapters.filter(c=>scores[c.id]!==undefined);
  const totalScore = done.reduce((a,c)=>a+scores[c.id],0);
  const maxScore = done.reduce((a,c)=>a+c.questions.length,0);
  const passed = done.filter(c=>scores[c.id]/c.questions.length>=0.7).length;

  return(
    <div style={{maxWidth:920,margin:"0 auto",padding:"16px 13px"}}>
      <div style={{background:`linear-gradient(135deg,${meta.color},${meta.color}cc)`,borderRadius:"14px",padding:"18px 22px",marginBottom:"16px",color:"#fff",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-25,right:-25,width:110,height:110,background:"rgba(255,255,255,0.07)",borderRadius:"50%"}}/>
        <div style={{position:"relative"}}>
          <div style={{fontSize:"12px",letterSpacing:".1em",color:"rgba(255,255,255,.8)",fontFamily:"monospace",marginBottom:"6px",fontWeight:"700"}}>FORMATION CFC · LOGISTICIEN</div>
          <h2 style={{fontSize:"clamp(18px,4vw,26px)",fontWeight:"900",margin:"0 0 5px"}}>{meta.icon} {meta.title} — {meta.subtitle}</h2>
          <p style={{margin:"0 0 14px",opacity:.85,fontSize:"15px"}}>{meta.desc}</p>
          <div style={{display:"flex",gap:"10px",flexWrap:"wrap",marginBottom:"13px"}}>
            {[{l:"Chapitres tentés",v:`${done.length}/${chapters.length}`},{l:"Score total",v:done.length?`${totalScore}/${maxScore}`:"—"},{l:"≥ 70% réussis",v:`${passed}/${done.length||0}`}].map(s=>(
              <div key={s.l} style={{background:"rgba(255,255,255,.12)",borderRadius:"8px",padding:"8px 12px"}}>
                <div style={{fontSize:"24px",fontWeight:"800"}}>{s.v}</div>
                <div style={{fontSize:"13px",opacity:.7}}>{s.l}</div>
              </div>))}
          </div>
          <button onClick={onStartRandom} style={{background:"#7c3aed",color:"#fff",border:"none",borderRadius:"10px",padding:"13px 24px",fontWeight:"800",fontSize:"16px",cursor:"pointer",display:"flex",alignItems:"center",gap:"8px"}}>
            <span style={{fontSize:"16px"}}>🎲</span>
            QCM Aléatoire — 10 à 25 questions
            {randScores.length>0&&<span style={{background:"rgba(255,255,255,.2)",borderRadius:"20px",padding:"3px 11px",fontSize:"13px"}}>Meilleur : {Math.max(...randScores)}/{randNb}</span>}
          </button>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"11px"}}>
        <div style={{fontWeight:"800",fontSize:"13px",letterSpacing:".07em",textTransform:"uppercase",color:meta.color}}>📖 Les {chapters.length} chapitres</div>
        <div style={{flex:1,height:"1px",background:"#e5e7eb"}}/>
        <span style={{fontSize:"13px",color:"#9ca3af",fontWeight:"600"}}>{done.length}/{chapters.length} tentés</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"9px"}}>
        {chapters.map(ch=>{
          const s=scores[ch.id];const attempted=s!==undefined;const pct=attempted?Math.round(s/ch.questions.length*100):0;const ok=attempted&&s/ch.questions.length>=0.7;
          return(<div key={ch.id} onClick={()=>onSelectChapter(ch.id)} style={{background:"#fff",borderRadius:"10px",padding:"13px",cursor:"pointer",border:`2px solid ${attempted?ch.color:"#e5e7eb"}`,boxShadow:attempted?`0 2px 10px ${ch.color}20`:"0 1px 4px rgba(0,0,0,0.05)",transition:"transform 0.15s",position:"relative",overflow:"hidden"}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)"}} onMouseLeave={e=>{e.currentTarget.style.transform=""}}>
            <div style={{position:"absolute",top:0,right:0,width:44,height:44,background:`${ch.color}12`,borderRadius:"0 10px 0 44px"}}/>
            <div style={{fontSize:"30px",marginBottom:"6px"}}>{ch.icon}</div>
            <div style={{fontSize:"12px",fontFamily:"monospace",color:"#9ca3af",marginBottom:"3px",fontWeight:"600"}}>CH. {ch.num}</div>
            <div style={{fontSize:"16px",fontWeight:"800",color:"#111",marginBottom:"8px",lineHeight:1.3}}>{ch.title}</div>
            <div style={{display:"flex",alignItems:"center",gap:"5px",marginBottom:"5px"}}><ProgressBar value={pct} max={100} color={ch.color}/><span style={{fontSize:"13px",fontWeight:"700",color:ch.color,minWidth:"30px"}}>{attempted?`${pct}%`:"—"}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{background:attempted?ch.color:"#f3f4f6",color:attempted?"#fff":"#6b7280",borderRadius:"20px",padding:"4px 11px",fontSize:"12px",fontWeight:"700"}}>{attempted?(ok?`✓ ${s}/${ch.questions.length}`:`↺ ${s}/${ch.questions.length}`):"À commencer"}</span>
              <span style={{fontSize:"12px",color:"#9ca3af",fontWeight:"600"}}>{ch.questions.length} Q</span>
            </div>
          </div>);})}
      </div>
    </div>);
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
function MainDashboard({ allScores, allRandScores, onSelectModule }) {
  const modules = ["A","B","C","D","E"];
  const stats = modules.map(k=>{
    const reg = MODULE_REGISTRY[k];
    const done = reg.chapters.filter(c=>allScores[k]?.[c.id]!==undefined);
    const pct = done.length?Math.round(done.reduce((a,c)=>a+(allScores[k][c.id]/c.questions.length),0)/done.length*100):0;
    return { k, meta:reg.meta, done:done.length, total:reg.chapters.length, pct, randBest:allRandScores[k]?.length?Math.max(...allRandScores[k]):null, randNb:reg.randNb };
  });
  return(
    <div style={{maxWidth:920,margin:"0 auto",padding:"16px 13px"}}>
      <div style={{background:"linear-gradient(135deg,#1B4F8A,#0d2f57)",borderRadius:"16px",padding:"22px 26px",marginBottom:"20px",color:"#fff",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-30,right:-30,width:140,height:140,background:"rgba(255,204,0,.1)",borderRadius:"50%"}}/>
        <div style={{position:"relative"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"}}>
            <div style={{width:"40px",height:"40px",background:"#FFCC00",borderRadius:"9px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"24px"}}>✉️</div>
            <div><div style={{fontWeight:"900",fontSize:"22px",lineHeight:1.1}}>LogiLearn</div><div style={{fontSize:"13px",fontWeight:"600",opacity:.75}}>CFC Logisticien · La Poste Suisse</div></div>
          </div>
          <p style={{margin:"0 0 14px",opacity:.9,fontSize:"15px",maxWidth:"600px"}}>Bienvenue ! Révise les 5 modules du CFC Logisticien avec des cours, des glossaires et des QCM interactifs.</p>
          <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
            {[{l:"Modules",v:"5"},{l:"Chapitres",v:"38"},{l:"QCM / module",v:"40 Q"}].map(s=>(
              <div key={s.l} style={{background:"rgba(255,255,255,.12)",borderRadius:"8px",padding:"7px 12px"}}>
                <div style={{fontSize:"22px",fontWeight:"900"}}>{s.v}</div>
                <div style={{fontSize:"13px",opacity:.8,marginTop:"2px"}}>{s.l}</div>
              </div>))}
          </div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"11px"}}>
        {stats.map(({k,meta,done,total,pct,randBest,randNb})=>(
          <div key={k} onClick={()=>onSelectModule(k)} style={{background:"#fff",borderRadius:"12px",padding:"16px",cursor:"pointer",border:`2px solid ${done>0?meta.color:"#e5e7eb"}`,boxShadow:done>0?`0 3px 14px ${meta.color}25`:"0 1px 5px rgba(0,0,0,0.06)",transition:"transform 0.15s,box-shadow 0.15s"}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 24px ${meta.color}35`;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=done>0?`0 3px 14px ${meta.color}25`:"0 1px 5px rgba(0,0,0,0.06)";}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"10px"}}>
              <div style={{width:"50px",height:"50px",background:`${meta.color}15`,borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"28px"}}>{meta.icon}</div>
              {randBest!==null&&<span style={{background:"#ede9fe",color:"#7c3aed",borderRadius:"20px",padding:"2px 8px",fontSize:"13px",fontWeight:"700"}}>🎲 {randBest}/{randNb}</span>}
            </div>
            <div style={{fontSize:"14px",fontFamily:"monospace",color:meta.color,fontWeight:"800",marginBottom:"4px"}}>{meta.title}</div>
            <div style={{fontSize:"13px",fontWeight:"800",color:"#111",marginBottom:"4px"}}>{meta.subtitle}</div>
            <div style={{display:"flex",alignItems:"center",gap:"7px",marginBottom:"8px"}}>
              <ProgressBar value={pct} max={100} color={meta.color}/>
              <span style={{fontSize:"13px",fontWeight:"700",color:meta.color,minWidth:"36px"}}>{done>0?`${pct}%`:"—"}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{background:done>0?meta.color:"#f3f4f6",color:done>0?"#fff":"#6b7280",borderRadius:"20px",padding:"5px 13px",fontSize:"13px",fontWeight:"700"}}>
                {done>0?`${done}/${total} chapitres`:"À commencer"}
              </span>
              <span style={{fontSize:"18px",fontWeight:"700",color:meta.color}}>→</span>
            </div>
          </div>))}
      </div>
    </div>);
}

// ─── ADMIN PANEL ─────────────────────────────────────────────────────────────
function AdminPanel({ allScores, allRandScores, onResetAll, onResetChapter, onResetRand, onClose }) {
  const [selMod, setSelMod] = useState("C");
  const [confirmKey, setConfirmKey] = useState(null);
  const doConfirm = (key,action)=>{ if(confirmKey===key){action();setConfirmKey(null);}else{setConfirmKey(key);setTimeout(()=>setConfirmKey(null),3000);}};
  const [confirmAll, setConfirmAll] = useState(false);
  const reg = MODULE_REGISTRY[selMod];
  const modScores = allScores[selMod]||{};
  const done = reg.chapters.filter(c=>modScores[c.id]!==undefined);
  return(
    <>
      <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:100,backdropFilter:"blur(2px)"}}/>
      <div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"#fff",borderRadius:"14px",width:"min(490px,94vw)",maxHeight:"82vh",overflowY:"auto",zIndex:101,boxShadow:"0 20px 50px rgba(0,0,0,0.22)"}}>
        <div style={{background:"linear-gradient(135deg,#1e293b,#334155)",borderRadius:"14px 14px 0 0",padding:"13px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:2}}>
          <div><div style={{color:"#94a3b8",fontSize:"9px",letterSpacing:".12em",fontFamily:"monospace"}}>LOGILEARN v7</div><div style={{color:"#fff",fontWeight:"800",fontSize:"15px"}}>⚙️ Administration</div></div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,.1)",border:"none",borderRadius:"6px",color:"#fff",width:"26px",height:"26px",cursor:"pointer",fontSize:"13px"}}>✕</button>
        </div>
        <div style={{padding:"14px 18px"}}>
          <div style={{display:"flex",gap:"4px",marginBottom:"14px",flexWrap:"wrap"}}>
            {["A","B","C","D","E"].map(k=>{const m=MODULE_REGISTRY[k].meta;return(
              <button key={k} onClick={()=>setSelMod(k)} style={{flex:1,padding:"6px 4px",borderRadius:"7px",border:"none",cursor:"pointer",background:selMod===k?m.color:"#f1f5f9",color:selMod===k?"#fff":"#475569",fontWeight:"700",fontSize:"13px",minWidth:"60px"}}>
                {m.icon} {k}
              </button>);})}
          </div>
          <div style={{fontWeight:"700",fontSize:"13px",color:"#374151",marginBottom:"9px"}}>📊 {MODULE_REGISTRY[selMod].meta.title} — {done.length}/{reg.chapters.length} chapitres tentés</div>
          {done.length===0?<div style={{background:"#f1f5f9",borderRadius:"7px",padding:"10px",textAlign:"center",fontSize:"11px",color:"#94a3b8",marginBottom:"10px"}}>Aucun chapitre tenté pour ce module.</div>:
            done.map(ch=>{
              const s=modScores[ch.id]; const key=`ch:${selMod}:${ch.id}`; const isC=confirmKey===key;
              const pct=Math.round(s/ch.questions.length*100);
              return(<div key={ch.id} style={{display:"flex",alignItems:"center",gap:"6px",background:"#f8fafc",borderRadius:"6px",padding:"7px 9px",marginBottom:"5px",border:"0.5px solid #e5e7eb"}}>
                <span style={{fontSize:"14px"}}>{ch.icon}</span>
                <div style={{flex:1}}><div style={{fontWeight:"700",fontSize:"13px"}}>Ch.{ch.num} · {ch.title}</div><div style={{fontSize:"12px",color:pct>=70?"#16a34a":"#dc2626",fontWeight:"600"}}>{s}/{ch.questions.length} · {pct}%</div></div>
                <button onClick={()=>doConfirm(key,()=>onResetChapter(selMod,ch.id))} style={{padding:"5px 11px",borderRadius:"5px",border:"none",cursor:"pointer",background:isC?"#dc2626":"#fee2e2",color:isC?"#fff":"#dc2626",fontWeight:"700",fontSize:"12px"}}>{isC?"⚠️ Confirmer ?":"🗑️ Effacer"}</button>
              </div>);})}
          <div style={{marginTop:"8px",marginBottom:"12px"}}>
            <div style={{fontWeight:"700",fontSize:"13px",color:"#374151",marginBottom:"7px"}}>🎲 QCM Aléatoire {MODULE_REGISTRY[selMod].meta.title}</div>
            {(allRandScores[selMod]||[]).length===0?<div style={{fontSize:"11px",color:"#9ca3af",marginBottom:"8px"}}>Aucun QCM aléatoire tenté pour ce module.</div>:
              <div style={{display:"flex",gap:"5px",flexWrap:"wrap",marginBottom:"8px"}}>
                {(allRandScores[selMod]||[]).map((s,i)=><span key={i} style={{background:s/reg.randNb>=0.7?"#dcfce7":"#fef2f2",color:s/reg.randNb>=0.7?"#166534":"#991b1b",borderRadius:"20px",padding:"2px 8px",fontSize:"11px",fontWeight:"700"}}>#{i+1}: {s}/{reg.randNb}</span>)}
              </div>}
            <button onClick={()=>doConfirm(`rand:${selMod}`,()=>onResetRand(selMod))} style={{width:"100%",padding:"9px",borderRadius:"7px",border:"none",cursor:"pointer",background:confirmKey===`rand:${selMod}`?"#dc2626":"#fef2f2",color:confirmKey===`rand:${selMod}`?"#fff":"#dc2626",fontWeight:"700",fontSize:"13px"}}>
              {confirmKey===`rand:${selMod}`?"⚠️ Confirmer ?":"🗑️ Effacer scores QCM aléatoire"}
            </button>
          </div>
          <div style={{borderTop:"1px solid #f1f5f9",paddingTop:"12px"}}>
            <div style={{background:"#fff8f0",border:"0.5px solid #fed7aa",borderRadius:"7px",padding:"9px",marginBottom:"8px",fontSize:"11px",color:"#92400e"}}>⚠️ Efface TOUS les scores de TOUS les modules.</div>
            <button onClick={()=>{if(confirmAll){onResetAll();setConfirmAll(false);}else{setConfirmAll(true);setTimeout(()=>setConfirmAll(false),3500);}}} style={{width:"100%",padding:"10px",borderRadius:"7px",background:confirmAll?"#dc2626":"#fef2f2",color:confirmAll?"#fff":"#dc2626",fontWeight:"800",fontSize:"12px",cursor:"pointer",border:"none"}}>
              {confirmAll?"⚠️ Cliquer encore pour confirmer":"🔄 Tout remettre à zéro"}
            </button>
          </div>
          <button onClick={onClose} style={{width:"100%",marginTop:"10px",padding:"8px",borderRadius:"7px",border:"0.5px solid #e5e7eb",background:"#f8fafc",fontSize:"11px",cursor:"pointer",color:"#374151",fontWeight:"600"}}>Fermer</button>
        </div>
      </div>
    </>);
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  // Scores : { A:{ca1:4,...}, B:{...}, C:{...}, D:{...}, E:{...} }
  const [allScores, setAllScores] = useState(()=>{
    try{const s=JSON.parse(localStorage.getItem("ll_v7_scores")||"{}");return{A:{},B:{},C:{},D:{},E:{},...s};}catch{return{A:{},B:{},C:{},D:{},E:{}};}
  });
  const [allRandScores, setAllRandScores] = useState(()=>{
    try{const s=JSON.parse(localStorage.getItem("ll_v7_rand")||"{}");return{A:[],B:[],C:[],D:[],E:[],...s};}catch{return{A:[],B:[],C:[],D:[],E:[]};}
  });
  const [showAdmin, setShowAdmin] = useState(false);

  // ── NAVIGATION PAR HASH (hashchange = 100% fiable pour le bouton retour) ──
  // Format: #home | #mod-A | #ch-A-ca1-content | #ch-A-ca1-quiz | #rand-A
  function parseHash(hash) {
    const h = (hash||"").replace(/^#/,"");
    if (!h || h==="home") return {mod:null, ch:null, tab:"content", rand:false};
    if (h.startsWith("mod-")) return {mod:h.slice(4), ch:null, tab:"content", rand:false};
    if (h.startsWith("rand-")) return {mod:h.slice(5), ch:null, tab:"content", rand:true};
    if (h.startsWith("ch-")) {
      const parts = h.split("-");
      return {mod:parts[1], ch:parts[2], tab:parts[3]||"content", rand:false};
    }
    return {mod:null, ch:null, tab:"content", rand:false};
  }

  const [nav, setNav] = useState(()=>parseHash(window.location.hash));

  useEffect(()=>{
    // hashchange se déclenche sur TOUTES les navigations y compris ←/→ du navigateur
    const handler = ()=>setNav(parseHash(window.location.hash));
    window.addEventListener("hashchange", handler);
    return ()=>window.removeEventListener("hashchange", handler);
  },[]);

  // Changer le hash modifie l'URL et ajoute automatiquement une entrée dans l'historique
  // Le hashchange handler met ensuite à jour le state React
  const go = (hash) => { window.location.hash = hash; };

  const goHome    = ()         => go("home");
  const goModule  = (k)        => go(`mod-${k}`);
  const goChapter = (m, chId)  => go(`ch-${m}-${chId}`);
  const goTab     = (m,chId,t) => go(`ch-${m}-${chId}-${t}`);
  const goRandom  = (m)        => go(`rand-${m}`);

  useEffect(()=>{try{localStorage.setItem("ll_v7_scores",JSON.stringify(allScores));}catch{}}, [allScores]);
  useEffect(()=>{try{localStorage.setItem("ll_v7_rand",JSON.stringify(allRandScores));}catch{}}, [allRandScores]);

  const saveChScore  = (mk,chId,sc)=> setAllScores(p=>({...p,[mk]:{...p[mk],[chId]:sc}}));
  const saveRandScore= (mk,sc)     => setAllRandScores(p=>({...p,[mk]:[...(p[mk]||[]),sc]}));
  const resetAll     = ()          => { setAllScores({A:{},B:{},C:{},D:{},E:{}}); setAllRandScores({A:[],B:[],C:[],D:[],E:[]}); };
  const resetChapter = (mk,chId)   => setAllScores(p=>{ const n={...p,[mk]:{...p[mk]}}; delete n[mk][chId]; return n; });
  const resetRand    = (mk)        => setAllRandScores(p=>({...p,[mk]:[]}));

  const {mod:activeModule, ch:activeChapterId, tab:activeTab, rand:showRandom} = nav;
  const currentChapter = activeChapterId ? MODULE_REGISTRY[activeModule]?.chapters.find(c=>c.id===activeChapterId) : null;

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#f8fafc 0%,#eff6ff 100%)",fontFamily:"'Segoe UI',system-ui,sans-serif"}}>
      {/* ── HEADER ── */}
      <div style={{background:"#fff",borderBottom:"1px solid #e5e7eb",position:"sticky",top:0,zIndex:20,boxShadow:"0 1px 5px rgba(0,0,0,0.07)"}}>
        <div style={{maxWidth:"960px",margin:"0 auto",padding:"0 14px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"9px",padding:"7px 0",borderBottom:"1px solid #f1f5f9"}}>
            <div onClick={goHome} style={{display:"flex",alignItems:"center",gap:"7px",cursor:"pointer"}}>
              <div style={{width:"40px",height:"40px",background:"#FFCC00",borderRadius:"9px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"24px"}}>✉️</div>
              <div><div style={{fontWeight:"900",fontSize:"20px",lineHeight:1.1}}>LogiLearn</div><div style={{fontSize:"13px",color:"#9ca3af",fontWeight:"600"}}>CFC Logisticien · La Poste Suisse</div></div>
            </div>
            <div style={{marginLeft:"auto"}}>
              <button onClick={()=>setShowAdmin(true)} style={{background:"#f1f5f9",border:"1px solid #e2e8f0",borderRadius:"7px",padding:"6px 13px",cursor:"pointer",fontSize:"13px",fontWeight:"700",color:"#475569"}}>⚙️ Admin</button>
            </div>
          </div>
          <div style={{display:"flex",gap:"2px",overflowX:"auto"}}>
            {[{k:null,label:"🏠 Accueil"},...["A","B","C","D","E"].map(k=>({k,label:`${MODULE_REGISTRY[k].meta.icon} Module ${k}`}))].map(item=>{
              const active = item.k===null ? !activeModule : activeModule===item.k;
              return (<button key={item.k||"home"} onClick={()=>item.k===null?goHome():goModule(item.k)} style={{padding:"11px 18px",border:"none",background:"transparent",cursor:"pointer",fontWeight:active?"800":"600",fontSize:"18px",color:active?(item.k?MODULE_REGISTRY[item.k].meta.color:"#1B4F8A"):"#6b7280",borderBottom:active?`2.5px solid ${item.k?MODULE_REGISTRY[item.k].meta.color:"#1B4F8A"}`:"2.5px solid transparent",whiteSpace:"nowrap",transition:"all 0.15s"}}>{item.label}</button>);
            })}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      {!activeModule&&<MainDashboard allScores={allScores} allRandScores={allRandScores} onSelectModule={goModule}/>}
      {activeModule&&!activeChapterId&&!showRandom&&<ModuleDashboard modKey={activeModule} scores={allScores[activeModule]||{}} randScores={allRandScores[activeModule]||[]} onSelectChapter={id=>goChapter(activeModule,id)} onStartRandom={()=>goRandom(activeModule)}/>}
      {activeModule&&activeChapterId&&currentChapter&&<ChapterView key={activeChapterId} chapter={currentChapter} view={activeTab} onViewChange={t=>goTab(activeModule,activeChapterId,t)} scores={allScores[activeModule]||{}} onSaveScore={(chId,sc)=>saveChScore(activeModule,chId,sc)}/>}
      {activeModule&&showRandom&&<QCMAleatoire modKey={activeModule} randPool={MODULE_REGISTRY[activeModule].randPool} randScores={allRandScores[activeModule]||[]} onSaveScore={(sc)=>saveRandScore(activeModule,sc)}/>}

      {showAdmin&&<AdminPanel allScores={allScores} allRandScores={allRandScores} onResetAll={()=>{resetAll();setShowAdmin(false);}} onResetChapter={resetChapter} onResetRand={resetRand} onClose={()=>setShowAdmin(false)}/>}
    </div>);
}
