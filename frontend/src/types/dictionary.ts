interface Navbar {
  "hamburger-screen-reader": string;
  links: string[][];
  search: string;
  login: string;
  "avatar-screen-reader": string;
}

export interface LanguagesDictionary {
  navbar: Navbar;
}
