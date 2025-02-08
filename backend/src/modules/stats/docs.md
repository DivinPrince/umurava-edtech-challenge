# Stats Module Documentation

The Stats module provides endpoints to retrieve statistics about challenges and participants in the system. It offers both user-specific and admin-level statistics.

## Endpoints

### 1. Get User Stats
```http
GET /api/stats/user
```

Requires authentication. Returns statistics about challenges for the authenticated user.

#### Response
```json
{
    "openChallenges": number,     // Challenges with no submissions and not expired
    "ongoingChallenges": number,  // Challenges with submissions and not expired
    "completedChallenges": number // Challenges past deadline
}
```

### 2. Get Total Challenges Stats
```http
GET /api/stats/challenges/total
```

Requires admin access. Returns statistics about the total number of challenges.

#### Query Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| startDate | string | Start date for the period (YYYY-MM-DD) |
| endDate | string | End date for the period (YYYY-MM-DD) |

#### Response
```json
{
    "count": number,        // Total number of challenges in the period
    "percentage": number,   // Percentage change compared to previous period
    "direction": "up" | "down" // Trend direction
}
```

### 3. Get Participants Stats
```http
GET /api/stats/challenges/participants
```

Requires admin access. Returns statistics about challenge participants.

#### Query Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| startDate | string | Start date for the period (YYYY-MM-DD) |
| endDate | string | End date for the period (YYYY-MM-DD) |

#### Response
```json
{
    "count": number,        // Number of participants in the period
    "percentage": number,   // Percentage change compared to previous period
    "direction": "up" | "down" // Trend direction
}
```

### 4. Get Open Challenges Stats
```http
GET /api/stats/challenges/open
```

Requires admin access. Returns statistics about challenges with no submissions and not expired.

#### Query Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| startDate | string | Start date for the period (YYYY-MM-DD) |
| endDate | string | End date for the period (YYYY-MM-DD) |

#### Response
```json
{
    "count": number,        // Number of open challenges in the period
    "percentage": number,   // Percentage change compared to previous period
    "direction": "up" | "down" // Trend direction
}
```

### 5. Get Ongoing Challenges Stats
```http
GET /api/stats/challenges/ongoing
```

Requires admin access. Returns statistics about challenges with submissions and not expired.

#### Query Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| startDate | string | Start date for the period (YYYY-MM-DD) |
| endDate | string | End date for the period (YYYY-MM-DD) |

#### Response
```json
{
    "count": number,        // Number of ongoing challenges in the period
    "percentage": number,   // Percentage change compared to previous period
    "direction": "up" | "down" // Trend direction
}
```

### 6. Get Completed Challenges Stats
```http
GET /api/stats/challenges/completed
```

Requires admin access. Returns statistics about challenges past their deadline.

#### Query Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| startDate | string | Start date for the period (YYYY-MM-DD) |
| endDate | string | End date for the period (YYYY-MM-DD) |

#### Response
```json
{
    "count": number,        // Number of completed challenges in the period
    "percentage": number,   // Percentage change compared to previous period
    "direction": "up" | "down" // Trend direction
}
```

## Trend Calculation

Each admin stat includes trend information comparing the current period with the previous period:
- The trend calculation compares the current period with a previous period of the same length
- For example, if querying Jan 1-31, it will compare with Dec 1-31
- The trend includes:
  - `count`: The current value for the specified period
  - `percentage`: The percentage change compared to the previous period (rounded to nearest integer)
  - `direction`: "up" if the trend is positive or zero, "down" if negative

## Authentication

- User stats endpoint requires user authentication (`requireAuth` middleware)
- All admin stats endpoints require admin authentication (`requireAdmin` middleware)

## Data Validation

- All date parameters are validated using Zod schema
- Dates must be provided in YYYY-MM-DD format
- Both startDate and endDate are required for admin stats endpoints

## Error Handling

- 401 Unauthorized: Missing authentication token
- 403 Forbidden: Non-admin user accessing admin endpoints
- 400 Bad Request: Invalid date format or missing required parameters
- 500 Internal Server Error: Server-side errors 