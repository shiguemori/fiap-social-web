import {CardComent, CardPost} from "./styles";
import imgProfile from "../../assets/profile.png";
import {useEffect, useState} from "react";
import {getUser} from "../../services/security";
import {format} from "date-fns";
import {api} from "../../services/api";

function Post({data}) {
    let signedUser = getUser();

    const [showComents, setShowComents] = useState(false);
    const [comentarios, setComentarios] = useState("");
    const [comentario, setComentario] = useState("");
    const toggleComents = () => setShowComents(!showComents);
    const [isLoading, setIsLoading] = useState(false);

    const handleComentario = (event) => {
        setComentario(event.target.value);
    };


    const handleEnviar = async (e) => {

        setIsLoading(true);
        try {

            await api.post(`/questions/${data.id}/answers`, {
                description: comentario//
            })
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
        setComentarios(c => [...c, comentario]);
        setComentario("");

        loadComentarios();
    }

    let com = Object.values(comentarios).filter(c => c.QuestionId == data.id);

    const loadComentarios = async () => {
        try {
            const response = await api.get("/answers");

            setComentarios(response.data);
        } catch (error) {//
            console.error(error);
            alert("Ops, erro ao buscar os comentários");
        }
    }
    useEffect(() => {
        loadComentarios();
    }, [comentarios]);

    return (
        <CardPost>
            <header>
                <img src={imgProfile}/>
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
                <h3 onClick={toggleComents} id="h3_comment" value={com}>
                    {com.length === 0 ? "Seja o primeiro a comentar" :
                        `${com.length} Comentário${com.length > 1 ? "s" : ``}`
                    }
                </h3>
                {showComents && (
                    <>
                        <Coment value={comentarios}
                                dataFromParent={Object.values(comentarios).filter(c => c.QuestionId == data.id)}/>
                    </>
                )}
                <div>
                    <input id="input_comentario" type="text" value={comentario} onChange={handleComentario}
                           name="comentario" onKeyUp={handleComentario} placeholder="Comente este post"/>
                    <button onClick={handleEnviar} disabled={comentario.length < 10}>Enviar</button>
                </div>
            </footer>
        </CardPost>
    );
}

function Coment(data) {
    return (
        data.dataFromParent.map((comment) =>
            <CardComent key={comment.id}>
                <header>
                    <img src={imgProfile}/>
                    <span>{/**/format(new Date(comment.createdAt), "dd/MM/yyyy 'às' hh:mm")}</span>
                </header>
                <p>{comment.description}</p>
            </CardComent>
        )
    );
}

export default Post;
