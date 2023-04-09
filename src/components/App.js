import React, { useState } from 'react'
import '../styles/App.css';

const App = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);

  const fetchUsers = () => {
    setUsers([]);
    setIsLoading(true);
    fetch("https://content.newtonschool.co/v1/pr/main/users")
      .then((response) => { return response.json() })
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const sortHandler = () => {
    setSortAscending(!sortAscending);
    if (sortAscending) {
      let ascendingUsers = users;
      ascendingUsers.sort((a, b) => a.name.length - b.name.length);
      setUsers(ascendingUsers);
    }
    else {
      let decendingUsers = users;
      decendingUsers.sort((a, b) => b.name.length - a.name.length);
      setUsers(decendingUsers);
    }
  }

  return (
    <div id="main">
      <h2>User List</h2>
      <button onClick={() => fetchUsers()} className="fetch-data-btn">Fetch User Data</button>
      <button className="sort-btn" onClick={sortHandler}>
        {sortAscending ? "Sort by name length (ascending)" :
          "Sort by name length (descending)"}
      </button>
      {isLoading && <p>Loading...</p>}
      <div className='users-section'>
        {
          users.map((user) => {
            return (<li key={user.id}>
              <section className='id-section'>{user.id}</section>
              <section className='name-email-section'>
                <p className='name'>Name: {user.name}</p>
                <p className='email'>Email: {user.email}</p>
              </section>
            </li>)
          })
        }
      </div>
    </div>
  )
}


export default App;
