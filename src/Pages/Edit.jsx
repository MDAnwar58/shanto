import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const navigate = useNavigate("");
  const [name, setName] = useState({ name: "" });
  const [title, setTitle] = useState({ title: "" });
  const {id} = useParams();

  useEffect(() => {
    postEdit(id);
  }, []);

  const postEdit = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/post-edit/"+id);
      setName(response.data.post.name);
      setTitle(response.data.post.title);
    } catch (error) {
      console.error(error);
    }
  }

  const postUpdate = async(e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8000/api/post-update/"+id, {
        name: name,
        title: title
      });
      navigate("/");
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
              <form onSubmit={postUpdate}>
                <div className="form-gruop">
                  <label htmlFor="name">Skill</label>
                  <input type="text" name='name' value={name} onChange={(e) => {setName(e.target.value)}} className='form-control' />
                </div>
                <div className="form-gruop">
                  <label htmlFor="title">Skill Title</label>
                  <input type="text" name='title' value={title} onChange={(e) => {setTitle(e.target.value)}} className='form-control' />
                </div>
                <div className="text-end pt-2">
                  <button type='submit' className='btn btn-dark'>Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit;
