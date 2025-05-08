document.addEventListener('DOMContentLoaded', function() {
    // Initialize date inputs with today and tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    document.getElementById('check-in').valueAsDate = today;
    document.getElementById('check-out').valueAsDate = tomorrow;

    // Price range slider logic
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    const priceMinValue = document.getElementById('price-min-value');
    const priceMaxValue = document.getElementById('price-max-value');

    function updatePriceValues() {
        priceMinValue.textContent = `${priceMin.value} NOK`;
        priceMaxValue.textContent = `${priceMax.value} NOK`;
    }

    priceMin.addEventListener('input', function() {
        if (parseInt(priceMin.value) > parseInt(priceMax.value)) {
            priceMin.value = priceMax.value;
        }
        updatePriceValues();
    });

    priceMax.addEventListener('input', function() {
        if (parseInt(priceMax.value) < parseInt(priceMin.value)) {
            priceMax.value = priceMin.value;
        }
        updatePriceValues();
    });

    // Clear form
    document.getElementById('clear-search').addEventListener('click', function() {
        document.getElementById('accommodation-search').reset();
        document.getElementById('check-in').valueAsDate = today;
        document.getElementById('check-out').valueAsDate = tomorrow;
        priceMin.value = 0;
        priceMax.value = 5000;
        updatePriceValues();
    });

    // Sample accommodation data (in real application, this would come from a backend)
    const accommodations = [
        {
            id: 1,
            name: "Grand Hotel Oslo",
            type: "hotel",
            location: "Oslo",
            price: 2500,
            rating: 4.8,
            image: "images/hotel-oslo.jpg",
            amenities: ["wifi", "parking", "breakfast", "pool"],
            description: "5-star luxury hotel in the heart of Oslo"
        },
        {
            id: 2,
            name: "Fjord View Cabin",
            type: "cabin",
            location: "Geirangerfjord",
            price: 1200,
            rating: 4.9,
            image: "images/fjord-cabin.jpg",
            amenities: ["wifi", "parking"],
            description: "Traditional cabin with panoramic fjord views"
        },
        {
            id: 3,
            name: "Bergen Camping",
            type: "camping",
            location: "Bergen",
            price: 400,
            rating: 4.5,
            image: "images/bergen-camping.jpg",
            amenities: ["parking"],
            description: "Well-equipped camping site near Bergen"
        }
    ];

    // Search form submission
    document.getElementById('accommodation-search').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const searchData = {
            location: document.getElementById('location').value.toLowerCase(),
            checkIn: document.getElementById('check-in').value,
            checkOut: document.getElementById('check-out').value,
            guests: document.getElementById('guests').value,
            types: Array.from(document.getElementById('type').selectedOptions).map(opt => opt.value),
            priceMin: parseInt(document.getElementById('price-min').value),
            priceMax: parseInt(document.getElementById('price-max').value),
            amenities: Array.from(document.querySelectorAll('input[name="amenities"]:checked')).map(cb => cb.value)
        };

        // Filter accommodations based on search criteria
        const results = accommodations.filter(acc => {
            const matchesLocation = !searchData.location || acc.location.toLowerCase().includes(searchData.location);
            const matchesPrice = acc.price >= searchData.priceMin && acc.price <= searchData.priceMax;
            const matchesType = searchData.types.length === 0 || searchData.types.includes(acc.type);
            const matchesAmenities = searchData.amenities.every(amenity => acc.amenities.includes(amenity));

            return matchesLocation && matchesPrice && matchesType && matchesAmenities;
        });

        displayResults(results);
    });

    function displayResults(results) {
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = '';

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No accommodations found matching your criteria.</p>
                </div>
            `;
            return;
        }

        results.forEach(acc => {
            const resultCard = document.createElement('div');
            resultCard.className = 'destination-card result-card';
            
            resultCard.innerHTML = `
                <div class="destination-image">
                    <img src="${acc.image}" alt="${acc.name}">
                    <div class="destination-overlay">
                        <a href="#" class="btn-explore">View Details</a>
                    </div>
                </div>
                <div class="destination-content">
                    <div class="destination-tag">${acc.type.charAt(0).toUpperCase() + acc.type.slice(1)}</div>
                    <h3>${acc.name}</h3>
                    <div class="destination-info">
                        <span><i class="fas fa-star"></i> ${acc.rating}/5</span>
                        <span><i class="fas fa-money-bill-wave"></i> ${acc.price} NOK</span>
                    </div>
                    <div class="amenities">
                        ${acc.amenities.map(amenity => `
                            <span><i class="fas fa-${getAmenityIcon(amenity)}"></i></span>
                        `).join('')}
                    </div>
                </div>
            `;
            
            resultsContainer.appendChild(resultCard);
        });
    }

    function getAmenityIcon(amenity) {
        const icons = {
            wifi: 'wifi',
            parking: 'parking',
            breakfast: 'coffee',
            pool: 'swimming-pool'
        };
        return icons[amenity] || 'check';
    }

    // Set minimum date for check-in to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('check-in').min = today;

    // Update check-out minimum date when check-in is selected
    document.getElementById('check-in').addEventListener('change', (e) => {
        const checkOut = document.getElementById('check-out');
        checkOut.min = e.target.value;
        if (checkOut.value && checkOut.value < e.target.value) {
            checkOut.value = e.target.value;
        }
    });

    // Map functionality
    const accommodationLocations = [
        {
            id: 1,
            name: "Grand Hotel Oslo",
            type: "hotel",
            location: "Oslo",
            coordinates: [59.9139, 10.7522],
            price: 2500,
            rating: 4.8,
            image: "images/hotel-oslo.jpg",
            amenities: ["wifi", "parking", "breakfast", "pool"],
            description: "5-star luxury hotel in the heart of Oslo"
        },
        {
            id: 2,
            name: "Fjord View Cabin",
            type: "cabin",
            location: "Geirangerfjord",
            coordinates: [62.1049, 7.2055],
            price: 1200,
            rating: 4.9,
            image: "images/fjord-cabin.jpg",
            amenities: ["wifi", "parking"],
            description: "Traditional cabin with panoramic fjord views"
        },
        {
            id: 3,
            name: "Bergen Camping",
            type: "camping",
            location: "Bergen",
            coordinates: [60.3913, 5.3221],
            price: 400,
            rating: 4.5,
            image: "images/bergen-camping.jpg",
            amenities: ["parking"],
            description: "Well-equipped camping site near Bergen"
        },
        {
            id: 4,
            name: "Aurora View Cabin",
            type: "cabin",
            location: "Tromsø",
            coordinates: [69.6492, 18.9553],
            price: 1800,
            rating: 5.0,
            image: "images/aurora-cabin.jpg",
            amenities: ["wifi", "parking", "breakfast"],
            description: "Glass-roof cabin perfect for Northern Lights viewing"
        },
        {
            id: 5,
            name: "Stavanger Harbor Hotel",
            type: "hotel",
            location: "Stavanger",
            coordinates: [58.9700, 5.7331],
            price: 1500,
            rating: 4.6,
            image: "images/stavanger-hotel.jpg",
            amenities: ["wifi", "parking", "breakfast", "pool"],
            description: "Modern hotel with harbor views"
        }
    ];

    // Initialize map
    let map;
    let markers = [];

    function initMap() {
        // Create map centered on Norway
        map = L.map('accommodation-map').setView([65.4720, 13.3271], 5);

        // Add OpenStreetMap tiles with a more reliable CDN
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);

        // Add markers for all accommodations
        addMarkersToMap();
        
        // Update accommodation list
        updateAccommodationList();
    }

    function createCustomMarker(accommodation) {
        // Create custom icon based on accommodation type
        const iconClass = {
            hotel: 'fa-hotel',
            cabin: 'fa-home',
            camping: 'fa-campground'
        }[accommodation.type];

        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<i class="fas ${iconClass}"></i>`,
            iconSize: [30, 30]
        });

        return L.marker(accommodation.coordinates, { icon: customIcon });
    }

    function createPopupContent(accommodation) {
        return `
            <div class="popup-content">
                <img src="${accommodation.image}" alt="${accommodation.name}">
                <h4>${accommodation.name}</h4>
                <p>${accommodation.location}</p>
                <div class="rating">
                    ${Array(Math.floor(accommodation.rating)).fill('<i class="fas fa-star"></i>').join('')}
                    ${accommodation.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                </div>
                <p class="price">${accommodation.price} NOK per night</p>
            </div>
        `;
    }

    function addMarkersToMap() {
        // Clear existing markers
        markers.forEach(marker => marker.remove());
        markers = [];

        // Get checked accommodation types
        const checkedTypes = Array.from(document.querySelectorAll('.filter-group input:checked'))
            .map(checkbox => checkbox.value);

        // Add markers for filtered accommodations
        accommodationLocations
            .filter(acc => checkedTypes.includes(acc.type))
            .forEach(accommodation => {
                const marker = createCustomMarker(accommodation);
                
                marker.bindPopup(createPopupContent(accommodation));
                marker.addTo(map);
                markers.push(marker);
            });
    }

    function updateAccommodationList() {
        const listContainer = document.getElementById('accommodation-list');
        listContainer.innerHTML = '';

        // Get checked accommodation types
        const checkedTypes = Array.from(document.querySelectorAll('.filter-group input:checked'))
            .map(checkbox => checkbox.value);

        // Create list items for filtered accommodations
        accommodationLocations
            .filter(acc => checkedTypes.includes(acc.type))
            .forEach(accommodation => {
                const listItem = document.createElement('div');
                listItem.className = 'accommodation-item';
                listItem.innerHTML = `
                    <h4>${accommodation.name}</h4>
                    <p>${accommodation.location}</p>
                    <p class="price">${accommodation.price} NOK per night</p>
                `;

                // Add click event to center map on this accommodation
                listItem.addEventListener('click', () => {
                    map.setView(accommodation.coordinates, 12);
                    markers.find(marker => 
                        marker.getLatLng().lat === accommodation.coordinates[0] &&
                        marker.getLatLng().lng === accommodation.coordinates[1]
                    )?.openPopup();
                });

                listContainer.appendChild(listItem);
            });
    }

    // Initialize map when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        initMap();

        // Add event listeners for filters
        document.querySelectorAll('.filter-group input').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                addMarkersToMap();
                updateAccommodationList();
            });
        });
    });
});
