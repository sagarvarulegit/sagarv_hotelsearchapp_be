# Hotel Search Application

A robust hotel search and booking application with a RESTful API backend, PostgreSQL integration, and interactive Swagger documentation.

## Features

- **List Destinations**: Get a list of available travel destinations.
- **Search Hotels**: Search for hotels in specific cities with date availability filters.
- **Hotel Details**: Detailed view for specific hotels using unique 4-digit IDs.
- **Hotel Booking**: Create and persist hotel bookings in a PostgreSQL database.
- **Fetch Bookings**: Retrieve all stored bookings from the database.
- **Interactive API Docs**: Explore the API using Swagger UI.
- **Vercel Ready**: Optimized for serverless deployment with Vercel and Vercel Postgres.

## API Documentation

The API is documented using OpenAPI 3.0 specification and can be accessed via the interactive Swagger UI.

### Available Endpoints

#### 1. Get Available Destinations
- **GET** `/api/destination`
- Returns a list of available travel destinations.

#### 2. Search Hotels
- **GET** `/api/searchResults`
- **Parameters**:
  - `city` (required): City to search for hotels.
  - `from_date` (optional): Check-in date (YYYY-MM-DD).
  - `to_date` (optional): Check-out date (YYYY-MM-DD).
- **Returns**: A list of hotels with unique 4-digit numeric IDs.

#### 3. Get Hotel Details
- **GET** `/api/hotelDetails`
- **Parameters**:
  - `hotelId` (required): The 4-digit numeric ID of the hotel.
- **Returns**: Detailed information including amenities, description, and price.

#### 4. Book a Hotel
- **POST** `/api/bookHotel`
- **Body**:
  ```json
  {
    "hotelId": "1001",
    "user": { "name": "Jane Doe", "email": "jane@example.com" },
    "checkIn": "2024-05-01",
    "checkOut": "2024-05-05",
    "guests": 2,
    "price": 1200,
    "currency": "USD"
  }
  ```
- **Returns**: A success message with a unique `bookingId` (e.g., `BK_...`).

#### 5. Fetch All Bookings
- **GET** `/api/fetch_bookings`
- **Returns**: A list of all bookings stored in the database.

### Accessing the API Documentation

1. Local Development: `http://localhost:3000/api-docs`
2. Production: `https://[your-app-url]/api-docs`

## Development

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher
- PostgreSQL (Local or Cloud)

### Setup

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```
3. **Database Configuration**:
   Create a `.env` file in the `backend` directory:
   ```env
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=hotel_search_db
   DB_PASSWORD=your_password
   DB_PORT=5432
   ```
4. **Initialize Database**:
   ```bash
   node setupDb.js
   ```
5. **Start the development server**:
   ```bash
   npm run dev
   ```

## Deployment to Vercel

### Cloud Database Setup
This project uses **Vercel Postgres**.
1. Go to Vercel Dashboard -> Storage -> Create Database -> Postgres.
2. Connect the database to your project to automatically inject `POSTGRES_URL`.
3. Run the SQL schema from `setupDb.js` in the Vercel Storage Query tab.

### Configuration
The `vercel.json` file handles routing in the serverless environment:
```json
{
  "version": 2,
  "rewrites": [
    { "source": "/(.*)", "destination": "/api/index.js" }
  ]
}
```

## License

This project is open source and available under the [MIT License](LICENSE).

---
**Base Production URL**: https://samplehotelsearchapp-brnsoo0jo-sagarvs-projects.vercel.app

