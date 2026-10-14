# Blood Donation and Emergency Connect App

A modern full-stack web application connecting blood donors and recipients during emergencies.

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase PostgreSQL
- **Authentication**: Email/password with bcrypt password hashing
- **Styling**: Tailwind CSS with custom medical UI theme

## Features

### Pages

1. **Landing Page** (`/`)
   - Hero section with call-to-action buttons
   - Features section highlighting app capabilities
   - Statistics section (donors, hospitals, blood groups)
   - Blood groups available display
   - "Why Donate Blood" section

2. **Login & Registration** (`/login`, `/register`)
   - User registration with validation
   - Password hashing with bcrypt
   - Session management via localStorage
   - Form validation

3. **Dashboard** (`/dashboard`)
   - Statistics overview (total donors, blood groups, hospitals)
   - Quick action cards
   - Recent donors and hospitals lists
   - Emergency SOS quick access

4. **Donor Registration** (`/register-donor`)
   - Comprehensive donor form
   - Fields: Name, Age, Gender, Blood Group, City, Phone, Last Donation Date
   - Validation for all fields

5. **Search by Blood Group** (`/search/blood-group`)
   - Dropdown selection of blood groups
   - Displays matching donor cards with contact info

6. **Search by Location** (`/search/location`)
   - City-based search
   - Shows both donors and hospitals in the area

7. **Hospital Directory** (`/hospitals`)
   - Complete list of partner hospitals
   - Search functionality
   - Grouped by city
   - Emergency services indicators

8. **SOS Emergency** (`/sos`)
   - Large animated SOS button
   - Blood group and location input
   - Immediate display of matching donors and nearby hospitals
   - Emergency hotline contacts

9. **Admin Panel** (`/admin`)
   - Tab-based interface (Donors / Hospitals)
   - Full CRUD operations for both
   - Modal forms for add/edit
   - Delete confirmation

## Database Schema

### Users Table
```sql
- id (UUID, primary key)
- username (VARCHAR)
- email (VARCHAR, unique)
- password (VARCHAR, hashed)
- created_at (TIMESTAMP)
```

### Donors Table
```sql
- id (UUID, primary key)
- name (VARCHAR)
- age (INTEGER, 18-100)
- gender (VARCHAR)
- blood_group (VARCHAR, A+/A-/B+/B-/AB+/AB-/O+/O-)
- city (VARCHAR)
- phone (VARCHAR)
- last_donation (DATE, nullable)
- created_at (TIMESTAMP)
```

### Hospitals Table
```sql
- id (UUID, primary key)
- name (VARCHAR)
- city (VARCHAR)
- contact (VARCHAR)
- emergency_services (BOOLEAN)
- created_at (TIMESTAMP)
```

## API Routes

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Authenticate user
- `GET /api/stats` - Dashboard statistics
- `GET/POST/PUT/DELETE /api/donors` - Donor CRUD operations
- `GET/POST/PUT/DELETE /api/hospitals` - Hospital CRUD operations

## Sample Data

The database is pre-populated with:
- 15 donor records across various blood groups and cities
- 10 hospital records across major US cities

## Running Locally

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

## Environment Variables

Required in `.env`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (optional)
```

## Design Features

- Clean medical UI with red and white color scheme
- Rounded cards with subtle shadows
- Smooth animations and hover effects
- Responsive layout for all screen sizes
- Modern icons (Lucide React)
- Toast notifications for user feedback
- Loading animations
- Error handling with user-friendly messages
- Professional typography and spacing

## Deployment

Ready for Vercel deployment with zero configuration.
