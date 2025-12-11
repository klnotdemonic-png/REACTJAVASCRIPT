import ProfileBox from "./components/Profilebox";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Contoh Inline Styles React</h1>

      {/* Tampilkan dua elemen (syarat tugas) */}
      <ProfileBox />
      <ProfileBox />
    </div>
  );
}
