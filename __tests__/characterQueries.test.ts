import { graphql, GraphQLSchema, GraphQLObjectType } from "graphql";
import { Character } from "../src/models/character";
import { redisClient } from "../src/lib/redis";
import { characterQueries } from "../src/queries/characterQueries";

jest.mock("../src/models/character");
jest.mock("../src/lib/redis");

describe("charactersByFilter query with filters", () => {
  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "Query",
      fields: characterQueries,
    }),
  });

  const mockCharacters = [
    { id: 1, name: "Rick", status: "Alive", species: "Human", gender: "Male", origin: "Earth" },
    { id: 2, name: "Morty", status: "Alive", species: "Human", gender: "Male", origin: "Earth" },
    { id: 3, name: "Summer", status: "Alive", species: "Human", gender: "Female", origin: "Earth" },
    { id: 4, name: "Birdperson", status: "Dead", species: "Alien", gender: "Male", origin: "Bird World" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (redisClient.get as jest.Mock).mockResolvedValue(null);
  });

  it("filters by gender", async () => {
    (Character.findAll as jest.Mock).mockResolvedValue(
      mockCharacters
        .filter((c) => c.gender === "Female")
        .map((c) => ({ get: () => c }))
    );

    const query = `
      query {
        charactersByFilter(gender: "Female") {
          id
          name
          gender
        }
      }
    `;

    const result = await graphql({ schema, source: query });
    const data = result.data as { charactersByFilter: typeof mockCharacters };

    expect(result.errors).toBeUndefined();
    expect(data.charactersByFilter).toHaveLength(1);
    expect(data.charactersByFilter[0].gender).toBe("Female");
  });

  it("filters by species", async () => {
    (Character.findAll as jest.Mock).mockResolvedValue(
      mockCharacters
        .filter((c) => c.species === "Alien")
        .map((c) => ({ get: () => c }))
    );

    const query = `
      query {
        charactersByFilter(species: "Alien") {
          id
          name
          species
        }
      }
    `;

    const result = await graphql({ schema, source: query });
    const data = result.data as { charactersByFilter: typeof mockCharacters };

    expect(result.errors).toBeUndefined();
    expect(data.charactersByFilter).toHaveLength(1);
    expect(data.charactersByFilter[0].species).toBe("Alien");
  });

  it("filters by status", async () => {
    (Character.findAll as jest.Mock).mockResolvedValue(
      mockCharacters
        .filter((c) => c.status === "Dead")
        .map((c) => ({ get: () => c }))
    );

    const query = `
      query {
        charactersByFilter(status: "Dead") {
          id
          name
          status
        }
      }
    `;

    const result = await graphql({ schema, source: query });
    const data = result.data as { charactersByFilter: typeof mockCharacters };

    expect(result.errors).toBeUndefined();
    expect(data.charactersByFilter).toHaveLength(1);
    expect(data.charactersByFilter[0].status).toBe("Dead");

  });

});