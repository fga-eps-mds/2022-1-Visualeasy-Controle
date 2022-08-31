CREATE SCHEMA variavel;
CREATE TABLE variavel.variavels (
 "id" SERIAL NOT NULL ,
 "variavel" varchar(255) NOT NULL,
 "idfabrica" NUMERIC NOT NULL ,
 "data" timestamp NOT NULL,
 "valor" numeric NOT NULL,
 CONSTRAINT "Variavels_pk" PRIMARY KEY ("id")
);

COPY variavel.variavels(variavel, idfabrica, data, valor)
FROM '/csvFiles/dados_unb.csv'
DELIMITER ','
CSV HEADER;