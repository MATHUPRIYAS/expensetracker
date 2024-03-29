const express=require('express');
const mongoose=require('mongoose');
const app=express()
const port=3000;
const Expense=require('./models/expense');
mongoose.connect('mongodb+srv://mathu:mathu27@cluster0.nhcuhtx.mongodb.net/newDb?retryWrites=true&w=majority',{
    useUnifiedTopology:true
})
app.use(express.json());
app.get('/expenses',async(req,res)=>
{
    const expenses=await Expense.find();
    res.send(expenses)
})

app.get('/expenses/:id',async(req,res)=>
{
    const id=req.params.id;
    const result=await Expense.findById(id);

    res.send(result)
})

app.post('/expenses',async(req,res)=>
{
    console.log(req.body)
    const newExpense=req.body;  
    await Expense.create(newExpense)
    res.send('created');
})

app.put('/expenses/:id',async(req,res)=>
{
    const id=req.params.id;
    const updateObject=req.body;
    const updatedObject=await Expense.findByIdAndUpdate(id,{$set: updateObject},{
        new:true
    })
    res.send(updatedObject);
    
})

app.delete('/expenses/:id',async(req,res)=>
{
    const id=req.params.id;
    const result=await Expense.findByIdAndDelete(id);
    
    const ress=await Expense.find();
    res.send(ress)
})
app.post('/expenses',(req,res)=>
{
    res.send('<h1>hi world</h1>')
})

app.listen(port,()=>
{
    console.log("example appp listening port")
})

