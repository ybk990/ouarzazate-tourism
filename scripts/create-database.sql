-- Script SQL pour créer les tables dans Supabase

-- Table des réservations
CREATE TABLE IF NOT EXISTS reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telephone VARCHAR(20) NOT NULL,
  type_hebergement VARCHAR(50) NOT NULL,
  date_arrivee DATE NOT NULL,
  date_depart DATE NOT NULL,
  nombre_personnes INTEGER NOT NULL,
  message TEXT,
  statut VARCHAR(20) DEFAULT 'en_attente',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des contacts
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  sujet VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  lu BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des attractions (pour le futur)
CREATE TABLE IF NOT EXISTS attractions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom VARCHAR(200) NOT NULL,
  description TEXT,
  prix DECIMAL(10,2),
  image_url VARCHAR(500),
  categorie VARCHAR(50),
  duree VARCHAR(50),
  actif BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des hébergements (pour le futur)
CREATE TABLE IF NOT EXISTS hebergements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom VARCHAR(200) NOT NULL,
  type VARCHAR(50) NOT NULL,
  description TEXT,
  prix_min DECIMAL(10,2),
  prix_max DECIMAL(10,2),
  etoiles INTEGER,
  image_url VARCHAR(500),
  services TEXT[],
  localisation VARCHAR(200),
  disponible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insérer quelques données d'exemple pour tester
INSERT INTO attractions (nom, description, prix, categorie, duree) VALUES
('Kasbah Taourirt', 'Palais fortifié du XIXe siècle, joyau de l''architecture berbère', 30.00, 'patrimoine', '2h'),
('Atlas Studios', 'Visite des plus grands studios de cinéma d''Afrique', 80.00, 'cinema', '3h'),
('Excursion Sahara 2 jours', 'Excursion complète dans le désert avec nuit sous les étoiles', 1200.00, 'desert', '2 jours'),
('Ksar Ait Ben Haddou', 'Village fortifié classé UNESCO, décor de nombreux films', 50.00, 'patrimoine', '4h'),
('Oasis de Fint', 'Palmeraie verdoyante aux portes du désert', 40.00, 'nature', '3h');

INSERT INTO hebergements (nom, type, description, prix_min, prix_max, etoiles, localisation) VALUES
('Riad Salam', 'riad_prestige', 'Riad traditionnel au cœur de la médina avec spa', 800.00, 1500.00, 5, 'Centre historique'),
('Hotel Berbère Palace', 'hotel_moderne', 'Hôtel moderne avec piscine et vue sur l''Atlas', 400.00, 800.00, 4, 'Proche des studios'),
('Camp Sahara Dreams', 'campement_desert', 'Campement de luxe dans les dunes de Merzouga', 600.00, 1000.00, 4, 'Dunes de Merzouga'),
('Auberge Atlas', 'auberge', 'Auberge conviviale pour backpackers', 150.00, 300.00, 3, 'Centre-ville'),
('Kasbah Tifoultoute', 'riad_prestige', 'Kasbah historique transformée en hôtel de charme', 900.00, 1800.00, 5, 'Route d''Ait Ben Haddou');

-- Créer des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(date_arrivee);
CREATE INDEX IF NOT EXISTS idx_reservations_statut ON reservations(statut);
CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(created_at);
