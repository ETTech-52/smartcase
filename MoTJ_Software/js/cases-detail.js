// Extended Sample Data for All Cases
const allCasesData = [
    // Today's cases
    { caseNo: "2024-CV-001", organization: "MoTJ", caseType: "Civil", court: "High Court", status: "Pending", hearingDate: new Date().toISOString().split('T')[0] },
    { caseNo: "2024-CR-005", organization: "BHB", caseType: "Criminal", court: "District Court", status: "Pending", hearingDate: new Date().toISOString().split('T')[0] },
    { caseNo: "2024-WP-010", organization: "BSB", caseType: "Writ", court: "Supreme Court", status: "Adjourned", hearingDate: new Date().toISOString().split('T')[0] },

    // Closed cases
    { caseNo: "2023-CV-101", organization: "MoTJ", caseType: "Civil", court: "High Court", status: "Disposed", hearingDate: "2023-12-15" },
    { caseNo: "2023-CR-205", organization: "BHB", caseType: "Criminal", court: "District Court", status: "Disposed", hearingDate: "2023-11-20" },

    // Active cases
    { caseNo: "2024-CV-045", organization: "JMC", caseType: "Civil", court: "High Court", status: "Pending", hearingDate: "2024-06-20" },
    { caseNo: "2024-CR-112", organization: "BSB", caseType: "Criminal", court: "District Court", status: "Pending", hearingDate: "2024-06-25" },

    // Upcoming hearings
    { caseNo: "2024-WP-078", organization: "MoTJ", caseType: "Writ", court: "Supreme Court", status: "Pending", hearingDate: "2024-07-05" },
    { caseNo: "2024-CV-115", organization: "BHB", caseType: "Civil", court: "High Court", status: "Pending", hearingDate: "2024-07-10" },
];

// Function to get cases based on filter type
function getFilteredCases(filterType) {
    const today = new Date().toISOString().split('T')[0];

    switch (filterType) {
        case 'today':
            return allCasesData.filter(caseItem => caseItem.hearingDate === today);
        case 'closed':
            return allCasesData.filter(caseItem => caseItem.status === "Disposed");
        case 'active':
            return allCasesData.filter(caseItem => caseItem.status === "Pending");
        case 'upcoming':
            return allCasesData.filter(caseItem => caseItem.hearingDate > today && caseItem.status !== "Disposed");
        case 'recent':
            return [...allCasesData].sort((a, b) => new Date(b.hearingDate) - new Date(a.hearingDate)).slice(0, 10);
        default:
            return allCasesData;
    }
}

// Function to render cases in the table
function renderCases(cases) {
    const tableBody = document.getElementById("casesTableBody");
    tableBody.innerHTML = "";

    cases.forEach(caseItem => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${caseItem.caseNo}</td>
            <td>${getOrganizationName(caseItem.organization)}</td>
            <td>${caseItem.caseType}</td>
            <td>${caseItem.court}</td>
            <td><span class="status-badge ${getStatusClass(caseItem.status)}">${caseItem.status}</span></td>
            <td>${formatDate(caseItem.hearingDate)}</td>
            <td><button class="btn-action view" data-case="${caseItem.caseNo}"><i class="fas fa-eye"></i> View</button></td>
        `;

        tableBody.appendChild(row);
    });
}

// Helper functions (same as dashboard.js)
function getOrganizationName(orgCode) {
    const orgs = {
        "MoTJ": "Ministry of Textiles and Jute (MoTJ)",
        "BHB": "Bangladesh Handloom Board",
        "BSB": "Bangladesh Sericulture Board",
        "JMC": "Jute Mills Corporation"
    };
    return orgs[orgCode] || orgCode;
}

function getStatusClass(status) {
    const statusClasses = {
        "Pending": "pending",
        "Disposed": "closed",
        "Adjourned": "warning"
    };
    return statusClasses[status] || "";
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Function to filter cases based on search inputs
function applyFilters() {
    const urlParams = new URLSearchParams(window.location.search);
    const filterType = urlParams.get('filter') || 'all';

    let filteredCases = getFilteredCases(filterType);

    const caseNumberSearch = document.getElementById("caseNumberSearch").value.toLowerCase();
    const organizationFilter = document.getElementById("organizationFilter").value;
    const caseTypeFilter = document.getElementById("caseTypeFilter").value;
    const courtFilter = document.getElementById("courtFilter").value;
    const statusFilter = document.getElementById("statusFilter").value;
    const dateFilter = document.getElementById("dateFilter").value;

    filteredCases = filteredCases.filter(caseItem => {
        return (
            (caseItem.caseNo.toLowerCase().includes(caseNumberSearch)) &&
            (organizationFilter === "" || caseItem.organization === organizationFilter) &&
            (caseTypeFilter === "" || caseItem.caseType === caseTypeFilter) &&
            (courtFilter === "" || caseItem.court === courtFilter) &&
            (statusFilter === "" || caseItem.status === statusFilter) &&
            (dateFilter === "" || caseItem.hearingDate === dateFilter)
        );
    });

    renderCases(filteredCases);
    updatePageTitle(filterType);
}

function updatePageTitle(filterType) {
    const titles = {
        'today': "Today's Cases",
        'closed': "Closed Cases",
        'active': "Active Cases",
        'upcoming': "Upcoming Hearings",
        'recent': "Recent Cases",
        'all': "All Cases"
    };

    const title = titles[filterType] || "Case Details";
    document.getElementById("pageTitle").textContent = title;
    document.getElementById("detailPageTitle").textContent = title;
}

// Event Listeners for Filters
document.getElementById("caseNumberSearch").addEventListener("input", applyFilters);
document.getElementById("organizationFilter").addEventListener("change", applyFilters);
document.getElementById("caseTypeFilter").addEventListener("change", applyFilters);
document.getElementById("courtFilter").addEventListener("change", applyFilters);
document.getElementById("statusFilter").addEventListener("change", applyFilters);
document.getElementById("dateFilter").addEventListener("change", applyFilters);

// Reset Filters
document.getElementById("resetFilters").addEventListener("click", () => {
    document.getElementById("caseNumberSearch").value = "";
    document.getElementById("organizationFilter").value = "";
    document.getElementById("caseTypeFilter").value = "";
    document.getElementById("courtFilter").value = "";
    document.getElementById("statusFilter").value = "";
    document.getElementById("dateFilter").value = "";
    applyFilters();
});

// Export button
document.getElementById("exportBtn").addEventListener("click", () => {
    alert("Export functionality will be implemented here");
});

// Print button
document.getElementById("printBtn").addEventListener("click", () => {
    window.print();
});

// Initial load
document.addEventListener("DOMContentLoaded", () => {
    applyFilters();
});




// Update the getFilteredCases function
function getFilteredCases(filterType) {
    const urlParams = new URLSearchParams(window.location.search);
    const orgId = urlParams.get('org');

    const today = new Date().toISOString().split('T')[0];
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    let filteredCases = allCasesData;

    // First apply organization filter if present
    if (orgId) {
        filteredCases = filteredCases.filter(caseItem => caseItem.organization === orgId);
    }

    // Then apply the main filter type
    switch (filterType) {
        case 'today':
            return filteredCases.filter(caseItem => caseItem.hearingDate === today);
        case '7days':
            return filteredCases.filter(caseItem => caseItem.hearingDate === sevenDaysAgo);
        case 'closed':
            return filteredCases.filter(caseItem => caseItem.status === "Disposed");
        case 'active':
            return filteredCases.filter(caseItem => caseItem.status === "Pending");
        case 'upcoming':
            return filteredCases.filter(caseItem => caseItem.hearingDate > today && caseItem.status !== "Disposed");
        case 'recent':
            return [...filteredCases].sort((a, b) => new Date(b.hearingDate) - new Date(a.hearingDate)).slice(0, 10);
        case 'org':
            return filteredCases; // Already filtered by organization
        default:
            return filteredCases;
    }
}

// Update the updatePageTitle function
function updatePageTitle(filterType) {
    const urlParams = new URLSearchParams(window.location.search);
    const orgId = urlParams.get('org');

    if (orgId) {
        const org = organizationsData.find(o => o.id === orgId);
        document.getElementById("pageTitle").textContent = `${org.name} Cases`;
        document.getElementById("detailPageTitle").textContent = `${org.name} Cases`;
        return;
    }

    const titles = {
        'today': "Today's Cases",
        '7days': "7 Days Ago Cases",
        'closed': "Closed Cases",
        'active': "Active Cases",
        'upcoming': "Upcoming Hearings",
        'recent': "Recent Cases",
        'all': "All Cases",
        'org': "Organization Cases"
    };

    const title = titles[filterType] || "Case Details";
    document.getElementById("pageTitle").textContent = title;
    document.getElementById("detailPageTitle").textContent = title;
}