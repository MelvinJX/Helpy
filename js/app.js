const validAnswers = [
    {name: "github", valids: ["github", "git", "hub"], answer: 
        "Github est un environnement de travail pour développeur...",
    additional: `\n<a href="https://github.com/" target="_blank">Visiter Github</a>`
    },
    {name: "talk", valids: ["parler", "conseiller", "aide", "help"], answer:
        "Souhaitez vous parler à un conseiller ?",
    additional: `\n<button>Oui</button>\n<button>Non</button>`
    },
    {name: "money", valids: ["fructifier", "argent"], answer:
        "Fructifier son argent est l'un des moyens pour..."
    },
    {name: "account", valids: ["créer", "compte", "créer un compte", "authentifier"], answer:
        "Voici un lien pour créer un compte : ",
    additional: `\n<a href="#">Créer un compte</a>`
    },
    {name: "helpy", valids: ["helpy", "qui-es-tu", "bot", "robot"], answer:
        "Hey ! Je suis Helpy, pas vraiment une IA mais juste un petit robot 🤖 simple qui pourrait faciliter la navigation aux utilisateurs 😁"
    }
];

const rightBox = document.querySelector(".rightBox");
let result = "";
validAnswers.forEach(item => {
    item.valids.forEach(question => {
            result += `
            <div class="question">
                <span>${question}</span>
            </div>
            `
    })
})
rightBox.innerHTML = `<h4>Questions à poser</h4>` + result;

let next = 0;
let intervalActive = false;

const form = document.querySelector(".writeMsg form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    generateMessage();
})

const suggestions = document.querySelectorAll(".suggestion");
suggestions.forEach((suggestion) => {
    suggestion.addEventListener("click", () => {
        document.querySelector("#userMsg").value = "";
        generateMessage(suggestion);
    })
})

const generateMessage = (value) => {
    const userMsg = document.querySelector("#userMsg");

    let ask;
    let item;
    if(userMsg.value) {
        item = validAnswers.find(item => item.valids.find(item => item === userMsg.value));
        ask = userMsg.value;
    }
    else if(value) {
        item = validAnswers.find(item => item.name === value.getAttribute("data-suggestion"));
        ask = value.innerHTML;
    }

    if(item && !intervalActive || value && !intervalActive){
        const chatMessages = document.querySelector(".chatMessages");
        chatMessages.innerHTML += `
        <div class="newchat asking">
            <div class="chatmsg">${ask}</div>
        </div>
        <div class="newchat answer">
            <div class="chatmsg"></div>
        </div>
        `;
    
        let botResponse = item.answer;
    
        let interval;
        let index = 0;
    
        const chatMsg = document.querySelectorAll(".answer .chatmsg");
        const answer = document.querySelectorAll(".answer");
        
        if(botResponse){
            interval = setInterval(() => {
                intervalActive = true;
                if(index < botResponse.length){
                    console.log(botResponse[index])
                    chatMsg[next].innerHTML += botResponse[index];
                    answer[next].scrollIntoView({ behavior: 'smooth' });
                    index++;
                } else {
                    if(item.additional) document.querySelectorAll(".answer .chatmsg")[next].innerHTML += item.additional;
                    answer[next].scrollIntoView({ behavior: 'smooth' });
                    intervalActive = false;
                    clearInterval(interval);
                    interval = null;
                    next++;
                }
            }, 20);
        } else {
            return;
        }
    } else {
        if(intervalActive) return console.log("Une réponse est déjà en cours de traitement.");
        console.log("Saisissez un message pour qu'on puisse traiter votre demande.");
    }
}