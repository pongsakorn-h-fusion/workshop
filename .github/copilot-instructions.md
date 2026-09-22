# Project Guidelines

โปรเจกต์ User Profile Web App — **Frontend:** React 19 + Vite, **Backend:** ASP.NET Core Web API (.NET 10). รายละเอียดภาพรวมดู [PROJECT_SUMMARY.md](../PROJECT_SUMMARY.md)

ทุกฟีเจอร์ใหม่หรือการ refactor **ต้องยึดสถาปัตยกรรม 2 แบบนี้**:
- **Frontend → Atomic Design**
- **Backend → Vertical Slice Architecture**

## Frontend: Atomic Design

จัดกลุ่มคอมโพเนนต์ใน `frontend/src/components/` ตามลำดับชั้น (สร้างโฟลเดอร์ย่อยเมื่อเริ่มมีคอมโพเนนต์ระดับนั้น):

| ระดับ | โฟลเดอร์ | ตัวอย่าง | ลักษณะ |
|---|---|---|---|
| Atoms | `components/atoms/` | Button, Input, Avatar, Icon, Badge | UI ดิบสุด ไม่มี state/business logic |
| Molecules | `components/molecules/` | `ProfileTabs`, `IntroductionPanel`, form field + label | รวม atoms 2-3 ตัว ทำหน้าที่เดียว |
| Organisms | `components/organisms/` | `ProfileHero`, `ProfileForm`, `ProfileList`, `AppSidebar`, `TopBar` | ส่วนประกอบ UI ที่สมบูรณ์ในตัว ผูกกับ data/props เฉพาะโดเมน |
| Templates | `components/templates/` | layout ของหน้า (sidebar + content area) ไม่ผูก data จริง | โครงหน้าที่ยังไม่มีข้อมูลจริง |
| Pages | `components/pages/` หรือ `App.jsx` | `ProfileView` (เมื่อทำหน้าที่เป็นหน้าเต็ม), การประกอบ state จริงจาก API | ผูก template เข้ากับข้อมูลจริงและ state management |

กติกา:
- คอมโพเนนต์ที่มีอยู่แล้ว (`ProfileHero`, `ProfileTabs`, `IntroductionPanel`, `ProfileForm`, `ProfileList`, `AppSidebar`, `TopBar`, `ProfileView`) ให้ค่อย ๆ ย้ายเข้าโฟลเดอร์ตามระดับที่เหมาะสมเมื่อมีการแก้ไขไฟล์นั้น (ไม่ต้อง refactor ทั้งหมดในครั้งเดียวถ้าไม่ได้ถูกร้องขอ)
- atom/molecule ห้ามเรียก API ตรง — ดึงข้อมูลเฉพาะที่ระดับ page/organism แล้วส่งลงมาทาง props
- ใช้ `lucide-react` สำหรับไอคอนทั้งหมด (ตามที่ใช้อยู่เดิม)
- คอมโพเนนต์ใหม่แต่ละตัวอยู่ไฟล์ของตัวเอง ตั้งชื่อไฟล์ตรงกับชื่อ component (PascalCase `.jsx`)

## Backend: Vertical Slice Architecture

โครงสร้างปัจจุบันเป็นแบบ layer ตามชนิดไฟล์ (`Controllers/`, `Dtos/`, `Models/`, `Repositories/`) — **สำหรับฟีเจอร์ใหม่ ให้จัดกลุ่มตาม feature/use-case แทนการแยกตามชนิดไฟล์**:

```
backend/Features/
  UserProfiles/
    GetUserProfiles/       (query + endpoint)
    GetUserProfileById/
    CreateUserProfile/      (command + validation + endpoint)
    UpdateUserProfile/
    DeleteUserProfile/
```

แต่ละ slice ควรรวมทุกอย่างที่เกี่ยวข้องกับ use-case นั้นไว้ในโฟลเดอร์เดียว (request/response DTO, endpoint handler, validation) แทนที่จะกระจายไปตาม `Controllers/` `Dtos/` แยกกัน — ลด coupling ข้าม feature และแก้ไข/อ่านฟีเจอร์หนึ่งได้โดยไม่ต้องกระโดดข้ามหลายโฟลเดอร์

กติกา:
- `Models/UserProfile.cs` (entity หลัก) และ `Repositories/UserProfileRepository.cs` (in-memory `ConcurrentDictionary`) เป็น shared core — ใช้ร่วมกันได้ทุก slice ไม่ต้อง duplicate
- ฟีเจอร์ใหม่: สร้างโฟลเดอร์ `Features/<FeatureArea>/<UseCase>/` แทนการเพิ่ม method ใหม่ใน `UserProfilesController.cs` เดิม เว้นแต่เป็นการแก้ไขเล็กน้อยของ endpoint ที่มีอยู่
- คงรูปแบบ minimal API หรือ controller endpoint ต่อ 1 use-case ต่อ 1 ไฟล์ ไม่รวม logic หลาย use-case ไว้ใน method เดียว

## Build and Test

```bash
# Backend (http://localhost:5019)
cd backend && dotnet run

# Frontend (http://localhost:5173)
cd frontend && npm install && npm run dev
```

- Backend build check: `cd backend && dotnet build`
- Frontend build check: `cd frontend && npm run build`
- ข้อมูล backend เก็บใน memory เท่านั้น รีเซ็ตทุกครั้งที่รีสตาร์ท API

## Conventions

- CORS อนุญาตเฉพาะ `http://localhost:5173` และ `http://localhost:3000` (`Program.cs`)
- Frontend เรียก API ผ่าน `src/api/userProfileApi.js` เท่านั้น ห้ามเรียก `fetch` ตรงจากคอมโพเนนต์
