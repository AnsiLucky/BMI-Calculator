const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require("fs");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// JSON file to store BMI history
const historyFilePath = path.join(__dirname, '../db/bmiHistory.json');

function readHistory() {
  try {
    const historyData = fs.readFileSync(historyFilePath, "utf8");
    return JSON.parse(historyData);
  } catch (error) {
    return [];
  }
}

// Route to get BMI history
router.route('/history')
  // .get((req, res) => {
  //   res.render(path.join(__dirname, '../views/history.ejs'));
  // })
  .get((req, res) => {
    let dataArray = fs.readFileSync(path.join(__dirname, '../db/bmiHistory.json'), 'utf-8');
    dataArray = JSON.parse(dataArray);
    console.log(dataArray);
    try {
      res.status(200).render('history', { dataArray });
    } catch (error) {
      console.log(error);
      res.send("The error occurs");
    }
  });

module.exports = router;