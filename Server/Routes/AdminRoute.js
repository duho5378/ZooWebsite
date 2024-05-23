import express from 'express';
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
// import { authRole } from '../basicAuth.js';
// import { decodeJWT } from '../authMiddleware.js';

// import multer from "multer";
// import path from "path";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign({ role: "admin", email: email, id: result[0].id },"jwt_secret_key",{ expiresIn: "1d" });
      res.cookie('token', token)
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error:"wrong email or password" });
    }
  });
})


router.get('/department',(req, res) => {
  const sql = "SELECT* From department"
  con.query(sql, (err, result) => {
    if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true, Result: result})
  })
})

// router.post('/add_department', (req, res) => {
//   const sql = "INSERT INTO department (`name`) VALUES (?)"
//   con.query(sql, [req.body.department], (err, result) => {
//     if(err) return res.json({Status: false, Error: "Query Error"})
//     return res.json({Status: true})
//   })
// })
router.post('/add_department', (req, res) => {
  const sql = `INSERT INTO department (name, id_manager, inauguration_day) VALUES (?)`;

  const values = [
    req.body.name,
    req.body.id_manager,
    req.body.inauguration_day
  ];

  con.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Query Error:', err);
      return res.json({ Status: false, Error: err });
    }
    return res.json({ Status: true });
  });
});

// // image upload 
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'Public/Images')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//   }
// })
// const upload = multer({
//   storage: storage
// })
// // end imag eupload 


// router.post('/add_employee', upload.single('image'), (req, res) => {
router.post('/add_employee', (req, res) => {
  console.log('Request Body:', req.body);
  console.log('Request File:', req.file);

  const sql = `INSERT INTO employees
    (first_name, last_name, sex, birth, phone_number, email, password, salary, id_department, id_leader) 
    VALUES (?)`;

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.error('Hashing Error:', err);
      return res.json({ Status: false, Error: "Hashing Error" });
    }
    const values = [
      req.body.first_name,
      req.body.last_name,
      req.body.sex,
      req.body.birth,
      req.body.phone_number,
      req.body.email,
      hash,
      req.body.salary,
      // req.file.filename,
      req.body.id_department,
      req.body.id_leader
    ];

    con.query(sql, [values], (err, result) => {
      if (err) {
        console.error('Query Error:', err);
        return res.json({ Status: false, Error: err });
      }
      return res.json({ Status: true });
    });
  });
});

router.get('/employee', (req, res) => {
  const sql = "SELECT * FROM employees";
  con.query(sql, (err, result) => {
    if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true, Result: result})
  })
})


// FOR ASSING WORK

router.post('/add_assign_work', (req, res) => {
  const sql = `INSERT INTO assign_work (id, id_site, work) VALUES (?)`;

  const values = [
    req.body.id,
    req.body.id_site,
    req.body.work
  ];
  con.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Query Error:', err);
      return res.json({ Status: false, Error: err });
    }
    return res.json({ Status: true });
  });
});

router.get('/assign_work', (req, res) => {
  const sql = "SELECT * FROM assign_work";
  con.query(sql, (err, result) => {
    if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true, Result: result})
  })
})
router.get('/assign_work/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM assign_work WHERE id = ?";
  con.query(sql,[id], (err, result) => {
    if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true, Result: result})
  })
})

router.delete('/delete_assign_work/:id', (req, res) => {
  const id = req.params.id;
  const sql = "delete from assign_work where id = ?"
  con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

router.put('/edit_assign_work/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE assign_work set id_site = ?, work = ? Where id = ?`;

  const values = [
    req.body.id_site,
    req.body.work,
  ];

  con.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});


// GET FOR SITE TABLKE
router.get('/site', (req, res) => {
  const sql = "SELECT * FROM site";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

// GET FOR INFRASTRUCTURE TABLKE
router.get('/infrastructure', (req, res) => {
  const sql = "SELECT * FROM infrastructure";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})
router.get('/infrastructure/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM infrastructure WHERE id = ?";
  con.query(sql,[id], (err, result) => {
    if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true, Result: result})
  })
})

router.post('/add_infrastructure', (req, res) => {
  const sql = `INSERT INTO infrastructure (name, id_site, status) VALUES (?)`;
  const values = [
    req.body.name,
    req.body.id_site,
    req.body.status
  ];
  con.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Query Error:', err);
      return res.json({ Status: false, Error: err });
    }
    return res.json({ Status: true });
  });
});

router.put('/edit_infrastructure/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE infrastructure set name = ?, id_site = ?, status = ? Where id = ?`;

  const values = [
    req.body.name,
    req.body.id_site,
    req.body.status,
  ];

  con.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.delete('/delete_infrastructure/:id', (req, res) => {
  const id = req.params.id;
  const sql = "delete from infrastructure where id = ?"
  con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

// SPECIES TABLE
router.get('/species', (req, res) => {
  const sql = "SELECT * FROM species";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})
router.post('/add_species', (req, res) => {
  const sql = `INSERT INTO species (name, conservation_status, id_habitat) VALUES (?)`;
  const values = [
    req.body.name,
    req.body.conservation_status,
    req.body.id_habitat,
  ];
  con.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Query Error:', err);
      return res.json({ Status: false, Error: err });
    }
    return res.json({ Status: true });
  });
});
router.delete('/delete_species/:id', (req, res) => {
  const id = req.params.id;
  const sql = "delete from species where id = ?"
  con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

// HABITAT
router.get('/habitat', (req, res) => {
  const sql = "SELECT * FROM habitat";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})
router.get('/habitat/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM habitat WHERE id = ?";
  con.query(sql,[id], (err, result) => {
    if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true, Result: result})
  })
});
router.post('/add_habitat', (req, res) => {
  const sql = `INSERT INTO habitat (name, temp, humidity, depth, id_site) VALUES (?)`;
  const values = [
    req.body.name,
    req.body.temp,
    req.body.humidity,
    req.body.depth,
    req.body.id_site,
  ];
  con.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Query Error:', err);
      return res.json({ Status: false, Error: err });
    }
    return res.json({ Status: true });
  });
});


// ANIMAL TABLE
router.get('/animal', (req, res) => {
  const sql = "SELECT * FROM animal";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
});

router.get('/animal/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM animal WHERE id = ?";
  con.query(sql,[id], (err, result) => {
    if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true, Result: result})
  })
});

router.post('/add_animal', (req, res) => {
  const sql = `INSERT INTO animal (name, birth, sex, day_arrive, health_status, origin, id_species) VALUES (?)`;
  const values = [
    req.body.name,
    req.body.birth,
    req.body.sex,
    req.body.day_arrive,
    req.body.health_status,
    req.body.origin,
    req.body.id_species,

  ];
  con.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Query Error:', err);
      return res.json({ Status: false, Error: err });
    }
    return res.json({ Status: true });
  });
});

router.put('/edit_animal/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE animal set name = ?, birth = ?, sex = ?, day_arrive = ?, health_status = ?, origin = ?, id_species = ? Where id = ?`;

  const values = [
    req.body.name,
    req.body.birth,
    req.body.sex,
    req.body.day_arrive,
    req.body.health_status,
    req.body.origin,
    req.body.id_species,
  ];

  con.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
});

router.delete('/delete_animal/:id', (req, res) => {
  const id = req.params.id;
  const sql = "delete from animal where id = ?"
  con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

// ZOO TABLE
router.get('/zoo', (req, res) => {
  const sql = "SELECT * FROM zoo";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
});

router.post('/add_zoo', (req, res) => {
  const sql = `INSERT INTO zoo (address, name, phone_number, email, city, country) VALUES (?)`;
  const values = [
    req.body.address,
    req.body.name,
    req.body.phone_number,
    req.body.email,
    req.body.city,
    req.body.country,

  ];
  con.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Query Error:', err);
      return res.json({ Status: false, Error: err });
    }
    return res.json({ Status: true });
  });
});

router.delete('/delete_zoo/:address', (req, res) => {
  const id = req.params.address;
  const sql = "delete from zoo where address = ?"
  con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})


// EAT TABLE
router.get('/eat', (req, res) => {
  const sql = "SELECT * FROM eat";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
});
router.post('/add_eat', (req, res) => {
  const sql = `INSERT INTO eat (id_animal, id_food, quantity) VALUES (?)`;
  const values = [
    req.body.id_animal,
    req.body.id_food,
    req.body.quantity,

  ];
  con.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Query Error:', err);
      return res.json({ Status: false, Error: err });
    }
    return res.json({ Status: true });
  });
});

// FOOD TABLE
router.get('/food', (req, res) => {
  const sql = "SELECT * FROM food";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
});
router.get('/food/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM food WHERE id = ?";
  con.query(sql,[id], (err, result) => {
    if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true, Result: result})
  })
});

router.put('/edit_food/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE food set name = ?, inventory_quantity = ?, unit = ?, date_purch = ?, date_expiry = ? Where id = ?`;

  const values = [
    req.body.name,
    req.body.inventory_quantity,
    req.body.unit,
    req.body.date_purch,
    req.body.date_expiry,
  ];

  con.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
});

router.post('/add_food', (req, res) => {
  const sql = `INSERT INTO food ( name, inventory_quantity, unit, date_purch, date_expiry) VALUES (?)`;
  const values = [
    req.body.name,
    req.body.inventory_quantity,
    req.body.unit,
    req.body.date_purch,
    req.body.date_expiry,

  ];
  con.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Query Error:', err);
      return res.json({ Status: false, Error: err });
    }
    return res.json({ Status: true });
  });
});

router.delete('/delete_food/:id', (req, res) => {
  const id = req.params.id;
  const sql = "delete from food where id = ?"
  con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
});



// BUY FOOD TABLE
router.get('/buy_food', (req, res) => {
  const sql = "SELECT * FROM buy_food";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
});
router.get('/buy_food/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM buy_food WHERE id = ?";
  con.query(sql,[id], (err, result) => {
    if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true, Result: result})
  })
});

router.put('/edit_buy_food/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE buy_food set id_food = ?, quantity = ?, unit_price = ? Where id = ?`;

  const values = [
    req.body.id_food,
    req.body.quantity,
    req.body.unit_price,

  ];

  con.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
});

router.post('/add_buy_food', (req, res) => {
  const sql = `INSERT INTO buy_food ( id_food, quantity, unit_price) VALUES (?)`;
  const values = [
    req.body.id_food,
    req.body.quantity,
    req.body.unit_price,

  ];
  con.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Query Error:', err);
      return res.json({ Status: false, Error: err });
    }
    return res.json({ Status: true });
  });
});

router.delete('/delete_buy_food/:id', (req, res) => {
  const id = req.params.id;
  const sql = "delete from buy_food where id = ?"
  con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
});

// MEDICAL HISTORY TABLE
router.get('/medical_history', (req, res) => {
  const sql = "SELECT * FROM medical_history";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
});
router.get('/medical_history/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM medical_history WHERE id = ?";
  con.query(sql,[id], (err, result) => {
    if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true, Result: result})
  })
});

router.put('/edit_medical_history/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE medical_history set id_animal = ?, id_employee = ?, diagnose = ?, treatment =?, day = ? Where id = ?`;

  const values = [
    req.body.id_animal,
    req.body.id_employee,
    req.body.diagnose,
    req.body.treatment,
    req.body.day,

  ];

  con.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
});

router.post('/add_medical_history', (req, res) => {
  const sql = `INSERT INTO medical_history ( id_animal, id_employee, diagnose, treatment, day) VALUES (?)`;
  const values = [
    req.body.id_animal,
    req.body.id_employee,
    req.body.diagnose,
    req.body.treatment,
    req.body.day,

  ];
  con.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Query Error:', err);
      return res.json({ Status: false, Error: err });
    }
    return res.json({ Status: true });
  });
});

router.delete('/delete_medical_history/:id', (req, res) => {
  const id = req.params.id;
  const sql = "delete from medical_history where id = ?"
  con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
});

// EMPLOYEE TABLE
router.get('/employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employees WHERE id = ?";
  con.query(sql,[id], (err, result) => {
    if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true, Result: result})
  })
})

router.put('/edit_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employees 
    set first_name = ?, last_name = ?, sex = ?, birth = ?, phone_number = ?, email = ?, password = ?, salary = ?, id_department = ?, id_leader = ? 
    Where id = ?`;

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "Hashing Error" });

    const values = [
      req.body.first_name,
      req.body.last_name,
      req.body.sex,
      req.body.birth,
      req.body.phone_number,
      req.body.email,
      hash,
      req.body.salary,
      req.body.id_department,
      req.body.id_leader
    ];

    con.query(sql, [...values, id], (err, result) => {
      if (err) {
        console.error('Query Error:', err);
        return res.json({ Status: false, Error: err });
      }
      return res.json({ Status: true });
    });
  });
});

router.delete('/delete_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = "delete from employees where id = ?"
  con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})



router.get("/admin_count", (req, res) => {
  const sql = "select count(id) as admin from admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true, Result: result})
  })
})

router.get("/employee_count", (req, res) => {
  const sql = "select count(id) as employee from employees";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

router.get("/salary_count", (req, res) => {
  const sql = "select sum(salary) as TotalSalary from employees";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})
router.get("/feeding_cost", (req, res) => {
  const sql = "SELECT SUM(quantity * unit_price) AS TotalCost FROM buy_food";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

// // FOR CUSTOMER
// router.get("/visitor_acc_count", (req, res) => {
//   const sql = "SELECT COUNT(phone_number) AS visitor FROM customer";
//   con.query(sql, (err, result) => {
//       if(err) return res.json({Status: false, Error: "Query Error"})
//       return res.json({Status: true, Result: result})
//   })
// })
// router.get("/income_book", (req, res) => {
//   const sql = "SELECT SUM(price) AS TotalIncome FROM tickets";
//   con.query(sql, (err, result) => {
//       if(err) return res.json({Status: false, Error: "Query Error"})
//       return res.json({Status: true, Result: result})
//   })
// })

router.get("/admin_records", (req, res) => {
  const sql = "select * from admin"
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})
router.delete('/delete_admin/:id', (req, res) => {
  const id = req.params.id;
  const sql = "delete from admin where id = ?"
  con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({Status: true})
})


export {router as adminRouter};

// import express from 'express';

// const router = express.Router();
// router.post("/adminlogin", (req, res) => {
//     console.log(req.body);
// })

// export {router as adminRouter};