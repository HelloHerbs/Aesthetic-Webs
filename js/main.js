(function () {
  "use strict";
  var S = window.SITE;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (v) { var d = document.createElement("div"); d.textContent = v == null ? "" : v; return d.innerHTML; };
  var peso = function (n) { return "₱" + Number(n).toLocaleString("en-PH"); };
  var safeUrl = function (u) { return /^(https?:\/\/|assets\/|\.\/)/i.test(u) ? u : ""; };

  /* ---------- Services ---------- */
  $("#services-list").innerHTML = S.services.map(function (s) {
    return '<div class="svc"><h3>' + esc(s.name) + "</h3><p>" + esc(s.desc) + '</p><div class="price"><small>Starting at</small><strong>' +
      peso(s.price) + "</strong>" + (s.unit ? " <small style='display:inline'>" + esc(s.unit) + "</small>" : "") + "</div></div>";
  }).join("");
  $("#pricing-note").textContent = S.pricingNote;

  /* ---------- Projects ---------- */
  function frame(p) {
    var inner = p.image
      ? '<img src="' + esc(safeUrl(p.image)) + '" alt="Screenshot of the ' + esc(p.name) + ' website" loading="lazy" width="1600" height="1000">'
      : '<div class="ph"><p><strong>Preview placeholder</strong><br>Add a screenshot to assets/ and set <code>image</code> in js/config.js</p></div>';
    var mobile = p.mobileImage
      ? '<div class="m"><img src="' + esc(safeUrl(p.mobileImage)) + '" alt="Mobile view of the ' + esc(p.name) + ' website" loading="lazy"></div>' : "";
    return '<div class="shot"><div class="browser"><div class="top"><span></span><span></span><span></span><em></em></div>' + inner + "</div>" + mobile + "</div>";
  }
  $("#projects").innerHTML = S.projects.map(function (p) {
    var link = p.url && safeUrl(p.url)
      ? '<a class="btn ghost" href="' + esc(p.url) + '" target="_blank" rel="noopener">View live project</a>' : "";
    return '<article class="project">' + frame(p) + '<div class="proj-info"><p class="cat">' + esc(p.category) + "</p><h3>" + esc(p.name) +
      "</h3><p>" + esc(p.description) + '</p><ul class="tags" aria-label="Services provided">' +
      p.services.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
      (p.placeholder ? '<p class="flag">Placeholder details. Replace in js/config.js.</p>' : "") + link + "</div></article>";
  }).join("");

  /* ---------- Contact details & footer ---------- */
  var items = [];
  items.push('<li><a href="mailto:' + esc(S.email) + '">' + esc(S.email) + "</a></li>");
  if (S.phone) items.push('<li><a href="tel:' + esc(S.phone.replace(/\s/g, "")) + '">' + esc(S.phone) + "</a></li>");
  if (S.location) items.push("<li>" + esc(S.location) + "</li>");
  Object.keys(S.social).forEach(function (k) {
    if (S.social[k]) items.push('<li><a href="' + esc(S.social[k]) + '" target="_blank" rel="noopener">' + k.charAt(0).toUpperCase() + k.slice(1) + "</a></li>");
  });
  $("#foot-contact").innerHTML = items.join("");
  var dm = $("#direct-mail"); dm.href = "mailto:" + S.email; dm.textContent = S.email;
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Nav ---------- */
  var btn = $(".menu-btn"), nav = $("#nav"), header = $(".site-header");
  function setMenu(open) { nav.classList.toggle("open", open); btn.setAttribute("aria-expanded", open); btn.textContent = open ? "Close" : "Menu"; }
  btn.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); btn.focus(); } });
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* "Request a Quote" preselects nothing but jumps to the form (handled by anchor). */

  /* ---------- Inquiry form ---------- */
  var form = $("#inquiry"), status = $("#status"), submit = $("#submit");
  var rules = {
    name: function (v) { return v.trim() ? "" : "Please enter your name."; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address."; },
    type: function (v) { return v ? "" : "Please choose a website type."; },
    budget: function (v) { return v ? "" : "Please choose a budget range."; },
    timeline: function (v) { return v ? "" : "Please choose a timeline."; },
    message: function (v) { return v.trim().length >= 20 ? "" : "Please tell us a little more (at least 20 characters)."; }
  };
  function check(name) {
    var el = form.elements[name], msg = rules[name](el.value);
    el.setAttribute("aria-invalid", msg ? "true" : "false");
    if (msg) el.setAttribute("aria-describedby", "e-" + name); else el.removeAttribute("aria-describedby");
    $("#e-" + name).textContent = msg;
    return !msg;
  }
  Object.keys(rules).forEach(function (n) { form.elements[n].addEventListener("blur", function () { check(n); }); });

  function show(kind, html) { status.className = "status " + kind; status.innerHTML = html; }
  function summary(d) {
    return ["Name: " + d.name, "Email: " + d.email, "Business: " + (d.business || "-"), "Website needed: " + d.type,
      "Budget: " + d.budget, "Timeline: " + d.timeline, "", d.message].join("\n");
  }
  function mailto(d) {
    return "mailto:" + S.email + "?subject=" + encodeURIComponent("Project inquiry from " + d.name) + "&body=" + encodeURIComponent(summary(d));
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var bad = Object.keys(rules).filter(function (n) { return !check(n); });
    if (bad.length) { form.elements[bad[0]].focus(); show("bad", "Please fix the highlighted fields and send again."); return; }
    var d = {}; Object.keys(rules).concat("business").forEach(function (n) { d[n] = form.elements[n].value; });

    if (S.formMode === "mailto") {
      show("ok", "Your email app should open with your inquiry ready to send. If it does not, write to <a href='mailto:" + esc(S.email) + "'>" + esc(S.email) + "</a>.");
      window.location.href = mailto(d); return;
    }
    if (form.elements._honey.value) return; /* bot */
    submit.disabled = true; submit.textContent = "Sending…"; show("ok", "Sending your inquiry…");
    var payload = Object.assign({ _subject: "New project inquiry — Aesthetic Webs", _template: "table", _captcha: "false" }, d);
    fetch("https://formsubmit.co/ajax/" + encodeURIComponent(S.email), {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload)
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok || String(j.success) === "false") throw new Error(j.message || "failed"); return j; }); })
      .then(function () { form.reset(); show("ok", "<strong>Thank you, " + esc(d.name) + ".</strong> Your inquiry was sent. We will reply to " + esc(d.email) + "."); })
      .catch(function () { show("bad", "We could not send your inquiry. Please try again, or <a href='" + esc(mailto(d)) + "'>send it by email instead</a>."); })
      .then(function () { submit.disabled = false; submit.textContent = "Send inquiry"; });
  });
})();
