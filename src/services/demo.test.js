// @flow
"use strict";


const demo = require("./demo");

describe("Test the demo Service", ()=>{

	test("getSomething should return the object {\"text\": \"GET: it works!\"}", () => {

		expect(demo.getSomething()).toMatchObject({"text": "GET: it works!"});

	});

});
