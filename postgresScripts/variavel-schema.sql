CREATE SCHEMA variavel;
CREATE TABLE variavel.variavels (
 "id" SERIAL NOT NULL ,
 "variavel" varchar(20) NOT NULL,
 "data" date NOT NULL,
 "valor" numeric NOT NULL,
 CONSTRAINT "Variavels_pk" PRIMARY KEY ("id")
);
