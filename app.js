//getting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .time_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");

const option_list = document.querySelector(".option_list");

 //if start quize button clicked
 start_btn.onclick =() =>{
    info_box.classList.add("activeInfo") //show the info box
 }

 // if exit button clicked
 exit_btn.onclick =() =>{
    info_box.classList.remove("activeInfo") // hide the info box
 }

  // continue button clicked
  continue_btn.onclick =() =>{
    info_box.classList.remove("activeInfo") // hide the info box
    quiz_box.classList.add("activeQuiz") // show the quiz box
    showQusetions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
  }

 let que_count = 0;
 let que_numb = 1;
 let counter;

 let counterLine;
 let timeValue = 15;
 let widthValue = 0;
 let userScore = 0;

 const next_btn = quiz_box.querySelector(".next_btn");

 const result_box = document.querySelector(".result_box");

 const restart_quiz = result_box.querySelector(".buttons .restart");

 const quit_quiz = result_box.querySelector(".buttons .quit");
 restart_quiz.onclick=()=>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    let que_count = 0;
    let que_numb = 1;  
    let timeValue = 15;
    let widthValue = 0;
    let userScore = 0;
    showQusetions(que_count);
    queCounter(que_numb );
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine)
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeOff.textContent ="time left"
   
 }
quit_quiz.onclick =()=>{
    window.location.reload();

 }

 // if next button clicked
 next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQusetions(que_count);
        queCounter(que_numb );
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine)
        startTimerLine(widthValue);
        next_btn.style.display = "none"
        timeOff.textContent ="time left"
 
    }
    else{
        clearInterval(counter);
        // startTimer(timeValue);
        clearInterval(counterLine);
        console.log("questions completed")
        showResultBox();
    }
 }


//  getting question and options form array

function showQusetions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag ='<span>' + questions[index].numb +". " + questions[index].question + '</span>';
    let option_tag = '<div class="option">'+ questions[index].Options[0]+'<span></span></div>'
                    +'<div class="option">'+ questions[index].Options[1]+'<span></span></div>'
                    +'<div class="option">'+ questions[index].Options[2]+'<span></span></div>'
                    +'<div class="option">'+ questions[index].Options[3]+'<span></span></div>'
    
    que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;

  const option = option_list.querySelectorAll(".option");
  for(let i = 0; i < option.length; i++){
    option[i].setAttribute("onclick" , "optionSelected(this)");
  }


}

let tickIcon ='<div class="icon tick"><i class="fas fa-check"></i></div>';
let croseIcon ='<div class="icon cross"><i class="fas fa-times"></i></div>';

// function optionSelected(answer){
//     let userAns = answer.textContent;
//     let correctAns = questions[que_count].answer;
//     let allOptions = option_list.chlidren;
//     if(userAns == correctAns) {
//         answer.classList.add("correct");
//         console.log("answer is correct"); 
//         answer.insertAdjacentHTML("beforeend", tickIcon); 
//     }
//     else{
//         answer.classList.add("incorrect");
//         console.log("answer is wrong");
//         answer.insertAdjacentHTML("beforeend", croseIcon); 

//         //if answer is incorrect then automatically selected the coorrect asnwer
//         for(let i = 0; i < allOptions; i++){
//            if( option_list.chlidren[i].textContent === correctAns){
//     option_list.children[i].settAttribute("class" , "option correct");
//     option_list.children[i].insertAdjacentElement("beforeend" , tickIcon)
//          }
//         }    
//     }
//     //once user selected disabled all option
//     for(let i=0; i < allOptions; i++){
//         option_list.chlidren[i].classList.add("disabled");
//     }
   
// }
function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;

    if(userAns == correctAns){

        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct")
        console.log("answer is correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }
    else{
        answer.classList.add("incorrect");
        console.log("answer is incorrect");
        answer.insertAdjacentHTML("beforeend", croseIcon);

 //if answer is incorrect then automitically selected the corect answers
        for (let  i = 0;  i < allOptions; i++) {
        if( option_list.children[i].textContent == correctAns){
            option_list.children[i].setAttribute("class" ,"option correct");
            option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);

        }
            
        }
    }

    // once user  selected disable all option
    for (let i = 0; i < allOptions; i++) {
       option_list.children[i].classList.add("disabled")
        
    }
    next_btn.style.display = "block"
}

function showResultBox(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText =  result_box.querySelector(".score_text");
    if(userScore > 3){
    let scoreTag =" <span> congrats ! , you got <p> "+ userScore +" </p>out of <p>"+ questions.length +"</p></span>";
        scoreText.innerHTML=  scoreTag;
    }

    else if(userScore > 1){
        let scoreTag =" <span> Oho nice ! , you got <p> "+ userScore +" </p>out of <p>"+ questions.length +"</p></span>";
            scoreText.innerHTML=  scoreTag;
        }

        else{
            let scoreTag =" <span> OOps sorry , you got only <p> "+ userScore +" </p>out of <p>"+ questions.length +"</p></span>";
                scoreText.innerHTML=  scoreTag;
            }
}

// time set=================
function startTimer(time){
    counter = setInterval(timer, 1000);
        function timer(){
         timeCount.textContent= time;
            time--;
            if(time < 9){
                let addZero = timeCount.textContent;
                timeCount.textContent ="0" + addZero;
            }
            if(time < 0){
                clearInterval(counter);
                timeCount.textContent = "00";
                timeOff.textContent ="time off"

                let correctAns = questions[que_count].answer;
                let allOptions = option_list.children.length;


                for (let  i = 0;  i < allOptions; i++) {
                    if( option_list.children[i].textContent == correctAns){
                        option_list.children[i].setAttribute("class" ,"option correct");
                        option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            
                    }
                        
                }

                    for (let i = 0; i < allOptions; i++) {
                        option_list.children[i].classList.add("disabled")
                         
                     }
                     next_btn.style.display = "block"
                
            }
            
        }
}


function startTimerLine(time){
    counterLine = setInterval(timer, 29);
        function timer(){
           time += 1;
        timeLine.style.width =time + "px";
            if(time > 549){
                clearInterval(counterLine);
            }
            
        }
};

function queCounter(index){
const bottom_ques_counter =  quiz_box.querySelector(".total_que");
let totalQuesCountTag ='<span> <p>' + index + ' </p> of <p>' + questions.length + ' </p>Questions</span>';
bottom_ques_counter.innerHTML =  totalQuesCountTag;

}

