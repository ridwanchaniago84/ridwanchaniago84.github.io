import { RenderSavedData } from "./db.js";
import { MainAPI, TandingAPI } from "./api.js";

const app = () => {
  // Awal Setting Halaman

  const Paralax = document.querySelectorAll(".parallax");
  M.Parallax.init(Paralax);

  let Page = window.location.hash.substr(1);
  if (Page == "") Page = "main";

  const LoadPage = (Page) => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4) {
        const Content = document.querySelector("#content");
        if (xhttp.status == 200) {
          if (Page === "main")
          {
            MainAPI();
          }
          else if (Page === "tanding")
          {
            TandingAPI();
          }
          else if (Page === "nanti")
          {
            RenderSavedData();
          }
          Content.innerHTML = xhttp.responseText;
        } else if (xhttp.status == 404) {
          Content.innerHTML = `<h4 align="center">Halaman tidak ditemukan.</h4>`;
        } else {
          Content.innerHTML = `<h4 align="center">Halaman Tidak Bisa Diakses</h4>`;
        }
      }
    };
    xhttp.open("GET", `pages/${Page}.html`, true);
    xhttp.send();
  };

  LoadPage(Page);

  const Elements = document.querySelectorAll(".sidenav");
  M.Sidenav.init(Elements);

  const LoadNavigation = () => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        document.querySelectorAll(".MainNav, .sidenav").forEach((Element) => {
          Element.innerHTML = xhttp.responseText;
        });

        document
          .querySelectorAll(".sidenav a, .MainNav a, #btnMain")
          .forEach((Element) => {
            Element.addEventListener("click", (e) => {
              const SideNavi = document.querySelector(".sidenav");
              M.Sidenav.getInstance(SideNavi).close();

              let Page = e.target.getAttribute("href").substr(1);
              LoadPage(Page);
            });
          });
      }
    };
    xhttp.open("GET", "navigation.html", true);
    xhttp.send();
  };

  LoadNavigation();

  // Akhir Setting Halaman);
};

export default app();