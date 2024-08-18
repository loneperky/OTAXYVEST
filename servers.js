const express = require("express");
const app = express();
const path = require("path");
const pg = require("pg");
const ejs = require("ejs");
const bcryptjs = require("bcryptjs");
// const session = require("express-session");
// const passport = require("passport");
// const { Strategy } = require("passport-local");
const bodyParser = require("body-parser");
//const { verify } = require("crypto");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const saltRound = 10;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/savings", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/savings.html"));
});
app.get("/yield", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/yield.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/signin.html"));
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/signup.html"));
});

app.get("/home-dashboard.ejs", (req, res) => {
  const fname = req.body.fname;
  res.render("home-dashboard.ejs", { firstName: fname });
});
app.get("/money-page.ejs", (req, res) => {
  const fname = req.body.fname;
  res.render("money-page.ejs", { firstName: fname });
});
app.get("/collect.ejs", (req, res) => {
  const fname = req.body.fname;
  res.render("collect.ejs", { firstName: fname });
});
app.get("/payment.ejs", (req, res) => {
  const fname = req.body.fname;
  res.render("payment.ejs", { firstName: fname });
});
app.get("/portfolio.ejs", (req, res) => {
  const fname = req.body.fname;
  res.render("portfolio.ejs", { firstName: fname });
});
app.get("/invest.ejs", (req, res) => {
  const fname = req.body.fname;
  res.render("invest.ejs", { firstName: fname });
});
app.get("/save.ejs", (req, res) => {
  const fname = req.body.fname;
  res.render("save.ejs", { firstName: fname });
});

////// USING PASSPORT AND EXPRESS SESSION TO LOGIN A USER.

// app.use(
//   session({
//     secret: "TOPSECRET",
//     resave: false,
//     saveUninitialized: true,

//   })
// );
// make sure to create your session before using the passport initialise and session middleware
// app.use(passport.initialize());
// app.use(passport.session());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Otaxyvest",
  password: "IYARE2468",
  port: 5433,
});

db.connect();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// app.get("/home-dashboard", async (req, res) => {
//   console.log(req.user);
//   if (req.isAuthenticated()) {
//     const fname = await db.query(
//       "SELECT first_name FROM user_info WHERE email_address = $1",
//       [email]
//     );
//     res.render("dashboard.ejs", { firstName: fname });
//   } else {
//     res.redirect("/login");
//   }
// });

app.post("/investment", async (req, res) => {
  const fname = req.body.fname;
  const amount = req.body.amount;
  const result = await db.query(
    "INSERT INTO amount_deposited (amount)VALUES($1)",
    [amount]
  );
  res.render("collect.ejs", { firstName: fname, amountIn: amount });
});

app.post("/addbank", async (req, res) => {
  const fname = req.body.fname;
  const acc_num = req.body.acc_num;
  const bank = req.body.bank;
  const result = await db.query(
    "INSERT INTO bank_details (bank,acc_number)VALUES($1,$2)",
    [bank, acc_num]
  );
  res.render("dashboard.ejs", { firstName: fname });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// app.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/home-dashboard",
//     failureRedirect: "/login",
//   })
// );

app.post("/register", async (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const phone_num = req.body.phone_no;
  const promo = req.body.promo;
  const password = req.body.password;

  try {
    const checkedResult = await db.query(
      "SELECT * FROM user_info WHERE email_address = $1",
      [email]
    );
    if (checkedResult.rows.length > 0) {
      res.redirect("login");
    } else {
      bcryptjs.hash(password, saltRound, async (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          const result = await db.query(
            "INSERT INTO user_info (first_name,last_name,email_address,phone_number,password,promo_code) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
            [fname, lname, email, phone_num, hash, promo]
          );
          res.render("dashboard.ejs", { firstName: fname });
        }
      });
    }
  } catch (error) {
    console.log("something went wrong", error);
  }
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/error.html"));
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.passowrd;
  try {
    const checkedResult = await db.query(
      "SELECT * FROM user_info WHERE email_address= $1",
      [email]
    );

    if (checkedResult.rows.length > 0) {
      const user = checkedResult.rows[0];
      const storedPassword = user.password;
      bcryptjs.compare(password, storedPassword, (err, result) => {
        if (err) {
          console.log("could not compare both password!! there was an error from the begining", err);
        } else {
          if (result) {
            const fname = user.last_name;
            res.render("dashboard.ejs", { firstName: fname });
          } else {
            console.log('error trying to compare both passwords!!!',err)
           
          }
        }
      });
    } else {
      res.redirect("/signup");
    }
  } catch (err) {
    console.log(err);
  }
});

// passport.use(
//   new Strategy(async function verify(email, password, cb) {
//     console.log(email);

//   })
// );
// passport.serializeUser((user, cb) => {
//   cb(null, user);
// });

// passport.deserializeUser((user, cb) => {
//   cb(null, user);
// });

app.listen(9000, () => {
  console.log("servers is running on port 9000");
});
