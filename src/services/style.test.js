// @flow
"use strict";

const StyleService = require("./style");
const fs = require("fs").promises;
const path = require("path");

const styleJson = {
	"sprite": "../sprites/sprite",
	"glyphs": "../fonts/{fontstack}/{range}.pbf",
	"sources": {
		"esri": {
			"type": "vector",
			"url": "../../"
		}
	}
};

const outStyleJson = {
	"sprite": "https://tilemaps.icgc.cat/tileserver/styles/test/sprites/sprite",
	"glyphs": "https://tilemaps.icgc.cat/tileserver/styles/test/fonts/{fontstack}/{range}.pbf",
	"sources": {
		"esri": {
			"type": "vector",
			"tiles": [
				"https://tilemaps.icgc.cat/tileserver/tileserver.php/test/{z}/{x}/{y}.pbf"
			]
		}
	}
};

describe("Test the style Service", () => {

	test("updatePaths should return the new paths", async () => {

		expect(await StyleService.updatePaths(styleJson, "test")).toMatchObject(outStyleJson);

	});

	test("updateStyle should return the style updated", async () => {

		const styleTestFolder = path.join(__dirname, "../test/vtpk/p12/resources/styles");

		await fs.copyFile(path.join(styleTestFolder, "rootOrigin.json"), path.join(styleTestFolder, "root.json"));

		const mockStyle = await JSON.parse(await fs.readFile(path.join(styleTestFolder, "rootCopy.json"), "utf8"));

		const vtpkFolder = path.join(__dirname, "../test/vtpk");

		await StyleService.updateStyle(vtpkFolder);

		const destStyle = await JSON.parse(await fs.readFile(path.join(styleTestFolder, "root.json"), "utf8"));

		expect(destStyle).toMatchObject(mockStyle);

	});

});
