import Link from 'next/link'
import { getAllPosts } from './api/posts'

interface HomeProps {
  posts: Array<{
    slug: string
    title: string
  }>
}

export default function Home(props: HomeProps) {
  return (
    <div>
      <h1>Blog do Rener</h1>
      <ul>
        {props.posts.map((post, idx) => (
          <li key={idx}>
            <Link href={post.slug}> {post.title} </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  const allPosts = await getAllPosts()

  return {
    props: {
      posts: allPosts,
    }
  }
}