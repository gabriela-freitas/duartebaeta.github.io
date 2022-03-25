/* Function that checks if the user has inputed all the required data, if so it calls the http request function, for booking*/

function submit()
{
	if (!document.getElementById("email").value || !document.getElementById("name").value || 
	!document.getElementById("date").value || !document.getElementById("start").value || !document.getElementById("end").value || !document.getElementById("members").value || !document.getElementById("room-changer").value)
	{
		snackbarAnimation('Please insert all the required data', 'yellow');
		return;
	}

	if (checkHour() != 'OK')
	{
		return;
	}
	let curURL = window.location.href;
	let endURL = curURL.substring(0, curURL.search('book'));
	
	let counter = endURL.length;
	while (endURL[counter] != '/')
	counter--;
	
	let authURL = 'authenticate.html';
	let i = 0;
	endURL += authURL;
	httpPost();
	//window.location.href = endURL;
}

/* Function that checks if the user has inputed all the required data, if so it calls the http request function, for cancel*/

function submitCancel()
{
	if (!document.getElementById("cancel-ID").value)
	{
		snackbarAnimation('Please insert all the required data', 'yellow');
		return;
	}
	httpCancelPost();
}

/* Function that changes the iframe url depending on the room agenda the user wants to see */

function changeURL()
{
	const allURL = ["https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Europe%2FLisbon&src=ZTg5M2YyaWI4MW1oa2Y3OHBvbzNwMWg4dm9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=YjYzNDNmOXIzcXJna2o0MGFjdG9mbnZhazBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=N29nOHFvZG00dWgxMmcyNjE1bnRqajZiNmdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=dWJxZGJmYmptN2FjZHNkM2xkYWF0OWExYmNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=b2xvdWtnOGc1cDB2c2xrbXUzNTM4OHV1bm9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=cHQtcHQucG9ydHVndWVzZSNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%232952a3&color=%232952a3&color=%232952a3&color=%232952a3&color=%232952a3&color=%230B8043", 
	"https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Europe%2FLisbon&src=ZTg5M2YyaWI4MW1oa2Y3OHBvbzNwMWg4dm9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%232952a3", 
	"https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Europe%2FLisbon&src=YjYzNDNmOXIzcXJna2o0MGFjdG9mbnZhazBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%232952a3", 
	"https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Europe%2FLisbon&src=N29nOHFvZG00dWgxMmcyNjE1bnRqajZiNmdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%232952a3", 
	"https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Europe%2FLisbon&src=dWJxZGJmYmptN2FjZHNkM2xkYWF0OWExYmNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%232952a3", 
	"https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Europe%2FLisbon&src=b2xvdWtnOGc1cDB2c2xrbXUzNTM4OHV1bm9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%232952a3"];

	let room = document.getElementById("room-changer").value;

	let iframe = document.getElementById("calendar-url");
	iframe.src = allURL[room];
}

/* Function that does the http request, sending the input the user inserted. It also sends an option so the API knows this is a request to book a room */

function httpPost()
{
	// const input = {
	// 	name: document.getElementById("name").value,
	// 	email: document.getElementById("email").value,
	// 	date: document.getElementById("date").value,
	// 	start: document.getElementById("start").value,
	// 	end: document.getElementById("end").value,
	// 	members: document.getElementById("members").value,
	// 	room: document.getElementById("room-changer").value,
	// 	option: "Book"
	// };



	const data = JSON.stringify({
  "name": "hfhgf",
  "email": "ahhhhh@gmail.com",
  "date": "30/03/2022",
  "start": "12:00",
  "end": "17:00",
  "members": "3",
  "room": "3",
  "option": "Book"
	});

	const xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
	});

	xhr.open("POST", "https://script.google.com/macros/s/AKfycbxr_ls8M1AcmUBJ4a2tNvJ1ezMR5H9Qb9KGFqVRwCvJP9DAQYJdV2wRGQ4M4ufgeUuN/exec");
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.send(data);



	// console.log(input);
	// // const input = {
	// // 	"name": "hfhgf",
	// // 	"email": "ahhhhh@gmail.com",
	// // 	"date": "31/03/2022",
	// // 	"start": "12:00",
	// // 	"end": "17:00",
	// // 	"members": "3",
	// // 	"room": "3",
	// // 	"option": "Book"
	// // };

	// const url = "https://script.google.com/macros/s/AKfycbxr_ls8M1AcmUBJ4a2tNvJ1ezMR5H9Qb9KGFqVRwCvJP9DAQYJdV2wRGQ4M4ufgeUuN/exec";

	// fetch(url, {
	// 	method : "POST",
	// 	body: input,
	// 	mode: "no-cors",
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 	},
	// }).then(
	// 	async (response) => {
	// 		console.log(await response);
	// 		return await response.text();
	// 	}
	// ).catch(
	// 	html => customError(html)
	// );
}

/* Function that sends the http Post request to cancel a booking */

function httpCancelPost()
{
	const input =
	{
		id: document.getElementById("cancel-ID").value,
		option: "cancel"
	};

	const url = "https://script.google.com/macros/s/AKfycbxr_ls8M1AcmUBJ4a2tNvJ1ezMR5H9Qb9KGFqVRwCvJP9DAQYJdV2wRGQ4M4ufgeUuN/exec";

	fetch(url, {
		method : "POST",
		body: JSON.stringify(input),
	}).then(
		response => response.text()
	).then(
		html => cancelError(html)
	);
}

/* Function that checks for an error that the API sent as a response to the http request, if no error is found it goes through else, it runs the animations for a pop-up describing the error */

function customError(error)
{
	console.log(error);
	if (error == "all good")
	{
		snackbarAnimation("Your meeting has been schedualed!", 'green');
	}
	else if (error ==  "capacity")
	{
		snackbarAnimation("There are no rooms with enough capacity available", 'red');
	}
	else if (error == "room closed")
	{
		snackbarAnimation("The room is not open at that hour, please try another one", 'red');
	}
	else if (error == "schedule problem")
	{
		snackbarAnimation("erro", 'red');
	}
	else
	{
		snackbarAnimation("Undefined error", 'red');
	}
}

function cancelError(error)
{
	if (error == "canceled")
	{
		snackbarAnimation("Your meeting has been canceled!", 'green');
	}
	else
	{
		snackbarAnimation("Undefined error", 'red');
	}
}

/* Pop-up animations */

function snackbarAnimation(text, color) {
	var x = document.getElementById("snackbar");
	
	x.textContent = text;
	x.className = "show";
	if (color == 'yellow')
		x.style = "background-color: #c5d90f";
	else if (color == 'red')
		x.style = "background-color: #FF0000";
	else if (color == 'green')
		x.style = "background-color: #32a852";
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5500);
}

/* ---- Functions to set date to current day ---- */

Date.prototype.toDateInputValue = (function() {
	var local = new Date(this);
	local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
	return local.toJSON().slice(0,10);
});

function dateSet()
{
	document.getElementById('date').value = new Date().toDateInputValue();
}

/* ------ ^^^^^^^^ ------------ ^^^^^^ --------- */

/* Function that checks if the end hour is not before the start hour */

function checkHour()
{
	let timeStart = document.getElementById("start").value;
	let timeEnd = document.getElementById("end").value;

	if (timeStart.substring(0, 2) > timeEnd.substring(0, 2))
	{
		snackbarAnimation('Meeting can\'t end before it starts', 'yellow');
		return 'error';
	}
	else if (timeStart.substring(0, 2) == timeEnd.substring(0, 2))
	{
		if (timeStart.substring((timeStart.length - 2), timeStart.length) >= timeEnd.substring((timeEnd.length - 2), timeEnd.length))
		{
			snackbarAnimation('Meeting can\'t end before it starts', 'yellow');
			return 'error';
		}
	}
	return checkDate();
}

/* Function that checks if the user is booking a room in the past */

function checkDate()
{
	let today = new Date();

	let date = today.getFullYear()+'-'+('0' + (today.getMonth() + 1)).slice(-2)+'-'+('0' + today.getDate()).slice(-2);
	let dateSet = document.getElementById("date").value;

	if (date > dateSet)
	{
		snackbarAnimation('Can\'t book a room in the past', 'yellow');
		return 'error';
	}
	else if (date == dateSet)
	{
		let time = today.getHours() + ":" + today.getMinutes();
		let timeSet = document.getElementById("start").value;

		if (time.substring(0, 2) > timeSet.substring(0, 2))
		{
			snackbarAnimation('Can\'t book a room in the past', 'yellow');
			return 'error';
		}
		else if (time.substring(0, 2) == timeSet.substring(0, 2))
		{
			if (time.substring((time.length - 2), (time.length)) > timeSet.substring((timeSet.length - 2), (timeSet.length)))
			{
				snackbarAnimation('Can\'t book a room in the past', 'yellow');
				return 'error';
			}
		}
		else
			return 'OK';
	}
	else
		return 'OK';
}

/* ----- Função antiga que estavamos a usar para fazer fetch ----- */

// async function httpPost() {
// 	console.log("test");
// 	const url = "https://script.google.com/macros/s/AKfycbyLJBdpWh4w806sHyG1xNuqt7e6eaKEqvjcUeJREZNC_rXTTgAIABotTGhoTpZscuax/exec"
// 	const input = {
// 		name: document.getElementById("name").value,
// 		email: document.getElementById("email").value,
// 		date: document.getElementById("date").value,
// 		start: document.getElementById("start").value,
// 		end: document.getElementById("end").value,
// 		members: document.getElementById("members".value),
// 		room: document.getElementById("room-changer").value,
// 		option: "Book"
// 	};

// 	const requestOptions = {
// 		method: "POST",
// 		mode: 'no-cors',
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(input)
// 	};
// 	let response = await fetch(url, requestOptions);
// 	let data = response.text(); //or .json
// 	console.log(response);
// 	console.log(data);
// }