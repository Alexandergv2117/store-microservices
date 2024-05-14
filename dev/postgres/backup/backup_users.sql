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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.roles (
    id character varying NOT NULL,
    role character varying NOT NULL
);


ALTER TABLE public.roles OWNER TO admin;

--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    username character varying NOT NULL,
    password character varying NOT NULL,
    name character varying NOT NULL,
    lastname character varying NOT NULL,
    image character varying NOT NULL,
    email character varying NOT NULL,
    phone bigint NOT NULL,
    role_id character varying,
    id character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE public.users OWNER TO admin;

--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.roles (id, role) FROM stdin;
018e5ecd-26c5-7fab-952f-97665237d147	admin
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (username, password, name, lastname, image, email, phone, role_id, id, created_at, updated_at, deleted_at) FROM stdin;
Alex2117	$2b$10$ElEZz1OCR47pmDXUj6BS.e6Zw63LkZLV3mOB70DfrBhGKutdfekvC	Alexander	Garcia	https://scontent.fcjs3-1.fna.fbcdn.net/v/t39.30808-6/294979277_1602823016781438_6929902467423879379_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFezGRP1woZy2Twq01XiVUnBLWMcaUSn1kEtYxxpRKfWUWCiKDACr1aEvgY0GozFXWCD4pRleomAzAauhEADdoh&_nc_ohc=UcrgwhTFUOEAX_jPh_I&_nc_ht=scontent.fcjs3-1.fna&oh=00_AfByBRCepfE5BpQskCQMCUjFMrBOd3116rjckCcG3tILyQ&oe=66006C9F	alexandergv2117@gmail.com	9984125115	018e5ecd-26c5-7fab-952f-97665237d147	018e5ecf-4615-70ed-91a9-fa0250db0bfc	2024-03-22 03:52:42.023964	2024-03-22 03:52:42.023964	\N
alex2117	$2b$10$X854sF3tvgkrOtp0R1yXYeLlYqFZqQBIiuLkaeacvSQ6NXQqCSPt6	Alexander	Garcia	https://avatars.githubusercontent.com/u/74172014?s=96&v=4	alex@gmail.com	9984125116	018e5ecd-26c5-7fab-952f-97665237d147	018eff3b-1cf1-79da-b4c9-d4fe05088c61	2024-04-21 05:57:27.979124	2024-04-21 05:57:27.979124	\N
fwggw	$2b$10$hehQAkRGGSseT/skEve1qeCMqQ6m58d7z3ctkZ/BLPhBjxfsu.8nm	wrtqwrt	wertw	wertw	wrtgw@aljkdhfb	1234567899	018e5ecd-26c5-7fab-952f-97665237d147	018eff42-63a8-71d1-82bb-b3852e4151f1	2024-04-21 06:05:24.843017	2024-04-21 06:05:24.843017	\N
fwggwd	$2b$10$m9Q2uF7LieWB6P7Z7IgabOucpPCteMc9AekcEPXcLrIEoFEC8AVCS	wrtqwrt	wertw	wertw	wrtgw@aljkdhfbd	1234567896	018e5ecd-26c5-7fab-952f-97665237d147	018eff43-20d0-78d8-813e-e53b6749c0b2	2024-04-21 06:06:13.261051	2024-04-21 06:06:13.261051	\N
\.


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: roles PK_c1433d71a4838793a49dcad46ab; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id);


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: users UQ_a000cca60bcf04454e727699490; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE (phone);


--
-- Name: roles UQ_ccc7c1489f3a6b3c9b47d4537c5; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "UQ_ccc7c1489f3a6b3c9b47d4537c5" UNIQUE (role);


--
-- Name: users UQ_fe0bb3f6520ee0469504521e710; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE (username);


--
-- Name: users FK_a2cecd1a3531c0b041e29ba46e1; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- PostgreSQL database dump complete
--

