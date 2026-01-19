// Vanilla JavaScript component - no React needed!
function createNavbar() {
    return `
        <nav>
            <div class="logo">📈 Infostock</div>
            <div class="nav-links">
                <a href="/">Home</a>
                <a href="/signup">Sign Up</a>
                <a href="/stock">Add Stock</a>
            </div>
        </nav>
    `;
}

// Automatically inject navbar when script loads
document.addEventListener('DOMContentLoaded', function() {
    const navPlaceholder = document.getElementById('navbar');
    if (navPlaceholder) {
        navPlaceholder.innerHTML = createNavbar();
    }
});
