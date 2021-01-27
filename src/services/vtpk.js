// @flow
"use strict";

const uploadUtils = require("../utils/upload");
const zipUtils = require("../utils/zip");
const Openvtpk = require("@geostarters/openvtpk");
const StyleService = require("./style");
const fs = require("fs");
const path = require("path");
const util = require("util");

const rename = util.promisify(fs.rename);

class VtpkService {

	static async postSomething(files: Any) {

		console.log(files);

		if (!files) {

			return {
				status: false,
				message: "No file uploaded"
			};

		} else {

			const vtpkFile = files.vtpk;

			const destFile = await uploadUtils.uploadAndMove(vtpkFile);
			console.log("destFile", destFile);

			const zipFolder = await zipUtils.uncompressVtpk(destFile);
			console.log("zipFolder", zipFolder);

			const styleId = path.basename(zipFolder);

			const mbtilesFile = await Openvtpk.transform(zipFolder, {outputDir: zipFolder});
			console.log("mbtilesFile", mbtilesFile);

			await StyleService.updateStyle(zipFolder);

			console.log("NEW mbtilesFile", path.join(zipFolder, `${styleId}.mbtiles`));
			//TODO rename the mbtilesfile
			//TODO ver porque se queda el mbtiles bloqueado y no deja hacer el rename
			//await rename(mbtilesFile, path.join(zipFolder, `${styleId}.mbtiles`));

			//TODO mover el mbitles a la carpeta del servidor VT

			//TODO mover el estilo a la carpeta del servidor VT

			//TODO clean files
			//await fs.unlink(destFile);
			//await fs.rmdir(zipFolder, {recursive: true});

			return {
				status: true,
				message: "File is uploaded",
				data: {
					name: vtpkFile.name,
					mimetype: vtpkFile.mimetype,
					size: vtpkFile.size
				}
			};

		}

	}

}

module.exports = VtpkService;
