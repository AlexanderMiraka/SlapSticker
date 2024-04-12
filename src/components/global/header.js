import { NavLink } from "react-router-dom";

export default function header() {
  return (
    <header class="appHeader">
      <h1 class="defaultColor">SlapSticker</h1>
      <nav class="appHeaderButtonList">
        <NavLink
          to="/"
          exact//   to match the exact route
        >
          <button class="buttonPrimary defaultColor">home</button>
        </NavLink>
        <NavLink to="/readme">
          <button class="buttonSecondary defaultColor">readme</button>
        </NavLink>
      </nav>
    </header>
  );
}
