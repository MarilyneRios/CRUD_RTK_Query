Petite pratique Crud 

Voici les liens utiles :
- https://redux-toolkit.js.org/tutorials/rtk-query
- https://react-bootstrap.netlify.app/
- https://www.npmjs.com/package/react-router-bootstrap

# React + Vite

# Procédure

**1/ npm create vite@latest**
y
react
javascript
cd vite-project
npm install
npm run dev

**2/ npm i bootstrap react-router-dom**

**3/MockAPI**
Un outil puissant pour créer des API et des serveurs fictifs. Il facilite votre processus de développement en vous permettant de rapidement simuler des API, générer des données personnalisées et effectuer des opérations via une interface RESTful.

> Voici quelques fonctionnalités clés et cas d’utilisation de MockAPI :

- Tests d’intégration transparents :
  Assurez-vous que tous les composants fonctionnent bien ensemble en testant les intégrations entre les API, les systèmes et les applications sans accroc.

- Collaboration Frontend-Backend :
  Ne laissez pas le développement backend vous ralentir. Concevez, développez et testez vos applications frontend en utilisant des données fictives provenant de MockAPI.

- Tests complets d’API :
  Que vous testiez vos propres API ou des intégrations tierces, MockAPI vous permet de tester en toute confiance avec des données qui reflètent des scénarios réels.

- Prêt pour la science des données :
  Si vous avez besoin de données pour votre prochain grand projet d’IA, MockAPI peut générer des ensembles de données adaptés aux applications de science des données, garantissant que vos modèles sont testés avec les meilleures données.

- Prototypage rapide :
  Transformez vos idées en réalité plus rapidement. MockAPI vous aide à visualiser votre produit minimum viable (MVP) avec des données du monde réel, offrant aux utilisateurs finaux une expérience authentique du produit final.
  Comment ça fonctionne :

- Définissez votre modèle de données :
  Commencez par définir votre modèle de données personnalisé à l’aide de l’interface intuitive de MockAPI. Spécifiez les propriétés, les types de données et les contraintes nécessaires pour vos points d’extrémité d’API ou vos applications. Vous pouvez également importer un schéma OpenAPI existant pour créer automatiquement le modèle de données.

- Associez les points d’extrémité à votre modèle :
  Une fois votre modèle de données défini, créez un point d’extrémité et associez-le à votre modèle de données. En effectuant une requête API vers le point d’extrémité, des données fictives réalistes, simulant des scénarios du monde réel et conformes à votre modèle, seront renvoyées en réponse.

**4/ Clean**
App.css, index.css et App.jsx

**5/ npm i @reduxjs/toolkit react-redux**

**6/ Dans src> mkdir RTK**

**7/ Dans RTK> touch userAPI.jsx**

///////////////////////////////////////////////////
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
reducerPath: "userApi",
baseQuery: fetchBaseQuery({ baseUrl: 'https://65f96b3ddf15145246119065.mockapi.io/api' }),
endpoints: (builder) => ({
getUsers : builder.query({
query: () => `/users`,
}),
}),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersQuaery} = userApi
///////////////////////////////////////////////////

**8/ Dans RTK> touch store.jsx**
///////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
<Provider store={store}>
<App />
</Provider>
</React.StrictMode>
);
///////////////////////////////////////////////////

**9/ Dans src> mkdir Components**

**10/ Dans Components > User.jsx**

**11/ Dans Components > Hearder.jsx**

**13/App.jsx**
///////////////////////////////////////////////////
import { BrowserRouter, Routes, Route } from 'react-router-dom';
///////////////////////////////////////////////////
return (
<BrowserRouter>

<Header/>
<Routes>
<Route path="/" element={<Users/>} ></Route>
</Routes>

    </BrowserRouter>

)
///////////////////////////////////////////////////

**14/ npm install react-bootstrap bootstrap**

**15/ Header Link**
///////////////////////////////////////////////////

 <ul className="navbar-nav">
   <li className="nav-item">
  <Link className="nav-link" to="/create">Créer</Link>
   </li>
   <li className="nav-item">
     <Link className="nav-link" to="/edit">Lire</Link>
   </li> 
 </ul>
///////////////////////////////////////////////////

**16/ créer EditUser et createUser puis ajouter les routes dans App**
EditUser => Lire
///////////////////////////////////////////////////
displayOneUser: builder.query({
  query: (id) => `/users/${id}`,
  providesTags: ["User"],
}),
///////////////////////////////////////////////////
  // Récupération du user.id à partir des paramètres de l'URL
  const { id } = useParams();
// Initialisation de l'état du user
  const [user, setUser] = useState({
    id:id,
    name:'',
    email:'',
  });

  // Pour récupérer les datas du user
  const { data } = useDisplayOneUserQuery(id);

  // Mettre à jour l'état du user qd les datas sont récupérées
  useEffect(()=> {
    if(data) {
        setUser({ ...user, name:data.name, email: data.email})
    }
  },[data]); 
///////////////////////////////////////////////////

///////////////////////////////////////////////////

createUser =>

createUsers: builder.mutation({
  query: (user) => ({
    url: `/users`,
    method: "POST",
    body : user
  }),
  invalidatesTags:["User"],
 }),

///////////////////////////////////////////////////
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
///////////////////////////////////////////////////

**17/ npm install react-router-bootstrap**
mise en place du Navbar.Toggle dans le Header.jsx

**18/ EditUser et DeleteUser**

Modifier les datas d'un user =>

    updateUser: builder.mutation({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: "PUT",
                body : user
            }),
            invalidatesTags:["User"],
        }),

///////////////////////////////////////////////////

// Pour gérer les changements dans les champs du formulaire
const handleChange = (e) => {
setUser({ ...user, [e.target.name]: e.target.value });
};

const navigate = useNavigate();
// Pourmodifier les datas du user
const [updateUser] = useUpdateUserMutation()
//Modifier les datas
const handleSubmit = async (e) => {
e.preventDefault();
await updateUser(user);
navigate("/");
};
///////////////////////////////////////////////////

<Form className="...."
      onSubmit={handleSubmit}
>
<h3 className="mb-3">Modifier un utilisateur</h3>
<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  <Form.Label> Nom :</Form.Label>
  <Form.Control     type="text"   name="name" value={user.name}
    placeholder="ecrire votre nom"  onChange={handleChange}
   />
</Form.Group>....
///////////////////////////////////////////////////

 Supprimer un user =>
///////////////////////////////////////////////////
deleteUser: builder.mutation({
  query: (id) => ({
     url: `/users/${id}`,
     method: "DELETE",
  }),
  invalidatesTags:["User"],
}),
///////////////////////////////////////////////////
//Pour supp 1 user
const [deleteUser] = useDeleteUserMutation();
///////////////////////////////////////////////////
<Button className="btn btn-sm btn-danger m-1" onClick={()=> deleteUser(user.id)}>Supprimer</Button>

