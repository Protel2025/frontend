// src/pages/MonitoringPage.tsx
import { useState } from "react"; // Import useState untuk mengelola state
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"; // Anggap ini utility class untuk menggabungkan classNames

// Definisi Tipe Data tetap
type CameraInfo = {
  id: number;
  name: string;
  status: "Online" | "Offline";
  location: string;
  peopleDetected: number;
};

type Violation = {
  id: number;
  nama: string;
  nomorVest: string;
  pelanggaran: string;
  status: "Ditindak" | "Belum Ditindak";
};

export default function MonitoringPage() {
  // Data kamera diperbanyak menjadi 4
  const cameras: CameraInfo[] = [
    { id: 1, name: "CCTV Gate 1", status: "Online", location: "Gate Utama", peopleDetected: 5 },
    { id: 2, name: "CCTV Area 2", status: "Offline", location: "Gudang", peopleDetected: 0 },
    { id: 3, name: "CCTV Loading Dock", status: "Online", location: "Area Bongkar Muat", peopleDetected: 2 },
    { id: 4, name: "CCTV Office Exit", status: "Online", location: "Pintu Keluar Kantor", peopleDetected: 1 },
  ];

  const violations: Violation[] = [
    { id: 1, nama: "Pekerja A", nomorVest: "V-101", pelanggaran: "Tanpa Helm", status: "Belum Ditindak" },
    { id: 2, nama: "Pekerja B", nomorVest: "V-102", pelanggaran: "Tanpa Vest", status: "Ditindak" },
    { id: 3, nama: "Pekerja C", nomorVest: "V-103", pelanggaran: "Area Terlarang", status: "Belum Ditindak" },
  ];

  // State untuk melacak kamera mana yang sedang ditampilkan di panel utama
  const [activeCameraId, setActiveCameraId] = useState<number>(cameras[0].id);

  // Cari objek kamera yang sedang aktif
  const activeCamera = cameras.find(cam => cam.id === activeCameraId);

  // Fungsi untuk menangani klik pada thumbnail
  const handleCameraClick = (id: number) => {
    setActiveCameraId(id);
  };

  return (
    <div className="grid grid-cols-3 gap-6 mt-10 mx-10 px-20 py-20 bg-[#464646] rounded-lg">
      {/* Kolom 1: Kamera Utama dan Thumbnail */}
      <div className="col-span-2 space-y-6">
        {/* Kamera Utama (Memakai 2 Kolom) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {activeCamera ? activeCamera.name : "Pilih Kamera"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Placeholder untuk Video Stream Utama yang Besar */}
            <div className="w-full h-96 bg-gray-700 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
              {activeCamera ? `LIVE STREAM: ${activeCamera.name}` : "Pilih Kamera untuk Menampilkan Stream"}
            </div>
            {activeCamera && (
              <div className="flex justify-between items-center text-sm">
                <p>Status:{" "}
                  <Badge variant={activeCamera.status === "Online" ? "default" : "destructive"}>
                    {activeCamera.status}
                  </Badge>
                </p>
                <p>Lokasi: <span className="font-medium">{activeCamera.location}</span></p>
                <p>Orang Terdeteksi: <span className="font-medium">{activeCamera.peopleDetected}</span></p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Thumbnail Kamera */}
        <div className="grid grid-cols-4 gap-4">
          {cameras.map((cam) => (
            <Card
              key={cam.id}
              onClick={() => handleCameraClick(cam.id)}
              className={cn(
                "cursor-pointer hover:shadow-lg transition-shadow border-2",
                cam.id === activeCameraId ? "border-blue-500 ring-4 ring-blue-200" : "border-gray-200"
              )}
            >
              <CardContent className="p-3">
                <div className="w-full h-20 bg-gray-300 rounded-md mb-2 flex items-center justify-center text-xs text-gray-600 overflow-hidden">
                  {/* Gambar thumbnail kecil, saat ini placeholder */}
                  {cam.name}
                </div>
                <p className="text-sm font-semibold truncate">{cam.name}</p>
                <Badge
                  className="mt-1"
                  variant={cam.status === "Online" ? "default" : "destructive"}
                >
                  {cam.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Kolom 3: Pelanggaran (Tetap 1 Kolom) */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Pelanggaran Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {violations.map((v) => (
              <div key={v.id} className="p-3 border rounded-lg shadow-sm">
                <p className="font-semibold text-sm">{v.nama} ({v.nomorVest})</p>
                <p className="text-xs">Pelanggaran: <span className="font-medium">{v.pelanggaran}</span></p>
                <p className="text-xs">Status:{" "}
                  <span className={v.status === "Ditindak" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {v.status}
                  </span>
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tambahan: Ringkasan Kamera (Opsional, untuk melengkapi tampilan) */}
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Status Kamera</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Total Kamera: <span className="font-bold">{cameras.length}</span></p>
            <p>Online: <span className="font-bold text-green-600">{cameras.filter(c => c.status === "Online").length}</span></p>
            <p>Offline: <span className="font-bold text-red-600">{cameras.filter(c => c.status === "Offline").length}</span></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}