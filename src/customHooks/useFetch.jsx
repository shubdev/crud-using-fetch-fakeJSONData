import React, { useState, useEffect } from 'react'

export const useFetch = (url) => {

    const [allPost, setAllPost] = useState()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const getAllData = async () => {
        setLoading(true);
        try {
            let resp = await fetch(url, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            let response = await resp.json();
            setAllPost(response.slice(0, 10))
        } catch (error) {
            setError(error.message || "data not Found...");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllData()
    }, [])


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
    // return { data: data, loading: loading, error: error }
    return { allPost, loading, error, setLoading, setAllPost, createPost, updatePost, deletePost } //-- > we cam call like thiss as well cos the object names are same.

}

