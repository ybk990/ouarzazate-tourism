-- Créer la table des paiements
CREATE TABLE IF NOT EXISTS payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    reservation_id UUID REFERENCES reservations(id) ON DELETE CASCADE,
    stripe_payment_intent_id VARCHAR(255) UNIQUE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'MAD',
    status VARCHAR(50) DEFAULT 'pending',
    customer_email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB
);

-- Ajouter des colonnes à la table reservations pour le statut de paiement
ALTER TABLE reservations 
ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50),
ADD COLUMN IF NOT EXISTS total_amount DECIMAL(10,2);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_payments_reservation_id ON payments(reservation_id);
CREATE INDEX IF NOT EXISTS idx_payments_stripe_id ON payments(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_reservations_payment_status ON reservations(payment_status);

-- Politique de sécurité RLS (Row Level Security)
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture des paiements aux utilisateurs authentifiés
CREATE POLICY "Allow authenticated users to read payments" ON payments
    FOR SELECT USING (auth.role() = 'authenticated');

-- Politique pour permettre l'insertion de nouveaux paiements
CREATE POLICY "Allow payment creation" ON payments
    FOR INSERT WITH CHECK (true);

-- Politique pour permettre la mise à jour des paiements
CREATE POLICY "Allow payment updates" ON payments
    FOR UPDATE USING (true);
