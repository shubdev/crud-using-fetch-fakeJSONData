import React, { useState, useEffect } from 'react'

const Task = () => {
    const [allPost, setAllPost] = useState([])
    // console.log("post", allPost);
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({ title: "", body: "", userId: "1" })

    const getAllData = () => {
        setLoading(true);
        try {
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: "GET",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then(response => response.json())
                .then(data => setAllPost(data.slice(0, 6)));

        } catch (error) {
            console.log("data not Found...", error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.id) {
            updatePost(formData)
            return
        }
        createPost(formData)
    }

    const createPost = async (data) => {
        try {
            let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',  //if you have old version of browser then you may face an issue- u get only id in responce not an object. so we have to use charset=utf-8.
                },
            })
            let newPost = await response.json()
            // console.log("newpost", newPost);
            setAllPost((prev) => [newPost, ...prev])     // Add new post at the beginning
            setFormData({ title: "", body: "" })
            // alert(`Post created successfully! ID: ${newPost.id}`);

        } catch (error) {
            console.error('Error creating post:', error);
            // alert("Failed to create post.")
        }
    }


    const updatePost = async (data) => {

        let responce = await fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        let updateData = await responce.json()
        setAllPost(prev => prev.map(p => p.id === data.id ? updateData : p))

    }

    const deletePost = (id) => {
        setAllPost(prev => prev.filter((del) => del.id !== id))
        alert("post deleted successfull");
    }

    useEffect(() => {
        getAllData()
    }, [])



    return (
        <>
            <div className="min-h-screen">
                {/* create form - include title and body and crete post button*/}

                <div>
                    <h1>Blog Management System</h1>

                    <div>
                        <form className='border rounded-2xl my-4 p-4 ' onSubmit={handleSubmit}>
                            <h1 className='text-xl font-semibold mb-4 '>Create New Post </h1>
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
                            <button className='mt-4' type='submit'>{formData.id ? "Update Post" : "Add Post"}</button>

                        </form>
                    </div>

                </div>
                {/* create posts list whitch add title , body, button- delete and edit. */}

                <div>
                    <h1>Post List</h1>
                    {
                        loading ? (<p className='rounded-full h-12 w-12 border-b-2 border-blue-600'>Loading Data........</p>
                        ) : (
                            <div style={{ background: "white", color: 'grey', padding: "2rem 2rem", border: "6px solid red" }}>
                                {
                                    allPost.map((cart) => {
                                        return <div key={cart.id} style={{ background: "black", color: 'grey', padding: "2rem 2rem", border: "6px solid red", margin: "2rem" }}>
                                            <p><b>Title:</b> {cart.title}</p>
                                            <p><b>Body:</b> {cart.body}</p>
                                            <p><b>ID:</b> {cart.userId}</p>
                                            <div>
                                                <button className="m-2" onClick={() => {
                                                    setFormData(cart);
                                                }
                                                }>Edit</button>
                                                <button onClick={() => deletePost(cart.id)}>Delete</button>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        )
                    }

                </div>

            </div>
        </>
    )
}

export default Task