--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: products_currency_enum; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.products_currency_enum AS ENUM (
    'USD',
    'MXN'
);


ALTER TYPE public.products_currency_enum OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.categories (
    id character varying NOT NULL,
    category character varying NOT NULL,
    description character varying NOT NULL
);


ALTER TABLE public.categories OWNER TO admin;

--
-- Name: details; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.details (
    id character varying NOT NULL,
    details jsonb NOT NULL,
    product_id character varying
);


ALTER TABLE public.details OWNER TO admin;

--
-- Name: images; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.images (
    id character varying NOT NULL,
    image character varying NOT NULL,
    product_id character varying
);


ALTER TABLE public.images OWNER TO admin;

--
-- Name: products; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.products (
    id character varying NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    image character varying NOT NULL,
    price character varying NOT NULL,
    currency public.products_currency_enum NOT NULL,
    stock integer DEFAULT 0 NOT NULL,
    published boolean DEFAULT true NOT NULL
);


ALTER TABLE public.products OWNER TO admin;

--
-- Name: products_categories; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.products_categories (
    id integer NOT NULL,
    product_id character varying,
    category_id character varying
);


ALTER TABLE public.products_categories OWNER TO admin;

--
-- Name: products_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.products_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_categories_id_seq OWNER TO admin;

--
-- Name: products_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.products_categories_id_seq OWNED BY public.products_categories.id;


--
-- Name: products_categories id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.products_categories ALTER COLUMN id SET DEFAULT nextval('public.products_categories_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.categories (id, category, description) FROM stdin;
018e6439-9460-7ce2-9b6a-f75c22e3c279	computación	Productos como laptops, procesadores, PC GAMER
018f03ff-2c4d-755f-bd31-618d09b314c6	sas	assasa
018f0412-dee9-78f4-8db7-87dec76839f5	monitores	monitores
\.


--
-- Data for Name: details; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.details (id, details, product_id) FROM stdin;
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.images (id, image, product_id) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.products (id, name, description, image, price, currency, stock, published) FROM stdin;
018e643c-7254-7f13-b9a5-3624ce10ed5b	Base Enfriadora Laptop	Base para computadora con 4 ventiladores activos	https://http2.mlstatic.com/D_NQ_NP_854345-MLU73338595102_122023-O.webp	300	MXN	300	t
018f03fa-cfaa-75ce-9314-8b003e4da959	RAM DDR5 16GB	Memoria RAM DDR5 de 16GB	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS34Dt0wkCqJ7h1wOXMdOpn9Ok0ZJKUpTaUPzmYTlrCLQ&s	800	MXN	200	t
018f0411-d827-7380-b824-f391a5f8e450	Silla gamer	silla gamer game factor	https://http2.mlstatic.com/D_NQ_NP_876919-MLM74647712344_022024-O.webp	299	MXN	39	t
\.


--
-- Data for Name: products_categories; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.products_categories (id, product_id, category_id) FROM stdin;
1	018e643c-7254-7f13-b9a5-3624ce10ed5b	018e6439-9460-7ce2-9b6a-f75c22e3c279
2	018f03fa-cfaa-75ce-9314-8b003e4da959	018e6439-9460-7ce2-9b6a-f75c22e3c279
3	018f0411-d827-7380-b824-f391a5f8e450	018e6439-9460-7ce2-9b6a-f75c22e3c279
\.


--
-- Name: products_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.products_categories_id_seq', 3, true);


--
-- Name: details PK_02185da47c073158a934d3927dd; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.details
    ADD CONSTRAINT "PK_02185da47c073158a934d3927dd" PRIMARY KEY (id);


--
-- Name: products PK_0806c755e0aca124e67c0cf6d7d; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY (id);


--
-- Name: products_categories PK_0caaab91b663757a4086208d0b0; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.products_categories
    ADD CONSTRAINT "PK_0caaab91b663757a4086208d0b0" PRIMARY KEY (id);


--
-- Name: images PK_1fe148074c6a1a91b63cb9ee3c9; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY (id);


--
-- Name: categories PK_24dbc6126a28ff948da33e97d3b; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY (id);


--
-- Name: details REL_3cfd63cad6fd21038e09e4ecdc; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.details
    ADD CONSTRAINT "REL_3cfd63cad6fd21038e09e4ecdc" UNIQUE (product_id);


--
-- Name: products UQ_4c9fb58de893725258746385e16; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE (name);


--
-- Name: categories UQ_bcd0361927be4baf8a1f401590e; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "UQ_bcd0361927be4baf8a1f401590e" UNIQUE (category);


--
-- Name: products_categories FK_19fe0fe8c2fcf1cbe1a80f639f1; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.products_categories
    ADD CONSTRAINT "FK_19fe0fe8c2fcf1cbe1a80f639f1" FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: details FK_3cfd63cad6fd21038e09e4ecdc7; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.details
    ADD CONSTRAINT "FK_3cfd63cad6fd21038e09e4ecdc7" FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: images FK_96fabbb1202770b8e6a58bf6f1d; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT "FK_96fabbb1202770b8e6a58bf6f1d" FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: products_categories FK_f2c76a4306a82c696d620f81f08; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.products_categories
    ADD CONSTRAINT "FK_f2c76a4306a82c696d620f81f08" FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

