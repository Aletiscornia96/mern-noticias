import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";


export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState(null);


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if(!res.ok){
                    setError(true);
                    setLoading(false);
                    return;
                }
                if(res.ok){
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false)
                console.log(error)
            }
        }
        fetchPosts();
    }, [postSlug]);

    useEffect(() => {
        try {
            const fetchRecentPosts = async () => {
                const res = await fetch(`/api/post/getposts?limit=3`);
                const data = await res.json();
                if(res.ok) {
                    setRecentPosts(data.posts);
                }
            }
            fetchRecentPosts();
        } catch (error) {
            console.log(error)
        }
    })


    if(loading) return(
        <div className='flex justify-center items-center min-h-screen'>
            <Spinner size='xl' />
        </div>
    );
    if (error) return <div>Error al cargar el post.</div>;
    return(
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
            <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{post && post.title}</h1>
            <Link to={`/search?category=${post && post.category}`} className='self-center mt-5'>
                <Button color='gray' pill size='xs'>{post && post.category}</Button>
            </Link>
            <img src={post && post.image} alt={post && post.title} className='mt-10 p-3 max-h-[600px] w-full object-cover' />
            <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full mx-w-2xl text-xs'>
                <span >{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span className='italic'>Tiempo estimado: {post && (post.content.length /100).toFixed(0)}min</span>
            </div>
            <div className=''>
                <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{__html: post && post.content}}>

                </div>
            </div>
            <CommentSection postId={post._id}/>
            <div className='flex flex-col justify-center items-center mb-5'>
    <h1 className='text-xl mt-5'>Noticias Recientes</h1>
    <div className='flex justify-center gap-4 mt-5'>
        {recentPosts && 
            recentPosts.map((post) => (
                <div  key={post._id}>
                    <PostCard post={post} />
                </div>
            ))
        }
    </div>
</div>
        </main>
    )
}