import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser } from './UserReducer';

function Home() {
    const users = useSelector((state) =>state.users);
    console.log(users) 
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteUser({id: id}))

    }
    return (
        <>
    <div className="container mt-5">
        <h2>Crud Redux</h2>
        <Link to='/create' className='btn btn-success my-3'>Tambah +</Link>   
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {users.map((user,index)=>(
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link to={`/edit/${user.id}`} className='btn btn btn-primary me-3'>Edit</Link>
                                <button onClick={()=>handleDelete(user.id)} className='btn btn btn-danger'>Hapus</button>
                            </td>
    
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
        </>
      )
    }
    
    export default Home
