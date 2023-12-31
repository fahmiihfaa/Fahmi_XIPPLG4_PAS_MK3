// Menambahkan metode replaceAt pada prototipe String untuk menggantikan karakter pada indeks tertentu
String.prototype.replaceAt = function (index, character) {
	return this.substr(0, index) + character + this.substr(index + character.length);
}

// Fungsi untuk menambahkan pemisah ribuan pada angka
function commafy(inVal) {
	var arrWhole = (inVal + "").split(".");
	var arrTheNumber = arrWhole[0].split("").reverse();
	var newNum = Array();
	for (var i = 0; i < arrTheNumber.length; i++) {
		newNum[newNum.length] = ((i % 3 === 2) && (i < arrTheNumber.length - 1)) ? " " + arrTheNumber[i] : arrTheNumber[i];
	}
	var returnNum = newNum.reverse().join("");
	if (arrWhole[1]) {
		returnNum += "." + arrWhole[1];
	}
	return returnNum;
}

// Fungsi untuk menampilkan pesan pada papan permainan
function message(m) {
	$("#board").append('<span class="message">' + m + '</span>');
}

// Fungsi untuk menghapus pesan dari papan permainan
function clearMessage() {
	$("#board").find('span.message').remove();
}
