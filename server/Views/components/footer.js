// Footer component - vanilla JavaScript
function createFooter() {
    return `
        <footer>
            <p>&copy; 2026 Infostock. All rights reserved.</p>
            <p>Powered by AI | <a href="#">Terms</a> | <a href="#">Privacy</a></p>
        </footer>
    `;
}

// Automatically inject footer when script loads
document.addEventListener('DOMContentLoaded', function() {
    const footerPlaceholder = document.getElementById('footer');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = createFooter();
    }
});

