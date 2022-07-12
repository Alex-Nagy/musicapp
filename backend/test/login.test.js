require("dotenv").config();
const app = require("../server");
const jwt = require("jsonwebtoken");
const mockServer = require("supertest");
const User = require("../model/user");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");
// const { setupGoogleSuccessResponse, setupGoogleErrorResponse } = require("./util/httpMock");

describe("Test Login", () => {
  let connection;
  let server;
  let client;

  beforeAll(async () => {
    const result = await startDb();
    connection = result[0];
    server = result[1];
    client = mockServer.agent(app);
  });

  afterAll(async () => {
    await stopDb(connection, server);
  });

  afterEach(async () => {
    await deleteAll(User);
  });

  test("should return 400 without body", async () => {
    // given

    // when
    const response = await client.post("/login").send({});

    // then
    expect(response.status).toBe(400);
  });

  test("should return 400 without provider", async () => {
    // given
    const code = "random";

    // when
    const response = await client.post("/login").send({ code });

    // then
    expect(response.status).toBe(400);
  });

  test("should return 400 without code", async () => {
    // given
    const provider = "spotify";

    // when
    const response = await client.post("/login").send({ provider });

    // then
    expect(response.status).toBe(400);
  });

  test("should return 400 with invalid provider (user not created)", async () => {
    // given
    const code = "random";
    const provider = "gitlab";

    // when
    const response = await client.post("/login").send({
      code,
      provider,
    });

    // then
    expect(response.status).toBe(400);
  });

  test("should return 200 with valid data", async () => {
    // given
    const code = "AQC-jhdC_Z4VYjhhsaTMdxJ6BZzXjyAWiXOfh-C_RD7epYXgjtZ-CSLWqCD5zaA3IwWjpYBGmN4ZVXoh_uOCtZlaReZQQ6RthuN7u_qezhAzfUJCAHbiuAuUJF";

    // when
    const response = await client.post("/login").send({
      code,
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });

    // then
    expect(response.status).toBe(400);
  });

});