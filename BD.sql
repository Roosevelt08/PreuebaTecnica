CREATE TABLE "EMPLEADOS"
   ( "ID" NUMBER GENERATED ALWAYS AS IDENTITY MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE  NOT NULL ENABLE,
"DOCUMENTO_ID" VARCHAR2(15 BYTE),
"NOMBRES" VARCHAR2(50 BYTE),
"APELLIDOS" VARCHAR2(50 BYTE),
"EDAD" NUMBER(*,0),
"FECHA_NACIMIENTO" DATE,
"SALARIO" NUMBER(6,2)
   ) ;