import { Table } from 'flowbite-react';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export default function DashPosts() {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
          const data = await res.json();
          if (res.ok) {
            setUserPosts(data.posts);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      if (currentUser.isAdmin) {
        fetchPosts();
      }
    }, [currentUser._id])
    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && userPosts.length > 0 ? (
                <>
                    <Table hoverable className="shadow-md">
                        <Table.Head>
                            <Table.HeadCell>Fecha creación</Table.HeadCell>
                            <Table.HeadCell>Imagen</Table.HeadCell>
                            <Table.HeadCell>Título</Table.HeadCell>
                            <Table.HeadCell>Categoría</Table.HeadCell>
                            <Table.HeadCell>Eliminar</Table.HeadCell>
                            <Table.HeadCell>
                                <span>Editar</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className='divide-y'>
                            {userPosts.map((post) => (
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={post.id}> {/* Asegúrate de tener una clave única */}
                                    <Table.Cell>
                                        {new Date(post.updatedAt).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/post/${post.slug}`}>
                                            <img src={post.image} alt={post.title} className='w-20 h-10 object-cover bg-gray-500' />
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell className='ront-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>{post.title}</Table.Cell>
                                    <Table.Cell>{post.category}</Table.Cell>
                                    <Table.Cell>
                                        <span className='font-medium text-red-500 hover:underline cursor-pointer'>Eliminar</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link className='text-teal-500 hover:underline' to={`/update-post/${post._id}`}>
                                            <span>Editar</span>
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </>
            ) : (
                <p>No hay noticias para mostrar</p>
            )}
        </div>
    );
    
}