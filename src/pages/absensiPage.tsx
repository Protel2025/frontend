// src/pages/AbsensiPage.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"; 

// --- KONFIGURASI BACKEND ---
const API_BASE_URL = "http://localhost:5000";
// --------------------------

// Definisikan struktur data yang sesuai dengan log_absensi dari backend Flask
type AbsensiLog = {
  id: number;
  nama: string;
  nomorVest: string; // nomorVest dari DB
  jabatan: string;
  waktu: string; // Sudah di-format di backend
  
  // Field APD Detail (Diisi dummy/berdasarkan apdStatusUmum dari backend)
  helm: boolean;
  vest: boolean;
  wajah: boolean; 
  apdStatusUmum: boolean; 
  
  fotoBase64: string; // Base64 string dari DB
  status: "Aman" | "Melanggar"; // Status yang sudah ditentukan di backend
};

export default function AbsensiPage() {
  const [absensiData, setAbsensiData] = useState<AbsensiLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLivenessRunning, setIsLivenessRunning] = useState(false);
  const [livenessMessage, setLivenessMessage] = useState<string | null>(null);

  // --- 1. Fungsi Fetch Data Log Absensi dari API ---
  const fetchAbsensiLogs = async () => {
    setLoading(true);
    setLivenessMessage(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/absensi/log`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: AbsensiLog[] = await response.json();
      setAbsensiData(data);
    } catch (error) {
      console.error("Gagal mengambil log absensi dari backend:", error);
      setAbsensiData([]);
      setLivenessMessage("❌ Gagal terhubung ke server backend (Flask). Pastikan server berjalan di port 5000.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbsensiLogs();
  }, []); 

  // --- 2. Fungsi untuk Memulai Liveness/Absensi via API ---
  const startLivenessProcess = async () => {
    if (isLivenessRunning) return;
    setIsLivenessRunning(true);
    setLivenessMessage("🎥 Memulai proses absensi... Cek jendela kamera.");

    try {
        const response = await fetch(`${API_BASE_URL}/api/start-liveness`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (response.ok && result.status === 'success') {
            setLivenessMessage("✅ Proses Liveness dimulai di server. Tunggu hingga kamera tertutup...");
            
            // Polling Status: Untuk mengetahui kapan proses di backend selesai
            await pollLivenessStatus(); 

        } else if (response.status === 409) {
            setLivenessMessage("⚠️ Proses Liveness sudah berjalan. Tunggu sebentar.");
        } else {
            setLivenessMessage(`❌ Gagal memulai: ${result.message || 'Unknown error'}`);
            console.error("Liveness Start Error:", result);
        }

    } catch (error) {
        console.error("Gagal mengirim request Liveness:", error);
        setLivenessMessage("❌ Error jaringan saat mencoba memulai absensi.");
    } finally {
        setIsLivenessRunning(false);
        fetchAbsensiLogs(); // Muat ulang log setelah proses selesai/gagal
    }
  };
  
  // Fungsi Polling untuk memantau status Liveness di backend
  const pollLivenessStatus = async () => {
      let statusResponse;
      let statusData;
      
      // Tunggu minimal 1 detik sebelum polling pertama
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      do {
          await new Promise(resolve => setTimeout(resolve, 2000)); // Cek setiap 2 detik
          statusResponse = await fetch(`${API_BASE_URL}/api/status`);
          statusData = await statusResponse.json();
          
          if (statusData.liveness_status.running) {
              setLivenessMessage(`🎥 Proses berjalan. Status: ${statusData.liveness_status.last_result}`);
          }
          
      } while (statusData.liveness_status.running);

      setLivenessMessage(`🎉 Proses SELESAI. Hasil: ${statusData.liveness_status.last_result}`);
  };


  return (
    <div className="grid gap-10 mx-20 mt-15">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-white">Log Absensi Pekerja</h1>
        <Button 
            className="bg-[#00A040] hover:bg-[#008033] text-white text-lg px-6 py-3"
            onClick={startLivenessProcess}
            disabled={isLivenessRunning || loading}
        >
          {isLivenessRunning ? "🎥 Sedang Proses..." : "🔴 START ABSENSI (Liveness)"}
        </Button>
      </div>
      
      {/* Area Notifikasi Status Liveness */}
      {livenessMessage && (
          <div className={`p-4 rounded-lg font-medium text-lg ${livenessMessage.startsWith("❌") ? "bg-red-800 text-white" : livenessMessage.startsWith("✅") || livenessMessage.startsWith("🎉") ? "bg-green-700 text-white" : "bg-yellow-600 text-white"}`}>
              {livenessMessage}
          </div>
      )}
      
      {/* List Data Absensi */}
      {loading ? (
        <div className="text-center text-xl text-gray-400">Memuat data absensi...</div>
      ) : absensiData.length === 0 ? (
        <div className="text-center text-xl text-gray-400">Belum ada data absensi yang dicatat di database.</div>
      ) : (
        absensiData.map((row) => (
          <Card key={row.id} className="px-20 bg-[#464646] text-white">
            <div className="grid grid-cols-3 gap-4 items-center py-5">
              {/* Kolom 1: Checklist APD */}
              <div className="flex flex-col gap-2 text-lg">
                <p>
                  Helm:{" "}
                  <span className={row.helm ? "text-green-500" : "text-red-500"}>
                    {row.helm ? "✅ Ada" : "❌ Tidak Ada"}
                  </span>
                </p>
                <p>
                  Vest:{" "}
                  <span className={row.vest ? "text-green-500" : "text-red-500"}>
                    {row.vest ? "✅ Ada" : "❌ Tidak Ada"}
                  </span>
                </p>
                <p>
                  Wajah Dikenali:{" "}
                  <span className={row.wajah ? "text-green-500" : "text-red-500"}>
                    {row.wajah ? "✅ OK" : "❌ Gagal"}
                  </span>
                </p>
              </div>

              {/* Kolom 2: Data Deteksi */}
              <div className="flex flex-col gap-1">
                <p className="font-bold text-xl">{row.nama}</p>
                <p className="text-gray-300">Jabatan: {row.jabatan}</p>
                <p className="text-gray-300">Nomor Vest: {row.nomorVest}</p>
                <p className="text-gray-300">Jam Absensi: {row.waktu}</p>
                <p
                  className={
                    row.apdStatusUmum ? "text-green-500 font-semibold text-xl" : "text-red-500 font-semibold text-xl"
                  }
                >
                  Status APD: {row.apdStatusUmum ? "AMAN" : "MELANGGAR"}
                </p>
                <Link to={`/absensi/${row.id}`}>
                  <Button className="mt-4 bg-[#4457FF] hover:bg-[#3245E0] text-sm">
                    Lihat Detail Rekaman
                  </Button>
                </Link>
              </div>

              {/* Kolom 3: Foto */}
              <div className="flex justify-center">
                <img
                  // Menampilkan Base64 string sebagai gambar
                  src={`data:image/jpeg;base64,${row.fotoBase64}`} 
                  alt={`Rekaman ${row.nama}`}
                  className="w-full h-auto max-h-64 object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}