document.addEventListener('DOMContentLoaded', function() {
    // Initialize event listeners for calendar buttons
    const calendarButtons = document.querySelectorAll('.calendar-btn');
    calendarButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const eventData = {
                title: this.dataset.title,
                start: this.dataset.start,
                end: this.dataset.end,
                location: this.dataset.location,
                description: this.dataset.description
            };
            addToCalendar(eventData);
        });
    });

    // Initialize event listeners for ticket buttons
    const ticketButtons = document.querySelectorAll('.ticket-btn');
    ticketButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ticketUrl = this.dataset.ticketUrl;
            if (ticketUrl) {
                window.open(ticketUrl, '_blank');
            }
        });
    });

    // Gallery modal functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    const closeModal = document.querySelector('.close-modal');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const caption = this.querySelector('.gallery-caption').textContent;
            showModal(imgSrc, caption);
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', hideModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideModal();
        }
    });

    // Function to add event to calendar
    function addToCalendar(eventData) {
        // Google Calendar URL format
        const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.title)}&dates=${formatDateForGoogleCalendar(eventData.start)}/${formatDateForGoogleCalendar(eventData.end)}&details=${encodeURIComponent(eventData.description)}&location=${encodeURIComponent(eventData.location)}`;
        
        // Open Google Calendar in new tab
        window.open(googleCalendarUrl, '_blank');
    }

    // Helper function to format date for Google Calendar
    function formatDateForGoogleCalendar(dateString) {
        const date = new Date(dateString);
        return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
    }

    // Function to show modal
    function showModal(imgSrc, caption) {
        if (modal) {
            modalContent.innerHTML = `
                <span class="close-modal">&times;</span>
                <img src="${imgSrc}" alt="${caption}" style="max-width: 100%; height: auto;">
                <p>${caption}</p>
            `;
            modal.style.display = 'block';
        }
    }

    // Function to hide modal
    function hideModal() {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Filter events by category
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Show/hide events based on category
            eventCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Initialize calendar
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Sample events data
    const events = [
        {
            id: 1,
            title: "Viking Festival",
            date: "2024-12-15",
            location: "Bergen",
            description: "Experience the rich Viking heritage with traditional music, food, and reenactments.",
            image: "images/events/viking-festival.jpg",
            price: "499 NOK",
            tags: ["Culture", "Festival", "History"],
            featured: true
        },
        {
            id: 2,
            title: "Northern Lights Tour",
            date: "2024-12-20",
            location: "Tromsø",
            description: "Join our expert guides for an unforgettable aurora hunting experience.",
            image: "images/events/northern-lights.jpg",
            price: "1299 NOK",
            tags: ["Nature", "Night Tour", "Photography"]
        },
        {
            id: 3,
            title: "Fjord Cruise",
            date: "2024-12-25",
            location: "Geirangerfjord",
            description: "Cruise through Norway's most spectacular fjord with stunning views and waterfalls.",
            image: "images/events/fjord-cruise.jpg",
            price: "899 NOK",
            tags: ["Nature", "Cruise", "Sightseeing"]
        },
        {
            id: 4,
            title: "Christmas Market",
            date: "2024-12-10",
            location: "Oslo",
            description: "Traditional Norwegian Christmas market with local crafts, food, and festivities.",
            image: "images/events/christmas-market.jpg",
            price: "Free",
            tags: ["Culture", "Market", "Family"]
        }
    ];

    // Initialize filters
    function initializeFilters() {
        const filterForm = document.getElementById('eventFilters');
        if (filterForm) {
            filterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                filterEvents();
            });
        }
    }

    // Filter events based on user input
    function filterEvents() {
        const category = document.getElementById('categoryFilter').value;
        const date = document.getElementById('dateFilter').value;
        const location = document.getElementById('locationFilter').value;

        const filteredEvents = events.filter(event => {
            const categoryMatch = category === 'all' || event.tags.includes(category);
            const dateMatch = !date || event.date === date;
            const locationMatch = !location || event.location.toLowerCase().includes(location.toLowerCase());
            return categoryMatch && dateMatch && locationMatch;
        });

        displayEvents(filteredEvents);
    }

    // Display events in the grid
    function displayEvents(eventsToShow) {
        const eventsGrid = document.querySelector('.events-grid');
        if (!eventsGrid) return;

        eventsGrid.innerHTML = '';

        // Display featured event first
        const featuredEvent = eventsToShow.find(event => event.featured);
        if (featuredEvent) {
            eventsGrid.innerHTML = createFeaturedEventCard(featuredEvent);
        }

        // Display other events
        eventsToShow.filter(event => !event.featured).forEach(event => {
            eventsGrid.innerHTML += createEventCard(event);
        });
    }

    // Create HTML for featured event card
    function createFeaturedEventCard(event) {
        return `
            <div class="featured-event">
                <img src="${event.image}" alt="${event.title}" class="event-image">
                <div class="event-content">
                    <div class="event-date">${formatDate(event.date)}</div>
                    <h2 class="event-title">${event.title}</h2>
                    <div class="event-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${event.location}
                    </div>
                    <div class="event-tags">
                        ${event.tags.map(tag => `<span class="event-tag">${tag}</span>`).join('')}
                    </div>
                    <p class="event-description">${event.description}</p>
                    <div class="event-footer">
                        <span class="event-price">${event.price}</span>
                        <a href="#" class="event-button" onclick="openEventModal(${event.id})">Book Now</a>
                    </div>
                </div>
            </div>
        `;
    }

    // Create HTML for regular event card
    function createEventCard(event) {
        return `
            <div class="event-card">
                <img src="${event.image}" alt="${event.title}" class="event-image">
                <div class="event-content">
                    <div class="event-date">${formatDate(event.date)}</div>
                    <h3 class="event-title">${event.title}</h3>
                    <div class="event-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${event.location}
                    </div>
                    <div class="event-tags">
                        ${event.tags.map(tag => `<span class="event-tag">${tag}</span>`).join('')}
                    </div>
                    <p class="event-description">${event.description}</p>
                    <div class="event-footer">
                        <span class="event-price">${event.price}</span>
                        <a href="#" class="event-button" onclick="openEventModal(${event.id})">Book Now</a>
                    </div>
                </div>
            </div>
        `;
    }

    // Format date for display
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Calendar functionality
    function updateCalendar() {
        const calendarGrid = document.querySelector('.calendar-grid');
        if (!calendarGrid) return;

        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        
        document.querySelector('.calendar-month').textContent = `${monthNames[currentMonth]} ${currentYear}`;
        
        let calendarHTML = '';
        
        // Add day headers
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
            calendarHTML += `<div class="calendar-day header">${day}</div>`;
        });
        
        // Add empty cells for days before first day of month
        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarHTML += '<div class="calendar-day empty"></div>';
        }
        
        // Add days of month
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const date = new Date(currentYear, currentMonth, day);
            const dateString = date.toISOString().split('T')[0];
            const hasEvent = events.some(event => event.date === dateString);
            
            calendarHTML += `
                <div class="calendar-day ${hasEvent ? 'has-event' : ''}" data-date="${dateString}">
                    ${day}
                    ${hasEvent ? '<span class="event-indicator"></span>' : ''}
                </div>
            `;
        }
        
        calendarGrid.innerHTML = calendarHTML;
        
        // Add click events to calendar days
        document.querySelectorAll('.calendar-day:not(.empty):not(.header)').forEach(day => {
            day.addEventListener('click', () => {
                const date = day.dataset.date;
                document.getElementById('dateFilter').value = date;
                filterEvents();
            });
        });
    }

    // Event modal functionality
    window.openEventModal = function(eventId) {
        const event = events.find(e => e.id === eventId);
        if (!event) return;

        const modal = document.querySelector('.event-modal');
        const modalContent = modal.querySelector('.modal-content');

        modalContent.innerHTML = `
            <span class="close-modal">&times;</span>
            <img src="${event.image}" alt="${event.title}" style="width: 100%; border-radius: 10px; margin-bottom: 20px;">
            <h2>${event.title}</h2>
            <div class="event-tags">
                ${event.tags.map(tag => `<span class="event-tag">${tag}</span>`).join('')}
            </div>
            <p><strong>Date:</strong> ${formatDate(event.date)}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Price:</strong> ${event.price}</p>
            <p>${event.description}</p>
            <form id="bookingForm" style="margin-top: 20px;">
                <div class="form-group">
                    <label for="tickets">Number of Tickets</label>
                    <input type="number" id="tickets" min="1" value="1" class="form-control">
                </div>
                <button type="submit" class="event-button" style="margin-top: 20px;">Confirm Booking</button>
            </form>
        `;

        modal.style.display = 'block';

        // Close modal functionality
        const closeBtn = modalContent.querySelector('.close-modal');
        closeBtn.onclick = () => modal.style.display = 'none';
        window.onclick = (e) => {
            if (e.target === modal) modal.style.display = 'none';
        };

        // Booking form submission
        const bookingForm = modalContent.querySelector('#bookingForm');
        bookingForm.onsubmit = (e) => {
            e.preventDefault();
            const tickets = document.getElementById('tickets').value;
            alert(`Booking confirmed for ${tickets} ticket(s) to ${event.title}!`);
            modal.style.display = 'none';
        };
    };

    // Navigation buttons functionality
    document.querySelector('.prev-month').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });

    document.querySelector('.next-month').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });

    // Initialize everything
    initializeFilters();
    displayEvents(events);
    updateCalendar();
});
