export default function AbstractWelcomePage(props) {
return(
    <div className="homePage">
      <header className="header">
        {props.header}
      </header>

      <aside className="home_sidebar_left">
        {props.left}
      </aside>

      <main className="welcomePageBody">
        {props.children}
      </main>

      <footer>
        {props.footer}
      </footer>

    </div>
)
}