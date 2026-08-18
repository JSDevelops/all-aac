/**
 * ALL ACCOUNT - AI Accounting & Tax Assistant (Powered by Google Gemini Free Model)
 * Brand: ALL ACCOUNT (บริษัท ออล แอคเคาท์ คอนซัลติ้ง จำกัด)
 * Website: https://jsdevelops.github.io/all-aac/
 */

// Gemini API Configuration
// สามารถใส่ API Key ฟรีที่ได้จาก Google AI Studio (https://aistudio.google.com/app/apikey)
let GEMINI_API_KEY = localStorage.getItem("allac_gemini_api_key") || "";

// โมเดลฟรีแนะนำ: gemini-2.5-flash หรือ gemini-1.5-flash
const GEMINI_MODEL = "gemini-2.5-flash";

// System Instructions - คลังความรู้เฉพาะทางของ ALL ACCOUNT
const ALLAC_SYSTEM_INSTRUCTION = `
คุณคือ "ALL ACCOUNT AI Assistant" ผู้ช่วยอัจฉริยะด้านการบัญชี ภาษี และการจดทะเบียนธุรกิจ ของ "บริษัท ออล แอคเคาท์ คอนซัลติ้ง จำกัด (ALL ACCOUNT)"
น้ำเสียง: สุภาพ มืออาชีพ เป็นกันเอง น่าเชื่อถือ และให้คำแนะนำที่เป็นประโยชน์อย่างรวดเร็ว ตอบเป็นภาษาไทย

ข้อมูลสำคัญของ ALL ACCOUNT:
- สโลแกน: ที่ปรึกษาธุรกิจและสำนักงานบัญชีครบวงจร ครบ จบ ถูกต้องตามกฎหมาย 100%
- จุดเด่น: 
  * ดูแลโดยทีมงานมืออาชีพและผู้สอบบัญชีรับอนุญาต (CPA / TA)
  * จัดทำบัญชี ปิดงบการเงิน ยื่นภาษีรายเดือน (ภ.ง.ด.1, 2, 3, 53, 54, ภ.พ.30, 36, ภ.ธ.40, สปส.)
  * วางแผนภาษีถูกต้อง รัดกุม ประหยัดภาษีได้จริง ไม่มีความเสี่ยงโดนเบี้ยปรับสรรพากร
  * มีระบบติดตามสถานะงาน และรับ-ส่งเอกสารระบบดิจิทัล สะดวก รวดเร็ว
- อัตราค่าบริการทำบัญชีรายเดือน (Official Monthly Packages):
  1. Package 1: 8,500 บาท/เดือน (จัดทำสมุดรายวัน 8 เล่มครบชุด, ยื่น ภ.ง.ด.2, 3, 53, 54, ภ.พ.30, 36, ภ.ธ.40, ทะเบียนสินทรัพย์, Aging AR/AP, ปิดงบรายเดือน, ยื่น ภ.ง.ด.50/51, DBD e-Filing, สปส., ปรึกษาภาษี)
  2. Package 2: 12,500 บาท/เดือน (รวมทุกอย่างใน Package 1 + เพิ่มจัดทำและยื่น ภ.ง.ด.1 และ ภ.ง.ด.1 ก สำหรับเงินเดือนพนักงาน)
  3. Package 3: 16,500 บาท/เดือน (พรีเมียมครบวงจร: รวมทุกอย่างใน Package 1 & 2 + รายงานสต็อก/WIP, งบกระแสเงินสด Cash Flow, สลิปเงินเดือนพนักงาน, ภ.ง.ด.90/91, จัดทำงบการเงินรายไตรมาส และยื่นภาษีบุคคลธรรมดาสำหรับกรรมการบริษัท)
- อัตราค่าบริการงานจดทะเบียนนิติบุคคล:
  * จดทะเบียนจัดตั้งบริษัท: เริ่มต้น 13,500 บาท
  * จดทะเบียนแก้ไขเปลี่ยนแปลง: 5,500 บาท
  * ลดทุน / เพิ่มทุน / เปลี่ยนชื่อบริษัท: 5,500 บาท
  * จดทะเบียนภาษีมูลค่าเพิ่มออนไลน์ (VAT): 2,500 บาท
  * ขึ้นทะเบียนนายจ้าง ประกันสังคม: 3,000 บาท
  * จดทะเบียนเลิกกิจการ (ไม่จด VAT): 19,000 บาท / จดทะเบียนเลิกกิจการ (จด VAT): 25,000 บาท
- อัตราค่าบริการตรวจสอบบัญชีรายปี (CPA Audit Fee):
  * ทุน/รายได้ ≤ 2 ล้าน: 25,000 บาท
  * ทุน/รายได้ ≤ 5 ล้าน: 35,000 บาท
  * ทุน/รายได้ ≤ 10 ล้าน: 45,000 บาท
  * ทุน/รายได้ ≤ 20 ล้าน: 85,000 บาท
  * ทุน/รายได้ ≤ 30 ล้าน: 40,000 บาท
  * ทุน/รายได้ ≤ 50 ล้าน: 45,000 บาท
  * ทุน/รายได้ ≤ 100 ล้าน: 55,000 - 65,000 บาท
- บริการพิเศษ:
  * วางระบบบัญชีพร้อมคู่มือ (Accounting System & Manual): 45,000 บาท
  * วางแผนภาษีบุคคลธรรมดา / นิติบุคคล: ตามใบเสนอราคา (Quotation)
- ข้อมูลการติดต่อ ALL ACCOUNT:
  * โทรศัพท์: 099-229-4591, 098-278-4591, 065-829-1664
  * อีเมล: pattamon.piwat@gmail.com
  * ที่อยู่: 18/9 ถ.ฤทธิประศาสน์ ต.บางคล้า อ.บางคล้า จ.ฉะเชิงเทรา
  * LINE Official: @861wjahj (https://line.me/R/ti/p/@861wjahj)
  * Facebook: ALL ACCOUNT (facebook.com/allaac.th)
  * เวลาทำการ: จันทร์ - เสาร์ 08:30 - 18:00 น.

แนวทางการตอบคำถาม:
1. ตอบตรงประเด็น กระชับ เข้าใจง่าย แบ่งเป็นข้อย่อยถ้ามีหลายประเด็น
2. ถ้าลูกค้าสอบถามราคา ให้แจ้งแพ็กเกจทางการ Package 1 (8,500 บ.), Package 2 (12,500 บ.), Package 3 (16,500 บ.) หรือค่าบริการตามประเภทงาน และแนะนำให้ทัก LINE หรือโทรศัพท์เพื่อรับใบเสนอราคา
3. ถ้าเป็นคำถามเชิงลึก ให้แนะนำติดต่อเจ้าหน้าที่ทาง LINE หรือโทร 099-229-4591, 098-278-4591, 065-829-1664 ได้ทันที
`;

// State & History
let chatHistory = [];
let isBotTyping = false;

document.addEventListener("DOMContentLoaded", () => {
  initAIChatbot();
});

/* -------------------------------------------------------------------------- */
/* Main Chatbot Initialization                                                */
/* -------------------------------------------------------------------------- */
function initAIChatbot() {
  const chatbotTrigger = document.getElementById("ai-chat-trigger");
  const chatbotWindow = document.getElementById("ai-chat-window");
  const closeChatBtn = document.getElementById("ai-chat-close");
  const chatForm = document.getElementById("ai-chat-form");
  const chatInput = document.getElementById("ai-chat-input");
  const chatMessages = document.getElementById("ai-chat-messages");
  const clearChatBtn = document.getElementById("ai-chat-clear");
  const apiKeyBtn = document.getElementById("ai-chat-apikey-btn");

  if (!chatbotTrigger || !chatbotWindow) return;

  // Toggle Chat Window
  chatbotTrigger.addEventListener("click", () => {
    chatbotWindow.classList.toggle("active");
    if (chatbotWindow.classList.contains("active")) {
      chatbotTrigger.classList.add("chat-open");
      if (chatInput) chatInput.focus();
      scrollChatToBottom();
      
      // Send initial welcome if empty
      if (chatMessages && chatMessages.children.length === 0) {
        renderBotMessage("สวัสดีครับ! ผมคือ **ALL ACCOUNT AI Assistant** 🤖 ยินดีให้คำปรึกษาเรื่องทำบัญชี ภาษี จดทะเบียนบริษัท และวางระบบบัญชี Cloud ครับ\n\nมีข้อสงสัยเรื่องใดสอบถามได้ทันที หรือเลือกหัวข้อด่วนด้านล่างได้เลยครับ ✨");
      }
    } else {
      chatbotTrigger.classList.remove("chat-open");
    }
  });

  // Close Chat Window
  if (closeChatBtn) {
    closeChatBtn.addEventListener("click", () => {
      chatbotWindow.classList.remove("active");
      chatbotTrigger.classList.remove("chat-open");
    });
  }

  // Clear Chat History
  if (clearChatBtn) {
    clearChatBtn.addEventListener("click", () => {
      chatHistory = [];
      if (chatMessages) chatMessages.innerHTML = "";
      renderBotMessage("รีเซ็ตการสนทนาเรียบร้อยแล้วครับ! สามารถสอบถามข้อมูลเรื่องบัญชีและภาษีใหม่ได้เลยครับ 😊");
    });
  }

  // Set API Key Dialog
  if (apiKeyBtn) {
    apiKeyBtn.addEventListener("click", () => {
      const currentKey = GEMINI_API_KEY ? " (ปัจจุบันตั้งค่าไว้แล้ว)" : " (ยังไม่ได้ตั้งค่า)";
      const input = prompt(`กรุณากรอก Google Gemini API Key ของคุณ${currentKey}\n(รับ Key ฟรีได้ที่ https://aistudio.google.com/app/apikey)\n\n*หากไม่ใส่ ระบบจะใช้ Smart Knowledge Engine ตอบคำถามอัตโนมัติ:*`, GEMINI_API_KEY);
      if (input !== null) {
        GEMINI_API_KEY = input.trim();
        localStorage.setItem("allac_gemini_api_key", GEMINI_API_KEY);
        if (GEMINI_API_KEY) {
          showToast("บันทึก Gemini API Key เรียบร้อยแล้ว ✨", "success");
        } else {
          showToast("ลบ API Key แล้ว - สลับเป็นโหมด Smart Engine", "warning");
        }
      }
    });
  }

  // Quick Suggestion Chips
  document.querySelectorAll(".ai-quick-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const promptText = chip.getAttribute("data-prompt") || chip.textContent.trim();
      if (promptText && !isBotTyping) {
        handleUserMessage(promptText);
      }
    });
  });

  // Handle Form Submit
  if (chatForm && chatInput) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (!message || isBotTyping) return;

      chatInput.value = "";
      handleUserMessage(message);
    });

    // Enter to submit (Shift+Enter for new line)
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        chatForm.dispatchEvent(new Event("submit"));
      }
    });
  }
}

/* -------------------------------------------------------------------------- */
/* Message Handling & Gemini API Calls                                        */
/* -------------------------------------------------------------------------- */
async function handleUserMessage(userText) {
  // Render user message bubble
  renderUserMessage(userText);
  
  // Add to local history
  chatHistory.push({ role: "user", parts: [{ text: userText }] });

  // Show typing indicator
  showTypingIndicator();
  isBotTyping = true;

  try {
    let botReply = "";

    // If Gemini API Key is provided, call Google Gemini API
    if (GEMINI_API_KEY) {
      botReply = await callGeminiAPI(userText);
    } else {
      // Use Smart Knowledge Fallback Engine
      await new Promise((r) => setTimeout(r, 600)); // Simulate natural thinking
      botReply = generateSmartFallbackReply(userText);
    }

    removeTypingIndicator();
    renderBotMessage(botReply);

    // Save bot reply to history
    chatHistory.push({ role: "model", parts: [{ text: botReply }] });

  } catch (error) {
    console.error("Gemini API Error:", error);
    removeTypingIndicator();
    
    // Fallback on error
    const fallbackReply = generateSmartFallbackReply(userText);
    renderBotMessage(fallbackReply);
    chatHistory.push({ role: "model", parts: [{ text: fallbackReply }] });
  } finally {
    isBotTyping = false;
  }
}

/**
 * Call Google Gemini REST API (v1beta)
 */
async function callGeminiAPI(userText) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
  
  // Prepare contents payload with system instruction
  const contents = chatHistory.slice(-10); // Keep last 10 messages for context

  const payload = {
    system_instruction: {
      parts: [{ text: ALLAC_SYSTEM_INSTRUCTION }]
    },
    contents: contents,
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 1000
    }
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `HTTP ${response.status}`);
  }

  const result = await response.json();
  const candidate = result.candidates?.[0];
  if (candidate && candidate.content?.parts?.[0]?.text) {
    return candidate.content.parts[0].text;
  } else {
    throw new Error("No response content from Gemini API");
  }
}

/* -------------------------------------------------------------------------- */
/* Smart Knowledge Fallback Engine (เมื่อยังไม่มี API Key หรือออฟไลน์)       */
/* -------------------------------------------------------------------------- */
function generateSmartFallbackReply(query) {
  const q = query.toLowerCase();

  if (q.includes("ราคา") || q.includes("แพ็กเกจ") || q.includes("ค่าบริการ") || q.includes("เท่าไหร่") || q.includes("กี่บาท") || q.includes("คำนวณ") || q.includes("ตรวจสอบบัญชี") || q.includes("audit")) {
    return `💰 **อัตราค่าบริการทำบัญชีและภาษีรายเดือนของ ALL ACCOUNT (Official Price List):**\n\n` +
           `1. **Package 1 (มาตรฐาน):** **8,500 บาท/เดือน**\n` +
           `   - สมุดรายวัน 8 เล่มครบชุด, ภาษี ภ.ง.ด.2, 3, 53, 54, ภ.พ.30, 36, ภ.ธ.40, ทะเบียนสินทรัพย์, Aging AR/AP, ปิดงบประจำเดือน, ภ.ง.ด.50/51, DBD e-Filing, ประกันสังคม และปรึกษาภาษี\n` +
           `2. **Package 2 (ยอดนิยม SME):** **12,500 บาท/เดือน**\n` +
           `   - รวมทุกอย่างใน Package 1 + **จัดทำและยื่นแบบ ภ.ง.ด.1 และ ภ.ง.ด.1 ก สำหรับเงินเดือนพนักงาน**\n` +
           `3. **Package 3 (พรีเมียม ครบวงจร):** **16,500 บาท/เดือน**\n` +
           `   - รวมทุกอย่างใน Package 1 & 2 + **รายงานสต็อก/WIP, งบกระแสเงินสด (Cash Flow), สลิปเงินเดือนพนักงาน, คำนวณภาษีพนักงาน ภ.ง.ด.90/91, จัดทำงบการเงินรายไตรมาส และยื่นภาษีบุคคลธรรมดากรรมการบริษัท**\n\n` +
           `📊 **งานตรวจสอบบัญชีรายปี (CPA Audit):** เริ่มต้น 25,000 บาท/ปี\n` +
           `🏢 **งานจดทะเบียนบริษัท:** เริ่มต้น 13,500 บาท\n` +
           `⚙️ **วางระบบบัญชีพร้อมคู่มือ:** 45,000 บาท\n\n` +
           `✨ ท่านสามารถเลื่อนไปดูตารางราคาแบบละเอียดบนหน้าเว็บ หรือติดต่อ LINE: [@861wjahj](https://line.me/R/ti/p/@861wjahj) หรือโทร **099-229-4591, 098-278-4591** เพื่อขอใบเสนอราคาได้ทันทีครับ`;
  }

  if (q.includes("จดทะเบียน") || q.includes("ตั้งบริษัท") || q.includes("เปิดบริษัท") || q.includes("หจก") || q.includes("นิติบุคคล") || q.includes("เลิกกิจการ") || q.includes("แก้ไข")) {
    return `📋 **บริการงานจดทะเบียนนิติบุคคล & ธุรกิจ (ALL ACCOUNT):**\n\n` +
           `• **จดทะเบียนจัดตั้งบริษัท:** เริ่มต้น **13,500 บาท**\n` +
           `• **จดทะเบียนแก้ไขเปลี่ยนแปลง / ลด-เพิ่มทุน / เปลี่ยนชื่อ:** **5,500 บาท**\n` +
           `• **จดทะเบียนภาษีมูลค่าเพิ่มออนไลน์ (VAT ภ.พ.20):** **2,500 บาท**\n` +
           `• **ขึ้นทะเบียนนายจ้าง ประกันสังคม:** **3,000 บาท**\n` +
           `• **จดทะเบียนเลิกกิจการ (ไม่จด VAT):** **19,000 บาท**\n` +
           `• **จดทะเบียนเลิกกิจการ (จด VAT):** **25,000 บาท**\n\n` +
           `📞 สนใจบริการจดทะเบียน ติดต่อสายด่วนได้ที่ **099-229-4591, 098-278-4591** หรือ LINE: [@861wjahj](https://line.me/R/ti/p/@861wjahj) เพื่อรับคำปรึกษาฟรีครับ`;
  }

  if (q.includes("ยื่นภาษี") || q.includes("กำหนด") || q.includes("ปฏิทิน") || q.includes("ภงด") || q.includes("ภ.พ.30") || q.includes("ประกันสังคม") || q.includes("เดดไลน์")) {
    return `⏰ **สรุปกำหนดการยื่นภาษีประจำเดือนที่ผู้ประกอบการต้องรู้:**\n\n` +
           `• **ภ.ง.ด. 1, 3, 53 (ภาษีหัก ณ ที่จ่าย):**\n` +
           `  - ยื่นกระดาษ: ภายในวันที่ 7 ของเดือนถัดไป\n` +
           `  - ยื่นออนไลน์ (e-Filing): ภายในวันที่ 15 ของเดือนถัดไป\n\n` +
           `• **ภ.พ. 30 (ภาษีมูลค่าเพิ่ม VAT):**\n` +
           `  - ยื่นกระดาษ: ภายในวันที่ 15 ของเดือนถัดไป\n` +
           `  - ยื่นออนไลน์ (e-Filing): ภายในวันที่ 23 ของเดือนถัดไป\n\n` +
           `• **เงินสมทบประกันสังคม (สปส. 1-10):**\n` +
           `  - นำส่งภายในวันที่ 15 ของเดือนถัดไป\n\n` +
           `• **ภ.ง.ด. 51 (ภาษีนิติบุคคลครึ่งปี):** ภายในเดือนสิงหาคมของทุกปี\n\n` +
           `💡 ท่านสามารถดูปฏิทินภาษีแบบละเอียดในส่วน **"ปฏิทินภาษี"** บนหน้าเว็บไซต์ได้เลยครับ`;
  }

  if (q.includes("peak") || q.includes("flowaccount") || q.includes("cloud") || q.includes("โปรแกรมบัญชี") || q.includes("ระบบ")) {
    return `☁️ **บริการวางระบบ Cloud Accounting (PEAK / FlowAccount):**\n\n` +
           `ALL ACCOUNT เป็น Certified Partner กับโปรแกรมบัญชี Cloud ชั้นนำ:\n` +
           `• ตรวจสอบยอดขาย กำไร-ขาดทุน และสต็อกสินค้าได้แบบ Real-time ทุกที่ทุกเวลา\n` +
           `• รองรับการออกใบเสนอราคา ใบเสร็จรับเงิน และ e-Tax Invoice ผ่านระบบ\n` +
           `• เชื่อมต่อ API กับระบบขายหน้าร้าน (POS) และระบบธนาคารอัตโนมัติ\n` +
           `• ทีมงานช่วย Setup ข้อมูล วางผังบัญชี และสอนการใช้งานจนคล่อง\n\n` +
           `ปรึกษาการเลือกโปรแกรมบัญชีที่เหมาะกับธุรกิจคุณได้ฟรีทาง LINE: [@861wjahj](https://line.me/R/ti/p/@861wjahj)`;
  }

  if (q.includes("ติดต่อ") || q.includes("เบอร์") || q.includes("ไลน์") || q.includes("line") || q.includes("facebook") || q.includes("เพจ") || q.includes("โทร")) {
    return `📞 **ช่องทางการติดต่อ บริษัท ออล แอคเคาท์ คอนซัลติ้ง จำกัด:**\n\n` +
           `• 📱 **สายด่วนโทร:** [065-829-1664](tel:0658291664)\n` +
           `• 💬 **LINE Official:** [@861wjahj](https://line.me/R/ti/p/@861wjahj)\n` +
           `• 🌐 **Facebook Page:** [facebook.com/allaac.th](https://www.facebook.com/allaac.th)\n` +
           `• ⏰ **เวลาทำการ:** จันทร์ - เสาร์ 08:30 - 18:00 น.\n\n` +
           `หรือกรอกแบบฟอร์ม **"ขอรับคำปรึกษาฟรี"** ด้านล่างหน้าเว็บ เจ้าหน้าที่จะติดต่อกลับภายใน 24 ชม. ครับ`;
  }

  if (q.includes("สวัสดี") || q.includes("hello") || q.includes("hi") || q.includes("หวัดดี") || q.includes("ช่วยอะไรได้บ้าง")) {
    return `สวัสดีครับ! ยินดีต้อนรับสู่ **ALL ACCOUNT** ครับ 🏢✨\n\n` +
           `ผมสามารถให้คำแนะนำและช่วยเหลือในเรื่อง:\n` +
           `1. 📊 ประเมินราคาค่าทำบัญชีและยื่นภาษีรายเดือน\n` +
           `2. 📝 แนะนำขั้นตอนการจดทะเบียนบริษัท / หจก. / จด VAT\n` +
           `3. ⏰ ตรวจสอบกำหนดการยื่นภาษีสรรพากรและประกันสังคม\n` +
           `4. ☁️ วางระบบโปรแกรมบัญชีออนไลน์ PEAK / FlowAccount\n` +
           `5. 📞 นัดหมายทีมผู้สอบบัญชี CPA เพื่อปรึกษาฟรี\n\n` +
           `สอบถามเรื่องใดพิมพ์ไว้ได้เลยครับ หรือกดปุ่มหัวข้อด้านล่างได้เลยครับ!`;
  }

  // General default answer
  return `ขอบคุณสำหรับคำถามครับ! สำหรับข้อมูลเรื่อง "${query}" ทาง **ALL ACCOUNT** มีทีมผู้เชี่ยวชาญด้านบัญชีและภาษีพร้อมให้คำปรึกษาอย่างละเอียด\n\n` +
         `👉 **คำแนะนำ:**\n` +
         `• หากต้องการประเมินราคา สามารถใช้ **ระบบคำนวณราคา** ด้านบนหน้าเว็บ\n` +
         `• หรือสอบถามผู้เชี่ยวชาญโดยตรงทาง LINE: [@861wjahj](https://line.me/R/ti/p/@861wjahj) หรือโทร [065-829-1664](tel:0658291664) (ปรึกษาฟรี ไม่มีค่าใช้จ่ายครับ)`;
}

/* -------------------------------------------------------------------------- */
/* UI Rendering Helpers                                                       */
/* -------------------------------------------------------------------------- */
function renderUserMessage(text) {
  const container = document.getElementById("ai-chat-messages");
  if (!container) return;

  const msgDiv = document.createElement("div");
  msgDiv.className = "ai-msg ai-msg-user";
  
  const bubble = document.createElement("div");
  bubble.className = "ai-msg-bubble";
  bubble.textContent = text;

  msgDiv.appendChild(bubble);
  container.appendChild(msgDiv);
  scrollChatToBottom();
}

function renderBotMessage(markdownText) {
  const container = document.getElementById("ai-chat-messages");
  if (!container) return;

  const msgDiv = document.createElement("div");
  msgDiv.className = "ai-msg ai-msg-bot";

  const avatar = document.createElement("div");
  avatar.className = "ai-msg-avatar";
  avatar.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path><rect x="4" y="8" width="16" height="12" rx="2"></rect><circle cx="9" cy="13" r="1.5"></circle><circle cx="15" cy="13" r="1.5"></circle><path d="M9 17h6"></path></svg>`;

  const bubble = document.createElement("div");
  bubble.className = "ai-msg-bubble";
  bubble.innerHTML = parseSimpleMarkdown(markdownText);

  msgDiv.appendChild(avatar);
  msgDiv.appendChild(bubble);
  container.appendChild(msgDiv);
  scrollChatToBottom();
}

function showTypingIndicator() {
  const container = document.getElementById("ai-chat-messages");
  if (!container) return;

  removeTypingIndicator(); // Ensure no duplicates

  const typingDiv = document.createElement("div");
  typingDiv.className = "ai-msg ai-msg-bot ai-msg-typing";
  typingDiv.id = "ai-typing-indicator";

  typingDiv.innerHTML = `
    <div class="ai-msg-avatar">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path><rect x="4" y="8" width="16" height="12" rx="2"></rect><circle cx="9" cy="13" r="1.5"></circle><circle cx="15" cy="13" r="1.5"></circle><path d="M9 17h6"></path></svg>
    </div>
    <div class="ai-msg-bubble">
      <div class="ai-typing-dots">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;

  container.appendChild(typingDiv);
  scrollChatToBottom();
}

function removeTypingIndicator() {
  const indicator = document.getElementById("ai-typing-indicator");
  if (indicator) indicator.remove();
}

function scrollChatToBottom() {
  const container = document.getElementById("ai-chat-messages");
  if (container) {
    setTimeout(() => {
      container.scrollTop = container.scrollHeight;
    }, 50);
  }
}

/**
 * Simple Markdown Parser for formatted responses (bold, links, lists, linebreaks)
 */
function parseSimpleMarkdown(md) {
  if (!md) return "";
  let html = md
    // Escape HTML tags to prevent XSS
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Bold **text**
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // Links [text](url)
    .replace(/\[(.*?)\]\((https?:\/\/[^\s]+|tel:[^\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="ai-chat-link">$1</a>')
    // Bullet points
    .replace(/^\s*[•\-]\s*(.*)$/gm, "<li>$1</li>")
    // Line breaks
    .replace(/\n\n/g, "<br><br>")
    .replace(/\n/g, "<br>");

  // Wrap loose <li> with <ul>
  html = html.replace(/(<li>.*?<\/li>)+/g, '<ul class="ai-chat-list">$&</ul>');
  
  return html;
}
