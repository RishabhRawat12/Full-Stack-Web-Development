function Footer(){
    return(
        <footer 
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#333',
            color: '#fff',
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
            zIndex: 50
        }}>
            <p>2026 WebCompiler. All rights reserved.</p>

            <div style={{ display: 'flex', gap: '15px', marginLeft: '20px' }}>
                <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>GitHub</a>
                <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Instagram</a>
                <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Contact Us</a>
            </div>
        </footer>
    )
}
export default Footer;