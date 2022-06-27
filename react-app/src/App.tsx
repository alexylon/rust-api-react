import React, {useState, useEffect} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

const App = () => {
    const [persons, setPersons] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8000/customers')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPersons(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    console.log("persons: ", persons);

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>guid</TableCell>
                            <TableCell align="right">First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {persons.map((person, i) => (
                            <TableRow
                                key={i}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {person["guid"]}
                                </TableCell>
                                <TableCell align="right">{person["first_name"]}</TableCell>
                                <TableCell align="right">{person["last_name"]}</TableCell>
                                <TableCell align="right">{person["email"]}</TableCell>
                                <TableCell align="right">{person["address"]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default App;
