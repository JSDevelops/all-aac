/**
 * ============================================================================
 * ALL ACCOUNT - Google Apps Script Backend for Google Sheets Data Collection
 * Website: ALL ACCOUNT (ออล แอคเคาท์ คอนซัลติ้ง)
 * ============================================================================
 * 
 * วิธีการติดตั้งและใช้งาน:
 * 1. สร้าง Google Sheets ใหม่ขึ้นมา 1 ไฟล์ (เช่น ตั้งชื่อว่า "ALL ACCOUNT - ระบบบันทึกข้อมูลลูกค้า")
 * 2. ไปที่เมนู ส่วนขยาย (Extensions) > Apps Script
 * 3. ลบโค้ดเดิมทั้งหมดในไฟล์ Code.gs แล้วคัดลอกโค้ดนี้ไปวางแทนที่
 * 4. กดปุ่ม บันทึก (Save)
 * 5. กดปุ่ม นำไปใช้งาน (Deploy) > การนำไปใช้งานใหม่ (New deployment)
 * 6. เลือกประเภทเป็น "เว็บแอปพลิเคชัน" (Web app)
 * 7. ตั้งค่า:
 *    - คำอธิบาย: "ALL ACCOUNT Lead Receiver API"
 *    - ดำเนินการในฐานะ (Execute as): "ฉัน" (Me - บัญชี Google ของคุณ)
 *    - ผู้ที่มีสิทธิ์เข้าถึง (Who has access): "ทุกคน" (Anyone) **สำคัญมาก**
 * 8. กดปุ่ม "นำไปใช้งาน" (Deploy) แล้วให้สิทธิ์การเข้าถึง (Authorize access)
 * 9. คัดลอก "URL ของเว็บแอปพลิเคชัน" (Web App URL) ที่ได้ ไปใส่ในตัวแปร `GOOGLE_SCRIPT_URL` ในไฟล์ `js/app.js`
 * ============================================================================
 */

// สามารถใส่ LINE Notify Token หรือ อีเมล สำหรับแจ้งเตือนทันทีเมื่อมีลูกค้ากรอกข้อมูล (ไม่ใส่ก็ได้)
const CONFIG = {
  NOTIFICATION_EMAIL: "", // ใส่อีเมลของคุณ เช่น "allaccount.th@gmail.com" เพื่อรับแจ้งเตือนเมื่อมีลูกค้ากรอกฟอร์ม
  LINE_NOTIFY_TOKEN: ""   // ใส่ Line Notify Token หากต้องการให้เตือนเข้ากลุ่มไลน์
};

/**
 * Handle POST request from Website Forms
 */
function doPost(e) {
  try {
    const lock = LockService.getScriptLock();
    // รอ Lock ไม่เกิน 30 วินาที เพื่อป้องกันกรณีข้อมูลส่งมาพร้อมกันหลายคน
    lock.waitLock(30000);

    let data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const timestamp = new Date();
    const formattedDate = Utilities.formatDate(timestamp, "Asia/Bangkok", "dd/MM/yyyy HH:mm:ss");
    
    const formType = data.form_type || "contact_form";

    let targetSheetName = "";
    let rowData = [];

    // แยก Sheet ตามประเภทของแบบฟอร์ม
    if (formType === "modal_consultation") {
      // 1. แบบฟอร์มป็อปอัปนัดหมายปรึกษาฟรี
      targetSheetName = "นัดหมายปรึกษา (Modal)";
      const sheet = getOrCreateSheet(ss, targetSheetName, [
        "วัน-เวลาที่ส่ง", "ชื่อ-นามสกุล", "เบอร์โทรศัพท์", "บริการที่สนใจ", "ข้อความเพิ่มเติม", "สถานะการติดต่อ", "หมายเหตุเจ้าหน้าที่"
      ]);
      
      rowData = [
        formattedDate,
        data.name || "-",
        data.phone || "-",
        data.service || "รับคำปรึกษาทั่วไป",
        data.note || "-",
        "รอดำเนินการ (New)",
        ""
      ];
      sheet.appendRow(rowData);
      
      sendNotifications("📋 มีลูกค้านัดหมายปรึกษาใหม่ (Modal)", [
        `ชื่อ: ${data.name}`,
        `เบอร์โทร: ${data.phone}`,
        `บริการที่สนใจ: ${data.service}`,
        `รายละเอียด: ${data.note || "-"}`
      ]);

    } else if (formType === "quotation_calculator") {
      // 2. ข้อมูลจากการคำนวณราคาออนไลน์ (Calculator Lead)
      targetSheetName = "คำนวณราคาออนไลน์ (Calculator)";
      const sheet = getOrCreateSheet(ss, targetSheetName, [
        "วัน-เวลาที่ส่ง", "ชื่อ-นามสกุล", "เบอร์โทรศัพท์", "LINE ID", "รูปแบบธุรกิจ", "ปริมาณเอกสาร/เดือน", "บริการเสริมที่เลือก", "ราคาประเมิน (บาท/เดือน)", "ข้อความเพิ่มเติม", "สถานะ"
      ]);

      rowData = [
        formattedDate,
        data.name || "-",
        data.phone || "-",
        data.line_id || "-",
        data.biz_type || "-",
        data.doc_tier || "-",
        data.addons || "ไม่มีบริการเสริม",
        data.estimated_price || "-",
        data.note || "-",
        "รอดำเนินการ (New)"
      ];
      sheet.appendRow(rowData);

      sendNotifications("💰 มีลูกค้าขอใบเสนอราคาจากการคำนวณออนไลน์", [
        `ชื่อ: ${data.name || "-"}`,
        `เบอร์โทร: ${data.phone || "-"}`,
        `LINE ID: ${data.line_id || "-"}`,
        `ธุรกิจ: ${data.biz_type}`,
        `เอกสาร: ${data.doc_tier}`,
        `บริการเสริม: ${data.addons}`,
        `ราคาประเมิน: ${data.estimated_price} บาท/เดือน`
      ]);

    } else {
      // 3. แบบฟอร์มติดต่อหลักหน้าเว็บไซต์ (Main Contact Form)
      targetSheetName = "ติดต่อขอรับบริการ (Contact Form)";
      const sheet = getOrCreateSheet(ss, targetSheetName, [
        "วัน-เวลาที่ส่ง", "ชื่อ-นามสกุล", "เบอร์โทรศัพท์", "LINE ID", "บริการที่สนใจ", "รายละเอียดเพิ่มเติม", "สถานะการติดต่อ", "หมายเหตุเจ้าหน้าที่"
      ]);

      rowData = [
        formattedDate,
        data.name || "-",
        data.phone || "-",
        data.line_id || "-",
        data.service || "ทำบัญชีและภาษีรายเดือน",
        data.note || "-",
        "รอดำเนินการ (New)",
        ""
      ];
      sheet.appendRow(rowData);

      sendNotifications("📩 มีลูกค้าติดต่อขอคำปรึกษาใหม่ (Main Form)", [
        `ชื่อ: ${data.name}`,
        `เบอร์โทร: ${data.phone}`,
        `LINE ID: ${data.line_id || "-"}`,
        `บริการที่สนใจ: ${data.service}`,
        `รายละเอียด: ${data.note || "-"}`
      ]);
    }

    lock.releaseLock();

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "บันทึกข้อมูลเรียบร้อยแล้ว",
        sheet: targetSheetName
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET request (Health Check & Test)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "online",
      message: "ALL ACCOUNT Google Apps Script API พร้อมทำงาน",
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Helper function to find or create a Sheet with styled headers
 */
function getOrCreateSheet(spreadsheet, sheetName, headers) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    
    // ตกแต่งส่วนหัวตาราง Header ให้สวยงาม
    sheet.appendRow(headers);
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#0a2540"); // สี Navy Blue ของแบรนด์ ALL ACCOUNT
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    headerRange.setFontFamily("Prompt");
    headerRange.setFontSize(11);
    headerRange.setHorizontalAlignment("center");
    headerRange.setVerticalAlignment("middle");
    
    sheet.setRowHeight(1, 40);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

/**
 * Helper to send email or LINE Notify if configured
 */
function sendNotifications(title, detailsArray) {
  const messageBody = `${title}\n------------------------\n${detailsArray.join("\n")}\n\nดูข้อมูลทั้งหมดได้ใน Google Sheets`;

  // 1. Email Notification
  if (CONFIG.NOTIFICATION_EMAIL && CONFIG.NOTIFICATION_EMAIL.includes("@")) {
    try {
      MailApp.sendEmail({
        to: CONFIG.NOTIFICATION_EMAIL,
        subject: `[ALL ACCOUNT] ${title}`,
        body: messageBody
      });
    } catch (e) {
      Logger.log("Email sending failed: " + e.toString());
    }
  }

  // 2. LINE Notify
  if (CONFIG.LINE_NOTIFY_TOKEN) {
    try {
      UrlFetchApp.fetch("https://notify-api.line.me/api/notify", {
        method: "post",
        headers: {
          "Authorization": "Bearer " + CONFIG.LINE_NOTIFY_TOKEN
        },
        payload: {
          message: `\n${title}\n` + detailsArray.join("\n")
        }
      });
    } catch (e) {
      Logger.log("Line notify failed: " + e.toString());
    }
  }
}
