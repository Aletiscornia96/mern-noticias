import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl'>Bienvenido al Funense</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          En esta pagina encontrara gran divesidad de noticas para estar informado constantemente y no perderse ningun detalle.
        </p>
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            {/* <h2 className='text-2xl font-semibold text-center'>Noticias recientes</h2> */}
            <div className='flex flex-wrap justify-between'>
              {posts.map((post) => (
                <div className='w-full sm:w-1/2 lg:w-1/3 p-2' key={post._id}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              Ver más
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

