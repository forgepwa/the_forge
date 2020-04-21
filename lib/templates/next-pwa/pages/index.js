import Layout from '../components/MyLayout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import { getAllMovies } from '../utils/apiCalls'

const Index = (props) => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map((show) => (
        <li key={show.id}>
          <Link href="/p/[id]" as={`/p/${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function () {
  const data = await getAllMovies(
    'https://api.tvmaze.com/search/shows?q=batman'
  )

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data.map((entry) => entry.show),
  }
}

export default Index
