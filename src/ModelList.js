import React, { useState, useEffect } from "react";

export const ModelList = () => {
  const [models, setModels] = useState([]);

  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://dealer-dashboard-8d7b3aea3ae7.herokuapp.com/'
    : 'http://localhost:8100/';

  useEffect(() => {
    const getModels = async () => {
      //Postman shows 200 OK
      const modelUrl = `${baseUrl}models/`;
      const response = await fetch(modelUrl);

      if (response.ok) {
        const modelData = await response.json();
        setModels(modelData.models);
      }
    };
    getModels();
  }, []);
  return (
    <>
      <h1>Models</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model) => {
            return (
              <tr key={model.id}>
                <td>{model.name}</td>
                <td>{model.manufacturer.name}</td>
                <td>
                  <img src={model.picture_url} alt="Car" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
