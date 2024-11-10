# Warunk Kaki Tiga

Program ini adalah aplikasi sederhana untuk simulasi sistem kasir pada Warunk Kaki Tiga. Program ini memungkinkan pengguna untuk melihat menu, memasukkan pesanan hingga 4 item, serta menghitung total harga termasuk pajak, biaya pelayanan, dan diskon.

## Fitur

- Menampilkan daftar menu makanan dan minuman beserta harganya.
- Mendukung input pesanan hingga maksimal 4 item.
- Menghitung subtotal, pajak, biaya pelayanan, dan diskon.
- Memberikan promo minuman gratis untuk pembelian di atas Rp50,000.
- Memberikan diskon 10% untuk total pembelian di atas Rp100,000.
- Mencetak struk yang merinci pesanan, harga per item, subtotal, dan total yang harus dibayar.

## Struktur Kode

- **Class `Main`**: Merupakan entry point dari program ini. Di dalamnya terdapat metode untuk menampilkan menu, mencari item menu, dan menjalankan logika utama aplikasi.
- **Class `Menu`**: Menyimpan data tiap item menu, seperti nama, harga, dan kategori (makanan atau minuman).

## Konfigurasi

Program ini memiliki beberapa konfigurasi utama:
- **Pajak**: 10% dari subtotal.
- **Biaya Pelayanan**: Biaya tetap sebesar Rp20,000.
- **Diskon dan Promo**:
  - Diskon 10% jika total biaya lebih dari Rp100,000.
  - Promo minuman gratis untuk total pembelian di atas Rp50,000.

## Cara Menggunakan

1. Jalankan program.
2. Lihat daftar menu yang tersedia.
3. Masukkan pesanan hingga maksimal 4 item. Ketik "Selesai" untuk mengakhiri input pesanan sebelum mencapai 4 item.
4. Untuk setiap pesanan, masukkan nama menu dan jumlah item.
5. Setelah semua pesanan dimasukkan, program akan menampilkan struk belanja beserta total biaya yang harus dibayar.
