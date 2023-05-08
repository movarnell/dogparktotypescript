import { Route, Routes } from 'react-router-dom';
import './App.css';
import { SetStateAction, useEffect, useState } from 'react';
import MainPage from './Components/MainPage';
import Schedule from './Components/Schedule';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FAQ from './Components/FAQ';
import Navigation from './Components/Navigation';
import Title from './Components/Title';
import axios from 'axios';

type User = {
  id: number,
  name: string,
  dogname: string,
  date: string,
  friendly: boolean,
  puppy: boolean,
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get<User[]>("https://michaelvarnell.com/dogparkserver/get_users.php")
      .then((response: { data: SetStateAction<User[]>; }) => {
        setUsers(response.data);
      })
      .then(parseFriendly)
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  async function fetchUsers(): Promise<User[]> {
    try {
      const response = await axios.get<User[]>('https://michaelvarnell.com/dogparkserver/get_users.php');
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  const getUsers = async () => {
    const usersFromServer = await fetchUsers()
    setUsers(usersFromServer)
    console.log("file: App.js:45 ~ getUsers ~ usersFromServer:", usersFromServer)
  }

  function createUser(data: any) {
    axios.post("https://michaelvarnell.com/dogparkserver/add_dog.php", data)
      .then((response: { data: any; }) => {
        console.log(response.data);
      })
      .then(parseFriendly)
      .catch((error: any) => {
        console.log(error);
      });
  }

  function deleteUser(userId: number) {
    console.log("file: App.js:58 ~ deleteUser ~ userId:", userId)
    axios.delete("https://michaelvarnell.com/dogparkserver/delete_user.php?id=" + userId)
      .then((response: { data: any; }) => {
        console.log(response.data);
      })
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
// TODO This function may not be needed in typescript because the data is already a boolean
  const parseFriendly = () => {
    const newUsers: User[] = users.map((user) => {
      if (user.friendly === true) {
        user.friendly = true;
      } else {
        user.friendly = false;
      }
      return user;
    });
    setUsers(newUsers);
  }

  console.log(users);

  return (
    <>
      <div className='row'>
        <Title />
        <Navigation />
      </div>
      <Routes>
        <Route path="/" element={<MainPage users={users} createUser={createUser} deleteUser={deleteUser} setUsers={setUsers} />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/schedule' element={<Schedule users={users} deleteUser={deleteUser} getUsers={getUsers} />} />
        <Route path='*' element={<MainPage users={users} createUser={createUser} deleteUser={deleteUser} />} />
      </Routes>
    </>
  );
}

export default App;
