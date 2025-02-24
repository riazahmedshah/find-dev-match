import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <h1>Home page..</h1>
      <button ><Link className="btn" to="/feed">Feed page</Link></button>
    </div>
  )
}

export default Home