
const express = require('express');
const router  = express.Router();

let generateRandomString = () => Math.random().toString(36).substring(2,8);

module.exports = (db) => {
router.get('/', (req, res) => {
  db.query('SELECT polls.title FROM polls;')
  .then(data => {
    const polls = data.rows;
    res.render('index', { polls });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });

});

router.get("/new", (req, res) => {
  res.render("new")
})

router.post("/new", (req, res) => {
  let id = generateRandomString();
  console.log(req.body)
})

router.get("/:survey_id", (req, res) => {
  const survey_id = req.params.survey_id;
  db.query('SELECT polls.title, choices.title AS choices_title, choices.description FROM polls JOIN choices ON polls.id = choices.poll_id WHERE poll_id = $1;', [survey_id])
  .then(data => {
    const survey = data.rows;
    console.log(survey);
    res.render("survey", { survey } );
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });

})

router.get("/:survey_id/results", (req, res) => {
  const survey_id = req.params.survey_id;
  db.query('SELECT polls.title AS poll, choices.title, choices.total_points FROM polls JOIN choices on polls.id = choices.poll_id WHERE poll_id = $1;', [survey_id])
  .then(data => {
    const results = data.rows;
    console.log(results);
    res.render("results", { results });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});
  return router;
};




