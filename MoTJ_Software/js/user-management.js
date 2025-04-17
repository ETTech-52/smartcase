document.addEventListener('DOMContentLoaded', function () {
    // Sample user data
    const users = [
        {
            id: 1,
            username: 'admin_user',
            name: 'Admin User',
            email: 'admin@textiles.gov.bd',
            role: 'admin',
            department: 'Ministry of Textiles and Jute',
            lastLogin: '2023-04-10T08:30:45',
            status: 'active'
        },
        {
            id: 2,
            username: 'dept_officer',
            name: 'Department Officer',
            email: 'officer@textiles.gov.bd',
            role: 'department',
            department: 'Department of Jute',
            lastLogin: '2023-04-12T10:15:22',
            status: 'active'
        },
        {
            id: 3,
            username: 'lawyer_rahman',
            name: 'Advocate Rahman',
            email: 'rahman@lawfirm.com',
            role: 'lawyer',
            department: 'External',
            lastLogin: '2023-04-05T14:45:10',
            status: 'active'
        },
        {
            id: 4,
            username: 'public_user',
            name: 'Public User',
            email: 'user@example.com',
            role: 'public',
            department: 'N/A',
            lastLogin: '2023-03-28T16:20:33',
            status: 'inactive'
        }
    ];

    // DOM elements
    const usersTable = document.getElementById('usersTable')?.querySelector('tbody');
    const addUserBtn = document.getElementById('addUserBtn');
    const userModal = document.getElementById('userModal');
    const userForm = document.getElementById('userForm');
    const closeModalBtns = document.querySelectorAll('.close-modal');

    // Render users table
    function renderUsersTable() {
        if (!usersTable) return;

        usersTable.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
                <td>${user.department}</td>
                <td>${formatDateTime(user.lastLogin)}</td>
                <td><span class="status-badge ${user.status}">${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span></td>
                <td>
                    <button class="btn-action edit" data-id="${user.id}"><i class="fas fa-edit"></i></button>
                    <button class="btn-action delete" data-id="${user.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;

            usersTable.appendChild(row);
        });

        // Add event listeners to action buttons
        document.querySelectorAll('.btn-action.edit').forEach(btn => {
            btn.addEventListener('click', function () {
                const userId = parseInt(this.getAttribute('data-id'));
                editUser(userId);
            });
        });

        document.querySelectorAll('.btn-action.delete').forEach(btn => {
            btn.addEventListener('click', function () {
                const userId = parseInt(this.getAttribute('data-id'));
                deleteUser(userId);
            });
        });
    }

    // Format date and time for display
    function formatDateTime(dateTimeString) {
        if (!dateTimeString) return 'Never';
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateTimeString).toLocaleDateString('en-US', options);
    }

    // Edit user
    function editUser(userId) {
        const user = users.find(u => u.id === userId);
        if (!user) return;

        // Set modal title
        document.getElementById('modalTitle').textContent = `Edit User ${user.username}`;

        // Populate form fields
        document.getElementById('username').value = user.username;
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('role').value = user.role;
        document.getElementById('department').value = user.department;
        document.getElementById('status').value = user.status;

        // Show modal
        userModal.classList.add('active');
    }

    // Delete user
    function deleteUser(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
            // In a real app, this would make an API call to delete the user
            console.log('Deleting user with ID:', userId);
            alert('User deleted successfully!');

            // Refresh users table
            renderUsersTable();
        }
    }

    // Add new user
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function () {
            // Reset form
            userForm.reset();
            document.getElementById('modalTitle').textContent = 'Add New User';

            // Show modal
            userModal.classList.add('active');
        });
    }

    // Close modal
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            userModal.classList.remove('active');
        });
    });

    // User form submission
    if (userForm) {
        userForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const formData = {
                username: document.getElementById('username').value,
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                role: document.getElementById('role').value,
                department: document.getElementById('department').value,
                status: document.getElementById('status').value
            };

            // In a real app, this would save to a database
            console.log('User form submitted:', formData);

            // Close modal
            userModal.classList.remove('active');

            // Show success message
            alert('User saved successfully!');

            // Refresh users table
            renderUsersTable();
        });
    }

    // Initial render
    renderUsersTable();
});