var control="";

var listpath;
var viewpath ;
var writepath;
var replypath;
var modifypath;
var deletepath;

function initPath(){
	listpath = control+"/list.kok";
	viewpath = control+"/view.kok";
	writepath = control+"/write.kok";
	replypath = control+"/reply.kok";
	modifypath = control+"/modify.kok";
	deletepath = control+"/delete.kok";
}

function moveBoard(bcode, pg, key, word, path) {
	$("#bcode").val(bcode);
	$("#pg").val(pg);
	$("#key").val(key);
	$("#word").val(word);
	$("#commonform").attr("method", "get").attr("action", path).submit();
}