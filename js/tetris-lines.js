// Fungsi untuk memindai baris pada papan permainan
function scanLines() {
	LINES = "";                   // Inisialisasi variabel penampung baris yang akan dihapus
	LINES_BLINK_COUNTER = 0;      // Inisialisasi hitungan animasi kedipan baris
	for (var y = LINES_MAX_Y, ymax = 0; y > ymax; y--) {
		var line = true;
		for (var x = 1, xmax = LINES_MAX_X + 1; x < xmax; x++) {
			// Memeriksa apakah seluruh kolom pada baris terisi oleh blok
			if ($('#board').find(".square[id='s-" + y + "-" + x + "'][class*='piece']").length < 1) {
				line = false;
				break;
			}
		}
		if (line) {
			if (LINES !== "") LINES += ",";
			LINES += y + "";
		}
	}

	scoringBonus();  // Memanggil fungsi untuk menentukan bonus skor

	if (LINES !== "") {
		// Jika ada baris yang terpenuhi, animasi kedipan dimulai
		LINES_BLINK_TIMER = setInterval('blinkLines()', LINES_BLINK_DELAY);
		if (LINES.split(",").length < 4) {
			playLineSound();  // Memainkan suara untuk baris tunggal
		} else {
			playTetrisSound();  // Memainkan suara untuk TETRIS (baris penuh)
		}

	} else {
		launchOnePiece();  // Jika tidak ada baris yang terpenuhi, meluncurkan satu blok baru
	}
}

// Fungsi untuk animasi kedipan pada baris yang akan dihapus
function blinkLines() {
	LINES_BLINK_COUNTER++;
	var lines = LINES.split(",");
	for (var i = 0, imax = lines.length; i < imax; i++) {
		// Mengubah kelas elemen-elemen pada baris yang akan dihapus untuk membuat efek kedipan
		if ($('#board').find(".square[id^='s-" + lines[i] + "-'][class*='piece']").attr("class").indexOf("erase") > -1) {
			$('#board').find(".square[id^='s-" + lines[i] + "-'][class*='piece']").removeClass("erase");
		} else {
			$('#board').find(".square[id^='s-" + lines[i] + "-'][class*='piece']").addClass("erase");
		}
	}

	if (LINES_BLINK_COUNTER > LINES_BLINK_MAX) {
		// Setelah sejumlah iterasi animasi, menghentikan animasi dan menghapus baris
		LINES_BLINK_COUNTER = 0;
		clearInterval(LINES_BLINK_TIMER);
		LINES_BLINK_TIMER = -1;
		eraseLines();         // Menghapus baris yang terpenuhi
		launchOnePiece();     // Meluncurkan satu blok baru

		scoringLines(lines.length);  // Menghitung skor berdasarkan jumlah baris yang dihapus
	}
}

// Fungsi untuk menghapus baris yang terpenuhi
function eraseLines() {
	var lines = LINES.split(",");
	for (var i = 0, imax = lines.length; i < imax; i++) {

		for (var l = lines[i], lmax = LINES_MAX_Y; l < lmax; l++) {
			for (var x = 1, xmax = LINES_MAX_X + 1; x < xmax; x++) {
				// Mengganti properti elemen-elemen pada baris terpenuhi dengan properti baris di atasnya
				$('#board').find(".square[id='s-" + l + "-" + x + "']").removeClass("erase");
				$('#board').find(".square[id='s-" + l + "-" + x + "']").attr("class", $('#board').find(".square[id='s-" + (parseInt(l) + 1) + "-" + x + "']").attr("class"));
				if ($('#board').find(".square[id='s-" + (parseInt(l) + 1) + "-" + x + "']").attr("piece-id")) {
					$('#board').find(".square[id='s-" + l + "-" + x + "']").attr("piece-id", $('#board').find(".square[id='s-" + (parseInt(l) + 1) + "-" + x + "']").attr("piece-id"));
					$('#board').find(".square[id='s-" + l + "-" + x + "']").attr("piece-catch", $('#board').find(".square[id='s-" + (parseInt(l) + 1) + "-" + x + "']").attr("piece-catch"));
					$('#board').find(".square[id='s-" + l + "-" + x + "']").attr("piece-catch", $('#board').find(".square[id='s-" + (parseInt(l) + 1) + "-" + x + "']").attr("piece-catch"));
				} else {
					$('#board').find(".square[id='s-" + l + "-" + x + "']").removeAttr("piece-id");
					$('#board').find(".square[id='s-" + l + "-" + x + "']").removeAttr("piece-catch");
					$('#board').find(".square[id='s-" + l + "-" + x + "']").removeAttr("piece-move");
				}
			}
		}
		for (var x = 1, xmax = LINES_MAX_X + 1; x < xmax; x++) {
			// Mengatur properti elemen-elemen pada baris paling atas
			$('#board').find(".square[id='s-" + LINES_MAX_Y + "-" + x + "']").attr("class", "square");
			$('#board').find(".square[id='s-" + LINES_MAX_Y + "-" + x + "']").removeAttr("piece-id");
			$('#board').find(".square[id='s-" + LINES_MAX_Y + "-" + x + "']").removeAttr("piece-catch");
			$('#board').find(".square[id='s-" + LINES_MAX_Y + "-" + x + "']").removeAttr("piece-move");
		}
	}
	LINES = "";  // Mengosongkan variabel baris yang akan dihapus
}
