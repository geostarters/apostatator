// @flow
"use strict";

const path = require("path");
const zipUtils = require("./zip");
const fs = require("fs").promises;

require("dotenv").config();

describe("Test the zip Utils", () => {

	afterAll(async () => {

		await fs.rmdir(path.join(process.env.UPLOAD_FOLDER, "test"), {recursive: true});

	});

	test("uncompressVtpk should return the path upload/test", async () => {

		const zipFolder = await zipUtils.uncompressVtpk(path.join(__dirname, "../test/test.zip"), "test");

		expect(zipFolder).toBe(path.join(process.env.UPLOAD_FOLDER, "test"));

	});

});
