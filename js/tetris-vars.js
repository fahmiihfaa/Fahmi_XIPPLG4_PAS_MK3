// Variabel-variabel pengaturan permainan
var HELP_DELAY = 1500; // Waktu tunda bantuan (dalam milidetik)
var HELP_TIMER = -1; // Timer bantuan

var SCORE_1 = 0; // Skor tertinggi pertama
var SCORE_2 = 0; // Skor tertinggi kedua
var SCORE_3 = 0; // Skor tertinggi ketiga
var SCORE_4 = 0; // Skor tertinggi keempat
var SCORE_5 = 0; // Skor tertinggi kelima

var SCORE_NAME_DEFAULT = "-------"; // Nama default untuk skor tertinggi

// Nama untuk skor tertinggi dari urutan pertama hingga kelima
var SCORE_1_NAME = SCORE_NAME_DEFAULT;
var SCORE_2_NAME = SCORE_NAME_DEFAULT;
var SCORE_3_NAME = SCORE_NAME_DEFAULT;
var SCORE_4_NAME = SCORE_NAME_DEFAULT;
var SCORE_5_NAME = SCORE_NAME_DEFAULT;

var ENTER_NAME_DEFAULT_CHAR = "-"; // Karakter default untuk pengisian nama
var ENTER_NAME_MAX_CHAR = 7; // Jumlah karakter maksimal untuk pengisian nama
var ENTER_NAME = -1; // Indeks untuk pengisian nama
var ENTER_NAME_POSITION = 0; // Posisi karakter dalam pengisian nama
var ENTER_NAME_DELAY = 300; // Waktu tunda antar karakter pengisian nama
var ENTER_NAME_TIMER = -1; // Timer untuk pengisian nama

var GAME_OVER = false; // Status permainan berakhir
var GAME_PAUSE = false; // Status permainan dijeda
var GAME_SPECIAL_AUTHORIZED = false; // Izin khusus permainan
var GAME_START_DELAY = 650; // Waktu tunda awal permainan (dalam milidetik)
var GAME_START_TIMER = -1; // Timer awal permainan

// Variabel-variabel untuk penanganan garis pada papan permainan
var LINES = ""; // Daftar garis pada papan permainan
var LINES_BLINK_COUNTER = 0; // Counter untuk efek berkedip garis
var LINES_BLINK_TIMER = -1; // Timer untuk efek berkedip garis
var LINES_BLINK_DELAY = 200; // Waktu tunda antar berkedip garis (dalam milidetik)
var LINES_BLINK_MAX = 5; // Jumlah maksimal berkedip garis secara berurutan
var LINES_MAX_X = 10; // Jumlah kolom pada papan permainan
var LINES_MAX_Y = 18; // Jumlah baris pada papan permainan

// Variabel-variabel untuk penanganan bentuk blok dan pengaturan perpindahan
var PIECE_NEXT = -1; // Indeks bentuk blok selanjutnya
var PIECE_NEXT_MASKED = false; // Status bentuk blok selanjutnya tersembunyi
var PIECE_CONTROL = "NULL"; // Kontrol bentuk blok saat ini
var PIECE_DOWN_TIMER = -1; // Timer perpindahan blok ke bawah
var PIECE_DISABLED_TIMER = -1; // Timer penanganan blok yang dinonaktifkan
var PIECE_DISABLED_DELAY = 10; // Waktu tunda penanganan blok yang dinonaktifkan (dalam milidetik)
var PIECE_DISABLED_X = -1; // Koordinat X blok yang dinonaktifkan
var PIECE_DISABLED_Y = -1; // Koordinat Y blok yang dinonaktifkan
var PIECE_START_X = (LINES_MAX_X / 2) + 1; // Koordinat awal X blok
var PIECE_START_Y = (LINES_MAX_Y - 2); // Koordinat awal Y blok

// Variabel-variabel penghitungan dan kecepatan permainan
var PLAYER_LEVEL = 0; // Level pemain
var PLAYER_LINES = 0; // Jumlah garis yang telah dihapus oleh pemain
var PLAYER_LINES_LEVEL = 0; // Jumlah garis untuk mencapai level berikutnya
var PLAYER_SCORE = 0; // Skor pemain
var PLAYER_SCORE_MAXIMUM = 999999; // Batas maksimal skor pemain
var PLAYER_SCORE_BONUS = 0; // Bonus skor pemain
var PLAYER_SPEED_DEFAULT = 1000; // Kecepatan permainan default (dalam milidetik)
var PLAYER_SPEED = PLAYER_SPEED_DEFAULT; // Kecepatan permainan saat ini
var PLAYER_SPEED_DELAY = 97; // Penurunan kecepatan permainan (dalam milidetik)
