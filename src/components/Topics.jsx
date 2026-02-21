import React from 'react'

const Topics = () => {

    //https://jsonplaceholder.typicode.com/posts/1
    // create page with two button(prev, next)
    // if we click the prev, then it should show the prev post, 
    // if we click on the next, then it should show the next post
    // note —> previous can’t be less then 1,
    // and next can’t be greater then 50 .


    // const [posts, setPosts] = useState([])
    const [id, setId] = useState(1)
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(false);
    console.log("posts", post);

    const getData = async () => {
        setLoading(true) // true cos loading show karna chahiye jab tak data load na ho screen pe.
        const url = `https://jsonplaceholder.typicode.com/posts/${id}`
        const res = await fetch(url);
        const data = await res.json();
        setLoading(false);
        setPost(data);
    }

    useEffect(() => {
        getData();
    }, [id])


    if (loading == true) {
        return <div>Wait kar Lala Data is Loading....</div>
    } //laoding pe ye code show honga or niche wala return nahi karenga jese hi data load ho jayenga nichwe wala return run hong.

    return (
        <>
            <div>
                <p>{id}</p>
            </div>
            <div>
                <button onClick={() => {
                    if (id == 1) {
                        return
                    }
                    setId(id - 1)
                }}>Prev</button>
                <button onClick={() => {
                    setId(id + 1)
                }}>Next</button>
            </div>
            <div>
                {post && post.title !== null ?
                    <div>
                        <p>  {post.title}</p>
                        <p>  {post.body}</p>
                    </div> : <div>
                        <p>data not found.....</p>
                    </div>}
            </div>
        </>
    )
}

export default Topics