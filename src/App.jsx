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
  {T:"text",x:"La vente directe : le fabricant vend sans intermédiaire directement au client final. Justifiée quand le nombre d'acheteurs est limité, concentrés géographiquement, avec une demande constante. Exemples : magasin à la ferme, magasin d'usine, vente en ligne du fabricant."},
  {T:"text",x:"La vente indirecte : les marchandises transitent par un intermédiaire (grossiste, détaillant). Justifiée quand les acheteurs sont nombreux, que les produits viennent de plusieurs fabricants, ou que l'after-sales service peut être géré par le commerçant."},
  {T:"section",x:"Les niveaux de distribution"},
  {T:"text",x:"Distribution à 2 niveaux : Production → Entrepôt central/intermédiaire → Clients. Distribution à 3 niveaux : Production → Entrepôt central/grossiste → Dépôt de vente/détaillant → Clients."},
  {T:"hl",bg:"#fff8e1",b:"#f59e0b",ti:"Cross-Docking — définition clé",x:"Transit sans stockage : les marchandises arrivent, sont déchargées, préparées et assemblées, puis rechargées immédiatement vers leur destination. Les entrepôts régionaux deviennent des plates-formes de produits frais."},
  {T:"section",x:"La distribution classique vs décentralisée"},
  {T:"list",items:["Distribution CLASSIQUE : entrepôt central → entrepôts régionaux → points de vente. L'entrepôt central stocke les produits importés centralement. Les centres régionaux s'approvisionnent en produits frais locaux.","Distribution DÉCENTRALISÉE : centrales spécialisées par type (Non-food, Surgelés, Colonial, Produits frais). Les points de vente commandent directement."]},
  {T:"section",x:"La vente par correspondance / e-commerce"},
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
  {T:"hl",bg:"#e8f5e9",b:"#2E7D32",ti:"Services réservés / non réservés / concurrentiels",x:"Services RÉSERVÉS : monopole de La Poste. Aucune concurrence. Lettres jusqu'à 50g à l'intérieur du pays et en provenance de l'étranger. Mêmes prix sur tout le territoire.\n\nServices NON RÉSERVÉS : La Poste a un mandat de la Confédération mais la concurrence est autorisée. Ex : colis jusqu'à 20 kg, lettres > 50g, journaux en abonnement, paiements et virements.\n\nServices CONCURRENTIELS : La Poste propose librement, sans obligation d'universalité. Ex : messagerie rapide, colis > 20 kg, distribution matinale de journaux."},
  {T:"section",x:"La PostLogistics — 4 centres colis"},
  {T:"hl",bg:"#e3f2fd",b:"#1565C0",ti:"Les 4 centres colis PostLogistics en Suisse",x:"• Vétroz (Valais / VS)\n• Daillens (Vaud / VD)\n• Härkingen (Soleure / SO)\n• Frauenfeld (Thurgovie / TG)\n→ Ces 4 centres constituent l'épine dorsale du système d'acheminement des colis. La poste colis recourt au trafic combiné : collecte en camions, transport de nuit par le rail."},
  {T:"section",x:"Le réseau courrier suisse"},
  {T:"hl",bg:"#ede7f6",b:"#6A1B9A",ti:"CC, CL et CRLV — Infrastructure du réseau",x:"3 Centres Courrier (CC) : Zurich-Mülligen · Härkingen · Eclépens\n\n6 Centres Logistiques (CL) : Bâle · Gossau · Ostermundigen · Kriens · Genève · Cadenazzo\n\n2 Centres de Retours et Codage Vidéo (CRLV) : Sion · Coire\n\nLe réseau traite l'ensemble du courrier suisse et assure la redistribution vers les facteurs."},
  {T:"section",x:"Le tri automatique des colis — 8 étapes"},
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
  {T:"hl",bg:"#fce4ec",b:"#C62828",ti:"Les termes fondamentaux de l'emballage",x:"Matériel d'emballage : matière brute utilisée pour fabriquer l'emballage (papier, carton, bois, métal, verre, plastique).\nMoyen d'emballage : produit fabriqué à partir du matériel, destiné à contenir la marchandise. Ex : boîtes en carton, caisses, bouteilles, tubes, palettes.\nAccessoires d'emballage : éléments complétant le moyen d'emballage. Ex : colle, ruban adhésif, ficelle, matériau de rembourrage.\nEmballage = Moyen d'emballage + Accessoires d'emballage.\nPaquet = Produit emballé (contenu) + Emballage.\nUnité d'emballage = Paquet prêt à être envoyé ou entreposé.\nEmballage jetable : à usage unique, recyclé ou jeté après utilisation.\nEmballage repris (consigné) : réutilisable, retourné après usage."},
  {T:"section",x:"Les termes non officiels"},
  {T:"list",items:["Emballage de vente : présente la marchandise au client","Emballage factice : fait croire qu'il contient plus qu'il n'en contient réellement","Suremballage : protège l'emballage de vente lors du transport","Emballage final : film étirable ou rétractable pour le transport"]},
  {T:"section",x:"Les 5 fonctions de l'emballage"},
  {T:"list",items:["Protection INTÉRIEURE : protège la marchandise de l'humidité, lumière, chaleur, chocs, corrosion, vol","Protection EXTÉRIEURE : protège l'environnement des propriétés dangereuses du produit (tranchants, liquides, produits nocifs)","Entreposage : regroupe les objets en vrac pour leur stockage","Transport : facilite le chargement/déchargement, permet l'empilage","Vente : support publicitaire efficace, attire l'attention de l'acheteur"]},
  {T:"section",x:"Les contraintes de l'emballage"},
  {T:"hl",bg:"#fce4ec",b:"#C62828",ti:"Contraintes mécaniques détaillées",x:"Chutes : hauteur standard de test = 1,2 mètre. Facteurs : hauteur, poids du colis, sol, type d'impact.\nChocs : lors du chargement de palettes, wagons (chocs de manœuvre), conteneurs.\nCompression : risque d'écrasement. Prévention : couches intermédiaires, étagères, marchandises lourdes en bas.\nSecousses/vibrations : routes irrégulières, aiguillages, moteurs, mer. Les secousses dispersent le produit dans le matériau de rembourrage → choisir un emballage absorbant et solide."},
  {T:"text",x:"Contraintes climatiques : 5 zones sur Terre (polaire, continental, tempéré, sec, tropical). Problème majeur : la condensation. Solution : absorbeur d'humidité dans l'emballage si nécessaire."},
  {T:"text",x:"Protection contre la corrosion : méthode VCI (Volatile Corrosion Inhibitor). Composé volatile se déposant en couche protectrice sur les surfaces métalliques. Disponible en poudre, chips, feutre ou solvant."},
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
  {T:"hl",bg:"#ede7f6",b:"#4527A0",ti:"Structures de fond des récipients plastique",x:"Fond PLAT : pour le transport horizontal sur tapis roulants. Glisse facilement.\n\nFond TÊTE DE TAUREAU : renforcé par des bossages (bosses). Pour marchandises lourdes. INTERDIT sur les tapis roulants (les bossages bloquent le transport).\n\nFond MUNI D'ARÊTES (nervures) : meilleure stabilité d'empilage. Les arêtes s'encastrent dans le fond du récipient inférieur, évitant le glissement.\n\nFond GRILLAGÉ (ajouré ou fermé) : pour la branche alimentaire. Facilite le nettoyage et l'aération."},
  {T:"section",x:"Restrictions d'utilisation"},
  {T:"list",items:["Fond tête de taureau : NE PEUT PAS être utilisé sur des tapis roulants","Récipients alimentaires : doivent respecter les directives EU sur les matériaux alimentaires","Produits alimentaires : NE PEUVENT PAS être stockés dans des récipients plastique FERMÉS (aération nécessaire)"]},
  {T:"section",x:"Les systèmes de box"},
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
  {T:"list",items:["Ne pas renverser (flèches vers le haut) — sens d'empilage obligatoire","Fragile (verre brisé) — manipuler avec précaution","À protéger de l'humidité (parapluie) — protéger de la pluie","Ne pas ouvrir avec des outils pointus (couteau barré)","À protéger de la chaleur (soleil + maison) — ne pas exposer","Superposer X couches au maximum — limite d'empilage","Utilisation de crochet interdite (crochet barré)","Ne pas surcharger la marchandise (masse sur pointe)","Centre de gravité (croix dans cercle) — pour le levage","Placer les chaînes de levage ici (chaîne) — points d'élingage","Placer le diable ici / Ne pas prendre avec le diable","Saisir ici / Ne pas saisir ici (mains)","Ne pas utiliser un chariot élévateur (chariot barré)"]},
  {T:"section",x:"Terminologie multilingue des inscriptions"},
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
  {T:"hl",bg:"#f1f8e9",b:"#558B2F",ti:"Structure d'un envoi (lettre ou colis)",x:"1. Zone d'AFFRANCHISSEMENT : en haut à droite — timbre ou affranchissement machine.\n2. Zone de l'EXPÉDITEUR : en haut à gauche — nom et adresse de l'expéditeur.\n3. Zone de PUBLICITÉ : zone centrale gauche — message commercial de l'expéditeur (Promo post).\n4. Zone de LECTURE : zone centrale — lue optiquement par les machines OCR de tri.\n5. Champ de l'ADRESSE : zone du destinataire (marges : 10mm haut, 20mm bas, 15mm droite et gauche).\n6. Zone de CODAGE : bande en bas — code barre imprimé par la machine de tri pour le facteur."},
  {T:"section",x:"Les 7 règles d'or de l'adressage"},
  {T:"hl",bg:"#f1f8e9",b:"#558B2F",ti:"Règles impératives pour un adressage correct",x:"1. Alignement à GAUCHE obligatoire.\n2. De 3 à 6 lignes maximum — pas de ligne vide entre les lignes.\n3. Raison sociale, nom et prénom en TOUTES LETTRES (pas d'abréviations).\n4. Nom de RUE COMPLET (sans abréviation).\n5. Numéro de CASE POSTALE correct.\n6. Code postal (NPA) et LOCALITÉ complète.\n7. Pas de SOULIGNEMENT et pas d'ESPACEMENT entre les lettres."},
  {T:"section",x:"Les étiquettes d'identification"},
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
  {T:"hl",bg:"#f5f5f5",b:"#37474F",ti:"Limites réglementaires en Suisse",x:"Hauteur globale autorisée : 4,00 m\nLargeur : 2,55 m (2,60 m pour les véhicules frigorifiques)\nLongueur trains routiers (camion + remorque) : jusqu'à 18,75 m\nLongueur semi-remorques : jusqu'à 16,50 m\nSurface de chargement trains routiers : 36 Europalettes (18+18)\nSurface de chargement semi-remorques : 34 Europalettes"},
  {T:"hl",bg:"#f5f5f5",b:"#37474F",ti:"Tableau des poids légaux en Suisse",x:"CAMION TRACTEUR SEUL :\n2 essieux = 18 t / 3 essieux = 25 t / 4 essieux = 32 t / 5 essieux = 40 t\n\nSEMI-REMORQUE :\n3 essieux = 28 t / 4 essieux = 36 t / plus de 4 essieux = 40 t (plafond légal — accord bilatéral CH-UE 2005)"},
  {T:"section",x:"RPLP — Redevance sur le Trafic des Poids Lourds"},
  {T:"hl",bg:"#fff8e1",b:"#f59e0b",ti:"RPLP — Points clés",x:"Applicable dès 2005. Concerne tous les véhicules > 3,5 t.\nPlafond légal en Suisse : 40 tonnes (accord bilatéral UE-Suisse).\nFormule : Émissions du véhicule × Km parcourus × Poids (tracteur + remorque).\nEnregistrement : appareil électronique embarqué + tachygraphe + GPS de contrôle.\nObjectif : inciter à acquérir des véhicules moins polluants."},
  {T:"section",x:"Tachygraphe numérique"},
  {T:"list",items:["Vitesse instantanée et historique","Temps de conduite, de travail et de repos du chauffeur (obligations légales)","Kilomètres parcourus (kilométrage avant/après trajet)","Numéro de contrôle, date, identification du chauffeur"]},
  {T:"section",x:"Transport ferroviaire suisse"},
  {T:"hl",bg:"#e3f2fd",b:"#1565C0",ti:"Réseau ferroviaire suisse — Chiffres clés",x:"5'000 km de rails (réseau le plus dense d'Europe)\n3'000 km exploités par les CFF, le reste par des compagnies privées\n671 tunnels (dont 250 CFF) / 6'000 ponts ferroviaires\nNLFA : Nouvelles Lignes Ferroviaires à travers les Alpes (tunnels de base Gothard et Lötschberg)"},
  {T:"section",x:"Traité de Maastricht (1992) et compagnies ferroviaires"},
  {T:"hl",bg:"#e3f2fd",b:"#1565C0",ti:"Traité de Maastricht — Impact sur le rail européen",x:"Le traité de Maastricht (1992) a jeté les bases d'une nouvelle politique européenne sur 3 piliers. Pour le transport : il a permis d'unifier les locomotives, wagons et personnel pour rouler à l'international, facilitant le transit de marchandises entre pays sans changer d'engin."},
  {T:"list",items:["CFF Cargo : plus grand prestataire de fret ferroviaire en Suisse, filiale des CFF. Ses propres locomotives et personnel.","ChemOil Logistic : filiale de CFF Cargo, spécialisée dans le transport de pétrole et produits chimiques.","BLS Cargo (créé en 2001) : filiale des BLS. Transit alpin via Lötschberg, Simplon et Gothard.","RHB (Chemins de Fer Rhétiques) : voie étroite, dessert le canton des Grisons."]},
  {T:"section",x:"Types de wagons de marchandises"},
  {T:"list",items:["Wagon couvert : marchandises sensibles aux intempéries","Wagon spécial couvert : conditions de transport particulières","Wagon plat : marchandises résistantes aux intempéries","Wagon ouvert : vrac, minerais, graviers","Wagon silo : céréales, ciment, produits chimiques","Wagon plate-forme 4 essieux : marchandises lourdes et volumineuses"]},
  {T:"section",x:"Transport maritime"},
  {T:"text",x:"Le Rhin est la seule voie navigable internationale suisse. Il permet le transit de 10 à 12% des importations suisses et un tiers des huiles minérales. La Convention de Mannheim garantit le libre accès aux mers."},
  {T:"hl",bg:"#e3f2fd",b:"#1565C0",ti:"Conteneurs ISO et mesures maritimes",x:"1 TEU = 1 conteneur de 20 pieds (6,058 × 2,438 × 2,591 m)\n1 conteneur de 40 pieds = 2 TEU (12,129 m)\n\nChargement des navires : principe LIFO. Un officier de chargement est responsable du chargement et de l'équilibrage.\n\nMesures :\n• DWT (Deadweight Tons) : charge totale maximale transportable\n• TB (Tonnage Brut) : volume total du navire\n• TN (Tonnage Net) : espace commercial utilisable\n• TJB (Tonneau de Jauge Brute) : ancienne mesure\n• Tonnage Dues : taxe pour utilisation du port ou traversée de canal"},
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
    {term:"Traité de Maastricht (1992)",def:"Traité européen permettant d'unifier locomotives, wagons et personnel ferroviaires entre pays membres pour le transport international. Facilite le transit de marchandises sans changer d'engin aux frontières."},
    {term:"ChemOil Logistic",def:"Filiale de CFF Cargo spécialisée dans le transport ferroviaire de pétrole et produits chimiques sur le réseau suisse."},
    {term:"LIFO maritime",def:"Les conteneurs sur les navires sont chargés selon le principe LIFO (dernier chargé = premier déchargé). Un officier de chargement est responsable du chargement et de l'équilibrage du navire."},
    {term:"Types de wagons",def:"Wagon couvert (intempéries), wagon spécial couvert, wagon plat (vrac résistant), wagon ouvert (minerais), wagon silo (céréales/ciment), wagon plate-forme 4 essieux (charges lourdes)."},
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

// All chapters merged
const MODULE_C = [CH1,CH2,CH3,CH4,CH5,CH6,CH7,CH8,CH9,CH10,CH11,CH12,CH13,CH14];

// ─── UTILITY ─────────────────────────────────────────────────────────────────
const ProgressBar = ({ value, max, color }) => (
  <div style={{background:"#e5e7eb",borderRadius:"99px",height:"7px",overflow:"hidden",flex:1}}>
    <div style={{background:color,width:`${Math.min(100,Math.round((value/max)*100))}%`,height:"100%",borderRadius:"99px",transition:"width 0.4s"}}/>
  </div>
);

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

// ─── CONTENT BLOCK RENDERER ─────────────────────────────────────────────────
function renderBlock(block, idx) {
  switch (block.T) {
    case "intro":
      return <div key={idx} style={{background:"#eff6ff",borderLeft:"4px solid #1B4F8A",borderRadius:"0 8px 8px 0",padding:"12px 15px",marginBottom:"13px",fontSize:"13px",color:"#1e3a5f",lineHeight:1.75,fontWeight:"500"}}>{block.x}</div>;
    case "section":
      return <h3 key={idx} style={{fontSize:"13px",fontWeight:"800",color:"#111",margin:"18px 0 8px",borderBottom:"2px solid #e5e7eb",paddingBottom:"5px"}}>{block.x}</h3>;
    case "text":
      return <p key={idx} style={{fontSize:"13px",color:"#374151",lineHeight:1.75,marginBottom:"8px"}}>{block.x}</p>;
    case "list":
      return <ul key={idx} style={{margin:"0 0 11px",paddingLeft:"17px"}}>{block.items.map((item,i)=><li key={i} style={{fontSize:"12px",color:"#374151",lineHeight:1.65,marginBottom:"4px"}}>{item}</li>)}</ul>;
    case "hl":
      return (
        <div key={idx} style={{background:block.bg,border:`1px solid ${block.b}`,borderRadius:"9px",padding:"11px 14px",marginBottom:"11px"}}>
          <div style={{fontWeight:"800",fontSize:"11px",color:block.b,marginBottom:"5px"}}>💡 {block.ti}</div>
          <div style={{fontSize:"12px",color:"#374151",lineHeight:1.65,whiteSpace:"pre-line"}}>{block.x}</div>
        </div>
      );
    case "svg":
      return <div key={idx} style={{marginBottom:"12px",borderRadius:"9px",overflow:"hidden"}} dangerouslySetInnerHTML={{__html:block.code}}/>;
    case "gloss":
      return (
        <div key={idx} style={{background:"linear-gradient(135deg,#f0f9ff,#e0f2fe)",border:"1px solid #7dd3fc",borderRadius:"10px",padding:"13px 15px",marginBottom:"12px"}}>
          <div style={{fontWeight:"800",fontSize:"12px",color:"#0369a1",marginBottom:"10px",display:"flex",alignItems:"center",gap:"6px"}}>
            <span style={{fontSize:"15px"}}>📚</span> GLOSSAIRE DU CHAPITRE
          </div>
          {block.items.map((item,i)=>(
            <div key={i} style={{marginBottom:i<block.items.length-1?"9px":0,padding:"8px 11px",background:"rgba(255,255,255,0.75)",borderRadius:"7px",borderLeft:"3px solid #0ea5e9"}}>
              <div style={{fontWeight:"800",fontSize:"12px",color:"#0c4a6e"}}>{item.term}</div>
              <div style={{fontSize:"11.5px",color:"#374151",lineHeight:1.65,marginTop:"3px"}}>{item.def}</div>
            </div>
          ))}
        </div>
      );
    default: return null;
  }
}

// ─── CHAPTER VIEW ────────────────────────────────────────────────────────────
function ChapterView({ chapterId, cScores, onSaveScore, onBack }) {
  const ch = MODULE_C.find(c => c.id === chapterId);
  const [view, setView] = useState("content");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);       // single answer
  const [multiSel, setMultiSel] = useState([]);          // multi answer
  const [revealed, setRevealed] = useState(false);
  const [quizPaused, setQuizPaused] = useState(false);

  const startQuiz = () => { setView("quiz"); setCurrentQ(0); setAnswers([]); setSelected(null); setMultiSel([]); setRevealed(false); setQuizPaused(false); };

  const pauseForCourse = () => { setQuizPaused(true); setView("content"); };
  const resumeQuiz = () => { setQuizPaused(false); setView("quiz"); };

  const q = view === "quiz" ? ch.questions[currentQ] : null;
  const isMulti = q && q.multi === true;

  const handleSingleAnswer = (idx) => {
    if (revealed) return;
    setSelected(idx); setRevealed(true);
    setTimeout(() => {
      const newAns = [...answers, idx];
      if (currentQ < ch.questions.length - 1) { setAnswers(newAns); setCurrentQ(c => c+1); setSelected(null); setMultiSel([]); setRevealed(false); }
      else { const sc = newAns.filter((a,i) => { const qq = ch.questions[i]; return !qq.multi && a === qq.answer; }).length + answers.filter((a,i) => { const qq = ch.questions[i]; return qq.multi && JSON.stringify(a) === JSON.stringify(qq.answers.slice().sort()); }).length; onSaveScore(ch.id, calcScore([...answers, idx])); setAnswers(newAns); setView("result"); }
    }, 900);
  };

  const toggleMulti = (idx) => {
    if (revealed) return;
    setMultiSel(prev => prev.includes(idx) ? prev.filter(x => x !== idx) : [...prev, idx]);
  };

  const confirmMulti = () => {
    if (revealed || multiSel.length === 0) return;
    setRevealed(true);
    setTimeout(() => {
      const sorted = [...multiSel].sort();
      const newAns = [...answers, sorted];
      if (currentQ < ch.questions.length - 1) { setAnswers(newAns); setCurrentQ(c => c+1); setSelected(null); setMultiSel([]); setRevealed(false); }
      else { onSaveScore(ch.id, calcScore(newAns)); setAnswers(newAns); setView("result"); }
    }, 900);
  };

  function calcScore(ans) {
    return ans.reduce((sum, a, i) => {
      const qq = ch.questions[i];
      if (qq.multi) { const correct = [...qq.answers].sort().join(","); const given = Array.isArray(a) ? [...a].sort().join(",") : ""; return sum + (correct === given ? 1 : 0); }
      return sum + (a === qq.answer ? 1 : 0);
    }, 0);
  }

  const score = calcScore(answers);

  // Render quiz question
  function renderQuestion() {
    if (!q) return null;
    const isM = q.multi === true;
    return (
      <div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:"11px",color:"#6b7280",marginBottom:"4px"}}>
          <span>Question {currentQ+1} / {ch.questions.length}</span>
          <span style={{display:"flex",alignItems:"center",gap:"6px"}}>
            {isM && <span style={{background:"#7c3aed",color:"#fff",borderRadius:"20px",padding:"1px 7px",fontSize:"10px",fontWeight:"700"}}>✓ Plusieurs réponses</span>}
            <span>{calcScore(answers)} pts</span>
          </span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"10px"}}>
          <ProgressBar value={currentQ} max={ch.questions.length} color={ch.color}/>
          <span style={{fontSize:"10px",color:ch.color,fontWeight:"700",minWidth:"30px"}}>{Math.round(currentQ/ch.questions.length*100)}%</span>
        </div>
        <div style={{background:ch.color,color:ch.textColor,borderRadius:"11px",padding:"15px",marginBottom:"11px",fontSize:"13px",fontWeight:"700",lineHeight:1.55}}>
          {isM && <div style={{fontSize:"10px",opacity:.8,marginBottom:"5px"}}>⚠️ Sélectionne toutes les bonnes réponses puis valide</div>}
          {q.q}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
          {q.options.map((opt, idx) => {
            const correctArr = isM ? q.answers : [q.answer];
            const isCorrect = correctArr.includes(idx);
            const isSel = isM ? multiSel.includes(idx) : idx === selected;
            let bg = "#fff", bc = "#e5e7eb", tc = "#111", circ = "#f3f4f6", cc = "#6b7280";
            if (revealed) {
              if (isCorrect) { bg = "#f0fdf4"; bc = "#22c55e"; tc = "#166534"; circ = "#22c55e"; cc = "#fff"; }
              else if (isSel) { bg = "#fef2f2"; bc = "#ef4444"; tc = "#991b1b"; circ = "#ef4444"; cc = "#fff"; }
            } else if (isM && isSel) { bg = "#ede9fe"; bc = "#7c3aed"; tc = "#4c1d95"; circ = "#7c3aed"; cc = "#fff"; }
            const label = revealed && isCorrect ? "✓" : revealed && isSel && !isCorrect ? "✗" : isM ? (isSel ? "☑" : "□") : String.fromCharCode(65+idx);
            return (
              <button key={idx} onClick={() => isM ? toggleMulti(idx) : handleSingleAnswer(idx)} style={{background:bg,border:`2px solid ${bc}`,borderRadius:"9px",padding:"9px 12px",textAlign:"left",cursor:revealed?"default":"pointer",fontSize:"12px",fontWeight:"600",color:tc,display:"flex",alignItems:"center",gap:"9px",transition:"all 0.1s"}}>
                <span style={{width:"22px",height:"22px",borderRadius:isM?"4px":"50%",background:circ,color:cc,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"800",fontSize:"11px",flexShrink:0}}>{label}</span>
                {opt}
              </button>
            );
          })}
        </div>
        {isM && !revealed && (
          <button onClick={confirmMulti} disabled={multiSel.length===0} style={{width:"100%",marginTop:"10px",padding:"10px",borderRadius:"8px",border:"none",background:multiSel.length===0?"#e5e7eb":"#7c3aed",color:multiSel.length===0?"#9ca3af":"#fff",fontWeight:"800",fontSize:"13px",cursor:multiSel.length===0?"default":"pointer"}}>
            ✓ Valider ma sélection ({multiSel.length} choisie{multiSel.length>1?"s":""})
          </button>
        )}
      </div>
    );
  }

  // Tab handlers — work from any view including quiz and result
  const handleTabCours = () => { if (view==="quiz") setQuizPaused(true); setView("content"); };
  const handleTabGloss = () => { if (view==="quiz") setQuizPaused(true); setView("glossaire"); };
  const handleTabQCM  = () => { if (view==="quiz") return; if (quizPaused) resumeQuiz(); else startQuiz(); };

  return (
    <div style={{maxWidth:780,margin:"0 auto",padding:"14px"}}>
      {/* Chapter header */}
      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px",flexWrap:"wrap"}}>
        <div>
          <div style={{fontSize:"9px",fontFamily:"monospace",color:"#9ca3af"}}>CHAPITRE {ch.num} / 14</div>
          <h2 style={{margin:0,fontSize:"15px",fontWeight:"800"}}>{ch.icon} {ch.title}</h2>
        </div>
        {cScores[ch.id] !== undefined && (
          <span style={{marginLeft:"auto",background:ch.color,color:"#fff",borderRadius:"20px",padding:"3px 10px",fontSize:"11px",fontWeight:"700"}}>
            Dernier : {cScores[ch.id]}/{ch.questions.length}
          </span>
        )}
      </div>

      {/* Tabs — always visible in every view */}
      <div style={{display:"flex",gap:"7px",marginBottom:"14px"}}>
        <button onClick={handleTabCours} style={{padding:"7px 14px",borderRadius:"7px",border:"none",background:view==="content"?ch.color:"#f3f4f6",color:view==="content"?ch.textColor:"#374151",fontWeight:"700",cursor:"pointer",fontSize:"12px"}}>📖 Cours</button>
        <button onClick={handleTabGloss} style={{padding:"7px 14px",borderRadius:"7px",border:"none",background:view==="glossaire"?"#0369a1":"#f3f4f6",color:view==="glossaire"?"#fff":"#374151",fontWeight:"700",cursor:"pointer",fontSize:"12px"}}>📚 Glossaire</button>
        <button onClick={handleTabQCM} style={{padding:"7px 14px",borderRadius:"7px",border:"none",background:view==="quiz"?"#7c3aed":view==="result"?"#f3f4f6":"#f3f4f6",color:view==="quiz"?"#fff":"#374151",fontWeight:"700",cursor:view==="quiz"?"default":"pointer",fontSize:"12px"}}>
          {view==="quiz" ? `🧠 Q${currentQ+1} / ${ch.questions.length}` : (quizPaused ? `▶ Reprendre (Q${currentQ+1}/${ch.questions.length})` : `🧠 QCM (${ch.questions.length})`)}
        </button>
      </div>

      {view === "content" && (
        <div style={{background:"#fff",borderRadius:"12px",padding:"16px",border:"1px solid #e5e7eb"}}>
          {ch.content.filter(b => b.T !== "gloss").map((block,i) => renderBlock(block, i))}
          <div style={{borderTop:"1px solid #e5e7eb",marginTop:"16px",paddingTop:"14px",display:"flex",gap:"8px",flexWrap:"wrap"}}>
            <button onClick={handleTabGloss} style={{flex:1,padding:"9px",borderRadius:"8px",border:"1px solid #7dd3fc",background:"#f0f9ff",color:"#0369a1",fontWeight:"700",cursor:"pointer",fontSize:"12px"}}>📚 Glossaire</button>
            {quizPaused
              ? <button onClick={handleTabQCM} style={{flex:2,padding:"9px",borderRadius:"8px",border:"none",background:"#7c3aed",color:"#fff",fontWeight:"800",cursor:"pointer",fontSize:"12px"}}>▶ Reprendre le QCM (Q{currentQ+1}/{ch.questions.length})</button>
              : <button onClick={startQuiz} style={{flex:2,padding:"9px",borderRadius:"8px",border:"none",background:ch.color,color:ch.textColor,fontWeight:"800",cursor:"pointer",fontSize:"12px"}}>Je suis prêt · QCM ({ch.questions.length} questions) →</button>
            }
          </div>
        </div>
      )}

      {view === "glossaire" && (
        <div style={{background:"#fff",borderRadius:"12px",padding:"16px",border:"1px solid #e5e7eb"}}>
          <div style={{marginBottom:"12px",padding:"9px 13px",background:"#f0f9ff",borderRadius:"8px",border:"1px solid #bae6fd"}}>
            <div style={{fontWeight:"800",fontSize:"12px",color:"#0369a1"}}>📚 Glossaire — Termes clés du chapitre</div>
            <div style={{fontSize:"11px",color:"#0c4a6e",marginTop:"2px"}}>Termes et définitions essentiels pour l'examen CFC</div>
          </div>
          {ch.content.filter(b => b.T === "gloss").map((block,i) => renderBlock(block, i))}
          <div style={{borderTop:"1px solid #e5e7eb",marginTop:"13px",paddingTop:"12px",display:"flex",gap:"8px"}}>
            <button onClick={handleTabCours} style={{flex:1,padding:"9px",borderRadius:"8px",border:`2px solid ${ch.color}`,background:"#fff",color:"#111",fontWeight:"700",cursor:"pointer",fontSize:"12px"}}>📖 Cours</button>
            {quizPaused
              ? <button onClick={handleTabQCM} style={{flex:2,padding:"9px",borderRadius:"8px",border:"none",background:"#7c3aed",color:"#fff",fontWeight:"800",cursor:"pointer",fontSize:"12px"}}>▶ Reprendre le QCM</button>
              : <button onClick={startQuiz} style={{flex:2,padding:"9px",borderRadius:"8px",border:"none",background:ch.color,color:ch.textColor,fontWeight:"800",cursor:"pointer",fontSize:"12px"}}>Je suis prêt · QCM ({ch.questions.length} questions) →</button>
            }
          </div>
        </div>
      )}

      {view === "quiz" && renderQuestion()}

      {view === "result" && (
        <div>
          <div style={{background:score/ch.questions.length>=0.7?"linear-gradient(135deg,#166534,#15803d)":score/ch.questions.length>=0.5?"linear-gradient(135deg,#92400e,#b45309)":"linear-gradient(135deg,#991b1b,#b91c1c)",color:"#fff",borderRadius:"14px",padding:"22px",textAlign:"center",marginBottom:"14px"}}>
            <div style={{fontSize:"38px"}}>{score/ch.questions.length>=0.7?"🏆":score/ch.questions.length>=0.5?"📚":"💪"}</div>
            <div style={{fontSize:"32px",fontWeight:"900",lineHeight:1}}>{score}/{ch.questions.length}</div>
            <div style={{fontSize:"14px",marginTop:"5px",opacity:.9}}>{Math.round(score/ch.questions.length*100)}% · {score/ch.questions.length>=0.9?"Excellent !":score/ch.questions.length>=0.7?"Bien joué !":score/ch.questions.length>=0.5?"Continue tes révisions":"À retravailler"}</div>
          </div>
          <h3 style={{fontSize:"13px",marginBottom:"8px"}}>📋 Révision détaillée</h3>
          <div style={{display:"flex",flexDirection:"column",gap:"6px",marginBottom:"14px"}}>
            {ch.questions.map((qq, i) => {
              const isM = qq.multi === true;
              const given = answers[i];
              const ok = isM ? JSON.stringify([...((Array.isArray(given)?given:[given])??[]).sort()]) === JSON.stringify([...qq.answers].sort()) : given === qq.answer;
              return (
                <div key={i} style={{background:ok?"#f0fdf4":"#fef2f2",border:`1px solid ${ok?"#86efac":"#fca5a5"}`,borderRadius:"8px",padding:"9px 11px"}}>
                  <div style={{fontWeight:"700",fontSize:"11px",color:ok?"#166534":"#991b1b",marginBottom:ok?0:3}}>
                    {ok?"✓":"✗"} Q{i+1}{isM?" (multi)":""} : {qq.q}
                  </div>
                  {!ok && (
                    <div style={{fontSize:"11px",color:"#4b5563"}}>
                      Bonne{isM?"s":""} réponse{isM?"s":""} : <span style={{color:"#22c55e",fontWeight:"700"}}>{isM ? qq.answers.map(a=>qq.options[a]).join(" + ") : qq.options[qq.answer]}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div style={{display:"flex",gap:"7px",flexWrap:"wrap"}}>
            <button onClick={startQuiz} style={{flex:1,padding:"9px",borderRadius:"8px",border:"none",background:ch.color,color:ch.textColor,fontWeight:"700",cursor:"pointer",fontSize:"11px"}}>🔁 Refaire le QCM</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── QCM ALÉATOIRE ──────────────────────────────────────────────────────────
function QCMAleatoire({ onBack, onSaveScore, randScores }) {
  const NB = 20;
  const [questions, setQuestions] = useState(() => {
    const pool = MODULE_C.flatMap(ch => ch.questions.map(q => ({...q, _ch:ch.id, _chTitle:ch.title, _chColor:ch.color, _chTextColor:ch.textColor})));
    return shuffle(pool).slice(0, NB);
  });
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [multiSel, setMultiSel] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  const q = questions[currentQ];
  const isM = q && q.multi === true;

  function calcScore(ans) {
    return ans.reduce((sum,a,i)=>{
      const qq=questions[i];
      if(qq.multi){const c=[...qq.answers].sort().join(",");const g=Array.isArray(a)?[...a].sort().join(","):"";return sum+(c===g?1:0);}
      return sum+(a===qq.answer?1:0);
    },0);
  }

  const proceed = (newAns) => {
    if (currentQ < questions.length - 1) {
      setAnswers(newAns); setCurrentQ(c=>c+1); setSelected(null); setMultiSel([]); setRevealed(false);
    } else {
      const sc = calcScore(newAns);
      onSaveScore(sc);
      setAnswers(newAns); setDone(true);
    }
  };

  const handleSingle = (idx) => {
    if (revealed) return;
    setSelected(idx); setRevealed(true);
    setTimeout(() => proceed([...answers, idx]), 900);
  };

  const toggleM = (idx) => { if (revealed) return; setMultiSel(p => p.includes(idx)?p.filter(x=>x!==idx):[...p,idx]); };
  const confirmM = () => {
    if (revealed || multiSel.length===0) return;
    setRevealed(true);
    setTimeout(() => proceed([...answers, [...multiSel].sort()]), 900);
  };

  const score = calcScore(answers);

  if (done) {
    const pct = Math.round(score/NB*100);
    return (
      <div style={{maxWidth:780,margin:"0 auto",padding:"14px"}}>
        <div style={{background:pct>=70?"linear-gradient(135deg,#166534,#15803d)":pct>=50?"linear-gradient(135deg,#92400e,#b45309)":"linear-gradient(135deg,#991b1b,#b91c1c)",color:"#fff",borderRadius:"16px",padding:"26px",textAlign:"center",marginBottom:"16px"}}>
          <div style={{fontSize:"50px"}}>{pct>=80?"🏆":pct>=60?"📚":"💪"}</div>
          <div style={{fontSize:"13px",opacity:.8,marginBottom:"6px"}}>QCM Aléatoire — 20 questions tous chapitres</div>
          <div style={{fontSize:"42px",fontWeight:"900",lineHeight:1}}>{score}/{NB}</div>
          <div style={{fontSize:"16px",marginTop:"7px",opacity:.9}}>{pct}% · {pct>=90?"Excellent !":pct>=70?"Bien joué !":pct>=50?"Continue tes révisions":"À retravailler"}</div>
        </div>
        <h3 style={{fontSize:"13px",marginBottom:"8px"}}>📋 Révision ({NB} questions)</h3>
        <div style={{display:"flex",flexDirection:"column",gap:"5px",marginBottom:"14px"}}>
          {questions.map((qq,i)=>{
            const isM2=qq.multi===true; const given=answers[i];
            const ok=isM2?JSON.stringify([...(Array.isArray(given)?given:[given??-1]).sort()].sort())===JSON.stringify([...qq.answers].sort()):given===qq.answer;
            return (
              <div key={i} style={{background:ok?"#f0fdf4":"#fef2f2",border:`1px solid ${ok?"#86efac":"#fca5a5"}`,borderRadius:"8px",padding:"8px 11px"}}>
                <div style={{fontSize:"9px",fontWeight:"700",color:qq._chColor,marginBottom:"2px"}}>{qq._chTitle}</div>
                <div style={{fontWeight:"700",fontSize:"11px",color:ok?"#166534":"#991b1b",marginBottom:ok?0:3}}>{ok?"✓":"✗"} {qq.q}</div>
                {!ok&&<div style={{fontSize:"11px",color:"#4b5563"}}>Bonne{isM2?"s":""} réponse{isM2?"s":""} : <span style={{color:"#22c55e",fontWeight:"700"}}>{isM2?qq.answers.map(a=>qq.options[a]).join(" + "):qq.options[qq.answer]}</span></div>}
              </div>
            );
          })}
        </div>
        <div style={{display:"flex",gap:"8px"}}>
          <button onClick={()=>{setDone(false);const pool=MODULE_C.flatMap(ch=>ch.questions.map(q=>({...q,_ch:ch.id,_chTitle:ch.title,_chColor:ch.color,_chTextColor:ch.textColor})));setQuestions(shuffle(pool).slice(0,NB));setCurrentQ(0);setAnswers([]);setSelected(null);setMultiSel([]);setRevealed(false);}} style={{flex:1,padding:"11px",borderRadius:"9px",border:"none",background:"#7c3aed",color:"#fff",fontWeight:"800",cursor:"pointer",fontSize:"13px"}}>🔀 Nouveau QCM aléatoire</button>
          <button onClick={onBack} style={{flex:1,padding:"11px",borderRadius:"9px",border:"none",background:"#37474F",color:"#fff",fontWeight:"700",cursor:"pointer",fontSize:"13px"}}>← Module C</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{maxWidth:780,margin:"0 auto",padding:"14px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px",flexWrap:"wrap"}}>
        <div>
          <div style={{fontSize:"9px",fontFamily:"monospace",color:"#9ca3af"}}>QCM ALÉATOIRE</div>
          <h2 style={{margin:0,fontSize:"15px",fontWeight:"800"}}>🎲 {NB} questions aléatoires</h2>
        </div>
        {randScores.length > 0 && <span style={{marginLeft:"auto",background:"#7c3aed",color:"#fff",borderRadius:"20px",padding:"3px 10px",fontSize:"11px",fontWeight:"700"}}>Meilleur : {Math.max(...randScores)}/{NB}</span>}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:"11px",color:"#6b7280",marginBottom:"4px"}}>
        <span>Question {currentQ+1} / {NB}</span>
        <span style={{display:"flex",alignItems:"center",gap:"6px"}}>
          {isM&&<span style={{background:"#7c3aed",color:"#fff",borderRadius:"20px",padding:"1px 7px",fontSize:"10px",fontWeight:"700"}}>✓ Plusieurs réponses</span>}
          <span>{score} pts</span>
        </span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"8px"}}>
        <ProgressBar value={currentQ} max={NB} color="#7c3aed"/>
        <span style={{fontSize:"10px",color:"#7c3aed",fontWeight:"700",minWidth:"30px"}}>{Math.round(currentQ/NB*100)}%</span>
      </div>
      <div style={{fontSize:"9px",fontWeight:"700",color:q._chColor,marginBottom:"5px",background:`${q._chColor}18`,padding:"3px 8px",borderRadius:"20px",display:"inline-block"}}>{q._chTitle}</div>
      <div style={{background:q._chColor,color:q._chTextColor||"#fff",borderRadius:"11px",padding:"15px",margin:"6px 0 11px",fontSize:"13px",fontWeight:"700",lineHeight:1.55}}>
        {isM&&<div style={{fontSize:"10px",opacity:.8,marginBottom:"5px"}}>⚠️ Sélectionne toutes les bonnes réponses puis valide</div>}
        {q.q}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
        {q.options.map((opt,idx)=>{
          const correctArr=isM?q.answers:[q.answer];
          const isCorrect=correctArr.includes(idx);
          const isSel=isM?multiSel.includes(idx):idx===selected;
          let bg="#fff",bc="#e5e7eb",tc="#111",circ="#f3f4f6",cc="#6b7280";
          if(revealed){if(isCorrect){bg="#f0fdf4";bc="#22c55e";tc="#166534";circ="#22c55e";cc="#fff";}else if(isSel){bg="#fef2f2";bc="#ef4444";tc="#991b1b";circ="#ef4444";cc="#fff";}}
          else if(isM&&isSel){bg="#ede9fe";bc="#7c3aed";tc="#4c1d95";circ="#7c3aed";cc="#fff";}
          const lbl=revealed&&isCorrect?"✓":revealed&&isSel&&!isCorrect?"✗":isM?(isSel?"☑":"□"):String.fromCharCode(65+idx);
          return (
            <button key={idx} onClick={()=>isM?toggleM(idx):handleSingle(idx)} style={{background:bg,border:`2px solid ${bc}`,borderRadius:"9px",padding:"9px 12px",textAlign:"left",cursor:revealed?"default":"pointer",fontSize:"12px",fontWeight:"600",color:tc,display:"flex",alignItems:"center",gap:"9px"}}>
              <span style={{width:"22px",height:"22px",borderRadius:isM?"4px":"50%",background:circ,color:cc,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"800",fontSize:"11px",flexShrink:0}}>{lbl}</span>
              {opt}
            </button>
          );
        })}
      </div>
      {isM&&!revealed&&(
        <button onClick={confirmM} disabled={multiSel.length===0} style={{width:"100%",marginTop:"10px",padding:"10px",borderRadius:"8px",border:"none",background:multiSel.length===0?"#e5e7eb":"#7c3aed",color:multiSel.length===0?"#9ca3af":"#fff",fontWeight:"800",fontSize:"13px",cursor:multiSel.length===0?"default":"pointer"}}>
          ✓ Valider ma sélection ({multiSel.length} choisie{multiSel.length>1?"s":""})
        </button>
      )}
    </div>
  );
}

// ─── MODULE C DASHBOARD ───────────────────────────────────────────────────────
function ModuleCDashboard({ cScores, randScores, onSelectChapter, onStartRandom }) {
  const done = MODULE_C.filter(c => cScores[c.id] !== undefined);
  const totalScore = done.reduce((a,c)=>a+cScores[c.id],0);
  const maxScore = done.reduce((a,c)=>a+MODULE_C.find(m=>m.id===c.id).questions.length,0);
  const passed = done.filter(c=>cScores[c.id]/MODULE_C.find(m=>m.id===c.id).questions.length>=0.7).length;
  return (
    <div style={{maxWidth:920,margin:"0 auto",padding:"16px 13px"}}>
      <div style={{background:"linear-gradient(135deg,#0277BD,#01579b)",borderRadius:"14px",padding:"18px 22px",marginBottom:"16px",color:"#fff",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-25,right:-25,width:110,height:110,background:"rgba(255,255,255,0.07)",borderRadius:"50%"}}/>
        <div style={{position:"relative"}}>
          <div style={{fontSize:"9px",letterSpacing:".15em",color:"#90caf9",fontFamily:"monospace",marginBottom:"4px"}}>FORMATION CFC · LOGISTICIEN</div>
          <h2 style={{fontSize:"clamp(15px,3.5vw,22px)",fontWeight:"800",margin:"0 0 3px"}}>Module C — Logistique La Poste</h2>
          <p style={{margin:"0 0 13px",opacity:.8,fontSize:"12px"}}>14 chapitres · Cours · Glossaire · QCM mixtes (réponse unique & multiple)</p>
          <div style={{display:"flex",gap:"10px",flexWrap:"wrap",marginBottom:"13px"}}>
            {[{l:"Chapitres tentés",v:`${done.length}/14`},{l:"Score total",v:done.length?`${totalScore}/${maxScore}`:"—"},{l:"≥ 70% réussis",v:`${passed}/${done.length||0}`}].map(s=>(
              <div key={s.l} style={{background:"rgba(255,255,255,0.12)",borderRadius:"8px",padding:"8px 12px"}}>
                <div style={{fontSize:"16px",fontWeight:"800"}}>{s.v}</div>
                <div style={{fontSize:"9px",opacity:.7}}>{s.l}</div>
              </div>
            ))}
          </div>
          <button onClick={onStartRandom} style={{background:"#7c3aed",color:"#fff",border:"none",borderRadius:"9px",padding:"10px 20px",fontWeight:"800",fontSize:"13px",cursor:"pointer",display:"flex",alignItems:"center",gap:"8px"}}>
            <span style={{fontSize:"16px"}}>🎲</span>
            QCM Aléatoire — 20 questions tirées de tous les chapitres
            {randScores.length>0&&<span style={{background:"rgba(255,255,255,0.2)",borderRadius:"20px",padding:"2px 8px",fontSize:"10px"}}>Meilleur : {Math.max(...randScores)}/20</span>}
          </button>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"11px"}}>
        <div style={{fontWeight:"800",fontSize:"10px",letterSpacing:".1em",textTransform:"uppercase",color:"#0277BD"}}>📖 Les 14 chapitres</div>
        <div style={{flex:1,height:"1px",background:"#e5e7eb"}}/>
        <span style={{fontSize:"10px",color:"#9ca3af"}}>{done.length}/14 tentés</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"9px"}}>
        {MODULE_C.map(ch=>{
          const s=cScores[ch.id]; const attempted=s!==undefined;
          const pct=attempted?Math.round(s/ch.questions.length*100):0;
          const ok=attempted&&s/ch.questions.length>=0.7;
          return (
            <div key={ch.id} onClick={()=>onSelectChapter(ch.id)} style={{background:"#fff",borderRadius:"10px",padding:"13px",cursor:"pointer",border:`2px solid ${attempted?ch.color:"#e5e7eb"}`,boxShadow:attempted?`0 2px 10px ${ch.color}20`:"0 1px 4px rgba(0,0,0,0.05)",transition:"transform 0.15s",position:"relative",overflow:"hidden"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)"}}
              onMouseLeave={e=>{e.currentTarget.style.transform=""}}>
              <div style={{position:"absolute",top:0,right:0,width:44,height:44,background:`${ch.color}12`,borderRadius:"0 10px 0 44px"}}/>
              <div style={{fontSize:"20px",marginBottom:"4px"}}>{ch.icon}</div>
              <div style={{fontSize:"8px",fontFamily:"monospace",color:"#9ca3af",marginBottom:"2px"}}>CH. {ch.num}</div>
              <div style={{fontSize:"11px",fontWeight:"800",color:"#111",marginBottom:"6px",lineHeight:1.3}}>{ch.title}</div>
              <div style={{display:"flex",alignItems:"center",gap:"5px",marginBottom:"5px"}}>
                <ProgressBar value={pct} max={100} color={ch.color}/>
                <span style={{fontSize:"9px",fontWeight:"700",color:ch.color,minWidth:"26px"}}>{attempted?`${pct}%`:"—"}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{background:attempted?ch.color:"#f3f4f6",color:attempted?"#fff":"#6b7280",borderRadius:"20px",padding:"2px 7px",fontSize:"9px",fontWeight:"700"}}>
                  {attempted?(ok?`✓ ${s}/${ch.questions.length}`:`↺ ${s}/${ch.questions.length}`):"À commencer"}
                </span>
                <span style={{fontSize:"9px",color:"#d1d5db"}}>{ch.questions.length} Q</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── GLOSSAIRE MODULE VIEW ────────────────────────────────────────────────────
function ModuleView({ moduleId, scores, onSaveScore, onBack }) {
  const mod = MODULES.find(m => m.id === moduleId);
  const [view, setView] = useState("glossary");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = mod.glossary.filter(g => g.term.toLowerCase().includes(search.toLowerCase())||g.def.toLowerCase().includes(search.toLowerCase()));
  const startQuiz = () => { setView("quiz"); setCurrentQ(0); setAnswers([]); setSelected(null); setRevealed(false); };
  const handleAnswer = (idx) => {
    if (revealed) return;
    setSelected(idx); setRevealed(true);
    setTimeout(() => {
      const newAns = [...answers, idx];
      if (currentQ < mod.questions.length-1) { setAnswers(newAns); setCurrentQ(q=>q+1); setSelected(null); setRevealed(false); }
      else { onSaveScore(mod.id, newAns.filter((a,i)=>a===mod.questions[i].answer).length); setAnswers(newAns); setView("result"); }
    }, 900);
  };
  const score = answers.filter((a,i)=>a===mod.questions[i].answer).length;
  return (
    <div style={{maxWidth:780,margin:"0 auto",padding:"14px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"9px",marginBottom:"12px"}}>
        <button onClick={onBack} style={{background:"#f3f4f6",border:"none",borderRadius:"7px",padding:"5px 11px",cursor:"pointer",fontSize:"11px",fontWeight:"600"}}>← Glossaire</button>
        <div><div style={{fontSize:"9px",fontFamily:"monospace",color:"#9ca3af"}}>MODULE {mod.id}</div><h2 style={{margin:0,fontSize:"15px",fontWeight:"800"}}>{mod.icon} {mod.title}</h2></div>
        {scores[mod.id]!==undefined&&<span style={{marginLeft:"auto",background:mod.color,color:mod.textColor,borderRadius:"20px",padding:"3px 10px",fontSize:"11px",fontWeight:"700"}}>Dernier : {scores[mod.id]}/{mod.questions.length}</span>}
      </div>
      {view!=="quiz"&&view!=="result"&&(
        <div style={{display:"flex",gap:"7px",marginBottom:"12px"}}>
          <button onClick={()=>setView("glossary")} style={{padding:"7px 14px",borderRadius:"7px",border:"none",background:view==="glossary"?mod.color:"#f3f4f6",color:view==="glossary"?mod.textColor:"#374151",fontWeight:"700",cursor:"pointer",fontSize:"12px"}}>📖 Glossaire ({mod.glossary.length})</button>
          <button onClick={startQuiz} style={{padding:"7px 14px",borderRadius:"7px",border:"none",background:"#f3f4f6",color:"#374151",fontWeight:"700",cursor:"pointer",fontSize:"12px"}}>🧠 QCM</button>
        </div>
      )}
      {view==="glossary"&&(
        <div>
          <input placeholder="🔍 Rechercher un terme..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:"100%",padding:"8px 12px",borderRadius:"8px",border:"2px solid #e5e7eb",fontSize:"13px",marginBottom:"10px",outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}/>
          <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
            {filtered.map((g,i)=>(
              <div key={i} style={{background:"#fff",borderLeft:`4px solid ${mod.color}`,border:`1px solid #e5e7eb`,borderRadius:"8px",padding:"11px 13px"}}>
                <div style={{fontWeight:"800",fontSize:"13px",color:"#111",marginBottom:"3px"}}>{g.term}</div>
                <div style={{fontSize:"12px",color:"#4b5563",lineHeight:1.6}}>{g.def}</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"14px"}}>
            <button onClick={startQuiz} style={{background:mod.color,color:mod.textColor,border:"none",borderRadius:"8px",padding:"10px 24px",fontSize:"12px",fontWeight:"800",cursor:"pointer"}}>Je suis prêt · Passer le QCM →</button>
          </div>
        </div>
      )}
      {view==="quiz"&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:"11px",color:"#6b7280",marginBottom:"4px"}}><span>Question {currentQ+1} / {mod.questions.length}</span><span>{score} correctes</span></div>
          <ProgressBar value={currentQ} max={mod.questions.length} color={mod.color}/>
          <div style={{background:mod.color,color:mod.textColor,borderRadius:"11px",padding:"15px",margin:"10px 0 10px",fontSize:"14px",fontWeight:"700",lineHeight:1.5}}>{mod.questions[currentQ].q}</div>
          <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
            {mod.questions[currentQ].options.map((opt,idx)=>{
              const correct=idx===mod.questions[currentQ].answer,isSel=idx===selected;
              let bg="#fff",bc="#e5e7eb",tc="#111",circ="#f3f4f6",cc="#6b7280";
              if(revealed){if(correct){bg="#f0fdf4";bc="#22c55e";tc="#166534";circ="#22c55e";cc="#fff";}else if(isSel){bg="#fef2f2";bc="#ef4444";tc="#991b1b";circ="#ef4444";cc="#fff";}}
              return <button key={idx} onClick={()=>handleAnswer(idx)} style={{background:bg,border:`2px solid ${bc}`,borderRadius:"8px",padding:"9px 12px",textAlign:"left",cursor:revealed?"default":"pointer",fontSize:"12px",fontWeight:"600",color:tc,display:"flex",alignItems:"center",gap:"8px"}}><span style={{width:"21px",height:"21px",borderRadius:"50%",background:circ,color:cc,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"800",fontSize:"10px",flexShrink:0}}>{revealed&&correct?"✓":revealed&&isSel?"✗":String.fromCharCode(65+idx)}</span>{opt}</button>;
            })}
          </div>
        </div>
      )}
      {view==="result"&&(
        <div>
          <div style={{background:score/mod.questions.length>=0.7?"linear-gradient(135deg,#166534,#15803d)":"linear-gradient(135deg,#991b1b,#b91c1c)",color:"#fff",borderRadius:"12px",padding:"20px",textAlign:"center",marginBottom:"12px"}}>
            <div style={{fontSize:"36px"}}>{score/mod.questions.length>=0.7?"🏆":"💪"}</div>
            <div style={{fontSize:"30px",fontWeight:"900",lineHeight:1}}>{score}/{mod.questions.length}</div>
            <div style={{fontSize:"13px",marginTop:"5px",opacity:.9}}>{Math.round(score/mod.questions.length*100)}%</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"5px",marginBottom:"12px"}}>
            {mod.questions.map((q,i)=>{const ok=answers[i]===q.answer;return(
              <div key={i} style={{background:ok?"#f0fdf4":"#fef2f2",border:`1px solid ${ok?"#86efac":"#fca5a5"}`,borderRadius:"7px",padding:"8px 11px"}}>
                <div style={{fontWeight:"700",fontSize:"11px",color:ok?"#166534":"#991b1b",marginBottom:ok?0:3}}>{ok?"✓":"✗"} Q{i+1} : {q.q}</div>
                {!ok&&<div style={{fontSize:"11px",color:"#4b5563"}}>Bonne réponse : <span style={{color:"#22c55e",fontWeight:"700"}}>{q.options[q.answer]}</span></div>}
              </div>
            );})}
          </div>
          <div style={{display:"flex",gap:"7px"}}>
            <button onClick={()=>setView("glossary")} style={{flex:1,padding:"9px",borderRadius:"7px",border:`2px solid ${mod.color}`,background:"#fff",color:"#111",fontWeight:"700",cursor:"pointer",fontSize:"11px"}}>📖 Glossaire</button>
            <button onClick={startQuiz} style={{flex:1,padding:"9px",borderRadius:"7px",border:"none",background:mod.color,color:mod.textColor,fontWeight:"700",cursor:"pointer",fontSize:"11px"}}>🔁 Refaire</button>
            <button onClick={onBack} style={{flex:1,padding:"9px",borderRadius:"7px",border:"none",background:"#1B4F8A",color:"#fff",fontWeight:"700",cursor:"pointer",fontSize:"11px"}}>← Glossaire</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── GLOSSAIRE DASHBOARD ──────────────────────────────────────────────────────
function GlossaireDashboard({ scores, onSelectModule }) {
  const done = MODULES.filter(m => scores[m.id] !== undefined);
  const tot = done.reduce((a,m)=>a+scores[m.id],0);
  const maxTot = done.reduce((a,m)=>a+m.questions.length,0);
  return (
    <div style={{maxWidth:920,margin:"0 auto",padding:"16px 13px"}}>
      <div style={{background:"linear-gradient(135deg,#1B4F8A,#0d2f57)",borderRadius:"14px",padding:"18px 22px",marginBottom:"18px",color:"#fff",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-20,right:-20,width:100,height:100,background:"rgba(255,204,0,0.12)",borderRadius:"50%"}}/>
        <div style={{position:"relative"}}>
          <div style={{fontSize:"9px",letterSpacing:".12em",color:"#FFCC00",fontFamily:"monospace",marginBottom:"4px"}}>SECTION 2</div>
          <h2 style={{fontSize:"clamp(14px,3.5vw,20px)",fontWeight:"800",margin:"0 0 3px"}}>Glossaire des Termes Techniques</h2>
          <p style={{margin:"0 0 12px",opacity:.8,fontSize:"12px"}}>⚠️ À vérifier — certains termes peuvent différer en Suisse</p>
          <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
            {[{l:"Terminés",v:`${done.length}/${MODULES.length}`},{l:"Score",v:done.length?`${tot}/${maxTot}`:"—"},{l:"Réussite",v:done.length?`${Math.round(tot/maxTot*100)}%`:"—"}].map(s=>(
              <div key={s.l} style={{background:"rgba(255,255,255,0.12)",borderRadius:"7px",padding:"7px 11px"}}>
                <div style={{fontSize:"15px",fontWeight:"800"}}>{s.v}</div>
                <div style={{fontSize:"9px",opacity:.7}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"9px"}}>
        {MODULES.map(mod=>{
          const s=scores[mod.id]; const attempted=s!==undefined;
          return (
            <div key={mod.id} onClick={()=>onSelectModule(mod.id)} style={{background:"#fff",borderRadius:"10px",padding:"13px",cursor:"pointer",border:`2px solid ${attempted?mod.color:"#e5e7eb"}`,boxShadow:attempted?`0 2px 10px ${mod.color}20`:"0 1px 4px rgba(0,0,0,0.05)",transition:"transform 0.15s",position:"relative",overflow:"hidden"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)"}}
              onMouseLeave={e=>{e.currentTarget.style.transform=""}}>
              <div style={{position:"absolute",top:0,right:0,width:44,height:44,background:`${mod.color}12`,borderRadius:"0 10px 0 44px"}}/>
              <div style={{fontSize:"20px",marginBottom:"4px"}}>{mod.icon}</div>
              <div style={{fontSize:"9px",fontFamily:"monospace",color:"#9ca3af",marginBottom:"2px"}}>MODULE {mod.id}</div>
              <div style={{fontSize:"12px",fontWeight:"800",color:"#111",marginBottom:"2px"}}>{mod.title}</div>
              <div style={{fontSize:"10px",color:"#6b7280",marginBottom:"7px"}}>{mod.subtitle}</div>
              <div style={{display:"flex",alignItems:"center",gap:"5px",marginBottom:"5px"}}>
                <ProgressBar value={attempted?s:0} max={mod.questions.length} color={mod.color}/>
                <span style={{fontSize:"9px",fontWeight:"700",color:mod.color,minWidth:"28px"}}>{attempted?`${s}/${mod.questions.length}`:"—"}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{background:attempted?mod.color:"#f3f4f6",color:attempted?mod.textColor:"#6b7280",borderRadius:"20px",padding:"2px 7px",fontSize:"9px",fontWeight:"700"}}>{attempted?(s/mod.questions.length>=0.7?"✓ Réussi":"↺ Retravailler"):"À commencer"}</span>
                <span style={{fontSize:"9px",color:"#d1d5db"}}>{mod.glossary.length} termes</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ADMIN PANEL ─────────────────────────────────────────────────────────────
function AdminPanel({ scores, cScores, randScores, onResetAll, onResetModule, onResetChapter, onResetRand, onClose }) {
  const [tab, setTab] = useState("moduleC");
  const [confirmAll, setConfirmAll] = useState(false);
  const [confirmKey, setConfirmKey] = useState(null);
  const doConfirm = (key, action) => { if(confirmKey===key){action();setConfirmKey(null);}else{setConfirmKey(key);setTimeout(()=>setConfirmKey(null),3500);} };
  const cDone = MODULE_C.filter(c=>cScores[c.id]!==undefined);
  const gDone = MODULES.filter(m=>scores[m.id]!==undefined);
  const cTot = cDone.reduce((a,c)=>a+cScores[c.id],0);
  const cMax = cDone.reduce((a,c)=>a+MODULE_C.find(m=>m.id===c.id).questions.length,0);
  return (
    <>
      <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:100,backdropFilter:"blur(2px)"}}/>
      <div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"#fff",borderRadius:"14px",width:"min(490px,94vw)",maxHeight:"82vh",overflowY:"auto",zIndex:101,boxShadow:"0 20px 50px rgba(0,0,0,0.22)"}}>
        <div style={{background:"linear-gradient(135deg,#1e293b,#334155)",borderRadius:"14px 14px 0 0",padding:"13px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:2}}>
          <div><div style={{color:"#94a3b8",fontSize:"9px",letterSpacing:".12em",fontFamily:"monospace"}}>LOGILEARN</div><div style={{color:"#fff",fontWeight:"800",fontSize:"15px"}}>⚙️ Administration</div></div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,.1)",border:"none",borderRadius:"6px",color:"#fff",width:"26px",height:"26px",cursor:"pointer",fontSize:"13px"}}>✕</button>
        </div>
        <div style={{padding:"14px 18px"}}>
          <div style={{display:"flex",gap:"5px",marginBottom:"14px"}}>
            {[{k:"moduleC",l:"📖 Module C",n:cDone.length},{k:"rand",l:"🎲 Aléatoire",n:randScores.length},{k:"glossaire",l:"📚 Glossaire",n:gDone.length},{k:"global",l:"⚠️ Global",n:null}].map(t=>(
              <button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,padding:"6px 4px",borderRadius:"7px",border:"none",cursor:"pointer",background:tab===t.k?"#1e293b":"#f1f5f9",color:tab===t.k?"#fff":"#475569",fontWeight:"700",fontSize:"9px"}}>
                {t.l}{t.n!==null?` (${t.n})`:""}
              </button>
            ))}
          </div>
          {tab==="moduleC"&&(
            <>
              <div style={{background:"#f8fafc",borderRadius:"8px",padding:"9px",marginBottom:"11px",display:"flex",gap:"10px"}}>
                {[{l:"Tentés",v:`${cDone.length}/14`},{l:"Réussite moy.",v:cDone.length?Math.round(cTot/cMax*100)+"%":"—"},{l:"≥ 70%",v:cDone.filter(c=>cScores[c.id]/MODULE_C.find(m=>m.id===c.id).questions.length>=0.7).length}].map((s,i)=>(
                  <div key={i} style={{textAlign:"center",flex:1}}><div style={{fontWeight:"800",fontSize:"15px"}}>{s.v}</div><div style={{fontSize:"9px",color:"#94a3b8"}}>{s.l}</div></div>
                ))}
              </div>
              <div style={{fontWeight:"700",fontSize:"9px",color:"#374151",marginBottom:"6px",letterSpacing:".05em"}}>REMISE À ZÉRO PAR CHAPITRE</div>
              {cDone.length===0?<div style={{background:"#f1f5f9",borderRadius:"7px",padding:"10px",textAlign:"center",fontSize:"11px",color:"#94a3b8"}}>Aucun chapitre tenté.</div>:
                MODULE_C.map(ch=>{
                  if(cScores[ch.id]===undefined)return null;
                  const key="c:"+ch.id; const isC=confirmKey===key;
                  const pct=Math.round(cScores[ch.id]/ch.questions.length*100);
                  return (<div key={ch.id} style={{display:"flex",alignItems:"center",gap:"6px",background:"#f8fafc",borderRadius:"6px",padding:"7px 9px",marginBottom:"5px",border:"0.5px solid #e5e7eb"}}>
                    <span style={{fontSize:"14px"}}>{ch.icon}</span>
                    <div style={{flex:1}}><div style={{fontWeight:"700",fontSize:"10px"}}>Ch. {ch.num} · {ch.title}</div><div style={{fontSize:"9px",color:pct>=70?"#16a34a":"#dc2626",fontWeight:"600"}}>{cScores[ch.id]}/{ch.questions.length} · {pct}%</div></div>
                    <button onClick={()=>doConfirm(key,()=>onResetChapter(ch.id))} style={{padding:"3px 8px",borderRadius:"5px",border:"none",cursor:"pointer",background:isC?"#dc2626":"#fee2e2",color:isC?"#fff":"#dc2626",fontWeight:"700",fontSize:"9px",whiteSpace:"nowrap"}}>{isC?"⚠️ Confirmer ?":"🗑️ Effacer"}</button>
                  </div>);
                })}
            </>
          )}
          {tab==="rand"&&(
            <>
              <div style={{background:"#f8fafc",borderRadius:"8px",padding:"10px",marginBottom:"11px"}}>
                <div style={{fontSize:"10px",color:"#6b7280",marginBottom:"4px"}}>QCM Aléatoire — Historique des scores ({randScores.length} tentative{randScores.length>1?"s":""})</div>
                {randScores.length===0?<div style={{fontSize:"12px",color:"#9ca3af"}}>Aucun QCM aléatoire tenté.</div>:
                  <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                    {randScores.map((s,i)=><span key={i} style={{background:s/20>=0.7?"#dcfce7":"#fef2f2",color:s/20>=0.7?"#166534":"#991b1b",borderRadius:"20px",padding:"2px 8px",fontSize:"11px",fontWeight:"700"}}>#{i+1}: {s}/20 ({Math.round(s/20*100)}%)</span>)}
                  </div>}
              </div>
              <button onClick={()=>{const key="rand:all";if(confirmKey===key){onResetRand();setConfirmKey(null);}else{setConfirmKey(key);setTimeout(()=>setConfirmKey(null),3500);}}} style={{width:"100%",padding:"9px",borderRadius:"7px",background:confirmKey==="rand:all"?"#dc2626":"#fef2f2",color:confirmKey==="rand:all"?"#fff":"#dc2626",fontWeight:"800",fontSize:"11px",cursor:"pointer",border:`0.5px solid ${confirmKey==="rand:all"?"#dc2626":"#fca5a5"}`}}>
                {confirmKey==="rand:all"?"⚠️ Confirmer la suppression ?":"🗑️ Effacer l'historique des scores aléatoires"}
              </button>
            </>
          )}
          {tab==="glossaire"&&(
            <>
              <div style={{fontWeight:"700",fontSize:"9px",color:"#374151",marginBottom:"6px",letterSpacing:".05em"}}>REMISE À ZÉRO PAR MODULE</div>
              {gDone.length===0?<div style={{background:"#f1f5f9",borderRadius:"7px",padding:"10px",textAlign:"center",fontSize:"11px",color:"#94a3b8"}}>Aucun module tenté.</div>:
                gDone.map(mod=>{
                  const key="g:"+mod.id;const isC=confirmKey===key;const pct=Math.round(scores[mod.id]/mod.questions.length*100);
                  return (<div key={mod.id} style={{display:"flex",alignItems:"center",gap:"6px",background:"#f8fafc",borderRadius:"6px",padding:"7px 9px",marginBottom:"5px",border:"0.5px solid #e5e7eb"}}>
                    <span style={{fontSize:"14px"}}>{mod.icon}</span>
                    <div style={{flex:1}}><div style={{fontWeight:"700",fontSize:"10px"}}>{mod.title}</div><div style={{fontSize:"9px",color:pct>=70?"#16a34a":"#dc2626",fontWeight:"600"}}>{scores[mod.id]}/{mod.questions.length} · {pct}%</div></div>
                    <button onClick={()=>doConfirm(key,()=>onResetModule(mod.id))} style={{padding:"3px 8px",borderRadius:"5px",border:"none",cursor:"pointer",background:isC?"#dc2626":"#fee2e2",color:isC?"#fff":"#dc2626",fontWeight:"700",fontSize:"9px",whiteSpace:"nowrap"}}>{isC?"⚠️ Confirmer ?":"🗑️ Effacer"}</button>
                  </div>);
                })}
            </>
          )}
          {tab==="global"&&(
            <>
              <div style={{background:"#fff8f0",border:"0.5px solid #fed7aa",borderRadius:"7px",padding:"10px",marginBottom:"10px",fontSize:"11px",color:"#92400e"}}>⚠️ Efface <strong>tous les scores</strong>. Action irréversible.</div>
              <button onClick={()=>{if(confirmAll){onResetAll();setConfirmAll(false);}else{setConfirmAll(true);setTimeout(()=>setConfirmAll(false),3500);}}} style={{width:"100%",padding:"10px",borderRadius:"7px",background:confirmAll?"#dc2626":"#fef2f2",color:confirmAll?"#fff":"#dc2626",fontWeight:"800",fontSize:"12px",cursor:"pointer",border:`0.5px solid ${confirmAll?"#dc2626":"#fca5a5"}`}}>
                {confirmAll?"⚠️ Cliquer encore pour confirmer":"🔄 Tout remettre à zéro"}
              </button>
            </>
          )}
          <button onClick={onClose} style={{width:"100%",marginTop:"10px",padding:"8px",borderRadius:"7px",border:"0.5px solid #e5e7eb",background:"#f8fafc",fontSize:"11px",cursor:"pointer",color:"#374151",fontWeight:"600"}}>Fermer</button>
        </div>
      </div>
    </>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [section, setSection] = useState("moduleC");
  const [activeModule, setActiveModule] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);
  const [showRandom, setShowRandom] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [scores, setScores] = useState(() => { try { return JSON.parse(localStorage.getItem("ll_scores")||"{}"); } catch { return {}; } });
  const [cScores, setCScores] = useState(() => { try { return JSON.parse(localStorage.getItem("ll_cscores")||"{}"); } catch { return {}; } });
  const [randScores, setRandScores] = useState(() => { try { return JSON.parse(localStorage.getItem("ll_rand")||"[]"); } catch { return []; } });

  useEffect(() => { try { localStorage.setItem("ll_scores",JSON.stringify(scores)); } catch {} }, [scores]);
  useEffect(() => { try { localStorage.setItem("ll_cscores",JSON.stringify(cScores)); } catch {} }, [cScores]);
  useEffect(() => { try { localStorage.setItem("ll_rand",JSON.stringify(randScores)); } catch {} }, [randScores]);

  const saveScore = (id, sc) => setScores(p=>({...p,[id]:sc}));
  const saveCScore = (id, sc) => setCScores(p=>({...p,[id]:sc}));
  const saveRandScore = (sc) => setRandScores(p=>[...p, sc]);
  const resetAll = () => { setScores({}); setCScores({}); setRandScores([]); };
  const resetModule = (id) => setScores(p=>{const n={...p};delete n[id];return n;});
  const resetChapter = (id) => setCScores(p=>{const n={...p};delete n[id];return n;});
  const navTo = (key) => { setSection(key); setActiveModule(null); setActiveChapter(null); setShowRandom(false); };

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#f8fafc 0%,#eff6ff 100%)",fontFamily:"'Segoe UI',system-ui,sans-serif"}}>
      <div style={{background:"#fff",borderBottom:"1px solid #e5e7eb",position:"sticky",top:0,zIndex:20,boxShadow:"0 1px 5px rgba(0,0,0,0.07)"}}>
        <div style={{maxWidth:"960px",margin:"0 auto",padding:"0 14px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"9px",padding:"7px 0",borderBottom:"1px solid #f1f5f9"}}>
            <div onClick={()=>navTo("moduleC")} style={{display:"flex",alignItems:"center",gap:"7px",cursor:"pointer"}}>
              <div style={{width:"25px",height:"25px",background:"#FFCC00",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px"}}>✉️</div>
              <div><div style={{fontWeight:"800",fontSize:"12px",lineHeight:1.1}}>LogiLearn</div><div style={{fontSize:"8px",color:"#9ca3af"}}>La Poste Suisse · CFC Logisticien</div></div>
            </div>
            <div style={{marginLeft:"auto"}}>
              <button onClick={()=>setShowAdmin(true)} style={{background:"#f1f5f9",border:"1px solid #e2e8f0",borderRadius:"6px",padding:"4px 10px",cursor:"pointer",fontSize:"11px",fontWeight:"700",color:"#475569"}}>⚙️ Admin</button>
            </div>
          </div>
          <div style={{display:"flex",gap:"2px",overflowX:"auto"}}>
            {[{key:"moduleC",label:"📖 Module C"},{key:"glossaire",label:"📚 Glossaire des termes techniques"}].map(item=>{
              const active=section===item.key&&!activeModule&&!activeChapter&&!showRandom;
              return <button key={item.key} onClick={()=>navTo(item.key)} style={{padding:"7px 12px",border:"none",background:"transparent",cursor:"pointer",fontWeight:active?"800":"600",fontSize:"12px",color:active?"#1B4F8A":"#6b7280",borderBottom:active?"2.5px solid #1B4F8A":"2.5px solid transparent",whiteSpace:"nowrap",transition:"all 0.15s"}}>{item.label}</button>;
            })}
          </div>
        </div>
      </div>

      {section==="moduleC"&&!activeChapter&&!showRandom&&<ModuleCDashboard cScores={cScores} randScores={randScores} onSelectChapter={id=>setActiveChapter(id)} onStartRandom={()=>setShowRandom(true)}/>}
      {section==="moduleC"&&activeChapter&&<ChapterView chapterId={activeChapter} cScores={cScores} onSaveScore={saveCScore} onBack={()=>setActiveChapter(null)}/>}
      {section==="moduleC"&&showRandom&&<QCMAleatoire onBack={()=>setShowRandom(false)} onSaveScore={saveRandScore} randScores={randScores}/>}
      {section==="glossaire"&&!activeModule&&<GlossaireDashboard scores={scores} onSelectModule={id=>setActiveModule(id)}/>}
      {section==="glossaire"&&activeModule&&<ModuleView moduleId={activeModule} scores={scores} onSaveScore={saveScore} onBack={()=>setActiveModule(null)}/>}

      {showAdmin&&<AdminPanel scores={scores} cScores={cScores} randScores={randScores} onResetAll={()=>{resetAll();setShowAdmin(false);}} onResetModule={resetModule} onResetChapter={resetChapter} onResetRand={()=>setRandScores([])} onClose={()=>setShowAdmin(false)}/>}
    </div>
  );
}
