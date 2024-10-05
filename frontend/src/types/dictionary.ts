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
}

export interface LanguagesDictionary {
  navbar: Navbar;
  homePage: HomePage;
}
