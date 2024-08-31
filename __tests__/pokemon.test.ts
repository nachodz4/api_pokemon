import request from "supertest";
import app from "../src/app";
import pool from "../src/db";

afterAll(() => pool.end());

describe("Pokemon card api", () => {
  it("should return a list of pokemon cards", async () => {
    const response = await request(app).get("/api/cards");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should return an specific pokemon card", async () => {
    const response = await request(app).get("/api/cards/1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).toHaveProperty("name");
  });
});
