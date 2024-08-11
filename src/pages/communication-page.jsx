import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import PostView from "../components/Posts/PostView";
import { Editor } from "@tinymce/tinymce-react";
import { DBContext } from "../contexts";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Button } from "@headlessui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@headlessui/react";
import dayjs from "dayjs";
import floodLogoImage from "../images/floodlogo.png";

function CommunicationPage() {
    const { db } = useContext(DBContext);
    const { user } = useAuth0();
    const postsCollectionRef = collection(db, "communication_posts");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [anonymously, setAnonymously] = useState(false);
    const editorRef = useRef(null);
    const navigate = useNavigate();

    const getPosts = async () => {
        const data = await getDocs(postsCollectionRef);
        const postsData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));

        setPosts(
            postsData.sort((a, b) => {
                if (dayjs(a.timestamp).isBefore(dayjs(b.timestamp))) {
                    return 1;
                }
                return -1;
            })
        );
    };

    useEffect(() => {
        getPosts();
    }, []);

    const postElements = useMemo(() => {
        return posts.map((post, index) => (
            <PostView
                key={index}
                nickname={post.authorNickname}
                picture={post.authorImage}
                post={post}
                fetchPosts={getPosts}
            />
        ));
    }, [posts]);

    const handlePostSubmission = async () => {
        setLoading(true);
        console.log(anonymously, anonymously ? "" : user?.picture || "");

        let picture = user?.picture || "";
        let nickname = user?.nickname || "";

        if (anonymously) {
            picture = "";
            nickname = "";
        }

        await addDoc(postsCollectionRef, {
            content: editorRef.current.getContent(),
            authorNickname: nickname,
            authorImage: picture,
            likes: 0,
            dislikes: 0,
            timestamp: dayjs().format(),
        });
        editorRef.current.setContent("");
        setLoading(false);
    };

    useEffect(() => {
        setInterval(getPosts, 5000);
    }, []);

    return (
        <div>
            <div className="p-8 px-24 flex flex-col items-center">
                <Button
                    onClick={() => navigate("/")}
                    className="bg-indigo-500 h-10 w-28 rounded-md mb-6"
                >
                    <p className="font-mono text-white">Main page</p>
                </Button>
                <div>
                    <img src={floodLogoImage} />
                </div>
                <div className="grid grid-cols-2">
                    <div className="h-[36rem] overflow-scroll">
                        <h2 className="font-mono text-4xl my-8 text-center text-white">
                            Posts
                        </h2>
                        <div className="px-24 flex flex-col gap-4">
                            {postElements}
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className="font-mono text-4xl text-white">
                            Add new post
                        </h1>
                        <p className="font-mono text-xl mt-2 mb-4 text-white">
                            Here you can add new post...
                        </p>
                        <Editor
                            apiKey="nfy5gnv77mnta4deqptoi8w8mnf7aautvn5rnhsz3q1d38qs"
                            onInit={(_evt, editor) =>
                                (editorRef.current = editor)
                            }
                            init={{
                                height: 300,
                                menubar: false,
                                plugins: [
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "code",
                                    "help",
                                    "wordcount",
                                ],
                                toolbar:
                                    "undo redo | blocks | " +
                                    "bold italic underline strikethrough | alignleft aligncenter " +
                                    "alignright alignjustify | bullist numlist outdent indent | " +
                                    "removeformat | help",
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                        />
                        <div
                            className="mt-4 flex gap-2 cursor-pointer items-center"
                            onClick={() =>
                                setAnonymously((prevState) => !prevState)
                            }
                        >
                            <Checkbox
                                checked={anonymously}
                                onChange={setAnonymously}
                                className="group block size-5 rounded border bg-white data-[checked]:bg-blue-500 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:data-[disabled]:bg-gray-500"
                            >
                                <svg
                                    className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                >
                                    <path
                                        d="M3 8L6 11L11 3.5"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Checkbox>
                            <p className="font-mono text-md text-white">
                                Send anonymously
                            </p>
                        </div>
                        <div className="mt-4">
                            <Button
                                disabled={loading}
                                className="bg-indigo-500 h-12 w-56 rounded-md"
                                onClick={handlePostSubmission}
                            >
                                <p className="font-mono text-white text-md">
                                    {loading ? "Loading..." : "Publish"}
                                </p>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommunicationPage;
