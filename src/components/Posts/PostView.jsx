import React, { useContext } from "react";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { DBContext } from "../../contexts";
import { updateDoc, doc } from "firebase/firestore";

function PostView({ nickname, picture, post, fetchPosts }) {
    const { db } = useContext(DBContext);

    const handleClick = async (option) => {
        const userDoc = doc(db, "communication_posts", post.id);
        const newFields = { [option]: post[option] + 1 };
        await updateDoc(userDoc, newFields);
        fetchPosts();
    };

    return (
        <div className="relative rounded-xl bg-[#2B777C] p-6">
            <div className="flex gap-4 mb-4">
                {nickname && picture ? (
                    <>
                        <p className="font-mono text-md text-[#B1D06A]">Posted by</p>
                        <div className="flex gap-2 items-center">
                            <img
                                className="h-6 w-6 rounded-full"
                                src={picture}
                            />
                            <p className="font-mono font-medium text-md text-[#B1D06A]">
                                {nickname}
                            </p>
                        </div>
                    </>
                ) : (
                    <p className="font-mono font-medium text-md text-[#B1D06A]">
                        Posted anonymously
                    </p>
                )}
            </div>
            <div className="text-white" dangerouslySetInnerHTML={{ __html: post.content }}></div>
            <div className="flex justify-end gap-6">
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() => handleClick("likes")}
                >
                    <AiFillLike />
                    <p className="font-mono">{post.likes}</p>
                </div>
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() => handleClick("dislikes")}
                >
                    <AiFillDislike />
                    <p className="font-mono">{post.dislikes}</p>
                </div>
            </div>
        </div>
    );
}

export default PostView;
