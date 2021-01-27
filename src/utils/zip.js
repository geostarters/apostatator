// @flow
"use strict";

const path = require("path");
const AdmZip = require("adm-zip");
const crypto = require("crypto");

require("dotenv").config();

class zipUtils {

	static uncompressVtpk(zipFile, dest) {

		return new Promise((resolve, reject) => {

			try {

				const zip = new AdmZip(zipFile);
				const id = dest || crypto.randomBytes(20).toString("hex");
				const zipFolder = path.join(process.env.UPLOAD_FOLDER, id);
				zip.extractAllToAsync(zipFolder, true, (error) => {

					if (error) {

						reject(error);

					}

					resolve(zipFolder);

				});

			} catch (error) {

				reject(error);

			}

		});

	}

}

module.exports = zipUtils;
