document.addEventListener('DOMContentLoaded', function () {
    // Sample organization data
    const organizations = [
        {
            id: 1,
            name: 'Ministry of Textiles and Jute (MoTJ)',
            acronym: 'MoTJ',
            type: 'ministry',
            contactPerson: 'Mr. Rahman',
            email: 'contact@motj.gov.bd',
            phone: '+880 2 1234567',
            totalCases: 45,
            activeCases: 12
        },
        {
            id: 2,
            name: 'Department of Jute',
            acronym: 'DoJ',
            type: 'department',
            contactPerson: 'Ms. Chowdhury',
            email: 'info@jute.gov.bd',
            phone: '+880 2 7654321',
            totalCases: 32,
            activeCases: 8
        },
        {
            id: 3,
            name: 'Bangladesh Handloom Board',
            acronym: 'BHB',
            type: 'board',
            contactPerson: 'Mr. Khan',
            email: 'contact@handloom.gov.bd',
            phone: '+880 2 9876543',
            totalCases: 18,
            activeCases: 5
        },
        {
            id: 4,
            name: 'Bangladesh Sericulture Board',
            acronym: 'BSB',
            type: 'board',
            contactPerson: 'Ms. Ahmed',
            email: 'info@silk.gov.bd',
            phone: '+880 2 5678912',
            totalCases: 15,
            activeCases: 3
        },
        {
            id: 5,
            name: 'Jute Mills Corporation',
            acronym: 'JMC',
            type: 'corporation',
            contactPerson: 'Mr. Hossain',
            email: 'contact@jutemills.gov.bd',
            phone: '+880 2 3456789',
            totalCases: 28,
            activeCases: 10
        }
    ];

    // DOM elements
    const orgsTable = document.getElementById('orgsTable')?.querySelector('tbody');
    const addOrgBtn = document.getElementById('addOrgBtn');
    const orgModal = document.getElementById('orgModal');
    const orgForm = document.getElementById('orgForm');
    const closeModalBtns = document.querySelectorAll('.close-modal');

    // Render organizations table
    function renderOrgsTable() {
        if (!orgsTable) return;

        orgsTable.innerHTML = '';

        organizations.forEach(org => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${org.acronym}</td>
                <td>${org.name}</td>
                <td>${org.type.charAt(0).toUpperCase() + org.type.slice(1)}</td>
                <td>${org.contactPerson}</td>
                <td>${org.email}</td>
                <td>${org.phone}</td>
                <td>${org.totalCases}</td>
                <td>${org.activeCases}</td>
                <td>
                    <button class="btn-action view" data-id="${org.id}"><i class="fas fa-eye"></i></button>
                    <button class="btn-action edit" data-id="${org.id}"><i class="fas fa-edit"></i></button>
                </td>
            `;

            orgsTable.appendChild(row);
        });

        // Add event listeners to action buttons
        document.querySelectorAll('.btn-action.view').forEach(btn => {
            btn.addEventListener('click', function () {
                const orgId = parseInt(this.getAttribute('data-id'));
                viewOrg(orgId);
            });
        });

        document.querySelectorAll('.btn-action.edit').forEach(btn => {
            btn.addEventListener('click', function () {
                const orgId = parseInt(this.getAttribute('data-id'));
                editOrg(orgId);
            });
        });
    }

    // View organization details
    function viewOrg(orgId) {
        const org = organizations.find(o => o.id === orgId);
        if (!org) return;

        // In a real app, this would open a modal with organization details
        console.log('Viewing organization:', org);
        alert(`Organization: ${org.name}\nContact: ${org.contactPerson}\nEmail: ${org.email}\nPhone: ${org.phone}\nTotal Cases: ${org.totalCases}\nActive Cases: ${org.activeCases}`);
    }

    // Edit organization
    function editOrg(orgId) {
        const org = organizations.find(o => o.id === orgId);
        if (!org) return;

        // Set modal title
        document.getElementById('modalTitle').textContent = `Edit ${org.acronym}`;

        // Populate form fields
        document.getElementById('orgName').value = org.name;
        document.getElementById('orgAcronym').value = org.acronym;
        document.getElementById('orgType').value = org.type;
        document.getElementById('contactPerson').value = org.contactPerson;
        document.getElementById('orgEmail').value = org.email;
        document.getElementById('orgPhone').value = org.phone;

        // Show modal
        orgModal.classList.add('active');
    }

    // Add new organization
    if (addOrgBtn) {
        addOrgBtn.addEventListener('click', function () {
            // Reset form
            orgForm.reset();
            document.getElementById('modalTitle').textContent = 'Add New Organization';

            // Show modal
            orgModal.classList.add('active');
        });
    }

    // Close modal
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            orgModal.classList.remove('active');
        });
    });

    // Organization form submission
    if (orgForm) {
        orgForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const formData = {
                name: document.getElementById('orgName').value,
                acronym: document.getElementById('orgAcronym').value,
                type: document.getElementById('orgType').value,
                contactPerson: document.getElementById('contactPerson').value,
                email: document.getElementById('orgEmail').value,
                phone: document.getElementById('orgPhone').value
            };

            // In a real app, this would save to a database
            console.log('Organization form submitted:', formData);

            // Close modal
            orgModal.classList.remove('active');

            // Show success message
            alert('Organization saved successfully!');

            // Refresh organizations table
            renderOrgsTable();
        });
    }

    // Initial render
    renderOrgsTable();
});