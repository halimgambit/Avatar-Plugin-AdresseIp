exports.action = function(data, callback){
	let client = setClient(data);

	info("adresseIp from:", data.client, "To:", client);
	adresseIp (data, client);
	callback();
}

function adresseIp (data, client) {

	async function adresseIp() {
		try {
		  const response = await fetch('http://ip-api.com/json/');
	  
		  if (!response.ok) {
			throw new Error(`Réponse HTTP non réussie, statut: ${response.status}`);
		  }

		  Avatar.speak(`Votre adresse ip est ${ipAddressInfo.query.replace(/\./g, '-')} Votre ville est ${ipAddressInfo.city}`, data.client, () => {
			  Avatar.Speech.end(data.client);
			}
		  );
		} 
		catch (error) {
		  Avatar.speak(`Erreur lors de la requête HTTP : ${error.message}`, data.client, () => {
			Avatar.Speech.end(data.client);
		  });
		}
	  }
	  adresseIp();
	}


function setClient (data) {
	let client = data.client;
	if (data.action.room)
	client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
	if (data.action.setRoom)
	client = data.action.setRoom;
	return client;
}