// controllers/searchController.js
import Place from "../models/Search.js";

const searchController = {
  search: async (req, res) => {
    const query = req.query.query;
    try {
      // Call Unsplash API to search for images based on the place name
      const response = await axios.get(`https://api.unsplash.com/search/photos?query=${query}`, {
        headers: {
          Authorization: 'Client-ID YOUR_ACCESS_KEY' // Replace YOUR_ACCESS_KEY with your Unsplash access key
        }
      });

      // Extract the image URLs from the response and send them back to the client
      const imageUrls = response.data.results.map(result => result.urls.regular);
      res.json(imageUrls);
    } catch (error) {
      console.error('Error searching images:', error);
      res.status(500).json({ error: 'Error searching images' });
    }
  }
};

export default searchController;