import React, { useEffect, useState } from 'react';
import { deleteRunner, listRunners, getRunner } from '../services/RunnerService';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../helpers/token';
import ModalComponent from './ModalComponent';
import { Button, Spinner } from 'react-bootstrap';

const ListRunnerComponent = () => {
  const [runners, setRunners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });

  const navigate = useNavigate();

  const handleShowRunnerDetails = async (id) => {
    setLoading(true);
    setModalShow(true); // Open modal to show spinner
    
    try {
      const response = await getRunner(id);
      const runnerData = response.data;
      
      if (runnerData) {
        setModalContent({
          title: `Runner Details - ${runnerData.firstName} ${runnerData.lastName}`,
          body: (
            <div>
              <p><strong>First name:</strong> {runnerData.firstName}</p>
              <p><strong>Last name:</strong> {runnerData.lastName}</p>
              <p><strong>Email:</strong> {runnerData.email}</p>
            </div>
          )
        });
      } else {
        setModalContent({
          title: 'Error',
          body: <p>Failed to fetch runner data. Please try again later.</p>
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const token = localStorage.getItem('accessToken');
        if (isTokenExpired(token)) {
          localStorage.removeItem('accessToken');
          navigate('/login');
        } else {
          navigate('/error');
        }
      }
    }

    setLoading(false);
  };

  const handleClose = () => setModalShow(false);

  useEffect(() => {
    getAllRunners();
  }, []);

  const getAllRunners = async () => {
    try {
      const response = await listRunners();
      setRunners(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const token = localStorage.getItem('accessToken');
        if (isTokenExpired(token)) {
          localStorage.removeItem('accessToken');
          navigate('/login');
        } else {
          navigate('/error');
        }
      }
    }
  };

  const addNewRunner = () => {
    navigate('/add-runner');
  };

  const updateRunner = (id) => {
    navigate(`/edit-runner/${id}`);
  };

  const removeRunner = async (id) => {
    try {
      await deleteRunner(id);
      getAllRunners();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/error');
      }
    }
  };

  return (
    <div className='container'>
      <ModalComponent
        show={modalShow}
        handleClose={handleClose}
        title={modalContent.title}
        body={loading ? <Spinner animation="border" /> : modalContent.body}
        footer={<Button variant="primary" onClick={handleClose}>Close</Button>}
      />
      <h2 className='text-center'>List of Runners</h2>
      <button className='btn btn-primary mb-2' onClick={addNewRunner}>Add runner</button>
      <div className='sortable-table'>
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>Runner Id</th>
              <th>Runner First Name</th>
              <th>Runner Last Name</th>
              <th>Runner Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {runners.map(runner => (
              <tr key={runner.id}>
                <td>{runner.id}</td>
                <td>{runner.firstName}</td>
                <td>{runner.lastName}</td>
                <td>{runner.email}</td>
                <td>
                  <button className='btn btn-info ms-3' onClick={() => updateRunner(runner.id)}>Update</button>
                  <button className='btn btn-danger ms-3' onClick={() => removeRunner(runner.id)}>Delete</button>
                  <button className='btn btn-secondary ms-3' onClick={() => handleShowRunnerDetails(runner.id)}>Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRunnerComponent;