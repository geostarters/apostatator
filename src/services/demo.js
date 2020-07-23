// @flow
"use strict";

class DemoService {

	static getSomething() {

		return {"text": "GET: it works!"};

	}

	static postSomething() {

		return {"text": "POST: it works!"};

	}

	static putSomething() {

		return {"text": "PUT: it works!"};

	}

	static deleteSomething(param: String) {

		return {"text": "DELETE: it works!", "param": param};

	}

}

module.exports = DemoService;

