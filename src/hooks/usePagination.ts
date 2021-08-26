import range from "lodash.range";
import { useEffect, useState } from "react";

interface PaginationOptions {
  totalPages: number;
  maxSiblings: number;
  currentPage: number;
}

const DOT = "dot";

type PageItem = number | typeof DOT;

export const usePagination = (options: PaginationOptions) => {
  const { maxSiblings, totalPages, currentPage } = options;
  const [pages, setPages] = useState<PageItem[]>([]);
  useEffect(() => {
    const pagesArray: PageItem[] = [];

    let leftSibling = Math.max(currentPage - maxSiblings, 1);
    let rightSibling = Math.min(currentPage + maxSiblings, totalPages);

    if (leftSibling > 1) {
      pagesArray.push(1);
    }
    if (leftSibling > maxSiblings) {
      pagesArray.push(DOT);
    }

    range(leftSibling, rightSibling + 1).forEach((pageNumber) => {
      pagesArray.push(pageNumber);
    });

    if (rightSibling < totalPages - 1) {
      pagesArray.push(DOT);
    }
    if (rightSibling <= totalPages - 1) {
      pagesArray.push(totalPages);
    }

    setPages(pagesArray);
  }, [currentPage, maxSiblings, totalPages]);

  return pages;
};
