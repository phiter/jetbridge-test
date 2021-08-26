import { render } from "@testing-library/react";
import { useJokes } from "../useJokes";
import MockAdapter from "axios-mock-adapter";
import { api } from "../../api/api";
import { jokeResponses } from "../__mocks__/useJokes.mock";

const mock = new MockAdapter(api);

const RenderJokes = () => {
  const jokes = useJokes();

  return <span data-testid="result">{JSON.stringify(jokes.jokes)}</span>;
};

describe("useJokes hook", () => {
  const mockResponse = jokeResponses[0];
  mock.onGet("/search").reply(() => Object.values(mockResponse));

  it("renders 3 jokes", async () => {
    const component = render(<RenderJokes />);

    const renderedText = (await component.findByTestId("result")).textContent;
    expect(JSON.parse(renderedText)).toEqual(mockResponse.data.results);
  });
});
