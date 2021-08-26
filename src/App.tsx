import "./styles.scss";
import { useJokes } from "./hooks/useJokes";
import { usePagination } from "./hooks/usePagination";
import { PageButton } from "./components/PageButton";
import { Joke } from "./components/Joke";

const Dots = () => <span className="Dots">{"..."}</span>;

export default function App() {
  const { currentPage, jokes, setCurrentPage, totalPages } = useJokes();

  const pages = usePagination({
    currentPage,
    maxSiblings: 2,
    totalPages
  });

  const generatePageButton = (page: number) => (
    <PageButton
      key={`page-${page}`}
      page={page}
      onClick={() => setCurrentPage(page)}
      isCurrentPage={currentPage === page}
    />
  );

  const renderPagination = () =>
    pages.map((page, index) => {
      if (typeof page === "number") return generatePageButton(page);

      return <Dots key={`dot-${index}`} />;
    });

  return (
    <div className="App">
      <ul data-testid="jokes">
        {jokes.map((joke) => (
          <Joke key={joke.id} joke={joke.joke} />
        ))}
      </ul>
      <div data-testid="pagination">{renderPagination()}</div>
    </div>
  );
}
