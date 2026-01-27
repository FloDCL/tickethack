var express = require("express");
var router = express.Router();
const trip = require("../models/trips");

router.get("/trajet", (req, res) => {
  trip.find().then((data) => {
    res.json({ trips: data });
    //console.log(data);
  });
});

router.get("/trajet/departure/:departure", (req, res) => {
  trip
    .find({
      departure: { $regex: new RegExp(req.params.departure, "i") },
    })
    .then((cityFound) => {
      if (cityFound) {
        res.json({ result: true, trajet: cityFound });
      } else {
        res.json({ result: false, error: "City not found" });
      }
    });
});

router.get("/trajet/arrival/:arrival", (req, res) => {
  trip
    .find({
      arrival: { $regex: new RegExp(req.params.arrival, "i") },
    })
    .then((cityFound) => {
      if (cityFound) {
        res.json({ result: true, trajet: cityFound });
      } else {
        res.json({ result: false, error: "City not found" });
      }
    });
});

module.exports = router;
