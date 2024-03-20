import { Link } from "react-router-dom";
import { useDisplayUsersQuery, useDeleteUserMutation } from "../RTK/userAPI"

import { Button } from "react-bootstrap";
const Users = () => {
  
    //afficher tous les users
    const { data: users, isError, isLoading, isSuccess, error,  } = useDisplayUsersQuery()

    //Pour supp 1 user
    const [deleteUser] = useDeleteUserMutation();

  return (
    <div className="d-flex flex-wrap justify-content-center p-3">
    {isLoading && <h3>Loading ...</h3>}
    {isError &&<h3>Something is wrong ...</h3> }
    {isSuccess && 
        users.map(user =>(
            <div key={user.id} className="p-3 border border-2 border-dark m-2 d-flex flex-column align-items-center justify-content-center">
                <h4>{user.name}</h4>
                <h4>{user.email}</h4>
                <Button className="btn btn-sm btn-danger m-1" onClick={()=> deleteUser(user.id)}>Supprimer</Button>
                <Link className="btn btn-sm btn-primary  m-1" to={`/edit/${user.id}`}>Modifier</Link>
            </div>
        ))
    }
    </div>
  )
}

export default Users