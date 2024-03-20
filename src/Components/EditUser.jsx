import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { useDisplayOneUserQuery, useUpdateUserMutation } from "../RTK/userAPI";

const EditUser = () => {
  // Récupération du user.id à partir des paramètres de l'URL
  const { id } = useParams();

  // Initialisation de l'état du user
  const [user, setUser] = useState({
    id:id,
    name:'',
    email:'',
  });

  // Pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Pour récupérer les datas du user
  const { data } = useDisplayOneUserQuery(id);

  // Mettre à jour l'état du user qd les datas sont récupérées
  useEffect(()=> {
    if(data) {
        setUser({ ...user, name:data.name, email: data.email})
    }
  },[data]); // S'exécute chaque fois que "data" change

  const navigate = useNavigate();
  // Pourmodifier les datas du user
  const [updateUser] = useUpdateUserMutation()
  //Modifier les datas
  const handleSubmit = async (e) => {
    e.preventDefault();
    await  updateUser(user);
    navigate("/");
  };

  return (
    <div>
      <div className="mt-5 d-flex justify-content-center w-100">
        <Form
          className="p-5  border border-2 rounded d-flex flex-column align-items-center justify-content-center"
          onSubmit={handleSubmit}
        >
          <h3 className="mb-3">Modifier un utilisateur</h3>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label> Nom :</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={user.name}
              placeholder="ecrire votre nom"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label> Address email :</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              placeholder="nom@exemple.com"
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" className="btn btn-sm btn-primary m-2 px-3">
            Modifier
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditUser;
