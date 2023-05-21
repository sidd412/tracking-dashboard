import React, { useState, useEffect } from 'react';
import '../style/home.css'
import VerifiedIcon from '@mui/icons-material/Verified';
import DownloadIcon from '@mui/icons-material/Download';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Graph from './Graph';
import  Pie  from './Pie';
import Footer from './Footer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';



const ExpenseApp = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [totalExpense, setTotalExpense] = useState(0);



  useEffect(() => {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  // Save expenses to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    const calculateTotalExpense = () => {
      const total = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
      setTotalExpense(total);
    };
    calculateTotalExpense();
  }, [expenses]);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      description,
      amount,
      category,
      date
    };
    setExpenses([...expenses, newExpense]);
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setDescription('');
    setAmount('');
    setCategory('');
    setDate('');
    handleClose()
  };

  const handleEdit = (index) => {
    alert('you are not authorised to edit this content')
  };


  const handleRemove = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };


  return (
    <>
    <div id='main'>
{/* //////////////////////BLOCKS//////////////////////////////////////       */}
       <div className='grid-container'>
        <div className='block grid-item'>
        <div>  Total Expense Amount: <MonetizationOnIcon /> <h5>{totalExpense}</h5> </div>
        </div>
  
        <div className='block grid-item'>
        Add new Expense  &nbsp;
        <button className='btn1'  onClick={handleShow}>+Add</button>
        </div>
  
        <div className='block grid-item'>
        <div>  Total number of user <AccountCircleIcon /> <h5>100K</h5> </div>
        </div>
  
        <div className='block grid-item'>
        <div>  {
            (10000-totalExpense) <=0 ? <>  <VerifiedIcon />Verified &nbsp; &nbsp; &nbsp; &nbsp; <DownloadIcon />
            </> : <>Amount the neede to be premium membership: {10000 - totalExpense} </> 
        }   </div>
        </div>
     </div> 
{/* ////////////////////Graphs//////////////////////////////////      */}
<div class="graph-container" id='charts'>
    <div class="graph-item" id='barc' ><Graph data={expenses} /></div>
    <div class="graph-item" id='piec' > <Pie data={expenses}/></div>
  </div>
{/* ////////////////////MODAL///////////////////////////////      */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fill Expense Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit} id='form' className='form'>
            <div>
              <input
              type="text"
              id="description"
              value={description}
              placeholder="Description of product"
              onChange={(e) => setDescription(e.target.value)}
            /></div>

            <div>
            <input
              type="number"
              id="amount"
              value={amount}
              placeholder="Amount of product"
              onChange={(e) => setAmount(e.target.value)}
            /></div>

              <div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Movie">Movie</option>
                  
                </select>
              </div>

            <div>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            /></div> 
            <Modal.Footer>
             <button type="submit" className='btn1'>Submit</button>
             <button onClick={resetForm} className='btn1' >Cancel</button>
            </Modal.Footer>
          </form>
          
        </Modal.Body>
      </Modal>
{/* ///////////////////////EXPENSE LIST///////////////////////////////////////// */}
      <h2 style={{margin:"20px 30px"}}>My Expenses-</h2>
      <div className='expenses'>
      {expenses.map((expense, index) => (
        <div key={index} className='expense'>
          <div className='part1'>
          <div className='items1'>{expense.description}</div>
          <div className='items1'>{expense.amount} $</div>
          <div className='items1'>{expense.category}</div>
          <div className='items1'>{expense.date}</div>
          </div>
          <div className='part2'>
          <button className='items2 btn1' id='edit' onClick={() => handleEdit(index)}><EditIcon /></button>
          <button className='items2 btn1' id='remove' onClick={() => handleRemove(index)}> <DeleteIcon /></button>
          </div>
        </div>
      ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ExpenseApp;





