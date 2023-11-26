(function (context, factory) {
    "use strict";
    // Pengecekan apakah module.exports didefinisikan untuk CommonJS, jika ya, eksport modul.
    if (typeof module !== "undefined" && module.exports) {
        module.exports = factory();
    }
    // Jika define adalah fungsi yang didefinisikan untuk AMD, gunakan define untuk mendefinisikan modul.
    else if (typeof define === "function" && define.amd) {
        define([], factory);
    }
    // Jika tidak ada module.exports atau define, maka tambahkan buzz ke konteks global.
    else {
        context.buzz = factory();
    }
})(this, function () {
    "use strict";

    // Deklarasi dan inisialisasi variabel-variabel utama.
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var buzz = {
        defaults: {
            autoplay: false,
            duration: 5e3,
            formats: [],
            loop: false,
            placeholder: "--",
            preload: "metadata",
            volume: 80,
            webAudioApi: false,
            document: window.document
        },
        types: {
            mp3: "audio/mpeg",
            ogg: "audio/ogg",
            wav: "audio/wav",
            aac: "audio/aac",
            m4a: "audio/x-m4a"
        },
        sounds: [],
        el: document.createElement("audio"),
        getAudioContext: function () {
            // Mengecek dan mendapatkan objek AudioContext jika tersedia.
            if (this.audioCtx === undefined) {
                try {
                    this.audioCtx = AudioContext ? new AudioContext() : null;
                } catch (e) {
                    this.audioCtx = null;
                }
            }
            return this.audioCtx;
        },
        sound: function (src, options) {
            // Konstruktor untuk objek suara (sound).
            options = options || {};
            var doc = options.document || buzz.defaults.document;
            var pid = 0, events = [], eventsOnce = {}, supported = buzz.isSupported();

            // Metode load: Memuat suara.
            this.load = function () {
                if (!supported) {
                    return this;
                }
                this.sound.load();
                return this;
            };

            // Metode play: Memainkan suara.
            this.play = function () {
                if (!supported) {
                    return this;
                }
                this.sound.play();
                return this;
            };

            // Metode togglePlay: Menggantikan antara memainkan dan menjeda suara.
            this.togglePlay = function () {
                if (!supported) {
                    return this;
                }
                if (this.sound.paused) {
                    this.sound.play();
                } else {
                    this.sound.pause();
                }
                return this;
            };

            // Metode pause: Menjeda suara.
            this.pause = function () {
                if (!supported) {
                    return this;
                }
                this.sound.pause();
                return this;
            };

            // Metode isPaused: Memeriksa apakah suara dalam keadaan dijeda.
            this.isPaused = function () {
                if (!supported) {
                    return null;
                }
                return this.sound.paused;
            };

            // Metode stop: Menghentikan suara dan mengatur waktu suara ke awal.
            this.stop = function () {
                if (!supported) {
                    return this;
                }
                this.setTime(0);
                this.sound.pause();
                return this;
            };

            // Metode isEnded: Memeriksa apakah suara telah selesai.
            this.isEnded = function () {
                if (!supported) {
                    return null;
                }
                return this.sound.ended;
            };
            this.loop = function () {
                if (!supported) {
                    return this;
                }
                this.sound.loop = "loop";
                this.bind("ended.buzzloop", function () {
                    this.currentTime = 0;
                    this.play();
                });
                return this;
            };
            // Metode loop: Mengaktifkan pengulangan suara.
            this.loop = function () {
                if (!supported) {
                    return this;
                }
                this.sound.loop = "loop";
                this.bind("ended.buzzloop", function () {
                    this.currentTime = 0;
                    this.play();
                });
                return this;
            };

            // Metode unloop: Menonaktifkan pengulangan suara.
            this.unloop = function () {
                if (!supported) {
                    return this;
                }
                this.sound.removeAttribute("loop");
                this.unbind("ended.buzzloop");
                return this;
            };

            // Metode mute: Mematikan suara.
            this.mute = function () {
                if (!supported) {
                    return this;
                }
                this.sound.muted = true;
                return this;
            };

            // Metode unmute: Menyalakan kembali suara.
            this.unmute = function () {
                if (!supported) {
                    return this;
                }
                this.sound.muted = false;
                return this;
            };

            // Metode toggleMute: Menggantikan antara mematikan dan menyalakan kembali suara.
            this.toggleMute = function () {
                if (!supported) {
                    return this;
                }
                this.sound.muted = !this.sound.muted;
                return this;
            };

            // Metode isMuted: Memeriksa apakah suara dalam keadaan dimatikan.
            this.isMuted = function () {
                if (!supported) {
                    return null;
                }
                return this.sound.muted;
            };

            // Metode setVolume: Mengatur volume suara.
            this.setVolume = function (volume) {
                if (!supported) {
                    return this;
                }
                // Memastikan nilai volume berada dalam rentang 0 hingga 100.
                if (volume < 0) {
                    volume = 0;
                }
                if (volume > 100) {
                    volume = 100;
                }
                // Menyimpan nilai volume dan mengatur volume suara.
                this.volume = volume;
                this.sound.volume = volume / 100;
                return this;
            };

            // Metode getVolume: Mendapatkan nilai volume suara.
            this.getVolume = function () {
                if (!supported) {
                    return this;
                }
                return this.volume;
            };

            // Metode increaseVolume: Meningkatkan nilai volume suara.
            this.increaseVolume = function (value) {
                return this.setVolume(this.volume + (value || 1));
            };

            // Metode decreaseVolume: Mengurangi nilai volume suara.
            this.decreaseVolume = function (value) {
                return this.setVolume(this.volume - (value || 1));
            };

            // Metode setTime: Mengatur waktu suara.
            this.setTime = function (time) {
                if (!supported) {
                    return this;
                }
                // Menetapkan waktu suara ketika siap.
                var set = true;
                this.whenReady(function () {
                    if (set === true) {
                        set = false;
                        this.sound.currentTime = time;
                    }
                });
                return this;
            };

            // Metode getTime: Mendapatkan waktu saat ini suara.
            this.getTime = function () {
                if (!supported) {
                    return null;
                }
                // Mengambil waktu suara yang dibulatkan.
                var time = Math.round(this.sound.currentTime * 100) / 100;
                return isNaN(time) ? buzz.defaults.placeholder : time;
            };
            // Metode setPercent: Mengatur waktu suara berdasarkan persentase dari durasi total suara.
            this.setPercent = function (percent) {
                if (!supported) {
                    return this;
                }
                return this.setTime(buzz.fromPercent(percent, this.sound.duration));
            };

            // Metode getPercent: Mendapatkan persentase waktu saat ini dari durasi total suara.
            this.getPercent = function () {
                if (!supported) {
                    return null;
                }
                var percent = Math.round(buzz.toPercent(this.sound.currentTime, this.sound.duration));
                return isNaN(percent) ? buzz.defaults.placeholder : percent;
            };

            // Metode setSpeed: Mengatur kecepatan pemutaran suara.
            this.setSpeed = function (duration) {
                if (!supported) {
                    return this;
                }
                this.sound.playbackRate = duration;
                return this;
            };

            // Metode getSpeed: Mendapatkan nilai kecepatan pemutaran suara.
            this.getSpeed = function () {
                if (!supported) {
                    return null;
                }
                return this.sound.playbackRate;
            };

            // Metode getDuration: Mendapatkan durasi total suara.
            this.getDuration = function () {
                if (!supported) {
                    return null;
                }
                var duration = Math.round(this.sound.duration * 100) / 100;
                return isNaN(duration) ? buzz.defaults.placeholder : duration;
            };

            // Metode getPlayed: Mendapatkan array waktu yang sudah diputar suara.
            this.getPlayed = function () {
                if (!supported) {
                    return null;
                }
                return timerangeToArray(this.sound.played);
            };

            // Metode getBuffered: Mendapatkan array waktu yang sudah di-buffer suara.
            this.getBuffered = function () {
                if (!supported) {
                    return null;
                }
                return timerangeToArray(this.sound.buffered);
            };

            // Metode getSeekable: Mendapatkan array waktu yang dapat dicari dalam suara.
            this.getSeekable = function () {
                if (!supported) {
                    return null;
                }
                return timerangeToArray(this.sound.seekable);
            };

            // Metode getErrorCode: Mendapatkan kode kesalahan suara (jika ada).
            this.getErrorCode = function () {
                if (supported && this.sound.error) {
                    return this.sound.error.code;
                }
                return 0;
            };

            // Metode getErrorMessage: Mendapatkan pesan kesalahan suara berdasarkan kode kesalahan.
            this.getErrorMessage = function () {
                if (!supported) {
                    return null;
                }
                switch (this.getErrorCode()) {
                    case 1:
                        return "MEDIA_ERR_ABORTED";
                    case 2:
                        return "MEDIA_ERR_NETWORK";
                    case 3:
                        return "MEDIA_ERR_DECODE";
                    case 4:
                        return "MEDIA_ERR_SRC_NOT_SUPPORTED";
                    default:
                        return null;
                }
            };

            // Metode getStateCode: Mendapatkan kode status siap pemutaran suara.
            this.getStateCode = function () {
                if (!supported) {
                    return null;
                }
                return this.sound.readyState;
            };
            // Metode getStateMessage: Mendapatkan pesan status siap pemutaran suara berdasarkan kode status.
            this.getStateMessage = function () {
                if (!supported) {
                    return null;
                }
                switch (this.getStateCode()) {
                    case 0:
                        return "HAVE_NOTHING";
                    case 1:
                        return "HAVE_METADATA";
                    case 2:
                        return "HAVE_CURRENT_DATA";
                    case 3:
                        return "HAVE_FUTURE_DATA";
                    case 4:
                        return "HAVE_ENOUGH_DATA";
                    default:
                        return null;
                }
            };

            // Metode getNetworkStateCode: Mendapatkan kode status jaringan suara.
            this.getNetworkStateCode = function () {
                if (!supported) {
                    return null;
                }
                return this.sound.networkState;
            };

            // Metode getNetworkStateMessage: Mendapatkan pesan status jaringan suara berdasarkan kode status.
            this.getNetworkStateMessage = function () {
                if (!supported) {
                    return null;
                }
                switch (this.getNetworkStateCode()) {
                    case 0:
                        return "NETWORK_EMPTY";
                    case 1:
                        return "NETWORK_IDLE";
                    case 2:
                        return "NETWORK_LOADING";
                    case 3:
                        return "NETWORK_NO_SOURCE";
                    default:
                        return null;
                }
            };

            // Metode set: Menetapkan nilai properti suara.
            this.set = function (key, value) {
                if (!supported) {
                    return this;
                }
                this.sound[key] = value;
                return this;
            };

            // Metode get: Mendapatkan nilai properti suara atau suara itu sendiri.
            this.get = function (key) {
                if (!supported) {
                    return null;
                }
                return key ? this.sound[key] : this.sound;
            };

            // Metode bind: Membuat binding (mengikat) event suara dengan fungsi tertentu.
            // Parameter types: Tipe event yang akan diikat, bisa berupa beberapa tipe yang dipisahkan spasi.
            // Parameter func: Fungsi yang akan dieksekusi saat event terjadi.
            this.bind = function (types, func) {
                if (!supported) {
                    return this;
                }
                // Memisahkan tipe event yang dipisahkan spasi menjadi array.
                types = types.split(" ");
                var self = this,
                    efunc = function (e) {
                        func.call(self, e);
                    };
                for (var t = 0; t < types.length; t++) {
                    var type = types[t],
                        idx = type;
                    type = idx.split(".")[0];
                    // Menyimpan informasi event (indeks dan fungsi) dalam array events.
                    events.push({
                        idx: idx,
                        func: efunc
                    });
                    // Menambahkan event listener ke elemen suara.
                    this.sound.addEventListener(type, efunc, true);
                }
                return this;
            };

            // Metode unbind: Membatalkan binding (mengikat) event suara yang telah dibuat sebelumnya.
            // Parameter types: Tipe event yang akan dibatalkan binding-nya, bisa berupa beberapa tipe yang dipisahkan spasi.
            this.unbind = function (types) {
                if (!supported) {
                    return this;
                }
                // Memisahkan tipe event yang dipisahkan spasi menjadi array.
                types = types.split(" ");
                for (var t = 0; t < types.length; t++) {
                    var idx = types[t],
                        type = idx.split(".")[0];
                    for (var i = 0; i < events.length; i++) {
                        var namespace = events[i].idx.split(".");
                        // Mencari event yang sesuai dengan indeks atau namespace dan membuang binding-nya.
                        if (events[i].idx === idx || (namespace[1] && namespace[1] === idx.replace(".", ""))) {
                            this.sound.removeEventListener(type, events[i].func, true);
                            events.splice(i, 1);
                        }
                    }
                }
                return this;
            };

            // Metode bindOnce: Membuat binding (mengikat) event suara yang hanya dieksekusi sekali.
            // Parameter type: Tipe event yang akan diikat.
            // Parameter func: Fungsi yang akan dieksekusi saat event terjadi.
            this.bindOnce = function (type, func) {
                if (!supported) {
                    return this;
                }
                // Menyimpan referensi objek suara (this) dalam variabel self.
                var self = this;
                // Menambahkan elemen boolean ke array eventsOnce untuk melacak apakah event sudah terjadi atau belum.
                eventsOnce[pid++] = false;
                // Membuat binding event dengan menggunakan metode bind.
                this.bind(type + "." + pid, function () {
                    // Memeriksa apakah event belum terjadi.
                    if (!eventsOnce[pid]) {
                        // Menandai bahwa event telah terjadi dan menjalankan fungsi.
                        eventsOnce[pid] = true;
                        func.call(self);
                    }
                    // Membatalkan binding event setelah dieksekusi sekali.
                    self.unbind(type + "." + pid);
                });
                return this;
            };

            // Metode trigger: Memicu event suara secara manual.
            // Parameter types: Tipe-tipe event yang akan dipicu, bisa berupa beberapa tipe yang dipisahkan spasi.
            // Parameter detail: Informasi tambahan yang dapat diteruskan ke event.
            this.trigger = function (types, detail) {
                if (!supported) {
                    return this;
                }
                // Memisahkan tipe event yang dipisahkan spasi menjadi array.
                types = types.split(" ");
                for (var t = 0; t < types.length; t++) {
                    var idx = types[t];
                    for (var i = 0; i < events.length; i++) {
                        var eventType = events[i].idx.split(".");
                        // Memeriksa apakah event yang akan dipicu sesuai dengan event yang telah diikat sebelumnya.
                        if (events[i].idx === idx || (eventType[0] && eventType[0] === idx.replace(".", ""))) {
                            // Membuat event HTML dan menginisialisasinya.
                            var evt = doc.createEvent("HTMLEvents");
                            evt.initEvent(eventType[0], false, true);
                            // Menambahkan informasi tambahan ke event.
                            evt.originalEvent = detail;
                            // Memicu event pada elemen suara.
                            this.sound.dispatchEvent(evt);
                        }
                    }
                }
                return this;
            };

            // Metode fadeTo: Mengubah volume suara dari volume saat ini ke nilai tertentu dalam durasi tertentu.
            // Parameter to: Nilai volume yang ingin dicapai.
            // Parameter duration: Durasi fading (dalam milidetik).
            // Parameter callback: Fungsi yang akan dipanggil setelah fading selesai (opsional).
            this.fadeTo = function (to, duration, callback) {
                if (!supported) {
                    return this;
                }
                // Menangani kasus di mana parameter duration tidak disediakan tetapi callback diisi.
                if (duration instanceof Function) {
                    callback = duration;
                    duration = buzz.defaults.duration;
                } else {
                    duration = duration || buzz.defaults.duration;
                }
                // Menyimpan nilai volume awal, menghitung delay antar langkah fading, dan menyimpan referensi objek suara.
                var from = this.volume, delay = duration / Math.abs(from - to), self = this;
                // Memastikan suara sedang diputar.
                this.play();
                // Fungsi rekursif untuk melakukan fading.
                function doFade() {
                    setTimeout(function () {
                        // Meningkatkan atau mengurangi volume sesuai dengan arah fading.
                        if (from < to && self.volume < to) {
                            self.setVolume(self.volume += 1);
                            doFade();
                        } else if (from > to && self.volume > to) {
                            self.setVolume(self.volume -= 1);
                            doFade();
                        } else if (callback instanceof Function) {
                            // Memanggil callback setelah fading selesai.
                            callback.apply(self);
                        }
                    }, delay);
                }
                // Memastikan bahwa fading dimulai setelah suara siap.
                this.whenReady(function () {
                    doFade();
                });
                return this;
            };

            // Metode fadeIn: Fading in suara dari volume 0 ke volume maksimal.
            // Parameter duration: Durasi fading (dalam milidetik).
            // Parameter callback: Fungsi yang akan dipanggil setelah fading selesai (opsional).
            this.fadeIn = function (duration, callback) {
                if (!supported) {
                    return this;
                }
                // Mengatur volume suara ke 0 dan menjalankan metode fadeTo untuk fading in.
                return this.setVolume(0).fadeTo(100, duration, callback);
            };

            // Metode fadeOut: Fading out suara dari volume saat ini ke volume 0.
            // Parameter duration: Durasi fading (dalam milidetik).
            // Parameter callback: Fungsi yang akan dipanggil setelah fading selesai (opsional).
            this.fadeOut = function (duration, callback) {
                if (!supported) {
                    return this;
                }
                // Menggunakan metode fadeTo untuk fading out ke volume 0.
                return this.fadeTo(0, duration, callback);
            };

            // Metode fadeWith: Melakukan fading out pada suara saat ini dan fading in pada suara lainnya.
            // Parameter sound: Objek suara lain yang akan di-fade in.
            // Parameter duration: Durasi fading (dalam milidetik).
            this.fadeWith = function (sound, duration) {
                if (!supported) {
                    return this;
                }
                // Fading out suara saat ini dan setelah selesai, menghentikan suara.
                this.fadeOut(duration, function () {
                    this.stop();
                });
                // Memainkan suara lain dan fading in.
                sound.play().fadeIn(duration);
                return this;
            };

            this.whenReady = function (func) {
                if (!supported) {
                    return null;
                }
                var self = this;
                if (this.sound.readyState === 0) {
                    this.bind("canplay.buzzwhenready", function () {
                        func.call(self);
                    });
                } else {
                    func.call(self);
                }
            };
            this.addSource = function (src) {
                var self = this, source = doc.createElement("source");
                source.src = src;
                if (buzz.types[getExt(src)]) {
                    source.type = buzz.types[getExt(src)];
                }
                this.sound.appendChild(source);
                source.addEventListener("error", function (e) {
                    self.trigger("sourceerror", e);
                });
                return source;
            };
            function timerangeToArray(timeRange) {
                var array = [], length = timeRange.length - 1;
                for (var i = 0; i <= length; i++) {
                    array.push({
                        start: timeRange.start(i),
                        end: timeRange.end(i)
                    });
                }
                return array;
            }
            function getExt(filename) {
                return filename.split(".").pop();
            }
            if (supported && src) {
                for (var i in buzz.defaults) {
                    if (buzz.defaults.hasOwnProperty(i)) {
                        if (options[i] === undefined) {
                            options[i] = buzz.defaults[i];
                        }
                    }
                }
                this.sound = doc.createElement("audio");
                if (options.webAudioApi) {
                    var audioCtx = buzz.getAudioContext();
                    if (audioCtx) {
                        this.source = audioCtx.createMediaElementSource(this.sound);
                        this.source.connect(audioCtx.destination);
                    }
                }
                if (src instanceof Array) {
                    for (var j in src) {
                        if (src.hasOwnProperty(j)) {
                            this.addSource(src[j]);
                        }
                    }
                } else if (options.formats.length) {
                    for (var k in options.formats) {
                        if (options.formats.hasOwnProperty(k)) {
                            this.addSource(src + "." + options.formats[k]);
                        }
                    }
                } else {
                    this.addSource(src);
                }
                if (options.loop) {
                    this.loop();
                }
                if (options.autoplay) {
                    this.sound.autoplay = "autoplay";
                }
                if (options.preload === true) {
                    this.sound.preload = "auto";
                } else if (options.preload === false) {
                    this.sound.preload = "none";
                } else {
                    this.sound.preload = options.preload;
                }
                this.setVolume(options.volume);
                buzz.sounds.push(this);
            }
        },
        group: function (sounds) {
            sounds = argsToArray(sounds, arguments);
            this.getSounds = function () {
                return sounds;
            };
            this.add = function (soundArray) {
                soundArray = argsToArray(soundArray, arguments);
                for (var a = 0; a < soundArray.length; a++) {
                    sounds.push(soundArray[a]);
                }
            };
            this.remove = function (soundArray) {
                soundArray = argsToArray(soundArray, arguments);
                for (var a = 0; a < soundArray.length; a++) {
                    for (var i = 0; i < sounds.length; i++) {
                        if (sounds[i] === soundArray[a]) {
                            sounds.splice(i, 1);
                            break;
                        }
                    }
                }
            };
            this.load = function () {
                fn("load");
                return this;
            };
            this.play = function () {
                fn("play");
                return this;
            };
            this.togglePlay = function () {
                fn("togglePlay");
                return this;
            };
            this.pause = function (time) {
                fn("pause", time);
                return this;
            };
            this.stop = function () {
                fn("stop");
                return this;
            };
            this.mute = function () {
                fn("mute");
                return this;
            };
            this.unmute = function () {
                fn("unmute");
                return this;
            };
            this.toggleMute = function () {
                fn("toggleMute");
                return this;
            };
            this.setVolume = function (volume) {
                fn("setVolume", volume);
                return this;
            };
            this.increaseVolume = function (value) {
                fn("increaseVolume", value);
                return this;
            };
            this.decreaseVolume = function (value) {
                fn("decreaseVolume", value);
                return this;
            };
            this.loop = function () {
                fn("loop");
                return this;
            };
            this.unloop = function () {
                fn("unloop");
                return this;
            };
            this.setSpeed = function (speed) {
                fn("setSpeed", speed);
                return this;
            };
            this.setTime = function (time) {
                fn("setTime", time);
                return this;
            };
            this.set = function (key, value) {
                fn("set", key, value);
                return this;
            };
            this.bind = function (type, func) {
                fn("bind", type, func);
                return this;
            };
            this.unbind = function (type) {
                fn("unbind", type);
                return this;
            };
            this.bindOnce = function (type, func) {
                fn("bindOnce", type, func);
                return this;
            };
            this.trigger = function (type) {
                fn("trigger", type);
                return this;
            };
            this.fade = function (from, to, duration, callback) {
                fn("fade", from, to, duration, callback);
                return this;
            };
            this.fadeIn = function (duration, callback) {
                fn("fadeIn", duration, callback);
                return this;
            };
            this.fadeOut = function (duration, callback) {
                fn("fadeOut", duration, callback);
                return this;
            };
            function fn() {
                var args = argsToArray(null, arguments), func = args.shift();
                for (var i = 0; i < sounds.length; i++) {
                    sounds[i][func].apply(sounds[i], args);
                }
            }
            function argsToArray(array, args) {
                return array instanceof Array ? array : Array.prototype.slice.call(args);
            }
        },
        all: function () {
            return new buzz.group(buzz.sounds);
        },
        isSupported: function () {
            return !!buzz.el.canPlayType;
        },
        isOGGSupported: function () {
            return !!buzz.el.canPlayType && buzz.el.canPlayType('audio/ogg; codecs="vorbis"');
        },
        isWAVSupported: function () {
            return !!buzz.el.canPlayType && buzz.el.canPlayType('audio/wav; codecs="1"');
        },
        isMP3Supported: function () {
            return !!buzz.el.canPlayType && buzz.el.canPlayType("audio/mpeg;");
        },
        isAACSupported: function () {
            return !!buzz.el.canPlayType && (buzz.el.canPlayType("audio/x-m4a;") || buzz.el.canPlayType("audio/aac;"));
        },
        toTimer: function (time, withHours) {
            var h, m, s;
            h = Math.floor(time / 3600);
            h = isNaN(h) ? "--" : h >= 10 ? h : "0" + h;
            m = withHours ? Math.floor(time / 60 % 60) : Math.floor(time / 60);
            m = isNaN(m) ? "--" : m >= 10 ? m : "0" + m;
            s = Math.floor(time % 60);
            s = isNaN(s) ? "--" : s >= 10 ? s : "0" + s;
            return withHours ? h + ":" + m + ":" + s : m + ":" + s;
        },
        fromTimer: function (time) {
            var splits = time.toString().split(":");
            if (splits && splits.length === 3) {
                time = parseInt(splits[0], 10) * 3600 + parseInt(splits[1], 10) * 60 + parseInt(splits[2], 10);
            }
            if (splits && splits.length === 2) {
                time = parseInt(splits[0], 10) * 60 + parseInt(splits[1], 10);
            }
            return time;
        },
        toPercent: function (value, total, decimal) {
            var r = Math.pow(10, decimal || 0);
            return Math.round(value * 100 / total * r) / r;
        },
        fromPercent: function (percent, total, decimal) {
            var r = Math.pow(10, decimal || 0);
            return Math.round(total / 100 * percent * r) / r;
        }
    };
    return buzz;
});