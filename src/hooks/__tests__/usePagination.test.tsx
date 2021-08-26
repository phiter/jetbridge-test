import { render } from "@testing-library/react";
import { usePagination } from "../usePagination";

const testCases = [
  // No pages test
  { currentPage: 0, totalPages: 0, expected: [] },
  // Current page is 1
  { currentPage: 1, totalPages: 1, expected: [1] },
  { currentPage: 1, totalPages: 2, expected: [1, 2] },
  { currentPage: 1, totalPages: 3, expected: [1, 2, 3] },
  { currentPage: 1, totalPages: 4, expected: [1, 2, 3, 4] },
  { currentPage: 1, totalPages: 5, expected: [1, 2, 3, "dot", 5] },
  { currentPage: 1, totalPages: 6, expected: [1, 2, 3, "dot", 6] },

  // Current page is last page
  { currentPage: 1, totalPages: 1, expected: [1] },
  { currentPage: 2, totalPages: 2, expected: [1, 2] },
  { currentPage: 3, totalPages: 3, expected: [1, 2, 3] },
  { currentPage: 4, totalPages: 4, expected: [1, 2, 3, 4] },
  { currentPage: 5, totalPages: 5, expected: [1, "dot", 3, 4, 5] },
  { currentPage: 6, totalPages: 6, expected: [1, "dot", 4, 5, 6] },

  // Current page is in the middle
  {
    currentPage: 6,
    totalPages: 11,
    expected: [1, "dot", 4, 5, 6, 7, 8, "dot", 11]
  }
];

const RenderPages = (props: { totalPages: number; currentPage: number }) => {
  const { totalPages, currentPage } = props;
  const pages = usePagination({ maxSiblings: 2, totalPages, currentPage });

  return <span data-testid="pages">{JSON.stringify(pages)}</span>;
};

describe("usePagination hook", () => {
  test.each(testCases)(
    "test case %j",
    async ({ totalPages, expected, currentPage }) => {
      const component = render(
        <RenderPages currentPage={currentPage} totalPages={totalPages} />
      );
      const pageSpan = await component.findByTestId("pages");
      const pages = JSON.parse(pageSpan?.textContent || "[]");

      expect(pages).toEqual(expected);
    }
  );
});
