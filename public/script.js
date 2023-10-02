const menu = $(".menu");
const navItems = $(".nav-items");
menu.click(function () {
    if (navItems.hasClass("active")) {
        navItems.removeClass("active");
    }
    else {
        navItems.addClass("active");
    }
});

function emailMe(){
    const userEmail = $(".mail").val();
    const feedBack = $(".textarea").val();
    const body = "Email: "+userEmail+"<br>Feedback: "+feedBack;
    console.log(userEmail+","+feedBack+","+body);
    Email.send({
        SecureToken : "ece92d04-c526-4e6a-9ad2-86d29a4f77dc",
        To : 'harishnathr@gmail.com',
        From : "harishnathr@gmail.com",
        Subject : "A feedback",
        Body : body
    }).then(
      message => {
        if(message == 'OK'){
            swal("Mail Sent Successfully", "Thankyou for your feedback", "success");
        }
      }
    );
    
    

    
}