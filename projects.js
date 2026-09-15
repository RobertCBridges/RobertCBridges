/* ============================================================
   PROJECTS.JS — one entry per project sheet.

   TO ADD A PROJECT: copy any block between { and }, paste it at
   the end of the list before the closing ], and change the text.
   Sheet numbers and navigation update themselves.

   TO REORDER: cut and paste whole blocks.
   TO HIDE ONE: add   hidden: true,   inside its block.

   FIELDS
   id        short, lowercase, no spaces. Becomes the page address.
   title     shown in the navigation and as the sheet heading.
   subtitle  one line under the title.
   specs     the title-block cells. Use any labels you like.
   summary   the opening paragraph. Keep it to a few sentences.
   sections  headed blocks of body text. Add as many as you want.
   highlights short bullets — results, numbers, outcomes.
   images    figures. Put files in /images and match the filename.
   links     optional buttons (repo, paper, video, drawings).
   ============================================================ */

const PROJECTS = [

  /* ---------------------------------------------------------- 1 */
  {
    id: "foca",
    title: "F.O.C.A",
    subtitle: "Replace this line with what F.O.C.A. stands for and what it does.",
    specs: [
      { label: "Type",     value: "Team project" },
      { label: "Role",     value: "Your role" },
      { label: "Duration", value: "Add months" },
      { label: "Tools",    value: "SolidWorks, Python" }
    ],
    summary: "Open with the problem in plain words: what needed to exist, why nothing available solved it, and what you built instead. Two or three sentences is enough — the detail belongs further down.",
    sections: [
      {
        heading: "Design approach",
        body: "Describe the path from requirement to concept. What constraints did you fix first, and what did you deliberately leave open? Note the tradeoff that mattered most and how you settled it."
      },
      {
        heading: "Build and testing",
        body: "How it came together and how you proved it worked. Test setup, instrumentation, what the data showed. Include the failure that taught you something — reviewers read that part closely."
      }
    ],
    highlights: [
      "A measured result with a number in it",
      "Something you designed or machined yourself",
      "A problem you found and fixed"
    ],
    images: [
      { src: "images/foca-1.jpg", caption: "CAD assembly, exploded view." },
      { src: "images/foca-2.jpg", caption: "Machined housing before assembly." },
      { src: "images/foca-3.jpg", caption: "Bench test setup." }
    ],
    links: []
  },

  /* ---------------------------------------------------------- 2 */
  {
    id: "van-allen-belts",
    title: "Van Allen Belts",
    subtitle: "One line on the radiation-environment question you set out to answer.",
    specs: [
      { label: "Type",     value: "Research" },
      { label: "Role",     value: "Your role" },
      { label: "Duration", value: "Add months" },
      { label: "Tools",    value: "MATLAB, Python" }
    ],
    summary: "State the scientific or engineering question first, then your approach to it. If this fed into a spacecraft design, a shielding estimate, or an orbit selection, say so here.",
    sections: [
      {
        heading: "Model and method",
        body: "Which model or dataset you worked from, what you simulated, and the assumptions you accepted. Be explicit about the limits — knowing where your model stops being valid reads as maturity."
      },
      {
        heading: "Findings",
        body: "What the analysis produced and what it implies for hardware. Point the reader at the figure that carries the argument."
      }
    ],
    highlights: [
      "Flux or dose figure you calculated",
      "Orbit or altitude range studied",
      "Design consequence that followed"
    ],
    images: [
      { src: "images/van-allen-1.jpg", caption: "Modeled particle flux against altitude." },
      { src: "images/van-allen-2.jpg", caption: "Orbit trace through the inner belt." }
    ],
    links: []
  },

  /* ---------------------------------------------------------- 3 */
  {
    id: "bat-robot",
    title: "Bat Robot",
    subtitle: "One line on the flapping or echolocation behavior you were chasing.",
    specs: [
      { label: "Type",     value: "Robotics" },
      { label: "Role",     value: "Your role" },
      { label: "Duration", value: "Add months" },
      { label: "Tools",    value: "Fusion 360, Arduino" }
    ],
    summary: "Say what the robot does and which part of the biology you actually copied. Biomimetic projects live or die on that choice, so make it the first thing a reader learns.",
    sections: [
      {
        heading: "Mechanism",
        body: "The linkage, actuation, and structure. Wing membrane material, joint count, how you got the motion you wanted out of the motors you had."
      },
      {
        heading: "Control and results",
        body: "Sensing, control loop, and what it managed to do. Flapping frequency, lift measured, distance covered, obstacles avoided — whatever you recorded."
      }
    ],
    highlights: [
      "Wingspan and mass",
      "Flapping frequency achieved",
      "Lift or flight time measured"
    ],
    images: [
      { src: "images/bat-robot-1.jpg", caption: "Wing linkage, printed prototype." },
      { src: "images/bat-robot-2.jpg", caption: "Membrane tensioning test." },
      { src: "images/bat-robot-3.jpg", caption: "Full assembly on the test rig." }
    ],
    links: []
  },

  /* ---------------------------------------------------------- 4 */
  {
    id: "focus-glasses",
    title: "Focus Glasses",
    subtitle: "One line on who wears them and what changes when they do.",
    specs: [
      { label: "Type",     value: "Wearable" },
      { label: "Role",     value: "Your role" },
      { label: "Duration", value: "Add months" },
      { label: "Tools",    value: "CAD, electronics" }
    ],
    summary: "Lead with the user and the need. Wearables are judged on fit, weight, and whether anyone would put them on twice, so bring those in early.",
    sections: [
      {
        heading: "Hardware",
        body: "Optics or electronics, frame design, power, and how you kept the mass on the right side of comfortable. Note what you had to shrink and what it cost you."
      },
      {
        heading: "Testing with people",
        body: "How you evaluated it. Even an informal trial with a handful of users is worth writing up — say what you measured and what you changed afterward."
      }
    ],
    highlights: [
      "Total mass on the head",
      "Battery life per charge",
      "Result from user testing"
    ],
    images: [
      { src: "images/focus-glasses-1.jpg", caption: "Frame iterations, first through fourth print." },
      { src: "images/focus-glasses-2.jpg", caption: "Electronics laid out before integration." }
    ],
    links: []
  },

  /* ---------------------------------------------------------- 5 */
  {
    id: "spin-wheel",
    title: "Spin Wheel",
    subtitle: "One line on what spins, how fast, and what it is for.",
    specs: [
      { label: "Type",     value: "Mechanical" },
      { label: "Role",     value: "Your role" },
      { label: "Duration", value: "Add months" },
      { label: "Tools",    value: "SolidWorks, FEA" }
    ],
    summary: "Describe the machine and the requirement it had to meet. If it stores energy, balances a system, or drives something else, put that up front.",
    sections: [
      {
        heading: "Analysis",
        body: "Rotational dynamics, bearing selection, balancing, and the stress case that sized the part. Say which load case governed and what safety factor you carried."
      },
      {
        heading: "Fabrication",
        body: "How it was made and what the shop realities forced you to change between the model and the metal."
      }
    ],
    highlights: [
      "Maximum tested speed",
      "Factor of safety at that speed",
      "Balance tolerance achieved"
    ],
    images: [
      { src: "images/spin-wheel-1.jpg", caption: "Stress plot at maximum speed." },
      { src: "images/spin-wheel-2.jpg", caption: "Finished wheel on the balancing fixture." }
    ],
    links: []
  },

  /* ---------------------------------------------------------- 6 */
  {
    id: "airfoil-design",
    title: "Airfoil Design",
    subtitle: "One line on the flight regime and the performance you optimized for.",
    specs: [
      { label: "Type",     value: "Aerodynamics" },
      { label: "Role",     value: "Your role" },
      { label: "Duration", value: "Add months" },
      { label: "Tools",    value: "XFOIL, ANSYS Fluent" }
    ],
    summary: "Give the design point — Reynolds number, target lift coefficient, the aircraft or application — and say what you were trading against what.",
    sections: [
      {
        heading: "Optimization",
        body: "Baseline section, the parameters you varied, and how you searched. Explain why the winning shape wins rather than only reporting that it did."
      },
      {
        heading: "Validation",
        body: "CFD setup, mesh and turbulence model, and any wind-tunnel comparison. Where the panel method and the solver disagreed, say which one you trusted and why."
      }
    ],
    highlights: [
      "Lift-to-drag ratio at the design point",
      "Improvement over the baseline section",
      "Stall angle and behavior"
    ],
    images: [
      { src: "images/airfoil-1.jpg", caption: "Section geometry against the baseline." },
      { src: "images/airfoil-2.jpg", caption: "Pressure contours at the design angle of attack." },
      { src: "images/airfoil-3.jpg", caption: "Lift and drag polars." }
    ],
    links: []
  }

  /* ---- Paste a new project block here, after a comma ---- */

];
