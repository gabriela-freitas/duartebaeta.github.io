function changeUrl(event)
{
	const urlList =
	{
		"room 1": "",
		"room 2": "https://github.com/JTP17166/bi4allWebServer/blob/master/main.html",
		"room 3": "",
		"room 4": "",
		"room 5": "",
	};

	let iframe = document.getElementById("calendar-url");

	let input = event.target;

	let newUrl = urlList[input - 1];

	iframe.src = newUrl;
}