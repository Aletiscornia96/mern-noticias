import { Alert, Button, Textarea } from 'flowbite-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



export default function CommentSection({postId}) {
    const { currentUser } = useSelector((state) => state.user)
    const [comment, setcomment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(comment.length > 200) {
            return;
        }
        try {
            const res = await fetch('/api/comment/create',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({content: comment, postId, userId: currentUser._id})
            });
            const data = await res.json();
            if(res.ok){
                setcomment('');
                setCommentError(null);
            }
        } catch (error) {
            setCommentError(error.message)
        }
    }

    return(
        <div className='max-w-2xl mx-auto w-full p-3'>
            {currentUser ? 
                (
                    <div className='flex items-center gap-1 my-5 dark:text-gray-100 text-sm'>
                        <p>Conectado como:</p>
                        <img className='h-8 w-8 object-cover rounded-full' src={currentUser.profilePicture} />
                        <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
                            @{currentUser.username}
                        </Link>
                    </div>
                ):
                (
                    <div className='text-sm text-teal-500 my-5 flex gap-1'>
                        Debes estar logueado para comentar. 
                        <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
                            Iniciar Sesion
                        </Link>
                    </div>
                )}
            {currentUser && (
                <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3'>
                    <Textarea placeholder='Agregar comentario' rows='3' maxLength='200' onChange={(e)=>setcomment(e.target.value)} value={comment}/>
                    <div className='flex justify-between items-center mt-5'>
                        <p className='text-gray-500 text-xs'>{200-comment.length} caracteres restantes</p>
                        <Button outline radiantDuoTone='purpleToBlue' type='submit'>
                            Comentar
                        </Button>
                    </div>
                    {commentError && (
                        <Alert color='failure' className='mt-5'>
                            {commentError}
                        </Alert>
                    )}
                </form>
            )}
        </div>
    )
}