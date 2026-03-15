import { NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
function Navigationbar() {
    return(
        <nav style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '10px 20px', 
            backgroundColor: '#333', 
            color: '#fff' 
        }}>
            <h2>WebCompiler</h2>
            <div style={{ display: 'flex', gap: '15px' }}>
                <NavLink to="/" style={({ isActive }) => ({
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: isActive ? 700 : 500,
                  opacity: isActive ? 1 : 0.85,
                })} end>
                  Home
                </NavLink>
                <NavLink to="/build" style={({ isActive }) => ({
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: isActive ? 700 : 500,
                  opacity: isActive ? 1 : 0.85,
                })}>
                  Build
                </NavLink>
                <NavLink to="/about" style={({ isActive }) => ({
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: isActive ? 700 : 500,
                  opacity: isActive ? 1 : 0.85,
                })}>
                  About
                </NavLink>
                <NavLink to="/team" style={({ isActive }) => ({
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: isActive ? 700 : 500,
                  opacity: isActive ? 1 : 0.85,
                })}>
                  Team Members
                </NavLink>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
            <DarkModeToggle />
            <NavLink to="/login" style={{ textDecoration: 'none' }}>
              <button style={{ 
                  padding: '8px 16px', 
                  backgroundColor: '#007BFF', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: 'pointer' 
              }}
               onMouseEnter={(e) => e.target.style.backgroundColor='#0056b3'}
              onMouseLeave={(e) => e.target.style.backgroundColor='#007BFF'}>Login</button>
            </NavLink>
            <NavLink to="/signup" style={{ textDecoration: 'none' }}>
              <button style={{ 
                  padding: '8px 16px', 
                  backgroundColor: '#007BFF', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: 'pointer' 
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor='#0056b3'}
              onMouseLeave={(e) => e.target.style.backgroundColor='#007BFF'}>Sign Up</button>
            </NavLink>
            </div>
        </nav>
    )
}
export default Navigationbar;