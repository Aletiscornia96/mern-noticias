import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    order: 'desc',
    category: 'sincategoria',
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm') || '';
    const sortFromUrl = urlParams.get('order') || 'desc';
    // const categoryFromUrl = urlParams.get('category') || 'sincategoria';

    setSidebarData({
      searchTerm: searchTermFromUrl,
      order: sortFromUrl,
      // category: categoryFromUrl,
    });

    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch(`/api/post/getposts?${urlParams}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      setPosts(data.posts);
      setLoading(false);
      setShowMore(data.posts.length === 9);
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    setSidebarData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(sidebarData);
    navigate(`/search?${urlParams.toString()}`);
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const res = await fetch(`/api/post/getposts?${urlParams}`);
    if (!res.ok) return;

    const data = await res.json();
    setPosts((prev) => [...prev, ...data.posts]);
    setShowMore(data.posts.length === 9);
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex   items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Buscar:
            </label>
            <TextInput
              placeholder='Buscar...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Ordenar por:</label>
            <Select onChange={handleChange} value={sidebarData.order} id='order'>
              <option value='desc'>Mas reciente</option>
              <option value='asc'>Mas antiguo</option>
            </Select>
          </div>
          <Button type='submit' outline gradientDuoTone='purpleToPink'>
            Aplicar filtros
          </Button>
        </form>
      </div>
      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
          Resultado:
        </h1>
        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
          {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-500'>Noticia no encontrada.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Cargando...</p>}
          <div className='flex flex-col gap-6'>
            <div className='flex flex-wrap justify-between'>
              {!loading &&
                posts &&
                posts.map((post) => (<div className='w-full sm:w-1/2 lg:w-1/2 p-2' key={post._id}>
                  <PostCard post={post} />
                </div>))}
            </div>
            {showMore && (
              <button
                onClick={handleShowMore}
                className='text-teal-500 text-lg hover:underline p-7 w-full '
              >
                Ver Mas
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}