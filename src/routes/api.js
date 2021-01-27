// @flow
"use strict";

const Router = require("express").Router;
const DemoService = require("../services/demo.js");
const VtpkService = require("../services/vtpk.js");

module.exports = () => {

	const api = new Router();

	api.get("/", async (req, res) => {

		console.log("Get");
		res.json(await DemoService.getSomething());

	});

	api.post("/", async (req, res) => {

		console.log("Post");
		res.json(await VtpkService.postSomething(req.files));

	});

	api.put("/", async (req, res) => {

		console.log("Put");
		res.json(await DemoService.putSomething());

	});

	api.delete("/", async (req, res) => {

		console.log("Delete");
		res.json(await DemoService.deleteSomething());

	});

	return api;

};

