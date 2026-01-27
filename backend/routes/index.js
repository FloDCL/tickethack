var express = require("express");
var router = express.Router();
const trip = require("../models/trips");
const moment = require("moment");

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

router.post("/search", (req, res) => {
  const { departure, arrival, date } = req.body;

  let searchDateStart = moment(date).startOf("day");
  const searchDateEnd = moment(date).endOf("day");

  if (moment(date).isSame(moment(), "day")) {
    searchDateStart = moment();
  }

  if (!departure || !arrival || !date) {
    return res.json({ result: false, error: "No trip found" });
  }

  trip
    .find({
      departure: { $regex: new RegExp(departure, "i") },
      arrival: { $regex: new RegExp(arrival, "i") },
      date: { $gte: searchDateStart, $lte: searchDateEnd },
    })
    .then((data) => {
      if (data.length > 0) {
        res.json({ result: true, trips: data });
      } else {
        res.json({
          result: false,
          error: "No trip found",
        });
      }
    });
});

module.exports = router;
