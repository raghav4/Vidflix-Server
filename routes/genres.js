const Joi = require("@hapi/joi");
const express = require("express");
const router = express.Router();
const genres = [
  {
    id: 1,
    name: "action"
  },
  {
    id: 2,
    name: "comedy"
  }
];

// get
router.get("/", (req, res) => {
  res.send(genres);
});

// genre with given id

router.get("/:id", (req, res) => {
  // Find if exists if not return 400.
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(`Genre with given id ${req.params.id} is not found!`);

  // return
  res.send(genre);
});

// post

router.post("/", (req, res) => {
  // Validate it first
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});

// put

router.put("/:id", (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(`Genre with given id ${req.params.id} is not found!`);
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  genre.name = req.body.name;
  res.send(genre);
});

// delete

router.delete("/", (req, res) => {});
function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required()
  });
  return schema.validate(genre);
}

module.exports = router;
