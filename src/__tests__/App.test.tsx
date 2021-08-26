import { render } from "@testing-library/react";
import App from "../App";
import MockAdapter from "axios-mock-adapter";
import { api } from "../api/api";
import { jokeResponses } from "../hooks/__mocks__/useJokes.mock";
import { act } from "react-dom/test-utils";
import delay from "delay";

const mock = new MockAdapter(api);

describe("App.tsx component", () => {
  it("renders 3 jokes and 10 pages", async () => {
    const mockResponse = jokeResponses[1];
    mock.onGet("/search").reply(() => Object.values(mockResponse));

    await act(async () => {
      const component = render(<App />);

      await delay(50);
      const $jokes = await component.findByTestId("jokes");
      const $pagination = await component.findByTestId("pagination");

      expect($jokes.childElementCount).toBe(3);
      expect($pagination.childElementCount).toBe(5);
    });
  });
});
