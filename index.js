const express = require('express');
const app = express();
const PORT = 3000;

// Define maddleware here so
app.use(express.json())

const customers = [
    {id: 1, name: 'alex'},
    {id: 2, name: 'Mark'},
    {id: 3, name: 'Ross'}
]


app.get('/', (req, res) => {
    res.send('Hello World')
})

// Get all customers data
app.get('/api/customer', (req, res) => {
    res.send(customers)
})
// Get data for a customer
app.get('/api/customer/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id))
    if(!customer) return res.status(404).send('Customer not found with this ID')
    res.send(customer)
})
// Add new customer data
app.post('/api/customer', (req, res) => {
    // Input Validation
    if(!req.body.name || req.body.name.length < 3){
        return res.status(400).send('Name is required and should be at least 3 characters');
    }
    const customer = {
        id: customers.length + 1,
        name: req.body.name,
    }
    customers.push(customer);
    res.send(customer);
})
// Update customer data
app.put('/api/customer/:id', (req, res) => {
    // Lookup the customers, if not exisiting return 404
    const customer = customers.find(c => c.id === parseInt(req.params.id))
    if(!customer) return res.status(404).send('Customer not found with this ID')

    // If invalid, return 404 bad request
    if(!req.body.name || req.body.name.length < 3){
        return res.status(400).send('Name is required and should be at least 3 characters');
    }
    // Update coustomers
    customer.name = req.body.name
    // return the customers
    res.send(customer)
})

// Delete customer data route
app.delete('/api/customer/:id', (req, res) => {
    // Lookup the customers, if not exisiting return 404
    const customer = customers.find(c => c.id === parseInt(req.params.id))
    if(!customer) return res.status(404).send('Customer not found with this ID')

    const index = customers.indexOf(customer)
    customers.splice(index, 1)

    return res.send(customers)
})


app.listen(PORT, ()=> {console.log(`Server running on localhost:${PORT}`);});

