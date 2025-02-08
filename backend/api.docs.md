# Umurava EdTech API Documentation

This document provides comprehensive documentation for all API endpoints and data structures in the system.

## Table of Contents
1. [Challenge Module](#challenge-module)
2. [Stats Module](#stats-module)
3. [Submission Module](#submission-module)

## Challenge Module

### Endpoints

#### Get Challenges
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
      slug: string,
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
      status: string,      // 'completed', 'ongoing', or 'open'
      submissionsCount: number,
      isExpired: boolean
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

#### Get Challenge
Retrieves a single challenge by ID or slug.

```javascript
GET /api/challenges/:type/:identifier

// Parameters:
// :type - Must be either 'id' or 'slug'
// :identifier - The challenge ID or slug based on the type

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

#### Create Challenge (Admin)
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
  slug: string,
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
  status: string,      // 'completed', 'ongoing', or 'open'
  submissionsCount: number,
  isExpired: boolean
}
```

#### Update Challenge (Admin)
Updates an existing challenge by ID.

```javascript
PUT /api/challenges/:id

// Request Body (all fields optional)
{
  title?: string,
  description?: string,
  deadline?: string,
  duration?: string,
  prize?: number,
  contactEmail?: string,
  projectBrief?: string,
  projectDescription?: string,
  projectRequirements?: string,
  skillsRequired?: string[],
  seniorityLevers?: string[],
  deliverables?: string
}

// Response (200 OK)
{
  id: string,
  slug: string,
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
  status: string,      // 'completed', 'ongoing', or 'open'
  submissionsCount: number,
  isExpired: boolean
}
```

#### Delete Challenge (Admin)
```javascript
DELETE /api/challenges/:id

// Response (200 OK)
{
  message: "Challenge deleted successfully"
}
```

## Stats Module

### Endpoints

#### Get User Stats
```javascript
GET /api/stats/user

// Response (200 OK)
{
    "openChallenges": number,     // Challenges with no submissions and not expired
    "ongoingChallenges": number,  // Challenges with submissions and not expired
    "completedChallenges": number // Challenges past deadline
}
```

#### Get Total Challenges Stats (Admin)
```javascript
GET /api/stats/challenges/total

// Query Parameters
{
    startDate: string, // Start date (YYYY-MM-DD)
    endDate: string    // End date (YYYY-MM-DD)
}

// Response (200 OK)
{
    "count": number,        // Total number of challenges in the period
    "percentage": number,   // Percentage change compared to previous period
    "direction": "up" | "down" // Trend direction
}
```

#### Get Participants Stats (Admin)
```javascript
GET /api/stats/challenges/participants

// Query Parameters
{
    startDate: string, // Start date (YYYY-MM-DD)
    endDate: string    // End date (YYYY-MM-DD)
}

// Response (200 OK)
{
    "count": number,        // Number of participants
    "percentage": number,   // Percentage change
    "direction": "up" | "down"
}
```

#### Get Open/Ongoing/Completed Challenges Stats (Admin)
```javascript
GET /api/stats/challenges/{open|ongoing|completed}

// Query Parameters
{
    startDate: string,
    endDate: string
}

// Response (200 OK)
{
    "count": number,
    "percentage": number,
    "direction": "up" | "down"
}
```

## Submission Module

### Endpoints

#### Get All Submissions (Admin)
```javascript
GET /api/submissions/admin

// Query Parameters
{
  page?: number,
  limit?: number,
  status?: 'PENDING' | 'APPROVED' | 'REJECTED',
  challengeId?: string,
  sortBy?: 'submittedAt' | 'createdAt' | 'updatedAt',
  sortOrder?: 'asc' | 'desc'
}

// Response (200 OK)
{
  data: [
    {
      id: string,
      userId: string,
      challengeId: string,
      content: string,
      status: 'PENDING' | 'APPROVED' | 'REJECTED',
      feedback?: string,
      submittedAt: string,
      user: {
        id: string,
        name: string,
        email: string,
        image?: string
      },
      challenge: {
        id: string,
        title: string,
        slug: string
      }
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

#### Get User's Submissions
```javascript
GET /api/submissions

// Query Parameters - Same as admin endpoint
// Response format - Same as admin endpoint
```

#### Get Specific Submission
```javascript
GET /api/submissions/:id

// Response (200 OK)
{
  id: string,
  userId: string,
  challengeId: string,
  content: string,
  status: 'PENDING' | 'APPROVED' | 'REJECTED',
  feedback?: string,
  submittedAt: string,
  createdAt: string,
  updatedAt: string,
  user: {
    id: string,
    name: string,
    email: string,
    image?: string
  },
  challenge: {
    id: string,
    title: string,
    slug: string
  }
}
```

#### Create Submission
```javascript
POST /api/submissions

// Request Body
{
  challengeId: string,  // ID of the challenge
  content: string      // Submission content
}

// Response (201 Created)
// Returns the created submission object
```

#### Update Submission (Admin)
```javascript
PATCH /api/submissions/:id

// Request Body
{
  status?: 'PENDING' | 'APPROVED' | 'REJECTED',
  feedback?: string
}

// Response (200 OK)
// Returns the updated submission object
```

#### Delete Submission
```javascript
DELETE /api/submissions/:id

// Response (200 OK)
{
  message: "Submission deleted successfully"
}
```

## Data Validation & Business Rules

### Challenge Validation
- All fields required for creation
- Title and description must be non-empty strings
- Prize must be a positive number
- Deadline must be a valid future date
- Email must be valid format

### Submission Rules
1. Users can only submit once per challenge
2. Users cannot submit after challenge deadline
3. Users can only view their own submissions (unless admin)
4. Only admins can update submission status
5. Users can delete their own submissions
6. Admins can manage any submission

### Stats Validation
- Date parameters must be in YYYY-MM-DD format
- Both startDate and endDate required for admin stats

## Error Responses

All endpoints may return the following error responses:

- `400 Bad Request`: Invalid input data or business rule violation
- `401 Unauthorized`: Missing authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Authentication

- User endpoints require user authentication
- Admin endpoints require admin authentication
- Authentication token must be provided in Authorization header
- More Details on auth [better-auth](https://better-auth.com/docs)