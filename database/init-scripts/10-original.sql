-- Roles
-- All roles creation are done in '00-create-roles' script

-- Tables
CREATE TABLE IF NOT EXISTS original (
  document_number INT NOT NULL,
  document_type VARCHAR(50) NOT NULL,
  date TIMESTAMP NOT NULL,
  amount FLOAT(2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  PRIMARY KEY (document_number)
);

-- Table Grants
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE original TO doiex_persister_app;
