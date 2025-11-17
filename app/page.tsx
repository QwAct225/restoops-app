import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">RestoOps</h1>
          <p className="text-xl text-gray-600 mb-2">Restaurant Operations Management System</p>
          <p className="text-gray-500">Frontend Client untuk Testing API Backend</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">API Backend Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Backend URL</p>
              <p className="font-mono text-blue-600 font-medium">http://localhost:8001</p>
            </div>
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">API Documentation</p>
              <a href="http://localhost:8001/docs" target="_blank" rel="noopener noreferrer" className="font-mono text-blue-600 font-medium hover:underline">
                http://localhost:8001/docs
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Link href="/menu">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-3xl font-bold text-gray-800">Menu</h3>
              </div>
              <p className="text-gray-600 mb-4">Lihat daftar menu restoran lengkap dengan harga dan varian</p>
              <div className="flex items-center text-orange-500 font-medium group-hover:translate-x-2 transition-transform">
                <span>Lihat Menu</span>
                <span className="ml-2">→</span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Endpoint:</span> <code className="bg-gray-100 px-2 py-1 rounded">GET /menu/</code>
                </p>
              </div>
            </div>
          </Link>

          <Link href="/reservation">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-3xl font-bold text-gray-800">Reservasi</h3>
              </div>
              <p className="text-gray-600 mb-4">Lihat daftar reservasi pelanggan lengkap dengan detail pesanan</p>
              <div className="flex items-center text-blue-500 font-medium group-hover:translate-x-2 transition-transform">
                <span>Lihat Reservasi</span>
                <span className="ml-2">→</span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Endpoint:</span> <code className="bg-gray-100 px-2 py-1 rounded">GET /reservation/</code>
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Cara Penggunaan</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>
              Pastikan backend API berjalan di <code className="bg-white px-2 py-1 rounded">localhost:8001</code>
            </li>
            <li>
              Klik card <strong>Menu</strong> untuk melihat daftar menu
            </li>
            <li>
              Klik card <strong>Reservasi</strong> untuk melihat daftar reservasi
            </li>
            <li>Gunakan filter untuk melihat data berdasarkan kriteria tertentu</li>
            <li>Data akan di-fetch secara real-time dari backend API</li>
          </ol>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>RestoOps API Client - Testing Frontend for Backend API</p>
        </div>
      </div>
    </div>
  );
}
