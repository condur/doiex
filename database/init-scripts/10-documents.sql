-- Roles
-- All roles creation are done in '00-create-roles' script

-- Enums 
CREATE TYPE DOCUMENT_TYPE AS ENUM ('Invoice', 'Response');

-- Tables
CREATE TABLE IF NOT EXISTS documents (
  document_type DOCUMENT_TYPE NOT NULL,
  document_number VARCHAR(10) NOT NULL,
  original_document_number VARCHAR(10),
  status VARCHAR(10),
  date TIMESTAMP NOT NULL,
  amount FLOAT(2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  PRIMARY KEY (document_number)
);

-- Table Grants
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE documents TO doiex_app;
