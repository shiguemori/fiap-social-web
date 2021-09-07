import {CardComment, CardPost} from "./styles";
import imgProfile from "../../assets/profile.png";
import {useEffect, useState} from "react";
import {getUser} from "../../services/security";
import {format} from "date-fns";
import {api} from "../../services/api";

function Post({data}) {
    let signedUser = getUser();

    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState("");
    const [comment, setComment] = useState("");
    const toggleComments = () => setShowComments(!showComments);
    const [isLoading, setIsLoading] = useState(false);

    const handleComment = (event) => {
        setComment(event.target.value);
    };

    const handleEnviar = async () => {
        setIsLoading(true);
        try {
            await api.post(`/questions/${data.id}/answers`, {
                description: comment
            })
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
        setComments(c => [...c, comment]);
        setComment("");
        loadComments();
    }

    let filteredComments = Object.values(comments).filter(c => c.QuestionId === data.id);

    const loadComments = async () => {
        try {
            const response = await api.get("/answers");
            setComments(response.data);
        } catch (error) {
            alert("Ops, erro ao carregar os comentários");
        }
    }

    useEffect(() => {
        loadComments();
    }, []);

    return (
        <CardPost>
            <header>
                <img src={imgProfile} alt="profile pic"/>
                <div>
                    <p>por {signedUser.studentId === data.Student.id ? "Você " : data.Student.name}</p>
                    <span>em {format(new Date(data.created_at), "dd/MM/yyyy 'às' HH:mm")}</span>
                </div>
            </header>
            <main>
                <div>
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                </div>
                {data.image && <img src={data.image} alt="Imagem do post"/>}
                <footer>
                    {data.Categories.map((cat, idx) => <p key={idx}>{cat.description}</p>)}
                </footer>
            </main>
            <footer>
                <h3 onClick={toggleComments} id="h3_comment" value={filteredComments}>
                    {filteredComments.length === 0 ? "Seja o primeiro a comentar" :
                        `${filteredComments.length} Comentário${filteredComments.length > 1 ? "s" : ``}`
                    }
                </h3>
                {showComments && (
                    <>
                        <Comment value={comments}
                                dataFromParent={Object.values(comments).filter(c => c.QuestionId === data.id)}/>
                    </>
                )}
                <div>
                    <input id="input_comment" type="text" value={comment} onChange={handleComment}
                           name="comment" onKeyUp={handleComment} placeholder="Comente este post"/>
                    <button onClick={handleEnviar} disabled={comment.length < 10}>
                        Enviar
                    </button>
                </div>
            </footer>
        </CardPost>
    );
}

function Comment(data) {
    return (
        data.dataFromParent.map((comment) =>
            <CardComment key={comment.id}>
                <header>
                    <img src={imgProfile} alt="profile pic"/>
                    <span>{format(new Date(comment.createdAt), "dd/MM/yyyy 'às' hh:mm")}</span>
                </header>
                <p>{comment.description}</p>
            </CardComment>
        )
    );
}

export default Post;
