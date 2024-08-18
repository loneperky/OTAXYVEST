const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "IYARE2468",
  port: 5433
});

db.connect();