-- Roles
-- All roles creation are done in '00-create-roles' script

-- Tables
CREATE TABLE IF NOT EXISTS responses (
  document_number INT NOT NULL,
  original_document_number INT NOT NULL REFERENCES original(document_number) ON DELETE CASCADE,
  document_type VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL,
  date TIMESTAMP NOT NULL,
  amount FLOAT(2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  PRIMARY KEY (document_number, originalDocumentNumber)
);

-- Table Grants
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE responses TO doiex_persister_app;
