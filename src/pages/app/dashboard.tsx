import { Helmet } from "react-helmet-async";

export function Dashboard() {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <Helmet title="Dashboard" />
      <h1>Dashboard!</h1>
    </div>
  );
}
