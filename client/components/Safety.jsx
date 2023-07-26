// Import the React library
import React from 'react';

// Define the Safety functional component
const Safety = () => {
    // Static text for the terms of service and user agreement; this would likely come from a CMS or database in a real app
    const termsOfService = 'Your terms of service would go here...';
    const userAgreement = 'Your user agreement would go here...';

    // Function to handle emergency situation
    const handleEmergency = () => {
        alert('In case of emergency, please dial your local emergency number. The following are emergency assistance numbers in your area:');

    };

    // Render the terms of service, user agreement, and a button for contacting emergency services
    return (
        <div>
            <h2>Terms of Service</h2>
            <p>{termsOfService}</p>

            <h2>User Agreement</h2>
            <p>{userAgreement}</p>

            <button onClick={handleEmergency}>Contact Emergency Services</button>
        </div>
    );
};

// Export the Safety component as the default export from this module
export default Safety;

