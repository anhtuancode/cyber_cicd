import mysql from 'mysql2/promise';

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  // // c1
  // host: 'localhost',
  // user: 'root',
  // database: 'AppFood_CyberSoft',
  // port: "3307",
  // password:"1234",

  //c2
  uri: 'mysql://root:1234@localhost:3307/AppFood_CyberSoft',

  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export default pool;