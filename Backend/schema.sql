-- LOCATION TABLE
CREATE TABLE IF NOT EXISTS Location (
    id SERIAL PRIMARY KEY,
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    latitude FLOAT,
    longitude FLOAT
);

-- DONATOR TABLE
CREATE TABLE IF NOT EXISTS Donator (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ORGANIZATION TABLE
CREATE TABLE IF NOT EXISTS Organization (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    contact_email VARCHAR(100),
    contact_phone VARCHAR(20),
    location_id INT REFERENCES Location(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ITEM TYPE TABLE
CREATE TABLE IF NOT EXISTS ItemType (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- DONATION TABLE
CREATE TABLE IF NOT EXISTS Donation (
    id SERIAL PRIMARY KEY,
    donator_id INT REFERENCES Donator(id),
    item_type_id INT REFERENCES ItemType(id),
    money INT,
    quantity INT,
    donation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    aid_organization_id INT REFERENCES Organization(id)
);
