import React, { useState, useEffect } from 'react'
import { useFetch } from '../customHooks/useFetch'
const Task = () => {
    let url = 'https://jsonplaceholder.typicode.com/posts'
    const { allPost, setAllPost, error, loading, setLoading, createPost, updatePost, deletePost } = useFetch(url);
    console.log(allPost);

    const [formData, setFormData] = useState({ title: "", body: "", userId: "1" })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.id) {  //taking form id and  updating the post.
            updatePost(formData)
            return
        }
        createPost(formData)
    }


    return (
        <>
            <div className="min-h-screen">
                <div>
                    <h1 className='text-[#6366f1]'>Blog Management System</h1>
                    <div >
                        <form className='border rounded-2xl my-4 p-4 ' onSubmit={handleSubmit}>
                            <h1 className='text-xl font-semibold mb-4 '>{formData.id ? "Update Post" : "Create New Post"}</h1>
                            <input className=' w-2/3 border rounded px-4 py-1' type='text' placeholder='Add Title'
                                value={formData.title}
                                onChange={(e) => {
                                    setFormData({ ...formData, title: e.target.value })
                                }}
                                required
                            /><br /><br />
                            <input className=' w-2/3 border rounded px-4 py-1' type='text' placeholder='Add body'
                                value={formData.body}
                                onChange={(e) => {
                                    setFormData({ ...formData, body: e.target.value })
                                }}
                                required
                            /><br />
                            <button className='mt-4 bg-[#6366f1]' type='submit'>{formData.id ? "Update Post" : "Add Post"}</button>

                        </form>
                    </div>
                </div>
                <div>
                    <h2 className='text-[#6366f1] text-2xl'>Post List</h2>
                    {
                        loading ? (<p className='rounded-full h-12 w-12 border-b-2 border-blue-600'>Loading Data........</p>
                        ) : (
                            // <div style={{ background: "white", color: 'grey', padding: "2rem 2rem", border: "6px solid red" }}>
                            //     {
                            //         allPost?.map((cart) => {
                            //             return <div key={cart.id} style={{ background: "black", color: 'grey', padding: "2rem 2rem", border: "6px solid red", margin: "2rem" }}>
                            //                 <p><b>Title:</b> {cart.title}</p>
                            //                 <p><b>Body:</b> {cart.body}</p>
                            //                 <p><b>ID:</b> {cart.userId}</p>
                            //                 <div>
                            //                     <button className="m-2" onClick={() => {
                            //                         setFormData(cart);
                            //                     }
                            //                     }>Edit</button>
                            //                     <button onClick={() => deletePost(cart.id)}>Delete</button>
                            //                 </div>
                            //             </div>
                            //         })
                            //     }
                            // </div>
                            <div className="bg-black-100 p-8 min-h-screen">
                                <div className="grid grid-cols-4 gap-6">
                                    {
                                        allPost?.map((cart) => {
                                            return (
                                                <div
                                                    key={cart.id}
                                                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col gap-3 border border-blue-800"
                                                >
                                                    {/* Card Header */}
                                                    <div className="bg-indigo-50 rounded-xl p-3">
                                                        <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                                                            User ID: {cart.userId}
                                                        </p>
                                                        <h2 className="text-gray-800 font-bold text-lg mt-1 leading-snug capitalize">
                                                            {cart.title}
                                                        </h2>
                                                    </div>

                                                    {/* Card Body */}
                                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                                                        {cart.body}
                                                    </p>

                                                    {/* Card Footer */}
                                                    <div className="flex gap-3 mt-auto pt-3 border-t border-gray-100">
                                                        <button
                                                            onClick={() => setFormData(cart)}
                                                            className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold py-2 rounded-lg transition-colors duration-200"
                                                        >
                                                            ✏️ Edit
                                                        </button>
                                                        <button
                                                            onClick={() => deletePost(cart.id)}
                                                            className="flex-1 bg-red-100 hover:bg-red-500 text-red-500 hover:text-white text-sm font-semibold py-2 rounded-lg transition-colors duration-200"
                                                        >
                                                            🗑️ Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }

                </div>

            </div>
        </>
    )
}

export default Task

// custom hook call and use
// let responce = useFetch('https://jsonplaceholder.typicode.com/posts')
//     setAllPost(responce)
//     console.log("resp", responce);