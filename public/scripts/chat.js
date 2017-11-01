var socket = io();

socket.on('chat message', function (userName, msg, wordArray) {
	$('#comments').append($('<li>').text(userName));
	var elem = addAttr(wordArray, msg);
	$('#comments').append(elem);
});

function emitMessage() {
	socket.emit('chat message', $('#UserName').val(), $('#newComment').val());
	$('#newComment').val('');
	$('#UserName').val('');
	return false;
}

function addAttr(wordArr, msg) {
	var len = wordArr.length;
	msg = msg.substring(0, msg.indexOf('/'));
	for (var i = 0; i < len; i++) {
		if (wordArr[i].search('/set') > -1) {
			var attrType = wordArr[i].substring(4, wordArr[i].length);
			switch (attrType) {
				case 'Color':
					$('#comments').append($('<li>').css('color', wordArr[i + 1]).text(msg));
					break;
				case 'Bold':
					$('#comments').append($('<li>').css('font-weight', 'bold').text(msg));
					break;
				case 'Italic':
					$('#comments').append($('<li>').css('font-style', 'italic').text(msg));
					break;
				case 'Border':
					$('#comments').append($('<li>').css('border', 'solid 3px black').text(msg));
					break;
			}
		}
	}
}