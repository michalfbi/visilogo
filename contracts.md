# API Contracts

## Overview
Backend provides API for the blog content. Services and other static content are currently handled on the frontend or via static config, but Blog is database-driven to allow for future CMS/AI expansion.

## Base URL
`/api`

## Data Models

### BlogPost
```json
{
  "_id": "uuid",
  "slug": "string (unique)",
  "title": "string",
  "excerpt": "string",
  "content": "string (markdown/html)",
  "category": "string",
  "date": "ISO8601 Date string",
  "readTime": "string",
  "imageUrl": "string (optional)"
}
```

## Endpoints

### 1. Blog Posts

**GET** `/api/blog`
- Returns a list of all blog posts.
- **Response**: `List[BlogPost]`

**GET** `/api/blog/{slug}`
- Returns a single blog post by slug.
- **Response**: `BlogPost`
- **Error**: 404 if not found.

**POST** `/api/blog/seed` (Internal/Dev)
- Seeds the database with initial mock articles.
- **Response**: `{"message": "Database seeded"}`

## Mocks & Integration
- **Frontend** currently uses `mock.js` for rapid prototyping.
- **Integration Plan**:
    - Frontend `Blog.jsx` will switch from importing `mockBlogPosts` to fetching from `/api/blog`.
    - Frontend `BlogPost` page (to be created) will fetch from `/api/blog/{slug}`.
