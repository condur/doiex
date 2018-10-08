SELECT  
    d.document_type                 AS r_document_type,
    d.document_number               AS r_document_number,
    d.original_document_number      AS r_original_document_number,
    d.status                        AS r_status,
    d.date                          AS r_date,
    d.amount                        AS r_amount,
    d.currency                      AS r_currency,
    d2.document_type                AS i_document_type,
    d2.document_number              AS i_document_number,
    d2.date                         AS i_date,
    d2.amount                       AS i_amount,
    d2.currency                     AS i_currency
FROM documents d
JOIN documents d2 ON d.original_document_number = d2.document_number
ORDER BY d.date;

