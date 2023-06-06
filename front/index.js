const logininputEmail$$=document.querySelector(".b-loginform__email")
const logininputPasswd$$ = document.querySelector(".b-loginform__passwd")
const loginsubmitBttn$$= document.querySelector(".b-loginform__submit")

const registerForm$$=document.querySelector(".b-registerform")
const registerinputEmail$$=document.querySelector(".b-registerform__email")
const registerinputPasswd$$ = document.querySelector(".b-registerform__passwd")
const registerinputRole$$ = document.querySelector(".b-registerform__role")
const registersubmitBttn$$= document.querySelector(".b-registerform__submit")


const login = async ()=>{
    let userData ={
        email: logininputEmail$$.value,
        password: logininputPasswd$$.value
      
    }
    console.log(userData)
    await fetch("http://localhost:5800/users/login", {
       method: 'POST', // or 'PUT'
       body: JSON.stringify(userData), // data can be `string` or {object}!
       headers:{
         'Content-Type': 'application/json'
       } 
       })
       .then(res => res.json())
       
       .catch(error => console.error('Error:', error))

       .then(response => {
        console.log(response)
     
         if(response.token){
          localStorage.setItem ("token", response.token)
          location.href="./sections.html"
        }
        else{
          const p$$ = document.createElement("p");
          p$$.innerHTML=`Usuario no registrado.`
          document.body.appendChild(p$$)
        }
       });
      
}

const register = async ()=>{
  let userData ={
      email: registerinputEmail$$.value,
      password: registerinputPasswd$$.value,
      role: registerinputRole$$.value
  }
  //console.log(userData)
  await fetch("http://localhost:5800/users/register", {
     method: 'POST', // or 'PUT'
     body: JSON.stringify(userData), // data can be `string` or {object}!
     headers:{
       'Content-Type': 'application/json'
     } 
     })
     .then(res => res.json())
     
     .catch(error => console.error('Error:', error))

     .then(response => {
      console.log(response)
   
      if(response._id){
        registerForm$$.className="b-registerform--hidden";
        const p$$ = document.createElement("p");
        p$$.innerHTML=`Haz LOGIN con el usuario registrado`
        document.body.appendChild(p$$)
      }
      else{
        const p$$ = document.createElement("p");
        p$$.innerHTML=`Email no pasa validacion</p><p>Password no pasa validacion. Ej.: Abcd123$</p>`
        document.body.appendChild(p$$)
      }
     });
    
}


loginsubmitBttn$$.addEventListener("click",login)
registersubmitBttn$$.addEventListener("click",register)
