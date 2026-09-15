/* ============================================================
   SITE.JS — your name, about page, and contact details.
   Edit the text between the quote marks. Save. Refresh.
   ============================================================ */

const SITE = {

  // ---- Header / hero -------------------------------------------------
  name: "Your Name",
  tagline: "Mechanical and aerospace engineering projects, from first sketch to tested hardware.",

  // The four cells in the title block under your name.
  // Keep labels short — they sit in a narrow column.
  titleBlock: [
    { label: "Discipline", value: "Mechanical Eng." },
    { label: "Based in",   value: "New Jersey, USA" },
    { label: "Projects",   value: "06" },
    { label: "Updated",    value: "Sept 2026" }
  ],

  // ---- About page ----------------------------------------------------
  about: {
    // A portrait or a photo of you in the lab/shop. Drop the file in
    // /images and put the filename here. Leave as "" for no photo.
    photo: "images/portrait.jpg",
    photoCaption: "In the machine shop, spring 2026.",

    // Each string below becomes its own paragraph.
    paragraphs: [
      "Write two or three short paragraphs here. Start with what you build and why it interests you — the specific problem or system that pulled you into engineering in the first place.",
      "Use the second paragraph for where you are now: your degree and school, the lab or team you work with, and the kinds of problems you want to be handed next. Be concrete. A reader skimming for thirty seconds should come away knowing what you would be good at.",
      "Close with something human. A build you do on weekends, a machine you like disproportionately, what you are teaching yourself right now."
    ],

    // Skills grouped into columns. Add or remove groups freely.
    skills: [
      { group: "Design",      items: ["SolidWorks", "Fusion 360", "GD&T", "Sheet metal", "DFM"] },
      { group: "Analysis",    items: ["ANSYS Fluent", "MATLAB", "Simulink", "FEA", "CFD"] },
      { group: "Build",       items: ["3D printing", "Mill and lathe", "Composite layup", "Soldering"] },
      { group: "Code",        items: ["Python", "C++", "Arduino", "ROS", "Git"] }
    ],

    // Optional timeline. Delete the whole array to hide this section.
    timeline: [
      { when: "2026",      what: "B.S. Mechanical Engineering — expected" },
      { when: "2025",      what: "Propulsion intern, add company name" },
      { when: "2024",      what: "Joined the rocketry team as a structures lead" }
    ]
  },

  // ---- Contact page --------------------------------------------------
  contact: {
    email: "you@example.com",
    // Put your PDF in the /files folder and match the name here.
    resume: "files/resume.pdf",
    resumeNote: "Two pages, updated September 2026.",
    blurb: "I read everything that comes in. Internships, research positions, or a question about any project on this site — all welcome.",
    // Delete any line you do not want shown.
    links: [
      { label: "LinkedIn", url: "https://linkedin.com/in/yourhandle" },
      { label: "GitHub",   url: "https://github.com/yourhandle" }
    ]
  }
};
