// @flow
"use strict";

const path = require("path");

class uploadUtils {

	static uploadAndMove(uploadfile) {

		return new Promise((resolve, reject) => {

			try {

				const destFile = path.join(process.env.UPLOAD_FOLDER, uploadfile.name);

				uploadfile.mv(destFile, (err) => {

					if (err) {

						reject(err);

					}

					resolve(destFile);

				});

			} catch (error) {

				reject(error);

			}

		});

	}

}

module.exports = uploadUtils;
