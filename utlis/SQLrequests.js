const insertItems = (database, arg, arg2, arg3, arg4) => {
  return `INSERT INTO ${database} ( ${arg}, ${arg2}, ${arg3}, ${arg4}) VALUES ($1, $2, $3, $4) RETURNING *`;
};

const findByItem = (database, item) => {
  return `SELECT * FROM ${database} WHERE ${item} = $1`;
};

const returnItems = (database) => {
  return `SELECT * FROM ${database}`;
};

const returnByItems = (database, arg, arg2) => {
  return `SELECT * FROM ${database} WHERE ${arg} = $1 AND ${arg2} = $2`;
};

const returnByItem = (database, arg) => {
  return `SELECT * FROM ${database} WHERE ${arg} = $1 `;
};

const updateItem = (database, arg, arg2) => {
  return `UPDATE ${database} SET ${arg} = $1 WHERE ${arg2} = $2`;
};

module.exports = {
  insertItems,
  findByItem,
  returnByItems,
  updateItem,
  returnByItem,
  returnItems,
};
