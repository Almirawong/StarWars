import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import './App.css'

function PeopleList() {
  const [people, setPeople] = useState([]);
  const apiUrl = "https://swapi.dev/api/people";

  const fetchPeople = async (url) => {
    try {
      // send HTTP GET request to the specified URL
      const response = await axios.get(url);
      // extract 'results' array
      const newPeople = response.data.results;
      // update 'people' state by concatenating new data
      setPeople((prevPeople) => [...prevPeople, ...newPeople]);

      // Check if there is a next page
      if (response.data.next) {
        // recursively fetch it
        fetchPeople(response.data.next);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // fetch data
  useEffect(() => {
    fetchPeople(apiUrl);
  }, []); // runs only on the first render

  const generateTableHeaders = () => {
    if (people.length === 0) {
      return null;
    }
    // returns an array of a given object's own enumerable string-keyed property names
    const headers = Object.keys(people[0]);
    return (
      <thead>
        <tr>
          {headers.map((header) => (
            <th>{header}</th>
          ))}
        </tr>
      </thead>
    );
  };

  const generateTableRows = () => {
    if (people.length === 0) {
      return null;
    }
    return (
      // extract the values of the person's properties, and then it maps over those values to generate table cells
      <tbody>
        {people.map((person) => (
          <tr>
            {Object.values(person).map((value) => (
              <td>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div>
      <h1 className='App-header'>Star Wars Characters</h1>
      <Table striped bordered hover variant="dark">
        {generateTableHeaders()}
        {generateTableRows()}
      </Table>
    </div>
  );
}

export default PeopleList;
