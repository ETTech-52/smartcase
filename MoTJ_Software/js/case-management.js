// document.addEventListener('DOMContentLoaded', function () {
//     // Sample case data
//     const cases = [
//         {
//             id: 1,
//             caseNumber: 'SCM-2023-001',
//             title: 'Worker Compensation Claim',
//             type: 'labor',
//             court: 'Labor Court Dhaka',
//             status: 'active',
//             filingDate: '2023-01-15',
//             nextHearing: '2023-04-25',
//             lawyer: 'Adv. Rahman',
//             organization: 'MoTJ',
//             priority: 'high',
//             description: 'Claim for worker compensation under labor law'
//         },
//         // Add more sample cases...
//     ];

//     // DOM elements
//     const casesTable = document.getElementById('casesTable')?.querySelector('tbody');
//     const caseModal = document.getElementById('caseModal');
//     const addCaseBtn = document.getElementById('addCaseBtn');
//     const caseForm = document.getElementById('caseForm');
//     const closeModalBtns = document.querySelectorAll('.close-modal');

//     // Render cases table
//     function renderCasesTable(filteredCases = cases) {
//         if (!casesTable) return;

//         casesTable.innerHTML = '';

//         filteredCases.forEach(caseItem => {
//             const row = document.createElement('tr');

//             row.innerHTML = `
//                 <td>${caseItem.caseNumber}</td>
//                 <td>${caseItem.title}</td>
//                 <td>${caseItem.type.charAt(0).toUpperCase() + caseItem.type.slice(1)}</td>
//                 <td>${caseItem.court}</td>
//                 <td><span class="status-badge ${caseItem.status}">${caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}</span></td>
//                 <td>${formatDate(caseItem.filingDate)}</td>
//                 <td>${caseItem.nextHearing ? formatDate(caseItem.nextHearing) : '-'}</td>
//                 <td>${caseItem.lawyer}</td>
//                 <td>${caseItem.organization}</td>
//                 <td>
//                     <button class="btn-action view" data-id="${caseItem.id}"><i class="fas fa-eye"></i></button>
//                     <button class="btn-action edit" data-id="${caseItem.id}"><i class="fas fa-edit"></i></button>
//                 </td>
//             `;

//             casesTable.appendChild(row);
//         });

//         // Add event listeners to action buttons
//         document.querySelectorAll('.btn-action.view').forEach(btn => {
//             btn.addEventListener('click', function () {
//                 const caseId = parseInt(this.getAttribute('data-id'));
//                 viewCase(caseId);
//             });
//         });

//         document.querySelectorAll('.btn-action.edit').forEach(btn => {
//             btn.addEventListener('click', function () {
//                 const caseId = parseInt(this.getAttribute('data-id'));
//                 editCase(caseId);
//             });
//         });
//     }

//     // Format date for display
//     function formatDate(dateString) {
//         if (!dateString) return '';
//         const options = { year: 'numeric', month: 'short', day: 'numeric' };
//         return new Date(dateString).toLocaleDateString('en-US', options);
//     }

//     // View case details
//     function viewCase(caseId) {
//         const caseItem = cases.find(c => c.id === caseId);
//         if (!caseItem) return;

//         // In a real app, this would open a modal with case details
//         console.log('View case:', caseItem);
//         alert(`Viewing case: ${caseItem.caseNumber}\nTitle: ${caseItem.title}\nStatus: ${caseItem.status}`);
//     }

//     // Edit case
//     function editCase(caseId) {
//         const caseItem = cases.find(c => c.id === caseId);
//         if (!caseItem) return;

//         // Set modal title
//         document.getElementById('modalTitle').textContent = `Edit Case ${caseItem.caseNumber}`;

//         // Populate form fields
//         document.getElementById('caseNumber').value = caseItem.caseNumber;
//         document.getElementById('caseTitle').value = caseItem.title;
//         document.getElementById('caseType').value = caseItem.type;
//         document.getElementById('courtName').value = caseItem.court;
//         document.getElementById('filingDate').value = caseItem.filingDate;
//         document.getElementById('nextHearing').value = caseItem.nextHearing || '';
//         document.getElementById('caseStatus').value = caseItem.status;
//         document.getElementById('casePriority').value = caseItem.priority;
//         document.getElementById('assignedLawyer').value = caseItem.lawyer;
//         document.getElementById('assignedOrg').value = caseItem.organization;
//         document.getElementById('caseDescription').value = caseItem.description;

//         // Show modal
//         caseModal.classList.add('active');
//     }

//     // Add new case
//     if (addCaseBtn) {
//         addCaseBtn.addEventListener('click', function () {
//             // Reset form
//             caseForm.reset();
//             document.getElementById('modalTitle').textContent = 'Add New Case';
//             document.getElementById('caseNumber').value = generateCaseNumber();

//             // Show modal
//             caseModal.classList.add('active');
//         });
//     }

//     // Generate a new case number
//     function generateCaseNumber() {
//         const prefix = 'SCM';
//         const year = new Date().getFullYear();
//         const lastCase = cases[cases.length - 1];
//         const lastNumber = lastCase ? parseInt(lastCase.caseNumber.split('-')[2]) : 0;

//         return `${prefix}-${year}-${(lastNumber + 1).toString().padStart(3, '0')}`;
//     }

//     // Close modal
//     closeModalBtns.forEach(btn => {
//         btn.addEventListener('click', function () {
//             caseModal.classList.remove('active');
//         });
//     });

//     // Case form submission
//     if (caseForm) {
//         caseForm.addEventListener('submit', function (e) {
//             e.preventDefault();

//             // Get form values
//             const formData = {
//                 caseNumber: document.getElementById('caseNumber').value,
//                 title: document.getElementById('caseTitle').value,
//                 type: document.getElementById('caseType').value,
//                 court: document.getElementById('courtName').value,
//                 filingDate: document.getElementById('filingDate').value,
//                 nextHearing: document.getElementById('nextHearing').value || null,
//                 status: document.getElementById('caseStatus').value,
//                 priority: document.getElementById('casePriority').value,
//                 lawyer: document.getElementById('assignedLawyer').value,
//                 organization: document.getElementById('assignedOrg').value,
//                 description: document.getElementById('caseDescription').value
//             };

//             // In a real app, this would save to a database
//             console.log('Case form submitted:', formData);

//             // Close modal
//             caseModal.classList.remove('active');

//             // Show success message
//             alert('Case saved successfully!');

//             // Refresh cases table
//             renderCasesTable();
//         });
//     }

//     // Apply filters
//     document.getElementById('applyFilters')?.addEventListener('click', function () {
//         const caseTypeFilter = document.getElementById('caseTypeFilter').value;
//         const statusFilter = document.getElementById('statusFilter').value;
//         const startDate = document.getElementById('startDate').value;
//         const endDate = document.getElementById('endDate').value;

//         let filteredCases = [...cases];

//         // Apply filters
//         if (caseTypeFilter !== 'all') {
//             filteredCases = filteredCases.filter(c => c.type === caseTypeFilter);
//         }

//         if (statusFilter !== 'all') {
//             filteredCases = filteredCases.filter(c => c.status === statusFilter);
//         }

//         if (startDate) {
//             filteredCases = filteredCases.filter(c => new Date(c.filingDate) >= new Date(startDate));
//         }

//         if (endDate) {
//             filteredCases = filteredCases.filter(c => new Date(c.filingDate) <= new Date(endDate));
//         }

//         renderCasesTable(filteredCases);
//     });

//     // Reset filters
//     document.getElementById('resetFilters')?.addEventListener('click', function () {
//         document.getElementById('caseTypeFilter').value = 'all';
//         document.getElementById('statusFilter').value = 'all';
//         document.getElementById('startDate').value = '';
//         document.getElementById('endDate').value = '';

//         renderCasesTable(cases);
//     });

//     // Initial render
//     renderCasesTable();
// });



document.addEventListener('DOMContentLoaded', function() {
    // Sample case data
    const cases = [
        {
            id: 1,
            caseNumber: 'SCM-2023-001',
            title: 'Worker Compensation Claim',
            type: 'labor',
            court: 'Labor Court Dhaka',
            status: 'active',
            priority: 'high',
            filingDate: '2023-01-15',
            nextHearing: '2023-04-25',
            lawyer: 'Adv. Rahman',
            organization: 'MoTJ',
            description: 'Claim for worker compensation under labor law'
        },
        {
            id: 2,
            caseNumber: 'SCM-2023-045',
            title: 'Land Dispute Resolution',
            type: 'civil',
            court: 'Civil Court Chittagong',
            status: 'pending',
            priority: 'medium',
            filingDate: '2023-02-10',
            nextHearing: '2023-05-18',
            lawyer: 'Adv. Chowdhury',
            organization: 'Dept. of Jute',
            description: 'Resolution of land ownership dispute'
        },
        {
            id: 3,
            caseNumber: 'SCM-2023-112',
            title: 'Constitutional Matter',
            type: 'high',
            court: 'High Court Division',
            status: 'closed',
            priority: 'high',
            filingDate: '2022-11-05',
            nextHearing: null,
            lawyer: 'Adv. Khan',
            organization: 'Bangladesh Handloom Board',
            description: 'Constitutional interpretation case'
        }
    ];

    // DOM elements
    const casesTable = document.getElementById('casesTable')?.querySelector('tbody');
    const caseModal = document.getElementById('caseModal');
    const addCaseBtn = document.getElementById('addCaseBtn');
    const caseForm = document.getElementById('caseForm');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const fileInput = document.getElementById('caseDocuments');
    const fileList = document.getElementById('fileList');

    // Lawyers and Organizations for dropdowns
    const lawyers = ['Adv. Rahman', 'Adv. Chowdhury', 'Adv. Khan', 'Adv. Ahmed'];
    const organizations = ['MoTJ', 'Dept. of Jute', 'Bangladesh Handloom Board', 'Bangladesh Sericulture Board', 'Jute Mills Corp'];

    // Initialize the page
    function init() {
        renderCasesTable();
        populateDropdowns();
        setupEventListeners();
    }

    // Render cases table
    function renderCasesTable(filteredCases = cases) {
        if (!casesTable) return;
        
        casesTable.innerHTML = '';
        
        if (filteredCases.length === 0) {
            casesTable.innerHTML = `
                <tr>
                    <td colspan="10" class="no-data">
                        <i class="fas fa-folder-open"></i>
                        <p>No cases found matching your criteria</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        filteredCases.forEach(caseItem => {
            const row = document.createElement('tr');
            row.dataset.id = caseItem.id;
            
            row.innerHTML = `
                <td>${caseItem.caseNumber}</td>
                <td>${caseItem.title}</td>
                <td><span class="case-type ${caseItem.type}">${formatCaseType(caseItem.type)}</span></td>
                <td>${caseItem.court}</td>
                <td><span class="status-badge ${caseItem.status}">${formatStatus(caseItem.status)}</span></td>
                <td>${formatDate(caseItem.filingDate)}</td>
                <td>${caseItem.nextHearing ? formatDate(caseItem.nextHearing) : '-'}</td>
                <td>${caseItem.lawyer}</td>
                <td>${caseItem.organization}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action view" data-id="${caseItem.id}"><i class="fas fa-eye"></i></button>
                        <button class="btn-action edit" data-id="${caseItem.id}"><i class="fas fa-edit"></i></button>
                        <button class="btn-action delete" data-id="${caseItem.id}"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            `;
            
            casesTable.appendChild(row);
        });
        
        // Add event listeners to action buttons
        addActionButtonListeners();
    }

    // Format case type for display
    function formatCaseType(type) {
        const typeMap = {
            'labor': 'Labor Court',
            'civil': 'Civil Court',
            'high': 'High Court',
            'contingent': 'Contingent Case'
        };
        return typeMap[type] || type;
    }

    // Format status for display
    function formatStatus(status) {
        return status.charAt(0).toUpperCase() + status.slice(1);
    }

    // Format date for display
    function formatDate(dateString) {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Populate dropdowns in form
    function populateDropdowns() {
        const lawyerSelect = document.getElementById('assignedLawyer');
        const orgSelect = document.getElementById('assignedOrg');
        
        // Clear existing options
        lawyerSelect.innerHTML = '<option value="">Select Lawyer</option>';
        orgSelect.innerHTML = '<option value="">Select Organization</option>';
        
        // Add lawyers
        lawyers.forEach(lawyer => {
            const option = document.createElement('option');
            option.value = lawyer;
            option.textContent = lawyer;
            lawyerSelect.appendChild(option);
        });
        
        // Add organizations
        organizations.forEach(org => {
            const option = document.createElement('option');
            option.value = org;
            option.textContent = org;
            orgSelect.appendChild(option);
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        // Add case button
        if (addCaseBtn) {
            addCaseBtn.addEventListener('click', openAddCaseModal);
        }
        
        // Close modal buttons
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', closeModal);
        });
        
        // Form submission
        if (caseForm) {
            caseForm.addEventListener('submit', handleFormSubmit);
        }
        
        // File input change
        if (fileInput) {
            fileInput.addEventListener('change', handleFileUpload);
        }
        
        // Apply filters button
        document.getElementById('applyFilters')?.addEventListener('click', applyFilters);
        
        // Reset filters button
        document.getElementById('resetFilters')?.addEventListener('click', resetFilters);
    }

    // Add action button listeners
    function addActionButtonListeners() {
        document.querySelectorAll('.btn-action.view').forEach(btn => {
            btn.addEventListener('click', function() {
                const caseId = parseInt(this.getAttribute('data-id'));
                viewCase(caseId);
            });
        });
        
        document.querySelectorAll('.btn-action.edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const caseId = parseInt(this.getAttribute('data-id'));
                editCase(caseId);
            });
        });
        
        document.querySelectorAll('.btn-action.delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const caseId = parseInt(this.getAttribute('data-id'));
                deleteCase(caseId);
            });
        });
    }

    // Open add case modal
    function openAddCaseModal() {
        // Reset form
        caseForm.reset();
        fileList.innerHTML = '';
        document.getElementById('modalTitle').textContent = 'Add New Case';
        
        // Generate case number
        document.getElementById('caseNumber').value = generateCaseNumber();
        
        // Open modal
        caseModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Generate case number
    function generateCaseNumber() {
        const prefix = 'SCM';
        const year = new Date().getFullYear();
        const lastCase = cases.length > 0 ? cases[cases.length - 1] : null;
        const lastNumber = lastCase ? parseInt(lastCase.caseNumber.split('-')[2]) : 0;
        
        return `${prefix}-${year}-${(lastNumber + 1).toString().padStart(3, '0')}`;
    }

    // Close modal
    function closeModal() {
        caseModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // View case details
    function viewCase(caseId) {
        const caseItem = cases.find(c => c.id === caseId);
        if (!caseItem) return;
        
        // In a real app, this would open a modal with case details
        console.log('Viewing case:', caseItem);
        alert(`Viewing case: ${caseItem.caseNumber}\nTitle: ${caseItem.title}\nStatus: ${caseItem.status}`);
    }

    // Edit case
    function editCase(caseId) {
        const caseItem = cases.find(c => c.id === caseId);
        if (!caseItem) return;
        
        // Set modal title
        document.getElementById('modalTitle').textContent = `Edit Case ${caseItem.caseNumber}`;
        
        // Populate form fields
        document.getElementById('caseNumber').value = caseItem.caseNumber;
        document.getElementById('caseTitle').value = caseItem.title;
        document.getElementById('caseType').value = caseItem.type;
        document.getElementById('courtName').value = caseItem.court;
        document.getElementById('filingDate').value = caseItem.filingDate;
        document.getElementById('nextHearing').value = caseItem.nextHearing || '';
        document.getElementById('caseStatus').value = caseItem.status;
        document.getElementById('casePriority').value = caseItem.priority;
        document.getElementById('assignedLawyer').value = caseItem.lawyer;
        document.getElementById('assignedOrg').value = caseItem.organization;
        document.getElementById('caseDescription').value = caseItem.description;
        
        // Clear file list
        fileList.innerHTML = '';
        
        // Open modal
        caseModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Delete case
    function deleteCase(caseId) {
        if (confirm('Are you sure you want to delete this case?')) {
            // In a real app, this would make an API call to delete the case
            console.log('Deleting case with ID:', caseId);
            
            // Remove from local array
            const index = cases.findIndex(c => c.id === caseId);
            if (index !== -1) {
                cases.splice(index, 1);
            }
            
            // Refresh table
            renderCasesTable();
            
            // Show success message
            showToast('Case deleted successfully', 'success');
        }
    }

    // Handle form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            caseNumber: document.getElementById('caseNumber').value,
            title: document.getElementById('caseTitle').value,
            type: document.getElementById('caseType').value,
            court: document.getElementById('courtName').value,
            filingDate: document.getElementById('filingDate').value,
            nextHearing: document.getElementById('nextHearing').value || null,
            status: document.getElementById('caseStatus').value,
            priority: document.getElementById('casePriority').value,
            lawyer: document.getElementById('assignedLawyer').value,
            organization: document.getElementById('assignedOrg').value,
            description: document.getElementById('caseDescription').value
        };
        
        // Validate form
        if (!validateForm(formData)) {
            return;
        }
        
        // Check if we're editing an existing case
        const isEdit = document.getElementById('modalTitle').textContent.startsWith('Edit');
        
        if (isEdit) {
            // Update existing case
            const caseId = parseInt(casesTable.querySelector('tr[data-id]').dataset.id);
            const caseIndex = cases.findIndex(c => c.id === caseId);
            
            if (caseIndex !== -1) {
                cases[caseIndex] = { ...cases[caseIndex], ...formData };
                showToast('Case updated successfully', 'success');
            }
        } else {
            // Add new case
            const newCase = {
                id: cases.length > 0 ? Math.max(...cases.map(c => c.id)) + 1 : 1,
                ...formData
            };
            cases.push(newCase);
            showToast('Case added successfully', 'success');
        }
        
        // Close modal
        closeModal();
        
        // Refresh table
        renderCasesTable();
    }

    // Validate form
    function validateForm(formData) {
        if (!formData.caseNumber) {
            showToast('Case number is required', 'error');
            return false;
        }
        
        if (!formData.title) {
            showToast('Case title is required', 'error');
            return false;
        }
        
        if (!formData.type) {
            showToast('Case type is required', 'error');
            return false;
        }
        
        if (!formData.court) {
            showToast('Court name is required', 'error');
            return false;
        }
        
        if (!formData.filingDate) {
            showToast('Filing date is required', 'error');
            return false;
        }
        
        return true;
    }

    // Handle file upload
    function handleFileUpload(e) {
        const files = e.target.files;
        fileList.innerHTML = '';
        
        if (files.length === 0) return;
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            fileItem.innerHTML = `
                <i class="fas fa-file-alt"></i>
                <span class="file-name">${file.name}</span>
                <span class="file-size">(${formatFileSize(file.size)})</span>
                <span class="file-remove"><i class="fas fa-times"></i></span>
            `;
            
            fileList.appendChild(fileItem);
            
            // Add remove event listener
            fileItem.querySelector('.file-remove').addEventListener('click', function() {
                fileItem.remove();
                // In a real app, you'd need to handle the file removal from the FileList
            });
        }
    }

    // Format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Apply filters
    function applyFilters() {
        const caseTypeFilter = document.getElementById('caseTypeFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        
        let filteredCases = [...cases];
        
        // Apply filters
        if (caseTypeFilter !== 'all') {
            filteredCases = filteredCases.filter(item => item.type === caseTypeFilter);
        }
        
        if (statusFilter !== 'all') {
            filteredCases = filteredCases.filter(item => item.status === statusFilter);
        }
        
        if (startDate) {
            filteredCases = filteredCases.filter(item => new Date(item.filingDate) >= new Date(startDate));
        }
        
        if (endDate) {
            filteredCases = filteredCases.filter(item => new Date(item.filingDate) <= new Date(endDate));
        }
        
        renderCasesTable(filteredCases);
    }

    // Reset filters
    function resetFilters() {
        document.getElementById('caseTypeFilter').value = 'all';
        document.getElementById('statusFilter').value = 'all';
        document.getElementById('startDate').value = '';
        document.getElementById('endDate').value = '';
        
        renderCasesTable(cases);
    }

    // Show toast notification
    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // Initialize the page
    init();
});