# Notification System Design

## Overview
This project implements a logging middleware for backend applications.

## Components
- Express Backend Server
- Logging Middleware
- External Logging API

## Flow
1. Client sends request
2. Middleware logs request
3. Route processes request
4. Response returned

## Logging Strategy
- Logs include stack, level, package, and message
- Uses external API for persistence

## Technologies
- Node.js
- Express.js
- Axios

# Notification System Design

## Stage 1

### REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /notifications | Get all notifications for a user |
| GET | /notifications/:id | Get single notification |
| POST | /notifications | Create new notification |
| PATCH | /notifications/:id/read | Mark as read |
| DELETE | /notifications/:id | Delete notification |

### JSON Schema
```json
{
  "ID": "uuid",
  "Type": "Placement | Result | Event",
  "Message": "string",
  "Timestamp": "2026-04-22 17:51:30",
  "isRead": false
}
```

### Real-time Mechanism
Use WebSockets (Socket.io) to push notifications instantly to connected clients.

---

## Stage 2

### Recommended Database: PostgreSQL

Reasons:
- Structured notification data fits relational model
- Supports indexing for fast queries
- ACID compliance ensures reliability

### DB Schema
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL,
  type VARCHAR(20) CHECK (type IN ('Placement', 'Result', 'Event')),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Problems as Data Grows
- Query slowdown without indexes
- Full table scans on large datasets
- Solutions: indexing, pagination, caching, archiving old data

---

## Stage 3

### Original Slow Query
```sql
SELECT * FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt DESC;
```

### Problems
- No index on studentID or isRead → full table scan
- SELECT * fetches unnecessary columns
- Slow with 5,000,000 rows

### Fixed Query
```sql
SELECT id, type, message, created_at
FROM notifications
WHERE student_id = 1042 AND is_read = false
ORDER BY created_at DESC
LIMIT 50;
```

### Indexes to Add
```sql
CREATE INDEX idx_student_read ON notifications(student_id, is_read);
CREATE INDEX idx_created_at ON notifications(created_at DESC);
```

### Adding Index on Every Column — Bad Idea
Each index slows down INSERT/UPDATE operations. Only index columns used in WHERE/ORDER BY.

### Query for Placement Notifications in Last 7 Days
```sql
SELECT * FROM notifications
WHERE type = 'Placement'
AND created_at >= NOW() - INTERVAL '7 days';
```

---

## Stage 4

### Problem
Fetching notifications on every page load overwhelms the DB.

### Solutions

1. **Redis Cache** — Cache notifications per student for 60 seconds
   - Pro: Very fast, reduces DB load by 90%
   - Con: Slight staleness (up to 60s)

2. **Pagination** — Return 20 notifications per page
   - Pro: Reduces data transfer
   - Con: User must scroll/click for more

3. **CDN + Edge Caching** — Cache at network edge
   - Pro: Global low latency
   - Con: Not suitable for personalized data

### Recommended: Redis + Pagination together

---

## Stage 5

### Problem with Current Implementation