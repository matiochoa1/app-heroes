import { beforeEach, describe, expect, test } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";

import { heroApi } from "../api/hero.api";
import { getHero } from "./get-hero-action";
import { heroResponseMock } from "@/tests/mock/hero.response.data";

describe("getHeroAction", () => {
  let mock = new AxiosMockAdapter(heroApi);

  beforeEach(() => {
    mock = new AxiosMockAdapter(heroApi);
  });

  test("should fetch hero data and return with complete image url", async () => {
    const heroData = heroResponseMock.data[0];
    mock.onGet("/clark-kent").reply(200, heroData);

    const hero = await getHero("clark-kent");

    expect(hero.name).toBe("Clark Kent");
    expect(hero.image).toBe("http://localhost:3001/images/1.jpeg");
    expect(hero.image).toContain("http");
  });

  test("should throw an error if hero is not found", async () => {
    const idSlug = "batman-11";

    const hero = await getHero(idSlug).catch((error) => {
      expect(error).toBeDefined();
      expect(error.message).toBe("Request failed with status code 404");
    });

    expect(hero).toBeUndefined();
  });
});
