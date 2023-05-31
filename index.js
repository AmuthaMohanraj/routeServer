const express=require('express')
const mysql=require('mysql')
const port=3000;
const app=express();

const cors=require('cors')
app.use(cors());
app.use(express.json());


const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'myroot99club',
    database:'company'
})



// CompanyList
app.get('/company',(req,res)=>{
  connection.query("select*from companydetails",(error,result)=>{
    if(error){
     console.log("error is",error)
    }else{
     console.log("the result is",result)
     res.json(result)
    }
  })
})

// AboutCompanyDetails
app.get('/getCompanyById/:id',(req,res)=>{
    connection.query("select*from companydetails where company_id=?",[req.params.id],(error,result)=>{
        if(error){
          console.log("error is",error);
        }else{
            console.log("The Solution is",result);
            res.json(result)
        }
    })
}
)

// createUser
app.post('/createCompanyList',(req,res)=>{
  connection.query("insert into companydetails(company_name, industry, address, city, state_province, country, phone_number, email, website, ceo_owner, year_founded, revenue, employee_count, description) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
  ,[req.body.company_name,req.body.industry,req.body.address,req.body.city,req.body.state_province,req.body.country,req.body.phone_number,req.body.email,req.body.website,req.body.ceo_owner,req.body.year_founded,req.body.revenue,req.body.employee_count,req.body.description],(error,result)=>{
    if(error){
      console.log('error is',error);
    }else{
      console.log('The result is',result);
      console.log(res.json());
    }
  })
})

// UpdateUser
app.put('/updateUser/:id',(req,res)=>{
  connection.query(
    'UPDATE companydetails SET company_name = ?, industry = ?, address = ?, city = ?, state_province = ?, country = ?, phone_number = ?, email = ?, website = ?, ceo_owner = ?, year_founded = ?, revenue = ?, employee_count = ?, description = ? WHERE company_id = ?',
    [req.body.company_name, req.body.industry, req.body.address, req.body.city, req.body.state_province, req.body.country, req.body.phone_number, req.body.email, req.body.website, req.body.ceo_owner, req.body.year_founded, req.body.revenue, req.body.employee_count, req.body.description, req.params.id],
    (error, result) => {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Result:', result,'update sucussfully');
        console.log(res.json());
      }
    }
  );
  
})

// deletUser
app.put('/deleteUser/:id',(req,res)=>{
  connection.query("delete from companydetails WHERE company_id = ?",[req.params.id],(error,result)=>{
    if(error){
      console.log('error')
      return
    }else{
      console.log('sucessfull')
      res.json();
    }
  })
})


// EmployeesList
app.get('/employee',(req,res)=>{
    connection.query("select*from employeedetails",(error,result)=>{
      if(error){
       console.log("error is",error)
       return
      }else{
       console.log("the result is",result)
       res.json(result)
      }
    })
  })

// aboutEmployeesDetails
  app.get('/getEmployeeById/:id',(req,res)=>{
    connection.query("select*from employeedetails where employee_id=?",[req.params.id],(error,result)=>{
      if(error){
        console.log("The error is",error)
        return
      }else{
        console.log("The result is",result)
        res.json(result)
      }
    })
  })



app.listen(port,()=>{
    console.log('server is running',port)
})


