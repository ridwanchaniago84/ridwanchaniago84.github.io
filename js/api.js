import Loading from "./Loading.js";
import {
  GetMatchid,
  InsertData
} from "./db.js";

const apiUrl = "https://api.football-data.org/"
const apiToken = "9d41556d037f4a3480f0737baa611950";

// Awal Main API

const MainAPI = () => {
  Loading(true);

  fetch(
      `${apiUrl}v2/competitions/2021/standings?standingType=HOME`, {
        headers: {
          "X-Auth-Token": apiToken,
        },
      }
    )
    .then((reponse) => {
      return reponse.json();
    })
    .then((responseJson) => {
      RenderMain(responseJson);
    })
    .catch(() => {
      Loading(false);
      M.toast({
        html: "Periksa jaringan internet Anda!",
      });
    });
};

const RenderMain = (Teams) => {
  const tim = document.querySelector("#tim");
  tim.innerHTML = "";

  Teams.standings.forEach((TeamT) => {
    TeamT.table.forEach((Team) => {
      tim.innerHTML += `
          <div class="col s12 l4">
            <div class="card">
              <div class="card-content">
                <img class="app-img-center" alt="${Team.team.name}" src="${Team.team.crestUrl}" height="150px" />
                <span class="card-title center">${Team.team.name}</span>
                <table>
                  <tr>
                    <td>Bermain</td>
                    <td>:</td>
                    <td>${Team.playedGames}x</td>
                  </tr>
                  <tr>
                    <td>Menang</td>
                    <td>:</td>
                    <td>${Team.won}x</td>
                  </tr>
                  <tr>
                    <td>Seri</td>
                    <td>:</td>
                    <td>${Team.draw}x</td>
                  </tr>
                  <tr>
                    <td>Kalah</td>
                    <td>:</td>
                    <td>${Team.lost}x</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        `;
    });
  });

  Loading(false);
};

//Akhir Main API

// Awal API Match

const TandingAPI = () => {
  Loading(true);

  fetch(`${apiUrl}v2/competitions/2001/matches`, {
      headers: {
        "X-Auth-Token": apiToken,
      },
    })
    .then((reponse) => {
      return reponse.json();
    })
    .then((responseJson) => {
      RenderTanding(responseJson);
    })
    .catch(() => {
      Loading(false);
      M.toast({
        html: "Periksa jaringan internet Anda!",
      });
    });
};

const RenderTanding = (Matchs) => {
  const ListTanding = document.querySelector("#tanding");
  ListTanding.innerHTML = "";

  Matchs.matches.forEach((Match) => {
    const Tanggal = Match.utcDate;
    const SplitTanggal = Tanggal.split("T");
    const TrimHuruf = SplitTanggal[1].replace("Z", "");

    let Nilai = "";
    let Menang = "";

    if (Match.status === "FINISHED") {
      Nilai = `${Match.score.fullTime.homeTeam} x ${Match.score.fullTime.awayTeam}`;

      if (Match.score.winner === "AWAY_TEAM") {
        Menang = Match.awayTeam.name;
      } else if (Match.score.winner === "HOME_TEAM") {
        Menang = Match.homeTeam.name;
      } else {
        Menang = "Seri";
      }
    }

    ListTanding.innerHTML += `
        <div class="col s12 l6">
          <div class="card">
            <div class="card-content">
              <span class="card-title center">${Match.homeTeam.name} vs ${Match.awayTeam.name}</span>
              <table>
                <tr>
                  <td>Score</td>
                  <td>:</td>
                  <td>${Nilai}</td>
                </tr>
                <tr>
                  <td>Pemenang</td>
                  <td>:</td>
                  <td>${Menang}</td>
                </tr>
                <tr>
                  <td>Tanggal</td>
                  <td>:</td>
                  <td>${SplitTanggal[0]}</td>
                </tr>
                <tr>
                  <td>Waktu</td>
                  <td>:</td>
                  <td>${TrimHuruf}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>:</td>
                  <td>${Match.status}</td>
                </tr>
              </table>
            </div>
            <div class="card-action">
              <button class="btn waves-effect simpan" id="${Match.id}">Tandai</button>
            </div>
          </div>
      </div>
    `;

    const btnSaves = document.querySelectorAll(".simpan");

    btnSaves.forEach((btnsave) => {
      btnsave.addEventListener("click", (e) => {
        Loading(true);

        const idData = e.target.id;

        GetMatchid(idData).then(Response => {
          InsertData(Response);
        });
      });
    });
  });

  Loading(false);
};

//Akhir Match API

export {
  MainAPI,
  TandingAPI
};