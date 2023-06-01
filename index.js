const express=require('express')
const mysql=require('mysql')
const port=3000;
const app=express();
const s='success'

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
  connection.query("select*from companydetails where isActive=1",(error,result)=>{
    if(error){
     console.log("error is",error)
    }else{
     console.log("the result is",s)
     res.json(result)
    }
  })
})


// AboutCompanyDetails
app.get('/getCompanyById/:id',(req,res)=>{
    connection.query("select*from companydetails where company_id=? And isActive=?",[req.params.id,1],(error,result)=>{
        if(error){
          console.log("error is",error);
        }else{
            console.log("The Solution is",s,result);
            res.json(result)
        }
    })
}
)

// createCompanyList
app.post('/createCompanyList',(req,res)=>{
  connection.query("insert into companydetails(company_name, industry, address, city, state_province, country, phone_number, email, website, ceo_owner, year_founded, revenue, employee_count, description) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
  ,[req.body.company_name,req.body.industry,req.body.address,req.body.city,req.body.state_province,req.body.country,req.body.phone_number,req.body.email,req.body.website,req.body.ceo_owner,req.body.year_founded,req.body.revenue,req.body.employee_count,req.body.description],(error,result)=>{
    if(error){
      console.log('error is',error);
    }else{
      console.log('The result is',s);
      console.log(res.json());
    }
  })
})

// UpdateCompanyList
app.put('/updateCompanyList',(req,res)=>{
  connection.query(
    'UPDATE companydetails SET company_name = ?, industry = ?, address = ?, city = ?, state_province = ?, country = ?, phone_number = ?, email = ?, website = ?, ceo_owner = ?, year_founded = ?, revenue = ?, employee_count = ?, description = ? WHERE company_id = ?',
    [req.body.company_name, req.body.industry, req.body.address, req.body.city, req.body.state_province, req.body.country, req.body.phone_number, req.body.email, req.body.website, req.body.ceo_owner, req.body.year_founded, req.body.revenue, req.body.employee_count, req.body.description, req.body.company_id],
    (error, result) => {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Result:', s,'update sucussfully');
        console.log(res.json());
      }
    }
  );
  
})

// deleteCompanyList
app.put('/deleteCompanyList',(req,res)=>{
  connection.query("update companydetails set isActive=0 WHERE company_id = ?",[req.body.company_id],(error,result)=>{
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
    connection.query("select*from employeedetails where isActive=1",(error,result)=>{
      if(error){
       console.log("error is",error)
       return
      }else{
       console.log("the result is",s)
       res.json(result)
      }
    })
  })

// aboutEmployeesDetails
  app.get('/getEmployeeById/:id',(req,res)=>{
    connection.query("select*from employeedetails where employee_id=? And isActive=?",[req.params.id,1],(error,result)=>{
      if(error){
        console.log("The error is",error)
        return
      }else{
        console.log("The result is",s)
        res.json(result)
      }
    })
  })

  // createEmployee
app.post('/createEmployeeList', (req, res) => {
  connection.query("INSERT INTO employeedetails (first_name, last_name, email, phone_number, hire_date, job_title, department, salary, manager_id, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [req.body.first_name, req.body.last_name, req.body.email, req.body.phone_number, req.body.hire_date, req.body.job_title, req.body.department, req.body.salary, req.body.manager_id, 1],
    (error, result) => {
      if (error) {
        console.log('error is', error);
        return;
      } else {
        console.log('The solution is', result);
        res.json(result);
      }
    });
});


// updateEmployeeList
app.put('/updateEmployeeList',(req,res)=>{
  connection.query("UPDATE employeedetails SET first_name = ?, last_name = ?, email = ?, phone_number = ?, hire_date = ?, job_title = ?, department = ?, salary = ?, manager_id = ? WHERE employee_id = ?"
  ,[req.body.first_name,req.body.last_name,req.body.email,req.body.phone_number,req.body.hire_date,req.body.job_title,req.body.department,req.body.salary,req.body.manager_id,req.body.employee_id],(error,result)=>{
    if(error){
      console.log('error is',error);
      return error
    }else{
      console.log('The solution is',s);
      res.json(result)
    }
  })
})

// deleteEmployeeList
app.put('/deleteEmployeeList',(req,res)=>{
  connection.query("update employeedetails set isActive=0 where employee_id=?",[req.body.employee_id],(error,result)=>{
    if(error){
      console.log('error is',error);
      return error
    }else{
      console.log('The solution is',s);
      res.json(result)
    }
  })
})


app.listen(port,()=>{
    console.log('server is running',port)
})

connection.connect((err)=>{
  if (err){
    return err
  } 
  console.log("Connected!");
});


