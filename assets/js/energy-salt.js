/**
 * Al Mokhtar - Master Lovable Industrial Script
 * Handles bilingual switching (EN/AR), product explorer tab interaction,
 * operational field gallery lightbox & filters, and B2B RFQ engine.
 */

(function () {
   'use strict';

   // Complete bilingual dictionary for core UI labels
   const translations = {
      en: {
         explore: 'EXPLORE 8 CORE PRODUCTS',
         quote: 'REQUEST B2B QUOTATION',
         viewAll: 'VIEW FULL SPECIFICATIONS',
         specs: 'TECHNICAL SPECIFICATIONS (TDS)',
         application: 'PRIMARY INDUSTRIAL APPLICATION',
         packaging: 'BULK PACKAGING FORMATS',
         said: 'PORT SAID',
         damietta: 'DAMIETTA',
         alex: 'ALEXANDRIA',
      },
      ar: {
         explore: 'استعراض المنتجات الـ 8',
         quote: 'طلب عرض أسعار B2B',
         viewAll: 'عرض المواصفات الفنية كاملة',
         specs: 'المواصفات الفنية والمخبرية (TDS)',
         application: 'مجالات الاستخدام والتطبيقات الصناعية',
         packaging: 'معايير التعبئة والتغليف',
         said: 'بورسعيد',
         damietta: 'دمياط',
         alex: 'الإسكندرية',
      },
   };

   function initEnergySaltPortal() {
      initBilingual();
      initProductExplorer();
      initGalleryLightbox();
      initGalleryCarousel();
      initRfqCalculator();
      initSectionReveal();
      initPageMotion();
      initBackToTop();
   }

   if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initEnergySaltPortal, { once: true });
   } else {
      initEnergySaltPortal();
   }

   // 1. Bilingual Switcher
   function initBilingual() {
      const btns = document.querySelectorAll('.lang-switch button');
      btns.forEach((btn) => {
         btn.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang') || (this.textContent.trim().toLowerCase() === 'ar' || this.textContent.trim() === 'عربي' ? 'ar' : 'en');
            setLanguage(lang);
         });
      });

      function setLanguage(lang) {
         btns.forEach((b) => {
            const bLang = b.getAttribute('data-lang') || (b.textContent.trim().toLowerCase() === 'ar' || b.textContent.trim() === 'عربي' ? 'ar' : 'en');
            b.classList.toggle('selected', bLang === lang);
         });

         document.documentElement.lang = lang;
         document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
         document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

         // Update text nodes
         document.querySelectorAll('[data-en][data-ar]').forEach((el) => {
            el.textContent = el.getAttribute(`data-${lang}`);
         });

         // Update product explorer active product text if needed
         const activeTab = document.querySelector('.product-tab.active');
         if (activeTab) {
            activeTab.click();
         }
      }
   }

   // 2. Product Explorer
   function initProductExplorer() {
      const tabs = document.querySelectorAll('.product-tab');
      if (!tabs.length) return;

      tabs.forEach((tab) => {
         tab.addEventListener('click', function () {
            tabs.forEach((t) => t.classList.remove('active'));
            this.classList.add('active');

            const code = this.getAttribute('data-code');
            const nacl = this.getAttribute('data-nacl');
            const moisture = this.getAttribute('data-moisture');
            const insolubles = this.getAttribute('data-insolubles');
            const so4 = this.getAttribute('data-so4');
            const anticaking = this.getAttribute('data-anticaking');
            const grain = this.getAttribute('data-grain');
            const packaging = this.getAttribute('data-packaging');
            const photo = this.getAttribute('data-photo');
            const titleEn = this.getAttribute('data-title-en');
            const titleAr = this.getAttribute('data-title-ar');
            const shortEn = this.getAttribute('data-short-en');
            const shortAr = this.getAttribute('data-short-ar');
            const useEn = this.getAttribute('data-use-en');
            const useAr = this.getAttribute('data-use-ar');

            const isAr = document.documentElement.dir === 'rtl';

            const numEl = document.getElementById('prod-detail-num');
            const photoEl = document.getElementById('prod-detail-photo');
            const naclBadge = document.getElementById('prod-detail-nacl-badge');
            const grainBadge = document.getElementById('prod-detail-grain-badge');
            const titleEl = document.getElementById('prod-detail-title');
            const shortEl = document.getElementById('prod-detail-short');
            const specNacl = document.getElementById('spec-nacl');
            const specMoist = document.getElementById('spec-moisture');
            const specInsol = document.getElementById('spec-insolubles');
            const specSo4 = document.getElementById('spec-so4');
            const specAnti = document.getElementById('spec-anticaking');
            const specGrain = document.getElementById('spec-grain');
            const specPack = document.getElementById('spec-packaging');
            const useEl = document.getElementById('prod-detail-use');

            if (numEl) numEl.textContent = `${code} / 08`;
            if (photoEl && photo) photoEl.src = photo;
            if (naclBadge) naclBadge.textContent = `${nacl} NACL`;
            if (grainBadge) grainBadge.textContent = grain;
            if (titleEl) titleEl.textContent = isAr ? titleAr : titleEn;
            if (shortEl) shortEl.textContent = isAr ? shortAr : shortEn;
            if (specNacl) specNacl.textContent = nacl;
            if (specMoist) specMoist.textContent = moisture;
            if (specInsol) specInsol.textContent = insolubles;
            if (specSo4) specSo4.textContent = so4;
            if (specAnti) specAnti.textContent = anticaking;
            if (specGrain) specGrain.textContent = grain;
            if (specPack) specPack.textContent = packaging;
            if (useEl) useEl.textContent = isAr ? useAr : useEn;
         });
      });
   }

   // 3. Operational Field Gallery Lightbox
   function initGalleryLightbox() {
      const cards = document.querySelectorAll('.gallery-card');
      const modal = document.getElementById('gallery-lightbox');
      const closeBtn = document.getElementById('gallery-modal-close-btn');

      if (!cards.length || !modal) return;

      const modalImg = document.getElementById('gallery-modal-img');
      const modalBadge = document.getElementById('gallery-modal-badge');
      const modalTitle = document.getElementById('gallery-modal-title');
      const modalDesc = document.getElementById('gallery-modal-desc');
      const modalLoc = document.getElementById('gallery-modal-loc');
      const modalWa = document.getElementById('gallery-modal-wa');

      cards.forEach((card) => {
         card.addEventListener('click', function () {
            const img = this.getAttribute('data-img');
            const badge = this.getAttribute('data-badge');
            const titleEn = this.getAttribute('data-title-en');
            const titleAr = this.getAttribute('data-title-ar');
            const loc = this.getAttribute('data-loc');
            const descEn = this.getAttribute('data-desc-en');
            const descAr = this.getAttribute('data-desc-ar');

            const isAr = document.documentElement.dir === 'rtl';
            const title = isAr ? titleAr : titleEn;
            const desc = isAr ? descAr : descEn;

            if (modalImg) modalImg.src = img;
            if (modalBadge) modalBadge.textContent = badge;
            if (modalTitle) modalTitle.textContent = title;
            if (modalLoc) modalLoc.textContent = loc;
            if (modalDesc) modalDesc.textContent = desc;

            if (modalWa) {
               const msg = `Hello Al Mokhtar, I am inquiring about the facility: ${title} (${loc}).`;
               modalWa.href = `https://wa.me/201013010138?text=${encodeURIComponent(msg)}`;
            }

            modal.classList.add('open');
         });
      });

      if (closeBtn) {
         closeBtn.addEventListener('click', function () {
            modal.classList.remove('open');
         });
      }

      modal.addEventListener('click', function (e) {
         if (e.target === modal) {
            modal.classList.remove('open');
         }
      });
   }

   // 4. Gallery carousel presentation
   function initGalleryCarousel() {
      const carousel = document.querySelector('.gallery-carousel');
      const cards = Array.from(document.querySelectorAll('.gallery-carousel .gallery-card'));
      const previous = document.querySelector('.gallery-carousel-prev');
      const next = document.querySelector('.gallery-carousel-next');

      if (!carousel || cards.length < 2) return;

      let activeIndex = 0;

      function render() {
         cards.forEach((card, index) => {
            card.classList.remove('is-active', 'is-prev', 'is-next');
            if (index === activeIndex) card.classList.add('is-active');
            if (index === (activeIndex - 1 + cards.length) % cards.length) card.classList.add('is-prev');
            if (index === (activeIndex + 1) % cards.length) card.classList.add('is-next');
         });
      }

      function move(step) {
         activeIndex = (activeIndex + step + cards.length) % cards.length;
         render();
      }

      if (previous) previous.addEventListener('click', () => move(-1));
      if (next) next.addEventListener('click', () => move(1));

      carousel.addEventListener('keydown', (event) => {
         if (event.key === 'ArrowLeft') move(-1);
         if (event.key === 'ArrowRight') move(1);
      });

      render();
   }

   // 5. RFQ Calculator
   function initRfqCalculator() {
      const productSelect = document.getElementById('rfq-product');
      const qtyInput = document.getElementById('rfq-qty');
      const packSelect = document.getElementById('rfq-packaging');
      const termSelect = document.getElementById('rfq-incoterm');
      const waBtn = document.getElementById('rfq-wa-btn');
      const emailBtn = document.getElementById('rfq-email-btn');

      if (!productSelect || !qtyInput || !packSelect || !termSelect) return;

      function updateDispatch() {
         const product = productSelect.value || 'De-icing Rock Salt';
         const qty = qtyInput.value || '1000';
         const packaging = packSelect.value || '1-Ton Jumbo Bags';
         const term = termSelect.value || 'FOB Damietta';

         const message =
            `Hello Al Mokhtar Export Desk,\n\n` +
            `I would like an official quotation for:\n` +
            `- Product: ${product}\n` +
            `- Quantity: ${qty} MT\n` +
            `- Packaging: ${packaging}\n` +
            `- Delivery Term: ${term}\n\n` +
            `Please share the latest Certificate of Analysis (COA) and commercial offer.`;

         if (waBtn) {
            waBtn.href = `https://wa.me/201013010138?text=${encodeURIComponent(message)}`;
         }

         if (emailBtn) {
            emailBtn.href = `mailto:info@almokhtar-egy.com?subject=${encodeURIComponent('B2B Salt Quotation Request - ' + product)}&body=${encodeURIComponent(message)}`;
         }
      }

      productSelect.addEventListener('change', updateDispatch);
      qtyInput.addEventListener('input', updateDispatch);
      packSelect.addEventListener('change', updateDispatch);
      termSelect.addEventListener('change', updateDispatch);

      updateDispatch();
   }

   // 5. Section reveal motion
   function initSectionReveal() {
      const revealItems = document.querySelectorAll('.about-section, .services-section, .service-card');
      if (!revealItems.length) return;

      if (!('IntersectionObserver' in window)) {
         revealItems.forEach((item) => item.classList.add('is-visible'));
         return;
      }

      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (!entry.isIntersecting) return;
               entry.target.classList.add('is-visible');
               observer.unobserve(entry.target);
            });
         },
         { threshold: 0.12 },
      );

      revealItems.forEach((item) => observer.observe(item));
   }

   // 6. Shared motion for the remaining page sections
   function initPageMotion() {
      const revealItems = document.querySelectorAll(
         '.metrics, .process-grid, .gallery-carousel, .split-story, .tds-matrix-wrap, .packaging-grid, .logistics-preview, .synergy-section, .home-rfq, .footer, .metric, .process-step, .pkg-card, .synergy-fact',
      );
      if (!revealItems.length) return;

      revealItems.forEach((item) => item.classList.add('motion-reveal'));

      if (!('IntersectionObserver' in window)) {
         revealItems.forEach((item) => item.classList.add('is-visible'));
         return;
      }

      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (!entry.isIntersecting) return;
               entry.target.classList.add('is-visible');
               observer.unobserve(entry.target);
            });
         },
         { threshold: 0.1 },
      );

      revealItems.forEach((item) => observer.observe(item));
   }

   // 7. Back-to-top control
   function initBackToTop() {
      const button = document.getElementById('back-to-top');
      if (!button) return;

      const updateVisibility = () => {
         button.classList.toggle('is-visible', window.scrollY > 560);
      };

      window.addEventListener('scroll', updateVisibility, { passive: true });
      button.addEventListener('click', () => {
         window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      updateVisibility();
   }

})();
