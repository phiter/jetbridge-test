interface JokeProps {
  joke: string;
}

export const Joke = (props: JokeProps) => {
  const { joke } = props;
  return <li className="Joke">{joke}</li>;
};
