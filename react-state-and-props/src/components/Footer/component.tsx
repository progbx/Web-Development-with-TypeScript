interface FooterProps {
  header?: string;
}

function Footer({ header = "Footer Header" }: FooterProps) {
  return (
    <footer>
      <h1>{header}</h1>
    </footer>
  );
}

export default Footer;
