document.addEventListener('DOMContentLoaded', function () {
    // Initialize Chart
    const ctx = document.getElementById('caseStatusChart').getContext('2d');
    const caseStatusChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Active', 'Pending', 'Closed'],
            datasets: [{
                data: [369, 156, 720],
                backgroundColor: [
                    '#2ecc71',
                    '#f39c12',
                    '#e74c3c'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Chart filter
    const chartFilter = document.getElementById('chartFilter');
    if (chartFilter) {
        chartFilter.addEventListener('change', function () {
            // In a real app, this would fetch new data based on the filter
            console.log('Filter changed to:', this.value);

            // Simulate data change
            const newData = {
                'all': [369, 156, 720],
                'labor': [120, 45, 230],
                'civil': [85, 32, 180],
                'high': [110, 50, 200],
                'contingent': [54, 29, 110]
            };

            caseStatusChart.data.datasets[0].data = newData[this.value];
            caseStatusChart.update();
        });
    }

    // Initialize Calendar
    function renderCalendar() {
        const calendarEl = document.getElementById('hearingCalendar');
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        // Set month name
        document.getElementById('currentMonth').textContent = `${monthNames[currentMonth]} ${currentYear}`;

        // Get first day of month and total days
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Generate calendar days
        let calendarHTML = '<div class="calendar-weekdays">';
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        weekdays.forEach(day => {
            calendarHTML += `<div>${day}</div>`;
        });

        calendarHTML += '</div><div class="calendar-days">';

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            calendarHTML += '<div class="empty"></div>';
        }

        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentYear, currentMonth, i);
            const dayOfWeek = date.getDay();
            const isToday = i === currentDate.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
            const hasHearing = Math.random() > 0.8; // Simulate some days having hearings

            calendarHTML += `<div class="${isToday ? 'today' : ''} ${hasHearing ? 'has-hearing' : ''}">`;
            calendarHTML += `<span class="day-number">${i}</span>`;

            if (hasHearing) {
                calendarHTML += '<span class="hearing-dot"></span>';
            }

            calendarHTML += '</div>';
        }

        calendarHTML += '</div>';
        calendarEl.innerHTML = calendarHTML;
    }

    renderCalendar();

    // Calendar navigation
    document.getElementById('prevMonth')?.addEventListener('click', function () {
        console.log('Previous month');
        // In a real app, this would update the calendar view
    });

    document.getElementById('nextMonth')?.addEventListener('click', function () {
        console.log('Next month');
        // In a real app, this would update the calendar view
    });
});




// Sample Data for Today's Hearing Cases
const casesData = [
    { caseNo: "2024-CV-001", organization: "MoTJ", caseType: "Civil", court: "High Court", status: "Pending", hearingDate: "2024-06-15" },
    { caseNo: "2024-CR-005", organization: "BHB", caseType: "Criminal", court: "District Court", status: "Pending", hearingDate: "2024-06-15" },
    { caseNo: "2024-WP-010", organization: "BSB", caseType: "Writ", court: "Supreme Court", status: "Pending", hearingDate: "2024-06-15" },
    { caseNo: "2024-CV-002", organization: "JMC", caseType: "Civil", court: "High Court", status: "Pending", hearingDate: "2024-06-15" },
    { caseNo: "2024-CR-007", organization: "MoTJ", caseType: "Criminal", court: "District Court", status: "Pending", hearingDate: "2024-06-15" },
];

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
            <td>${caseItem.status}</td>
            <td>${caseItem.hearingDate}</td>
            <td><button class="action-btn">View Details</button></td>
        `;

        tableBody.appendChild(row);
    });
}

// Helper function to get full organization name
function getOrganizationName(orgCode) {
    const orgs = {
        "MoTJ": "Ministry of Textiles and Jute (MoTJ)",
        "BHB": "Bangladesh Handloom Board",
        "BSB": "Bangladesh Sericulture Board",
        "JMC": "Jute Mills Corporation"
    };
    return orgs[orgCode] || orgCode;
}

// Function to filter cases based on search inputs
// function filterCases() {
//     const caseNumberSearch = document.getElementById("caseNumberSearch").value.toLowerCase();
//     const organizationFilter = document.getElementById("organizationFilter").value;
//     const caseTypeFilter = document.getElementById("caseTypeFilter").value;
//     const courtFilter = document.getElementById("courtFilter").value;
//     const statusFilter = document.getElementById("statusFilter").value;
//     const dateFilter = document.getElementById("dateFilter").value;

//     const filteredCases = casesData.filter(caseItem => {
//         return (
//             (caseItem.caseNo.toLowerCase().includes(caseNumberSearch)) &&
//             (organizationFilter === "" || caseItem.organization === organizationFilter) &&
//             (caseTypeFilter === "" || caseItem.caseType === caseTypeFilter) &&
//             (courtFilter === "" || caseItem.court === courtFilter) &&
//             (statusFilter === "" || caseItem.status === statusFilter) &&
//             (dateFilter === "" || caseItem.hearingDate === dateFilter)
//         );
//     });

//     renderCases(filteredCases);
// }

// Event Listeners for Filters
document.getElementById("caseNumberSearch").addEventListener("input", filterCases);
document.getElementById("organizationFilter").addEventListener("change", filterCases);
document.getElementById("caseTypeFilter").addEventListener("change", filterCases);
document.getElementById("courtFilter").addEventListener("change", filterCases);
document.getElementById("statusFilter").addEventListener("change", filterCases);
document.getElementById("dateFilter").addEventListener("change", filterCases);

// Reset Filters
document.getElementById("resetFilters").addEventListener("click", () => {
    document.getElementById("caseNumberSearch").value = "";
    document.getElementById("organizationFilter").value = "";
    document.getElementById("caseTypeFilter").value = "";
    document.getElementById("courtFilter").value = "";
    document.getElementById("statusFilter").value = "";
    document.getElementById("dateFilter").value = "";
    renderCases(casesData);
});

// Initial render
document.addEventListener("DOMContentLoaded", () => {
    renderCases(casesData);
});





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

// Helper functions
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
function filterCases() {
    const caseNumberSearch = document.getElementById("caseNumberSearch").value.toLowerCase();
    const organizationFilter = document.getElementById("organizationFilter").value;
    const caseTypeFilter = document.getElementById("caseTypeFilter").value;
    const courtFilter = document.getElementById("courtFilter").value;
    const statusFilter = document.getElementById("statusFilter").value;
    const dateFilter = document.getElementById("dateFilter").value;

    const filteredCases = casesData.filter(caseItem => {
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
}

// Event Listeners for Filters
document.getElementById("caseNumberSearch").addEventListener("input", filterCases);
document.getElementById("organizationFilter").addEventListener("change", filterCases);
document.getElementById("caseTypeFilter").addEventListener("change", filterCases);
document.getElementById("courtFilter").addEventListener("change", filterCases);
document.getElementById("statusFilter").addEventListener("change", filterCases);
document.getElementById("dateFilter").addEventListener("change", filterCases);

// Reset Filters
document.getElementById("resetFilters").addEventListener("click", () => {
    document.getElementById("caseNumberSearch").value = "";
    document.getElementById("organizationFilter").value = "";
    document.getElementById("caseTypeFilter").value = "";
    document.getElementById("courtFilter").value = "";
    document.getElementById("statusFilter").value = "";
    document.getElementById("dateFilter").value = "";
    renderCases(casesData);
});

// Initial render
document.addEventListener("DOMContentLoaded", () => {
    renderCases(casesData);

    // Set today's date as default in date filter
    document.getElementById("dateFilter").valueAsDate = new Date();
});


// Add to your casesData array
// Add additional cases to the existing casesData array
casesData.push(
    {
        caseNo: "2024-CV-101",
        organization: "MoTJ",
        caseType: "Civil",
        court: "High Court",
        status: "Disposed",
        hearingDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    {
        caseNo: "2024-CR-205",
        organization: "BHB",
        caseType: "Criminal",
        court: "District Court",
        status: "Adjourned",
        hearingDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
    // ... other cases
);


// Update the getFilteredCases function
function getFilteredCases(filterType) {
    const today = new Date().toISOString().split('T')[0];
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    switch (filterType) {
        // Existing cases...
        case '7days':
            return allCasesData.filter(caseItem => caseItem.hearingDate === sevenDaysAgo);
        // ... other cases
    }
}

// Update the updatePageTitle function
function updatePageTitle(filterType) {
    const titles = {
        // Existing titles...
        '7days': "7 Days Ago Cases",
        // ... other titles
    };
    // ... rest of function
}




// Organization Data with Case Counts
const organizationsData = [
    {
        id: "motj",
        name: "Ministry of Textiles and Jute",
        totalCases: 245,
        activeCases: 87,
        closedCases: 158,
        upcomingHearings: 12
    },
    {
        id: "dept-jute",
        name: "Department of Jute",
        totalCases: 187,
        activeCases: 65,
        closedCases: 122,
        upcomingHearings: 8
    },
    {
        id: "dept-textiles",
        name: "Department of Textiles",
        totalCases: 132,
        activeCases: 42,
        closedCases: 90,
        upcomingHearings: 5
    },
    {
        id: "handloom-board",
        name: "Bangladesh Handloom Board",
        totalCases: 98,
        activeCases: 35,
        closedCases: 63,
        upcomingHearings: 3
    },
    {
        id: "sericulture-board",
        name: "Bangladesh Sericulture Development Board",
        totalCases: 76,
        activeCases: 28,
        closedCases: 48,
        upcomingHearings: 2
    },
    {
        id: "textile-mills",
        name: "Bangladesh Textile Mills Corporation",
        totalCases: 154,
        activeCases: 53,
        closedCases: 101,
        upcomingHearings: 7
    },
    {
        id: "jute-mills",
        name: "Bangladesh Jute Mills Corporation",
        totalCases: 210,
        activeCases: 72,
        closedCases: 138,
        upcomingHearings: 10
    },
    {
        id: "jute-diversification",
        name: "Jute Diversification Promotion Center",
        totalCases: 65,
        activeCases: 22,
        closedCases: 43,
        upcomingHearings: 1
    },
    {
        id: "bangladesh-jute",
        name: "Bangladesh Jute Corporation",
        totalCases: 87,
        activeCases: 31,
        closedCases: 56,
        upcomingHearings: 4
    },
    {
        id: "adamjee",
        name: "Adamjee Sons Ltd.",
        totalCases: 43,
        activeCases: 15,
        closedCases: 28,
        upcomingHearings: 2
    },
    {
        id: "liquidation-cell",
        name: "Liquidation Cell",
        totalCases: 32,
        activeCases: 11,
        closedCases: 21,
        upcomingHearings: 1
    }
];

// Function to render organizations
function renderOrganizations() {
    const organizationsGrid = document.getElementById('organizationsGrid');
    organizationsGrid.innerHTML = '';

    organizationsData.forEach(org => {
        const orgCard = document.createElement('div');
        orgCard.className = 'organization-card';

        orgCard.innerHTML = `
            <div class="organization-header">
                <div class="organization-name">${org.name}</div>
                <div class="organization-count">${org.totalCases}</div>
            </div>
            <div class="organization-stats">
                <div class="stat-item">
                    <div class="stat-value">${org.activeCases}</div>
                    <div class="stat-label">Active</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${org.closedCases}</div>
                    <div class="stat-label">Closed</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${org.upcomingHearings}</div>
                    <div class="stat-label">Upcoming</div>
                </div>
            </div>
            <a href="cases-detail.html?filter=org&org=${org.id}" class="view-cases-btn">View Cases</a>
        `;

        organizationsGrid.appendChild(orgCard);
    });
}

// Call this in your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    renderCases(casesData);
    renderOrganizations();
    // ... your other initialization code
});



// Update the renderOrganizations function
function renderOrganizations() {
    const organizationsGrid = document.getElementById('organizationsGrid');
    organizationsGrid.innerHTML = '';

    organizationsData.forEach(org => {
        const orgCard = document.createElement('div');
        orgCard.className = 'organization-card';

        orgCard.innerHTML = `
            <div class="organization-header">
                <div class="organization-name">${org.name}</div>
                <div class="organization-count">${org.totalCases}</div>
            </div>
            <div class="organization-stats">
                <div class="stat-item">
                    <div class="stat-value">${org.activeCases}</div>
                    <div class="stat-label">Active</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${org.closedCases}</div>
                    <div class="stat-label">Closed</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${org.upcomingHearings}</div>
                    <div class="stat-label">Upcoming</div>
                </div>
            </div>
            <a href="cases-detail.html?filter=org&org=${org.id}" class="view-cases-btn">View Cases</a>
        `;

        organizationsGrid.appendChild(orgCard);
    });
}