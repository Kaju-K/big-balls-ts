interface Navbar {
  "hamburger-screen-reader": string;
  links: Array<{ text: string; link: string; icon: string }>;
  search: string;
  login: string;
  "languages-screen-reader": string;
  "avatar-screen-reader": string;
}

interface HomePage {
  heroSection: {
    title: {
      firstPart: string;
      secondPart: string;
    };
    subtitle: string;
    formPlaceholder: string;
    login: string;
    signup: string;
  };
  sectionKnowMore: {
    title: string;
    subtitle: string;
    text: string;
    button: string;
  };
  sectionCreateLeague: {
    title: string;
    subtitle: string;
    text: string;
    createButton: string;
    joinButton: string;
  };
}

export interface LanguagesDictionary {
  navbar: Navbar;
  homePage: HomePage;
}
