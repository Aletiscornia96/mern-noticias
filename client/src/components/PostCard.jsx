import { Link } from 'react-router-dom';

export default function PostCard({post}) {
    return (
        <div className='group relative h-[400px] overflow-hidden rounded-lg transition-all'>
            <Link to={`/post/${post.slug}`}>
                <img
                    src={post.image}
                    alt='post cover'
                    className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-200 z-20'
                />
            </Link>
            <div className='p-3 flex flex-col gap-2 '>
                <p className='text-lg font-semibold line-clamp-1'>{post.title}</p>
                <span className='italic text-sm'>{post.category}</span>
                <Link
                    to={`/post/${post.slug}`}
                    className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-transparent  bg-teal-500 text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
                >
                    Leer Noticia
                </Link>
            </div>
        </div>
    );
}
