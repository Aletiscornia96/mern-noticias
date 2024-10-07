import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const limit = 9;

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/post/getPosts?limit=${limit}&startIndex=${startIndex}`);
      const data = await res.json();
      setPosts(prevPosts => [...prevPosts, ...data.posts]); // Añadir nuevos posts al estado

      // Si el número de posts devueltos es menor que el límite, ocultar el botón "Ver Más"
      if (data.posts.length < limit) {
        setShowMore(false);
      }
    };

    fetchPosts();
  }, [startIndex]); // Dependemos de `startIndex` para volver a cargar los posts

  const handleShowMore = () => {
    setStartIndex(prevStartIndex => prevStartIndex + limit); // Aumentar el startIndex para cargar más posts
  };

  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl'>Bienvenido al Funense</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          En esta pagina encontrara gran divesidad de noticas para estar informado constantemente y no perderse ningun detalle.
        </p>
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <div className='flex flex-wrap justify-between'>
              {posts.map((post) => (
                <div className='w-full sm:w-1/2 lg:w-1/3 p-2' key={post._id}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
            {showMore && (
              <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>Ver Más</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
