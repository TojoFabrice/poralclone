CREATE DATABASE portaljob;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_role VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE userrecruteurs(
    user_recruteur_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    societe_name VARCHAR(255) NOT NULL,
    recruteur_email VARCHAR(255) NOT NULL,
    recruteur_password VARCHAR(255) NOT NULL
);

CREATE TABLE candidats(
    candidat_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_id uuid REFERENCES users(user_id),
    adresse VARCHAR(255),
    phone_number VARCHAR(255),
    experience VARCHAR(255),
    education VARCHAR(255),
    resume_cv BYTEA,
    profile_picture_path VARCHAR(255),
    ville VARCHAR(255),
    codepostale VARCHAR(255),
    civilite VARCHAR(255)
);

CREATE TABLE recruteurs(
    recruteur_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_recruteur_id uuid REFERENCES userrecruteurs(user_recruteur_id),
    site_web VARCHAR(255),
    siege_social VARCHAR(255),
    effectif VARCHAR(255),
    secteur VARCHAR(255),
    apropos TEXT,
    reseaux_sociaux VARCHAR(255)
);

CREATE TABLE annonces (
    annonce_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES users(user_id),
    poste VARCHAR(255) NOT NULL,
    reference VARCHAR(255),
    ville VARCHAR(255) NOT NULL,
    secteur VARCHAR(255) NOT NULL,
    contrat VARCHAR(255) NOT NULL,
    description_post TEXT NOT NULL,
    missions TEXT NOT NULL,
    profil TEXT NOT NULL,
    email_reception VARCHAR(255) NOT NULL,
    date_limite DATE NOT NULL,
    information TEXT
);


INSERT INTO users (user_name, user_email, user_password) VALUES ('Tojo', 'fabricetojo@gmail.com', 'tj123');