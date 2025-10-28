interface HeaderProps {
  header?: string;
}

function Header({ header = "Header Header" }: HeaderProps) {
  return (
    <header>
      <h1>{header}</h1>
    </header>
  );
}

export default Header;
