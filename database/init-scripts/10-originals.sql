-- Roles
-- All roles creation are done in '00-create-roles' script

-- Tables
CREATE TABLE IF NOT EXISTS originals (
  response_number VARCHAR(10) NOT NULL,
  original_invoice_number VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL,
  date VARCHAR(20) NOT NULL,
  amount VARCHAR(20) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  PRIMARY KEY (response_number)
);

-- Table Grants
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE originals TO doiex_persister_app;
