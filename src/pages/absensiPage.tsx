// src/pages/AbsensiPage.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type AbsensiItem = {
  id: number;
  nama: string;
  nomorVest: string;
  helm: boolean;
  vest: boolean;
  wajah: boolean;
  status: "Aman" | "Melanggar";
  foto: string;
  waktu: string;
};

export default function AbsensiPage() {
  const data: AbsensiItem[] = [
    {
      id: 1,
      nama: "Pekerja A",
      nomorVest: "V-101",
      helm: true,
      vest: true,
      wajah: true,
      status: "Aman",
      foto: "/image/image.png",
      waktu: "07.00",
    },
    {
      id: 2,
      nama: "Pekerja B",
      nomorVest: "V-102",
      helm: false,
      vest: true,
      wajah: true,
      status: "Melanggar",
      foto: "/image/image.png",
      waktu : "08.00"
    },
  ];

  return (
    <div className="grid gap-10 mx-20 mt-15">
      {data.map((row) => (
        <Card key={row.id} className="px-20 bg-[#464646]">
          <div className="grid grid-cols-3 gap-4 items-center">
            {/* Kolom 1: Checklist APD */}
            <div className="flex flex-col gap-2">
              <p>
                Helm:{" "}
                <span className={row.helm ? "text-green-600" : "text-red-600"}>
                  {row.helm ? "✅" : "❌"}
                </span>
              </p>
              <p>
                Vest:{" "}
                <span className={row.vest ? "text-green-600" : "text-red-600"}>
                  {row.vest ? "✅" : "❌"}
                </span>
              </p>
              <p>
                Wajah:{" "}
                <span className={row.wajah ? "text-green-600" : "text-red-600"}>
                  {row.wajah ? "✅" : "❌"}
                </span>
              </p>
            </div>

            {/* Kolom 2: Data Deteksi */}
            <div>
              <p className="font-semibold">{row.nama}</p>
              <p>Nomor Vest: {row.nomorVest}</p>
              <p>Jam Absensi: {row.waktu}</p>
              <p
                className={
                  row.status === "Aman" ? "text-green-600" : "text-red-600"
                }
              >
                Status: {row.status}
              </p>
              <Link to={`/absensi/${row.id}`}>
                <Button className="mt-2 bg-[#4457FF]">
                  Lihat Detail
                </Button>
              </Link>
            </div>

            {/* Kolom 3: Foto */}
            <div className="flex justify-center">
              <img
                src={row.foto}
                alt={row.nama}
                className="w-auto h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
