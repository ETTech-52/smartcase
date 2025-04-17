// auth-check.js
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = "index.html";
        return;
    }
    
    // Role-based access control (optional)
    const allowedRoles = {
        'dashboard.html': ['admin', 'department', 'lawyer', 'public'],
        'case-management.html': ['admin', 'department', 'lawyer'],
        'user-management.html': ['admin'],
        // Add other pages and allowed roles
    };
    
    const currentPage = window.location.pathname.split('/').pop();
    if (allowedRoles[currentPage] && !allowedRoles[currentPage].includes(currentUser.role)) {
        alert("You don't have permission to access this page");
        window.location.href = "dashboard.html";
    }
});