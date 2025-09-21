const renderLaunchDetails = async () => {
    const launchDetails = document.getElementById('launch-details');
    const pathSegments = window.location.pathname.split('/');
    const launchId = parseInt(pathSegments[pathSegments.length - 1]);

    try {
        const response = await fetch(`/api/launches/${launchId}`);
        if (!response.ok) {
            throw new Error('Launch not found');
        }
        const launch = await response.json();

        launchDetails.innerHTML = `
            <article>
                <h1>${launch.name}</h1>
                <p><strong>Vehicle:</strong> ${launch.launchVehicle}</p>
                <p><strong>Date:</strong> ${launch.launchDate}</p>
                <p><strong>Launch Site:</strong> ${launch.launchSite}</p>
                <p><strong>Mission Type:</strong> ${launch.missionType}</p>
            </article>
        `;
    } catch (error) {
        console.error('Error fetching launch details:', error);
        launchDetails.innerHTML = `
            <article class="error">
                <h1>Launch Not Found</h1>
                <p>The launch you are looking for does not exist.</p>
            </article>
        `;
    }
};

renderLaunchDetails();
