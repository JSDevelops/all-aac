/**
 * ALL ACCOUNT - Core Interactive Application Logic
 * Brand: ALL ACCOUNT (ออล แอคเคาท์ คอนซัลติ้ง)
 * Facebook: https://www.facebook.com/allaac.th
 */

/**
 * ============================================================================
 * GOOGLE APPS SCRIPT CONFIGURATION
 * ============================================================================
 * นำ URL ของ Web App ที่ได้จากการ Deploy ใน Google Apps Script (Code.gs)
 * มาวางในตัวแปร GOOGLE_SCRIPT_URL ด้านล่างนี้
 * ตัวอย่าง: "https://script.google.com/macros/s/AKfycbx.../exec"
 */
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyeYiYxsX0ToG-jGpmqY_KqNnfiIilV0T5MWXhIp29hbyE9C7TGEy-WEpd857NxBxg/exec";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbar();
  initCalculator();
  initFAQ();
  initModals();
  initBookingForm();
  initScrollTop();
});

/* -------------------------------------------------------------------------- */
/* 1. Theme Toggle (Dark / Light Mode)                                         */
/* -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const savedTheme = localStorage.getItem("allac_theme") || "light";
  
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("allac_theme", newTheme);
      updateThemeIcon(newTheme);
      showToast(`เปลี่ยนเป็นธีม ${newTheme === 'dark' ? 'Dark Mode 🌙' : 'Light Mode ☀️'}`);
    });
  }
}

function updateThemeIcon(theme) {
  const btn = document.getElementById("theme-toggle-btn");
  if (!btn) return;
  btn.innerHTML = theme === "dark" 
    ? `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
    : `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
}

/* -------------------------------------------------------------------------- */
/* 2. Navigation Bar & Mobile Drawer                                          */
/* -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    updateActiveNavLink();
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const isOpen = navMenu.classList.contains("open");
      mobileToggle.innerHTML = isOpen 
        ? `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        document.body.style.overflow = "";
        mobileToggle.innerHTML = `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 992 && navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        document.body.style.overflow = "";
        mobileToggle.innerHTML = `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });
  }
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPosition = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollPosition >= top && scrollPosition < top + height) {
        document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 3. Interactive Cost & Price Calculator                                     */
/* -------------------------------------------------------------------------- */
// Store current calculated state for form submission
window.currentCalculatorData = {
  bizType: "บริษัทจำกัด (Co., Ltd.)",
  docTier: "30 รายการ/เดือน",
  addons: "ไม่มีบริการเสริม",
  estimatedPrice: "2,500"
};

function initCalculator() {
  const bizRadios = document.querySelectorAll('input[name="calc-biz-type"]');
  const docSlider = document.getElementById("doc-slider");
  const docValueDisplay = document.getElementById("doc-count-display");
  const addonCheckboxes = document.querySelectorAll(".addon-checkbox");
  
  const priceDisplay = document.getElementById("calc-price-result");
  const bizTypeBreakdown = document.getElementById("breakdown-biz-type");
  const docBreakdown = document.getElementById("breakdown-doc-tier");
  const addonsBreakdown = document.getElementById("breakdown-addons");

  function calculatePrice() {
    let basePrice = 2500;
    let selectedBizName = "บริษัทจำกัด (Co., Ltd.)";

    // 1. Business Type Factor
    const selectedBiz = document.querySelector('input[name="calc-biz-type"]:checked');
    if (selectedBiz) {
      if (selectedBiz.value === "individual") {
        basePrice = 1500;
        selectedBizName = "บุคคลธรรมดา / ฟรีแลนซ์";
      } else if (selectedBiz.value === "partnership") {
        basePrice = 2000;
        selectedBizName = "ห้างหุ้นส่วนจำกัด (หจก.)";
      } else if (selectedBiz.value === "company") {
        basePrice = 2500;
        selectedBizName = "บริษัทจำกัด";
      }
    }

    // 2. Document Volume Tier
    const docCount = parseInt(docSlider ? docSlider.value : 30, 10);
    let docTierName = "1 - 30 รายการ/เดือน";
    let volumeMultiplier = 0;

    if (docCount <= 30) {
      docTierName = `${docCount} รายการ/เดือน (เริ่มต้น)`;
      volumeMultiplier = 0;
    } else if (docCount <= 70) {
      docTierName = `${docCount} รายการ/เดือน (ขนาดกลาง)`;
      volumeMultiplier = 1200;
    } else if (docCount <= 120) {
      docTierName = `${docCount} รายการ/เดือน (เติบโต)`;
      volumeMultiplier = 2500;
    } else {
      docTierName = `${docCount}+ รายการ/เดือน (ปริมาณสูง)`;
      volumeMultiplier = 4500;
    }

    if (docValueDisplay) {
      docValueDisplay.textContent = `${docCount} รายการ/เดือน`;
    }

    // 3. Addon Services
    let addonTotal = 0;
    let selectedAddonNames = [];

    addonCheckboxes.forEach(cb => {
      if (cb.checked) {
        const price = parseInt(cb.getAttribute("data-price"), 10);
        const name = cb.getAttribute("data-name");
        addonTotal += price;
        selectedAddonNames.push(name);
      }
    });

    const totalPrice = basePrice + volumeMultiplier + addonTotal;

    // Update UI elements
    if (priceDisplay) {
      priceDisplay.textContent = totalPrice.toLocaleString("th-TH");
    }
    if (bizTypeBreakdown) {
      bizTypeBreakdown.textContent = selectedBizName;
    }
    if (docBreakdown) {
      docBreakdown.textContent = docTierName;
    }
    if (addonsBreakdown) {
      addonsBreakdown.textContent = selectedAddonNames.length > 0 
        ? `${selectedAddonNames.length} บริการ (+${addonTotal.toLocaleString()} บ.)`
        : "ไม่มีบริการเสริม";
    }

    // Store state in window for easy export
    window.currentCalculatorData = {
      bizType: selectedBizName,
      docTier: docTierName,
      addons: selectedAddonNames.length > 0 ? selectedAddonNames.join(", ") : "ไม่มีบริการเสริม",
      estimatedPrice: totalPrice.toLocaleString("th-TH")
    };
  }

  bizRadios.forEach(radio => radio.addEventListener("change", calculatePrice));
  if (docSlider) {
    docSlider.addEventListener("input", calculatePrice);
  }
  addonCheckboxes.forEach(cb => cb.addEventListener("change", calculatePrice));

  // Send Quotation via LINE Button
  const sendQuotationBtn = document.getElementById("btn-send-quotation-line");
  if (sendQuotationBtn) {
    sendQuotationBtn.addEventListener("click", () => {
      const calc = window.currentCalculatorData;
      const message = encodeURIComponent(
        `สวัสดีครับ สนใจรับบริการบัญชี ALL ACCOUNT\n` +
        `รูปแบบธุรกิจ: ${calc.bizType}\n` +
        `ปริมาณเอกสาร: ${calc.docTier}\n` +
        `บริการเสริม: ${calc.addons}\n` +
        `ราคาประเมินเบื้องต้น: ${calc.estimatedPrice} บาท/เดือน\n` +
        `ต้องการรับคำปรึกษาและใบเสนอราคาอย่างเป็นทางการครับ`
      );
      
      window.open(`https://line.me/R/ti/p/@861wjahj?text=${message}`, "_blank");
    });
  }

  // Initial Calculation
  calculatePrice();
}

/* -------------------------------------------------------------------------- */
/* 4. FAQ Accordions                                                          */
/* -------------------------------------------------------------------------- */
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (questionBtn && answer) {
      questionBtn.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");
        
        // Close other FAQs
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
            const otherAnswer = otherItem.querySelector(".faq-answer");
            if (otherAnswer) otherAnswer.style.maxHeight = null;
          }
        });

        if (isOpen) {
          item.classList.remove("active");
          answer.style.maxHeight = null;
        } else {
          item.classList.add("active");
          answer.style.maxHeight = answer.scrollHeight + 30 + "px";
        }
      });
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 5. Modals Handling                                                         */
/* -------------------------------------------------------------------------- */
function initModals() {
  const openModalBtns = document.querySelectorAll("[data-open-modal]");
  const modalOverlay = document.getElementById("consult-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  openModalBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute("data-service") || "";
      const serviceSelect = document.getElementById("modal-service-select");
      if (serviceSelect && serviceName) {
        serviceSelect.value = serviceName;
      }

      // If clicked from quotation button, prefill note
      const modalNote = document.getElementById("modal-client-note");
      if (serviceName === "ใบเสนอราคาจากการคำนวณออนไลน์" && modalNote && window.currentCalculatorData) {
        const calc = window.currentCalculatorData;
        modalNote.value = `[ใบเสนอราคาจากการคำนวณ]\n- ธุรกิจ: ${calc.bizType}\n- เอกสาร: ${calc.docTier}\n- บริการเสริม: ${calc.addons}\n- ราคาประเมิน: ${calc.estimatedPrice} บาท/เดือน`;
      }

      if (modalOverlay) {
        modalOverlay.classList.add("open");
        document.body.style.overflow = "hidden";
      }
    });
  });

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener("click", () => {
      modalOverlay.classList.remove("open");
      document.body.style.overflow = "";
    });

    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove("open");
        document.body.style.overflow = "";
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalOverlay.classList.contains("open")) {
        modalOverlay.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 6. Booking Form Submission & Google Sheets Backend Integration             */
/* -------------------------------------------------------------------------- */
function initBookingForm() {
  const form = document.getElementById("main-booking-form");
  const modalForm = document.getElementById("modal-booking-form");

  async function handleFormSubmit(e, formElement, isModal = false) {
    e.preventDefault();
    const submitBtn = formElement.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : "";

    const formData = new FormData(formElement);
    const payload = Object.fromEntries(formData.entries());

    // Basic Validation
    if (!payload.name || !payload.phone) {
      showToast("กรุณากรอกชื่อและเบอร์โทรศัพท์สำหรับติดต่อกลับ", "warning");
      return;
    }

    // Set Form Type
    if (isModal) {
      if (payload.service === "ใบเสนอราคาจากการคำนวณออนไลน์" && window.currentCalculatorData) {
        payload.form_type = "quotation_calculator";
        payload.biz_type = window.currentCalculatorData.bizType;
        payload.doc_tier = window.currentCalculatorData.docTier;
        payload.addons = window.currentCalculatorData.addons;
        payload.estimated_price = window.currentCalculatorData.estimatedPrice;
      } else {
        payload.form_type = "modal_consultation";
      }
    } else {
      payload.form_type = "contact_form";
    }

    // UI Loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite; display: inline-block;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-opacity="1"></path>
        </svg>
        กำลังบันทึกข้อมูล...
      `;
    }

    // 1. Save local backup in localStorage
    const leads = JSON.parse(localStorage.getItem("allac_leads") || "[]");
    leads.push({ ...payload, date: new Date().toISOString() });
    localStorage.setItem("allac_leads", JSON.stringify(leads));

    // 2. Send to Google Sheets (if GOOGLE_SCRIPT_URL is provided)
    if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL.startsWith("http")) {
      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors", // Required for Google Apps Script Web App
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn("Google Sheet sync warning (saved locally):", err);
      }
    }

    // UI Success State
    showToast("ขอบคุณครับ! บันทึกข้อมูลเรียบร้อย เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด", "success");
    formElement.reset();

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }

    if (isModal) {
      const modal = document.getElementById("consult-modal");
      if (modal) {
        setTimeout(() => {
          modal.classList.remove("open");
          document.body.style.overflow = "";
        }, 1000);
      }
    }
  }

  if (form) {
    form.addEventListener("submit", (e) => handleFormSubmit(e, form, false));
  }
  if (modalForm) {
    modalForm.addEventListener("submit", (e) => handleFormSubmit(e, modalForm, true));
  }
}

/* -------------------------------------------------------------------------- */
/* 7. Scroll To Top & Toast Helpers                                           */
/* -------------------------------------------------------------------------- */
function initScrollTop() {
  const scrollTopBtn = document.getElementById("scroll-top-btn");
  if (!scrollTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function showToast(message, type = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  if (type === "warning") toast.style.borderLeftColor = "var(--warning)";
  if (type === "error") toast.style.borderLeftColor = "var(--danger)";

  const icon = type === "success" 
    ? `<svg width="20" height="20" fill="none" stroke="var(--success)" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    : `<svg width="20" height="20" fill="none" stroke="var(--warning)" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  toast.innerHTML = `${icon}<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
