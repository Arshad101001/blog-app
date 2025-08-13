import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'


function AllPosts() {

    const [posts, setPosts] = useState([])
    const userId = useSelector(state => state.authReducer.userData)
    useEffect(() => {
        appwriteService.getPosts('userId', userId).then((posts) => {
            if (posts) {
                setPosts(posts)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No post to display
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className="flex flex-wrap">
                        {
                            posts.map((post) => (
                                <div key={post.id} className='p-2 w-1/4'>
                                    <PostCard {...post} />
                                </div>
                            ))
                        }
                    </div>
                </Container>
            </div>
        )
    }
}

export default AllPosts