const request = require("supertest");

const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

function clg(...x) { console.log(...x) }

describe("auth-router.js", function () {
	describe("reg & login", function () {

// REGISTER tests

		it("chk register with empty object", function () {
			return request(server)
				.post("/api/auth/register")
				.send({ })
				.then(res => {
					clg(">>>> 15", res.body);
					expect(res.body.msg).toMatch(/Together/);
				});
		});

		it("chk reg fail HTTP", function () {
			return request(server)
				.post("/api/auth/register")
				.send({ })
				.then(res => {
					clg(">>>> 28", res.status);
					expect(res.status).toBe(400);
				});
		});

// LOGIN tests

		it("chk login failure", function () {
			return request(server)
				.post("/api/auth/login")
				.send({ username: "me", password: "pass" })
				.then(res => {
					clg(">>>> 42", res.body);
					expect(res.body.message).toMatch(/Invalid/);
				});
		});

		it("chk http status vs login with no data", function () {
			return request(server)
				.post("/api/auth/login")
				.send()
				.then(res => {
					clg(">>>> 50", res.body);
					expect(res.status).toBe(500);
				});
		});

// JOKES tests
		
		it("chks joke path auth status", function () {
			return request(server)
				.get("/api/jokes")
				.then(res => {
					clg(">>>> 61", res.status);
					expect(res.status).toBe(400);
				});
		});

		it("countes the jokes", function () {
			return request(server)
				.get("/api/jokes")
				.set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1lZXAiLCJpYXQiOjE1NzY4NjY3NTgsImV4cCI6MTU3NjkwMjc1OH0.QhRtk-tNYPl07dwD3spn1OczP_N9_Xe3v3-Pym_KkSQ")
				.then(res => {
					clg(">>>> 61", res.body.length);
					expect(res.body.length).toBe(20);
				});
		});

	});
});

