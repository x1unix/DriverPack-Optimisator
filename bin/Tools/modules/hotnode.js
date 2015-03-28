/* HotNode by odin3 */
function HotNode(name)
{
    this.name = name;
    this.attrib = [];
    this.innerText = "";
}
HotNode.prototype.setAttribute = function(name,value)
{
    this.attrib[name] = value;
    return this.attrib[name];
}
HotNode.prototype.class = function(val)
{
    this.attrib["class"] = val;
}
HotNode.prototype.id = function(val)
{
    this.attrib["id"] = val;
}
HotNode.prototype.getAttribute = function(name)
{
    return this.attrib[name];
}
HotNode.prototype.setNode = function(content)
{
    this.innerText = content;
}
HotNode.prototype.insertNode = function(n_Node)
{
    this.innerText += n_Node.HTML();
}
HotNode.prototype.addNode = function(content)
{
    this.innerText += content;
}
HotNode.prototype.pairTag = true;
HotNode.prototype.HTML = function()
{
    var inner = "<"+this.name;
       for (var key in this.attrib) 
       { 
            var val = this.attrib[key]; 
            inner = inner+" "+key+"=\""+val+"\"";
        }
        if(this.pairTag)
        {
            inner = inner+">"+this.innerText+"</"+this.name+">";
        }
        else
        {
            inner+" />";
        }
    return inner;
}
HotNode.prototype.randomID = function()
{
    function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    this.attrib["id"] = text;
}
}