"use client";

import { useEffect, useState } from "react";

interface MenuItem {
  id: number;
  nama_menu: string;
  harga: number;
  variants: string[] | null;
  sold_out: string;
  image_url?: string;
}

interface ReservationItem {
  id: number;
  name: string;
  reservation_table: number;
  token: string;
  ordered_menu: string[];
  duration: number;
  created_at: string;
  updated_at: string;
}

interface ReservationResponse {
  count: number;
  data: ReservationItem[];
}

export default function ReservationPage() {
  const [reservationData, setReservationData] = useState<ReservationResponse | null>(null);
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [durationFilter, setDurationFilter] = useState<string>("");

  const fetchReservations = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = durationFilter ? `http://localhost:8001/reservation/?min_duration=${durationFilter}` : "http://localhost:8001/reservation/";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Gagal mengambil data reservasi");
      }

      const data: ReservationResponse = await response.json();
      setReservationData(data);

      const menuResponse = await fetch("http://localhost:8001/menu/");
      if (menuResponse.ok) {
        const menuResult = await menuResponse.json();
        setMenuData(menuResult.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationFilter]);

  const getMenuName = (menuId: string): string => {
    const match = menuId.match(/^(\d+)/);
    if (match) {
      const id = parseInt(match[1]);
      const menu = menuData.find((m) => m.id === id);
      return menu ? menu.nama_menu : `Menu #${id}`;
    }
    return menuId;
  };

  const getMenuImage = (menuId: string): string | undefined => {
    const match = menuId.match(/^(\d+)/);
    if (match) {
      const id = parseInt(match[1]);
      const menu = menuData.find((m) => m.id === id);
      return menu?.image_url;
    }
    return undefined;
  };

  const parseOrderedMenu = (item: string): { menuId: string; menuName: string; variant?: string; imageUrl?: string } => {
    const match = item.match(/^(\d+)(?:\[(.+)\])?$/);
    if (match) {
      const menuId = match[1];
      const variant = match[2];
      return {
        menuId,
        menuName: getMenuName(menuId),
        variant,
        imageUrl: getMenuImage(menuId),
      };
    }
    return { menuId: item, menuName: item };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">RestoOps Reservations</h1>
          <p className="text-gray-600">Daftar reservasi pelanggan dari API Backend</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 flex-wrap">
            <label className="text-gray-700 font-medium">Filter Durasi:</label>
            <button onClick={() => setDurationFilter("")} className={`px-6 py-2 rounded-full transition-all ${durationFilter === "" ? "bg-blue-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              Semua
            </button>
            <button onClick={() => setDurationFilter("3")} className={`px-6 py-2 rounded-full transition-all ${durationFilter === "3" ? "bg-green-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              ≥ 3 Jam
            </button>
            <button onClick={() => setDurationFilter("5")} className={`px-6 py-2 rounded-full transition-all ${durationFilter === "5" ? "bg-purple-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              ≥ 5 Jam
            </button>
            <button onClick={fetchReservations} className="ml-auto px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all shadow-md">
              Refresh
            </button>
          </div>
        </div>

        {loading && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat data reservasi...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center">
            <p className="text-red-600 text-lg font-medium">❌ {error}</p>
            <p className="text-gray-600 mt-2">Pastikan backend API berjalan di http://localhost:8001</p>
          </div>
        )}

        {!loading && !error && reservationData && (
          <>
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <p className="text-gray-700">
                <span className="font-bold text-blue-500">{reservationData.count}</span> reservasi ditemukan
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {reservationData.data.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{item.name}</h3>
                        <p className="text-white/90 text-sm">
                          Token: <span className="font-mono font-bold">{item.token}</span>
                        </p>
                      </div>
                      <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">Meja {item.reservation_table}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <div>
                        <p className="text-sm text-gray-600">Durasi Reservasi</p>
                        <p className="text-xl font-bold text-gray-800">{item.duration} Jam</p>
                      </div>
                    </div>

                    {item.ordered_menu && item.ordered_menu.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <span>Menu yang Dipesan:</span>
                        </p>
                        <div className="space-y-3">
                          {item.ordered_menu.map((menuItem, index) => {
                            const parsed = parseOrderedMenu(menuItem);
                            return (
                              <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg overflow-hidden">
                                <div className="flex gap-3">
                                  {parsed.imageUrl && (
                                    <div className="w-20 h-20 flex-shrink-0 bg-gray-200">
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img
                                        src={parsed.imageUrl}
                                        alt={parsed.menuName}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          e.currentTarget.style.display = "none";
                                        }}
                                      />
                                    </div>
                                  )}

                                  <div className="flex-1 p-3">
                                    <p className="font-medium text-gray-800">{parsed.menuName}</p>
                                    {parsed.variant && <p className="text-sm text-blue-600 mt-1">Variants: {parsed.variant}</p>}
                                    <p className="text-xs text-gray-500 mt-1">Menu ID: {parsed.menuId}</p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-gray-500 space-y-1 border-t pt-4">
                      <p>
                        <span className="font-medium">ID Reservasi:</span> {item.id}
                      </p>
                      <p>
                        <span className="font-medium">Dibuat:</span>{" "}
                        {new Date(item.created_at).toLocaleString("id-ID", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                      <p>
                        <span className="font-medium">Update:</span>{" "}
                        {new Date(item.updated_at).toLocaleString("id-ID", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
