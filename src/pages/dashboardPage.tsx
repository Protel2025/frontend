"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dataKehadiran = [
  { name: "Sen", hadir: 110 },
  { name: "Sel", hadir: 115 },
  { name: "Rab", hadir: 120 },
  { name: "Kam", hadir: 118 },
  { name: "Jum", hadir: 119 },
];

const dataPelanggaran = [
  { name: "Patuh", value: 99 },
  { name: "Tidak Patuh", value: 20 },
];

const COLORS = ["#3B82F6", "#DC2626"];

export default function DashboardPage() {
  return (
    <div className="grid gap-8 min-h-screen py-6 px-20 bg-[#2a2a2a]">
      {/* === Summary Section === */}
      <h2 className="text-xl font-semibold text-white">📊 Summary</h2>
      <Card className="bg-neutral-900 text-white text-center">
        <CardHeader>
          <CardTitle>Total Pekerja</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">120</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-10">
        <Card className="bg-neutral-900 text-white text-center">
          <CardHeader>
            <CardTitle>Pelanggaran Hari Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-500">8</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 text-white text-center">
          <CardHeader>
            <CardTitle>Jumlah Analisa Frame</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">15,230</p>
          </CardContent>
        </Card>
      </div>

      <Button className="w-fit bg-blue-600 hover:bg-blue-700 text-white">
        Cetak Laporan (CSV)
      </Button>

      {/* === Grafik Section === */}
      <h2 className="text-xl font-semibold text-white">📈 Grafik</h2>
      <div className="grid grid-cols-2 gap-10">
        <Card className="bg-neutral-900 text-white">
          <CardHeader className="text-center">
            <CardTitle>Grafik Kehadiran</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataKehadiran}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Bar dataKey="hadir" fill="#4F46E5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 text-white">
          <CardHeader className="text-center">
            <CardTitle>Grafik Pelanggaran</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataPelanggaran}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(((percent as number) || 0) * 100).toFixed(0)}%`
                  }
                >
                  {dataPelanggaran.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* === Aktivitas Terbaru === */}
      <h2 className="text-xl font-semibold text-white">📝 Aktivitas Terbaru</h2>
      <div className="grid gap-3">
        <Card className="bg-neutral-900 text-white">
          <CardContent className="p-4">
            Pekerja A masuk pukul 07:00
          </CardContent>
        </Card>
        <Card className="bg-neutral-900 text-red-400">
          <CardContent className="p-4">
            Pekerja B melanggar: tidak pakai helm
          </CardContent>
        </Card>
        <Card className="bg-neutral-900 text-white">
          <CardContent className="p-4">
            Pekerja C masuk pukul 07:05
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
