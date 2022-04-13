INSERT INTO users (name, email, password)
VALUES (
    'Armand Hilll',
    'lera_hahn@dickens.org',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  );
INSERT INTO users (name, email, password)
VALUES (
    'Stephanie Wolff',
    'darius.homenick@tod.ca',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  );
INSERT INTO users (name, email, password)
VALUES (
    'Stan Miller',
    'mcdermott.maxie@schoen.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  );
INSERT INTO properties (
    owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
    country,
    street,
    city,
    province,
    post_code,
    active
  )
VALUES (
    1,
    'Speed lamp',
    'description',
    'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350',
    'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',
    930,
    1,
    3,
    2,
    'Canada',
    '536 Namsub Highway',
    'Sotboske',
    'Quebec',
    28142,
    true
  );
INSERT INTO properties (
    owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
    country,
    street,
    city,
    province,
    post_code,
    active
  )
VALUES (
    2,
    'Blank corner',
    'description',
    'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350',
    'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg',
    600,
    1,
    1,
    1,
    'Canada',
    '651 Nami Road',
    'Bohbatev',
    'Alberta',
    83680,
    true
  );
INSERT INTO properties (
    owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
    country,
    street,
    city,
    province,
    post_code,
    active
  )
VALUES(
    3,
    'Habit mix',
    'description',
    'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350',
    'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg',
    1000,
    2,
    4,
    3,
    'Canada',
    '1650 Hejto Center',
    'Genwezuj',
    'Newfoundland And Labrador',
    44583,
    true
  );
INSERT INTO reservations (
    start_date,
    end_date,
    property_id,
    guest_id
  )
VALUES ('2021-02-11', '2021-02-23', 1, 1);
INSERT INTO reservations (
    start_date,
    end_date,
    property_id,
    guest_id
  )
VALUES ('2015-08-02', '2015-08-15', 2, 2);
INSERT INTO reservations (
    start_date,
    end_date,
    property_id,
    guest_id
  )
VALUES ('2020-10-30', '2020-11-13', 3, 3);
INSERT INTO property_reviews (
    guest_id,
    property_id,
    reservation_id,
    rating,
    message
  )
VALUES (1, 2, 3, 4, 'message');
INSERT INTO property_reviews (
    guest_id,
    property_id,
    reservation_id,
    rating,
    message
  )
VALUES (2, 1, 2, 7, 'message');
INSERT INTO property_reviews (
    guest_id,
    property_id,
    reservation_id,
    rating,
    message
  )
VALUES (2, 1, 1, 9, 'message');