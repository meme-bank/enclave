export type IApplicationProps = any;

export function App(props: IApplicationProps) {
  return <div>{JSON.stringify(props)}</div>;
}
