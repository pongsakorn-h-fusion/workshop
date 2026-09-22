# สรุปโปรเจกต์: User Profile Web Application

## ภาพรวม
เว็บแอปพลิเคชันสำหรับจัดการ User Profile (ดู/เพิ่ม/แก้ไข/ลบข้อมูลโปรไฟล์ผู้ใช้)
- **Frontend:** React 19 + Vite
- **Backend:** ASP.NET Core Web API บน .NET 10

## โครงสร้างโปรเจกต์
```
backend/    ASP.NET Core Web API (.NET 10)
frontend/   React + Vite SPA
```

## Backend (`backend/`)
| ไฟล์ | หน้าที่ |
| --- | --- |
| `Models/UserProfile.cs` | โมเดลข้อมูลโปรไฟล์ผู้ใช้ |
| `Dtos/UserProfileDtos.cs` | DTO สำหรับรับ-ส่งข้อมูล พร้อม validation attributes |
| `Repositories/UserProfileRepository.cs` | ที่เก็บข้อมูลแบบ in-memory (`ConcurrentDictionary`) พร้อมข้อมูลตัวอย่าง 1 รายการ |
| `Controllers/UserProfilesController.cs` | REST API endpoints |
| `Program.cs` | ตั้งค่า DI, CORS, Controllers |

### API Endpoints (`/api/user-profiles`)
| Method | Route | คำอธิบาย |
| --- | --- | --- |
| GET | `/api/user-profiles` | ดึงรายการโปรไฟล์ทั้งหมด |
| GET | `/api/user-profiles/{id}` | ดึงโปรไฟล์ตาม id |
| POST | `/api/user-profiles` | สร้างโปรไฟล์ใหม่ |
| PUT | `/api/user-profiles/{id}` | แก้ไขโปรไฟล์ |
| DELETE | `/api/user-profiles/{id}` | ลบโปรไฟล์ |

- ข้อมูลเก็บใน memory เท่านั้น จะรีเซ็ตทุกครั้งที่รีสตาร์ท API
- ตั้งค่า CORS ให้อนุญาต origin `http://localhost:5173` และ `http://localhost:3000`
- รันด้วยคำสั่ง: `cd backend && dotnet run` (ค่าเริ่มต้น `http://localhost:5019`)

## Frontend (`frontend/`)
| ไฟล์ | หน้าที่ |
| --- | --- |
| `src/api/userProfileApi.js` | ฟังก์ชันเรียก REST API ด้วย `fetch` |
| `src/components/ProfileList.jsx` | แสดงรายการโปรไฟล์ทางซ้าย พร้อมปุ่มสร้างใหม่ |
| `src/components/ProfileView.jsx` | แสดงรายละเอียดโปรไฟล์ที่เลือก พร้อมปุ่ม Edit/Delete |
| `src/components/ProfileForm.jsx` | ฟอร์มสร้าง/แก้ไขโปรไฟล์ |
| `src/App.jsx` | จัดการ state หลัก (list, selected, mode: view/edit/create) และเชื่อมต่อ API |
| `.env` | กำหนด `VITE_API_BASE_URL` (ค่าเริ่มต้น `http://localhost:5019`) |

- รันด้วยคำสั่ง: `cd frontend && npm install && npm run dev` (ค่าเริ่มต้น `http://localhost:5173`)

## การตรวจสอบ (Verification)
- `dotnet build` ที่ backend: สำเร็จ ไม่มี error/warning
- `npm run build` ที่ frontend: สำเร็จ
- ทดสอบ end-to-end: รันทั้งสองฝั่งพร้อมกัน และยืนยันว่า CORS ทำงานถูกต้อง (curl พร้อม header `Origin: http://localhost:5173` ได้รับ response พร้อม `Access-Control-Allow-Origin`)

## วิธีรันโปรเจกต์
```bash
# Terminal 1: Backend
cd backend
dotnet run

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```
จากนั้นเปิดเบราว์เซอร์ที่ `http://localhost:5173`
