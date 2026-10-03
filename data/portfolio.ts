export type Locale = "fr" | "en";

export type NavItem = {
  label: string;
  href: string;
};

export type Cta = {
  label: string;
  href: string;
};

export type Stat = {
  label: string;
  value: string;
  note: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  organization: string;
  description: string;
};

export type Project = {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  image?: string;
  imageFit?: "cover" | "contain";
  featured?: boolean;
  explain?: {
    intro: string;
    points: string[];
    outro: string;
  };
};

export type SkillGroup = {
  title: string;
  description: string;
  items: string[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "dribbble" | "twitter" | "mail";
};

export type PhotoFrame = {
  initials: string;
  alt: string;
  caption: string;
  src?: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  status: string;
  badges: string[];
  primaryCta: Cta;
  secondaryCta: Cta;
  photo: PhotoFrame;
  stats: Stat[];
};

export type AboutContent = {
  eyebrow: string;
  title: string;
  description: string;
  statsLabel: string;
  timelineLabel: string;
  stats: Stat[];
  timeline: TimelineItem[];
};

export type ProjectsContent = {
  eyebrow: string;
  title: string;
  description: string;
  allLabel: string;
};

export type SkillsContent = {
  eyebrow: string;
  title: string;
  description: string;
};

export type TestimonialsContent = {
  eyebrow: string;
  title: string;
  description: string;
};

export type ContactContent = {
  eyebrow: string;
  title: string;
  description: string;
  form: {
    name: string;
    email: string;
    subject: string;
    message: string;
    button: string;
    pending: string;
    success: string;
    error: string;
    helper: string;
  };
  emailLabel: string;
  locationLabel: string;
  availabilityLabel: string;
  socialsLabel: string;
};

export type FooterContent = {
  note: string;
  whatsappLabel: string;
  whatsappCta: string;
  whatsappMessage: string;
};

export type LocaleContent = {
  nav: NavItem[];
  hero: HeroContent;
  about: AboutContent;
  projectsSection: ProjectsContent;
  projects: Project[];
  skillsSection: SkillsContent;
  skills: SkillGroup[];
  testimonialsSection: TestimonialsContent;
  testimonials: Testimonial[];
  contact: ContactContent;
  footer: FooterContent;
};

export type PortfolioData = {
  identity: {
    name: string;
    role: string;
    tagline: string;
    email: string;
    whatsappNumber: string;
    location: string;
    availability: string;
    photo: PhotoFrame;
  };
  locales: Record<Locale, LocaleContent>;
  socials: SocialLink[];
};

export const portfolioData: PortfolioData = {
  identity: {
    name: "Baliki Essohanam",
    role: "Développeur Full Stack",
    tagline:
      "Développeur web & mobile : je transforme les idées en applications robustes avec Laravel, Flutter, Spring Boot et Next.js, de l'idée jusqu'au déploiement.",
    email: "jeanessoy@gmail.com",
    whatsappNumber: "22891450538",
    location: "Lomé, Togo",
    availability: "Ouvert aux stages, projets freelance et collaborations",
    photo: {
      initials: "BE",
      alt: "Photo de Baliki Essohanam, développeur full stack",
      caption: "Baliki Essohanam — Développeur Full Stack basé à Lomé.",
      src: "/profile.jpeg",
    },
  },
  locales: {
    fr: {
      nav: [
        { label: "Accueil", href: "#home" },
        { label: "À propos", href: "#about" },
        { label: "Réalisations", href: "#projects" },
        { label: "Compétences", href: "#skills" },
        { label: "Contact", href: "#contact" },
      ],
      hero: {
        eyebrow: "Développeur Full Stack",
        title: "Des idées aux applications web et mobiles modernes et performantes.",
        highlight: "applications web et mobiles",
        description:
          "Diplômé de l'IAI-Togo, je conçois des sites web et des applications mobiles avec Laravel, Flutter, Spring Boot et Next.js, en mettant l'accent sur la qualité, la robustesse et l'expérience utilisateur.",
        status: "Disponible pour de nouveaux projets",
        badges: ["Laravel", "Spring Boot", "Flutter", "Next.js"],
        primaryCta: {
          label: "Me contacter",
          href: "#contact",
        },
        secondaryCta: {
          label: "Voir mes projets",
          href: "#projects",
        },
        photo: {
          initials: "BE",
          alt: "Photo de Baliki Essohanam, développeur full stack",
          caption: "Baliki Essohanam, développeur full stack basé à Lomé.",
          src: "/profile.jpeg",
        },
        stats: [
          { label: "Années d'études", value: "3", note: "en informatique à IAI-Togo" },
          { label: "Projets réalisés", value: "6+", note: "sites, apps web et mobiles" },
          { label: "Technos maîtrisées", value: "6+", note: "Laravel, Flutter, Next.js, SQL" },
        ],
      },
      about: {
        eyebrow: "À propos",
        title: "Diplômé en informatique, passionné par le développement web & mobile",
        description:
          "Diplômé de l'IAI-Togo, je développe des projets concrets avec rigueur et méthode. Mon objectif : transformer chaque idée en application web ou mobile utile, bien conçue, sécurisée et performante.",
        statsLabel: "Indicateurs",
        timelineLabel: "Parcours",
        stats: [
          { label: "Université", value: "IAI-Togo", note: "Institut Africain d'Informatique" },
          { label: "Projets GitHub", value: "6+", note: "disponibles sur GitHub" },
          { label: "Disponibilité", value: "Rapide", note: "stage, freelance, collaborations" },
        ],
        timeline: [
          {
            year: "2026",
            title: "Diplômé en Informatique",
            organization: "IAI-Togo",
            description:
              "Titulaire d'une licence en informatique, avec une solide expérience en architectures modernes et projets d'envergure.",
          },
          {
            year: "2024 - 2025",
            title: "L2 Informatique",
            organization: "IAI-Togo",
            description:
              "Développement web, bases de données, algorithmique et programmation orientée objet.",
          },
          {
            year: "2023 - 2024",
            title: "L1 Informatique",
            organization: "IAI-Togo",
            description:
              "Fondamentaux de l'informatique, algorithmique et premiers projets de programmation.",
          },
        ],
      },
      projectsSection: {
        eyebrow: "Réalisations",
        title: "Projets et expériences",
        description:
          "Applications web et mobiles développées avec Laravel, Flutter, Spring Boot, Angular et Next.js.",
        allLabel: "Tous",
      },
      projects: [
        {
          title: "Repéto Mobile",
          category: "Mobile",
          description:
            "Projet mobile qui met en relation des parents et des répétiteurs grâce à un algorithme intelligent de mise en relation, avec planification des séances et une passerelle de paiement des séances.",
          technologies: ["Dart", "Flutter", "Firebase Auth", "Laravel", "Sanctum"],
          githubUrl: "https://github.com/essoygeo/repeto_mobile-master",
          image: "/repetomobile/repeto-4.jpeg",
          imageFit: "cover",
          featured: true,
          explain: {
            intro:
              "Repéto Mobile, c'est une application mobile qui met en relation les parents et les répétiteurs. Regarde, je t'explique sur le tableau !",
            points: [
              "C'est une app mobile de mise en relation entre parents et répétiteurs.",
              "Elle permet aux parents de trouver des répétiteurs de qualité et vérifiés.",
              "Un algorithme multicritère fait correspondre le profil du répétiteur aux besoins de l'enfant.",
              "Côté technique : Flutter & Dart pour le mobile, Laravel avec Sanctum pour l'API sécurisée.",
            ],
            outro: "Voilà ! Une belle plateforme pour faciliter le soutien scolaire. 👏",
          },
        },
        {
          title: "GestionDemandes",
          category: "ERP",
          description:
            "ERP conçu pour une société locale afin de gérer les demandes de ressources matérielles et logicielles.",
          technologies: ["Laravel", "PHP", "MySQL"],
          githubUrl: "https://github.com/essoygeo/GestionDemandes",
          image: "/GestionDemande.png",
          imageFit: "cover",
          featured: true,
          explain: {
            intro:
              "GestionDemandes, c'est un ERP interne pour une société. Je t'explique ce qu'il fait !",
            points: [
              "Un ERP conçu pour une société locale afin de numériser et centraliser les demandes internes.",
              "Il gère les demandes de ressources matérielles et logicielles (matériel, licences, accès...).",
              "Chaque demande suit un parcours : création, validation, suivi du statut.",
              "Développé avec Laravel, PHP et MySQL : une API propre et une base de données fiable.",
            ],
            outro: "Un vrai outil de productivité pour l'entreprise. 🚀",
          },
        },
        {
          title: "EgaBank",
          category: "Full Stack",
          description:
            "Application bancaire permettant de simuler des transactions financières — retraits et crédits — avec gestion des comptes et des utilisateurs.",
          technologies: ["Java EE", "Spring Boot", "Angular", "PostgreSQL"],
          githubUrl: "https://github.com/essoygeo/banqueEga",
          image: "/EGABANK.png",
          imageFit: "cover",
          explain: {
            intro:
              "EgaBank, c'est une application bancaire complète. Laisse-moi te la présenter !",
            points: [
              "Une application bancaire permettant de simuler des transactions financières.",
              "On y gère des retraits et des crédits sur les comptes des utilisateurs.",
              "Une vraie gestion des comptes et des utilisateurs, comme une mini-banque.",
              "Stack moderne : Java EE & Spring Boot côté back, Angular côté front, PostgreSQL pour les données.",
            ],
            outro: "Une architecture full stack solide, digne d'une vraie banque ! 🏦",
          },
        },
      ],
      skillsSection: {
        eyebrow: "Expertises",
        title: "Mes compétences techniques",
        description:
          "Un aperçu des technologies et des outils que j'utilise pour concevoir et livrer des projets web et mobiles.",
      },
      skills: [
        {
          title: "Backend & Données",
          description: "Services web, API, bases de données et BaaS.",
          items: ["Laravel", "Filament", "Python", "Spring Boot", "MySQL", "PostgreSQL"],
        },
        {
          title: "Frontend & Mobile",
          description: "Interfaces web réactives et applications mobiles.",
          items: ["HTML & CSS", "JavaScript", "Next.js", "Flutter", "Dart", "Tailwind CSS"],
        },
        {
          title: "Outils & Pratiques",
          description: "Méthodes de travail et outillage du développeur.",
          items: ["Git & GitHub", "VS Code", "Linux", "Figma", "Agile / Scrum", "Déploiement"],
        },
      ],
      testimonialsSection: {
        eyebrow: "Recommandations",
        title: "Témoignages",
        description: "Des retours d'enseignants et de collaborateurs sur mon travail.",
      },
      testimonials: [
        {
          quote:
            "Baliki est rigoureux, curieux et toujours prêt à apprendre. Il code proprement et va au bout de ses projets.",
          name: "M. Komla Agbeko",
          role: "Enseignant",
          company: "IAI-Togo",
        },
        {
          quote:
            "Un développeur sérieux avec qui il est facile de collaborer : il comprend vite le besoin et livre un travail de qualité.",
          name: "Aïcha Salifou",
          role: "Développeuse",
          company: "Collègue de promo",
        },
      ],
      contact: {
        eyebrow: "Contact",
        title: "Travaillons ensemble",
        description:
          "Une idée de projet, une opportunité de stage ou une collaboration ? Écrivez-moi, je réponds rapidement.",
        form: {
          name: "Nom",
          email: "Email",
          subject: "Sujet",
          message: "Décrivez votre projet",
          button: "Envoyer",
          pending: "Envoi...",
          success: "Message envoyé avec succès. Je vous répondrai rapidement.",
          error: "Une erreur est survenue. Réessayez.",
          helper: "Vous pouvez aussi m'écrire directement sur WhatsApp ou LinkedIn.",
        },
        emailLabel: "Email",
        locationLabel: "Localisation",
        availabilityLabel: "Disponibilité",
        socialsLabel: "Réseaux",
      },
      footer: {
        note: "Portfolio de Baliki Essohanam — Développeur Full Stack.",
        whatsappLabel: "WhatsApp",
        whatsappCta: "Écrire sur WhatsApp",
        whatsappMessage:
          "Bonjour Baliki, je viens de voir ton portfolio et j'aimerais échanger avec toi.",
      },
    },
    en: {
      nav: [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Work", href: "#projects" },
        { label: "Skills", href: "#skills" },
        { label: "Contact", href: "#contact" },
      ],
      hero: {
        eyebrow: "Full Stack Developer",
        title: "Turning ideas into modern, high-performance web and mobile applications.",
        highlight: "web and mobile applications",
        description:
          "Graduate of IAI-Togo, I build websites and mobile apps with Laravel, Flutter, Spring Boot and Next.js, with a strong focus on quality and user experience.",
        status: "Available for new projects",
        badges: ["Laravel", "Spring Boot", "Flutter", "Next.js"],
        primaryCta: {
          label: "Contact me",
          href: "#contact",
        },
        secondaryCta: {
          label: "View my work",
          href: "#projects",
        },
        photo: {
          initials: "BE",
          alt: "Photo of Baliki Essohanam, full stack developer",
          caption: "Baliki Essohanam, full stack developer based in Lomé.",
          src: "/profile.jpeg",
        },
        stats: [
          { label: "Years of study", value: "3", note: "in computer science at IAI-Togo" },
          { label: "Projects built", value: "6+", note: "websites, web and mobile apps" },
          { label: "Techs mastered", value: "6+", note: "Laravel, Flutter, Next.js, SQL" },
        ],
      },
      about: {
        eyebrow: "About",
        title: "Computer science graduate, passionate about web & mobile development",
        description:
          "Graduate of IAI-Togo, I build hands-on projects with rigor and method. My goal: turn every idea into a useful, well-designed, secure and performant web or mobile app.",
        statsLabel: "Highlights",
        timelineLabel: "Timeline",
        stats: [
          { label: "University", value: "IAI-Togo", note: "African Institute of Computer Science" },
          { label: "GitHub projects", value: "6+", note: "available on GitHub" },
          { label: "Availability", value: "Fast", note: "internship, freelance, collaborations" },
        ],
        timeline: [
          {
            year: "2026",
            title: "Graduate — Computer Science (L3)",
            organization: "IAI-Togo",
            description:
              "Graduated with a degree in computer science, with experience in modern architectures and larger-scale projects.",
          },
          {
            year: "2024 - 2025",
            title: "2nd year (L2) Computer Science",
            organization: "IAI-Togo",
            description:
              "Web development, databases, algorithms and object-oriented programming.",
          },
          {
            year: "2023 - 2024",
            title: "1st year (L1) Computer Science",
            organization: "IAI-Togo",
            description:
              "Fundamentals of computer science, algorithms and first programming projects.",
          },
        ],
      },
      projectsSection: {
        eyebrow: "Work",
        title: "Projects & experience",
        description:
          "Web and mobile applications built with Laravel, Flutter, Spring Boot, Angular and Next.js.",
        allLabel: "All",
      },
      projects: [
        {
          title: "Repéto Mobile",
          category: "Mobile",
          description:
            "A mobile project connecting parents with tutors through a smart matching algorithm, with session scheduling and a payment gateway for sessions.",
          technologies: ["Dart", "Flutter", "Firebase Auth", "Laravel", "Sanctum"],
          githubUrl: "https://github.com/essoygeo/repeto_mobile-master",
          image: "/repetomobile/repeto-4.jpeg",
          imageFit: "cover",
          featured: true,
          explain: {
            intro:
              "Repéto Mobile is a mobile app that connects parents with tutors. Look, let me explain it on the board!",
            points: [
              "It's a mobile app for connecting parents and tutors.",
              "It lets parents find quality, verified tutors.",
              "A multi-criteria algorithm matches the tutor's profile to the child's needs.",
              "Tech side: Flutter & Dart for mobile, Laravel with Sanctum for the secure API.",
            ],
            outro: "There you go! A great platform to make tutoring easier. 👏",
          },
        },
        {
          title: "GestionDemandes",
          category: "ERP",
          description:
            "ERP built for a local company to manage requests for material and software resources.",
          technologies: ["Laravel", "PHP", "MySQL"],
          githubUrl: "https://github.com/essoygeo/GestionDemandes",
          image: "/GestionDemande.png",
          imageFit: "cover",
          featured: true,
          explain: {
            intro:
              "GestionDemandes is an internal ERP for a company. Let me tell you what it does!",
            points: [
              "An ERP built for a local company to digitize and centralize internal requests.",
              "It manages requests for material and software resources (hardware, licenses, access...).",
              "Each request follows a workflow: creation, validation, status tracking.",
              "Built with Laravel, PHP and MySQL: a clean API and a reliable database.",
            ],
            outro: "A real productivity tool for the company. 🚀",
          },
        },
        {
          title: "EgaBank",
          category: "Full Stack",
          description:
            "Banking application to simulate financial transactions — withdrawals and credits — with account and user management.",
          technologies: ["Java EE", "Spring Boot", "Angular", "PostgreSQL"],
          githubUrl: "https://github.com/essoygeo/banqueEga",
          image: "/EGABANK.png",
          imageFit: "cover",
          explain: {
            intro: "EgaBank is a complete banking application. Let me walk you through it!",
            points: [
              "A banking application to simulate financial transactions.",
              "It handles withdrawals and credits on user accounts.",
              "Real account and user management, just like a mini-bank.",
              "Modern stack: Java EE & Spring Boot on the back, Angular on the front, PostgreSQL for data.",
            ],
            outro: "A solid full stack architecture, worthy of a real bank! 🏦",
          },
        },
      ],
      skillsSection: {
        eyebrow: "Skills",
        title: "My technical skills",
        description:
          "An overview of the technologies and tools I use to design and deliver web and mobile projects.",
      },
      skills: [
        {
          title: "Backend & Data",
          description: "Web services, APIs, databases and BaaS.",
          items: ["Laravel", "Filament", "Python", "Spring Boot", "MySQL", "PostgreSQL"],
        },
        {
          title: "Frontend & Mobile",
          description: "Responsive web interfaces and mobile applications.",
          items: ["HTML & CSS", "JavaScript", "Next.js", "Flutter", "Dart", "Tailwind CSS"],
        },
        {
          title: "Tools & Practices",
          description: "Developer workflow and tooling.",
          items: ["Git & GitHub", "VS Code", "Linux", "Figma", "Agile / Scrum", "Deployment"],
        },
      ],
      testimonialsSection: {
        eyebrow: "Recommendations",
        title: "Testimonials",
        description: "Feedback from teachers and collaborators about my work.",
      },
      testimonials: [
        {
          quote:
            "Baliki is rigorous, curious and always ready to learn. He writes clean code and sees his projects through.",
          name: "Mr. Komla Agbeko",
          role: "Lecturer",
          company: "IAI-Togo",
        },
        {
          quote:
            "A serious developer who is easy to collaborate with: he understands the need quickly and delivers quality work.",
          name: "Aïcha Salifou",
          role: "Developer",
          company: "Classmate",
        },
      ],
      contact: {
        eyebrow: "Contact",
        title: "Let's work together",
        description:
          "A project idea, an internship opportunity or a collaboration? Write to me, I reply fast.",
        form: {
          name: "Name",
          email: "Email",
          subject: "Subject",
          message: "Describe your project",
          button: "Send",
          pending: "Sending...",
          success: "Message sent successfully. I'll get back to you soon.",
          error: "Something went wrong. Try again.",
          helper: "You can also reach me directly on WhatsApp or LinkedIn.",
        },
        emailLabel: "Email",
        locationLabel: "Location",
        availabilityLabel: "Availability",
        socialsLabel: "Socials",
      },
      footer: {
        note: "Portfolio of Baliki Essohanam — Full Stack Developer.",
        whatsappLabel: "WhatsApp",
        whatsappCta: "Message on WhatsApp",
        whatsappMessage: "Hi Baliki, I saw your portfolio and would like to talk with you.",
      },
    },
  },
  socials: [
    { label: "GitHub", href: "https://github.com/essoygeo", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jean-baliki-574197292/", icon: "linkedin" },
    { label: "Email", href: "mailto:jeanessoy@gmail.com", icon: "mail" },
  ],
};
