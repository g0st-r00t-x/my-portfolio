const config = {
  siteUrl: 'https://g0st.my.id', // ✅ domain kamu
  generateRobotsTxt: true,       // ✅ otomatis buat robots.txt juga
  exclude: [],                   // tidak ada yang dikecualikan karena hanya satu halaman
  changefreq: 'monthly',         // boleh disesuaikan, default-nya "daily"
  priority: 1.0,                 // hanya satu halaman, jadi kita beri prioritas tinggi
}

export default config
