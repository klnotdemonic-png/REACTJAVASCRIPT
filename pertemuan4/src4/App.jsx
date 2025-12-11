import AlertBox from "./components/AlertBox";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Contoh Dynamic Styling dengan CSS Modules</h1>

      <AlertBox type="success">Data berhasil disimpan!</AlertBox>

      <AlertBox type="warning">Periksa kembali input Anda.</AlertBox>

      <AlertBox type="error">Terjadi kesalahan pada server!</AlertBox>
    </div>
  );
}
