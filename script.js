
// Mengambil elemen dari HTML
const form = document.getElementById("calculator-form");
const packageSelect = document.getElementById("package");
const quantityInput = document.getElementById("quantity");
const promoInput = document.getElementById("promo");
const resultBox = document.getElementById("result");

// Menjalankan kalkulator ketika tombol ditekan
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Mengambil harga paket
    const packagePrice = Number(packageSelect.value);

    // Mengambil jumlah halaman tambahan
    const quantity = Number(quantityInput.value);

    // Mengambil kode promo
    const promoCode = promoInput.value.trim().toUpperCase();

    // Validasi jumlah halaman
    if (!Number.isInteger(quantity) || quantity < 1) {
        resultBox.innerHTML = "<p>Masukkan jumlah halaman minimal 1</p>";
        return;
    }

    // Menghitung total harga awal
    const subtotal = packagePrice * quantity;

    // Menghitung diskon
    let discount = 0;

    if (promoCode === "KILAT10") {
        discount = subtotal * 0.10;
    } else if (promoCode !== "") {
        resultBox.innerHTML = "<p>Kode promo tidak valid. Silakan periksa kembali.</p>";
        return;
    }

    // Menghitung total akhir
    const total = subtotal - discount;

    // Format angka menjadi Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(number);
    };

    // Menampilkan hasil
    resultBox.innerHTML = `
        <h3>Rincian Biaya Website</h3>
        <p>Harga Paket: ${formatRupiah(packagePrice)}</p>
        <p>Jumlah Halaman: ${quantity}</p>
        <p>Subtotal: ${formatRupiah(subtotal)}</p>
        <p>Diskon: ${formatRupiah(discount)}</p>
        <hr>
        <h3>Total Pembayaran</h3>
        <h2 style="color: #2563EB;">
            ${formatRupiah(total)}
        </h2>
        <p>${discount > 0 ? "Promo KILAT10 berhasil digunakan!" : "Tidak menggunakan kode promo."}</p>
    `;
});
