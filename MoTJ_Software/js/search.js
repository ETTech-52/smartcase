document.addEventListener('DOMContentLoaded', function () {
    // Sample data for search
    const searchData = [
        {
            caseNumber: 'SCM-2023-001',
            title: 'Worker Compensation Claim',
            type: 'labor',
            court: 'Labor Court Dhaka',
            status: 'active',
            filingDate: '2023-01-15',
            nextHearing: '2023-04-25',
            lawyer: 'Adv. Rahman',
            organization: 'MoTJ',
            location: 'Dhaka'
        },
        {
            caseNumber: 'SCM-2023-045',
            title: 'Land Dispute Resolution',
            type: 'civil',
            court: 'Civil Court Chittagong',
            status: 'pending',
            filingDate: '2023-02-10',
            nextHearing: '2023-05-18',
            lawyer: 'Adv. Chowdhury',
            organization: 'Dept. of Jute',
            location: 'Chittagong'
        },
        {
            caseNumber: 'SCM-2023-112',
            title: 'Constitutional Matter',
            type: 'high',
            court: 'High Court Division',
            status: 'closed',
            filingDate: '2022-11-05',
            nextHearing: null,
            lawyer: 'Adv. Khan',
            organization: 'Bangladesh Handloom Board',
            location: 'Dhaka'
        },
        {
            caseNumber: 'SCM-2023-078',
            title: 'Special Contingent Case',
            type: 'contingent',
            court: 'Special Court Dhaka',
            status: 'active',
            filingDate: '2023-03-22',
            nextHearing: '2023-04-20',
            lawyer: 'Adv. Ahmed',
            organization: 'Jute Mills Corp',
            location: 'Dhaka'
        }
    ];

    // DOM elements
    const mainSearch = document.getElementById('mainSearch');
    const searchBtn = document.getElementById('searchBtn');
    const resultsTable = document.getElementById('resultsTable')?.querySelector('tbody');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');
    const resultsSection = document.getElementById('searchResults');
    const toggleAdvanced = document.getElementById('toggleAdvanced');
    const advancedSearch = document.getElementById('advancedSearch');
    const advancedSearchBtn = document.getElementById('advancedSearchBtn');
    const resetSearchBtn = document.getElementById('resetSearchBtn');

    // Toggle advanced search
    if (toggleAdvanced) {
        toggleAdvanced.addEventListener('click', function (e) {
            e.preventDefault();
            const icon = this.querySelector('i');

            if (advancedSearch.classList.contains('hidden')) {
                advancedSearch.classList.remove('hidden');
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            } else {
                advancedSearch.classList.add('hidden');
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            }
        });
    }

    // Perform search
    function performSearch(query = '', filters = {}) {
        let results = [...searchData];

        // Apply main search query
        if (query) {
            const lowerQuery = query.toLowerCase();
            results = results.filter(item =>
                item.caseNumber.toLowerCase().includes(lowerQuery) ||
                item.title.toLowerCase().includes(lowerQuery) ||
                item.court.toLowerCase().includes(lowerQuery) ||
                item.lawyer.toLowerCase().includes(lowerQuery)
            );
        }

        // Apply advanced filters
        if (filters.caseType && filters.caseType !== 'all') {
            results = results.filter(item => item.type === filters.caseType);
        }

        if (filters.court) {
            const lowerCourt = filters.court.toLowerCase();
            results = results.filter(item => item.court.toLowerCase().includes(lowerCourt));
        }

        if (filters.status && filters.status !== 'all') {
            results = results.filter(item => item.status === filters.status);
        }

        if (filters.dateFrom) {
            results = results.filter(item => new Date(item.filingDate) >= new Date(filters.dateFrom));
        }

        if (filters.dateTo) {
            results = results.filter(item => new Date(item.filingDate) <= new Date(filters.dateTo));
        }

        if (filters.lawyer) {
            const lowerLawyer = filters.lawyer.toLowerCase();
            results = results.filter(item => item.lawyer.toLowerCase().includes(lowerLawyer));
        }

        if (filters.organization && filters.organization !== 'all') {
            results = results.filter(item => item.organization.toLowerCase().includes(filters.organization));
        }

        if (filters.location) {
            const lowerLocation = filters.location.toLowerCase();
            results = results.filter(item => item.location.toLowerCase().includes(lowerLocation));
        }

        displayResults(results);
    }

    // Display search results
    function displayResults(results) {
        if (!resultsTable) return;

        resultsTable.innerHTML = '';

        if (results.length === 0) {
            noResults.classList.remove('hidden');
            resultsSection.classList.add('hidden');
            resultsCount.textContent = '0';
            return;
        }

        noResults.classList.add('hidden');
        resultsSection.classList.remove('hidden');
        resultsCount.textContent = results.length.toString();

        results.forEach(item => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${item.caseNumber}</td>
                <td>${item.title}</td>
                <td>${item.type.charAt(0).toUpperCase() + item.type.slice(1)}</td>
                <td>${item.court}</td>
                <td><span class="status-badge ${item.status}">${item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span></td>
                <td>${formatDate(item.filingDate)}</td>
                <td>${item.nextHearing ? formatDate(item.nextHearing) : '-'}</td>
                <td>
                    <button class="btn-action view"><i class="fas fa-eye"></i></button>
                </td>
            `;

            resultsTable.appendChild(row);
        });

        // Add event listeners to view buttons
        document.querySelectorAll('.btn-action.view').forEach(btn => {
            btn.addEventListener('click', function () {
                const caseNumber = this.closest('tr').querySelector('td').textContent;
                const caseItem = searchData.find(item => item.caseNumber === caseNumber);

                if (caseItem) {
                    alert(`Viewing case: ${caseItem.caseNumber}\nTitle: ${caseItem.title}\nCourt: ${caseItem.court}\nStatus: ${caseItem.status}`);
                }
            });
        });
    }

    // Format date for display
    function formatDate(dateString) {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Main search button
    if (searchBtn) {
        searchBtn.addEventListener('click', function () {
            const query = mainSearch.value.trim();
            performSearch(query);
        });
    }

    // Advanced search button
    if (advancedSearchBtn) {
        advancedSearchBtn.addEventListener('click', function () {
            const filters = {
                caseType: document.getElementById('searchCaseType').value,
                court: document.getElementById('searchCourt').value,
                status: document.getElementById('searchStatus').value,
                dateFrom: document.getElementById('searchDateFrom').value,
                dateTo: document.getElementById('searchDateTo').value,
                lawyer: document.getElementById('searchLawyer').value,
                organization: document.getElementById('searchOrg').value,
                location: document.getElementById('searchLocation').value
            };

            performSearch(mainSearch.value.trim(), filters);
        });
    }

    // Reset search button
    if (resetSearchBtn) {
        resetSearchBtn.addEventListener('click', function () {
            mainSearch.value = '';
            document.getElementById('searchCaseType').value = 'all';
            document.getElementById('searchCourt').value = '';
            document.getElementById('searchStatus').value = 'all';
            document.getElementById('searchDateFrom').value = '';
            document.getElementById('searchDateTo').value = '';
            document.getElementById('searchLawyer').value = '';
            document.getElementById('searchOrg').value = 'all';
            document.getElementById('searchLocation').value = '';

            performSearch();
        });
    }

    // Initial empty search to show all results
    performSearch();
});







document.addEventListener('DOMContentLoaded', function () {
    // Sample case data for demonstration
    const caseData = [
        {
            caseNumber: 'SCM-2023-001',
            title: 'Worker Compensation Claim',
            type: 'labor',
            court: 'Labor Court Dhaka',
            status: 'active',
            filingDate: '2023-01-15',
            nextHearing: '2023-04-25',
            lawyer: 'Adv. Rahman',
            organization: 'MoTJ',
            location: 'Dhaka'
        },
        {
            caseNumber: 'SCM-2023-045',
            title: 'Land Dispute Resolution',
            type: 'civil',
            court: 'Civil Court Chittagong',
            status: 'pending',
            filingDate: '2023-02-10',
            nextHearing: '2023-05-18',
            lawyer: 'Adv. Chowdhury',
            organization: 'Dept. of Jute',
            location: 'Chittagong'
        },
        {
            caseNumber: 'SCM-2023-112',
            title: 'Constitutional Matter',
            type: 'high',
            court: 'High Court Division',
            status: 'closed',
            filingDate: '2022-11-05',
            nextHearing: null,
            lawyer: 'Adv. Khan',
            organization: 'Bangladesh Handloom Board',
            location: 'Dhaka'
        },
        {
            caseNumber: 'SCM-2023-078',
            title: 'Special Contingent Case',
            type: 'contingent',
            court: 'Special Court Dhaka',
            status: 'active',
            filingDate: '2023-03-22',
            nextHearing: '2023-04-20',
            lawyer: 'Adv. Ahmed',
            organization: 'Jute Mills Corp',
            location: 'Dhaka'
        }
    ];

    // DOM elements
    const mainSearchInput = document.getElementById('mainSearch');
    const searchBtn = document.getElementById('searchBtn');
    const toggleAdvanced = document.getElementById('toggleAdvanced');
    const advancedSearch = document.getElementById('advancedSearch');
    const advancedSearchBtn = document.getElementById('advancedSearchBtn');
    const resetSearchBtn = document.getElementById('resetSearchBtn');
    const resultsTable = document.getElementById('resultsTable').querySelector('tbody');
    const resultsCount = document.getElementById('resultsCount');
    const noResults = document.getElementById('noResults');
    const searchResults = document.getElementById('searchResults');
    const exportPdfBtn = document.querySelector('.btn-export:nth-child(1)');
    const exportCsvBtn = document.querySelector('.btn-export:nth-child(2)');

    // Initialize the page
    function init() {
        setupEventListeners();
        performSearch(); // Show all cases initially
    }

    // Set up event listeners
    function setupEventListeners() {
        // Basic search
        searchBtn.addEventListener('click', function () {
            performSearch(mainSearchInput.value.trim());
        });

        mainSearchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performSearch(mainSearchInput.value.trim());
            }
        });

        // Advanced search toggle
        toggleAdvanced.addEventListener('click', function (e) {
            e.preventDefault();
            advancedSearch.classList.toggle('active');
            toggleAdvanced.classList.toggle('collapsed');
        });

        // Advanced search
        advancedSearchBtn.addEventListener('click', function () {
            performAdvancedSearch();
        });

        // Reset search
        resetSearchBtn.addEventListener('click', function () {
            resetSearch();
        });

        // Export buttons
        exportPdfBtn.addEventListener('click', exportToPdf);
        exportCsvBtn.addEventListener('click', exportToCsv);
    }

    // Perform basic search
    function performSearch(query = '') {
        let results = [...caseData];

        if (query) {
            const lowerQuery = query.toLowerCase();
            results = results.filter(item =>
                item.caseNumber.toLowerCase().includes(lowerQuery) ||
                item.title.toLowerCase().includes(lowerQuery) ||
                item.court.toLowerCase().includes(lowerQuery) ||
                item.lawyer.toLowerCase().includes(lowerQuery)
            );
        }

        displayResults(results);
    }

    // Perform advanced search
    function performAdvancedSearch() {
        const query = mainSearchInput.value.trim();
        const caseType = document.getElementById('searchCaseType').value;
        const court = document.getElementById('searchCourt').value;
        const status = document.getElementById('searchStatus').value;
        const dateFrom = document.getElementById('searchDateFrom').value;
        const dateTo = document.getElementById('searchDateTo').value;
        const lawyer = document.getElementById('searchLawyer').value;
        const organization = document.getElementById('searchOrg').value;
        const location = document.getElementById('searchLocation').value;

        let results = [...caseData];

        // Apply basic search if query exists
        if (query) {
            const lowerQuery = query.toLowerCase();
            results = results.filter(item =>
                item.caseNumber.toLowerCase().includes(lowerQuery) ||
                item.title.toLowerCase().includes(lowerQuery) ||
                item.court.toLowerCase().includes(lowerQuery) ||
                item.lawyer.toLowerCase().includes(lowerQuery)
            );
        }

        // Apply advanced filters
        if (caseType) {
            results = results.filter(item => item.type === caseType);
        }

        if (court) {
            const lowerCourt = court.toLowerCase();
            results = results.filter(item => item.court.toLowerCase().includes(lowerCourt));
        }

        if (status) {
            results = results.filter(item => item.status === status);
        }

        if (dateFrom) {
            results = results.filter(item => new Date(item.filingDate) >= new Date(dateFrom));
        }

        if (dateTo) {
            results = results.filter(item => new Date(item.filingDate) <= new Date(dateTo));
        }

        if (lawyer) {
            const lowerLawyer = lawyer.toLowerCase();
            results = results.filter(item => item.lawyer.toLowerCase().includes(lowerLawyer));
        }

        if (organization) {
            results = results.filter(item => item.organization.toLowerCase().includes(organization));
        }

        if (location) {
            const lowerLocation = location.toLowerCase();
            results = results.filter(item => item.location.toLowerCase().includes(lowerLocation));
        }

        displayResults(results);
    }

    // Display search results
    function displayResults(results) {
        resultsTable.innerHTML = '';

        if (results.length === 0) {
            noResults.style.display = 'block';
            searchResults.style.display = 'none';
            resultsCount.textContent = '0';
            return;
        }

        noResults.style.display = 'none';
        searchResults.style.display = 'block';
        resultsCount.textContent = results.length.toString();

        results.forEach(item => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${item.caseNumber}</td>
                <td>${item.title}</td>
                <td>${formatCaseType(item.type)}</td>
                <td>${item.court}</td>
                <td><span class="status-badge ${item.status}">${formatStatus(item.status)}</span></td>
                <td>${formatDate(item.filingDate)}</td>
                <td>${item.nextHearing ? formatDate(item.nextHearing) : '-'}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action view" data-id="${item.caseNumber}"><i class="fas fa-eye"></i></button>
                        <button class="btn-action edit" data-id="${item.caseNumber}"><i class="fas fa-edit"></i></button>
                    </div>
                </td>
            `;

            resultsTable.appendChild(row);
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

    // Add action button listeners
    function addActionButtonListeners() {
        document.querySelectorAll('.btn-action.view').forEach(btn => {
            btn.addEventListener('click', function () {
                const caseNumber = this.getAttribute('data-id');
                viewCaseDetails(caseNumber);
            });
        });

        document.querySelectorAll('.btn-action.edit').forEach(btn => {
            btn.addEventListener('click', function () {
                const caseNumber = this.getAttribute('data-id');
                editCase(caseNumber);
            });
        });
    }

    // View case details
    function viewCaseDetails(caseNumber) {
        const caseItem = caseData.find(item => item.caseNumber === caseNumber);
        if (!caseItem) return;

        // In a real app, this would open a modal or redirect to case details
        alert(`Viewing case: ${caseItem.caseNumber}\nTitle: ${caseItem.title}\nStatus: ${caseItem.status}`);
    }

    // Edit case
    function editCase(caseNumber) {
        const caseItem = caseData.find(item => item.caseNumber === caseNumber);
        if (!caseItem) return;

        // In a real app, this would redirect to edit page or open edit modal
        alert(`Editing case: ${caseItem.caseNumber}`);
    }

    // Reset search
    function resetSearch() {
        mainSearchInput.value = '';
        document.getElementById('searchCaseType').value = '';
        document.getElementById('searchCourt').value = '';
        document.getElementById('searchStatus').value = '';
        document.getElementById('searchDateFrom').value = '';
        document.getElementById('searchDateTo').value = '';
        document.getElementById('searchLawyer').value = '';
        document.getElementById('searchOrg').value = '';
        document.getElementById('searchLocation').value = '';

        performSearch(); // Show all cases
    }

    // Export to PDF
    function exportToPdf() {
        // In a real app, this would generate a PDF
        alert('Exporting to PDF...');
        console.log('Exporting search results to PDF');
    }

    // Export to CSV
    function exportToCsv() {
        // In a real app, this would generate a CSV
        alert('Exporting to CSV...');
        console.log('Exporting search results to CSV');
    }

    // Initialize the page
    init();
});





document.addEventListener('DOMContentLoaded', function () {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Set filter values from URL
    if (urlParams.has('caseNumber')) {
        document.getElementById('mainSearch').value = urlParams.get('caseNumber');
    }
    if (urlParams.has('organization')) {
        document.getElementById('searchOrg').value = urlParams.get('organization');
    }
    if (urlParams.has('caseType')) {
        document.getElementById('searchCaseType').value = urlParams.get('caseType');
    }
    if (urlParams.has('court')) {
        document.getElementById('searchCourt').value = urlParams.get('court');
    }
    if (urlParams.has('status')) {
        document.getElementById('searchStatus').value = urlParams.get('status');
    }
    if (urlParams.has('dateFrom')) {
        document.getElementById('searchDateFrom').value = urlParams.get('dateFrom');
    }
    if (urlParams.has('dateTo')) {
        document.getElementById('searchDateTo').value = urlParams.get('dateTo');
    }

    // Perform search immediately when page loads with parameters
    performSearch();
});

function performSearch() {
    // Get search values from the advanced search fields
    const caseNumber = document.getElementById('mainSearch').value.toLowerCase();
    const organization = document.getElementById('searchOrg').value;
    const caseType = document.getElementById('searchCaseType').value;
    const court = document.getElementById('searchCourt').value.toLowerCase();
    const status = document.getElementById('searchStatus').value;
    const dateFrom = document.getElementById('searchDateFrom').value;
    const dateTo = document.getElementById('searchDateTo').value;

    // Filter cases
    const filteredCases = caseData.filter(caseItem => {
        const caseDate = caseItem.filingDate || caseItem.hearingDate;
        const dateInRange =
            (!dateFrom || caseDate >= dateFrom) &&
            (!dateTo || caseDate <= dateTo);

        return (
            (caseNumber === '' || caseItem.caseNo.toLowerCase().includes(caseNumber)) &&
            (organization === '' || caseItem.organization === organization) &&
            (caseType === '' || caseItem.type === caseType) &&
            (court === '' || caseItem.court.toLowerCase().includes(court)) &&
            (status === '' || caseItem.status === status) &&
            dateInRange
        );
    });

    // Display results
    displayResults(filteredCases);
}

// Reset function
document.getElementById('resetSearchBtn').addEventListener('click', function () {
    document.getElementById('mainSearch').value = '';
    document.getElementById('searchOrg').value = '';
    document.getElementById('searchCaseType').value = '';
    document.getElementById('searchCourt').value = '';
    document.getElementById('searchStatus').value = '';
    document.getElementById('searchDateFrom').value = '';
    document.getElementById('searchDateTo').value = '';
    performSearch();
});



