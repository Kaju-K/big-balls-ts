interface Navbar {
  "hamburger-screen-reader": string;
  links: Array<{ text: string; link: string; icon: string }>;
  search: string;
  login: string;
  "languages-screen-reader": string;
  "avatar-screen-reader": string;
}

export interface LanguagesDictionary {
  navbar: Navbar;
}
