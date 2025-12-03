export default function ProfileBox() {
  // Inline styles (objek)
  const boxStyle = {
    padding: 20,
    backgroundColor: "#e2e8f0",
    borderRadius: 12,
    border: "2px solid #94a3b8",
    marginBottom: 20
  };

  const nameStyle = {
    color: "blue",
    fontWeight: "bold",
    fontSize: 20,
  };

  const descStyle = {
    color: "#475569",
    fontSize: 14,
    marginTop: 8
  };

  return (
    <div style={boxStyle}>
      <h2 style={nameStyle}>Fharel</h2>
      <p style={descStyle}>Belajar React menggunakan Inline Styles.</p>
    </div>
  );
}
