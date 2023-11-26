// Deklarasi objek suara menggunakan library Buzz
var DROP_SOUND = new buzz.sound([
	"./sound/drop.ogg",
	"./sound/drop.mp3"
]);
var LINE_SOUND = new buzz.sound([
	"./sound/line.ogg",
	"./sound/line.mp3"
]);
var TETRIS_SOUND = new buzz.sound([
	"./sound/tetris.ogg",
	"./sound/tetris.mp3"
]);
var MOVE_SOUND = new buzz.sound([
	"./sound/move.ogg",
	"./sound/move.mp3"
]);
var ROTATE_SOUND = new buzz.sound([
	"./sound/rotate.ogg",
	"./sound/rotate.mp3"
]);
var GAMEOVER_SOUND = new buzz.sound([
	"./sound/gameover.ogg",
	"./sound/gameover.mp3"
]);
var THEME_SOUND = new buzz.sound([
	"./sound/theme.ogg",
	"./sound/theme.mp3"
]);

// Membuat grup suara menggunakan library Buzz
var GROUP_SOUND = new buzz.group([DROP_SOUND, LINE_SOUND, TETRIS_SOUND, MOVE_SOUND, ROTATE_SOUND, GAMEOVER_SOUND, THEME_SOUND]);

// Fungsi untuk memeriksa apakah suara tersedia atau tidak
function isAvailableSound() {
	return !($("#sound").css("display") === "none");
}

// Fungsi untuk memuat semua suara jika tersedia
function loadAllSound() {
	if (isAvailableSound()) GROUP_SOUND.load();
}

// Fungsi untuk menghentikan semua suara jika tersedia
function stopAllSound() {
	if (isAvailableSound()) {
		GROUP_SOUND.stop();
	}
}

// Fungsi untuk memute semua suara jika tersedia
function muteAllSound() {
	if (isAvailableSound()) {
		GROUP_SOUND.mute();
	}
}

// Fungsi untuk unmute semua suara jika tersedia
function unmuteAllSound() {
	if (isAvailableSound()) {
		GROUP_SOUND.unmute();
	}
}

// Fungsi untuk memutar suara efek jatuh
function playDropSound() {
	if (isAvailableSound()) {
		ROTATE_SOUND.stop();
		MOVE_SOUND.stop();
		DROP_SOUND.stop();
		DROP_SOUND.play();
	}
}

// Fungsi untuk memutar suara efek baris terbentuk
function playLineSound() {
	if (isAvailableSound()) {
		ROTATE_SOUND.stop();
		MOVE_SOUND.stop();
		LINE_SOUND.play();
	}
}

// Fungsi untuk memutar suara efek TETRIS (empat baris terbentuk)
function playTetrisSound() {
	if (isAvailableSound()) {
		ROTATE_SOUND.stop();
		MOVE_SOUND.stop();
		TETRIS_SOUND.play();
	}
}

// Fungsi untuk memutar suara efek pergerakan blok
function playMoveSound() {
	if (isAvailableSound()) {
		MOVE_SOUND.stop();
		MOVE_SOUND.play();
	}
}

// Fungsi untuk memutar suara efek rotasi blok
function playRotateSound() {
	if (isAvailableSound()) {
		ROTATE_SOUND.stop();
		ROTATE_SOUND.play();
	}
}

// Fungsi untuk memutar suara efek permainan berakhir
function playGameoverSound() {
	if (isAvailableSound()) {
		GAMEOVER_SOUND.play();
	}
}

// Fungsi untuk menghentikan suara efek permainan berakhir
function stopGameoverSound() {
	if (isAvailableSound()) {
		GAMEOVER_SOUND.stop();
	}
}

// Fungsi untuk memutar suara tema permainan dengan mode loop
function playThemeSound() {
	if (isAvailableSound()) {
		THEME_SOUND.loop();
		THEME_SOUND.play();
	}
}

// Fungsi untuk memberhentikan suara tema permainan
function stopThemeSound() {
	if (isAvailableSound()) {
		THEME_SOUND.stop();
	}
}

// Fungsi untuk menjeda suara tema permainan
function pauseThemeSound() {
	if (isAvailableSound()) {
		LINE_SOUND.stop();
		TETRIS_SOUND.stop();
		THEME_SOUND.pause();
	}
}
