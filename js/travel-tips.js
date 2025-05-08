// Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.remove('active');
                item.style.display = 'none';
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                content.classList.add('active');
                content.style.display = 'block';
            }
        });
    });

    // Open first accordion item by default
    const firstAccordionContent = document.querySelector('.accordion-content');
    if (firstAccordionContent) {
        firstAccordionContent.classList.add('active');
        firstAccordionContent.style.display = 'block';
    }
});

// Cost Calculator functionality
const calculateCosts = () => {
    const days = parseInt(document.getElementById('days').value);
    const accommodationType = document.getElementById('accommodation-type').value;
    const travelStyle = document.getElementById('travel-style').value;

    // Base costs per day in NOK
    const costs = {
        accommodation: {
            budget: 300,
            mid: 1200,
            luxury: 2500
        },
        food: {
            budget: 250,
            moderate: 500,
            luxury: 1000
        },
        activities: {
            budget: 200,
            moderate: 500,
            luxury: 1000
        },
        transport: {
            budget: 100,
            moderate: 300,
            luxury: 800
        }
    };

    // Calculate costs
    const accommodationCost = costs.accommodation[accommodationType] * days;
    const foodCost = costs.food[travelStyle] * days;
    const activitiesCost = costs.activities[travelStyle] * days;
    const transportCost = costs.transport[travelStyle] * days;
    const totalCost = accommodationCost + foodCost + activitiesCost + transportCost;

    // Update DOM
    document.getElementById('accommodation-cost').textContent = `${accommodationCost} NOK`;
    document.getElementById('food-cost').textContent = `${foodCost} NOK`;
    document.getElementById('activities-cost').textContent = `${activitiesCost} NOK`;
    document.getElementById('transport-cost').textContent = `${transportCost} NOK`;
    document.getElementById('total-cost').textContent = `${totalCost} NOK (≈ ${Math.round(totalCost/10)} EUR)`;
};

// Add event listener to calculate button
document.getElementById('calculate-btn').addEventListener('click', calculateCosts);

// Initialize with default values
calculateCosts();

// Weather widget placeholder
// You would typically integrate with a weather API here
const updateWeatherWidget = () => {
    const weatherWidget = document.getElementById('weather-widget');
    if (weatherWidget) {
        weatherWidget.innerHTML = `
            <div class="weather-info">
                <p>Oslo</p>
                <p class="temperature">12°C</p>
                <p>Partly Cloudy</p>
                <small>Last updated: ${new Date().toLocaleString()}</small>
            </div>
        `;
    }
};

updateWeatherWidget();

// Add smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
