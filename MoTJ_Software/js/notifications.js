document.addEventListener('DOMContentLoaded', function () {
    // Sample notification data
    const notifications = [
        {
            id: 1,
            type: 'hearing',
            title: 'Upcoming Hearing',
            message: 'Case SCM-2023-001 has a hearing scheduled for 25 Apr 2023',
            timestamp: '2023-04-15T09:30:00',
            read: false,
            caseId: 'SCM-2023-001'
        },
        {
            id: 2,
            type: 'deadline',
            title: 'Document Submission Deadline',
            message: 'Documents for Case SCM-2023-045 are due by 20 Apr 2023',
            timestamp: '2023-04-14T14:15:00',
            read: false,
            caseId: 'SCM-2023-045'
        },
        {
            id: 3,
            type: 'assignment',
            title: 'New Case Assignment',
            message: 'You have been assigned to Case SCM-2023-078',
            timestamp: '2023-04-12T11:45:00',
            read: true,
            caseId: 'SCM-2023-078'
        },
        {
            id: 4,
            type: 'system',
            title: 'System Maintenance',
            message: 'Scheduled maintenance on 25 Apr 2023 from 2:00 AM to 4:00 AM',
            timestamp: '2023-04-10T16:20:00',
            read: true
        }
    ];

    // DOM elements
    const notificationsList = document.getElementById('notificationsList');
    const markAllReadBtn = document.getElementById('markAllRead');
    const notificationCount = document.getElementById('notificationCount');
    const notificationBadge = document.querySelector('.notification-badge');

    // Render notifications
    function renderNotifications() {
        if (!notificationsList) return;

        notificationsList.innerHTML = '';

        // Sort by timestamp (newest first)
        const sortedNotifications = [...notifications].sort((a, b) =>
            new Date(b.timestamp) - new Date(a.timestamp)
        );

        sortedNotifications.forEach(notification => {
            const item = document.createElement('div');
            item.className = `notification-item ${notification.read ? 'read' : 'unread'}`;

            item.innerHTML = `
                <div class="notification-icon">
                    <i class="fas ${getNotificationIcon(notification.type)}"></i>
                </div>
                <div class="notification-content">
                    <h4>${notification.title}</h4>
                    <p>${notification.message}</p>
                    <span class="notification-time">${formatTimeAgo(notification.timestamp)}</span>
                </div>
                <div class="notification-actions">
                    ${!notification.read ? '<button class="btn-mark-read" data-id="' + notification.id + '">Mark as Read</button>' : ''}
                    ${notification.caseId ? '<a href="case-management.html" class="btn-view-case">View Case</a>' : ''}
                </div>
            `;

            notificationsList.appendChild(item);
        });

        // Update unread count
        const unreadCount = notifications.filter(n => !n.read).length;
        notificationCount.textContent = `${unreadCount} Unread Notifications`;
        notificationBadge.textContent = unreadCount;
        notificationBadge.style.display = unreadCount > 0 ? 'flex' : 'none';

        // Add event listeners to mark as read buttons
        document.querySelectorAll('.btn-mark-read').forEach(btn => {
            btn.addEventListener('click', function () {
                const notificationId = parseInt(this.getAttribute('data-id'));
                markAsRead(notificationId);
            });
        });
    }

    // Get icon for notification type
    function getNotificationIcon(type) {
        switch (type) {
            case 'hearing': return 'fa-gavel';
            case 'deadline': return 'fa-clock';
            case 'assignment': return 'fa-user-tie';
            case 'system': return 'fa-cog';
            default: return 'fa-bell';
        }
    }

    // Format time ago
    function formatTimeAgo(timestamp) {
        const now = new Date();
        const date = new Date(timestamp);
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }

    // Mark notification as read
    function markAsRead(notificationId) {
        const notification = notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            renderNotifications();
        }
    }

    // Mark all notifications as read
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function () {
            notifications.forEach(n => n.read = true);
            renderNotifications();
        });
    }

    // Initial render
    renderNotifications();
});