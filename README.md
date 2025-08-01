# Hotel Search Application

A simple hotel search application with a RESTful API backend and interactive API documentation.

## Features

- List available travel destinations
- Search for hotels in specific cities
- Filter by date availability
- Interactive API documentation with Swagger UI

## API Documentation

The API is documented using OpenAPI 3.0 specification and can be accessed via the interactive Swagger UI.

### Available Endpoints

#### 1. Get Available Destinations
- **GET** `/api/destination`
- Returns a list of available travel destinations
- No authentication required

#### 2. Search Hotels
- **GET** `/api/searchResults`
- Parameters:
  - `city` (required): City to search for hotels
  - `from_date` (optional): Check-in date (YYYY-MM-DD)
  - `to_date` (optional): Check-out date (YYYY-MM-DD)
- Returns a list of available hotels in the specified city

### Accessing the API Documentation

1. Start the development server:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000/api-docs
   ```

   The interactive Swagger UI will show all available endpoints, their parameters, and example responses.

## Development

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The server will be available at `http://localhost:3000`

### Environment Variables

No environment variables are required for the basic setup.

## API Response Examples

### Get Available Destinations
```http
GET /api/destination
```

Response:
```json
[
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Sydney",
  "Dubai",
  "Singapore",
  "Rome",
  "Barcelona",
  "Istanbul"
]
```

### Search Hotels
```http
GET /api/searchResults?city=New%20York&from_date=2023-12-15&to_date=2023-12-20
```

Response:
```json
[
  {
    "name": "Grand NYC Hotel",
    "city": "New York",
    "available_from": "2023-12-15",
    "available_to": "2023-12-20",
    "image_url": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop"
  },
  {
    "name": "Central Park Inn",
    "city": "New York",
    "available_from": "2023-12-15",
    "available_to": "2023-12-20",
    "image_url": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop"
  }
]
```

## License

This project is open source and available under the [MIT License](LICENSE).

base_url = https://samplehotelsearchapp-brnsoo0jo-sagarvs-projects.vercel.app
