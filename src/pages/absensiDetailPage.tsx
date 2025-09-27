// src/pages/AbsensiDetailPage.tsx
import { useParams, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AbsensiDetailPage() {
  const { id } = useParams<{ id: string }>();

  const data = {
    id,
    nama: "Pekerja A",
    nomorVest: "V-101",
    helm: true,
    vest: true,
    wajah: true,
    sarungTangan: true,
    status: "Aman",
    foto: "/image/image.png",
    waktu: "07:00",
    lokasi: "Gate 1",
  };

  return (
    <div className="min-h-screen px-15 py-5 items-center mt-20">
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Detail Absensi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6 items-stretch">
            {/* Kolom 1: Checklist APD */}
            <div className="h-full bg-[#717171] rounded-md p-6 text-white flex flex-col justify-center items-center text-xl font-medium space-y-6">
              {/* Helm */}
              <div className="flex flex-col items-center">
                <p>Helm</p>
                <p
                  className={
                    data.helm ? "text-green-500 font-semibold" : "text-red-500 font-semibold"
                  }
                >
                  {data.helm ? "Verified ✅" : "Not Verified ❌"}
                </p>
              </div>

              {/* Vest */}
              <div className="flex flex-col items-center">
                <p>Vest</p>
                <p
                  className={
                    data.vest ? "text-green-500 font-semibold" : "text-red-500 font-semibold"
                  }
                >
                  {data.vest ? "Verified ✅" : "Not Verified ❌"}
                </p>
              </div>

              {/* Wajah */}
              <div className="flex flex-col items-center">
                <p>Wajah</p>
                <p
                  className={
                    data.wajah ? "text-green-500 font-semibold" : "text-red-500 font-semibold"
                  }
                >
                  {data.wajah ? "Verified ✅" : "Not Verified ❌"}
                </p>
              </div>

              {/* Sarung Tangan */}
              <div className="flex flex-col items-center">
                <p>Sarung Tangan</p>
                <p
                  className={
                    data.sarungTangan
                      ? "text-green-500 font-semibold"
                      : "text-red-500 font-semibold"
                  }
                >
                  {data.sarungTangan ? "Verified ✅" : "Not Verified ❌"}
                </p>
              </div>
            </div>

            {/* Kolom 2: Informasi Deteksi (2 card, sama tinggi dengan checklist) */}
            <div className="h-full flex flex-col gap-4">
              {/* Card Informasi */}
              <div className="flex-1 bg-[#717171] p-4 rounded-md text-center text-white flex flex-col justify-center">
                <p className="font-semibold text-lg">{data.nama}</p>
                <p>Nomor Vest: {data.nomorVest}</p>
                <p>Waktu: {data.waktu}</p>
                <p>Lokasi: {data.lokasi}</p>
              </div>

              {/* Card Status */}
              <div className="bg-[#717171] p-4 rounded-md text-center flex flex-col justify-center">
                <p className="text-white mb-1">Status:</p>
                <p
                  className={
                    data.status === "Aman"
                      ? "text-green-600 font-bold text-xl"
                      : "text-red-600 font-bold text-xl"
                  }
                >
                  {data.status}
                </p>
              </div>
            </div>

            {/* Kolom 3: Foto */}
            <div className="flex justify-center">
              <img
                src={data.foto}
                alt={data.nama}
                className="h-100 w-auto object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          <div className="mt-6">
            <Link to="/absensi">
              <Button className="bg-[#4457FF]">Kembali</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
