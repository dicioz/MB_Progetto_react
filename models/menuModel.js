import * as Location from 'expo-location';

const BASE_URL = 'https://develop.ewlab.di.unimi.it/mc/2425'; // Base URL for your API
const sid = 'vC51NLdQlBnA4no63Ah4YGsiZn0w1MqXvqVRcyxx5lc2nQtYZSTnsVaq9d3EsklJ'; // Your session ID (replace with your own)

// Hardcoded latitude and longitude for the location
const HARD_CODED_LATITUDE = 45.4642; // Example: Latitude for Milan
const HARD_CODED_LONGITUDE = 9.1900; // Example: Longitude for Milan

// Function to fetch the image of a specific menu by its ID
const fetchMenuImage = async (menuId) => {
  try {
    if (!menuId) {
      throw new Error('Invalid menu ID');
    }

    const response = await fetch(`${BASE_URL}/menu/${menuId}/image?sid=${sid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sid}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      console.error('[fetchMenuImage] Error fetching image:', data);
      throw new Error(data.error || 'Error fetching image');
    }

    const imageUrl = await response.json();
    return imageUrl.base64; // Return the base64 image data

  } catch (error) {
    console.error('[fetchMenuImage] Error during image fetch:', error);
    throw error; // Re-throw to be handled by the calling function
  }
};

// Function to fetch menus based on hardcoded latitude and longitude
export const fetchMenus = async () => {
  try {
    const latitude = HARD_CODED_LATITUDE;
    const longitude = HARD_CODED_LONGITUDE;

    if (!latitude || !longitude) {
      throw new Error('Invalid latitude or longitude');
    }

    const response = await fetch(`${BASE_URL}/menu?lat=${latitude}&lng=${longitude}&sid=${sid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const data = await response.json();
      console.error('[fetchMenus] Error fetching menus:', data);
      throw new Error(data.error || 'Error fetching menus');
    }

    const menus = await response.json();

    // Fetch images for each menu and add other details
    const updatedMenus = await Promise.all(menus.map(async (menu) => {
      const menuId = menu.mid;
      let menuImage = null;

      if (menuId) {
        try {
          menuImage = await fetchMenuImage(menuId); // Fetch image for the menu
        } catch (error) {
          console.error(`[fetchMenus] Failed to fetch image for menuId ${menuId}:`, error);
        }
      }

      return {
        ...menu,
        image: menuImage || 'default-image-url', // Use a default image or null if no image fetched
        location: {
          lat: HARD_CODED_LATITUDE,
          lng: HARD_CODED_LONGITUDE,
        },
      };
    }));

    return updatedMenus;

  } catch (error) {
    console.error('[fetchMenus] Error during menu fetch or image fetch:', error);
    throw error; // Re-throw to be handled by the calling function
  }
};

// Function to fetch details of a specific menu (with image)
export const fetchMenuDetails = async (menuId) => {
  try {
    if (!menuId) {
      throw new Error('Menu ID non valido');
    }

    console.log(`[fetchMenuDetails] Fetching details for menuId: ${menuId}`);

    // Use hardcoded latitude and longitude
    const latitude = HARD_CODED_LATITUDE;
    const longitude = HARD_CODED_LONGITUDE;

    // Fetch the menu details
    const response = await fetch(`${BASE_URL}/menu/${menuId}?lat=${latitude}&lng=${longitude}&sid=${sid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`[fetchMenuDetails] Response status for menuId ${menuId}: ${response.status}`);

    if (!response.ok) {
      const data = await response.json();
      console.error('[fetchMenuDetails] Errore durante il fetch dei dettagli:', data);
      throw new Error(data.error || 'Errore durante il fetch dei dettagli del menu');
    }

    // Parse the response data
    const menuDetails = await response.json();

    // Fetch the menu image
    let menuImage = null;
    try {
      menuImage = await fetchMenuImage(menuId); // Fetch image for the menu
    } catch (error) {
      console.error(`[fetchMenuDetails] Failed to fetch image for menuId ${menuId}:`, error);
    }

    // Add the image to the menu details
    const updatedMenuDetails = {
      ...menuDetails,
      image: menuImage || 'default-image-url', // Use a default image if no image is fetched
    };

    return updatedMenuDetails;
  } catch (error) {
    console.error('[fetchMenuDetails] Errore durante il fetch dei dettagli del menu:', error);
    throw error; // Re-throw to be handled by the calling function
  }
};
