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

5. **แพ็กเกจราคาโปร่งใส (Transparent Pricing & Comparison)** (อ้างอิงเอกสารทางการ Price list):
   - Package 1 (8,500 บาท/เดือน) - มาตรฐานครบวงจร
   - Package 2 (12,500 บาท/เดือน) - ยอดนิยม SME รวมภาษีเงินเดือน ภ.ง.ด.1 & 1 ก
   - Package 3 (16,500 บาท/เดือน) - พรีเมียม รวมสต็อก Cash Flow งบไตรมาส และภาษีกรรมการ
   - ตารางเปรียบเทียบฟังก์ชัน 17 รายการ (Feature Matrix)
   - อัตราค่าบริการงานจดทะเบียนนิติบุคคล (เริ่มต้น 13,500 บ.)
   - อัตราค่าบริการตรวจสอบบัญชีรายปี CPA (เริ่มต้น 25,000 บ./ปี ตามระดับทุน/รายได้)
   - วางระบบบัญชีพร้อมคู่มือ (45,000 บ.) และวางแผนภาษี

6. **ระบบนัดหมายขอรับคำปรึกษาฟรี & Quick Contact**:
   - ฟอร์มขอนัดหมายและประเมินงาน
   - Floating Contact Bar ด้านล่างขวา (LINE Official, Facebook Messenger, โทรด่วน, ปุ่ม Scroll To Top)
   - ลิงก์ตรงไปยังเพจ [facebook.com/allaac.th](https://www.facebook.com/allaac.th)

7. **AI ผู้ช่วยบัญชีและภาษีอัจฉริยะ (Powered by Google Gemini Free Model)**:
   - วิดเจ็ต Floating Chatbot อัจฉริยะ ให้คำปรึกษาตอบคำถามภาษี บัญชี จดทะเบียนบริษัท และราคาค่าบริการตลอด 24 ชม.
   - เชื่อมต่อกับ **Google Gemini API Free Model** (`gemini-2.5-flash`)
   - ระบบ **Smart Fallback Knowledge-Engine**: ตอบคำถามจากฐานข้อมูล ALL ACCOUNT ได้ทันทีแม้ไม่ได้ใส่ API Key
   - ปุ่มลัด Quick Suggestions (ถามราคา, ขั้นตอนเปิดบริษัท, กำหนดยื่นภาษี, ระบบ PEAK, ติดต่อเจ้าหน้าที่)
   - ปรับแต่งหรือใส่ Gemini API Key ได้ผ่านปุ่มไอคอนรูปฟันเฟือง ⚙️ บนหัวหน้าต่างแชต

---

## 📁 โครงสร้างโปรเจกต์

```
/Users/3designs/acc all acount/
├── index.html              # ไฟล์ HTML หลักของเว็บไซต์
├── css/
│   └── style.css           # สไตล์ชีต CSS ดีไซน์ระบบ Glassmorphism + Responsive + AI Chatbot
├── js/
│   ├── app.js              # ตรรกะระบบ Interactive (Calculator, Modals, Forms, Theme)
│   ├── chatbot.js          # ระบบ AI Chatbot (Gemini API + Smart Knowledge Fallback)
│   └── tax-calendar.js     # ข้อมูลและปฏิทินภาษีสรรพากร
├── Code.gs                 # สคริปต์ Google Apps Script บันทึกลง Google Sheets
├── GOOGLE_SHEET_SETUP.md   # คู่มือการติดตั้ง Google Sheets และ Web App
└── README.md               # เอกสารแนะนำโปรเจกต์
```

---

## 🤖 การตั้งค่า Google Gemini API Key สำหรับ Chatbot (ฟรี)

1. สมัครรับ Gemini API Key ฟรีได้ที่ [Google AI Studio](https://aistudio.google.com/app/apikey)
2. เมื่อเปิดหน้าเว็บ ALL ACCOUNT ให้คลิกที่ **ไอคอนรูปหุ่นยนต์ AI ลอยมุมขวาล่าง**
3. คลิกที่ **ไอคอนรูปฟันเฟือง ⚙️** ด้านขวาบนของหน้าต่างแชต
4. นำ API Key ที่ได้มาวางแล้วกด **ตกลง (OK)** ระบบจะบันทึกคีย์ลงในเครื่องอัตโนมัติ

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

