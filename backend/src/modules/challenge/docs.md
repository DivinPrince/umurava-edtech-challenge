# Challenge Module Documentation

This document outlines the API endpoints and data structures for the Challenge module.

## Endpoints

### Get Challenges
Retrieves a list of challenges with optional filtering and pagination.

```javascript
GET /api/challenges

// Query Parameters
{
  page?: number,        // Page number for pagination
  limit?: number,       // Number of items per page
  search?: string,      // Search across multiple fields (title, description, project details, skills)
  title?: string,       // Filter by challenge title
  minPrize?: number,    // Filter by minimum prize amount
  maxPrize?: number,    // Filter by maximum prize amount
  deadline?: string,    // Filter by deadline (ISO date string)
  sortBy?: 'createdAt' | 'deadline' | 'prize',  // Field to sort by
  sortOrder?: 'asc' | 'desc',                   // Sort direction
  filter?: 'completed' | 'ongoing' | 'open'       // Filter by challenge status
}

// Response (200 OK)
{
  data: [
    {
      id: string,
      title: string,
      description: string,
      deadline: string,
      duration: string,
      prize: number,
      contactEmail: string,
      // ... other challenge fields
    }
  ],
  pagination: {
    total: number,
    page: number,
    limit: number,
    totalPages: number
  }
}

// Status Filter Explanation:
// - completed: Challenges with deadline in the past
// - ongoing: Challenges with future deadline and at least one submission
// - open: Challenges with future deadline and no submissions

// Search Parameter:
// The search parameter performs a case-insensitive search across multiple fields:
// - Title
// - Description
// - Project Brief
// - Project Description
// - Project Requirements
// - Skills Required
```

### Get Challenge
Retrieves a single challenge by ID or slug.

```javascript
GET /api/challenges/:type/:identifier

// Parameters:
// :type - Must be either 'id' or 'slug'
// :identifier - The challenge ID or slug based on the type

// Examples:
// GET /api/challenges/id/507f1f77bcf86cd799439011
// GET /api/challenges/slug/my-challenge-title

// Response (200 OK)
{
  id: string,
  slug: string,        // URL-friendly version of the title
  title: string,
  description: string,
  deadline: string,
  duration: string,
  prize: number,
  contactEmail: string,
  projectBrief: string,
  projectDescription: string,
  projectRequirements: string,
  skillsRequired: string[],
  seniorityLevers: string[],
  deliverables: string,
  createdAt: string,
  updatedAt: string,
  status: string       // 'completed', 'ongoing', or 'open'
}
```

### Create Challenge (Admin)
Creates a new challenge in the system.

```javascript
POST /api/challenges

// Request Body
{
  title: string,              // Challenge title
  description: string,        // Challenge description
  deadline: string,           // Challenge deadline (ISO date string)
  duration: string,           // Challenge duration
  prize: number,             // Prize amount (positive number)
  contactEmail: string,       // Contact email for the challenge
  projectBrief: string,       // Brief overview of the project
  projectDescription: string, // Detailed project description
  projectRequirements: string,// Project requirements
  skillsRequired: string[],   // Array of required skills
  seniorityLevers: string[], // Array of seniority levels
  deliverables: string       // Expected deliverables
}

// Response (201 Created)
{
  id: string,
  title: string,
  description: string,
  // ... all challenge fields
  createdAt: string,
  updatedAt: string
}
```

### Update Challenge (Admin)
Updates an existing challenge by ID.

```javascript
PUT /api/challenges/:id

// Request Body (all fields optional)
{
  title?: string,              // Challenge title
  description?: string,        // Challenge description
  deadline?: string,           // Challenge deadline (ISO date string)
  duration?: string,           // Challenge duration
  prize?: number,             // Prize amount (positive number)
  contactEmail?: string,       // Contact email for the challenge
  projectBrief?: string,       // Brief overview of the project
  projectDescription?: string, // Detailed project description
  projectRequirements?: string,// Project requirements
  skillsRequired?: string[],   // Array of required skills
  seniorityLevers?: string[], // Array of seniority levels
  deliverables?: string       // Expected deliverables
}

// Response (200 OK)
{
  id: string,
  title: string,
  description: string,
  // ... all challenge fields
  createdAt: string,
  updatedAt: string
}
```

### Delete Challenge (Admin)
Deletes an existing challenge by ID.

```javascript
DELETE /api/challenges/:id

// Parameters:
// :id - The unique identifier of the challenge to delete

// Response (200 OK)
{
  message: "Challenge deleted successfully"
}
```

### Get Challenge Participants (Admin)
Retrieves a paginated list of participants (users) who have submitted to a specific challenge.

```javascript
GET /api/challenges/:id/participants

// Parameters:
// :id - The unique identifier of the challenge

// Query Parameters
{
  page?: number,    // Page number for pagination (default: 1)
  limit?: number    // Number of items per page (default: 10)
}

// Response (200 OK)
{
  data: [
    {
      id: string,
      name: string,
      email: string,
      skills: string[],
      image: string
    }
  ],
  pagination: {
    total: number,
    page: number,
    limit: number,
    totalPages: number
  }
}
```

### Get User Submission (Admin)
Retrieves the submission of a specific user for a challenge. Each user can only have one submission per challenge.

```javascript
GET /api/challenges/:id/submissions/:userId

// Parameters:
// :id - The unique identifier of the challenge
// :userId - The unique identifier of the user

// Response (200 OK)
{
  id: string,
  userId: string,
  challengeId: string,
  content: string,
  status: string,      // "PENDING", "APPROVED", or "REJECTED"
  feedback: string,    // Optional feedback
  submittedAt: string,
  createdAt: string,
  updatedAt: string,
  user: {
    id: string,
    name: string,
    email: string,
    image: string,
    skills: string[]
  }
}

// Error Responses
// 400 Bad Request - Missing required parameters
// 404 Not Found - Challenge or submission not found
// 403 Forbidden - Insufficient permissions (non-admin)
// 409 Conflict - User already has a submission for this challenge
```

## Data Validation

### Challenge Creation Schema
All fields are required unless marked as optional.

- `title`: String, minimum 1 character
- `description`: String, minimum 1 character
- `deadline`: ISO date string
- `duration`: String, minimum 1 character
- `prize`: Positive number
- `contactEmail`: Valid email format
- `projectBrief`: String, minimum 1 character
- `projectDescription`: String, minimum 1 character
- `projectRequirements`: String, minimum 1 character
- `skillsRequired`: Array of strings, minimum 1 skill
- `seniorityLevers`: Array of strings, minimum 1 seniority level
- `deliverables`: String, minimum 1 character

### Challenge Update Schema
All fields are optional but follow the same validation rules as the creation schema when provided.

### Challenge Query Schema
All fields are optional.

- `page`: String convertible to number
- `limit`: String convertible to number
- `title`: String
- `minPrize`: String convertible to number
- `maxPrize`: String convertible to number
- `deadline`: ISO date string
- `sortBy`: One of: 'createdAt', 'deadline', 'prize'
- `sortOrder`: One of: 'asc', 'desc'

## Error Responses

- `400 Bad Request`: Invalid input data or missing challenge identifier
- `401 Unauthorized`: Authentication required (for create/update/delete operations)
- `403 Forbidden`: Insufficient permissions (admin only for create/update/delete)
- `404 Not Found`: Challenge not found with the provided ID or slug
- `500 Internal Server Error`: Server error

### Challenge Response

A challenge object in the response includes the following fields:

- `deadline`: The deadline for challenge submissions (ISO date string)
- `status`: The current status of the challenge. Can be one of:
  - `completed`: Challenge deadline has passed
  - `ongoing`: Challenge is active and has received submissions
  - `open`: Challenge is active but hasn't received any submissions yet

### Query Parameters

- `filter`: Filter challenges by status
  - `completed`: Show challenges whose deadline has passed
  - `ongoing`: Show active challenges with submissions
  - `open`: Show active challenges without submissions