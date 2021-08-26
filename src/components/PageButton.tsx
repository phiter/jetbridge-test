import { HTMLAttributes } from "react";
import cls from "classnames";

interface PageButtonProps extends HTMLAttributes<HTMLButtonElement> {
  page: number;
  isCurrentPage: boolean;
}

export const PageButton = (props: PageButtonProps) => {
  const { page, isCurrentPage, ...attrs } = props;

  const className = cls("PageButton", {
    "is-active": isCurrentPage
  });

  return (
    <button className={className} {...attrs}>
      {page}
    </button>
  );
};
