/**
 * ALL ACCOUNT - Tax Calendar Data & Interactive Logic
 * Thai Revenue Department & Social Security Tax Deadline System
 */

const TAX_CALENDAR_DATA = {
  "2026-08": {
    monthName: "สิงหาคม 2569",
    deadlines: [
      {
        day: "07",
        month: "ส.ค.",
        title: "ยื่นแบบ ภ.ง.ด. 1, 3, 53 (กระดาษ)",
        desc: "ภาษีหัก ณ ที่จ่าย สำหรับเงินได้ที่จ่ายในเดือนกรกฎาคม 2569",
        type: "ภาษีเงินได้หัก ณ ที่จ่าย",
        urgent: false
      },
      {
        day: "15",
        month: "ส.ค.",
        title: "ยื่นแบบ ภ.ง.ด. 1, 3, 53 (e-Filing อินเทอร์เน็ต)",
        desc: "ขยายเวลาการยื่นแบบภาษีหัก ณ ที่จ่ายผ่านระบบ e-Filing ของกรมสรรพากร",
        type: "e-Filing",
        urgent: false
      },
      {
        day: "15",
        month: "ส.ค.",
        title: "ยื่นแบบ ภ.พ. 30 (ภาษีมูลค่าเพิ่ม VAT กระดาษ)",
        desc: "สำหรับกิจการที่จดทะเบียนภาษีมูลค่าเพิ่ม ประจำงวดภาษีกรกฎาคม 2569",
        type: "ภาษีมูลค่าเพิ่ม",
        urgent: false
      },
      {
        day: "17",
        month: "ส.ค.",
        title: "นำส่งเงินสมทบประกันสังคม (สปส. 1-10)",
        desc: "เงินสมทบประกันสังคมของนายจ้างและลูกจ้าง ประจำงวดกรกฎาคม 2569",
        type: "ประกันสังคม",
        urgent: false
      },
      {
        day: "23",
        month: "ส.ค.",
        title: "ยื่นแบบ ภ.พ. 30 (e-Filing อินเทอร์เน็ต)",
        desc: "ขยายเวลายื่นแบบภาษีมูลค่าเพิ่มออนไลน์ถึงวันที่ 23 ของเดือนถัดไป",
        type: "e-Filing VAT",
        urgent: false
      },
      {
        day: "31",
        month: "ส.ค.",
        title: "ยื่นแบบ ภ.ง.ด. 51 (ภาษีเงินได้นิติบุคคลครึ่งปี)",
        desc: "สำหรับรอบระยะเวลาบัญชีที่สิ้นสุด 31 ธ.ค. (ภายใน 2 เดือนนับจากวันสิ้นสุด 6 เดือนแรก)",
        type: "ภาษีนิติบุคคลครึ่งปี",
        urgent: true
      }
    ]
  },
  "2026-09": {
    monthName: "กันยายน 2569",
    deadlines: [
      {
        day: "07",
        month: "ก.ย.",
        title: "ยื่นแบบ ภ.ง.ด. 1, 3, 53 (กระดาษ)",
        desc: "ภาษีหัก ณ ที่จ่าย สำหรับเงินได้ที่จ่ายในเดือนสิงหาคม 2569",
        type: "ภาษีเงินได้หัก ณ ที่จ่าย",
        urgent: false
      },
      {
        day: "15",
        month: "ก.ย.",
        title: "ยื่นแบบ ภ.ง.ด. 1, 3, 53 (e-Filing อินเทอร์เน็ต)",
        desc: "ขยายเวลาการยื่นแบบภาษีหัก ณ ที่จ่ายผ่านระบบ e-Filing",
        type: "e-Filing",
        urgent: false
      },
      {
        day: "15",
        month: "ก.ย.",
        title: "ยื่นแบบ ภ.พ. 30 (ภาษีมูลค่าเพิ่ม VAT กระดาษ)",
        desc: "สำหรับกิจการจดทะเบียน VAT ประจำงวดภาษีสิงหาคม 2569",
        type: "ภาษีมูลค่าเพิ่ม",
        urgent: false
      },
      {
        day: "15",
        month: "ก.ย.",
        title: "นำส่งเงินสมทบประกันสังคม (สปส. 1-10)",
        desc: "เงินสมทบประกันสังคม ประจำงวดสิงหาคม 2569",
        type: "ประกันสังคม",
        urgent: false
      },
      {
        day: "23",
        month: "ก.ย.",
        title: "ยื่นแบบ ภ.พ. 30 (e-Filing อินเทอร์เน็ต)",
        desc: "ขยายเวลายื่นแบบภาษีมูลค่าเพิ่มออนไลน์",
        type: "e-Filing VAT",
        urgent: false
      },
      {
        day: "30",
        month: "ก.ย.",
        title: "ยื่นแบบ ภ.ง.ด. 94 (ภาษีเงินได้บุคคลธรรมดาครึ่งปี)",
        desc: "สำหรับบุคคลธรรมดาที่มีเงินได้ประเภท 40(5) - 40(8)",
        type: "ภาษีบุคคลธรรมดาครึ่งปี",
        urgent: true
      }
    ]
  },
  "2026-10": {
    monthName: "ตุลาคม 2569",
    deadlines: [
      {
        day: "07",
        month: "ต.ค.",
        title: "ยื่นแบบ ภ.ง.ด. 1, 3, 53 (กระดาษ)",
        desc: "ภาษีหัก ณ ที่จ่าย สำหรับเงินได้ที่จ่ายในเดือนกันยายน 2569",
        type: "ภาษีเงินได้หัก ณ ที่จ่าย",
        urgent: false
      },
      {
        day: "15",
        month: "ต.ค.",
        title: "ยื่นแบบ ภ.ง.ด. 1, 3, 53 (e-Filing อินเทอร์เน็ต)",
        desc: "ขยายเวลายื่นแบบภาษีหัก ณ ที่จ่ายออนไลน์",
        type: "e-Filing",
        urgent: false
      },
      {
        day: "15",
        month: "ต.ค.",
        title: "ยื่นแบบ ภ.พ. 30 (ภาษีมูลค่าเพิ่ม VAT กระดาษ)",
        desc: "งวดภาษีกันยายน 2569",
        type: "ภาษีมูลค่าเพิ่ม",
        urgent: false
      },
      {
        day: "15",
        month: "ต.ค.",
        title: "นำส่งเงินสมทบประกันสังคม (สปส. 1-10)",
        desc: "เงินสมทบประกันสังคม ประจำงวดกันยายน 2569",
        type: "ประกันสังคม",
        urgent: false
      },
      {
        day: "23",
        month: "ต.ค.",
        title: "ยื่นแบบ ภ.พ. 30 (e-Filing อินเทอร์เน็ต)",
        desc: "ขยายเวลายื่นแบบภาษีมูลค่าเพิ่มออนไลน์",
        type: "e-Filing VAT",
        urgent: false
      },
      {
        day: "31",
        month: "ต.ค.",
        title: "ปิดรอบงบไตรมาส 3 (Q3 Financial Review)",
        desc: "ทบทวนรายได้-ค่าใช้จ่ายเพื่อวางแผนภาษีปลายปีล่วงหน้า",
        type: "วางแผนภาษี",
        urgent: false
      }
    ]
  }
};

function renderTaxCalendar(monthKey = "2026-08") {
  const container = document.getElementById("tax-calendar-grid");
  const monthTitle = document.getElementById("current-tax-month-title");
  if (!container) return;

  const data = TAX_CALENDAR_DATA[monthKey] || TAX_CALENDAR_DATA["2026-08"];
  if (monthTitle) {
    monthTitle.textContent = `กำหนดการยื่นภาษีประจำเดือน: ${data.monthName}`;
  }

  container.innerHTML = data.deadlines.map(item => `
    <div class="tax-deadline-item ${item.urgent ? 'urgent-border' : ''}">
      <div class="date-box">
        <div class="date-num">${item.day}</div>
        <div class="date-month">${item.month}</div>
      </div>
      <div class="tax-info">
        <h5>${item.title}</h5>
        <p>${item.desc}</p>
        <span class="tax-badge-type">${item.type}</span>
      </div>
    </div>
  `).join('');
}

document.addEventListener("DOMContentLoaded", () => {
  renderTaxCalendar("2026-08");

  const monthButtons = document.querySelectorAll(".month-btn");
  monthButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      monthButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const monthKey = btn.getAttribute("data-month");
      renderTaxCalendar(monthKey);
    });
  });
});
