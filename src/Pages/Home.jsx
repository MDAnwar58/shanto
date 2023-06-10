import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate("");
  const [name, setName] = useState({ name: "" });
  const [title, setTitle] = useState({ title: "" });
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('app');
  useEffect(() => {
    getPost();
    if (!token) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, []);

  const getPost = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/posts');
      setPosts(response.data.posts);
    } catch (error) {
      console.error(error);
    }
  }

  const postSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/post-create', {
        name: name.name,
        title: title.title,
      });
      console.log(response.data.success);
      getPost();
    } catch (error) {
      console.error(error);
    }
  }

  const postDelete = async (id) => {
    try {
      await axios.delete('http://localhost:8000/api/post-destroy/' + id);
      getPost();
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className='container pt-5'>
      <div className="row">
        <div className="col-sm-4">
          <div className="card">
            <h4 className="card-header text-center">Insert</h4>
            <div className="card-body">
              <form onSubmit={postSave}>
                <div className="form-gruop">
                  <label htmlFor="name">Skill</label>
                  <input type="text" name='name' onChange={(e) => { setName({ name: e.target.value }) }} className='form-control' />
                </div>
                <div className="form-gruop">
                  <label htmlFor="title">Skill Title</label>
                  <input type="text" name='title' onChange={(e) => { setTitle({ title: e.target.value }) }} className='form-control' />
                </div>
                <div className="text-end pt-2">
                  <button type='submit' className='btn btn-dark'>Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm-8">
          <div className="card">
            <h4 className="card-header text-center">Post List</h4>
            <div className="card-body">
              <table className="table table-borderd">
                <thead>
                  <tr>
                    <th>Skill</th>
                    <th>Title</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr>
                      <td>{post.name}</td>
                      <td>{post.title}</td>
                      <td>
                        <Link to={`/post-edit/${post.id}`} className="btn btn-success">Edit</Link>
                        <button type='button' onClick={() => postDelete(`${post.id}`)} className='btn btn-danger'>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
