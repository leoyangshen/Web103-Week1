const renderLaunches = async () => {
    const launchList = document.getElementById('launch-list');
    launchList.innerHTML = ''; // Clear any existing content

    try {
        const response = await fetch('/launches');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const launches = await response.json();

        if (launches.length > 0) {
            launches.forEach(launch => {
                const launchCard = document.createElement('div');
                launchCard.className = 'card';
                launchCard.innerHTML = `
                    <article>
                        <h3>${launch.name}</h3>
                        <p><strong>Vehicle:</strong> ${launch.launchVehicle}</p>
                        <p><strong>Date:</strong> ${launch.date}</p>
                        <a href="/launches/${launch.id}" role="button">Read More</a>
                    </article>
                `;
                launchList.appendChild(launchCard);
            });
        } else {
            launchList.innerHTML = '<p>No launches found.</p>';
        }
    } catch (error) {
        console.error('Error fetching launches:', error);
        launchList.innerHTML = '<p>Failed to load launches. Please try again later.</p>';
    }
};

renderLaunches();
