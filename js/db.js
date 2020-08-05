import Loading from "./Loading.js";

const apiUrl = "https://api.football-data.org/"
const apiToken = "9d41556d037f4a3480f0737baa611950";

// Awal Get Id Match

const GetMatchid = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`${apiUrl}v2/matches/${id}`, {
        headers: {
          "X-Auth-Token": apiToken,
        },
      })
      .then((Response) => {
        return Response.json();
      })
      .then((ResponseJson) => {
        const getTanggal = ResponseJson.match.utcDate;
        const getSplitTanggal = getTanggal.split("T");
        const getTrimHuruf = getSplitTanggal[1].replace("Z", "");

        let Nilai = "";
        let Menang = "";

        if (ResponseJson.match.status === "FINISHED") {
          Nilai = `${ResponseJson.match.score.fullTime.homeTeam} x ${ResponseJson.match.score.fullTime.awayTeam}`;

          if (ResponseJson.match.score.winner === "AWAY_TEAM") {
            Menang = ResponseJson.match.awayTeam.name;
          } else if (ResponseJson.match.score.winner === "HOME_TEAM") {
            Menang = ResponseJson.match.homeTeam.name;
          } else {
            Menang = "Seri";
          }

        }

        const ResponseData = {
          id: ResponseJson.match.id,
          Nilai: Nilai,
          Menang: Menang,
          Team1: ResponseJson.match.homeTeam.name,
          Team2: ResponseJson.match.awayTeam.name,
          Status: ResponseJson.match.status,
          Tanggal: getSplitTanggal[0],
          Waktu: getTrimHuruf,
        };

        resolve(ResponseData);
      });
  });
};

// Akhir Get Id Match

// Awal Index DB

const DBMatch = idb.open("Saved-Match", 1, (UpDB) => {
  if (!UpDB.objectStoreNames.contains("TableMatch")) {
    UpDB.createObjectStore("TableMatch", {
      keyPath: "id",
    });
  }
});

const InsertData = (Data) => {
  DBMatch.then((db) => {
      let tx = db.transaction("TableMatch", "readwrite");
      let Store = tx.objectStore("TableMatch");
      Store.put(Data);
      return tx.complete;
    })
    .then(() => {
      Loading(false);
      Notif("Saved", "Data Berhasil disimpan!");
      M.toast({
        html: "Data berhasil disimpan!",
      });
    })
    .catch(() => {
      Loading(false);
      M.toast({
        html: "Anda harus online!",
      });
    });
};

// Akhir Index DB

// Awal Saved Function

const GetData = () => {
  return new Promise((resolve, reject) => {
    DBMatch.then((db) => {
      let tx = db.transaction("TableMatch", "readonly");
      let Store = tx.objectStore("TableMatch");
      return Store.getAll();
    }).then((AllData) => {
      resolve(AllData);
    });
  });
};

const DeleteData = (id) => {
  DBMatch.then((db) => {
      const int = parseInt(id);
      let tx = db.transaction("TableMatch", "readwrite");
      let store = tx.objectStore("TableMatch");
      store.delete(int);
      return tx.complete;
    })
    .then(function () {
      Notif("Deleted", "Data Berhasil dihapus!");
      M.toast({
        html: "Data berhasil dihapus!",
      });
      RenderSavedData();
    })
    .catch(() => {
      M.toast({
        html: "Terjadi kesalahan, coba beberapa saat lagi!",
      });
    });
};

const RenderSavedData = () => {
  Loading(true);

  GetData().then((Matchs) => {
    const Saved = document.querySelector("#saved");
    Saved.innerHTML = "";
    if (Matchs.length === 0) {
      Saved.innerHTML = `<h5 class="center">Tidak ada data yang tersimpan</h5>`;
      return;
    }

    Matchs.forEach((Match) => {
      Saved.innerHTML += `
          <div class="col s12 l6">
            <div class="card">
              <div class="card-content">
                <span class="card-title center">${Match.Team1} vs ${Match.Team2}</span>
                <table>
                  <tr>
                    <td>Score</td>
                    <td>:</td>
                    <td>${Match.Nilai}</td>
                  </tr>
                  <tr>
                    <td>Pemenang</td>
                    <td>:</td>
                    <td>${Match.Menang}</td>
                  </tr>
                  <tr>
                    <td>Tanggal</td>
                    <td>:</td>
                    <td>${Match.Tanggal}</td>
                  </tr>
                  <tr>
                    <td>Waktu</td>
                    <td>:</td>
                    <td>${Match.Waktu}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>:</td>
                    <td>${Match.Status}</td>
                  </tr>
                </table>
              </div>
              <div class="card-action">
                <button class="btn waves-effect red hapus" id="${Match.id}">Hapus</button>
              </div>
            </div>
        </div>
        `;

      const btnDeletes = document.querySelectorAll(".hapus");

      btnDeletes.forEach((btnDelete) => {
        btnDelete.addEventListener("click", (e) => {
          Loading(true);

          DeleteData(e.target.id);
        });
      });
    });
  });

  Loading(false);
};

// Akhir Saved Function

export {
  GetMatchid,
  InsertData,
  RenderSavedData
};