import { Link, Route, Routes } from 'react-router';

export type IApplicationProps = any;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function App(props: IApplicationProps) {
  return (
    <Routes>
      <Route
        path="/html"
        Component={() => (
          <div>
            Но сало не лох и не пидор
            <Link to={'/salo'}>Сало</Link>
          </div>
        )}
      />
      <Route
        path="/salo"
        Component={() => (
          <div>
            А сало лох и пидор
            <Link to={'/html'}>HTML</Link>
          </div>
        )}
      />
    </Routes>
  );
}
