import { Link } from "react-router-dom";

export default function PageStub({ title, description }) {
  return (
    <main className="game-page">
      <div className="game-page-card">
        <p className="game-page-kicker">Audacity Hub</p>
        <h1>{title}</h1>
        <p>{description}</p>
        <Link to="/" className="launch-link">
          Return To Menu
        </Link>
      </div>
    </main>
  );
}
