/* ==========================================================
   Aesthetic Webs — site configuration & content data.
   Edit this file to change prices, projects, contact info.
   ========================================================== */
window.SITE = {
  name: "Aesthetic Webs",

  /* ---- CONTACT FORM ----
     "formsubmit" -> sends the inquiry straight to `email` via FormSubmit.co (free, no backend).
                     FIRST TIME ONLY: submit one test inquiry from the live site, then open the
                     activation email FormSubmit sends to this address and click "Activate".
     "mailto"     -> opens the visitor's email app with the inquiry pre-filled (no service needed). */
  email: "cantosherbie@gmail.com",
  formMode: "formsubmit",

  /* Leave blank ("") to hide any of these. Nothing is shown until you fill it in. */
  phone: "",
  location: "Philippines",
  social: { facebook: "", instagram: "", linkedin: "" },

  /* ---- PRICING (indicative starting prices, PHP) ---- */
  pricingNote:
    "Prices are indicative starting rates and depend on project requirements. Domain registration, hosting, premium third-party services and additional features may be charged separately.",
  services: [
    { name: "Landing Page Design", desc: "A focused, professional single-page website for a business that needs to get online clearly and quickly.", price: 5000, unit: "" },
    { name: "Business Website Design", desc: "A more complete online presence with multiple pages, structured around what your customers look for.", price: 10000, unit: "" },
    { name: "Custom Website Development", desc: "For projects that need extra functionality, integrations or a more tailored experience.", price: 20000, unit: "" },
    { name: "Website Maintenance", desc: "Optional ongoing support for updates and routine upkeep after your site is live.", price: 1000, unit: "/ month" }
  ],

  /* ---- PORTFOLIO ----
     Add a project by copying one object into the list.
     `image`: path to a screenshot in /assets (e.g. "assets/my-project.webp"). Leave "" to show a labelled placeholder.
     `url`: live link. Leave "" and no button is shown.
     `placeholder: true` marks details you still need to replace. */
  projects: [
    {
      name: "Dice Board Game Cafe",
      category: "Cafe",
      description: "The first board game and card game cafe in Batangas City. ",
      services: ["Website design", "Development", "Mobile layout"],
      image: "assets/WebTest.jpeg",
      mobileImage: "",
      url: "https://helloherbs.github.io/Dice-Tower-Website/",
      placeholder: true
    }
  ]
};
