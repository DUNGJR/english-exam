import React, { useState } from 'react';

function AddCourse() {
    
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

  const handleAddCourse = () => {
    fetch('http://localhost:3001/course', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, decs: desc }), // Chú ý: đã sửa thành "decs" thay vì "description"
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.status);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="App">
      <h1>Add Course</h1>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
      </label>
      
      {/* {isAdmin && (
        <button onClick={handleAddCourse}>Add Course</button>
      )} */}
    </div>
  );
}

export default AddCourse;
