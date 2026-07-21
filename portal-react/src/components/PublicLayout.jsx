import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export function PublicLayout() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <div className="public-shell">
      <header className="public-header">
        <NavLink className="brand-link" to="/cursos">
          Gestion de cursos
        </NavLink>
        <nav className="public-nav" aria-label="Navegacion publica">
          <NavLink to="/cursos">Catalogo</NavLink>
          {isAuthenticated ? <NavLink to="/mis-cursos">Mis cursos</NavLink> : <NavLink to="/login">Login</NavLink>}
          {isAuthenticated && (
            <button className="nav-button" type="button" onClick={logout}>
              Salir
            </button>
          )}
        </nav>
        {isAuthenticated && <span className="session-pill">{user?.name}</span>}
      </header>
      <main className="public-content">
        <Outlet />
      </main>
    </div>
  );
}
