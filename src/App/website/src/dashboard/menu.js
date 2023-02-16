import "./menu/navbar.css"
import "./menu/menu.css"
import "./menu/root.css"

function Menu() {
  return (
<body class="on">
  <div class="loading" id="loading-box">
    <div class="loading-item"><div class="loading-progress"></div></div>
  </div>
       <div class="navbar">
      <div class="container">
        <div class="navbar-nav">
          <div class="navbar-brand">
            <span class="navbar-brand-txt"><a class="txt-bold type-1" href="/">Kaede Bot</a></span>
          </div>

          <span class="navbar-toggler" id="toggler"><i onclick="toggleNavbar(this)" class="fas fa-bars"></i></span>

          <div class="navs" id="navs">
            <div class="navs-item notbtn"><a href="/comandos" class="txt-uppercase">Comandos</a></div>
            <div class="navs-item notbtn"><a href="#" class="txt-uppercase">Suporte</a></div>
            <div class="navs-item notbtn"><a href="#" class="txt-uppercase">Convite</a></div>
          </div>
        </div>
      </div>
   </div>

  <div class="jumbotron">
      <div class="container">
        <div class="jumbotron-items">
          <div class="jumbotron-item">
            <span class="jumbotron-t">Kaede bot</span>
            <p class="jumbotron-d">Uma bot multifuncional pra seu servidor!</p>
            <div class="jumbotron-buttons">
              <button class="btn" onclick="location.href='#features'">Comandos</button>
              <button class="btn blue" onclick="location.href='#'">Convite</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
  )
}

export default Menu;