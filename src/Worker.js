import React, { useState, useEffect } from 'react';

const WorkerList = () => {
  const [workers, setWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://5ea5ca472d86f00016b4626d.mockapi.io/brotherhood')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response "error"');
        }
        return response.json();
      })
      .then(data => {
        setWorkers(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="İşçilərin adı"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredWorkers.map(worker => (
          <li key={worker.id}>{worker.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default WorkerList;
