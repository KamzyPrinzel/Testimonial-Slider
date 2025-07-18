const testimonials = [
    {
        name: "Rose M",
        photoUrl: "https://plus.unsplash.com/premium_photo-1664541336896-b3d5f7dec9a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
        text: "Working with Anna has been a game-changer for our business. Their attention to detail, commitment to excellence, and proactive approach ensured that every aspect of our project was handled with the utmost care. Not only did they deliver exactly what we needed, but they also exceeded our expectations with their creativity and dedication. I highly recommend Anna to anyone looking for a reliable and skilled partner!"
    },

    {
        name: "Rose M",
        photoUrl: "https://plus.unsplash.com/premium_photo-1664541336896-b3d5f7dec9a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
        text: "Working with Anna has been a game-changer for our business. Their attention to detail, commitment to excellence, and proactive approach ensured that every aspect of our project was handled with the utmost care. Not only did they deliver exactly what we needed, but they also exceeded our expectations with their creativity and dedication. I highly recommend Anna to anyone looking for a reliable and skilled partner!"
    },

    {
        name: "Rose M",
        photoUrl: "https://plus.unsplash.com/premium_photo-1664541336896-b3d5f7dec9a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
        text: "Working with Anna has been a game-changer for our business. Their attention to detail, commitment to excellence, and proactive approach ensured that every aspect of our project was handled with the utmost care. Not only did they deliver exactly what we needed, but they also exceeded our expectations with their creativity and dedication. I highly recommend Anna to anyone looking for a reliable and skilled partner!"
    }
];

const imgEl = document.querySelector("img");
const textEl = document.querySelector(".text");
const usernameEl = document.querySelector(".username");

let idx = 0; 

function updateTestimonial(){
    const {name, photoUrl, text} = testimonials[idx];
    imgEl.src = photoUrl;
    textEl.innerText = text;
    usernameEl.innerText = name;
    idx++
    if(idx === testimonials.length){
        idx = 0;
    }
    setTimeout(()=>{
        updateTestimonial()    
    },10000);
}