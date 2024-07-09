import React, {useEffect, useState} from 'react'
import { deleteRunner, listRunners } from '../services/RunnerService';
import { useNavigate } from 'react-router-dom';

const ListRunnerComponent = () => {

    const [runners, setRunners] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllRunners();
    }, [])

    const getAllRunners = () => {
        listRunners().then((response) => {
            setRunners(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    const addNewRunner = () => {
        navigator('/add-runner')
    }

    const updateRunner = (id)=>{
        navigator(`/edit-runner/${id}`);
    }

    const removeRunner = (id)=>{
        deleteRunner(id).then((response) => {
            getAllRunners();
        }).catch(error => {
            console.error(error);
        })
    }

  return (
    <div className='container'>
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
                    {
                        runners.map(runner => 
                            <tr key={runner.id}>
                                <td>{runner.id}</td>
                                <td>{runner.firstName}</td>
                                <td>{runner.lastName}</td>
                                <td>{runner.email}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateRunner(runner.id)}>Update</button>
                                </td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => removeRunner(runner.id)}>Delete</button>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ListRunnerComponent