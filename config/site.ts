export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Produtos System",
  description: "Sistema de Gerenciamento de produtos",
  navItems: [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Produtos",
      href: "/produtos",
    },
  ],
  authItems: [
    {
      label: "Login",
      href: "/",
    },
    {
      label: "Registrar",
      href: "/register",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
