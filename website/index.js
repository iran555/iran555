window.onload = () =>
{
	// get client ip
	fetch('https://api.ipify.org?format=json')
	.then(response => response.json())
	.catch(error => console.log(error))
	.then(response => 
	{
		const allIpShowers = document.getElementsByName("ClientIP")
		allIpShowers.forEach(ipShower => 
		{
			ipShower.innerHTML = response.ip
  		});
	});

	// handel shells.
	window.addEventListener('keydown', shellKeydownHandler)
};

function shellKeydownHandler(event)
{
	// always focuse on active shell.
	const activeShell = document.getElementById("activeShell");
	activeShell.focus();

	// procesing keydown.
	if (event.key != "Enter") return;
	const commend = activeShell.value;
	switch (commend) {
		case "help": print(
			"help - show this message.<br>" +
			"nothing else for now. please come back later.");
		break;
		case "shutdown": case "shutdown now": case "reboot": print(
			"System has not been booted with systemd as init system (PID 1).<br>" +
			"Can't operate. Failed to connect to bus: Host is down");
		break;

		case "": print(""); break;
		default: print(`Invalid commend '${commend}'. please try 'help'.`); break;
	} 
}

function print(text)
{
	// create new text.
	const newText = document.createElement('p');
	newText.setAttribute('class', 'white');
	document.body.appendChild(newText);
	newText.innerHTML = text;

	// create new shell.
	const newShell = document.getElementById("activeShell").parentElement.cloneNode(true);
	document.body.appendChild(newShell);
	newShell.children[1].value = '';
	newShell.children[1].focus();

	// update ids.
	const allShells = document.getElementsByName("shell");
	for (let i = 0; i < allShells.length - 1; i++) 
	{
		allShells[i].children[0].setAttribute('for', `inactiveShell${i}`);
		allShells[i].children[1].id = `inactiveShell${i}`;
	}
	allShells[allShells.length - 1].children[0].setAttribute('for', 'activeShell');
	allShells[allShells.length - 1].children[1].id = 'activeShell';
}
