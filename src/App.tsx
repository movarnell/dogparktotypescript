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
import { User } from './Components/User';


function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  async function fetchUsers(): Promise<User[]> {
    try {
      const response = await axios.get<User[]>('https://michaelvarnell.com/dogparkserver/get_users.php');
      return response.data.map(user => ({
        ...user,
        friendly: Number(user.friendly) === 1, // convert boolean to number before comparing
        puppy: Number(user.puppy) === 1, // convert boolean to number before comparing
      }));
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

  function createUser(data: User) {
    axios.post("https://michaelvarnell.com/dogparkserver/add_dog.php", data)
      .then((response: { data: any; }) => {
        console.log(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  function deleteUser(userId: any) {
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
  // const parseFriendly = () => {
  //   const newUsers: User[] = users.map((user) => {
  //     if (user.friendly === true) {
  //       user.friendly = true;
  //     } else {
  //       user.friendly = false;
  //     }
  //     return user;
  //   });
  //   setUsers(newUsers);
  // }

  console.log(users);

  return (
    <>
      <div className='row'>
        <Title />
        <Navigation />
      </div>
      <Routes>
        <Route path="/" element={<MainPage users={users} createUser={createUser} deleteUser={deleteUser} getUsers={getUsers} setUsers={setUsers} />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/schedule' element={<Schedule users={users} deleteUser={deleteUser} getUsers={getUsers} />} />
        <Route path='*' element={<MainPage users={users} createUser={createUser} deleteUser={deleteUser} getUsers={getUsers} setUsers={setUsers} />} />
      </Routes>
    </>
  );
}

export default App;
