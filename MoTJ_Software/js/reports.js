document.addEventListener('DOMContentLoaded', function () {
    // Initialize report charts
    function initReports() {
        // Case Status Report
        const caseStatusCtx = document.getElementById('caseStatusChart').getContext('2d');
        const caseStatusChart = new Chart(caseStatusCtx, {
            type: 'bar',
            data: {
                labels: ['Labor Court', 'Civil Court', 'High Court', 'Contingent'],
                datasets: [{
                    label: 'Active Cases',
                    data: [120, 85, 110, 54],
                    backgroundColor: '#2ecc71'
                }, {
                    label: 'Pending Cases',
                    data: [45, 32, 50, 29],
                    backgroundColor: '#f39c12'
                }, {
                    label: 'Closed Cases',
                    data: [230, 180, 200, 110],
                    backgroundColor: '#e74c3c'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true
                    }
                }
            }
        });

        // Court-wise Distribution
        const courtDistributionCtx = document.getElementById('courtDistributionChart').getContext('2d');
        const courtDistributionChart = new Chart(courtDistributionCtx, {
            type: 'pie',
            data: {
                labels: ['Labor Court', 'Civil Court', 'High Court', 'Contingent'],
                datasets: [{
                    data: [395, 297, 360, 193],
                    backgroundColor: [
                        '#3498db',
                        '#9b59b6',
                        '#1abc9c',
                        '#f1c40f'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });

        // Monthly Case Filing Trend
        const monthlyTrendCtx = document.getElementById('monthlyTrendChart').getContext('2d');
        const monthlyTrendChart = new Chart(monthlyTrendCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Cases Filed',
                    data: [45, 38, 52, 28, 35, 42, 60, 55, 48, 52, 40, 35],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Organization-wise Cases
        const orgCasesCtx = document.getElementById('orgCasesChart').getContext('2d');
        const orgCasesChart = new Chart(orgCasesCtx, {
            type: 'horizontalBar',
            data: {
                labels: ['MoTJ', 'Dept. of Jute', 'Handloom Board', 'Sericulture Board', 'Jute Mills Corp'],
                datasets: [{
                    label: 'Total Cases',
                    data: [45, 32, 18, 15, 28],
                    backgroundColor: '#3498db'
                }, {
                    label: 'Active Cases',
                    data: [12, 8, 5, 3, 10],
                    backgroundColor: '#e74c3c'
                }]
            },
            options: {
                responsive: true,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Generate report
    document.getElementById('generateReport')?.addEventListener('click', function () {
        const reportType = document.getElementById('reportType').value;
        const dateFrom = document.getElementById('reportDateFrom').value;
        const dateTo = document.getElementById('reportDateTo').value;
        const format = document.getElementById('reportFormat').value;

        // In a real app, this would generate the report based on parameters
        console.log('Generating report:', { reportType, dateFrom, dateTo, format });

        // Simulate report generation
        setTimeout(() => {
            alert(`Report generated successfully!\nType: ${reportType}\nDate Range: ${dateFrom} to ${dateTo}\nFormat: ${format}`);

            // For PDF/CSV, this would trigger a download
            if (format === 'pdf') {
                console.log('Would download PDF report');
            } else if (format === 'csv') {
                console.log('Would download CSV report');
            }
        }, 1500);
    });

    // Initialize charts
    initReports();
});




document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const generateReportBtn = document.getElementById('generateReport');
    const reportTypeSelect = document.getElementById('reportType');
    const dateFromInput = document.getElementById('reportDateFrom');
    const dateToInput = document.getElementById('reportDateTo');
    const formatSelect = document.getElementById('reportFormat');
    const printBtn = document.querySelector('.btn-outline:nth-child(1)');
    const downloadBtn = document.querySelector('.btn-outline:nth-child(2)');
    const reportResults = document.querySelector('.report-results');

    // Sample data for demonstration
    const reportData = {
        caseStatus: [
            { type: 'Labor Court', total: 395, active: 120, pending: 45, closed: 230 },
            { type: 'Civil Court', total: 297, active: 85, pending: 32, closed: 180 },
            { type: 'High Court', total: 360, active: 110, pending: 50, closed: 200 },
            { type: 'Contingent', total: 193, active: 54, pending: 29, closed: 110 }
        ],
        orgDistribution: [
            { org: 'Ministry of Textiles', total: 45, active: 12, closed: 33, duration: 120 },
            { org: 'Department of Jute', total: 32, active: 8, closed: 24, duration: 95 },
            { org: 'Handloom Board', total: 18, active: 5, closed: 13, duration: 85 },
            { org: 'Sericulture Board', total: 15, active: 3, closed: 12, duration: 110 },
            { org: 'Jute Mills Corp', total: 28, active: 10, closed: 18, duration: 105 }
        ]
    };

    // Initialize the page
    function init() {
        setupEventListeners();
        generateReport(); // Generate default report on page load
    }

    // Set up event listeners
    function setupEventListeners() {
        generateReportBtn.addEventListener('click', generateReport);
        printBtn.addEventListener('click', printReport);
        downloadBtn.addEventListener('click', downloadReport);
    }

    // Generate report based on selected filters
    function generateReport() {
        const reportType = reportTypeSelect.value;
        const dateFrom = dateFromInput.value;
        const dateTo = dateToInput.value;
        const format = formatSelect.value;

        // In a real app, this would fetch data based on filters
        console.log('Generating report:', { reportType, dateFrom, dateTo, format });

        // For demo purposes, we'll just show the appropriate tables
        if (reportType === 'case_status' || reportType === '') {
            renderCaseStatusReport();
        } else if (reportType === 'org_wise') {
            renderOrgDistributionReport();
        }

        // Show toast notification
        showToast('Report generated successfully', 'success');
    }

    // Render case status report
    function renderCaseStatusReport() {
        const table = document.querySelector('.report-table:first-of-type tbody');
        table.innerHTML = '';

        reportData.caseStatus.forEach(item => {
            const completionRate = ((item.closed / item.total) * 100).toFixed(1);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.type}</td>
                <td>${item.total.toLocaleString()}</td>
                <td>${item.active.toLocaleString()}</td>
                <td>${item.pending.toLocaleString()}</td>
                <td>${item.closed.toLocaleString()}</td>
                <td>${completionRate}%</td>
            `;
            table.appendChild(row);
        });

        // Calculate totals
        const totals = reportData.caseStatus.reduce((acc, item) => {
            acc.total += item.total;
            acc.active += item.active;
            acc.pending += item.pending;
            acc.closed += item.closed;
            return acc;
        }, { total: 0, active: 0, pending: 0, closed: 0 });

        const totalCompletion = ((totals.closed / totals.total) * 100).toFixed(1);

        const totalRow = document.createElement('tr');
        totalRow.className = 'total-row';
        totalRow.innerHTML = `
            <td><strong>Total</strong></td>
            <td><strong>${totals.total.toLocaleString()}</strong></td>
            <td><strong>${totals.active.toLocaleString()}</strong></td>
            <td><strong>${totals.pending.toLocaleString()}</strong></td>
            <td><strong>${totals.closed.toLocaleString()}</strong></td>
            <td><strong>${totalCompletion}%</strong></td>
        `;
        table.appendChild(totalRow);
    }

    // Render organization distribution report
    function renderOrgDistributionReport() {
        const table = document.querySelector('.report-table:last-of-type tbody');
        table.innerHTML = '';

        reportData.orgDistribution.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.org}</td>
                <td>${item.total.toLocaleString()}</td>
                <td>${item.active.toLocaleString()}</td>
                <td>${item.closed.toLocaleString()}</td>
                <td>${item.duration}</td>
            `;
            table.appendChild(row);
        });
    }

    // Print report
    function printReport() {
        console.log('Printing report...');
        showToast('Preparing report for printing', 'info');

        // In a real app, this would open print dialog
        setTimeout(() => {
            window.print();
        }, 1000);
    }

    // Download report
    function downloadReport() {
        const format = formatSelect.value;
        console.log(`Downloading report as ${format.toUpperCase()}...`);
        showToast(`Downloading report as ${format.toUpperCase()}`, 'info');

        // In a real app, this would generate and download the file
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



document.addEventListener('DOMContentLoaded', function () {
    // Get the modal and buttons
    const modal = document.getElementById('reportImageModal');
    const downloadBtn = document.getElementById('downloadOrgReport');
    const closeBtn = document.querySelector('.close-modal');
    const downloadPdfBtn = document.getElementById('downloadReportPdf');
    const downloadExcelBtn = document.getElementById('downloadReportExcel');

    // When download button is clicked, show the modal
    downloadBtn.addEventListener('click', function () {
        modal.style.display = 'block';
    });

    // When close button is clicked, hide the modal
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // When clicking outside the modal, close it
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // PDF Download functionality
    downloadPdfBtn.addEventListener('click', function () {
        // Implement PDF download logic here
        alert('PDF download functionality will be implemented here');
        modal.style.display = 'none';
    });

    // Excel Download functionality
    downloadExcelBtn.addEventListener('click', function () {
        // Implement Excel download logic here
        alert('Excel download functionality will be implemented here');
        modal.style.display = 'none';
    });

    // Print functionality
    document.getElementById('printOrgReport').addEventListener('click', function () {
        window.print();
    });
});