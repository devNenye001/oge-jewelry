/**
 * OGÉ Fine Jewelry - Storefront Multi-Language Translation Engine
 * Seamless client-side internationalization for:
 * - English (en) [Default]
 * - French / Français (fr)
 * - German / Deutsch (de)
 * - Danish / Dansk (da)
 * - Dutch / Nederlands (nl)
 * - Swedish / Svenska (sv)
 */

(function() {
  'use strict';

  const DICTIONARIES = {
    // -------------------------------------------------------------------------
    // FRENCH (FRANÇAIS)
    // -------------------------------------------------------------------------
    fr: {
      // Navigation & Header
      "HOME": "ACCUEIL",
      "Home": "Accueil",
      "JEWELRY": "BIJOUX",
      "Jewelry": "Bijoux",
      "FINE JEWELRY": "HAUTE JOAILLERIE",
      "Fine Jewelry": "Haute Joaillerie",
      "RINGS": "BAGUES",
      "Rings": "Bagues",
      "NECKLACES": "COLLIERS",
      "Necklaces": "Colliers",
      "EARRINGS": "BOUCLES D'OREILLES",
      "Earrings": "Boucles d'oreilles",
      "BRACELETS": "BRACELETS",
      "Bracelets": "Bracelets",
      "NEW ARRIVALS": "NOUVEAUTÉS",
      "New Arrivals": "Nouveautés",
      "BEST SELLERS": "MEILLEURES VENTES",
      "Best Sellers": "Meilleures ventes",
      "ABOUT": "À PROPOS",
      "About": "À propos",
      "ABOUT US": "À PROPOS DE NOUS",
      "About Us": "À propos de nous",
      "CONTACT": "CONTACT",
      "Contact": "Contact",
      "SHOP": "BOUTIQUE",
      "Shop": "Boutique",
      "Search": "Rechercher",
      "Search our collections...": "Rechercher dans nos collections...",
      "Search products...": "Rechercher des créations...",
      "Select your location": "Sélectionnez votre région",
      "Select your location & currency": "Sélectionnez votre région et devise",

      // Actions & Buttons
      "ADD TO BAG": "AJOUTER AU PANIER",
      "Add to Bag": "Ajouter au Panier",
      "Quick Add": "Ajout Rapide",
      "Sold Out": "Épuisé",
      "SOLD OUT": "ÉPUISÉ",
      "Start Shopping": "Commencer les Achats",
      "CHECKOUT": "COMMANDER",
      "Checkout": "Commander",
      "Continue Shopping": "Continuer les Achats",
      "View Orders": "Voir les Commandes",
      "Make a return": "Faire un retour",
      "Make a Return": "Effectuer un retour",
      "Want to send something back?": "Vous souhaitez retourner un article ?",
      "Sign out": "Se déconnecter",
      "SIGN IN": "CONNEXION",
      "Sign In": "Connexion",
      "LOGIN": "CONNEXION",
      "Login": "Connexion",
      "Log in": "Connexion",
      "Register": "S'inscrire",
      "Sign up": "Créer un compte",
      "CREATE ACCOUNT": "CRÉER UN COMPTE",
      "Create account": "Créer un compte",
      "Create Account": "Créer un compte",
      "Edit details": "Modifier les détails",
      "SAVE": "ENREGISTRER",
      "Save": "Enregistrer",
      "SAVE AND UPDATE": "ENREGISTRER ET METTRE À JOUR",
      "CANCEL": "ANNULER",
      "Cancel": "Annuler",
      "Back to Overview": "Retour à l'aperçu",
      "Next": "Suivant",
      "Prev": "Précédent",
      "Previous": "Précédent",
      "Explore the Collection": "Explorer la Collection",
      "EXPLORE THE COLLECTION": "EXPLORER LA COLLECTION",
      "DISCOVER MORE": "DÉCOUVRIR",
      "Discover More": "Découvrir",
      "Shop Now": "Acheter",
      "SHOP NOW": "ACHETER",

      // Cart Drawer
      "Shopping Bag": "Votre Panier",
      "Your Bag": "Votre Panier",
      "Your bag is empty": "Votre panier est vide",
      "Subtotal": "Sous-total",
      "Estimated shipping & taxes calculated at checkout": "Frais de livraison et taxes calculés au paiement",
      "Taxes and shipping calculated at checkout": "Taxes et livraison calculées au paiement",
      "Qty": "Qté",
      "Quantity": "Quantité",
      "Remove": "Supprimer",

      // Product Details Page
      "Description": "Description",
      "Details & Care": "Détails & Entretien",
      "Shipping & Returns": "Livraison & Retours",
      "Select Ring Size": "Choisir la taille",
      "Ring Size Guide": "Guide des tailles",
      "Ring Size": "Taille de bague",
      "Size": "Taille",
      "Metal": "Métal",
      "Stone": "Pierre",
      "Gold": "Or",
      "Silver": "Argent",
      "18K Gold Vermeil": "Vermeil d'or 18 carats",
      "Solid 14K Gold": "Or massif 14 carats",
      "Sterling Silver": "Argent massif 925",
      "Natural Gemstone": "Pierre précieuse naturelle",
      "YOU MAY ALSO LIKE": "VOUS AIMEREZ AUSSI",
      "You May Also Like": "Vous aimerez aussi",

      // Account, Orders, Profile, Wishlist
      "ACCOUNT OVERVIEW": "APERÇU DU COMPTE",
      "Account Overview": "Aperçu du compte",
      "Welcome": "Bienvenue",
      "Your account details, all in one place.": "Toutes vos informations réunies au même endroit.",
      "Orders": "Commandes",
      "ORDERS": "COMMANDES",
      "Wishlist": "Liste d'envies",
      "WISHLIST": "LISTE D'ENVIES",
      "Profile": "Profil",
      "PROFILE": "PROFIL",
      "Personal Information": "Informations personnelles",
      "Change password": "Changer le mot de passe",
      "First name": "Prénom",
      "First name*": "Prénom*",
      "Last name": "Nom de famille",
      "Last name*": "Nom de famille*",
      "Email address": "Adresse e-mail",
      "Email address*": "Adresse e-mail*",
      "Phone number": "Numéro de téléphone",
      "Date of birth": "Date de naissance",
      "Gender": "Genre",
      "Create new password": "Créer un nouveau mot de passe",
      "Re-type password": "Confirmer le mot de passe",
      "Password strength": "Force du mot de passe",
      "Must contain at least 8 characters": "Doit contenir au moins 8 caractères",
      "Uppercase and lowercase characters": "Majuscules et minuscules requises",
      "One special character": "Au moins un caractère spécial",
      "Your saved items": "Vos articles enregistrés",
      "Nothing has been saved to your Wishlist": "Rien n'a été enregistré dans votre liste d'envies",
      "It looks like you haven't saved any items yet, why not check out our best sellers?": "Vous n'avez pas encore enregistré de pièces. Découvrez nos créations incontournables !",
      "No orders have been made yet!": "Aucune commande passée pour l'instant !",
      "When you place an order, its details, shipment tracking, and receipts will be displayed here.": "Lorsque vous passez une commande, le suivi et les reçus s'afficheront ici.",

      // Footer & Policies
      "ABOUT OGÉ": "À PROPOS D'OGÉ",
      "HELP & SUPPORT": "AIDE & SUPPORT",
      "LEGAL": "MENTIONS LÉGALES",
      "STAY CONNECTED": "RESTEZ CONNECTÉ",
      "Stay connected": "Restez connecté",
      "Enter your email": "Entrez votre e-mail",
      "Subscribe": "S'inscrire",
      "Privacy Policy": "Politique de confidentialité",
      "Terms & Conditions": "Conditions générales",
      "Terms of Service": "Conditions d'utilisation",
      "Shipping Policy": "Politique de livraison",
      "All rights reserved": "Tous droits réservés",
      "All rights reserved.": "Tous droits réservés.",
      "Shop by Category": "Acheter par catégorie",
      "Filter": "Filtrer",
      "Sort by": "Trier par"
    },

    // -------------------------------------------------------------------------
    // GERMAN (DEUTSCH)
    // -------------------------------------------------------------------------
    de: {
      "HOME": "STARTSEITE",
      "Home": "Startseite",
      "JEWELRY": "SCHMUCK",
      "Jewelry": "Schmuck",
      "FINE JEWELRY": "FEINSCHMUCK",
      "Fine Jewelry": "Feinschmuck",
      "RINGS": "RINGE",
      "Rings": "Ringe",
      "NECKLACES": "HALSKETTEN",
      "Necklaces": "Halsketten",
      "EARRINGS": "OHRRINGE",
      "Earrings": "Ohrringe",
      "BRACELETS": "ARMBÄNDER",
      "Bracelets": "Armbänder",
      "NEW ARRIVALS": "NEUHEITEN",
      "New Arrivals": "Neuheiten",
      "BEST SELLERS": "BESTSELLER",
      "Best Sellers": "Bestseller",
      "ABOUT": "ÜBER UNS",
      "About": "Über uns",
      "ABOUT US": "ÜBER UNS",
      "About Us": "Über uns",
      "CONTACT": "KONTAKT",
      "Contact": "Kontakt",
      "SHOP": "SHOP",
      "Shop": "Shop",
      "Search": "Suchen",
      "Search our collections...": "Kollektionen durchsuchen...",
      "Search products...": "Produkte suchen...",
      "Select your location": "Wählen Sie Ihren Standort",

      "ADD TO BAG": "IN DEN WARENKORB",
      "Add to Bag": "In den Warenkorb",
      "Quick Add": "Schnellkauf",
      "Sold Out": "Ausverkauft",
      "SOLD OUT": "AUSVERKAUFT",
      "Start Shopping": "Jetzt Einkaufen",
      "CHECKOUT": "ZUR KASSE",
      "Checkout": "Zur Kasse",
      "Continue Shopping": "Weiter Einkaufen",
      "View Orders": "Bestellungen Anzeigen",
      "Make a return": "Rücksendung veranlassen",
      "Make a Return": "Rücksendung veranlassen",
      "Want to send something back?": "Möchten Sie einen Artikel zurücksenden?",
      "Sign out": "Abmelden",
      "SIGN IN": "ANMELDEN",
      "Sign In": "Anmelden",
      "LOGIN": "ANMELDEN",
      "Login": "Anmelden",
      "Log in": "Anmelden",
      "Register": "Registrieren",
      "Sign up": "Konto erstellen",
      "CREATE ACCOUNT": "KONTO ERSTELLEN",
      "Create account": "Konto erstellen",
      "Create Account": "Konto erstellen",
      "Edit details": "Angaben bearbeiten",
      "SAVE": "SPEICHERN",
      "Save": "Speichern",
      "SAVE AND UPDATE": "SPEICHERN UND AKTUALISIEREN",
      "CANCEL": "ABBRECHEN",
      "Cancel": "Abbrechen",
      "Back to Overview": "Zurück zur Übersicht",
      "Next": "Weiter",
      "Prev": "Zurück",
      "Previous": "Zurück",
      "Explore the Collection": "Kollektion Entdecken",
      "EXPLORE THE COLLECTION": "KOLLEKTION ENTDECKEN",
      "DISCOVER MORE": "MEHR ENTDECKEN",
      "Discover More": "Mehr entdecken",

      "Shopping Bag": "Ihr Warenkorb",
      "Your Bag": "Ihr Warenkorb",
      "Your bag is empty": "Ihr Warenkorb ist leer",
      "Subtotal": "Zwischensumme",
      "Estimated shipping & taxes calculated at checkout": "Versand und Steuern werden beim Checkout berechnet",
      "Taxes and shipping calculated at checkout": "Steuern und Versand werden beim Checkout berechnet",
      "Qty": "Menge",
      "Quantity": "Menge",
      "Remove": "Entfernen",

      "Description": "Beschreibung",
      "Details & Care": "Details & Pflege",
      "Shipping & Returns": "Versand & Rückgabe",
      "Select Ring Size": "Ringgröße wählen",
      "Ring Size Guide": "Größentabelle",
      "Ring Size": "Ringgröße",
      "Size": "Größe",
      "Metal": "Metall",
      "Stone": "Stein",
      "Gold": "Gold",
      "Silver": "Silber",
      "18K Gold Vermeil": "18k Gold Vermeil",
      "Solid 14K Gold": "Massives 14k Gold",
      "Sterling Silver": "925er Sterlingsilber",
      "YOU MAY ALSO LIKE": "DAS KÖNNTE IHNEN AUCH GEFALLEN",
      "You May Also Like": "Das könnte Ihnen auch gefallen",

      "ACCOUNT OVERVIEW": "KONTOÜBERSICHT",
      "Account Overview": "Kontoübersicht",
      "Welcome": "Willkommen",
      "Your account details, all in one place.": "Ihre Kontodaten an einem Ort.",
      "Orders": "Bestellungen",
      "ORDERS": "BESTELLUNGEN",
      "Wishlist": "Wunschliste",
      "WISHLIST": "WUNSCHLISTE",
      "Profile": "Profil",
      "PROFILE": "PROFIL",
      "Personal Information": "Persönliche Daten",
      "Change password": "Passwort ändern",
      "First name": "Vorname",
      "First name*": "Vorname*",
      "Last name": "Nachname",
      "Last name*": "Nachname*",
      "Email address": "E-Mail-Adresse",
      "Email address*": "E-Mail-Adresse*",
      "Phone number": "Telefonnummer",
      "Date of birth": "Geburtsdatum",
      "Gender": "Geschlecht",
      "Create new password": "Neues Passwort erstellen",
      "Re-type password": "Passwort wiederholen",
      "Password strength": "Passwortstärke",
      "Must contain at least 8 characters": "Muss mindestens 8 Zeichen enthalten",
      "Uppercase and lowercase characters": "Groß- und Kleinbuchstaben erforderlich",
      "One special character": "Ein Sonderzeichen erforderlich",
      "Your saved items": "Ihre gespeicherten Artikel",
      "Nothing has been saved to your Wishlist": "Keine Artikel in Ihrer Wunschliste gespeichert",
      "It looks like you haven't saved any items yet, why not check out our best sellers?": "Sie haben noch keine Artikel gespeichert. Entdecken Sie unsere Bestseller!",
      "No orders have been made yet!": "Es wurden noch keine Bestellungen aufgegeben!",
      "When you place an order, its details, shipment tracking, and receipts will be displayed here.": "Sobald Sie bestellen, werden Details, Sendungsverfolgung und Belege hier angezeigt.",

      "ABOUT OGÉ": "ÜBER OGÉ",
      "HELP & SUPPORT": "HILFE & SUPPORT",
      "LEGAL": "RECHTLICHES",
      "STAY CONNECTED": "IN VERBINDUNG BLEIBEN",
      "Stay connected": "In Verbindung bleiben",
      "Enter your email": "E-Mail-Adresse eingeben",
      "Subscribe": "Abonnieren",
      "Privacy Policy": "Datenschutzrichtlinie",
      "Terms & Conditions": "Allgemeine Geschäftsbedingungen",
      "Terms of Service": "Nutzungsbedingungen",
      "Shipping Policy": "Versandrichtlinie",
      "All rights reserved": "Alle Rechte vorbehalten",
      "All rights reserved.": "Alle Rechte vorbehalten.",
      "Shop by Category": "Nach Kategorie shoppen",
      "Filter": "Filtern",
      "Sort by": "Sortieren nach"
    },

    // -------------------------------------------------------------------------
    // DANISH (DANSK)
    // -------------------------------------------------------------------------
    da: {
      "HOME": "FORSIDE",
      "Home": "Forside",
      "JEWELRY": "SMYKKER",
      "Jewelry": "Smykker",
      "FINE JEWELRY": "FINE SMYKKER",
      "Fine Jewelry": "Fine Smykker",
      "RINGS": "RINGE",
      "Rings": "Ringe",
      "NECKLACES": "HALSKÆDER",
      "Necklaces": "Halskæder",
      "EARRINGS": "ØRERINGE",
      "Earrings": "Øreringe",
      "BRACELETS": "ARMBÅND",
      "Bracelets": "Armbånd",
      "NEW ARRIVALS": "NYHEDER",
      "New Arrivals": "Nyheder",
      "BEST SELLERS": "BESTSELLERE",
      "Best Sellers": "Bestsellere",
      "ABOUT": "OM OS",
      "About": "Om os",
      "CONTACT": "KONTAKT",
      "Contact": "Kontakt",
      "SHOP": "BUTIK",
      "Shop": "Butik",
      "Search": "Søg",
      "Search our collections...": "Søg i kollektioner...",
      "Select your location": "Vælg din placering",

      "ADD TO BAG": "LÆG I KURV",
      "Add to Bag": "Læg i Kurv",
      "Quick Add": "Hurtig Tilføj",
      "Sold Out": "Udsolgt",
      "SOLD OUT": "UDSOLGT",
      "Start Shopping": "Start Shopping",
      "CHECKOUT": "GÅ TIL KASSEN",
      "Checkout": "Gå til kassen",
      "Continue Shopping": "Fortsæt med at handle",
      "View Orders": "Se Ordrer",
      "Make a return": "Opret en returnering",
      "Sign out": "Log ud",
      "SIGN IN": "LOG IND",
      "Sign In": "Log ind",
      "LOGIN": "LOG IND",
      "Login": "Log ind",
      "Log in": "Log ind",
      "Register": "Opret konto",
      "Sign up": "Opret konto",
      "CREATE ACCOUNT": "OPRET KONTO",
      "Create account": "Opret konto",
      "Edit details": "Rediger oplysninger",
      "SAVE": "GEM",
      "Save": "Gem",
      "CANCEL": "ANNULLER",
      "Cancel": "Annuller",
      "Back to Overview": "Tilbage til oversigten",
      "Next": "Næste",
      "Prev": "Forrige",

      "Shopping Bag": "Din Indkøbstaske",
      "Your Bag": "Din Indkøbstaske",
      "Your bag is empty": "Din taske er tom",
      "Subtotal": "Subtotal",
      "Estimated shipping & taxes calculated at checkout": "Fragt og moms beregnes ved kassen",
      "Qty": "Antal",
      "Quantity": "Antal",
      "Remove": "Fjern",

      "Description": "Beskrivelse",
      "Details & Care": "Detaljer & Pleje",
      "Shipping & Returns": "Fragt & Returnering",
      "Select Ring Size": "Vælg ringstørrelse",
      "Ring Size Guide": "Størrelsesguide",
      "YOU MAY ALSO LIKE": "DU VIL MÅSKE OGSÅ KUNNE LIDE",

      "ACCOUNT OVERVIEW": "KONTOOVERSIGT",
      "Account Overview": "Kontooversigt",
      "Welcome": "Velkommen",
      "Orders": "Ordrer",
      "ORDERS": "ORDRER",
      "Wishlist": "Ønskeliste",
      "WISHLIST": "ØNSKELISTE",
      "Profile": "Profil",
      "PROFILE": "PROFIL",
      "Personal Information": "Personlige oplysninger",
      "Change password": "Skift adgangskode",
      "Your saved items": "Dine gemte varer",
      "Nothing has been saved to your Wishlist": "Intet er blevet gemt på din ønskeliste",
      "No orders have been made yet!": "Ingen ordrer er afgivet endnu!",

      "ABOUT OGÉ": "OM OGÉ",
      "HELP & SUPPORT": "HJÆLP & SUPPORT",
      "LEGAL": "JURIDISK",
      "STAY CONNECTED": "HOLD DIG OPDATERET",
      "Enter your email": "Indtast din e-mail",
      "Subscribe": "Tilmeld",
      "Privacy Policy": "Privatlivspolitik",
      "Terms & Conditions": "Vilkår og betingelser"
    },

    // -------------------------------------------------------------------------
    // DUTCH (NEDERLANDS)
    // -------------------------------------------------------------------------
    nl: {
      "HOME": "HOME",
      "Home": "Home",
      "JEWELRY": "SIERADEN",
      "Jewelry": "Sieraden",
      "FINE JEWELRY": "FIJNE SIERADEN",
      "Fine Jewelry": "Fijne Sieraden",
      "RINGS": "RINGEN",
      "Rings": "Ringen",
      "NECKLACES": "KETTINGEN",
      "Necklaces": "Kettingen",
      "EARRINGS": "OORBELLEN",
      "Earrings": "Oorbellen",
      "BRACELETS": "ARMBANDEN",
      "Bracelets": "Armbanden",
      "NEW ARRIVALS": "NIEUWE COLLECTIE",
      "New Arrivals": "Nieuwe collectie",
      "BEST SELLERS": "BESTSELLERS",
      "Best Sellers": "Bestsellers",
      "ABOUT": "OVER ONS",
      "About": "Over ons",
      "CONTACT": "CONTACT",
      "Contact": "Contact",
      "SHOP": "WINKEL",
      "Shop": "Winkel",
      "Search": "Zoeken",
      "Search our collections...": "Zoek in onze collecties...",
      "Select your location": "Selecteer uw locatie",

      "ADD TO BAG": "IN WINKELMAND",
      "Add to Bag": "In Winkelmand",
      "Quick Add": "Snel Toevoegen",
      "Sold Out": "Uitverkocht",
      "SOLD OUT": "UITVERKOCHT",
      "Start Shopping": "Begin met Winkelen",
      "CHECKOUT": "AFREKENEN",
      "Checkout": "Afrekenen",
      "Continue Shopping": "Verder Winkelen",
      "View Orders": "Bestellingen Bekijken",
      "Make a return": "Retour aanmelden",
      "Sign out": "Afmelden",
      "SIGN IN": "INLOGGEN",
      "Sign In": "Inloggen",
      "LOGIN": "INLOGGEN",
      "Login": "Inloggen",
      "Log in": "Inloggen",
      "Register": "Account aanmaken",
      "Sign up": "Aanmelden",
      "CREATE ACCOUNT": "ACCOUNT AANMAKEN",
      "Create account": "Account aanmaken",
      "Edit details": "Gegevens bewerken",
      "SAVE": "OPSLAAN",
      "Save": "Opslaan",
      "CANCEL": "ANNULEREN",
      "Cancel": "Annuleren",
      "Back to Overview": "Terug naar overzicht",
      "Next": "Volgende",
      "Prev": "Vorige",

      "Shopping Bag": "Uw Winkelmand",
      "Your Bag": "Uw Winkelmand",
      "Your bag is empty": "Uw winkelmand is leeg",
      "Subtotal": "Subtotaal",
      "Estimated shipping & taxes calculated at checkout": "Verzendkosten en belastingen berekend bij afrekenen",
      "Qty": "Aantal",
      "Quantity": "Aantal",
      "Remove": "Verwijderen",

      "Description": "Beschrijving",
      "Details & Care": "Details & Verzorging",
      "Shipping & Returns": "Verzending & Retourneren",
      "Select Ring Size": "Selecteer ringmaat",
      "Ring Size Guide": "Maattabel",
      "YOU MAY ALSO LIKE": "DIT VIND JE MISSCHIEN OOK LEUK",

      "ACCOUNT OVERVIEW": "ACCOUNT OVERZICHT",
      "Account Overview": "Account overzicht",
      "Welcome": "Welkom",
      "Orders": "Bestellingen",
      "ORDERS": "BESTELLINGEN",
      "Wishlist": "Verlanglijst",
      "WISHLIST": "VERLANGLIJST",
      "Profile": "Profiel",
      "PROFILE": "PROFIEL",
      "Personal Information": "Persoonlijke gegevens",
      "Change password": "Wachtwoord wijzigen",
      "Your saved items": "Je bewaarde artikelen",
      "Nothing has been saved to your Wishlist": "Er is nog niets opgeslagen op je verlanglijst",
      "No orders have been made yet!": "Er zijn nog geen bestellingen geplaatst!",

      "ABOUT OGÉ": "OVER OGÉ",
      "HELP & SUPPORT": "HULP & ONDERSTEUNING",
      "LEGAL": "JURIDISCH",
      "STAY CONNECTED": "BLIJF OP DE HOOGTE",
      "Enter your email": "Vul je e-mailadres in",
      "Subscribe": "Aanmelden",
      "Privacy Policy": "Privacybeleid",
      "Terms & Conditions": "Algemene voorwaarden"
    },

    // -------------------------------------------------------------------------
    // SWEDISH (SVENSKA)
    // -------------------------------------------------------------------------
    sv: {
      "HOME": "HEM",
      "Home": "Hem",
      "JEWELRY": "SMYCKEN",
      "Jewelry": "Smycken",
      "FINE JEWELRY": "FINA SMYCKEN",
      "Fine Jewelry": "Fina Smycken",
      "RINGS": "RINGAR",
      "Rings": "Ringar",
      "NECKLACES": "HALSBAND",
      "Necklaces": "Halsband",
      "EARRINGS": "ÖRHÄNGEN",
      "Earrings": "Örhängen",
      "BRACELETS": "ARMBAND",
      "Bracelets": "Armband",
      "NEW ARRIVALS": "NYHETER",
      "New Arrivals": "Nyheter",
      "BEST SELLERS": "BÄSTSÄLJARE",
      "Best Sellers": "Bästsäljare",
      "ABOUT": "OM OSS",
      "About": "Om oss",
      "CONTACT": "KONTAKT",
      "Contact": "Kontakt",
      "SHOP": "BUTIK",
      "Shop": "Butik",
      "Search": "Sök",
      "Search our collections...": "Sök i våra kollektioner...",
      "Select your location": "Välj din plats",

      "ADD TO BAG": "LÄGG I VARUKORG",
      "Add to Bag": "Lägg i Varukorg",
      "Quick Add": "Snabbköp",
      "Sold Out": "Slutsåld",
      "SOLD OUT": "SLUTSÅLD",
      "Start Shopping": "Börja Handla",
      "CHECKOUT": "TILL KASSAN",
      "Checkout": "Till kassan",
      "Continue Shopping": "Fortsätt Handla",
      "View Orders": "Visa Beställningar",
      "Make a return": "Gör en retur",
      "Sign out": "Logga ut",
      "SIGN IN": "LOGGA IN",
      "Sign In": "Logga in",
      "LOGIN": "LOGGA IN",
      "Login": "Logga in",
      "Log in": "Logga in",
      "Register": "Skapa konto",
      "Sign up": "Skapa konto",
      "CREATE ACCOUNT": "SKAPA KONTO",
      "Create account": "Skapa konto",
      "Edit details": "Redigera uppgifter",
      "SAVE": "SPARA",
      "Save": "Spara",
      "CANCEL": "AVBRYT",
      "Cancel": "Avbryt",
      "Back to Overview": "Tillbaka till översikt",
      "Next": "Nästa",
      "Prev": "Föregående",

      "Shopping Bag": "Din Varukorg",
      "Your Bag": "Din Varukorg",
      "Your bag is empty": "Din varukorg är tom",
      "Subtotal": "Delsumma",
      "Estimated shipping & taxes calculated at checkout": "Frakt och moms beräknas i kassan",
      "Qty": "Antal",
      "Quantity": "Antal",
      "Remove": "Ta bort",

      "Description": "Beskrivning",
      "Details & Care": "Detaljer & Skötsel",
      "Shipping & Returns": "Frakt & Returer",
      "Select Ring Size": "Välj ringstorlek",
      "Ring Size Guide": "Storleksguide",
      "YOU MAY ALSO LIKE": "DU KANSKE OCKSÅ GILLAR",

      "ACCOUNT OVERVIEW": "KONTOÖVERSIKT",
      "Account Overview": "Kontoöversikt",
      "Welcome": "Välkommen",
      "Orders": "Beställningar",
      "ORDERS": "BESTÄLLNINGAR",
      "Wishlist": "Önskelista",
      "WISHLIST": "ÖNSKELISTA",
      "Profile": "Profil",
      "PROFILE": "PROFIL",
      "Personal Information": "Personuppgifter",
      "Change password": "Ändra lösenord",
      "Your saved items": "Dina sparade artiklar",
      "Nothing has been saved to your Wishlist": "Inget har sparats i din önskelista",
      "No orders have been made yet!": "Inga beställningar har gjorts än!",

      "ABOUT OGÉ": "OM OGÉ",
      "HELP & SUPPORT": "HJÄLP & SUPPORT",
      "LEGAL": "JURIDISKT",
      "STAY CONNECTED": "HÅLL KONTAKTEN",
      "Enter your email": "Ange din e-post",
      "Subscribe": "Prenumerera",
      "Privacy Policy": "Integritetspolicy",
      "Terms & Conditions": "Användarvillkor"
    }
  };

  const LANGUAGE_NAMES = {
    en: 'English',
    fr: 'Français',
    de: 'Deutsch',
    da: 'Dansk',
    nl: 'Nederlands',
    sv: 'Svenska'
  };

  const OgeTranslation = {
    currentLang: 'en',
    dictionaries: DICTIONARIES,
    observer: null,

    init() {
      // Determine initial language from saved setting or default to en
      const savedLang = localStorage.getItem('oge_selected_language');
      const savedLoc = localStorage.getItem('oge_selected_location');
      
      let initLang = 'en';
      if (savedLang && DICTIONARIES[savedLang]) {
        initLang = savedLang;
      } else if (savedLoc) {
        initLang = this.locationCodeToLang(savedLoc);
      }

      this.currentLang = initLang;
      if (initLang !== 'en') {
        this.applyLanguage(initLang);
      }
      this.initObserver();
    },

    locationCodeToLang(code) {
      if (!code) return 'en';
      const map = {
        fr: 'fr',
        de: 'de',
        ch: 'de',
        dk: 'da',
        nl: 'nl',
        se: 'sv'
      };
      return map[code.toLowerCase()] || 'en';
    },

    getTranslation(text, lang) {
      if (!text || lang === 'en') return null;
      const dict = DICTIONARIES[lang];
      if (!dict) return null;

      const trimmed = text.trim();
      if (dict[trimmed]) {
        return dict[trimmed];
      }

      // Check uppercase / lowercase variations
      const upper = trimmed.toUpperCase();
      if (dict[upper]) return dict[upper];

      return null;
    },

    translateNode(node, lang) {
      // Skip scripts, styles, inputs, textareas, SVGs
      const parent = node.parentElement;
      if (!parent) return;
      const tag = parent.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'TEXTAREA' || tag === 'SVG' || tag === 'CODE') {
        return;
      }

      // Initialize original text cache once
      if (node.__origText === undefined) {
        node.__origText = node.textContent;
      }

      if (lang === 'en') {
        if (node.textContent !== node.__origText) {
          node.textContent = node.__origText;
        }
        return;
      }

      const orig = node.__origText;
      const trimmed = orig.trim();
      if (!trimmed) return;

      const translated = this.getTranslation(trimmed, lang);
      if (translated) {
        // Preserve any leading/trailing whitespace
        const leading = orig.match(/^\s*/)[0];
        const trailing = orig.match(/\s*$/)[0];
        node.textContent = leading + translated + trailing;
      }
    },

    translateElement(rootEl, lang) {
      if (!rootEl) rootEl = document.body;
      if (!lang) lang = this.currentLang;

      // 1. Walk text nodes
      const walker = document.createTreeWalker(
        rootEl,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      let currentNode;
      while ((currentNode = walker.nextNode())) {
        this.translateNode(currentNode, lang);
      }

      // 2. Translate form placeholders
      rootEl.querySelectorAll('input[placeholder]').forEach((input) => {
        if (input.__origPlaceholder === undefined) {
          input.__origPlaceholder = input.getAttribute('placeholder') || '';
        }
        if (lang === 'en') {
          input.placeholder = input.__origPlaceholder;
        } else {
          const trans = this.getTranslation(input.__origPlaceholder, lang);
          if (trans) input.placeholder = trans;
        }
      });

      // 3. Translate buttons with title / aria-label
      rootEl.querySelectorAll('[title], [aria-label]').forEach((el) => {
        const title = el.getAttribute('title');
        const ariaLabel = el.getAttribute('aria-label');

        if (title) {
          if (el.__origTitle === undefined) el.__origTitle = title;
          if (lang === 'en') {
            el.setAttribute('title', el.__origTitle);
          } else {
            const trans = this.getTranslation(el.__origTitle, lang);
            if (trans) el.setAttribute('title', trans);
          }
        }

        if (ariaLabel) {
          if (el.__origAriaLabel === undefined) el.__origAriaLabel = ariaLabel;
          if (lang === 'en') {
            el.setAttribute('aria-label', el.__origAriaLabel);
          } else {
            const trans = this.getTranslation(el.__origAriaLabel, lang);
            if (trans) el.setAttribute('aria-label', trans);
          }
        }
      });
    },

    applyLanguage(lang) {
      if (!lang || !DICTIONARIES[lang] && lang !== 'en') {
        lang = 'en';
      }
      this.currentLang = lang;
      document.documentElement.lang = lang;
      localStorage.setItem('oge_selected_language', lang);

      // Temporarily disconnect observer to avoid infinite loops during replacement
      if (this.observer) this.observer.disconnect();

      this.translateElement(document.body, lang);

      // Reconnect observer
      this.initObserver();

      // Dispatch global event for other components (like CartDrawer or modals)
      window.dispatchEvent(new CustomEvent('oge:language-change', {
        detail: { lang, name: LANGUAGE_NAMES[lang] || 'English' }
      }));
    },

    setLanguage(lang) {
      this.applyLanguage(lang);
      this.showToast(`Language set to ${LANGUAGE_NAMES[lang] || 'English'}`);
    },

    showToast(msg) {
      let toast = document.getElementById('oge-lang-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'oge-lang-toast';
        toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#111111;color:#FFFFFF;padding:10px 22px;border-radius:2px;font-family:DM Sans, sans-serif;font-size:0.8125rem;font-weight:500;z-index:99999;box-shadow:0 4px 16px rgba(0,0,0,0.25);transition:opacity 0.3s ease;opacity:0;pointer-events:none;letter-spacing:0.02em;';
        document.body.appendChild(toast);
      }
      toast.textContent = msg;
      toast.style.opacity = '1';
      setTimeout(() => {
        toast.style.opacity = '0';
      }, 2500);
    },

    initObserver() {
      if (this.observer) this.observer.disconnect();
      if (this.currentLang === 'en') return;

      this.observer = new MutationObserver((mutations) => {
        let shouldTranslate = false;
        for (const m of mutations) {
          if (m.type === 'childList' && m.addedNodes.length > 0) {
            for (const n of m.addedNodes) {
              if (n.nodeType === 1 && n.id !== 'oge-lang-toast') {
                shouldTranslate = true;
                break;
              }
            }
          }
          if (shouldTranslate) break;
        }

        if (shouldTranslate) {
          this.observer.disconnect();
          this.translateElement(document.body, this.currentLang);
          this.initObserver();
        }
      });

      this.observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  };

  window.OGE_TRANSLATION = OgeTranslation;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => OgeTranslation.init());
  } else {
    OgeTranslation.init();
  }
})();
