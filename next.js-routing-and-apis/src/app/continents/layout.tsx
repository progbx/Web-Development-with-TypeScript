import NavMenu from "../ui/nav-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavMenu />
      {children}
    </>
  );
}
