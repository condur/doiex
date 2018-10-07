-- Roles
-- All roles creation are done in '00-create-roles' script

-- Tables
CREATE TABLE IF NOT EXISTS originals (
  document_number VARCHAR(10) NOT NULL,
  document_type VARCHAR(20) NOT NULL,
  original_document_number VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL,
  date TIMESTAMP NOT NULL,
  amount FLOAT(2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  PRIMARY KEY (document_number)
);

-- Table Grants
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE originals TO doiex_persister_app;
