const express  = require("express");

const { transporter } = require("../config/ses");

const router = express.Router();

router.post("/feedback", async (req, res) => {
  let { feedbackType, feedback } = req.body;

  transporter.sendMail({
    from: 'adamhpan@gmail.com',
    to: 'adamhpan@gmail.com',
    subject: 'Snackpin Feedback',
    html: `
      <b>${feedbackType}</b>
      <p>${feedback}</p>
    `
  }, (err, info) => {
    res.sendStatus(200);
  });
});


module.exports = router;
