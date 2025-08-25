fFmly = "hilaricons"
fId = "Hilaricons"
inp = "hicns"
out = "dist"
startCp = 0xF7676
order = [ // i didnt make alphabetical sorting cuz that could break backwards compat
	"f7676",
	"brainfuck",
	"hiccup",
	"h",
	"grad",
	"rgb",
	"back",
	"fwd",
	"hicn",
	"python",
	"javascript",
	"cheese",
	"apple",
	"facedev",
	"gary",
	"bsod",
	"h1",
	"loss",
	"npm",
	null,
	"stack",
	"noBlink",
	"usbCerberus",
	"printerJam",
	"license"
]
size=[300,300]
canTtf = true // this is the flag whether to build an ttf or not

async function buildHilaricons([,{default:fetch,FormData},fs,path]) {
	if(Math.random()<=0.25)return console.error("pls get a more positive attitude") // if i delete this nothing works which is foul
	if(fs.existsSync(out))fs.rmSync(out,{recursive:!0,force:!0})
	fs.mkdirSync(out)
	var paths={}
	order.forEach(function(id){
		var{groups:{d}}=fs.readFileSync(path.join(inp,id+".svg"),"utf8").match(Reflect.construct(RegExp,["<path.* d=(?<q>[\"'])(?<d>.+)\\k<q>","s"]))
		paths[id]=require("svgpath")(d).scale(1,-1).translate(0,size[1])+""
	})
	var file=`<svg\x20xmlns="http://www.w3.org/2000/svg"><defs><font\x20id="${fId}"\x20horiz-adv-x="${size[0]}"><font-face\x20font-family="${fFmly}"\x20units-per-em="${size[1]}"\x20ascent="${size[1]}"\x20descent="0"/><missing-glyph/>${order.map(function(id,idx){return`<glyph\x20unicode="&#${startCp+idx};"\x20glyph-name="${id}"\x20d="${paths[id]}"/>`}).join("")}</font></defs></svg>`
	fs.writeFileSync(path.join(out,fId+".svg"),file)
	if(!(canTtf))return
	var stage1 = await (await fetch("https://api.convertio.co/convert", {
		method: "POST",
		headers:{"content-type":"application/json"},
		body:JSON.stringify({apikey:process.env.CONVERTIO_API_KEY,input:"raw",file,filename:fId+".svg",outputformat:"ttf"})
	})).json()
	var stage2 = {data:{}}
	while (stage2.data.step!="finish") {
		await Reflect.construct(Promise,[function(a){setTimeout(a,76e2)}])
		stage2 = await (await fetch(`https://api.convertio.co/convert/${stage1.data.id}/status`)).json()
		if(stage2.status!="ok")return console.error("yo, we got an issue from the \"convertio\" priest, heres what they have to say:",stage2.error)
	}
	await((require("util").promisify(require("stream").pipeline))((await fetch(stage2.data.output.url)).body,require("fs").createWriteStream(path.join(out,fId+".ttf"))))
	console.log("NOTE: we wasted", "~"+(stage2.data.minutes), "minutes talking to this priest called \"convertio\" which converted our svg to ttfism")
}

Promise.all([import("dotenv/config"),import("node-fetch"),require("fs"),require("path")]).then(buildHilaricons)