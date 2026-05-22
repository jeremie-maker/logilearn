import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const MODULES = [
  {
    id: 1,
    title: "La Poste Suisse",
    subtitle: "Terminologie spécifique",
    icon: "✉️",
    color: "#FFCC00",
    textColor: "#1a1a1a",
    glossary: [
      { term: "Envoi recommandé (R)", def: "Courrier dont la remise est confirmée par signature du destinataire. Tracé de bout en bout." },
      { term: "Colis Priority", def: "Colis livré le lendemain en Suisse, identifiable par l'étiquette jaune Priority." },
      { term: "Colis Economy", def: "Colis standard livré en 2–4 jours ouvrables, moins cher que Priority." },
      { term: "PostPac", def: "Ancienne appellation des colis postaux suisses, remplacée par la gamme Colis Priority/Economy." },
      { term: "Avis de passage", def: "Document laissé par le facteur en cas d'absence du destinataire, permettant de récupérer l'envoi au bureau de poste." },
      { term: "Point de dépôt", def: "Lieu partenaire (ex. Migros, Coop) où l'on peut déposer ou retirer des envois postaux." },
      { term: "MyPost 24", def: "Automate postal disponible 24h/24 permettant le dépôt et le retrait de colis." },
      { term: "Centre de tri", def: "Installation où les envois sont triés mécaniquement et manuellement avant acheminement." },
      { term: "Lettre A", def: "Courrier prioritaire livré le lendemain ouvrable en Suisse." },
      { term: "Lettre B", def: "Courrier économique livré en 2–3 jours ouvrables." },
      { term: "Postcode (NPA)", def: "Numéro Postal d'Acheminement à 4 chiffres identifiant la zone de distribution en Suisse." },
      { term: "EMS (Express Mail Service)", def: "Service international express de La Poste, avec délai garanti et suivi complet." },
      { term: "Valeur déclarée (VD)", def: "Envoi assuré pour une valeur déclarée par l'expéditeur en cas de perte ou dommage." },
      { term: "Remboursement (RB)", def: "Service permettant à l'expéditeur de percevoir le montant d'une facture à la livraison." },
      { term: "Consigne de livraison", def: "Instruction spéciale du destinataire sur la façon de livrer son colis (voisin, casier, etc.)." },
      { term: "HUB postal", def: "Centre logistique central où convergent les envois de plusieurs régions avant redistribution." },
      { term: "Tour de facteur", def: "Secteur géographique attribué à un facteur pour la distribution quotidienne." },
      { term: "Scanning", def: "Lecture du code-barres à chaque étape de traitement pour assurer la traçabilité de l'envoi." },
    ],
    questions: [
      { q: "Que signifie NPA en contexte postal suisse ?", options: ["Numéro Postal d'Acheminement", "Numéro de Produit Agréé", "Norme Postale d'Accréditation", "Numéro de Passage Automatique"], answer: 0 },
      { q: "Quelle couleur identifie l'étiquette d'un Colis Priority ?", options: ["Rouge", "Bleue", "Jaune", "Verte"], answer: 2 },
      { q: "Qu'est-ce que MyPost 24 ?", options: ["Une application mobile", "Un automate postal 24h/24", "Un service de recommandé", "Un centre de tri"], answer: 1 },
      { q: "Qu'est-ce qu'un avis de passage ?", options: ["Un bon de livraison signé", "Un document laissé en cas d'absence pour récupérer un envoi", "Une notification SMS", "Un reçu de dépôt"], answer: 1 },
      { q: "La Lettre A est livrée en combien de jours ?", options: ["Le jour même", "Le lendemain ouvrable", "2–3 jours", "4–5 jours"], answer: 1 },
      { q: "Que signifie EMS ?", options: ["Envoi Manuel Spécial", "Express Mail Service", "Envoi Massif Standardisé", "European Mail System"], answer: 1 },
      { q: "Qu'est-ce qu'un HUB postal ?", options: ["Un bureau de poste rural", "Un point de dépôt partenaire", "Un centre logistique central de convergence", "Un automate de tri"], answer: 2 },
      { q: "Le service 'Remboursement' (RB) permet à l'expéditeur de :", options: ["Rembourser un envoi endommagé", "Percevoir le montant d'une facture à la livraison", "Retourner un colis", "Déclarer une valeur d'assurance"], answer: 1 },
      { q: "Qu'est-ce que le scanning en logistique postale ?", options: ["La vérification du poids", "La lecture du code-barres pour assurer la traçabilité", "La numérisation du courrier", "Le tri optique des lettres"], answer: 1 },
      { q: "Un Point de dépôt est :", options: ["Uniquement un bureau de poste", "Un lieu partenaire comme Migros ou Coop pour déposer/retirer des envois", "Un automate MyPost 24", "Un véhicule de livraison"], answer: 1 },
    ],
  },
  {
    id: 2,
    title: "Transport & Acheminement",
    subtitle: "Flux et réseaux",
    icon: "🚛",
    color: "#1B4F8A",
    textColor: "#ffffff",
    glossary: [
      { term: "Fret", def: "Marchandises transportées par voie terrestre, aérienne ou maritime." },
      { term: "Groupage", def: "Regroupement de plusieurs petits envois de différents clients dans un même véhicule pour optimiser le transport." },
      { term: "Messagerie", def: "Transport rapide de petits colis ou documents, souvent avec délai garanti." },
      { term: "Palettisation", def: "Regroupement de marchandises sur une palette pour faciliter la manutention et le transport." },
      { term: "Chargement / Déchargement", def: "Opérations de mise en place des marchandises dans/hors du véhicule de transport." },
      { term: "Feuille de route (FR)", def: "Document accompagnant le chauffeur listant les livraisons et enlèvements à effectuer." },
      { term: "Bon de livraison (BL)", def: "Document confirmant la remise d'une marchandise au destinataire, souvent signé." },
      { term: "Bordereau de transport", def: "Liste récapitulative des envois pris en charge par un transporteur." },
      { term: "Flux tendu", def: "Organisation logistique minimisant les stocks par des livraisons fréquentes et précises." },
      { term: "Cross-docking", def: "Transfert direct de marchandises du quai de réception au quai d'expédition sans stockage intermédiaire." },
      { term: "Dernier kilomètre", def: "Dernière étape de livraison, du dépôt local jusqu'au destinataire final. La plus coûteuse." },
      { term: "Capacité de chargement", def: "Volume ou poids maximal qu'un véhicule peut transporter légalement." },
      { term: "Tournée", def: "Circuit de livraison planifié pour optimiser les déplacements d'un chauffeur-livreur." },
      { term: "Ramassage (Pickup)", def: "Collecte de colis chez les expéditeurs par le transporteur." },
      { term: "Lettre de voiture (LV)", def: "Contrat de transport entre expéditeur, transporteur et destinataire, document légal." },
    ],
    questions: [
      { q: "Qu'est-ce que le cross-docking ?", options: ["Un stockage longue durée", "Un transfert direct réception→expédition sans stockage", "Un tri manuel des colis", "Une technique de palettisation"], answer: 1 },
      { q: "Qu'est-ce que le 'dernier kilomètre' ?", options: ["La distance max légale d'un camion", "La dernière étape de livraison jusqu'au destinataire final", "Le dernier tri avant livraison", "La vérification finale des colis"], answer: 1 },
      { q: "Qu'est-ce que le groupage ?", options: ["Le tri par poids", "Le regroupement de petits envois de différents clients dans un même véhicule", "L'emballage des colis", "La facturation groupée"], answer: 1 },
      { q: "Que contient une feuille de route ?", options: ["Les factures clients", "La liste des livraisons et enlèvements à effectuer", "Les horaires de tri", "Le plan du centre de tri"], answer: 1 },
      { q: "La palettisation sert à :", options: ["Peser les marchandises", "Regrouper les marchandises sur palette pour faciliter manutention", "Emballer individuellement chaque article", "Trier les colis par destination"], answer: 1 },
      { q: "Un Bon de Livraison (BL) est :", options: ["Un contrat de transport", "Un document confirmant la remise d'une marchandise, souvent signé", "Une feuille de route", "Un bordereau de douane"], answer: 1 },
      { q: "Le 'flux tendu' consiste à :", options: ["Accélérer le tri manuel", "Minimiser les stocks par des livraisons fréquentes", "Augmenter la capacité des entrepôts", "Créer des réserves de sécurité importantes"], answer: 1 },
      { q: "Qu'est-ce que la messagerie en logistique ?", options: ["L'envoi de SMS aux clients", "Le transport rapide de petits colis avec délai garanti", "La gestion des emails", "Le service client postal"], answer: 1 },
      { q: "La lettre de voiture est :", options: ["Un reçu de paiement", "Un contrat légal entre expéditeur, transporteur et destinataire", "Une étiquette de colis", "Un bon de commande"], answer: 1 },
      { q: "Qu'est-ce qu'un ramassage (Pickup) ?", options: ["La livraison à domicile", "La collecte de colis chez les expéditeurs", "Le tri au centre de distribution", "Le retour de colis refusés"], answer: 1 },
    ],
  },
  {
    id: 3,
    title: "Gestion des Stocks",
    subtitle: "Entrepôt & inventaire",
    icon: "📦",
    color: "#2E7D32",
    textColor: "#ffffff",
    glossary: [
      { term: "Stock de sécurité", def: "Quantité minimale de stock maintenue pour faire face aux imprévus (rupture fournisseur, pic de demande)." },
      { term: "Inventaire", def: "Comptage physique et/ou informatique de l'ensemble des articles présents en entrepôt." },
      { term: "FIFO (First In, First Out)", def: "Méthode de rotation : les premiers articles entrés sont les premiers sortis. Essentiel pour les produits périssables." },
      { term: "LIFO (Last In, First Out)", def: "Méthode de rotation : les derniers articles entrés sont les premiers sortis. Moins courante." },
      { term: "Picking", def: "Opération de prélèvement des articles dans l'entrepôt pour préparer une commande." },
      { term: "Référence (SKU)", def: "Stock Keeping Unit : code unique identifiant un article précis dans le système de gestion." },
      { term: "Rupture de stock", def: "Situation où un article est épuisé et ne peut plus être fourni, entraînant un retard ou perte de vente." },
      { term: "Réapprovisionnement", def: "Processus de renouvellement du stock lorsqu'il atteint le seuil de commande." },
      { term: "Adresse de stockage", def: "Localisation précise d'un article dans l'entrepôt (allée, travée, niveau, emplacement)." },
      { term: "WMS (Warehouse Management System)", def: "Logiciel de gestion d'entrepôt gérant les emplacements, mouvements de stocks et préparations." },
      { term: "Taux de rotation", def: "Indicateur mesurant la fréquence à laquelle un stock est renouvelé sur une période donnée." },
      { term: "Zone de réception", def: "Aire dédiée à la réception et au contrôle des marchandises arrivant en entrepôt." },
      { term: "Zone d'expédition", def: "Aire où les commandes préparées sont regroupées avant chargement pour livraison." },
      { term: "Masse volumique", def: "Rapport entre le poids et le volume d'un envoi, utilisé pour calculer le poids taxable." },
      { term: "Conditionnement", def: "Mode d'emballage et de présentation des produits (unité, carton, palette)." },
    ],
    questions: [
      { q: "Que signifie FIFO ?", options: ["First In, First Out", "Fast Item Flow Organization", "Freight Import / Freight Output", "Final Inventory For Operations"], answer: 0 },
      { q: "Qu'est-ce que le picking ?", options: ["L'emballage final des commandes", "Le prélèvement d'articles en entrepôt pour préparer une commande", "La réception des marchandises", "L'inventaire physique"], answer: 1 },
      { q: "Le stock de sécurité sert à :", options: ["Stocker les articles défectueux", "Faire face aux imprévus comme une rupture fournisseur", "Réduire les coûts de stockage", "Améliorer le taux de rotation"], answer: 1 },
      { q: "Que signifie SKU ?", options: ["Standard Kit Utility", "Stock Keeping Unit (code unique d'article)", "System Key Update", "Shipping Key Unit"], answer: 1 },
      { q: "Un WMS est :", options: ["Un véhicule de manutention", "Un logiciel de gestion d'entrepôt", "Une méthode de tri", "Un type de palette"], answer: 1 },
      { q: "Une rupture de stock signifie :", options: ["Un surplus de marchandises", "Un article épuisé ne pouvant plus être fourni", "Un stock mal rangé", "Un inventaire incomplet"], answer: 1 },
      { q: "L'adresse de stockage indique :", options: ["Le prix d'un article", "La localisation précise d'un article dans l'entrepôt", "Le fournisseur d'un produit", "La date d'expiration"], answer: 1 },
      { q: "Le taux de rotation mesure :", options: ["La vitesse des caristes", "La fréquence de renouvellement d'un stock sur une période", "Le nombre d'inventaires annuels", "Le taux d'erreur de picking"], answer: 1 },
      { q: "La méthode FIFO est particulièrement importante pour :", options: ["Les produits électroniques", "Les produits périssables", "Les palettes vides", "Les documents administratifs"], answer: 1 },
      { q: "La masse volumique sert à :", options: ["Peser les camions", "Calculer le poids taxable d'un envoi", "Mesurer la taille des entrepôts", "Compter les articles en stock"], answer: 1 },
    ],
  },
  {
    id: 4,
    title: "Qualité & Sécurité",
    subtitle: "Normes et prévention",
    icon: "🛡️",
    color: "#C62828",
    textColor: "#ffffff",
    glossary: [
      { term: "EPI (Équipement de Protection Individuelle)", def: "Matériel de protection porté par les travailleurs : gants, chaussures de sécurité, casque, gilet fluorescent." },
      { term: "Manutention manuelle", def: "Déplacement, levage ou transport de charges par la force humaine. Soumis à des règles ergonomiques." },
      { term: "Charge maximale", def: "Poids limite légal pouvant être soulevé manuellement (25 kg recommandé en Suisse)." },
      { term: "Gestes et postures", def: "Techniques de manutention correctes pour éviter les troubles musculo-squelettiques (TMS)." },
      { term: "TMS (Troubles Musculo-Squelettiques)", def: "Pathologies liées aux gestes répétitifs, mauvaises postures ou efforts excessifs." },
      { term: "Fiche de données de sécurité (FDS)", def: "Document obligatoire décrivant les risques et précautions d'emploi d'un produit dangereux." },
      { term: "Signalisation de sécurité", def: "Panneaux et marquages au sol indiquant les dangers, obligations et interdictions en entrepôt." },
      { term: "Non-conformité", def: "Écart constaté par rapport à une norme, procédure ou spécification définie." },
      { term: "Traçabilité", def: "Capacité à suivre l'historique complet d'un produit ou envoi à chaque étape de son parcours." },
      { term: "Contrôle qualité", def: "Vérification systématique que les produits ou services respectent les normes établies." },
      { term: "Incident", def: "Événement non désiré pouvant causer des dommages, même sans blessure constatée." },
      { term: "Procédure d'urgence", def: "Protocole défini à suivre en cas d'incident grave (incendie, blessure, déversement)." },
      { term: "Audit qualité", def: "Évaluation systématique des processus pour vérifier leur conformité aux standards." },
      { term: "KPI (Key Performance Indicator)", def: "Indicateur clé de performance mesurant l'efficacité d'un processus logistique." },
      { term: "Taux de réclamation", def: "Proportion d'envois ayant fait l'objet d'une réclamation client sur le total des envois traités." },
    ],
    questions: [
      { q: "Que signifie EPI ?", options: ["Équipement de Protection Individuelle", "Enregistrement de Prévention des Incidents", "Espace de Préparation Industrielle", "Évaluation des Processus Internes"], answer: 0 },
      { q: "Qu'est-ce qu'un TMS ?", options: ["Trouble de Management Stratégique", "Trouble Musculo-Squelettique", "Transport de Matière Sensible", "Traçage de Messages Spéciaux"], answer: 1 },
      { q: "La charge maximale recommandée en Suisse est :", options: ["10 kg", "15 kg", "25 kg", "40 kg"], answer: 2 },
      { q: "Qu'est-ce qu'une non-conformité ?", options: ["Un incident grave", "Un écart par rapport à une norme ou procédure définie", "Un article manquant en stock", "Un colis endommagé"], answer: 1 },
      { q: "La traçabilité permet de :", options: ["Calculer les coûts de transport", "Suivre l'historique complet d'un produit à chaque étape", "Gérer les stocks en temps réel", "Former les nouveaux employés"], answer: 1 },
      { q: "Un KPI est :", options: ["Un type d'emballage", "Un logiciel d'entrepôt", "Un indicateur clé de performance", "Un protocole de sécurité"], answer: 2 },
      { q: "La FDS (Fiche de données de sécurité) concerne :", options: ["Les procédures d'inventaire", "Les produits dangereux", "Les horaires de travail", "Les véhicules de transport"], answer: 1 },
      { q: "Un audit qualité sert à :", options: ["Former les nouveaux employés", "Vérifier la conformité des processus aux standards", "Calculer les salaires", "Organiser les tournées"], answer: 1 },
      { q: "Le taux de réclamation mesure :", options: ["Le nombre de réclamations par employé", "La proportion d'envois ayant généré une réclamation client", "Le délai de traitement des plaintes", "Le coût des remboursements"], answer: 1 },
      { q: "Les 'gestes et postures' visent à prévenir :", options: ["Les retards de livraison", "Les troubles musculo-squelettiques (TMS)", "Les pertes de colis", "Les erreurs de tri"], answer: 1 },
    ],
  },
  {
    id: 5,
    title: "Douanes & International",
    subtitle: "Commerce mondial",
    icon: "🌍",
    color: "#6A1B9A",
    textColor: "#ffffff",
    glossary: [
      { term: "Déclaration en douane", def: "Formalité obligatoire pour déclarer le contenu, la valeur et l'origine des marchandises lors d'une importation/exportation." },
      { term: "CN22 / CN23", def: "Formulaires douaniers internationaux joints aux envois postaux selon leur valeur (CN22 jusqu'à 300 CHF, CN23 au-delà)." },
      { term: "Droits de douane", def: "Taxes prélevées par les autorités douanières sur les marchandises importées." },
      { term: "TVA à l'importation", def: "Taxe sur la valeur ajoutée perçue lors de l'entrée de marchandises en Suisse (7,7% taux normal)." },
      { term: "Valeur en douane", def: "Valeur déclarée de la marchandise servant de base au calcul des droits et taxes." },
      { term: "Pays d'origine", def: "Pays où le produit a été fabriqué ou substantiellement transformé pour la dernière fois." },
      { term: "Numéro tarifaire (Position douanière)", def: "Code de classification internationale des marchandises selon le Système Harmonisé (SH)." },
      { term: "Fret aérien", def: "Transport de marchandises par voie aérienne, plus rapide mais plus coûteux." },
      { term: "Incoterms", def: "Termes commerciaux internationaux définissant la répartition des coûts et risques entre acheteur et vendeur." },
      { term: "DDP (Delivered Duty Paid)", def: "Incoterm : le vendeur prend en charge tous les frais et droits jusqu'à la livraison finale." },
      { term: "EXW (Ex Works)", def: "Incoterm : l'acheteur est responsable de tous les frais dès la sortie des locaux du vendeur." },
      { term: "Blocage douanier", def: "Retenue d'un envoi par les autorités douanières pour contrôle ou paiement de droits." },
      { term: "Zone franche", def: "Zone géographique exemptée de droits de douane pour certaines activités commerciales." },
      { term: "Lettre de crédit (LC)", def: "Garantie bancaire internationale assurant le paiement au vendeur si les conditions contractuelles sont remplies." },
      { term: "Accord de libre-échange", def: "Traité entre pays réduisant ou éliminant les barrières douanières (ex. : Suisse–UE)." },
    ],
    questions: [
      { q: "Le formulaire CN22 est utilisé pour des envois jusqu'à :", options: ["100 CHF", "300 CHF", "1000 CHF", "5000 CHF"], answer: 1 },
      { q: "Le taux normal de TVA à l'importation en Suisse est :", options: ["5,5%", "7,7%", "8,1%", "10%"], answer: 1 },
      { q: "Que signifie DDP en Incoterms ?", options: ["Direct Delivery Process", "Delivered Duty Paid", "Distribution and Dispatch Protocol", "Duty Declared Package"], answer: 1 },
      { q: "La valeur en douane sert à :", options: ["Calculer le poids taxable", "Servir de base au calcul des droits et taxes", "Identifier le pays d'origine", "Vérifier le contenu de l'envoi"], answer: 1 },
      { q: "Qu'est-ce qu'un blocage douanier ?", options: ["Un emballage renforcé", "Une retenue d'envoi par les douanes pour contrôle ou paiement", "Un retard de tri postal", "Une erreur d'adressage"], answer: 1 },
      { q: "Les Incoterms définissent :", options: ["Les tarifs postaux internationaux", "La répartition des coûts et risques entre acheteur et vendeur", "Les délais de livraison garantis", "Les normes d'emballage international"], answer: 1 },
      { q: "EXW signifie que :", options: ["Le vendeur livre jusqu'au port", "L'acheteur est responsable dès la sortie des locaux du vendeur", "Les droits de douane sont inclus", "La livraison est garantie en 24h"], answer: 1 },
      { q: "La 'position douanière' est :", options: ["L'adresse du bureau de douane", "Un code de classification internationale des marchandises", "L'emplacement d'un colis en douane", "La date de passage en douane"], answer: 1 },
      { q: "Le fret aérien est caractérisé par :", options: ["Son faible coût", "Sa rapidité mais son coût plus élevé", "Sa capacité illimitée", "L'absence de formalités douanières"], answer: 1 },
      { q: "Un accord de libre-échange vise à :", options: ["Augmenter les droits de douane", "Réduire ou éliminer les barrières douanières entre pays", "Standardiser les emballages", "Contrôler les flux migratoires"], answer: 1 },
    ],
  },
  {
    id: 6,
    title: "Logistique Générale",
    subtitle: "Concepts fondamentaux",
    icon: "⚙️",
    color: "#37474F",
    textColor: "#ffffff",
    glossary: [
      { term: "Chaîne logistique (Supply Chain)", def: "Ensemble des étapes de la production à la livraison finale d'un produit au client." },
      { term: "Flux physique", def: "Déplacement réel des marchandises d'un point à un autre dans la chaîne logistique." },
      { term: "Flux d'information", def: "Données et documents accompagnant ou précédant les flux physiques (bons de commande, factures, etc.)." },
      { term: "Logistique amont", def: "Gestion des flux de marchandises des fournisseurs vers l'entreprise." },
      { term: "Logistique aval", def: "Gestion des flux de marchandises de l'entreprise vers le client final." },
      { term: "Prestataire logistique (3PL)", def: "Tiers externalisant des services logistiques (transport, stockage, distribution)." },
      { term: "Optimisation des flux", def: "Amélioration continue des processus pour réduire les délais, coûts et gaspillages." },
      { term: "Lean logistics", def: "Application des principes Lean (élimination des gaspillages) à la logistique." },
      { term: "Just-In-Time (JIT)", def: "Méthode visant à recevoir les marchandises exactement quand elles sont nécessaires, réduisant les stocks." },
      { term: "EDI (Electronic Data Interchange)", def: "Échange électronique standardisé de documents commerciaux entre partenaires logistiques." },
      { term: "Code-barres / QR Code", def: "Systèmes d'identification optique permettant la lecture rapide d'informations sur un article ou envoi." },
      { term: "RFID", def: "Radio Frequency IDentification : technologie d'identification sans contact par ondes radio, utilisée pour le suivi des stocks." },
      { term: "Délai de livraison (Lead Time)", def: "Temps total entre la commande et la réception par le client." },
      { term: "Reverse logistics", def: "Logistique inverse gérant les retours de produits du client vers l'entreprise ou fournisseur." },
      { term: "Mutualisation", def: "Partage de ressources logistiques (entrepôts, véhicules) entre plusieurs entreprises pour réduire les coûts." },
    ],
    questions: [
      { q: "Que signifie 'Supply Chain' ?", options: ["Chaîne de production uniquement", "Chaîne logistique complète de la production à la livraison", "Réseau de fournisseurs", "Système de transport"], answer: 1 },
      { q: "Le Just-In-Time (JIT) vise à :", options: ["Augmenter les stocks de sécurité", "Recevoir les marchandises exactement quand elles sont nécessaires", "Accélérer la production", "Réduire le nombre de fournisseurs"], answer: 1 },
      { q: "La logistique aval concerne :", options: ["Les flux des fournisseurs vers l'entreprise", "Les flux de l'entreprise vers le client final", "La gestion des entrepôts", "Les retours clients"], answer: 1 },
      { q: "Que signifie RFID ?", options: ["Rapid Freight Identification Data", "Radio Frequency IDentification", "Real-time Flow and Inventory Database", "Route Finding and Inventory Detection"], answer: 1 },
      { q: "La Reverse Logistics gère :", options: ["Les expéditions urgentes", "Les retours de produits du client vers l'entreprise", "Les imports internationaux", "La logistique des véhicules"], answer: 1 },
      { q: "L'EDI permet :", options: ["La gestion des entrepôts", "L'échange électronique standardisé de documents commerciaux", "Le suivi GPS des véhicules", "La préparation de commandes"], answer: 1 },
      { q: "Le Lean logistics vise à :", options: ["Réduire les délais de livraison uniquement", "Éliminer les gaspillages dans la chaîne logistique", "Augmenter le nombre de fournisseurs", "Automatiser entièrement les entrepôts"], answer: 1 },
      { q: "Un prestataire 3PL est :", options: ["Un logiciel de gestion", "Un tiers externalisant des services logistiques", "Un type de palette", "Un indicateur de performance"], answer: 1 },
      { q: "Le Lead Time est :", options: ["Le temps de chargement d'un camion", "Le délai entre la commande et la réception par le client", "La durée d'un inventaire", "Le temps de transit douanier"], answer: 1 },
      { q: "La mutualisation logistique consiste à :", options: ["Centraliser tous les stocks dans un seul entrepôt", "Partager des ressources logistiques entre entreprises", "Sous-traiter l'ensemble de la logistique", "Utiliser uniquement le transport aérien"], answer: 1 },
    ],
  },
  {
    id: 7,
    title: "Outils Informatiques",
    subtitle: "Systèmes & technologies",
    icon: "🖥️",
    color: "#0277BD",
    textColor: "#ffffff",
    hasOverview: true,
    glossary: [
      { term: "WMS (Warehouse Management System)", def: "Logiciel de gestion d'entrepôt pilotant les emplacements, les mouvements de stock, le picking et les expéditions en temps réel. Ex : SAP EWM, Manhattan." },
      { term: "TMS (Transport Management System)", def: "Logiciel de planification et de suivi des transports : tournées, coûts, délais, sous-traitants. Ex : Ortec, Transics." },
      { term: "ERP (Enterprise Resource Planning)", def: "Système d'information global intégrant tous les processus : achats, stocks, ventes, RH, comptabilité. SAP est l'ERP le plus répandu en logistique." },
      { term: "SAP", def: "Leader mondial des ERP. En logistique, SAP gère les stocks (MM), les entrepôts (EWM), les transports (TM) et la facturation (SD)." },
      { term: "Terminal de scan (PDA)", def: "Pistolet ou tablette portable avec scanner intégré utilisé pour lire les codes-barres en entrepôt ou lors des livraisons. Ex : Zebra TC, Honeywell." },
      { term: "Code-barres 1D", def: "Représentation graphique linéaire d'un identifiant numérique. Lu par un scanner laser. Ex : Code 128, EAN-13 utilisés sur les colis postaux." },
      { term: "Code-barres 2D (QR / DataMatrix)", def: "Code à 2 dimensions stockant plus d'informations qu'un code 1D. Le DataMatrix est utilisé sur les lettres recommandées suisses." },
      { term: "RFID (Radio Frequency IDentification)", def: "Puce électronique lue sans contact par ondes radio. Permet le suivi automatique de colis ou palettes sans scan manuel, jusqu'à 100 articles/seconde." },
      { term: "Track & Trace", def: "Système de suivi en temps réel d'un envoi de l'expédition à la livraison via scans successifs. Visible par le client via internet ou SMS." },
      { term: "EDI (Electronic Data Interchange)", def: "Échange automatique de documents structurés (bons de commande, factures, avis d'expédition) entre systèmes informatiques de partenaires logistiques." },
      { term: "API (Application Programming Interface)", def: "Interface permettant à deux logiciels de communiquer entre eux. Ex : la boutique en ligne envoie automatiquement les commandes au WMS via API." },
      { term: "Cloud / SaaS", def: "Logiciels hébergés sur Internet (pas installés localement). Accessibles depuis n'importe quel appareil. Ex : Monday.com, Salesforce, certains WMS modernes." },
      { term: "GPS / Géolocalisation", def: "Technologie de positionnement satellitaire intégrée aux véhicules de livraison pour optimiser les tournées et suivre les flottes en temps réel." },
      { term: "Dashboard / Tableau de bord", def: "Interface graphique synthétisant les KPI (taux de livraison, retards, stocks) en temps réel pour les responsables logistiques." },
      { term: "IHM (Interface Homme-Machine)", def: "Écran ou panel de contrôle permettant à l'opérateur d'interagir avec un système automatisé (convoyeur, trieuse, automate)." },
    ],
    questions: [
      { q: "Que signifie WMS ?", options: ["Warehouse Management System", "Worldwide Mail Service", "Web Monitoring Software", "Warehouse Mapping Solution"], answer: 0 },
      { q: "SAP est principalement :", options: ["Un système de scan portable", "Un ERP intégrant tous les processus de l'entreprise", "Un logiciel de transport uniquement", "Un outil de géolocalisation"], answer: 1 },
      { q: "Le terminal de scan (PDA) sert à :", options: ["Imprimer les étiquettes", "Lire les codes-barres en entrepôt ou livraison", "Gérer les tournées", "Communiquer avec les clients"], answer: 1 },
      { q: "Quelle est la différence principale entre RFID et code-barres ?", options: ["Le RFID est moins cher", "Le RFID ne nécessite pas de scan manuel et lit plusieurs articles à la fois", "Le code-barres stocke plus d'informations", "Le RFID ne fonctionne qu'en entrepôt"], answer: 1 },
      { q: "Track & Trace permet :", options: ["De planifier les tournées", "De suivre un envoi en temps réel de l'expédition à la livraison", "De gérer les stocks en entrepôt", "D'automatiser la facturation"], answer: 1 },
      { q: "L'EDI sert à :", options: ["Scanner les colis à l'entrée", "Échanger automatiquement des documents entre systèmes informatiques", "Gérer les ressources humaines", "Localiser les véhicules"], answer: 1 },
      { q: "Qu'est-ce qu'une API en logistique ?", options: ["Un type de terminal de scan", "Une interface permettant à deux logiciels de communiquer", "Un protocole de transport", "Un format de code-barres"], answer: 1 },
      { q: "Un TMS gère principalement :", options: ["Les stocks en entrepôt", "La planification et le suivi des transports", "La relation client", "Les ressources humaines"], answer: 1 },
      { q: "Que signifie IHM ?", options: ["Inventaire Harmonisé des Marchandises", "Interface Homme-Machine", "Identification des Horaires de Manutention", "Intégration des Hubs et Messageries"], answer: 1 },
      { q: "Un dashboard logistique affiche principalement :", options: ["Les emails clients", "Les KPI en temps réel (taux de livraison, retards, stocks)", "Les horaires des chauffeurs", "Les contrats fournisseurs"], answer: 1 },
    ],
  },
];

// ─── OVERVIEW MODULE 7 ───────────────────────────────────────────────────────

function OverviewOutils() {
  const [activeSchema, setActiveSchema] = useState(0);
  const schemas = [
    { label: "Flux WMS", id: "wms" },
    { label: "Scan & Track", id: "scan" },
    { label: "Architecture SI", id: "si" },
  ];
  return (
    <div>
      <div style={{ background: "#e3f2fd", borderRadius: "12px", padding: "16px 18px", marginBottom: "20px", borderLeft: "4px solid #0277BD" }}>
        <div style={{ fontWeight: "800", fontSize: "14px", color: "#01579b", marginBottom: "4px" }}>🎯 Objectif du module</div>
        <div style={{ fontSize: "13px", color: "#1565c0", lineHeight: 1.6 }}>
          Comprendre les outils numériques du logisticien : comment les systèmes communiquent entre eux, comment un colis est tracé de A à Z, et quels logiciels tu utiliseras au quotidien.
        </div>
      </div>

      {/* Schema tabs */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
        {schemas.map((s, i) => (
          <button key={i} onClick={() => setActiveSchema(i)} style={{
            padding: "8px 14px", borderRadius: "8px", border: "none", cursor: "pointer",
            background: activeSchema === i ? "#0277BD" : "#e3f2fd",
            color: activeSchema === i ? "#fff" : "#0277BD",
            fontWeight: "700", fontSize: "13px", transition: "all 0.2s",
          }}>{s.label}</button>
        ))}
      </div>

      {/* Schema WMS */}
      {activeSchema === 0 && (
        <div>
          <div style={{ fontWeight: "800", fontSize: "15px", marginBottom: "10px", color: "#111" }}>📦 Flux d'un WMS en entrepôt</div>
          <svg viewBox="0 0 700 280" style={{ width: "100%", borderRadius: "12px", background: "#f8fafc", border: "1px solid #e5e7eb" }}>
            {/* Arrows */}
            <defs>
              <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#0277BD" />
              </marker>
            </defs>
            {/* Step boxes */}
            {[
              { x: 20, label: "RÉCEPTION", sub: "Scan à l'arrivée", emoji: "🚚", col: "#1565c0" },
              { x: 160, label: "CONTRÔLE", sub: "Vérif. quantité & état", emoji: "✅", col: "#2e7d32" },
              { x: 300, label: "STOCKAGE", sub: "Attribution emplacement", emoji: "🗃️", col: "#e65100" },
              { x: 440, label: "PICKING", sub: "Prélèvement commande", emoji: "🖐️", col: "#6a1b9a" },
              { x: 580, label: "EXPÉDITION", sub: "Scan sortie + BL", emoji: "📤", col: "#0277BD" },
            ].map((step, i) => (
              <g key={i}>
                <rect x={step.x} y={60} width={110} height={80} rx="10" fill={step.col} opacity="0.12" stroke={step.col} strokeWidth="1.5" />
                <text x={step.x + 55} y={85} textAnchor="middle" fontSize="22">{step.emoji}</text>
                <text x={step.x + 55} y={106} textAnchor="middle" fontSize="10" fontWeight="800" fill={step.col}>{step.label}</text>
                <text x={step.x + 55} y={122} textAnchor="middle" fontSize="9" fill="#6b7280">{step.sub}</text>
              </g>
            ))}
            {/* Arrows between boxes */}
            {[130, 270, 410, 550].map((x, i) => (
              <line key={i} x1={x} y1={100} x2={x + 28} y2={100} stroke="#0277BD" strokeWidth="1.5" markerEnd="url(#arr)" />
            ))}
            {/* WMS bar at bottom */}
            <rect x={20} y={175} width={660} height={36} rx="8" fill="#0277BD" opacity="0.1" stroke="#0277BD" strokeWidth="1" strokeDasharray="4,3" />
            <text x={350} y={196} textAnchor="middle" fontSize="11" fontWeight="800" fill="#0277BD">WMS — Pilotage centralisé de tous les flux en temps réel</text>
            {/* Vertical lines to bar */}
            {[75, 215, 355, 495, 635].map((x, i) => (
              <line key={i} x1={x} y1={140} x2={x} y2={175} stroke="#0277BD" strokeWidth="1" strokeDasharray="3,2" opacity="0.5" />
            ))}
            {/* Terminal icon */}
            <text x={350} y={245} textAnchor="middle" fontSize="11" fill="#9ca3af">📱 Terminal de scan → chaque action est horodatée et enregistrée dans le WMS</text>
          </svg>
          <div style={{ marginTop: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[
              { t: "Réception", d: "À l'arrivée d'un colis, l'opérateur scanne le code-barres. Le WMS enregistre la date, l'heure et l'état." },
              { t: "Stockage", d: "Le WMS attribue automatiquement un emplacement optimal selon le type de produit et la fréquence de sortie." },
              { t: "Picking", d: "Le WMS guide l'opérateur avec un bon de prélèvement ou un écran PDA vers le bon emplacement." },
              { t: "Expédition", d: "Un dernier scan confirme la sortie. Le statut du colis passe à 'En route' dans Track & Trace." },
            ].map((c, i) => (
              <div key={i} style={{ background: "#f0f9ff", borderRadius: "10px", padding: "12px", borderLeft: "3px solid #0277BD" }}>
                <div style={{ fontWeight: "800", fontSize: "13px", color: "#01579b" }}>{c.t}</div>
                <div style={{ fontSize: "12px", color: "#4b5563", marginTop: "4px", lineHeight: 1.5 }}>{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schema SCAN & TRACK */}
      {activeSchema === 1 && (
        <div>
          <div style={{ fontWeight: "800", fontSize: "15px", marginBottom: "10px", color: "#111" }}>🔍 Cycle de vie d'un scan postal</div>
          <svg viewBox="0 0 700 300" style={{ width: "100%", borderRadius: "12px", background: "#f8fafc", border: "1px solid #e5e7eb" }}>
            <defs>
              <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#0277BD" />
              </marker>
            </defs>
            {/* Central DB */}
            <ellipse cx={350} cy={150} rx={70} ry={45} fill="#0277BD" opacity="0.12" stroke="#0277BD" strokeWidth="1.5" />
            <text x={350} y={144} textAnchor="middle" fontSize="20">🗄️</text>
            <text x={350} y={162} textAnchor="middle" fontSize="10" fontWeight="800" fill="#0277BD">BASE DE</text>
            <text x={350} y={174} textAnchor="middle" fontSize="10" fontWeight="800" fill="#0277BD">DONNÉES</text>

            {/* Surrounding nodes */}
            {[
              { label: "📱 Terminal\nde scan", cx: 90, cy: 80 },
              { label: "🏭 Centre\nde tri", cx: 90, cy: 220 },
              { label: "🌐 Track &\nTrace client", cx: 610, cy: 80 },
              { label: "🚚 Chauffeur\nGPS", cx: 610, cy: 220 },
            ].map((n, i) => {
              const lines = n.label.split("\n");
              return (
                <g key={i}>
                  <rect x={n.cx - 50} y={n.cy - 28} width={100} height={56} rx="8"
                    fill={i < 2 ? "#e65100" : "#2e7d32"} opacity="0.1"
                    stroke={i < 2 ? "#e65100" : "#2e7d32"} strokeWidth="1.5" />
                  <text x={n.cx} y={n.cy - 6} textAnchor="middle" fontSize="11" fontWeight="700" fill={i < 2 ? "#bf360c" : "#1b5e20"}>{lines[0]}</text>
                  <text x={n.cx} y={n.cy + 10} textAnchor="middle" fontSize="11" fontWeight="700" fill={i < 2 ? "#bf360c" : "#1b5e20"}>{lines[1]}</text>
                </g>
              );
            })}
            {/* Lines to center */}
            {[[140, 92, 285, 130], [140, 210, 285, 170], [560, 92, 415, 130], [560, 210, 415, 170]].map((l, i) => (
              <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#arr2)" strokeDasharray={i >= 2 ? "5,3" : "0"} />
            ))}
            <text x={350} y={260} textAnchor="middle" fontSize="10" fill="#9ca3af">→ Données envoyées · · · · Données reçues</text>
            <text x={350} y={278} textAnchor="middle" fontSize="10" fill="#6b7280" fontStyle="italic">Chaque scan = 1 événement horodaté transmis en temps réel</text>
          </svg>
          <div style={{ marginTop: "12px", background: "#fff8e1", border: "1px solid #ffd54f", borderRadius: "10px", padding: "14px 16px" }}>
            <div style={{ fontWeight: "800", fontSize: "13px", color: "#e65100", marginBottom: "8px" }}>🔑 Points clés à retenir</div>
            {[
              "Chaque scan génère un événement horodaté (date + heure + lieu + opérateur)",
              "Le client peut suivre son colis en temps réel grâce à ces événements",
              "En cas de litige, l'historique des scans sert de preuve",
              "Un colis non scanné = invisible dans le système → risque de perte",
            ].map((p, i) => (
              <div key={i} style={{ fontSize: "13px", color: "#4b5563", padding: "4px 0", display: "flex", gap: "8px" }}>
                <span style={{ color: "#f59e0b", fontWeight: "800" }}>{i + 1}.</span>{p}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schema SI Architecture */}
      {activeSchema === 2 && (
        <div>
          <div style={{ fontWeight: "800", fontSize: "15px", marginBottom: "10px", color: "#111" }}>🏗️ Architecture des systèmes d'information logistiques</div>
          <svg viewBox="0 0 700 320" style={{ width: "100%", borderRadius: "12px", background: "#f8fafc", border: "1px solid #e5e7eb" }}>
            <defs>
              <marker id="arr3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#555" />
              </marker>
            </defs>

            {/* Layer labels */}
            {[
              { y: 30, label: "COUCHE STRATÉGIQUE", col: "#6a1b9a" },
              { y: 125, label: "COUCHE OPÉRATIONNELLE", col: "#0277BD" },
              { y: 220, label: "COUCHE TERRAIN", col: "#2e7d32" },
            ].map((l, i) => (
              <g key={i}>
                <rect x={10} y={l.y} width={680} height={75} rx="8" fill={l.col} opacity="0.05" stroke={l.col} strokeWidth="1" strokeDasharray="4,3" />
                <text x={20} y={l.y + 13} fontSize="9" fontWeight="800" fill={l.col} letterSpacing="1">{l.label}</text>
              </g>
            ))}

            {/* Layer 1: ERP */}
            <rect x={270} y={38} width={160} height={52} rx="8" fill="#6a1b9a" opacity="0.15" stroke="#6a1b9a" strokeWidth="1.5" />
            <text x={350} y={62} textAnchor="middle" fontSize="13" fontWeight="800" fill="#4a148c">ERP (SAP)</text>
            <text x={350} y={78} textAnchor="middle" fontSize="10" fill="#6b7280">Données globales entreprise</text>

            {/* Layer 2: WMS + TMS */}
            {[
              { x: 80, label: "WMS", sub: "Gestion entrepôt", col: "#0277BD" },
              { x: 430, label: "TMS", sub: "Gestion transport", col: "#01579b" },
            ].map((b, i) => (
              <g key={i}>
                <rect x={b.x} y={133} width={160} height={52} rx="8" fill={b.col} opacity="0.12" stroke={b.col} strokeWidth="1.5" />
                <text x={b.x + 80} y={157} textAnchor="middle" fontSize="13" fontWeight="800" fill={b.col}>{b.label}</text>
                <text x={b.x + 80} y={173} textAnchor="middle" fontSize="10" fill="#6b7280">{b.sub}</text>
              </g>
            ))}
            {/* EDI */}
            <rect x={268} y={133} width={164} height={52} rx="8" fill="#e65100" opacity="0.12" stroke="#e65100" strokeWidth="1.5" />
            <text x={350} y={157} textAnchor="middle" fontSize="13" fontWeight="800" fill="#bf360c">EDI / API</text>
            <text x={350} y={173} textAnchor="middle" fontSize="10" fill="#6b7280">Échanges automatiques</text>

            {/* Layer 3: terrain tools */}
            {[
              { x: 30, label: "📱 PDA / Scanner", col: "#2e7d32" },
              { x: 200, label: "🏷️ Étiquettes\nCode-barres", col: "#2e7d32" },
              { x: 370, label: "📡 RFID", col: "#2e7d32" },
              { x: 530, label: "🚚 GPS Véhicule", col: "#2e7d32" },
            ].map((t, i) => {
              const lines = t.label.split("\n");
              return (
                <g key={i}>
                  <rect x={t.x} y={228} width={140} height={52} rx="8" fill={t.col} opacity="0.1" stroke={t.col} strokeWidth="1.5" />
                  <text x={t.x + 70} y={249} textAnchor="middle" fontSize="11" fontWeight="700" fill="#1b5e20">{lines[0]}</text>
                  {lines[1] && <text x={t.x + 70} y={264} textAnchor="middle" fontSize="10" fill="#1b5e20">{lines[1]}</text>}
                </g>
              );
            })}

            {/* Vertical connections ERP→WMS/TMS */}
            {[[350, 90, 160, 133], [350, 90, 350, 133], [350, 90, 510, 133]].map((l, i) => (
              <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke="#9ca3af" strokeWidth="1.2" markerEnd="url(#arr3)" />
            ))}
            {/* WMS/TMS → terrain */}
            {[[160, 185, 100, 228], [160, 185, 270, 228], [350, 185, 440, 228], [510, 185, 600, 228]].map((l, i) => (
              <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke="#9ca3af" strokeWidth="1.2" markerEnd="url(#arr3)" />
            ))}
          </svg>
          <div style={{ marginTop: "12px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
            {[
              { t: "ERP", d: "Cerveau de l'entreprise. Toutes les données y convergent.", col: "#6a1b9a" },
              { t: "WMS / TMS", d: "Systèmes spécialisés qui reçoivent les ordres de l'ERP.", col: "#0277BD" },
              { t: "Terrain", d: "Les outils que tu utilises physiquement (scanner, GPS…).", col: "#2e7d32" },
            ].map((c, i) => (
              <div key={i} style={{ background: "#f8fafc", borderRadius: "8px", padding: "10px", borderTop: `3px solid ${c.col}` }}>
                <div style={{ fontWeight: "800", fontSize: "12px", color: c.col }}>{c.t}</div>
                <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "4px" }}>{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const OVERVIEWS = { 7: OverviewOutils };

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

const Badge = ({ children, color, textColor }) => (
  <span style={{
    background: color,
    color: textColor,
    borderRadius: "20px",
    padding: "2px 10px",
    fontSize: "12px",
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: "0.05em",
  }}>{children}</span>
);

const ProgressBar = ({ value, max, color }) => (
  <div style={{ background: "#e5e7eb", borderRadius: "99px", height: "8px", overflow: "hidden", width: "100%" }}>
    <div style={{
      background: color,
      width: `${Math.round((value / max) * 100)}%`,
      height: "100%",
      borderRadius: "99px",
      transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
    }} />
  </div>
);

// ─── VIEWS ───────────────────────────────────────────────────────────────────

function Dashboard({ scores, onSelectModule }) {
  const totalModules = MODULES.length;
  const completed = Object.keys(scores).length;
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const maxTotal = completed * 10;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1B4F8A 0%, #0d2f57 100%)",
        borderRadius: "20px",
        padding: "32px",
        marginBottom: "28px",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -30, right: -30,
          width: 160, height: 160,
          background: "rgba(255,204,0,0.15)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: -40, left: "40%",
          width: 120, height: 120,
          background: "rgba(255,255,255,0.06)",
          borderRadius: "50%",
        }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#FFCC00", marginBottom: "8px", fontFamily: "monospace" }}>
            Formation Logistique · La Poste Suisse
          </div>
          <h1 style={{ fontSize: "clamp(20px, 5vw, 34px)", fontWeight: "800", margin: "0 0 6px", fontFamily: "'Georgia', serif", lineHeight: 1.2 }}>
            Glossaire des Termes Techniques
          </h1>
          <p style={{ margin: "0 0 24px", opacity: 0.8, fontSize: "15px" }}>
            Étudie chaque module, puis valide tes connaissances avec le QCM
          </p>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {[
              { label: "Modules terminés", value: `${completed}/${totalModules}` },
              { label: "Score global", value: completed ? `${totalScore}/${maxTotal}` : "—" },
              { label: "Réussite", value: completed ? `${Math.round((totalScore/maxTotal)*100)}%` : "—" },
            ].map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.1)", borderRadius: "12px", padding: "12px 18px" }}>
                <div style={{ fontSize: "22px", fontWeight: "800" }}>{s.value}</div>
                <div style={{ fontSize: "12px", opacity: 0.7 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Glossaire des Termes Techniques ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
        <div style={{ fontWeight: "800", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#1B4F8A" }}>
          📚 Glossaire des Termes Techniques
        </div>
        <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
        <span style={{ fontSize: "12px", color: "#9ca3af" }}>{MODULES.length} modules</span>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
        gap: "16px",
        marginBottom: "32px",
      }}>
        {MODULES.map(mod => {
          const s = scores[mod.id];
          const done = s !== undefined;
          return (
            <div
              key={mod.id}
              onClick={() => onSelectModule(mod.id)}
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "22px",
                cursor: "pointer",
                border: `2px solid ${done ? mod.color : "#e5e7eb"}`,
                boxShadow: done ? `0 4px 20px ${mod.color}30` : "0 2px 8px rgba(0,0,0,0.06)",
                transition: "transform 0.18s, box-shadow 0.18s",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 28px ${mod.color}40`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = done ? `0 4px 20px ${mod.color}30` : "0 2px 8px rgba(0,0,0,0.06)"; }}
            >
              <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: `${mod.color}18`, borderRadius: "0 16px 0 80px" }} />
              <div style={{ fontSize: "32px", marginBottom: "10px" }}>{mod.icon}</div>
              <div style={{ fontSize: "11px", fontFamily: "monospace", letterSpacing: "0.1em", color: "#9ca3af", marginBottom: "4px" }}>MODULE {mod.id}</div>
              <h3 style={{ margin: "0 0 4px", fontSize: "17px", fontWeight: "800", color: "#111" }}>{mod.title}</h3>
              <p style={{ margin: "0 0 14px", fontSize: "13px", color: "#6b7280" }}>{mod.subtitle}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <ProgressBar value={done ? s : 0} max={10} color={mod.color} />
                <span style={{ fontSize: "13px", fontWeight: "700", color: mod.color, minWidth: "36px" }}>
                  {done ? `${s}/10` : "—"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Badge color={done ? mod.color : "#f3f4f6"} textColor={done ? mod.textColor : "#6b7280"}>
                  {done ? (s >= 7 ? "✓ Réussi" : "↺ À retravailler") : "À commencer"}
                </Badge>
                <span style={{ fontSize: "12px", color: "#d1d5db" }}>{mod.glossary.length} termes</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Modules à venir ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
        <div style={{ fontWeight: "800", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9ca3af" }}>
          🔒 Modules à venir
        </div>
        <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
        <span style={{ fontSize: "12px", color: "#d1d5db" }}>basés sur tes notes & résumés</span>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
        gap: "16px",
        marginBottom: "28px",
      }}>
        {[
          { icon: "📋", label: "Procédures internes", hint: "À ajouter depuis tes notes" },
          { icon: "🤝", label: "Relation client", hint: "Communication & réclamations" },
          { icon: "📐", label: "Module personnalisé", hint: "Contenu de ta formation CFC" },
          { icon: "➕", label: "Nouveau module", hint: "Apporte tes résumés & notes" },
        ].map((ph, i) => (
          <div key={i} style={{
            background: "#f9fafb",
            borderRadius: "16px",
            padding: "22px",
            border: "2px dashed #e5e7eb",
            opacity: 0.75,
            position: "relative",
          }}>
            <div style={{ fontSize: "28px", marginBottom: "10px", filter: "grayscale(1)", opacity: 0.5 }}>{ph.icon}</div>
            <div style={{ fontSize: "11px", fontFamily: "monospace", letterSpacing: "0.1em", color: "#d1d5db", marginBottom: "4px" }}>À VENIR</div>
            <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "800", color: "#9ca3af" }}>{ph.label}</h3>
            <p style={{ margin: "0 0 14px", fontSize: "12px", color: "#c4c9d1", fontStyle: "italic" }}>{ph.hint}</p>
            <div style={{
              background: "#f3f4f6", borderRadius: "8px", padding: "8px 12px",
              fontSize: "12px", color: "#9ca3af", textAlign: "center",
            }}>
              + Apporte tes notes pour débloquer
            </div>
          </div>
        ))}
      </div>

      {completed > 0 && (
        <div style={{ marginTop: "8px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "16px 20px", fontSize: "14px", color: "#166534" }}>
          💡 <strong>Conseil :</strong> Pour chaque module raté (score &lt; 7/10), revois d'abord le glossaire puis refais le QCM.
        </div>
      )}
    </div>
  );
}

function ModuleView({ moduleId, scores, onSaveScore, onBack }) {
  const mod = MODULES.find(m => m.id === moduleId);
  const OverviewComponent = OVERVIEWS[mod.id] || null;
  const [view, setView] = useState(mod.hasOverview ? "overview" : "glossary");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [search, setSearch] = useState("");

  const filteredGlossary = mod.glossary.filter(g =>
    g.term.toLowerCase().includes(search.toLowerCase()) ||
    g.def.toLowerCase().includes(search.toLowerCase())
  );

  const startQuiz = () => {
    setView("quiz");
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setRevealed(false);
  };

  const handleAnswer = (idx) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    setTimeout(() => {
      const newAnswers = [...answers, idx];
      if (currentQ < mod.questions.length - 1) {
        setAnswers(newAnswers);
        setCurrentQ(currentQ + 1);
        setSelected(null);
        setRevealed(false);
      } else {
        const score = newAnswers.filter((a, i) => a === mod.questions[i].answer).length;
        onSaveScore(mod.id, score);
        setAnswers(newAnswers);
        setView("result");
      }
    }, 900);
  };

  const score = answers.filter((a, i) => a === mod.questions[i].answer).length;

  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "16px" }}>
      {/* Back + Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <button onClick={onBack} style={{
          background: "#f3f4f6", border: "none", borderRadius: "10px",
          padding: "8px 14px", cursor: "pointer", fontSize: "14px", fontWeight: "600", color: "#374151"
        }}>← Retour</button>
        <div>
          <div style={{ fontSize: "12px", fontFamily: "monospace", color: "#9ca3af" }}>MODULE {mod.id}</div>
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "800" }}>{mod.icon} {mod.title}</h2>
        </div>
      </div>

      {/* Tabs */}
      {view !== "quiz" && view !== "result" && (
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
          {OverviewComponent && (
            <button onClick={() => setView("overview")} style={{
              padding: "10px 20px", borderRadius: "10px", border: "none",
              background: view === "overview" ? mod.color : "#f3f4f6",
              color: view === "overview" ? mod.textColor : "#374151",
              fontWeight: "700", cursor: "pointer", fontSize: "14px", transition: "all 0.2s",
            }}>🗺️ Aperçu & Schémas</button>
          )}
          <button onClick={() => setView("glossary")} style={{
            padding: "10px 20px", borderRadius: "10px", border: "none",
            background: view === "glossary" ? mod.color : "#f3f4f6",
            color: view === "glossary" ? mod.textColor : "#374151",
            fontWeight: "700", cursor: "pointer", fontSize: "14px", transition: "all 0.2s",
          }}>{`📖 Glossaire (${mod.glossary.length})`}</button>
          <button onClick={startQuiz} style={{
            padding: "10px 20px", borderRadius: "10px", border: "none",
            background: "#f3f4f6", color: "#374151",
            fontWeight: "700", cursor: "pointer", fontSize: "14px", transition: "all 0.2s",
          }}>🧠 Passer le QCM</button>
          {scores[mod.id] !== undefined && (
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
              <Badge color={mod.color} textColor={mod.textColor}>Dernier score : {scores[mod.id]}/10</Badge>
            </div>
          )}
        </div>
      )}

      {/* OVERVIEW */}
      {view === "overview" && OverviewComponent && (
        <div style={{ background: "#fff", borderRadius: "16px", padding: "20px", border: "1px solid #e5e7eb" }}>
          <OverviewComponent />
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button onClick={() => setView("glossary")} style={{
              background: mod.color, color: mod.textColor, border: "none",
              borderRadius: "12px", padding: "12px 28px", fontSize: "15px",
              fontWeight: "800", cursor: "pointer", marginRight: "10px",
            }}>📖 Voir le glossaire →</button>
          </div>
        </div>
      )}

      {/* GLOSSARY */}
      {view === "glossary" && (
        <div>
          <input
            placeholder="🔍 Rechercher un terme..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "12px 16px", borderRadius: "12px",
              border: "2px solid #e5e7eb", fontSize: "15px", marginBottom: "16px",
              outline: "none", boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {filteredGlossary.map((g, i) => (
              <div key={i} style={{
                background: "#fff",
                border: `1px solid #e5e7eb`,
                borderLeft: `4px solid ${mod.color}`,
                borderRadius: "12px",
                padding: "16px 18px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}>
                <div style={{ fontWeight: "800", fontSize: "15px", color: "#111", marginBottom: "5px" }}>{g.term}</div>
                <div style={{ fontSize: "14px", color: "#4b5563", lineHeight: 1.6 }}>{g.def}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <button onClick={startQuiz} style={{
              background: mod.color, color: mod.textColor,
              border: "none", borderRadius: "12px", padding: "14px 32px",
              fontSize: "16px", fontWeight: "800", cursor: "pointer",
              boxShadow: `0 4px 16px ${mod.color}60`,
              transition: "transform 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
              onMouseLeave={e => e.currentTarget.style.transform = ""}
            >
              Je suis prêt · Passer le QCM →
            </button>
          </div>
        </div>
      )}

      {/* QUIZ */}
      {view === "quiz" && (
        <div>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6b7280", marginBottom: "6px" }}>
              <span>Question {currentQ + 1} sur {mod.questions.length}</span>
              <span>{answers.filter((a, i) => a === mod.questions[i].answer).length} correctes</span>
            </div>
            <ProgressBar value={currentQ} max={mod.questions.length} color={mod.color} />
          </div>

          <div style={{
            background: mod.color,
            color: mod.textColor,
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "16px",
            fontSize: "clamp(15px, 3vw, 18px)",
            fontWeight: "700",
            lineHeight: 1.5,
          }}>
            {mod.questions[currentQ].q}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {mod.questions[currentQ].options.map((opt, idx) => {
              const correct = idx === mod.questions[currentQ].answer;
              const isSelected = idx === selected;
              let bg = "#fff", border = "#e5e7eb", color = "#111";
              if (revealed) {
                if (correct) { bg = "#f0fdf4"; border = "#22c55e"; color = "#166534"; }
                else if (isSelected) { bg = "#fef2f2"; border = "#ef4444"; color = "#991b1b"; }
              }
              return (
                <button key={idx} onClick={() => handleAnswer(idx)} style={{
                  background: bg, border: `2px solid ${border}`, borderRadius: "12px",
                  padding: "14px 18px", textAlign: "left", cursor: revealed ? "default" : "pointer",
                  fontSize: "15px", fontWeight: "600", color,
                  transition: "all 0.2s",
                  display: "flex", alignItems: "center", gap: "12px",
                }}>
                  <span style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: revealed && correct ? "#22c55e" : revealed && isSelected ? "#ef4444" : "#f3f4f6",
                    color: revealed && (correct || isSelected) ? "#fff" : "#6b7280",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: "800", fontSize: "13px", flexShrink: 0,
                  }}>
                    {revealed && correct ? "✓" : revealed && isSelected ? "✗" : String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* RESULT */}
      {view === "result" && (
        <div>
          <div style={{
            background: score >= 7 ? "linear-gradient(135deg, #166534, #15803d)" : "linear-gradient(135deg, #991b1b, #b91c1c)",
            color: "#fff", borderRadius: "20px", padding: "32px", textAlign: "center", marginBottom: "24px",
          }}>
            <div style={{ fontSize: "56px", marginBottom: "8px" }}>{score >= 7 ? "🏆" : "💪"}</div>
            <div style={{ fontSize: "48px", fontWeight: "900", lineHeight: 1 }}>{score}/10</div>
            <div style={{ fontSize: "18px", marginTop: "8px", opacity: 0.9 }}>
              {score >= 9 ? "Excellent !" : score >= 7 ? "Bien joué !" : score >= 5 ? "Peut mieux faire" : "À retravailler"}
            </div>
            <div style={{ fontSize: "14px", opacity: 0.75, marginTop: "4px" }}>
              {Math.round((score / 10) * 100)}% de réponses correctes
            </div>
          </div>

          {/* Detailed review */}
          <h3 style={{ marginBottom: "12px", fontSize: "16px" }}>📋 Révision détaillée</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
            {mod.questions.map((q, i) => {
              const correct = answers[i] === q.answer;
              return (
                <div key={i} style={{
                  background: correct ? "#f0fdf4" : "#fef2f2",
                  border: `1px solid ${correct ? "#86efac" : "#fca5a5"}`,
                  borderRadius: "12px", padding: "14px",
                }}>
                  <div style={{ fontWeight: "700", fontSize: "14px", color: correct ? "#166534" : "#991b1b", marginBottom: "6px" }}>
                    {correct ? "✓" : "✗"} Q{i + 1} : {q.q}
                  </div>
                  {!correct && (
                    <div style={{ fontSize: "13px", color: "#4b5563" }}>
                      Ta réponse : <span style={{ color: "#ef4444", fontWeight: "600" }}>{q.options[answers[i]]}</span>
                      {" · "}Bonne réponse : <span style={{ color: "#22c55e", fontWeight: "600" }}>{q.options[q.answer]}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={() => setView("glossary")} style={{
              flex: 1, padding: "14px", borderRadius: "12px", border: `2px solid ${mod.color}`,
              background: "#fff", color: "#111", fontWeight: "700", cursor: "pointer", fontSize: "15px",
            }}>📖 Revoir le glossaire</button>
            <button onClick={startQuiz} style={{
              flex: 1, padding: "14px", borderRadius: "12px", border: "none",
              background: mod.color, color: mod.textColor, fontWeight: "700", cursor: "pointer", fontSize: "15px",
            }}>🔁 Refaire le QCM</button>
            <button onClick={onBack} style={{
              flex: 1, padding: "14px", borderRadius: "12px", border: "none",
              background: "#1B4F8A", color: "#fff", fontWeight: "700", cursor: "pointer", fontSize: "15px",
            }}>🏠 Tableau de bord</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ADMIN PANEL ─────────────────────────────────────────────────────────────

function AdminPanel({ scores, onResetAll, onResetModule, onClose }) {
  const [confirmAll, setConfirmAll] = useState(false);
  const [confirmMod, setConfirmMod] = useState(null);

  const handleResetAll = () => {
    if (confirmAll) { onResetAll(); setConfirmAll(false); }
    else { setConfirmAll(true); setTimeout(() => setConfirmAll(false), 3500); }
  };

  const handleResetMod = (id) => {
    if (confirmMod === id) { onResetModule(id); setConfirmMod(null); }
    else { setConfirmMod(id); setTimeout(() => setConfirmMod(null), 3500); }
  };

  const completedModules = MODULES.filter(m => scores[m.id] !== undefined);

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
        zIndex: 100, backdropFilter: "blur(2px)",
      }} />

      {/* Panel */}
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff", borderRadius: "20px",
        padding: "0", width: "min(520px, 92vw)",
        maxHeight: "85vh", overflowY: "auto",
        zIndex: 101, boxShadow: "0 24px 60px rgba(0,0,0,0.22)",
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #1e293b, #334155)",
          borderRadius: "20px 20px 0 0", padding: "20px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ color: "#94a3b8", fontSize: "11px", letterSpacing: "0.12em", fontFamily: "monospace" }}>LOGILEARN</div>
            <div style={{ color: "#fff", fontWeight: "800", fontSize: "18px" }}>⚙️ Administration</div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "8px",
            color: "#fff", width: "32px", height: "32px", cursor: "pointer",
            fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center",
          }}>✕</button>
        </div>

        <div style={{ padding: "20px 24px" }}>

          {/* Stats summary */}
          <div style={{
            background: "#f8fafc", borderRadius: "12px", padding: "14px 18px",
            marginBottom: "20px", display: "flex", gap: "20px",
          }}>
            {[
              { label: "Modules tentés", val: completedModules.length + "/" + MODULES.length },
              { label: "Score moyen", val: completedModules.length ? Math.round(completedModules.reduce((a,m)=>a+scores[m.id],0)/completedModules.length*10)/10+"/10" : "—" },
              { label: "Réussite ≥7", val: completedModules.filter(m=>scores[m.id]>=7).length },
            ].map((s,i) => (
              <div key={i} style={{ textAlign: "center", flex: 1 }}>
                <div style={{ fontWeight: "800", fontSize: "20px", color: "#1e293b" }}>{s.val}</div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Per-module reset */}
          <div style={{ fontWeight: "800", fontSize: "13px", color: "#374151", marginBottom: "10px", letterSpacing: "0.05em" }}>
            REMISE À ZÉRO PAR MODULE
          </div>

          {completedModules.length === 0 ? (
            <div style={{ background: "#f1f5f9", borderRadius: "10px", padding: "14px", textAlign: "center", fontSize: "13px", color: "#94a3b8", marginBottom: "16px" }}>
              Aucun module n'a encore été tenté.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
              {MODULES.map(mod => {
                const s = scores[mod.id];
                if (s === undefined) return null;
                const isConfirming = confirmMod === mod.id;
                return (
                  <div key={mod.id} style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    background: "#f8fafc", borderRadius: "10px", padding: "12px 14px",
                    border: "1px solid #e5e7eb",
                  }}>
                    <span style={{ fontSize: "20px" }}>{mod.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "700", fontSize: "14px", color: "#111" }}>{mod.title}</div>
                      <div style={{ fontSize: "12px", color: s >= 7 ? "#16a34a" : "#dc2626", fontWeight: "600" }}>
                        Score : {s}/10 · {s >= 7 ? "✓ Réussi" : "✗ Non réussi"}
                      </div>
                    </div>
                    <button onClick={() => handleResetMod(mod.id)} style={{
                      padding: "7px 14px", borderRadius: "8px", border: "none", cursor: "pointer",
                      background: isConfirming ? "#dc2626" : "#fee2e2",
                      color: isConfirming ? "#fff" : "#dc2626",
                      fontWeight: "700", fontSize: "12px",
                      transition: "all 0.2s", whiteSpace: "nowrap",
                    }}>
                      {isConfirming ? "⚠️ Confirmer ?" : "🗑️ Effacer"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Global reset */}
          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "18px" }}>
            <div style={{ fontWeight: "800", fontSize: "13px", color: "#374151", marginBottom: "10px", letterSpacing: "0.05em" }}>
              REMISE À ZÉRO GLOBALE
            </div>
            <div style={{ background: "#fff8f0", border: "1px solid #fed7aa", borderRadius: "10px", padding: "14px 16px", marginBottom: "12px" }}>
              <div style={{ fontSize: "13px", color: "#92400e" }}>
                ⚠️ Cette action efface <strong>tous les scores</strong> de tous les modules. Elle est irréversible.
              </div>
            </div>
            <button onClick={handleResetAll} style={{
              width: "100%", padding: "13px", borderRadius: "10px", border: "none",
              background: confirmAll ? "#dc2626" : "#fef2f2",
              color: confirmAll ? "#fff" : "#dc2626",
              fontWeight: "800", fontSize: "14px", cursor: "pointer",
              border: `1px solid ${confirmAll ? "#dc2626" : "#fca5a5"}`,
              transition: "all 0.25s",
            }}>
              {confirmAll ? "⚠️ Cliquer encore pour confirmer la remise à zéro totale" : "🔄 Remettre tous les scores à zéro"}
            </button>
          </div>

          <button onClick={onClose} style={{
            width: "100%", marginTop: "12px", padding: "11px", borderRadius: "10px",
            border: "1px solid #e5e7eb", background: "#f8fafc",
            fontWeight: "600", fontSize: "14px", cursor: "pointer", color: "#374151",
          }}>Fermer</button>
        </div>
      </div>
    </>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeModule, setActiveModule] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [scores, setScores] = useState(() => {
    try { return JSON.parse(localStorage.getItem("logistique_scores") || "{}"); } catch { return {}; }
  });

  useEffect(() => {
    try { localStorage.setItem("logistique_scores", JSON.stringify(scores)); } catch {}
  }, [scores]);

  const saveScore   = (id, score) => setScores(prev => ({ ...prev, [id]: score }));
  const resetAll    = () => { setScores({}); };
  const resetModule = (id) => setScores(prev => { const n = { ...prev }; delete n[id]; return n; });

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #f8fafc 0%, #eff6ff 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      {/* Top bar */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        position: "sticky",
        top: 0,
        zIndex: 10,
        boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
      }}>
        {/* Logo */}
        <div
          onClick={() => { setActiveModule(null); }}
          style={{ display: "flex", alignItems: "center", gap: "10px", cursor: activeModule ? "pointer" : "default" }}
        >
          <div style={{ width: "32px", height: "32px", background: "#FFCC00", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>✉️</div>
          <div>
            <div style={{ fontWeight: "800", fontSize: "15px", lineHeight: 1.2 }}>LogiLearn</div>
            <div style={{ fontSize: "11px", color: "#9ca3af" }}>La Poste Suisse</div>
          </div>
        </div>

        {/* Right side: admin only, always visible */}
        <div style={{ marginLeft: "auto" }}>
          <button onClick={() => setShowAdmin(true)} style={{
            background: "#f1f5f9",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "7px 14px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "700",
            color: "#475569",
            display: "flex", alignItems: "center", gap: "6px",
          }}>
            <span>⚙️</span> Administration
          </button>
        </div>
      </div>

      {/* Content */}
      {activeModule
        ? <ModuleView moduleId={activeModule} scores={scores} onSaveScore={saveScore} onBack={() => setActiveModule(null)} />
        : <Dashboard scores={scores} onSelectModule={setActiveModule} />
      }

      {/* Admin modal */}
      {showAdmin && (
        <AdminPanel
          scores={scores}
          onResetAll={() => { resetAll(); setShowAdmin(false); }}
          onResetModule={resetModule}
          onClose={() => setShowAdmin(false)}
        />
      )}
    </div>
  );
}
