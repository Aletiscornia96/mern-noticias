import { Button, Modal, Table } from 'flowbite-react';
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { FaCheck, FaTimes } from 'react-icons/fa'

export default function DashComments() {
    const { currentUser } = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [commentsIdToDelete, setCommentsIdToDelete] = useState('');
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch('/api/comment/getcomments');
                const data = await res.json();
                if (res.ok) {
                    setComments(data.comments);
                    if (data.comments.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if (currentUser.isAdmin) {
            fetchComments();
        }
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = comments.length;
        try {
            const res = await fetch(`/api/comment/getcomments&startIndex=${startIndex}`);
            const data = await res.json();
            if (res.ok) {
                setComments((prev) => [...prev, ...data.comments]);
                if (data.comments.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleDeleteComments = async () => {
        try {
            const res = await fetch(`api/comment/delete/${commentsIdToDelete}`,
                {
                    method: 'DELETE',
                }
            );
            const data = await res.json();
            if (res.ok) {
                setComments((prev) => prev.filter((comment) => comment._id !== commentsIdToDelete));
                setShowModal(false);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && comments.length > 0 ? (
                <>
                    <Table hoverable className="shadow-md">
                        <Table.Head>
                            <Table.HeadCell>Fecha de actualizacion</Table.HeadCell>
                            <Table.HeadCell>Comentaio</Table.HeadCell>
                            <Table.HeadCell>Numero de likes</Table.HeadCell>
                            <Table.HeadCell>ID de la noticia</Table.HeadCell>
                            <Table.HeadCell>ID del usuario</Table.HeadCell>
                            <Table.HeadCell>Eliminar</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className='divide-y'>
                            {comments.map((comment) => (
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={comment._id}> {/* Asegúrate de tener una clave única */}
                                    <Table.Cell>
                                        {new Date(comment.updatedAt).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell >
                                        {comment.content}
                                    </Table.Cell>
                                    <Table.Cell className='ront-medium text-gray-900 dark:text-white' >
                                        {comment.numberOfLikes}
                                    </Table.Cell>
                                    <Table.Cell>{comment.postId}</Table.Cell>
                                    <Table.Cell>{currentUser.isAdmin ? (<FaCheck className='text-green-500' />) : (<FaTimes className='text-red-500' />)}</Table.Cell>
                                    <Table.Cell>
                                        <span className='font-medium text-red-500 hover:underline cursor-pointer'>Eliminar</span>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    {
                        showMore && (
                            <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>Ver Mas</button>
                        )
                    }
                </>
            ) : (
                <p>No hay comentarios para mostrar</p>
            )}
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center gap-4">
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Esta segudo que desea elimar este comentario?</h3>
                        <div className='flex justify-center'>
                            <Button color='failure' onClick={handleDeleteComments}>Si, estoy seguro</Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>No, cancelar</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );

}
