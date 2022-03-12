const emailDOM = document.getElementById("email");
const subjectDOM = document.getElementById("subject");
const textDOM = document.getElementById("text");
const sendDOM = document.getElementById("send");

sendDOM.addEventListener("click", async () => {
	const email = emailDOM.value;
	const subject = subjectDOM.value ?? "Test subject";
	const text = textDOM.value ?? "Test text";
	
	if(!email) return alert("Email je obavezan");
	
	const body = JSON.stringify({ email, subject, text });
	const headers = {"Content-Type": "application/json"};
	const method = "POST";
	const fetchOptions = { body, headers, method };
	
	const response = await fetch("/send", fetchOptions);
	const data = await response.json();
	console.log(data);
	if(!data.ok) return alert(data.message);
	alert("email poslat");
})