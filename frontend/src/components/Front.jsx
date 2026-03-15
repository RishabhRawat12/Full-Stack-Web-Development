import { useNavigate } from "react-router-dom";

function Front() {
    const navigate = useNavigate();

    return(
        <div>
            <section style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5',
                textAlign: 'center',
                padding: '20px'
            }}>
                <h1 style={{ color: '#007BFF' }}>Welcome to WebCompiler</h1>
                <h3 style={{ color: 'black'}}>One of The best compiler in Chrome</h3>

                <button onClick={() => navigate('/build')} style={{
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px'
                }}>Get Started</button>
            </section>
        </div>
    )
}
export default Front;