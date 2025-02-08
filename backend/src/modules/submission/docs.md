# Submission Module Documentation

This document outlines the API endpoints and data structures for the Submission module.

## Endpoints

### Get All Submissions (Admin)
Retrieves a list of all submissions with optional filtering and pagination. Only accessible by admin users.

```javascript
GET /api/submissions/admin

// Query Parameters
{
  page?: number,        // Page number for pagination
  limit?: number,       // Number of items per page
  status?: 'PENDING' | 'APPROVED' | 'REJECTED',  // Filter by submission status
  challengeId?: string, // Filter by challenge ID
  sortBy?: 'submittedAt' | 'createdAt' | 'updatedAt',  // Field to sort by
  sortOrder?: 'asc' | 'desc'                           // Sort direction
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

### Get User's Submissions
Retrieves a list of submissions for the authenticated user.

```javascript
GET /api/submissions

// Query Parameters
{
  page?: number,        // Page number for pagination
  limit?: number,       // Number of items per page
  status?: 'PENDING' | 'APPROVED' | 'REJECTED',  // Filter by submission status
  challengeId?: string, // Filter by challenge ID
  sortBy?: 'submittedAt' | 'createdAt' | 'updatedAt',  // Field to sort by
  sortOrder?: 'asc' | 'desc'                           // Sort direction
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

### Get Specific Submission
Retrieves a single submission by ID. Users can only access their own submissions, while admins can access any submission.

```javascript
GET /api/submissions/:id

// Parameters:
// :id - The unique identifier of the submission

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

### Create Submission
Creates a new submission for a challenge.

```javascript
POST /api/submissions

// Request Body
{
  challengeId: string,  // ID of the challenge being submitted for
  content: string      // Submission content/response
}

// Response (201 Created)
{
  id: string,
  userId: string,
  challengeId: string,
  content: string,
  status: 'PENDING',
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

### Update Submission (Admin)
Updates an existing submission's status and feedback. Only accessible by admin users.

```javascript
PATCH /api/submissions/:id

// Parameters:
// :id - The unique identifier of the submission

// Request Body (all fields optional)
{
  status?: 'PENDING' | 'APPROVED' | 'REJECTED',  // New submission status
  feedback?: string                              // Feedback for the submission
}

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

### Delete Submission
Deletes an existing submission. Users can only delete their own submissions, while admins can delete any submission.

```javascript
DELETE /api/submissions/:id

// Parameters:
// :id - The unique identifier of the submission to delete

// Response (200 OK)
{
  message: "Submission deleted successfully"
}
```

## Data Validation

### Submission Creation Schema
All fields are required.

- `challengeId`: String, minimum 1 character
- `content`: String, minimum 1 character

### Submission Update Schema (Admin)
All fields are optional.

- `status`: One of: 'PENDING', 'APPROVED', 'REJECTED'
- `feedback`: String

### Submission Query Schema
All fields are optional.

- `page`: String convertible to number
- `limit`: String convertible to number
- `status`: One of: 'PENDING', 'APPROVED', 'REJECTED'
- `challengeId`: String
- `sortBy`: One of: 'submittedAt', 'createdAt', 'updatedAt'
- `sortOrder`: One of: 'asc', 'desc'

## Business Rules

1. Users can only submit once per challenge
2. Users cannot submit after a challenge's deadline
3. Users can only view their own submissions (unless they are an admin)
4. Only admins can update submission status and provide feedback
5. Users can delete their own submissions
6. Admins can view, update, and delete any submission

## Error Responses

- `400 Bad Request`: Invalid input data, missing submission ID, or business rule violation (e.g., duplicate submission)
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions or attempting to access another user's submission
- `404 Not Found`: Submission or referenced challenge not found
- `500 Internal Server Error`: Server error 