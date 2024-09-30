import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
    return(
        <div className='p-3 max-w-3xl mx-auto -min-h-screen'>
            <h1 className='text-cnter text-3xl my-7 font-semibold'>Crear Post</h1>
            <form className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput type='text' placeholder='Titulo' required id='title' className='flex-1'/>
                    <Select>
                        <option value="sincategoria">Selecciona una categoria</option>
                        <option value="deporte">Deportes</option>
                        <option value="historia">Historia</option>
                        <option value="social">Social</option>
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                    <FileInput type='file' accept='image/*'/>
                    <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline >Subir imagen</Button>
                </div>
                <ReactQuill theme='snow' placeholder='Escribe algo...' className='h-72 mb-12' required/>
                <Button type='submit' gradientDuoTone='purpleToPink'>Publicar</Button>
            </form>
        </div>
    )
}