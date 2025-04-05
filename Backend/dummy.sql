-- Clear old data (in reverse FK order)
DELETE FROM Donation;
DELETE FROM Organization;
DELETE FROM Donator;
DELETE FROM ItemType;
DELETE FROM Location;

-- 1. Locations
INSERT INTO Location (address, city, state, zip_code, latitude, longitude)
VALUES 
('123 Elm Street', 'San Francisco', 'CA', '94102', 37.779, -122.419),
('456 Oak Avenue', 'Los Angeles', 'CA', '90012', 34.052, -118.244),
('789 Maple Road', 'Sacramento', 'CA', '94203', 38.576, -121.493);

-- 2. Donators
INSERT INTO Donator (name, email, phone)
VALUES 
('Alice Johnson', 'alice@example.com', '555-1234'),
('Bob Smith', 'bob@example.com', '555-5678');

-- 3. Item Types
INSERT INTO ItemType (name, description)
VALUES 
('Food', 'Canned goods, non-perishables, dry rations'),
('Clothing', 'Warm clothing, children’s wear, jackets'),
('Medicine', 'OTC and first aid supplies');

-- 4. Organizations (linked to location)
INSERT INTO Organization (name, description, contact_email, contact_phone, location_id)
VALUES 
('Helping Hands Shelter', 'Shelter for the unhoused in SF.', 'contact@helpinghands.org', '555-0001', 1),
('LA Food Bank', 'Non-profit distributing food to those in need.', 'info@lafoodbank.org', '555-0002', 2);

-- 5. Donations (linked to orgs, donators, item types)
INSERT INTO Donation (donator_id, item_type_id, money, quantity, aid_organization_id)
VALUES 
(1, 1, NULL, 10, 1),  -- Alice donated 10 units of food to SF shelter
(2, 2, NULL, 5, 2),   -- Bob donated 5 units of clothing to LA Food Bank
(1, 3, 50, NULL, 1);  -- Alice donated $50 for medicine
