document.addEventListener('DOMContentLoaded', function () {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding tab pane
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Add hearing button
    document.getElementById('addHearingBtn')?.addEventListener('click', function () {
        // In a real app, this would open a modal to add a new hearing
        console.log('Add new hearing');
        alert('Add new hearing functionality would open a modal here');
    });

    // Apply hearing filters
    document.getElementById('applyHearingFilters')?.addEventListener('click', function () {
        const courtFilter = document.getElementById('hearingCourtFilter').value;
        const startDate = document.getElementById('hearingStartDate').value;
        const endDate = document.getElementById('hearingEndDate').value;

        console.log('Applying hearing filters:', { courtFilter, startDate, endDate });
        // In a real app, this would filter the hearings table
    });
});