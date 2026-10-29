import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import { app } from "../src/app";

// Replace database connection so tests run without MongoDB Atlas
vi.mock("../src/config/db", () => ({
  connectDB: async () => {},
}));

function tokenFor(userId: string): string {
  const secret = process.env.JWT_SECRET || "test-secret";
  return jwt.sign({ userId }, secret, { expiresIn: "5m" });
}

describe("POST /api/ai", () => {
  it("answers 401 when there is no token", async () => {
    const res = await request(app)
      .post("/api/ai")
      .send({ prompt: "A student project review platform using React." });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("No token. Send Authorization: Bearer <token>");
  });

  it("answers 401 when the token was signed with another secret", async () => {
    const forged = jwt.sign({ userId: "invalid_user" }, "wrong-secret");

    const res = await request(app)
      .post("/api/ai")
      .set("Authorization", `Bearer ${forged}`)
      .send({ prompt: "A student project review platform using React." });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Token is invalid or has expired");
  });

  it("lets a valid token through, then checks the request body schema", async () => {
    process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";

    const res = await request(app)
      .post("/api/ai")
      .set("Authorization", `Bearer ${tokenFor("test-user")}`)
      .send({ prompt: "Too short" }); // Prompt under 20 chars fails Zod schema before calling Gemini

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed");
    expect(Array.isArray(res.body.errors)).toBe(true);
  });
});