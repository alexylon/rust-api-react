import React, {useState, useEffect} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, Box, Grid} from '@mui/material';

const App = () => {
    const [customers, setCustomers] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        fetch('http://localhost:3030/customers')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCustomers(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [firstName, lastName, email, address]);

    const addCustomer = async (firstName: string, lastName: string, email: string, address: string) => {
        await fetch('http://localhost:3030/customers', {
            method: 'POST',
            body: JSON.stringify({
                guid: Math.random().toString(36).slice(2),
                first_name: firstName,
                last_name: lastName,
                email: email,
                address: address
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // @ts-ignore
                setCustomers((customers: any[]) => [data, ...customers]);
                // setFirstName('');
                // setLastName('');
                // setEmail('');
                // setAddress('');
            })
            .catch((err) => {
                console.log("addCustomers: ", err.message);
            });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        addCustomer(firstName, lastName, email, address).then(() => {
            setFirstName("");
            setLastName("");
            setEmail("");
            setAddress("");
        });
    };

    const deleteCustomer = async (id: string) => {
        await fetch(`http://localhost:3030/customers/${id}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.status === 200) {
                setCustomers(
                    customers.filter((customer: { id: string; }) => {
                        return customer.id !== id;
                    })
                );
            } else {
                return;
            }
        });
    };

    return (
        <Grid container spacing={2}>
            <Box marginTop={5} marginLeft={20} marginRight={20}>
                <Card raised>
                    <div className="app">
                        <div className="add-post-container">
                            <form onSubmit={handleSubmit}>
                                <input type="text" className="form-control" value={firstName}
                                       onChange={(e) => setFirstName(e.target.value)}
                                />
                                <input type="text" className="form-control" value={lastName}
                                       onChange={(e) => setLastName(e.target.value)}
                                />
                                <input type="text" className="form-control" value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                />
                                <input type="text" className="form-control" value={address}
                                       onChange={(e) => setAddress(e.target.value)}
                                />
                                <button type="submit">Add Customer</button>
                            </form>
                        </div>
                        {/* ... */}
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow style={{fontWeight: "bold"}}>
                                    <TableCell>guid</TableCell>
                                    <TableCell align="right">First Name</TableCell>
                                    <TableCell align="right">Last Name</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Address</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {customers.map((customer, i) => (
                                    <TableRow
                                        key={i}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {customer["guid"]}
                                        </TableCell>
                                        <TableCell align="right">{customer["first_name"]}</TableCell>
                                        <TableCell align="right">{customer["last_name"]}</TableCell>
                                        <TableCell align="right">{customer["email"]}</TableCell>
                                        <TableCell align="right">{customer["address"]}</TableCell>
                                        <div className="button">
                                            <div className="delete-btn" onClick={() => deleteCustomer(customer["guid"])}>
                                                Delete
                                            </div>
                                        </div>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Box>
        </Grid>
    );
};

export default App;
