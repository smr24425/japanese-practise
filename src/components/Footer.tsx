const Footer: React.FC = () => {
  return (
    <footer
      style={{
        textAlign: "center",
        marginTop: 32,
        color: "#000",
        fontSize: 12,
        padding: 8,
      }}
    >
      © {new Date().getFullYear()} smr24425. All rights reserved.
    </footer>
  );
};

export default Footer;
