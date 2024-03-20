import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useCreateUsersMutation } from "../RTK/userAPI";
import { useNavigate } from "react-router-dom";


const CreateUser = () => {
    const [user, setUser] = useState({});

    const handleChange = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    };

    const [createUsers] = useCreateUsersMutation();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log(user)
        e.preventDefault();
        await createUsers(user);
        navigate('/');
    };

   
  return (
    <div className="mt-5 d-flex justify-content-center w-100">
    <Form 
        className="p-5  border border-2 rounded d-flex flex-column align-items-center justify-content-center"
        onSubmit={handleSubmit}
    >
        <h3 className="mb-3">Ajouter un utilisateur</h3>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label> Nom :</Form.Label>
        <Form.Control type="text" placeholder="ecrire votre nom" name="name" onChange ={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label> Address email :</Form.Label>
        <Form.Control type="email" placeholder="nom@exemple.com" name="email" onChange ={handleChange} />
      </Form.Group>

      <Button 
        type="submit"
        className="btn btn-sm btn-primary m-2 px-3"
        >
            Créer
      </Button>

    </Form>
    </div>

  );
};

export default CreateUser;
