const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});





const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function (email) {
  const queryString = `
      SELECT *
      FROM users
      WHERE email = $1;`;
  return pool
    .query(queryString, [email.toLowerCase()])
    .then(result => result ? result.rows[0] : null);
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const queryString = `
      SELECT *
      FROM users
      WHERE id = $1;`;
  return pool
    .query(queryString, [id])
    .then(result => result ? result.rows[0] : null);
};

exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const queryString = `
        INSERT INTO users 
            (name, password, email)
        VAlUES
            ($1, $2, $3)
        RETURNING *;`
  return pool.query(queryString,
    [user.name, user.password, user.email.toLowerCase()])
    .then(res => res.rows[0]);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const queryString = `
      SELECT
          properties.*,
          reservations.*,
          avg(property_reviews.rating) AS average_rating
          FROM reservations
          JOIN properties ON reservations.property_id = properties.id
          JOIN property_reviews ON properties.id = property_reviews.property_id
      WHERE 
          reservations.guest_id = $1 AND
          reservations.end_date < now()::date
      GROUP BY reservations.id, properties.id
      ORDER BY reservations.start_date
      LIMIT $2;
  `;
  return pool.query(queryString, [guest_id, limit]).then(res => res.rows);
};

exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {

  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    // if user typed city name in lowercase change the first letter to uppercase
    options.city = options.city.charAt(0).toUpperCase() + options.city.substring(1, options.city.length).toLowerCase();
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(Number(options.owner_id));
    queryString += `WHERE owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(Number(options.minimum_price_per_night) * 100, Number(options.maximum_price_per_night) * 100);
    if (options.city) {
      queryString += `AND cost_per_night >=$${queryParams.length - 1} AND cost_per_night <=$${queryParams.length} `;
    } else {
      queryString += `WHERE cost_per_night >=$${queryParams.length - 1} AND cost_per_night <=$${queryParams.length} `;
    }
  } else if (!options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(Number(options.maximum_price_per_night) * 100);
    if (options.city) {
      queryString += `AND cost_per_night <=$${queryParams.length} `;
    } else {
      queryString += `WHERE cost_per_night <=$${queryParams.length} `;
    }
  } else if (options.minimum_price_per_night && !options.maximum_price_per_night) {
    queryParams.push(Number(options.minimum_price_per_night) * 100);
    if (options.city) {
      queryString += `AND cost_per_night >=$${queryParams.length} `;
    } else {
      queryString += `WHERE cost_per_night >=$${queryParams.length} `;
    }
  }

  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));

    queryString += `
  GROUP BY properties.id 
  HAVING avg(property_reviews.rating) >= $${queryParams.length} `;

  } else {
    queryString += `
  GROUP BY properties.id `;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;


  console.log(queryParams);
  console.log(queryString);

  return pool.query(queryString, queryParams).then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const queryString = `
  INSERT INTO properties (
  title,
  description,
  owner_id,
  cover_photo_url,
  thumbnail_photo_url,
  cost_per_night,
  parking_spaces,
  number_of_bathrooms,
  number_of_bedrooms,
  province,
  city,
  country,
  street,
  post_code
  ) 
  VALUES 
  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
  RETURNING *;`

  const queryParam = [
    property.title,
    property.description,
    +property.owner_id,
    property.cover_photo_url,
    property.thumbnail_photo_url,
    property.cost_per_night,
    +property.parking_spaces,
    +property.number_of_bathrooms,
    +property.number_of_bedrooms,
    property.province,
    property.city,
    property.country,
    property.street,
    property.post_code
  ];
  return pool.query(queryString, queryParam).then(res => res.rows[0]);
}
exports.addProperty = addProperty;
