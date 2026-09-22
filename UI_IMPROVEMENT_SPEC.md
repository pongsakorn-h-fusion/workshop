# แผนปรับปรุงหน้าจอ User Profile

## เป้าหมาย

ปรับ Frontend ให้มีโครงสร้างและบรรยากาศใกล้เคียงภาพอ้างอิง โดยยังคงความสามารถเดิมของระบบ ได้แก่ ดูรายการโปรไฟล์, เลือกโปรไฟล์, เพิ่ม, แก้ไข และลบข้อมูล

แนวทางภาพรวมเป็น dashboard สีสว่าง ใช้สีม่วงเป็น accent มี sidebar, top navigation, profile cover, ข้อมูลสรุป และพื้นที่รายละเอียดแบบสองคอลัมน์ ทั้งนี้ไม่จำเป็นต้องคัดลอกแบรนด์หรือข้อความจากภาพอ้างอิงโดยตรง

## ขอบเขตการปรับปรุง

### 1. Application Shell

- ใช้พื้นหลังหน้าเว็บโทนฟ้าอ่อนหรือ lavender อ่อน
- วางตัวแอปไว้กึ่งกลางจอ ความกว้างสูงสุดประมาณ `1440px`
- ตัวแอปใช้พื้นหลังขาว ขอบมน `8px` และเงาบาง
- แบ่ง layout หลักเป็น 3 ส่วน
  - Icon rail ด้านซ้าย กว้างประมาณ `64px`
  - Navigation sidebar กว้างประมาณ `220px`
  - Main content ที่ขยายเต็มพื้นที่ที่เหลือ
- ความสูงบน desktop ควรเกือบเต็ม viewport และให้เฉพาะ main content เลื่อนได้เมื่อเนื้อหายาว

### 2. Icon Rail และ Sidebar

- Icon rail แสดงปุ่ม menu และหมวดหลักด้วย icon
- ปุ่มที่ active ใช้พื้นหลังม่วงและ icon สีขาว
- Sidebar แสดงชื่อแอปด้านบน เช่น `ProfileHub`
- แบ่ง navigation เป็นหมวด `Applications` และ `Pages`
- เมนู `User Profile` เป็นสถานะ active
- นำรายการ profile ที่มีอยู่ใน `ProfileList` มาแสดงในส่วน `Profiles` ของ sidebar หรือแสดงผ่าน dropdown/profile switcher
- ปุ่มเพิ่มโปรไฟล์ใช้ icon `Plus` พร้อม tooltip `Create profile`
- ใช้ `lucide-react` สำหรับ icon และไม่ใช้ emoji หรือ SVG ที่เขียนเอง

### 3. Top Bar และ Breadcrumb

- Top bar มีปุ่มค้นหา, toggle theme, notification และ avatar ของผู้ใช้
- ส่วนหัว content แสดงชื่อหน้า `User Profile`
- Breadcrumb อยู่ด้านขวาในรูปแบบ `Home / User Profile`
- บนหน้าจอเล็กให้ซ่อน action ที่ไม่สำคัญและย้าย sidebar ไปอยู่ใน drawer

### 4. Profile Hero

- แสดง cover image อัตราส่วนคงที่ ความสูงประมาณ `220-280px`
- มี overlay บางเพื่อให้ profile section อ่านง่าย
- Avatar วางซ้อนบริเวณขอบล่างของ cover และมีขอบสีขาว
- แสดงชื่อเต็มและข้อมูลรองจากข้อมูลจริงของ API
- แสดงสถิติ 3 รายการ เช่น `Posts`, `Followers`, `Following`
- สถิติเป็นข้อมูลสำหรับการนำเสนอเท่านั้นจนกว่า backend จะรองรับ ห้ามนำไปรวมกับ payload ของ User Profile
- action หลักคือ `Edit profile`; action รองคือ `Delete`
- การลบต้องคง confirmation เดิมไว้
- ใต้ hero มี tabs ได้แก่ `Profile`, `Activity`, `Connections`, `Gallery`
- ในระยะแรกเปิดใช้งานเฉพาะ `Profile`; tab อื่นแสดง disabled state หรือ empty state ที่ชัดเจน

### 5. Profile Content

บน desktop แบ่งเนื้อหาเป็นสองคอลัมน์:

#### Introduction Panel

- ความกว้างประมาณ `32%`
- แสดง Bio, Email, Phone และ Last updated จากข้อมูลจริง
- ใช้ icon นำหน้าข้อมูลแต่ละรายการ
- ค่าไม่มีข้อมูลให้แสดง `Not provided`

#### Activity / Details Panel

- ความกว้างประมาณ `68%`
- ระยะแรกใช้เป็น profile details และ recent update card โดยอิงข้อมูลที่ API มีจริง
- ไม่แสดง post หรือ social activity ปลอมเป็นข้อมูลจริง
- สามารถแสดง empty state เพื่อรองรับ activity feed ในอนาคต

### 6. Create และ Edit Form

- เมื่อกดสร้างหรือแก้ไข ให้เปิด form ใน main content หรือ modal/drawer ที่ไม่ทำให้ layout กระโดด
- คง field เดิมทั้งหมด ได้แก่ First name, Last name, Email, Phone number, Avatar URL และ Bio
- จัด field เป็นสองคอลัมน์บน desktop และหนึ่งคอลัมน์บน mobile
- แสดง validation ใต้ field ที่เกี่ยวข้อง
- ปุ่ม `Save changes` เป็น primary และ `Cancel` เป็น secondary
- ระหว่างบันทึกให้ disable ปุ่มและแสดงสถานะกำลังทำงาน
- เมื่อบันทึกสำเร็จ ให้กลับสู่ profile view และคง profile ที่เพิ่งแก้ไข/สร้างเป็นรายการที่เลือก

## Design Tokens

กำหนด CSS custom properties ใน `frontend/src/index.css` และนำไปใช้ทั้งแอป:

```css
:root {
  --color-page: #dff7f6;
  --color-surface: #ffffff;
  --color-surface-soft: #f7f9fc;
  --color-primary: #635bff;
  --color-primary-soft: #eeecff;
  --color-text: #202534;
  --color-text-muted: #7b8190;
  --color-border: #e7eaf0;
  --color-danger: #d64545;
  --shadow-shell: 0 24px 60px rgba(54, 63, 96, 0.14);
  --shadow-card: 0 6px 20px rgba(54, 63, 96, 0.08);
  --radius-shell: 8px;
  --radius-card: 8px;
}
```

- ใช้ฟอนต์ที่อ่านง่ายและมีบุคลิก เช่น `Manrope` หรือ `DM Sans`
- ห้ามลด contrast ของข้อความสำคัญต่ำกว่า WCAG AA
- transition ใช้เฉพาะ hover, drawer และ tab indicator ระยะ `150-220ms`
- หลีกเลี่ยง gradient และ decoration ที่ไม่เกี่ยวกับข้อมูล

## Responsive Behavior

### Desktop: `>= 1200px`

- แสดง icon rail, sidebar และ main content พร้อมกัน
- Profile content เป็นสองคอลัมน์
- Hero แสดงข้อมูลและ actions ในแถวเดียวเมื่อพื้นที่เพียงพอ

### Tablet: `768px - 1199px`

- ซ่อน navigation sidebar และเปิดผ่าน menu button
- คง icon rail หรือยุบเป็น top navigation
- Profile content เป็นสองคอลัมน์เมื่อกว้างพอ มิฉะนั้นเรียงลงมา

### Mobile: `< 768px`

- ใช้ layout หนึ่งคอลัมน์เต็มความกว้าง
- Sidebar เป็น drawer
- ลดความสูง cover และจัด avatar/name/actions เป็นแนวตั้ง
- Tabs เลื่อนแนวนอนได้โดยไม่ดัน viewport
- ปุ่ม action ต้องมี touch target อย่างน้อย `44px`
- Form ทุก field เป็นหนึ่งคอลัมน์และไม่มี horizontal scroll

## Component Mapping

| ไฟล์ | การปรับปรุง |
| --- | --- |
| `frontend/src/App.jsx` | เปลี่ยนเป็น dashboard shell, จัด navigation state และคง CRUD state เดิม |
| `frontend/src/App.css` | สร้าง layout, hero, tabs, responsive breakpoints และ component states |
| `frontend/src/index.css` | เพิ่ม design tokens, typography และ global reset |
| `frontend/src/components/ProfileList.jsx` | ปรับเป็น profile switcher/sidebar list และรองรับ drawer |
| `frontend/src/components/ProfileView.jsx` | แยก hero, stats, tabs และ introduction/details panels |
| `frontend/src/components/ProfileForm.jsx` | ปรับ layout form, validation state และ loading state |

Component ใหม่ที่แนะนำเมื่อเริ่ม implementation:

- `AppSidebar.jsx`
- `TopBar.jsx`
- `ProfileHero.jsx`
- `ProfileTabs.jsx`
- `IntroductionPanel.jsx`

ไม่ควรแยก component เพิ่มหากมีเพียง markup สั้น ๆ และไม่มี state หรือพฤติกรรมที่นำกลับมาใช้ซ้ำ

## Assets และข้อมูล

- ใช้ cover image ที่อนุญาตให้นำมาใช้ได้ เก็บใน `frontend/public/images/`
- ถ้า `avatarUrl` โหลดไม่ได้ ให้ fallback เป็น initials เช่นเดียวกับพฤติกรรมปัจจุบัน
- กำหนด `alt` ที่สื่อความหมายสำหรับรูป profile; cover ที่เป็นภาพตกแต่งใช้ `alt=""`
- ห้าม hardcode ข้อมูลชื่อ, email, phone หรือ bio จากภาพอ้างอิง
- ค่า stats และ social links ต้องระบุในโค้ดว่าเป็น presentation data หรือซ่อนไว้จนมี API รองรับ

## States ที่ต้องรองรับ

- Loading: skeleton สำหรับ sidebar และ profile content
- Error: alert ที่อ่านได้และไม่ทำให้ layout เปลี่ยนขนาดมากเกินไป
- Empty profiles: แสดงข้อความและปุ่ม `Create profile`
- Empty optional fields: แสดง `Not provided`
- Broken avatar: fallback เป็น initials
- Saving: disable form actions และแสดง progress
- Delete confirmation: ต้องให้ผู้ใช้ยืนยันก่อนลบ

## Parallel Work Plan

ใช้ checklist ส่วนนี้เพื่อแบ่งงานให้หลายคนหรือหลาย agent ทำพร้อมกัน โดยแต่ละ workstream ต้องแก้เฉพาะไฟล์ที่ระบุเพื่อลด merge conflict

### กติกาการทำงานร่วมกัน

- กำหนด owner ให้แต่ละ workstream ก่อนเริ่มงาน
- หนึ่งไฟล์มี owner หลักได้เพียงหนึ่ง workstream ในแต่ละ wave
- ห้ามเปลี่ยน API contract หรือ CRUD state shape โดยไม่แจ้ง owner ของ Integration
- ทุก workstream ต้องรัน validation ที่ระบุและรายงานไฟล์ที่แก้
- งานที่มี `Depends on` ต้องรอ dependency ให้เสร็จก่อนเริ่ม
- รวมงานตามลำดับ Wave 0, Wave 1, Wave 2 และ Wave 3

### Wave 0: Shared Foundation

งานช่วงนี้ต้องเสร็จก่อนเริ่มงานคู่ขนาน

- [ ] **P0.1 - Install UI dependency**
  - Owner: Foundation
  - Files: `frontend/package.json`, lockfile
  - Task: เพิ่ม `lucide-react`
  - Validation: `npm install` สำเร็จและ import icon ได้
- [ ] **P0.2 - Define design tokens and global styles**
  - Owner: Foundation
  - Files: `frontend/src/index.css`
  - Task: เพิ่ม color, typography, spacing, shadow และ focus tokens ตามสเปก
  - Validation: `npm run build`
- [ ] **P0.3 - Prepare approved visual assets**
  - Owner: Foundation
  - Files: `frontend/public/images/`
  - Task: เพิ่ม cover image พร้อมตรวจ license และขนาดไฟล์
  - Validation: เปิด asset URL จาก Vite ได้และไม่มี 404

**Wave 0 exit criteria:** dependency, tokens และ asset พร้อมให้ทุก workstream ใช้งาน โดยไม่มีการแก้ CRUD behavior

### Wave 1: Parallel Component Work

งาน P1.1-P1.4 เริ่มพร้อมกันได้หลัง Wave 0 เสร็จ

- [ ] **P1.1 - Build navigation components**
  - Owner: Navigation
  - Depends on: P0.1, P0.2
  - Files: `frontend/src/components/AppSidebar.jsx`, `frontend/src/components/TopBar.jsx`
  - Task: สร้าง icon rail, sidebar, profile switcher, top bar และ mobile drawer controls
  - Contract: รับข้อมูลและ callbacks ผ่าน props; ห้ามเรียก API ภายใน component
  - Validation: render ได้ทั้ง empty list และ selected profile โดยไม่มี console error
- [ ] **P1.2 - Build profile presentation**
  - Owner: Profile View
  - Depends on: P0.1, P0.2, P0.3
  - Files: `frontend/src/components/ProfileView.jsx`, `frontend/src/components/ProfileHero.jsx`, `frontend/src/components/ProfileTabs.jsx`, `frontend/src/components/IntroductionPanel.jsx`
  - Task: สร้าง cover, avatar fallback, actions, tabs และรายละเอียดสองคอลัมน์
  - Contract: คง props `profile`, `onEdit`, `onDelete`; ห้ามเพิ่ม presentation stats ใน API payload
  - Validation: profile ที่ field optional ว่างและ avatar เสียยังแสดงผลได้
- [ ] **P1.3 - Improve create/edit form**
  - Owner: Profile Form
  - Depends on: P0.2
  - Files: `frontend/src/components/ProfileForm.jsx`
  - Task: ปรับ form grid, validation messages, saving state และ responsive layout
  - Contract: คง props และ payload shape เดิม
  - Validation: create/edit submit ค่าเดิมได้และปุ่มถูก disable ระหว่าง saving
- [ ] **P1.4 - Build page-level styles**
  - Owner: Layout Styling
  - Depends on: P0.2
  - Files: `frontend/src/App.css`
  - Task: สร้าง shell, content grid, hero, tabs, drawer และ breakpoints
  - Contract: ใช้ class names ที่ตกลงร่วมกับ P1.1-P1.3 ก่อนเริ่ม; ห้ามแก้ JSX
  - Validation: ไม่มี horizontal overflow ที่ `375px`, `768px`, `1024px`, `1440px`

**Wave 1 exit criteria:** component แต่ละชุด render แยกได้, ใช้ props contract เดิม และแต่ละ owner ส่งรายการ class names ที่ต้องใช้ให้ Integration

### Wave 2: Integration

งานช่วงนี้ควรมี owner คนเดียว เพราะแก้ state และประกอบ component ในไฟล์หลัก

- [ ] **P2.1 - Assemble dashboard shell**
  - Owner: Integration
  - Depends on: P1.1, P1.2, P1.3, P1.4
  - Files: `frontend/src/App.jsx`
  - Task: ประกอบ sidebar, top bar, profile view และ form โดยคง state flow เดิม
  - Validation: เลือก profile และสลับ view/create/edit ได้ถูกต้อง
- [ ] **P2.2 - Connect responsive navigation state**
  - Owner: Integration
  - Depends on: P2.1
  - Files: `frontend/src/App.jsx`
  - Task: เชื่อม menu button, drawer open/close, overlay และ Escape key
  - Validation: drawer เปิดปิดได้ด้วย pointer และ keyboard
- [ ] **P2.3 - Complete loading, error and empty states**
  - Owner: Integration
  - Depends on: P2.1
  - Files: `frontend/src/App.jsx`, component ที่เกี่ยวข้องตามความจำเป็น
  - Task: เชื่อม skeleton, API error, empty profile และ create CTA
  - Validation: จำลอง API loading, failure และ empty response แล้ว layout ยังใช้งานได้

**Wave 2 exit criteria:** application ทำงานครบทุก mode และไม่มี regression ใน CRUD flow

### Wave 3: Parallel Verification

งาน P3.1-P3.3 ทำพร้อมกันได้หลัง Integration เสร็จ จากนั้นปิดด้วย P3.4

- [ ] **P3.1 - Functional QA**
  - Owner: QA Functional
  - Depends on: P2.1, P2.2, P2.3
  - Task: ทดสอบ list, select, create, edit, cancel และ delete กับ backend จริง
  - Evidence: บันทึกผล expected/actual ของแต่ละ flow
- [ ] **P3.2 - Responsive and visual QA**
  - Owner: QA Visual
  - Depends on: P2.1, P2.2, P2.3
  - Task: ตรวจ viewport `375px`, `768px`, `1024px`, `1440px` เทียบภาพอ้างอิง
  - Evidence: screenshot แต่ละ viewport และรายการ visual mismatch
- [ ] **P3.3 - Accessibility QA**
  - Owner: QA Accessibility
  - Depends on: P2.1, P2.2, P2.3
  - Task: ตรวจ tab order, focus visibility, accessible names, heading structure และ contrast
  - Evidence: checklist ผลการตรวจและรายการ issue ที่พบ
- [ ] **P3.4 - Final regression and build**
  - Owner: Integration
  - Depends on: P3.1, P3.2, P3.3
  - Task: แก้เฉพาะ issue ที่ขัด Acceptance Criteria และรันทดสอบรอบสุดท้าย
  - Validation: `npm run build` ผ่านและ CRUD smoke test ผ่าน

### Task Tracking Template

คัดลอก block นี้ไปใช้กับแต่ละ task เมื่อลงมือทำ:

```md
#### Task ID: P1.x
- Owner:
- Status: [ ] Not started / [ ] In progress / [ ] Blocked / [ ] Done
- Branch or workspace:
- Files changed:
- Depends on:
- Validation command:
- Validation result:
- Notes or blockers:
```

### Merge Order

1. Foundation: P0.1-P0.3
2. Components: P1.1, P1.2, P1.3
3. Shared page styles: P1.4
4. Integration: P2.1-P2.3
5. QA fixes และ final validation: P3.1-P3.4

เมื่อ merge งานใน Wave 1 ให้ owner ของ Integration ตรวจ props contract และ class names ก่อนทุกครั้ง หากเกิด conflict ใน `App.css` ให้ Layout Styling เป็นผู้ resolve; หากเกิด conflict ใน `App.jsx` ให้ Integration เป็นผู้ resolve

## ลำดับการพัฒนา

1. เพิ่ม icon dependency และ assets ที่จำเป็น
2. สร้าง design tokens และ application shell
3. ปรับ sidebar/profile switcher โดยคงการเลือก profile เดิม
4. ปรับ `ProfileView` เป็น hero, tabs และ content grid
5. ปรับ create/edit form ให้เข้ากับ layout ใหม่
6. เพิ่ม loading, empty, error และ broken-image states
7. ตรวจ responsive ที่ `375px`, `768px`, `1024px` และ `1440px`
8. ตรวจ keyboard navigation, focus state และ color contrast
9. รัน `npm run build` และทดสอบ CRUD เชื่อมต่อ backend

## Acceptance Criteria

- โครงหน้า desktop มี sidebar, top bar, profile hero และ content สองคอลัมน์ใกล้เคียงภาพอ้างอิง
- ผู้ใช้ยังสามารถดู, เลือก, เพิ่ม, แก้ไข และลบ profile ได้ครบ
- ข้อมูล profile ทั้งหมดมาจาก API และไม่มีข้อมูลบุคคลจากภาพอ้างอิงถูก hardcode
- หน้าไม่เกิด horizontal scroll ที่ viewport ตั้งแต่ `375px` ขึ้นไป
- Sidebar ใช้งานได้ทั้ง desktop และ mobile drawer
- ทุกปุ่ม icon มี accessible name หรือ tooltip
- ใช้งานด้วย keyboard ได้ และเห็น focus state ชัดเจน
- มี loading, error, empty และ image fallback states
- `npm run build` ผ่านโดยไม่มี error
- ทดสอบ CRUD กับ backend แล้วข้อมูลบนหน้าจออัปเดตตรงกับ response

## สิ่งที่ยังไม่รวมในรอบนี้

- ระบบ authentication และ notification จริง
- Dark mode แบบสมบูรณ์
- Posts, followers, following, gallery และ social network API
- การอัปโหลดรูป avatar/cover แบบไฟล์
- Real-time activity feed