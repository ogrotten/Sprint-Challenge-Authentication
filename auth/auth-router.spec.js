const request = require("supertest");

const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

function clg(...x) { console.log(...x) }

describe("auth-router.js", function () {
	describe("GET /", function () {
		it("checks register without data", function () {
			return request(server)
				.post("/api/auth/register")
				.send({ })
				.then(res => {
					clg(">>>> 15", res.body);
					expect(res.body.msg).toMatch(/Together/);
				});
		});

		it("checks reg fail HTTP", function () {
			return request(server)
				.post("/api/auth/register")
				.send({ })
				.then(res => {
					clg(">>>> 15", res.body);
					expect(res.status).toBe(400);
				});
		});

		it.skip("auth example", function () {
			return request(server)
				.post("/login")
				.send({ username: "me", password: "pass" })
				.then(res => {
					const token = res.body.token;

					return request(server)
						.get("/")
						.set("Authorization", token)
						.then(res => {
							expect(res.status).toBe(200);
							expect(Array.isArray(res.body)).toBe(true);
						});
				});
		});
	});
	/* 	
		it.skip("should return a 200 OK", function() {
		  return request(server)
			.get("/")
			.then(res => {
			  expect(res.status).toBe(200);
			});
		});
	
		it.skip("should return a JSON", function() {
		  return request(server)
			.get("/")
			.then(res => {
			  expect(res.type).toMatch(/json/i);
			});
		});
	
		it.skip("should return {api: 'up'}", function() {
		  return request(server)
			.get("/")
			.then(res => {
			  expect(res.body.api).toBe("up");
			});
		});
	 */
});

