import express from 'express';
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
// import requireAuth from '../middlewares/requireAuth.js'; 

const router = express.Router()


// router.post("/employee_login", (req, res) => {
//   const sql = "SELECT * from employees Where email = ?";
//   con.query(sql, [req.body.email], (err, result) => {
//     if (err) return res.json({ loginStatus: false, Error: "Query error" });
//     if (result.length > 0) {
//       bcrypt.compare(req.body.password, result[0].password, (err, response) => {
//         if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
//         if(response) {
//           const email = result[0].email;
//           const token = jwt.sign({ role: "employee", email: email, id: result[0].id },"jwt_secret_key",{ expiresIn: "1d" });
//           res.cookie('token', token)
//           return res.json({ loginStatus: true, id: result[0].id });
//         }
//       })
      
//     } else {
//       return res.json({ loginStatus: false, Error:"wrong email or password" });
//     }
//   });
// });
router.post("/employee_login", (req, res) => {
  const sql = "SELECT * from employees Where email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    
    if (result.length > 0) {
      const storedPassword = result[0].password;

      // Check if the stored password is bcrypt encrypted
      if (storedPassword.startsWith('$2a$') || storedPassword.startsWith('$2b$') || storedPassword.startsWith('$2y$')) {
        bcrypt.compare(req.body.password, storedPassword, (err, response) => {
          if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
          if (response) {
            const email = result[0].email;
            
            var user_role = 'employee'
            if (result[0].id_department == 2) {user_role = 'admin'};

            const token = jwt.sign({ role: "employee", email: email, id: result[0].id }, "jwt_secret_key", { expiresIn: "1d" });
            res.cookie('token', token);
            return res.json({ loginStatus: true, id: result[0].id });
          } else {
            return res.json({ loginStatus: false, Error: "Wrong Password" });
          }
        });
      } else {
        // Directly compare the passwords
        if (req.body.password === storedPassword) {
          const email = result[0].email;

          var user_role = 'employee'
          if (result[0].id_department == 2) {user_role = 'admin'};
          
          const token = jwt.sign({ role: "employee", email: email, id: result[0].id }, "jwt_secret_key", { expiresIn: "1d" });
          res.cookie('token', token);
          return res.json({ loginStatus: true, id: result[0].id });
        } else {
          return res.json({ loginStatus: false, Error: "Wrong Password" });
        }
      }
    } else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
});


// router.use(requireAuth);

router.get('/employee_record/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employees where id = ?"
  con.query(sql, [id], (err, result) => {
    if(err) return res.json({Status: false});
    return res.json(result)
  })
})



// const app = express();
// app.get('/dashboard/*', function(req,res,next){
//   var authenticated = false;
//   //do something to authenticate user
//   if(authenticated === true){
//       //user is already authenticated
//       res.redirect('/factory/fake.html');
//   }else{
//       //redirect to login
//       res.redirect('/entrance');
//   }
// });

// ASSIGN WORK
router.get('/assign_work/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM assign_work where id = ?"
  con.query(sql, [id], (err, result) => {
    if(err) return res.json({Status: false});
    return res.json(result)
  })
})
router.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({Status: true})
})


export {router as employeeRouter}