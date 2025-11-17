"use client";

import { useEffect, useState } from "react";

interface MenuItem {
  id: number;
  nama_menu: string;
  harga: number;
  variants: string[] | null;
  sold_out: string;
  created_at: string;
  updated_at: string;
  image_url?: string;
}

interface MenuResponse {
  count: number;
  data: MenuItem[];
}

export default function MenuPage() {
  const [menuData, setMenuData] = useState<MenuResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");

  const fetchMenu = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = filter ? `http://localhost:8001/menu/?sold_out=${filter}` : "http://localhost:8001/menu/";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Gagal mengambil data menu");
      }

      const data: MenuResponse = await response.json();
      setMenuData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">RestoOps Menu</h1>
          <p className="text-gray-600">Daftar menu restoran dari API Backend</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 flex-wrap">
            <label className="text-gray-700 font-medium">Filter:</label>
            <button onClick={() => setFilter("")} className={`px-6 py-2 rounded-full transition-all ${filter === "" ? "bg-orange-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              Semua
            </button>
            <button onClick={() => setFilter("No")} className={`px-6 py-2 rounded-full transition-all ${filter === "No" ? "bg-green-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              Tersedia
            </button>
            <button onClick={() => setFilter("Yes")} className={`px-6 py-2 rounded-full transition-all ${filter === "Yes" ? "bg-red-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              Sold Out
            </button>
            <button onClick={fetchMenu} className="ml-auto px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all shadow-md">
              Refresh
            </button>
          </div>
        </div>

        {loading && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat data menu...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center">
            <p className="text-red-600 text-lg font-medium">❌ {error}</p>
            <p className="text-gray-600 mt-2">Pastikan backend API berjalan di http://localhost:8001</p>
          </div>
        )}

        {!loading && !error && menuData && (
          <>
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <p className="text-gray-700">
                <span className="font-bold text-orange-500">{menuData.count}</span> menu ditemukan
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuData.data.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {item.image_url && (
                    <div className="relative w-full h-48 bg-gray-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image_url}
                        alt={item.nama_menu}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  <div className="bg-linear-to-r from-orange-400 to-yellow-400 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{item.nama_menu}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white">{formatPrice(item.harga)}</span>
                      {item.sold_out === "Yes" ? (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">Sold Out</span>
                      ) : (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">Tersedia</span>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    {item.variants && item.variants.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Variants:</p>
                        <div className="flex flex-wrap gap-2">
                          {item.variants.map((variant, index) => (
                            <span key={index} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                              {variant}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-gray-500 space-y-1 border-t pt-4">
                      <p>
                        <span className="font-medium">ID:</span> {item.id}
                      </p>
                      <p>
                        <span className="font-medium">Dibuat:</span> {new Date(item.created_at).toLocaleDateString("id-ID")}
                      </p>
                      <p>
                        <span className="font-medium">Update:</span> {new Date(item.updated_at).toLocaleDateString("id-ID")}
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
