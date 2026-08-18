# ALL ACCOUNT (บริษัท ออล แอคเคาท์ คอนซัลติ้ง จำกัด) - Website Project

เว็บไซต์สำนักงานบัญชีและที่ปรึกษาธุรกิจครบวงจร **ALL ACCOUNT** 
(อ้างอิงข้อมูลและแบรนด์จากเพจ [facebook.com/allaac.th](https://www.facebook.com/allaac.th))

---

## 🌟 จุดเด่นและฟังก์ชันการใช้งานของเว็บไซต์

1. **Modern Premium Design & Branding**:
   - โทนสี Deep Navy Blue (#0a2540), Royal Blue (#2563eb) ผสมผสาน Emerald Green (#10b981) และสีทอง สะท้อนความน่าเชื่อถือ มั่งคั่ง และถูกต้องตามมาตรฐานวิชาชีพบัญชี
   - ระบบ **Dark Mode / Light Mode Switch** จดจำค่าผ่าน LocalStorage
   - Responsive Design 100% สวยงามทั้งบน Mobile, Tablet และ Desktop

2. **ระบบคำนวณราคาค่าบริการบัญชีออนไลน์ (Interactive Price & Package Calculator)**:
   - เลือกลักษณะธุรกิจ (บุคคลธรรมดา / ฟรีแลนซ์, ห้างหุ้นส่วนจำกัด, บริษัทจำกัด)
   - สไลด์ปรับจำนวนเอกสาร/เดือน เพื่อดูราคาประเมินทันที
   - เลือกบริการเสริม (เช่น ยื่น VAT ภ.พ.30, ประกันสังคม, วางระบบ Cloud PEAK/FlowAccount, วางแผนภาษี)
   - ปุ่มกด **"ขอใบเสนอราคาผ่าน LINE"** นำข้อมูลการคำนวณทั้งหมดส่งเข้าห้องแชทอัตโนมัติในคลิกเดียว

3. **บริการครบวงจร 6 มิติ**:
   - รับทำบัญชีและยื่นภาษีรายเดือน (ภ.ง.ด.1, 3, 53, ภ.พ.30, สปส.)
   - ปิดงบการเงินและตรวจสอบบัญชีโดยผู้สอบบัญชีรับอนุญาต (CPA/TA)
   - จดทะเบียนธุรกิจและนิติบุคคล (จดจัดตั้งบริษัท, หจก., จด VAT)
   - วางแผนภาษีและที่ปรึกษาธุรกิจ (Tax Planning & Advisory)
   - วางระบบ Cloud Accounting (PEAK Certified Partner, FlowAccount, Express)
   - บริการขอใบอนุญาตและงานทะเบียนราชการ

4. **ปฏิทินภาษีสรรพากรประจำเดือน (Tax Calendar Widget)**:
   - สรุปกำหนดการยื่นภาษีทุกประเภทในแต่ละเดือน (สิงหาคม - ตุลาคม 2569) เพื่อให้ผู้ประกอบการไม่พลาดกำหนดเวลา

5. **แพ็กเกจราคาโปร่งใส (Transparent Pricing & Comparison)**:
   - Starter Package (1,800 บาท/เดือน)
   - Growth SME Package (3,500 บาท/เดือน)
   - Enterprise Pro Package (6,500+ บาท/เดือน)

6. **ระบบนัดหมายขอรับคำปรึกษาฟรี & Quick Contact**:
   - ฟอร์มขอนัดหมายและประเมินงาน
   - Floating Contact Bar ด้านล่างขวา (LINE Official, Facebook Messenger, โทรด่วน, ปุ่ม Scroll To Top)
   - ลิงก์ตรงไปยังเพจ [facebook.com/allaac.th](https://www.facebook.com/allaac.th)

---

## 📁 โครงสร้างโปรเจกต์

```
/Users/3designs/acc all acount/
├── index.html              # ไฟล์ HTML หลักของเว็บไซต์
├── css/
│   └── style.css           # สไตล์ชีต CSS ดีไซน์ระบบ Glassmorphism + Responsive
├── js/
│   ├── app.js              # ตรรกะระบบ Interactive (Calculator, Modals, FAQs, Forms, Theme)
│   └── tax-calendar.js     # ข้อมูลและปฏิทินภาษี
└── README.md               # เอกสารแนะนำโปรเจกต์
```

---

## 🚀 วิธีการเปิดใช้งานในเครื่อง (Local Run)

สามารถเปิดไฟล์ `index.html` ผ่านเว็บเบราว์เซอร์ได้ทันที หรือรัน Local Web Server ด้วยคำสั่ง:

```bash
# ใช้ Python Simple HTTP Server
python3 -m http.server 3000

# หรือใช้ npx serve
npx -y serve .
```

จากนั้นเปิดเบราว์เซอร์ไปที่ `http://localhost:3000`
