const userList = document.querySelector(".user-list");
const postList = document.querySelector(".post-list");
const commentList = document.querySelector(".comment-list");
const fragment = document.createDocumentFragment();
const templatePost = document.querySelector(".template-post").content;
const templateComment = document.querySelector(".template-comment").content;
const modeSpan = document.querySelector("strong");
let data;

async function get(){
    const res = await fetch("https://jsonplaceholder.typicode.com/users/");
    data = await res.json();
    renderUsers(data, userList);
}
get();
let find;
let array;
async function getPost(){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${find+1}`);
    array = await res.json();
    renderPosts(array, postList);
}

let found;
async function getComment(){
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${found + 1}`);
    const arr = await res.json();
    renderComments(arr, commentList);
}

function renderUsers(arr, obj) {
    setTimeout(()=>{
        obj.innerHTML = "";

        arr.forEach(e => {
            const {id, name, username, email, address, phone, website, company:kompaniya} = e;
            const li = document.createElement("li");
            li.dataset.userData = id;
            li.classList.add("user");
    
            const userId = document.createElement("time");
            userId.classList.add("user-id");
            userId.setAttribute("title", "user id");
            userId.textContent = id;
            li.appendChild(userId);
    
            const Name = document.createElement("h4");
            Name.setAttribute("title", "name");
            Name.classList.add("user-name");
            Name.dataset.userData = id;
            Name.textContent = name;
            li.appendChild(Name);
    
            const userName = document.createElement("span");
            userName.classList.add("user-username");
            userName.setAttribute("title", "username");
            userName.textContent = username;
            Name.appendChild(userName);
    
            const userEmail = document.createElement("a");
            userEmail.setAttribute("title", "user email");
            userEmail.setAttribute("href", `mailto:${email}`);
            userEmail.classList.add("user-email");
            userEmail.textContent = email;
            li.appendChild(userEmail);
    
            userStreet = document.createElement("span");
            userStreet.classList.add("street");
            userStreet.textContent = address?.street;
            li.appendChild(userStreet);
    
            userZipCode = document.createElement("span");
            userZipCode.classList.add("zipcode");
            userZipCode.textContent = address?.zipcode;
            li.appendChild(userZipCode);
    
            const userCity = document.createElement("span");
            userCity.classList.add("city");
            userCity.textContent = address?.city;
            li.appendChild(userCity);
    
            const userSuite = document.createElement("span");
            userSuite.classList.add("suite");
            userSuite.textContent = address?.suite;
            userCity.appendChild(userSuite);
    
            const userLocation = document.createElement("a");
            userLocation.classList.add("location");
            userLocation.textContent = "Location";
            userLocation.setAttribute("title","user location");
            userLocation.setAttribute("target","__blank");
            userLocation.setAttribute("href", `https://www.google.com/maps/place/${address?.geo?.lat},${address?.geo?.lng}`);
            li.appendChild(userLocation)
    
            const userPhone = document.createElement("a");
            userPhone.classList.add("phone-number");
            userPhone.setAttribute("title", "user phone number");
            userPhone.setAttribute("href", `tel:+${phone}`);
            userPhone.textContent =phone;
            li.appendChild(userPhone);
    
            const userWebsite = document.createElement("a");
            userWebsite.classList.add("web-site");
            userWebsite.setAttribute("title", "user web site");
            userWebsite.setAttribute("href", `https://${website}`);
            userWebsite.textContent = website;
            li.appendChild(userWebsite);
    
            const elCompany = document.createElement("div");
            elCompany.innerHTML = `<span class="company-name">${kompaniya.name}</span>
            <span class="company-catchPhrase">${kompaniya.catchPhrase}</span>
            <span class="company-bs">${kompaniya.bs}</span>`;
            li.appendChild(elCompany);
    
           fragment.appendChild(li);
        });
        obj.appendChild(fragment);
    }, 1000)

    
};

function renderPosts(arr, obj) {
    document.title = "Posts of users";
    obj.innerHTML = null;

    const loaderDiv = document.createElement("div");
    loaderDiv.classList.add("post-loader");
    obj.appendChild(loaderDiv)

    setTimeout(() =>{
        obj.innerHTML = null;

    arr.forEach(e => {
      const cloned = templatePost.cloneNode(true);
      const {id, userId, title, body} = e;
      cloned.querySelector(".post").dataset.postData = id;
      cloned.querySelector(".post").dataset.dataPost = userId;
      cloned.querySelector(".post-title").textContent = title;
      cloned.querySelector(".post-body").textContent = body;
  
      fragment.appendChild(cloned);
    });
    obj.appendChild(fragment);
    }, 1000)
};

function renderComments(ar, obj) {
    document.title = "Comments of posts"
    obj.innerHTML = null;

    const loaderDiv = document.createElement("div");
    loaderDiv.classList.add("comment-loader");
    obj.appendChild(loaderDiv)

    setTimeout(() =>{
        obj.innerHTML = null;

    ar.forEach(e => {
      const cloned = templateComment.cloneNode(true);
      const {name, email, body} = e;
      cloned.querySelector(".name").textContent = name;
      cloned.querySelector(".email").textContent = email;
      cloned.querySelector(".email").href = `mailto:${email}`;
      cloned.querySelector(".info").textContent = body;
  
      fragment.appendChild(cloned);
    });
    obj.appendChild(fragment);
    }, 1000)
};

userList.addEventListener("click", evt =>{
    if(evt.target.matches(".user-name")){
        const findUserId = evt.target.dataset.userData;
        find = data.findIndex(a => a.id == findUserId)

       
        getPost();
    }
})

postList.addEventListener("click", evt =>{
    if(evt.target.matches(".post")){
        const findUserId = evt.target.dataset.dataPost;
        const findUserI = evt.target.dataset.postData;
        found = array.findIndex(a => a.id == findUserI)

        console.log(array);
       
        getComment();
    }
})

mode.addEventListener("click", evt =>{
    if(evt.target.matches(".light")){
        postList.style.background = "#ecf8f8";
        userList.style.background = "#ecf8f8";
        commentList.style.background = "#ecf8f8";
        white.classList.remove("light");
        black.setAttribute("class", "dark")
    }
    if(evt.target.matches(".dark")){
        black.classList.remove("dark");
        white.classList.add("light");
        postList.style.background = "#3d3333";
        userList.style.background = "#3d3333";
        commentList.style.background = "#3d3333";
    } 
})