# API Spec — User Profile API

Base URL: `http://localhost:5019/api/user-profiles`

CORS: อนุญาตเฉพาะ origin `http://localhost:5173` และ `http://localhost:3000`

ข้อมูลเก็บใน memory (`ConcurrentDictionary`) เท่านั้น รีเซ็ตทุกครั้งที่รีสตาร์ท API

## Data Model

### UserProfileDto (response)

| Field | Type | Description |
|---|---|---|
| `id` | `guid` | รหัสโปรไฟล์ (สร้างอัตโนมัติ) |
| `firstName` | `string` | ชื่อจริง |
| `lastName` | `string` | นามสกุล |
| `email` | `string` | อีเมล |
| `phoneNumber` | `string` | เบอร์โทรศัพท์ |
| `bio` | `string` | คำอธิบายตัวตน |
| `avatarUrl` | `string` | URL รูปโปรไฟล์ |
| `createdAt` | `datetime` (UTC, ISO 8601) | วันเวลาที่สร้าง |
| `updatedAt` | `datetime` (UTC, ISO 8601) | วันเวลาที่แก้ไขล่าสุด |

### UpsertUserProfileRequest (request body — Create / Update)

| Field | Type | Validation |
|---|---|---|
| `firstName` | `string` | required, max length 50 |
| `lastName` | `string` | required, max length 50 |
| `email` | `string` | required, ต้องเป็นรูปแบบอีเมลที่ถูกต้อง |
| `phoneNumber` | `string` | optional, max length 20 |
| `bio` | `string` | optional, max length 500 |
| `avatarUrl` | `string` | optional, max length 300 |

## Endpoints

### GET /api/user-profiles

ดึงรายการโปรไฟล์ทั้งหมด

**Response** `200 OK`
```json
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "firstName": "Somchai",
    "lastName": "Jaidee",
    "email": "somchai.j@example.com",
    "phoneNumber": "081-234-5678",
    "bio": "Full-stack developer.",
    "avatarUrl": "/images/avatar1.png",
    "createdAt": "2026-09-01T08:00:00Z",
    "updatedAt": "2026-09-10T10:30:00Z"
  }
]
```

### GET /api/user-profiles/{id}

ดึงโปรไฟล์ตาม `id`

**Path params:** `id` (`guid`, required)

**Response**
- `200 OK` — คืนค่า `UserProfileDto`
- `404 Not Found` — ไม่พบโปรไฟล์ที่มี `id` นี้

### POST /api/user-profiles

สร้างโปรไฟล์ใหม่

**Request body:** `UpsertUserProfileRequest`
```json
{
  "firstName": "Somchai",
  "lastName": "Jaidee",
  "email": "somchai.j@example.com",
  "phoneNumber": "081-234-5678",
  "bio": "Full-stack developer.",
  "avatarUrl": "/images/avatar1.png"
}
```

**Response**
- `201 Created` — คืนค่า `UserProfileDto` ที่สร้างแล้ว พร้อม header `Location: /api/user-profiles/{id}`
- `400 Bad Request` — ข้อมูลไม่ผ่าน validation

### PUT /api/user-profiles/{id}

แก้ไขโปรไฟล์ที่มีอยู่ (แทนที่ทั้งหมดด้วยค่าใหม่)

**Path params:** `id` (`guid`, required)

**Request body:** `UpsertUserProfileRequest` (เหมือน POST)

**Response**
- `200 OK` — คืนค่า `UserProfileDto` หลังแก้ไข
- `400 Bad Request` — ข้อมูลไม่ผ่าน validation
- `404 Not Found` — ไม่พบโปรไฟล์ที่มี `id` นี้

### DELETE /api/user-profiles/{id}

ลบโปรไฟล์

**Path params:** `id` (`guid`, required)

**Response**
- `204 No Content` — ลบสำเร็จ
- `404 Not Found` — ไม่พบโปรไฟล์ที่มี `id` นี้

## Error Response Format

Validation errors ใช้รูปแบบมาตรฐานของ ASP.NET Core (`ProblemDetails`):

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "Email": ["The Email field is not a valid e-mail address."]
  }
}
```
