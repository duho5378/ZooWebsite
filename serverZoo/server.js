const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'zoo_website'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

app.post('/api/register', (req, res) => {
  const { FIRSTNAME, LASTNAME, EMAIL, PHONENUMBER, PASSWORD, POINT } = req.body;

  if (!FIRSTNAME || !LASTNAME || !EMAIL || !PHONENUMBER || !PASSWORD) {
    return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin.' });
  }

  const sql = 'INSERT INTO USER (FIRSTNAME, LASTNAME, EMAIL, PHONENUMBER, PASSWORD, POINT) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(sql, [FIRSTNAME, LASTNAME, EMAIL, PHONENUMBER, PASSWORD, POINT], (err, result) => {
    if (err) {
      console.error('Error inserting new user:', err);
      res.status(500).json({ success: false, message: 'Đã có lỗi xảy ra khi đăng ký tài khoản.' });
      return;
    }
    res.status(200).json({ success: true, message: 'Tài khoản đã được đăng ký thành công.' });
  });
});

app.post('/api/login', (req, res) => {
  const { phoneNumber, password } = req.body;

  const sql = 'SELECT * FROM USER WHERE PHONENUMBER = ? AND PASSWORD = ?';
  connection.query(sql, [phoneNumber, password], (err, results) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ success: false, message: 'Đã có lỗi xảy ra khi đăng nhập.' });
      return;
    }

    if (results.length > 0) {
      res.status(200).json({ success: true, message: 'Đăng nhập thành công.' });
    } else {
      res.status(401).json({ success: false, message: 'Incorrect phone number or password.' });
    }
  });
});

app.get('/api/getLastName/:phoneNumber', (req, res) => {
  const phoneNumber = req.params.phoneNumber;

  const sql = 'SELECT LASTNAME FROM USER WHERE PHONENUMBER = ?';
  connection.query(sql, [phoneNumber], (err, results) => {
    if (err) {
      console.error('Error getting last name:', err);
      res.status(500).json({ success: false, message: 'Đã có lỗi xảy ra khi lấy thông tin lastName.' });
      return;
    }

    if (results.length > 0) {
      const lastName = results[0].LASTNAME;
      res.status(200).json({ success: true, lastName: lastName });
    } else {
      res.status(404).json({ success: false, message: 'Không tìm thấy thông tin lastName cho số điện thoại này.' });
    }
  });
});

app.get('/api/userInfo/:phoneNumber', (req, res) => {
  const phoneNumber = req.params.phoneNumber;

  const sql = 'SELECT * FROM user WHERE PHONENUMBER = ?';
  connection.query(sql, [phoneNumber], (err, results) => {
    if (err) {
      console.error('Error getting user info:', err);
      res.status(500).json({ success: false, message: 'Đã có lỗi xảy ra khi lấy thông tin người dùng.' });
      return;
    }

    if (results.length > 0) {
      const userInfo = results[0];
      res.status(200).json({ success: true, userInfo });
    } else {
      res.status(404).json({ success: false, message: 'Không tìm thấy thông tin người dùng.' });
    }
  });
});

app.get('/api/tickets', (req, res) => {
  const sql = 'SELECT ID, AGE, TYPE, PRICE FROM ticket'; // Tên bảng cần truy cập là ticket
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error getting tickets info:', err);
      res.status(500).json({ success: false, message: 'Đã có lỗi xảy ra khi lấy thông tin vé.' });
      return;
    }

    if (results.length > 0) {
      res.status(200).json({ success: true, tickets: results });
    } else {
      res.status(404).json({ success: false, message: 'Không tìm thấy thông tin vé.' });
    }
  });
});

app.get('/api/userPoint/:phoneNumber', (req, res) => {
  const phoneNumber = req.params.phoneNumber;

  const getUserPointQuery = 'SELECT POINT FROM user WHERE PHONENUMBER = ?';
  connection.query(getUserPointQuery, [phoneNumber], (err, results) => {
    if (err) {
      console.error('Error getting user point:', err);
      res.status(500).json({ success: false, message: 'Đã có lỗi xảy ra khi lấy điểm số của người dùng.' });
      return;
    }

    if (results.length > 0) {
      const userPoint = results.POINT;
      res.status(200).json({ success: true, userPoint });
    } else {
      res.status(404).json({ success: false, message: 'Không tìm thấy thông tin điểm số của người dùng.' });
    }
  });
});

app.get('/api/userRank/:userPoint', (req, res) => {
  const userPoint = req.params.userPoint;

  const getRankQuery = 'SELECT SALE, URANK FROM discount WHERE POINT <= ? ORDER BY POINT DESC LIMIT 1';
  connection.query(getRankQuery, [userPoint], (err, rankResults) => {
    if (err) {
      console.error('Error getting user rank:', err);
      res.status(500).json({ success: false, message: 'Error fetching user rank.' });
      return;
    }

    if (rankResults.length > 0) {
      const userRank = rankResults;
      res.status(200).json({ success: true, userRank });
    } else {
      res.status(404).json({ success: false, message: 'User rank not found.' });
    }
  });
});

app.put('/api/updateUserPoint', (req, res) => {
  const { phoneNumber, point } = req.body;
  console.log('Received request to update user point. PhoneNumber:', phoneNumber, 'Point:', point);

  if (!Number.isInteger(point) || point < 0) {
    return res.status(400).json({ success: false, message: 'Invalid point value.' });
  }

  // Lấy điểm số hiện tại từ cơ sở dữ liệu dựa trên số điện thoại
  const getCurrentUserPointQuery = 'SELECT POINT FROM user WHERE PHONENUMBER = ?';
  connection.query(getCurrentUserPointQuery, [phoneNumber], (err, result) => {
    if (err) {
      console.error('Error getting current user point:', err);
      res.status(500).json({ success: false, message: 'Error getting current user point.' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ success: false, message: 'User not found.' });
      return;
    }

    // Tiến hành tính toán điểm số mới (cộng điểm cũ và điểm mới)
    const currentUserPoint = result[0].POINT;
    const updatedPoint = currentUserPoint + point;

    // Thực hiện cập nhật điểm số mới vào cơ sở dữ liệu dựa trên số điện thoại
    const updateUserPointQuery = 'UPDATE user SET POINT = ? WHERE PHONENUMBER = ?';
    connection.query(updateUserPointQuery, [updatedPoint, phoneNumber], (updateErr, updateResult) => {
      if (updateErr) {
        console.error('Error updating user point:', updateErr);
        res.status(500).json({ success: false, message: 'Error updating user point.' });
        return;
      }
      res.status(200).json({ success: true, message: 'User point updated successfully.' });
    });
  });
});

app.get('/api/events', (req, res) => {
  const sql = 'SELECT ETIME, EDISC FROM event'; // Thay đổi tên bảng và cột tương ứng trong cơ sở dữ liệu của bạn
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching events:', err);
      res.status(500).json({ success: false, message: 'Đã có lỗi xảy ra khi lấy thông tin sự kiện.' });
      return;
    }

    if (results.length > 0) {
      res.status(200).json(results); // Trả về danh sách sự kiện nếu có
    } else {
      res.status(404).json({ success: false, message: 'Không tìm thấy thông tin sự kiện.' });
    }
  });
});

app.put('/api/eventEtimes/:eventId', (req, res) => {
  const eventId = req.params.eventId;
  const { value } = req.body;
  console.log(eventId, value);
  const updateFieldQuery = `UPDATE event SET ETIME = ? WHERE EID = ?`; // Thay đổi tên cột từ EID sang ID
  connection.query(updateFieldQuery, [value, eventId], (err, result) => {
    if (err) {
      console.error('Error updating ETIME:', err);
      res.status(500).json({ success: false, message: 'Đã có lỗi xảy ra khi cập nhật ETIME.' });
      return;
    }
    res.status(200).json({ success: true, message: 'Đã cập nhật ETIME thành công.' });
  });
});

app.put('/api/eventEdisc/:eventId', (req, res) => {
  const eventId = req.params.eventId;
  const { value } = req.body;
  console.log(eventId, value);
  const updateFieldQuery = `UPDATE event SET EDISC = ? WHERE EID = ?`;
  connection.query(updateFieldQuery, [value, eventId], (err, result) => {
    if (err) {
      console.error('Lỗi khi cập nhật EDISC:', err);
      res.status(500).json({ success: false, message: 'Đã có lỗi xảy ra khi cập nhật EDISC.' });
      return;
    }
    res.status(200).json({ success: true, message: 'Đã cập nhật EDISC thành công.' });
  });
});

app.get('/api/allUsers', (req, res) => {
  const sql = 'SELECT * FROM user';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching all users:', err);
      res.status(500).json({ success: false, message: 'Đã có lỗi xảy ra khi lấy thông tin người dùng.' });
      return;
    }

    if (results.length > 0) {
      res.status(200).json({ success: true, users: results });
    } else {
      res.status(404).json({ success: false, message: 'Không tìm thấy thông tin người dùng.' });
    }
  });
});

app.delete('/api/deleteUser/:phoneNumber', (req, res) => {
  const phoneNumber = req.params.phoneNumber;

  const deleteQuery = 'DELETE FROM user WHERE PHONENUMBER = ?';
  connection.query(deleteQuery, [phoneNumber], (err, result) => {
    if (err) {
      console.error('Lỗi khi xóa người dùng:', err);
      res.status(500).json({ success: false, message: 'Đã có lỗi xảy ra khi xóa người dùng.' });
      return;
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: 'Người dùng đã được xóa thành công.' });
    } else {
      res.status(404).json({ success: false, message: 'Không tìm thấy người dùng để xóa.' });
    }
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
