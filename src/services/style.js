// @flow
"use strict";

const fs = require("fs").promises;
const path = require("path");

require("dotenv").config();

class StyleService {

	static async updatePaths(styleJson: Object, mbtilesName: string) {

		const styleUpdated = {...styleJson};

		//update sprite
		styleUpdated.sprite = `${process.env.VTSERVER_URL}/${process.env.VTSERVER_STYLES}/${mbtilesName}/sprites/sprite`;

		//update glyphs
		styleUpdated.glyphs = `${process.env.VTSERVER_URL}/${process.env.VTSERVER_STYLES}/${mbtilesName}/fonts/{fontstack}/{range}.pbf`;

		//update source
		styleUpdated.sources.esri = {
			"type": "vector",
			"tiles": [
				`${process.env.VTSERVER_URL}/${process.env.VTSERVER_SERVER}/${mbtilesName}/{z}/{x}/{y}.pbf`
			]
		};

		return styleUpdated;

	}

	static async updateStyle(vtpkFolder) {

		const styleId = path.basename(vtpkFolder);

		const styleFile = path.join(vtpkFolder, "p12", "resources", "styles", "root.json");

		const styleJson = JSON.parse(await fs.readFile(styleFile, "utf8"));

		const styleUpdaed = await this.updatePaths(styleJson, styleId);

		await fs.writeFile(styleFile, JSON.stringify(styleUpdaed));

	}

}

module.exports = StyleService;
