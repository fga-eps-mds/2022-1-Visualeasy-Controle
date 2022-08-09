CREATE SCHEMA variavel;
CREATE TABLE variavel.variavels (
 "id" SERIAL NOT NULL ,
 "variavel" varchar(20) NOT NULL,
 "data" timestamp NOT NULL,
 "valor" numeric NOT NULL,
 CONSTRAINT "Variavels_pk" PRIMARY KEY ("id")
);

COPY variavel.variavels(variavel, data, valor)
FROM '/csvFiles/dados_unb.csv'
DELIMITER ','
CSV HEADER;